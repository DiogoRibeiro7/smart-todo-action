// src/ActionMain.ts
import * as core from '@actions/core';
import * as github from '@actions/github';
import fs from 'fs';
import { extractTodosFromDir } from './parser/extractTodosFromDir';
import { extractTodosWithStructuredTagsFromDir } from './parser/extractTodosWithStructuredTagsFromDir'; // 👈 novo
import { TodoItem } from './parser/types';
import { getExistingIssueTitles, createIssueIfNeeded } from './core/issueManager';
import { generateMarkdownReport, warnOverdueTodos } from './core/report';
import { loadLabelConfig } from './core/labelManager';
import { limitTodos, todoKey } from './core/todoUtils';
import { generateChangelogFromTodos } from './core/changelog';

// TODO(priority=high, due=2025-06-01) Refactor login logic @alice #auth type=refactor

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token', { required: true });
    const generateReport = core.getInput('report') === 'true';
    const titleTemplatePath = core.getInput('issue-title-template');
    const bodyTemplatePath = core.getInput('issue-body-template');
    const labelConfigPath = core.getInput('label-config');
    const workspace = process.env.GITHUB_WORKSPACE || '.';

    // LLM support
    process.env.OPENAI_API_KEY = core.getInput('openai-api-key') || process.env.OPENAI_API_KEY;
    const useLLM = core.getInput('llm') === 'true';
    if (useLLM && !process.env.OPENAI_API_KEY) {
      core.warning('⚠️ LLM is enabled, but OPENAI_API_KEY is not set.');
    }

    const useStructured = core.getInput('structured') === 'true';

    if (labelConfigPath) {
      loadLabelConfig(labelConfigPath);
    }

    const warnOverdue = core.getInput('warn-overdue') === 'true';

    const todos: TodoItem[] = useStructured
      ? extractTodosWithStructuredTagsFromDir(workspace)
      : extractTodosFromDir(workspace);
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    core.info(`🔍 Found ${todos.length} TODOs`);

    const existingTitles = await getExistingIssueTitles(octokit, owner, repo);

    const seenKeys = new Set<string>();
    const uniqueTodos = todos.filter(todo => {
      const key = todoKey(todo);
      if (seenKeys.has(key)) return false;
      seenKeys.add(key);
      return true;
    });

    if (warnOverdue) {
      warnOverdueTodos(uniqueTodos);
    }

    const issueLimit = parseInt(core.getInput('limit') || '5', 10);
    const todosToCreate = limitTodos(uniqueTodos, issueLimit);


    for (const todo of todosToCreate) {
      await createIssueIfNeeded(
        octokit,
        owner,
        repo,
        todo,
        existingTitles,
        titleTemplatePath,
        bodyTemplatePath
      );
    }

    if (generateReport) {
      generateMarkdownReport(todos);
      core.info('📝 Generated TODO_REPORT.md');

      const changelog = generateChangelogFromTodos(todos);
      fs.writeFileSync('CHANGELOG.md', changelog, 'utf8');
      core.info('📦 Generated CHANGELOG.md');
    }

  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
