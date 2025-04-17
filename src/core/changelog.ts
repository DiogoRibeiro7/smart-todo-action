// src/core/changelog.ts
import { TodoItem } from '../parser/types';
import { classifyTodoText } from './classifier';

function formatGroupHeader(tag: string, semantic: string, metadataKey?: string, metadataValue?: string): string {
  const parts = [tag];
  if (semantic) parts.push(semantic);
  if (metadataKey && metadataValue) parts.push(`${metadataKey}:${metadataValue}`);
  return `## ${parts.join(' · ')}`;
}

export function generateChangelogFromTodos(todos: TodoItem[]): string {
  type GroupKey = string;
  const groups: Record<GroupKey, TodoItem[]> = {};

  for (const todo of todos) {
    const semantics = classifyTodoText(todo.text);
    const metadataEntries = Object.entries(todo.metadata || {}) || [['', '']];
    const tag = todo.tag.toUpperCase();

    for (const semantic of semantics.length ? semantics : ['']) {
      for (const [metaKey, metaValue] of metadataEntries.length ? metadataEntries : [['', '']]) {
        const key = JSON.stringify({ tag, semantic, metaKey, metaValue });
        if (!groups[key]) groups[key] = [];
        groups[key].push(todo);
      }
    }
  }

  const output: string[] = ['# 📝 Changelog (from TODOs)', ''];

  for (const key of Object.keys(groups)) {
    const { tag, semantic, metaKey, metaValue } = JSON.parse(key);
    output.push(formatGroupHeader(tag, semantic, metaKey, metaValue));

    for (const todo of groups[key]) {
      output.push(`- ${todo.text} (\`${todo.file}:${todo.line}\`)`);
    }

    output.push('');
  }

  return output.join('\n');
}
