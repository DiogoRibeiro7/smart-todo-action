// src/parser/extractTodosWithStructuredTagsFromDir.ts
import path from 'path';
import fs from 'fs';
import { TodoItem } from './types';
import { extractTodosWithStructuredTags } from './extractTodosWithStructuredTags';
import { isTextFile } from '../utils/isTextFile';
import { buildIgnoreMatchers, shouldIgnorePath } from './ignoreGlobs';


export function extractTodosWithStructuredTagsFromDir(dir: string): TodoItem[] {
  return extractTodosWithStructuredTagsFromDirWithKeywords(dir, [], []);
}

export function extractTodosWithStructuredTagsFromDirWithKeywords(
  dir: string,
  customKeywords: string[] = [],
  customIgnoreGlobs: string[] = []
): TodoItem[] {
  const todos: TodoItem[] = [];
  const ignoreMatchers = buildIgnoreMatchers(customIgnoreGlobs);

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(dir, fullPath).replace(/\\/g, '/');
      if (entry.isDirectory()) {
        if (shouldIgnorePath(relativePath, ignoreMatchers)) continue;
        walk(fullPath);
      } else if (entry.isFile()) {
        if (shouldIgnorePath(relativePath, ignoreMatchers)) continue;
        if (isTextFile(fullPath)) {
          try {
            const fileTodos = extractTodosWithStructuredTags(fullPath, customKeywords);
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
