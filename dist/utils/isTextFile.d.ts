/**
 * Checks whether a filename likely corresponds to a text-based source file.
 * Useful for filtering files before parsing for TODOs.
 */
export declare function isTextFile(filename: string): boolean;
/**
 * List of known multilingual aliases for TODO-related tags.
 */
export declare const TAG_ALIASES: Record<string, string[]>;
/**
 * Normalizes a raw tag (e.g. 'À FAIRE') into a canonical tag (e.g. 'TODO')
 */
export declare function normalizeTag(raw: string): string | undefined;
