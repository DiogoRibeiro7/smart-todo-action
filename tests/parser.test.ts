import { describe, it, expect } from 'vitest';
import { extractTodosFromFile } from '../src/parser/extractTodos';
import fs from 'fs';
import os from 'os';
import path from 'path';

function writeTempTodoFile(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'smart-todo-parser-'));
  const filePath = path.join(dir, 'todo-sample.ts');
  fs.writeFileSync(
    filePath,
    [
      '// TODO(priority=high, due=2025-06-01): Refatorar este método',
      'function processData() {',
      '    // FIXME: Corrigir possível vazamento de memória',
      '    console.log("Processing...");',
      '    // BUG(due=2025-01-01): Corrigir lógica de ordenação',
      '}',
    ].join('\n'),
    'utf8'
  );
  return filePath;
}

describe('extractTodosFromFile', () => {
  const filePath = writeTempTodoFile();
  const todos = extractTodosFromFile(filePath);

  it('deve encontrar 3 TODOs', () => {
    expect(todos.length).toBe(3);
  });

  it('deve extrair corretamente metadados', () => {
    expect(todos[0].metadata).toEqual({ priority: 'high', due: '2025-06-01' });
    expect(todos[2].metadata).toEqual({ due: '2025-01-01' });
  });

  it('deve identificar corretamente as tags', () => {
    expect(todos[0].tag).toBe('TODO');
    expect(todos[1].tag).toBe('FIXME');
    expect(todos[2].tag).toBe('BUG');
  });

  it('deve capturar corretamente os textos', () => {
    expect(todos[0].text).toBe('Refatorar este método');
    expect(todos[1].text).toBe('Corrigir possível vazamento de memória');
    expect(todos[2].text).toBe('Corrigir lógica de ordenação');
  });
});
