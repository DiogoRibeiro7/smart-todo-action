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

const DEFAULT_LABEL_COLOR = 'cccccc';
const LABEL_COLORS: Record<string, string> = {
  bug: 'd73a4a',
  enhancement: 'a2eeef',
  todo: 'ededed',
  'technical-debt': 'f9d0c4'
};

function labelsFromMetadata(metadata?: Record<string, string>): string[] {
  if (!metadata) return [];
  return Object.entries(metadata).map(([key, value]) => `${key}:${value}`);
}

async function ensureLabelExists(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string,
  label: string
) {
  try {
    await octokit.rest.issues.getLabel({ owner, repo, name: label });
  } catch (err: any) {
    if (err.status === 404) {
      const base = label.toLowerCase().split(':')[0];
      const color = LABEL_COLORS[base] || DEFAULT_LABEL_COLOR;
      await octokit.rest.issues.createLabel({
        owner,
        repo,
        name: label,
        color,
        description: 'Auto-created by smart-todo-action'
      });
      core.info(`🏷️ Created label "${label}"`);
    } else {
      core.warning(`⚠️ Failed to check/create label "${label}": ${err.message}`);
    }
  }
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

  } catch (error: any) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
