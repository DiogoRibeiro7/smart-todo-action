import { describe, it, expect } from 'vitest';
import { classifyTodoText } from '../classifier';

describe('classifyTodoText', () => {
  it('classifies refactor-related TODOs', () => {
    const text = 'Refactor this function to improve readability';
    expect(classifyTodoText(text)).toContain('refactor');
  });

  it('classifies test-related TODOs', () => {
    const text = 'Add unit tests for edge cases';
    expect(classifyTodoText(text)).toContain('test');
  });

  it('classifies doc-related TODOs', () => {
    const text = 'Document this method and its arguments';
    expect(classifyTodoText(text)).toContain('doc');
  });

  it('classifies performance-related TODOs', () => {
    const text = 'Optimize this query to reduce latency';
    expect(classifyTodoText(text)).toContain('performance');
  });

  it('classifies security-related TODOs', () => {
    const text = 'Check for injection vulnerabilities';
    expect(classifyTodoText(text)).toContain('security');
  });

  it('classifies maintenance-related TODOs', () => {
    const text = 'Deprecate old API and migrate to v2';
    expect(classifyTodoText(text)).toContain('maintenance');
  });

  it('returns empty array for unrelated TODOs', () => {
    const text = 'Ask John about next steps';
    expect(classifyTodoText(text)).toEqual([]);
  });

  it('handles mixed case and accents', () => {
    const text = 'Rewrite legacy logic and add docs';
    const labels = classifyTodoText(text);
    expect(labels).toContain('refactor');
    expect(labels).toContain('doc');
  });
});
