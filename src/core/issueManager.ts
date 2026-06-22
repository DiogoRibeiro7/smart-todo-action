import * as core from '@actions/core';
import * as github from '@actions/github';
import { TodoItem } from '../parser/types';
import { LABELS_BY_TAG, labelsFromMetadata, ensureLabelExists, labelsFromTodo } from './labelManager';
import { loadTemplate, applyTemplate } from '../templates/utils';
import { generateIssueTitleAndBodyLLM } from './llm/generateIssueContent';
import { createJiraIssue } from "../integrations/jira";
import { DedupStrategy, dedupKeyFromTitle } from './todoUtils';

const DAY_IN_MS = 24 * 60 * 60 * 1000;

export type StalePolicy = {
  staleDays: number;
  staleLabel: string;
  staleComment: string;
  staleCloseDays: number;
  staleCloseComment: string;
  managedLabels: string[];
};

function toLabelNames(labels: Array<string | { name?: string | null }>): string[] {
  return labels
    .map((label) => {
      if (typeof label === 'string') return label;
      if (typeof label.name === 'string') return label.name;
      return '';
    })
    .filter((name): name is string => typeof name === 'string' && name.trim().length > 0);
}

function parseIssueDateAsMs(value?: string | null): number {
  if (!value) return Number.NaN;
  return Date.parse(value);
}

function hasAnyManagedLabel(issueLabels: string[], managedLabels: string[]): boolean {
  if (managedLabels.length === 0) return false;
  const managedSet = new Set(managedLabels.map((label) => label.toLowerCase()));
  return issueLabels.some((label) => managedSet.has(label.toLowerCase()));
}

type OctokitIssueCreateParams = {
  owner: string;
  repo: string;
  title: string;
  body: string;
  labels: string[];
};

function isRetryableRateLimitError(error: unknown): boolean {
  const status = Number((error as { status?: number; statusCode?: number }).status) ||
    Number((error as { statusCode?: number }).statusCode);
  if (status !== 403 && status !== 429) return false;

  const message = String(
    (error as { message?: string; response?: { data?: { message?: string } } }).message ??
    (error as { response?: { data?: { message?: string } } }).response?.data?.message ??
    ''
  ).toLowerCase();

  const headers = (error as { headers?: Record<string, string> }).headers ??
    (error as { response?: { headers?: Record<string, string> } }).response?.headers ??
    {};

  const isHeaderRateLimit = Object.keys(headers).some((key) => {
    const normalized = key.toLowerCase();
    return normalized === 'x-ratelimit-remaining' && headers[key] === '0';
  });

  return (
    message.includes('secondary rate limit') ||
    message.includes('rate limit') ||
    isHeaderRateLimit
  );
}

async function createIssueWithRetry(
  octokit: ReturnType<typeof github.getOctokit>,
  payload: OctokitIssueCreateParams,
  maxRetries = 3
): Promise<void> {
  let attempt = 0;

  for (;;) {
    try {
      await octokit.rest.issues.create(payload);
      return;
    } catch (error) {
      attempt += 1;
      if (attempt > maxRetries || !isRetryableRateLimitError(error)) {
        throw error;
      }

      const delay = Math.min(250 * 2 ** (attempt - 1), 3000);
      core.warning(`Rate-limited while creating issue "${payload.title}". Retrying in ${delay}ms (attempt ${attempt}/${maxRetries})...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}

export async function getExistingIssueTitles(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string
): Promise<Set<string>> {
  return getExistingIssueDedupKeys(octokit, owner, repo, 'title');
}

export async function getExistingIssueDedupKeys(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string,
  dedupStrategy: DedupStrategy
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
        existing.add(dedupKeyFromTitle(issue.title, dedupStrategy));
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
  existingDedupKeys: Set<string>,
  dedupStrategy: DedupStrategy = 'title',
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

  const dedupKey = dedupKeyFromTitle(title, dedupStrategy);
  if (existingDedupKeys.has(dedupKey)) {
    core.info(`🟡 Skipping duplicate issue: ${title}`);
    return;
  }

  const labels = labelsFromTodo(todo);

  for (const label of labels) {
    await ensureLabelExists(octokit, owner, repo, label);
  }

  await createIssueWithRetry(
    octokit,
    {
      owner,
      repo,
      title,
      body,
      labels,
    },
    3
  );

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
}

export async function processStaleTodoIssues(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string,
  policy: StalePolicy
): Promise<void> {
  const perPage = 100;
  let page = 1;

  const staleCutoff = Date.now() - policy.staleDays * DAY_IN_MS;
  const closeCutoff = Date.now() - (policy.staleDays + policy.staleCloseDays) * DAY_IN_MS;
  const staleLabel = policy.staleLabel.trim();
  const staleLabelLower = staleLabel.toLowerCase();
  const managedLabels = policy.managedLabels.filter((label) => label.trim().length > 0);

  while (true) {
    const { data } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      state: 'open',
      per_page: perPage,
      page
    });

    for (const issue of data) {
      if (issue.pull_request) continue;

      const issueLabels = toLabelNames(issue.labels || []);
      if (!hasAnyManagedLabel(issueLabels, managedLabels)) {
        continue;
      }

      if (!issue.updated_at || !issue.number) {
        continue;
      }

      const updatedMs = parseIssueDateAsMs(issue.updated_at);
      if (!Number.isFinite(updatedMs)) {
        continue;
      }

      const hasStaleLabel = issueLabels.some((label) => label.toLowerCase() === staleLabelLower);

      if (hasStaleLabel && updatedMs <= closeCutoff) {
        await octokit.rest.issues.createComment({
          owner,
          repo,
          issue_number: issue.number,
          body: policy.staleCloseComment
        });
        await octokit.rest.issues.update({
          owner,
          repo,
          issue_number: issue.number,
          state: 'closed'
        });
        core.info(`🔒 Closed stale issue: #${issue.number} ${issue.title}`);
        continue;
      }

      if (!hasStaleLabel && updatedMs <= staleCutoff) {
        await octokit.rest.issues.addLabels({
          owner,
          repo,
          issue_number: issue.number,
          labels: [staleLabel]
        });
        await octokit.rest.issues.createComment({
          owner,
          repo,
          issue_number: issue.number,
          body: policy.staleComment
        });
        core.info(`🟡 Marked issue as stale: #${issue.number} ${issue.title}`);
      }
    }

    if (data.length < perPage) {
      break;
    }
    page += 1;
  }
}

