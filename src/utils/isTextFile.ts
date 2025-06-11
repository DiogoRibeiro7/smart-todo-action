// src/utils/isTextFile.ts

/**
 * Checks whether a filename likely corresponds to a text-based source file.
 * Useful for filtering files before parsing for TODOs.
 */
export function isTextFile(filename: string): boolean {
  return /\.(ts|js|jsx|tsx|py|rb|sh|go|java|c|cpp|cs|rs|php|h|hpp|html|css|json|md|txt|xml|yaml|yml)$/i.test(filename);
}
  
  /**
   * List of known multilingual aliases for TODO-related tags.
   */
  export const TAG_ALIASES: Record<string, string[]> = {
    TODO: ['TODO', 'A FAZER', 'À FAIRE', 'ZU TUN'],
    FIXME: ['FIXME', 'A CORRIGIR', 'À CORRIGER', 'ZU BEHEBEN'],
    BUG: ['BUG', 'ERRO', 'ERREUR', 'FEHLER'],
    HACK: ['HACK'],
  };
  
  /**
   * Normalizes a raw tag (e.g. 'À FAIRE') into a canonical tag (e.g. 'TODO')
   */
  export function normalizeTag(raw: string): string | undefined {
    const upper = raw.toUpperCase();
    for (const [canonical, aliases] of Object.entries(TAG_ALIASES)) {
      if (aliases.includes(upper)) return canonical;
    }
    return undefined;
  }
  