import { describe, it, expect } from 'vitest';
import { limitTodos, todoKey } from '../src/core/todoUtils';
import { TodoItem } from '../src/parser/types';


describe('limitTodos', () => {
  it('filters out invalid todos and limits the result', () => {
    const todos: TodoItem[] = [
      { tag: 'TODO', text: 'short', file: 'a.ts', line: 1 },
      { tag: 'FIXME', text: 'Fix the login', file: 'b.ts', line: 2 },
      { tag: 'TODO', text: 'Refactor component', file: 'c.ts', line: 3 },
      { tag: 'BUG', text: 'Another fix', file: 'd.ts', line: 4 },
    ];

    const limited = limitTodos(todos, 2);

    expect(limited.length).toBe(2);
    expect(limited[0].text).toBe('Fix the login');
    expect(limited[1].text).toBe('Refactor component');
  });
});

describe('todoKey', () => {
  it('can be used to remove duplicate todos before limiting', () => {
    const todos: TodoItem[] = [
      { tag: 'TODO', text: 'duplicate task', file: 'a.ts', line: 1 },
      { tag: 'TODO', text: 'duplicate task', file: 'b.ts', line: 2 },
      { tag: 'TODO', text: 'unique task', file: 'c.ts', line: 3 },
    ];

    const seen = new Set<string>();
    const unique = todos.filter(t => {
      const key = todoKey(t);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    const result = limitTodos(unique, 5);

    expect(result.length).toBe(2);
    expect(result.map(t => t.text)).toEqual(['duplicate task', 'unique task']);
  });
});

