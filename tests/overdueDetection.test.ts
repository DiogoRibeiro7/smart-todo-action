import { describe, it, expect } from 'vitest';
import { findOverdueTodos } from '../src/core/report';
import { TodoItem } from '../src/parser/types';

function format(date: Date) {
  return date.toISOString().split('T')[0];
}

describe('findOverdueTodos', () => {
  it('detects todos with past due dates', () => {
    const yesterday = format(new Date(Date.now() - 86400000));
    const today = format(new Date());
    const tomorrow = format(new Date(Date.now() + 86400000));
    const todos: TodoItem[] = [
      { tag: 'TODO', text: 'past', file: 'a.ts', line: 1, metadata: { due: yesterday } },
      { tag: 'TODO', text: 'today', file: 'b.ts', line: 2, metadata: { due: today } },
      { tag: 'TODO', text: 'future', file: 'c.ts', line: 3, metadata: { due: tomorrow } },
      { tag: 'TODO', text: 'none', file: 'd.ts', line: 4 }
    ];

    const result = findOverdueTodos(todos);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('past');
  });
});
