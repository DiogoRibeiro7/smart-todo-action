import fs from 'fs';
import path from 'path';
import { extractTodosFromFile } from './extractTodos';
import { TodoItem } from './types';
import { buildIgnoreMatchers, shouldIgnorePath } from './ignoreGlobs';

const SUPPORTED_EXTENSIONS = ['.ts', '.js', '.py', '.go', '.java', '.rb', '.sh', '.c', '.cpp', '.cs', '.rs', '.php', '.h', '.hpp', '.html', '.xml', '.yaml', '.yml'];

export function extractTodosFromDir(dirPath: string): TodoItem[] {
  return extractTodosFromDirWithKeywords(dirPath, [], []);
}

export function extractTodosFromDirWithKeywords(
  dirPath: string,
  customKeywords: string[] = [],
  customIgnoreGlobs: string[] = []
): TodoItem[] {
  const todos: TodoItem[] = [];
  const ignoreMatchers = buildIgnoreMatchers(customIgnoreGlobs);

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);
      const relativePath = path.relative(dirPath, fullPath).replace(/\\/g, '/');

      if (entry.isDirectory()) {
        if (shouldIgnorePath(relativePath, ignoreMatchers)) continue;
        walk(fullPath);
      } else if (entry.isFile()) {
        if (shouldIgnorePath(relativePath, ignoreMatchers)) continue;
        const ext = path.extname(entry.name);
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          const fileTodos = extractTodosFromFile(fullPath, customKeywords);
          todos.push(...fileTodos);
        }
      }
    }
  }

  walk(dirPath);
  return todos;
}
