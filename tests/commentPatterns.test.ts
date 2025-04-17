import { describe, it, expect } from 'vitest';
import { extractTodosFromString } from '../src/parser/extractTodosFromContent';

describe('extractTodosFromString - comment support by extension', () => {
  it('extracts from JS-style (//) for .js/.ts/.go/.java', () => {
    const code = `// TODO: js comment\n// BUG: broken`;
    const extensions = ['.js', '.ts', '.go', '.java'];

    for (const ext of extensions) {
      const todos = extractTodosFromString(code, ext);
      expect(todos.length).toBe(2);
      expect(todos[0].tag).toBe('TODO');
      expect(todos[1].tag).toBe('BUG');
    }
  });

  it('extracts from Python-style (#) for .py/.sh/.rb', () => {
    const code = `# TODO: python comment\n# FIXME: fix me`;
    const extensions = ['.py', '.sh', '.rb'];

    for (const ext of extensions) {
      const todos = extractTodosFromString(code, ext);
      expect(todos.length).toBe(2);
      expect(todos[0].tag).toBe('TODO');
      expect(todos[1].tag).toBe('FIXME');
    }
  });

  it('extracts from HTML-style (<!-- -->) for .html/.xml', () => {
    const code = `<!-- TODO: html fix -->\n<!-- HACK: temp hack -->`;
    const extensions = ['.html', '.xml'];

    for (const ext of extensions) {
      const todos = extractTodosFromString(code, ext);
      expect(todos.length).toBe(2);
      expect(todos[0].tag).toBe('TODO');
      expect(todos[1].tag).toBe('HACK');
    }
  });

  it('returns [] for unsupported extensions', () => {
    const code = `// TODO: will not be parsed`;
    const todos = extractTodosFromString(code, '.txt');
    expect(todos).toEqual([]);
  });
});
