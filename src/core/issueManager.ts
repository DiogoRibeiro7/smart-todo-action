import * as core from '@actions/core';
import * as github from '@actions/github';
import { TodoItem } from '../parser/types';
import { LABELS_BY_TAG, labelsFromMetadata, ensureLabelExists } from './labelManager';
import { loadTemplate, applyTemplate } from '../templates/utils';

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
    existingTitles: Set<string>
  ): Promise<void> {
    const titleTemplate = loadTemplate('issueTitle.txt');
    const bodyTemplate = loadTemplate('issueBody.md');
  
    const flattened = {
        ...todo,
        ...todo.metadata
      } as Record<string, string | number>;
      
    const title = applyTemplate(titleTemplate, flattened);
    const body = applyTemplate(bodyTemplate, flattened);
      
  
    if (existingTitles.has(title)) {
      core.info(`🟡 Skipping duplicate issue: ${title}`);
      return;
    }
  
    const tag = todo.tag.toUpperCase();
    const baseLabels = LABELS_BY_TAG[tag] || ['todo'];
    const metaLabels = labelsFromMetadata(todo.metadata);
    const labels = [...baseLabels, ...metaLabels];
  
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
    } catch (err: any) {
      core.warning(`⚠️ Failed to create issue for: ${title} — ${err.message}`);
    }
  }
  