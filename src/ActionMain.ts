// src/ActionMain.ts
import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';
import { extractTodosFromDirWithKeywords } from './parser/extractTodosFromDir';
import { extractTodosWithStructuredTagsFromDirWithKeywords } from './parser/extractTodosWithStructuredTagsFromDir';
import { TodoItem } from './parser/types';
import { getExistingIssueDedupKeys, createIssueIfNeeded, processStaleTodoIssues, StalePolicy } from './core/issueManager';
import { generateMarkdownReport, generateJsonReport, warnOverdueTodos } from './core/report';
import { loadLabelConfig } from './core/labelManager';
import { DedupStrategy, isDedupStrategy, limitTodos, todoKey } from './core/todoUtils';
import { generateChangelogFromTodos } from './core/changelog';
import { parseTodoKeywordsInput } from './parser/todoKeywords';
import { parseIgnoreGlobsInput } from './parser/ignoreGlobs';

function parseIntegerInput(name: string, fallback: number): number {
  const raw = core.getInput(name);
  const trimmed = raw.trim();
  if (!trimmed) return fallback;

  const parsed = parseInt(trimmed, 10);
  if (!Number.isFinite(parsed) || parsed < 0) {
    return fallback;
  }

  return parsed;
}

function parseCommaList(raw: string): string[] {
  return raw
    .split(',')
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token', { required: true });
    const generateReport = core.getInput('report') === 'true';
    const generateJson = core.getInput('json-report') === 'true';
    const dryRun = core.getInput('dry-run') === 'true';
    const titleTemplatePath = core.getInput('issue-title-template');
    const bodyTemplatePath = core.getInput('issue-body-template');
    const labelConfigPath = core.getInput('label-config');
    const workspace = process.env.GITHUB_WORKSPACE || '.';

    // LLM support
    const llmProvider = core.getInput('llm-provider') || 'openai';
    process.env.LLM_PROVIDER = llmProvider;
    if (llmProvider === 'gemini') {
      process.env.GEMINI_API_KEY = core.getInput('gemini-api-key') || process.env.GEMINI_API_KEY;
    } else {
      process.env.OPENAI_API_KEY = core.getInput('openai-api-key') || process.env.OPENAI_API_KEY;
    }
    const useLLM = core.getInput('llm') === 'true';
    if (useLLM && llmProvider === 'openai' && !process.env.OPENAI_API_KEY) {
      core.warning('⚠️ LLM is enabled, but OPENAI_API_KEY is not set.');
    }
    if (useLLM && llmProvider === 'gemini' && !process.env.GEMINI_API_KEY) {
      core.warning('⚠️ LLM is enabled, but GEMINI_API_KEY is not set.');
    }

    const useStructured = core.getInput('structured') === 'true';
    const ignoreGlobs = parseIgnoreGlobsInput(core.getInput('ignore-globs') || '');

    if (labelConfigPath) {
      loadLabelConfig(labelConfigPath);
    }

    const warnOverdue = core.getInput('warn-overdue') === 'true';
    const customKeywords = parseTodoKeywordsInput(core.getInput('todo-keywords') || '');
    const dedupInput = (core.getInput('dedup-strategy') || 'title').trim();
    if (!isDedupStrategy(dedupInput)) {
      throw new Error(`Invalid dedup-strategy: ${dedupInput}. Allowed values: title, normalized-text, hash.`);
    }
    const dedupStrategy: DedupStrategy = dedupInput;
    const staleEnabled = core.getInput('stale-enabled') === 'true';
    const staleDays = parseIntegerInput('stale-days', 30);
    const staleCloseDays = parseIntegerInput('stale-close-days', 7);
    const stalePolicy: StalePolicy = {
      staleDays,
      staleLabel: core.getInput('stale-label') || 'stale',
      staleComment:
        core.getInput('stale-comment') ||
        `This issue has been marked as stale after ${staleDays} days of inactivity and may be closed automatically.`,
      staleCloseDays,
      staleCloseComment:
        core.getInput('stale-close-comment') ||
        `Closing this issue as stale after ${staleCloseDays} additional days of inactivity.`,
      managedLabels: parseCommaList(core.getInput('stale-managed-labels') || 'enhancement,bug,technical-debt')
    };

    const todos: TodoItem[] = useStructured
      ? extractTodosWithStructuredTagsFromDirWithKeywords(workspace, customKeywords, ignoreGlobs)
      : extractTodosFromDirWithKeywords(workspace, customKeywords, ignoreGlobs);
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    core.info(`🔍 Found ${todos.length} TODOs`);
    if (dryRun) {
      core.info('🧪 Dry-run mode enabled: no issue creation/update calls will be made.');
    }

    const existingDedupKeys = dryRun
      ? new Set<string>()
      : await getExistingIssueDedupKeys(octokit, owner, repo, dedupStrategy);

    const seenKeys = new Set<string>();
    const uniqueTodos = todos.filter(todo => {
      const key = todoKey(todo, dedupStrategy);
      if (seenKeys.has(key)) return false;
      seenKeys.add(key);
      return true;
    });

    if (warnOverdue) {
      warnOverdueTodos(uniqueTodos);
    }

    const issueLimit = parseInt(core.getInput('limit') || '5', 10);
    const todosToCreate = limitTodos(uniqueTodos, issueLimit);


    if (!dryRun) {
      for (const todo of todosToCreate) {
        await createIssueIfNeeded(
          octokit,
          owner,
          repo,
          todo,
          existingDedupKeys,
          dedupStrategy,
          titleTemplatePath,
          bodyTemplatePath
        );
      }

      if (staleEnabled) {
        await processStaleTodoIssues(octokit, owner, repo, stalePolicy);
      }
    } else {
      core.info(`🧪 Dry-run summary: ${todosToCreate.length} issue(s) would be processed.`);
    }

    if (generateReport || dryRun) {
      generateMarkdownReport(todos);
      core.info('📝 Generated TODO_REPORT.md');
    }
    if (generateJson) {
      generateJsonReport(todos);
      core.info('🧾 Generated TODO_REPORT.json');
    }

    if (generateReport && !dryRun) {
      const changelog = generateChangelogFromTodos(todos);
      fs.writeFileSync('CHANGELOG.md', changelog, 'utf8');
      core.info('📦 Generated CHANGELOG.md');
    }

  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
