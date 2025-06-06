import { describe, it, expect } from 'vitest';
import { extractTodosFromString } from '../src/parser/extractTodosFromContent';
import { TodoItem } from '../src/parser/types';



describe('extractTodos', () => {
  it('extracts simple TODOs with //', () => {
    const content = `// TODO: clean this up\nconst a = 1;`;
    const todos = extractTodosFromString(content, '.js');
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('clean this up');
    expect(todos[0].tag).toBe('TODO');
    expect(todos[0].line).toBe(1);
  });

  it('extracts multiple tags', () => {
    const content = `# BUG: crashes\n# FIXME: something wrong`;
    const todos = extractTodosFromString(content, '.py');
    expect(todos.length).toBe(2);
    expect(todos.map(t => t.tag)).toEqual(['BUG', 'FIXME']);
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

  it('supports HTML comments', () => {
    const content = `<!-- TODO: fix layout -->`;
    const todos = extractTodosFromString(content, '.html');
    expect(todos.length).toBe(1);
    expect(todos[0].tag).toBe('TODO');
  });

  it('returns empty list if no TODOs are found', () => {
    const content = `const x = 5; // just a comment`;
    const todos = extractTodosFromString(content, '.js');
    expect(todos.length).toBe(0);
  });
});
