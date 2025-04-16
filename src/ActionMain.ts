import * as core from '@actions/core';
import * as github from '@actions/github';
import path from 'path';
import { extractTodosFromDir } from './parser/extractTodosFromDir';
import { TodoItem } from './parser/types';
import { getExistingIssueTitles, createIssueIfNeeded } from './core/issueManager';
import { generateMarkdownReport } from './core/report';
import { limitTodos, todoKey } from './core/todoUtils';

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token', { required: true });
    const generateReport = core.getInput('report') === 'true';
    const titleTemplatePath = core.getInput('issue-title-template');
    const bodyTemplatePath = core.getInput('issue-body-template');
    const workspace = process.env.GITHUB_WORKSPACE || '.';

    const todos: TodoItem[] = extractTodosFromDir(workspace);
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

    const todosToCreate = limitTodos(uniqueTodos, 5);

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
    }

  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
