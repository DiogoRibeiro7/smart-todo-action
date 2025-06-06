// src/parser/extractTodosWithStructuredTagsFromDir.ts
import path from 'path';
import fs from 'fs';
import { TodoItem } from './types';
import { extractTodosWithStructuredTags } from './extractTodosWithStructuredTags';
import { isTextFile } from '../utils/isTextFile';

const IGNORED_DIRS = ['node_modules', 'dist', 'coverage'];


export function extractTodosWithStructuredTagsFromDir(dir: string): TodoItem[] {
  const todos: TodoItem[] = [];

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      if (entry.isDirectory()) {
        if (IGNORED_DIRS.includes(entry.name)) continue;
        walk(fullPath);
      } else if (entry.isFile()) {
        if (isTextFile(fullPath)) {
          try {
            const fileTodos = extractTodosWithStructuredTags(fullPath);
            todos.push(...fileTodos);
          } catch {
            // opcional: log de ficheiros ignorados
          }
        }
      }
    }
  }

  walk(dir);
  return todos;
}
