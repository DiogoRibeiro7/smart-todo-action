// scripts/generateChangelog.ts

import fs from 'fs';
import path from 'path';
import { extractTodosFromDir } from '../src/parser/extractTodosFromDir';
import { labelsFromTodo } from '../src/core/labelManager';
import { TodoItem } from '../src/parser/types';

// Util: agrupador por chave composta
function groupTodos(todos: TodoItem[]): Record<string, TodoItem[]> {
  const groups: Record<string, TodoItem[]> = {};

  for (const todo of todos) {
    const semanticLabels = labelsFromTodo(todo);
    const meta = todo.metadata ?? {};

    for (const label of semanticLabels) {
      const metaKeys = Object.entries(meta)
        .map(([k, v]) => `${k}:${v}`)
        .join(', ');

      const key = `[${todo.tag}] + [${label}]${metaKeys ? ` + [${metaKeys}]` : ''}`;

      if (!groups[key]) groups[key] = [];
      groups[key].push(todo);
    }
  }

  return groups;
}

// Util: gera string formatada para cada grupo
function formatChangelog(groups: Record<string, TodoItem[]>): string {
  const lines: string[] = [];

  for (const key of Object.keys(groups).sort()) {
    lines.push(`## ${key}\n`);

    for (const todo of groups[key]) {
      lines.push(`- (${todo.file}:${todo.line}) ${todo.text}`);
    }

    lines.push('');
  }

  return lines.join('\n');
}

async function main() {
  const todos = await extractTodosFromDir('./');
  const grouped = groupTodos(todos);
  const changelog = formatChangelog(grouped);

  const filePath = path.resolve('CHANGELOG.md');
  fs.writeFileSync(filePath, changelog, 'utf-8');

  console.log(`📦 Changelog gerado com ${todos.length} TODOs agrupados → ${filePath}`);
}

main();

