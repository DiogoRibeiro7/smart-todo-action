// src/core/changelog.ts
import { TodoItem } from '../parser/types';
import { labelsFromTodo } from './labelManager';

/**
 * Generates a changelog from a list of TODO items, grouping them by labels and formatting
 * them into a markdown string.
 *
 * @param todos - An array of `TodoItem` objects representing the TODO items to include in the changelog.
 * @returns A formatted markdown string representing the changelog, grouped by labels with icons.
 *
 * The changelog includes:
 * - A header (`## Changelog de TODOs`).
 * - Grouped sections for each label, sorted alphabetically.
 * - Each section includes a list of TODO items with their tag, text, file, line, and optional metadata.
 *
 * Label icons are mapped as follows:
 * - `bug`: 🐞
 * - `enhancement`: ✨
 * - `technical-debt`: 💣
 * - `test`: 🔬
 * - `doc`: 📄
 * - `refactor`: 🚧
 * - `performance`: ⚡️
 * - `security`: 🔐
 * - Default: 🔖
 *
 * Example output:
 * ```
 * ## Changelog de TODOs
 *
 * ### 🐞 Bug
 * - [BUG-123] Fix null pointer exception (`file.ts:42`) — `priority:high`
 *
 * ### ✨ Enhancement
 * - [ENH-456] Add new feature (`feature.ts:10`)
 * ```
 */
export function generateChangelog(todos: TodoItem[]): string {
  const grouped: Record<string, TodoItem[]> = {};

  for (const todo of todos) {
    for (const label of labelsFromTodo(todo)) {
      if (!grouped[label]) grouped[label] = [];
      grouped[label].push(todo);
    }
  }

  let output = `## Changelog de TODOs\n\n`;
  const labelIcons: Record<string, string> = {
    bug: '🐞',
    enhancement: '✨',
    'technical-debt': '💣',
    test: '🔬',
    doc: '📄',
    refactor: '🚧',
    performance: '⚡️',
    security: '🔐'
  };

  for (const label of Object.keys(grouped).sort()) {
    const icon = labelIcons[label] || '🔖';
    output += `### ${icon} ${label[0].toUpperCase() + label.slice(1)}\n`;
    for (const todo of grouped[label]) {
      output += `- [${todo.tag}] ${todo.text} (\`${todo.file}:${todo.line}\`)`;
      if (todo.metadata) {
        const meta = Object.entries(todo.metadata)
          .map(([k, v]) => `\`${k}:${v}\``)
          .join(' ');
        output += ` — ${meta}`;
      }
      output += `\n`;
    }
    output += `\n`;
  }

  return output.trim();
}
