import * as github from '@actions/github';
import * as core from '@actions/core';
import fs from 'fs';
import { TodoItem } from '../parser/types';
import { classifyTodoText } from './classifier'; // Novo: classificador heurístico ou LLM

// Labels atribuídas por tipo de comentário
export const LABELS_BY_TAG: Record<string, string[]> = {
  TODO: ['enhancement'],
  FIXME: ['bug'],
  BUG: ['bug'],
  HACK: ['technical-debt']
};

// Cores associadas a cada label base
export const LABEL_COLORS: Record<string, string> = {
  bug: 'd73a4a',
  enhancement: 'a2eeef',
  todo: 'cfd3d7',
  'technical-debt': 'e99695',
  refactor: 'f9d0c4',
  test: 'fef2c0',
  doc: '0075ca'
};

export interface LabelDefinition {
  color?: string;
  description?: string;
}

let CUSTOM_LABEL_CONFIG: Record<string, LabelDefinition> = {};

export function loadLabelConfig(path: string): void {
  try {
    const raw = fs.readFileSync(path, 'utf8');
    CUSTOM_LABEL_CONFIG = JSON.parse(raw);
    core.info(`\uD83D\uDCC4 Loaded label config from ${path}`);
  } catch (err: any) {
    core.warning(`⚠️ Failed to load label config: ${err.message}`);
    CUSTOM_LABEL_CONFIG = {};
  }
}

// Fallback para labels metadata:priority, due, etc.
export function labelsFromMetadata(metadata?: Record<string, string>): string[] {
  if (!metadata) return [];
  return Object.entries(metadata).map(([key, value]) => `${key}:${value}`);
}

// Novo: combina tag, metadata e classificação semântica
export function labelsFromTodo(todo: TodoItem): string[] {
  const tag = todo.tag.toUpperCase();
  const tagLabels = LABELS_BY_TAG[tag] || ['todo'];
  const metaLabels = labelsFromMetadata(todo.metadata);
  const semanticLabels = classifyTodoText(todo.text); // ← vem de `classifier.ts`

  return Array.from(new Set([...tagLabels, ...metaLabels, ...semanticLabels]));
}

// Garante que uma label existe no repositório
export async function ensureLabelExists(
  octokit: ReturnType<typeof github.getOctokit>,
  owner: string,
  repo: string,
  label: string
): Promise<void> {
  try {
    await octokit.rest.issues.getLabel({ owner, repo, name: label });
  } catch (err: any) {
    if (err.status === 404) {
      const base = label.split(':')[0];
      const custom = CUSTOM_LABEL_CONFIG[label] || CUSTOM_LABEL_CONFIG[base] || {};
      const color = custom.color || LABEL_COLORS[base] || 'cccccc';
      const description = custom.description || 'Auto-created by smart-todo-action';
      await octokit.rest.issues.createLabel({
        owner,
        repo,
        name: label,
        color,
        description
      });
      core.info(`🏷️ Created label: ${label}`);
    } else {
      core.warning(`⚠️ Could not verify label "${label}": ${err.message}`);
    }
  }
}

