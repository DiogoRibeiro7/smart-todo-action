import { describe, it, expect } from 'vitest';
import { extractTodosFromFile } from '../../parser/extractTodos'; // Ensure this file exists at the specified path
import { TodoItem } from '../../parser/types';



describe('extractTodos', () => {
  it('extracts simple TODOs with //', () => {
    const content = `// TODO: clean this up\nconst a = 1;`;
    const todos = extractTodosFromFile(content);
    expect(todos.length).toBe(1);
    expect(todos[0].text).toBe('clean this up');
    expect(todos[0].tag).toBe('TODO');
    expect(todos[0].line).toBe(1);
  });

  it('extracts multiple tags', () => {
    const content = `// BUG: crashes\n# FIXME: something wrong`;
    const todos = extractTodosFromFile(content);
    expect(todos.length).toBe(2);
    expect(todos.map(t => t.tag)).toEqual(['BUG', 'FIXME']);
  });

  it('extracts metadata key=value pairs', () => {
    const content = `// TODO(priority=high, due=2025-06-01): fix it`;
    const todos = extractTodosFromFile(content);
    expect(todos.length).toBe(1);
    expect(todos[0].metadata).toEqual({
      priority: 'high',
      due: '2025-06-01'
    });
  });

  it('supports HTML comments', () => {
    const content = `<!-- TODO: fix layout -->`;
    const todos = extractTodosFromFile(content);
    expect(todos.length).toBe(1);
    expect(todos[0].tag).toBe('TODO');
  });

  it('returns empty list if no TODOs are found', () => {
    const content = `const x = 5; // just a comment`;
    const todos = extractTodosFromFile(content);
    expect(todos.length).toBe(0);
  });
});
