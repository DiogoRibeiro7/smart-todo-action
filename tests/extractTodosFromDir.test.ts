import { describe, it, expect } from 'vitest';
import path from 'path';
import { extractTodosFromDir } from '../src/parser/extractTodosFromDir';

describe('extractTodosFromDir', () => {
  const base = path.join(__dirname, 'fixtures');

  it('should extract TODOs from supported files recursively', () => {
    const todos = extractTodosFromDir(base);
    expect(todos.length).toBe(2);

    const texts = todos.map(t => t.text);
    expect(texts).toContain('Refactor this module');
    expect(texts).toContain('Handle edge case');

    const tags = todos.map(t => t.tag);
    expect(tags).toContain('TODO');
    expect(tags).toContain('FIXME');
  });

  it('should include correct file and line information', () => {
    const todos = extractTodosFromDir(base);
    const one = todos.find(t => t.text.includes('Refactor'));
    expect(one?.file.endsWith('one-file.ts')).toBe(true);
    expect(typeof one?.line).toBe('number');
    expect(one?.line).toBeGreaterThan(0);
  });

  it('should ignore files inside ignored directories', () => {
    const todos = extractTodosFromDir(base);
    const ignored = todos.find(t => t.text.includes('Should not be picked up'));
    expect(ignored).toBeUndefined();
  });
});
