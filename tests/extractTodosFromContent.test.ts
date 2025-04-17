import { extractTodosFromString } from '../src/parser/extractTodosFromContent';
import { describe, it, expect } from 'vitest'

describe('extractTodosFromString', () => {
  it('extracts multiple TODO-style tags', () => {
    const content = `// BUG: crash here\n# FIXME: wrong\n<!-- TODO: layout -->`;
    const jsTodos = extractTodosFromString(content, '.js');
    const pyTodos = extractTodosFromString(content, '.py');
    const htmlTodos = extractTodosFromString(content, '.html');

    expect(jsTodos.length).toBe(1);
    expect(jsTodos[0].tag).toBe('BUG');

    expect(pyTodos.length).toBe(1);
    expect(pyTodos[0].tag).toBe('FIXME');

    expect(htmlTodos.length).toBe(1);
    expect(htmlTodos[0].tag).toBe('TODO');
  });

  it('extracts metadata key=value pairs', () => {
    const content = `// TODO(priority=high, due=2025-06-01): fix it`;
    const todos = extractTodosFromString(content, '.js');

    expect(todos.length).toBe(1);
    expect(todos[0].metadata).toEqual({
      priority: 'high',
      due: '2025-06-01'
    });
  });
});
