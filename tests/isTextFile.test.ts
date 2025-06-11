import { describe, it, expect } from 'vitest';
import { isTextFile } from '../src/utils/isTextFile';

describe('isTextFile', () => {
  it('returns true for supported extensions', () => {
    const files = ['main.c', 'module.cpp', 'program.rs', 'config.yaml'];
    for (const f of files) {
      expect(isTextFile(f)).toBe(true);
    }
  });

  it('returns false for unsupported extensions', () => {
    expect(isTextFile('image.png')).toBe(false);
  });
});
