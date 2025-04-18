// src/parser/extractTodosWithStructuredTags.ts
import { TodoItem } from './types';
import { extractTodosFromString } from './extractTodosFromContent';
import { extractStructuredTags } from './extractStructuredTags';
import fs from 'fs';

export function extractTodosWithStructuredTags(filePath: string): TodoItem[] {
  const ext = filePath.slice(filePath.lastIndexOf('.'));
  const content = fs.readFileSync(filePath, 'utf8');
  const todos = extractTodosFromString(content, ext);

  return todos.map(todo => {
    const structured = extractStructuredTags(todo.text);
    return {
      ...todo,
      metadata: {
        ...(todo.metadata || {}),
        ...Object.fromEntries(
          Object.entries(structured).map(([key, value]) => [key, String(value)])
        ),
      },
    };
  });
}
