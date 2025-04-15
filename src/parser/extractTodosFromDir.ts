import fs from 'fs';
import path from 'path';
import { extractTodosFromFile } from './extractTodos';
import { TodoItem } from './types';

const SUPPORTED_EXTENSIONS = ['.ts', '.js', '.py', '.go', '.java', '.rb', '.sh', '.html', '.xml'];

export function extractTodosFromDir(dirPath: string): TodoItem[] {
  const todos: TodoItem[] = [];

  function walk(currentPath: string) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name);
        if (SUPPORTED_EXTENSIONS.includes(ext)) {
          const fileTodos = extractTodosFromFile(fullPath);
          todos.push(...fileTodos);
        }
      }
    }
  }

  walk(dirPath);
  return todos;
}
