/**
 * Extracts structured metadata from a TODO text string.
 * Supports patterns like:
 *   - @key:value
 *   - #key=value
 *   - key=value
 *   - key="multi word string"
 *
 * @param text The text from which to extract metadata.
 * @returns A dictionary of metadata keys and values.
 */
export declare function extractStructuredMetadata(text: string): Record<string, string>;
