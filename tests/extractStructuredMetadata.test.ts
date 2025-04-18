// tests/extractStructuredMetadata.test.ts
import { describe, it, expect } from 'vitest';
import { extractStructuredMetadata } from '../src/parser/extractStructuredMetadata';

describe('extractStructuredMetadata', () => {
  it('extracts key=value pairs', () => {
    const input = 'TODO priority=high due=2025-06-01';
    const result = extractStructuredMetadata(input);
    expect(result).toEqual({ priority: 'high', due: '2025-06-01' });
  });

  it('supports quoted values', () => {
    const input = 'TODO description="this is a test"';
    const result = extractStructuredMetadata(input);
    expect(result).toEqual({ description: 'this is a test' });
  });

  it('supports @ and # prefixes', () => {
    const input = '@assignee=diogo #module:auth';
    const result = extractStructuredMetadata(input);
    expect(result).toEqual({ assignee: 'diogo', module: 'auth' });
  });


  it('should parse quoted values with colon', () => {
    const input = 'priority high due: "tomorrow"';
    const result = extractStructuredMetadata(input);
    expect(result).toEqual({ due: 'tomorrow' });
 });

  it('handles multiple formats mixed together', () => {
    const input = '@priority=high due="next week" #module:core';
    const result = extractStructuredMetadata(input);
    expect(result).toEqual({ priority: 'high', due: 'next week', module: 'core' });
  });
});
