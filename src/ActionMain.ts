import * as core from '@actions/core';
import * as github from '@actions/github';
import path from 'path';
import { extractTodosFromDir } from './parser/extractTodosFromDir';
import { TodoItem } from './parser/types';

const LABELS_BY_TAG: Record<string, string[]> = {
  TODO: ['enhancement'],
  FIXME: ['bug'],
  BUG: ['bug'],
  HACK: ['technical-debt']
};

function labelsFromMetadata(metadata?: Record<string, string>): string[] {
  if (!metadata) return [];
  return Object.entries(metadata).map(([key, value]) => `${key}:${value}`);
}

async function run(): Promise<void> {
  try {
    const token = core.getInput('repo-token', { required: true });
    const workspace = process.env.GITHUB_WORKSPACE || '.';

    const todos: TodoItem[] = extractTodosFromDir(workspace);
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    core.info(`🔍 Found ${todos.length} TODOs`);

    const MAX_ISSUES = 5;
    const todosToCreate = todos
      .filter(todo => todo.text && todo.text.length > 5)
      .slice(0, MAX_ISSUES);

    for (const todo of todosToCreate) {
      const title = `[${todo.tag}] ${todo.text}`;
      const body = `Found in \`${todo.file}:${todo.line}\`\n\n\`\`\`\n${todo.text}\n\`\`\``;
      const tag = todo.tag.toUpperCase();
      const baseLabels = LABELS_BY_TAG[tag] || ['todo'];
      const metaLabels = labelsFromMetadata(todo.metadata);
      const labels = [...baseLabels, ...metaLabels];

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

  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
