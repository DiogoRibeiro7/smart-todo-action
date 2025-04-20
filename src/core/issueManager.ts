import * as core from '@actions/core';
import * as github from '@actions/github';
import { TodoItem } from '../parser/types';
import { LABELS_BY_TAG, labelsFromMetadata, ensureLabelExists, labelsFromTodo } from './labelManager';
import { loadTemplate, applyTemplate } from '../templates/utils';
import { generateIssueTitleAndBodyLLM } from './llm/generateIssueContent';
import { createJiraIssue } from "../integrations/jira";

export async function getExistingIssueTitles(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string
): Promise<Set<string>> {
  const existing = new Set<string>();
  const perPage = 100;
  let page = 1;
  let done = false;

  while (!done) {
    const { data } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      per_page: perPage,
      page
    });

    for (const issue of data) {
      if (!issue.pull_request) {
        existing.add(issue.title);
      }
    }

    if (data.length < perPage) {
      done = true;
    } else {
      page++;
    }
  }

  return existing;
}

export async function createIssueIfNeeded(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string,
  todo: TodoItem,
  existingTitles: Set<string>,
  titlePath?: string,
  bodyPath?: string
): Promise<void> {
  const useLLM = core.getInput('llm') === 'true';

  let title: string;
  let body: string;

  if (useLLM) {
    try {
      const result = await generateIssueTitleAndBodyLLM(todo);
      title = result.title;
      body = result.body;
    } catch (err: any) {
      core.warning(`⚠️ LLM fallback triggered for TODO: ${todo.text}`);
      const titleTemplate = loadTemplate(titlePath || 'issueTitle.txt');
      const bodyTemplate = loadTemplate(bodyPath || 'issueBody.md');
      const flattened = { ...todo, ...todo.metadata } as Record<string, string | number>;
      title = applyTemplate(titleTemplate, flattened);
      body = applyTemplate(bodyTemplate, flattened);
    }
  } else {
    const titleTemplate = loadTemplate(titlePath || 'issueTitle.txt');
    const bodyTemplate = loadTemplate(bodyPath || 'issueBody.md');
    const flattened = { ...todo, ...todo.metadata } as Record<string, string | number>;
    title = applyTemplate(titleTemplate, flattened);
    body = applyTemplate(bodyTemplate, flattened);
  }

  if (existingTitles.has(title)) {
    core.info(`🟡 Skipping duplicate issue: ${title}`);
    return;
  }

  const labels = labelsFromTodo(todo);

  for (const label of labels) {
    await ensureLabelExists(octokit, owner, repo, label);
  }

  try {
    await octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
      labels
    });
  
    core.info(`✅ Created issue with labels [${labels.join(', ')}]: ${title}`);
  
    // 👉 Jira integration (optional)
    if (core.getInput('sync-to-jira') === 'true') {
      try {
        await createJiraIssue({
          summary: title,
          description: body,
          jiraBaseUrl: core.getInput('jira-base-url'),
          jiraEmail: core.getInput('jira-email'),
          jiraApiToken: core.getInput('jira-api-token'),
        });
        core.info(`📡 Synced issue to Jira: ${title}`);
      } catch (jiraErr: any) {
        core.warning(`⚠️ Jira sync failed: ${jiraErr.message}`);
      }
    }
  
  } catch (err: any) {
    core.warning(`⚠️ Failed to create issue for: ${title} — ${err.message}`);
  }  
}


