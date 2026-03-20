import { describe, it, expect } from 'vitest';
import { buildIgnoreMatchers, parseIgnoreGlobsInput, shouldIgnorePath } from '../src/parser/ignoreGlobs';

describe('ignoreGlobs', () => {
  it('parses comma-separated ignore globs', () => {
    expect(parseIgnoreGlobsInput('**/fixtures/**, **/*.snap')).toEqual(['**/fixtures/**', '**/*.snap']);
  });

  it('matches default ignored paths', () => {
    const matchers = buildIgnoreMatchers([]);
    expect(shouldIgnorePath('node_modules/pkg/index.js', matchers)).toBe(true);
    expect(shouldIgnorePath('src/main.ts', matchers)).toBe(false);
  });

  it('matches custom ignored paths', () => {
    const matchers = buildIgnoreMatchers(['**/fixtures/**']);
    expect(shouldIgnorePath('tests/fixtures/one-file.ts', matchers)).toBe(true);
    expect(shouldIgnorePath('tests/example.ts', matchers)).toBe(false);
  });
});

