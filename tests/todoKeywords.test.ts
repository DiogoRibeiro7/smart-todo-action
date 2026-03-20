import { describe, it, expect } from 'vitest';
import { parseTodoKeywordsInput } from '../src/parser/todoKeywords';

describe('parseTodoKeywordsInput', () => {
  it('parses and normalizes comma-separated keywords', () => {
    const keywords = parseTodoKeywordsInput('note, PERF, note');
    expect(keywords).toEqual(['NOTE', 'PERF']);
  });

  it('rejects invalid keywords', () => {
    expect(() => parseTodoKeywordsInput('TODO, BAD VALUE')).toThrow(
      'Invalid todo-keywords value(s): BAD VALUE'
    );
  });
});

