// src/utils/isTextFile.ts

/**
 * Checks whether a filename likely corresponds to a text-based source file.
 * Useful for filtering files before parsing for TODOs.
 */
export function isTextFile(filename: string): boolean {
    return /\.(ts|js|jsx|tsx|py|rb|sh|go|java|html|css|json|md|txt|xml|yaml|yml)$/i.test(filename);
  }
  