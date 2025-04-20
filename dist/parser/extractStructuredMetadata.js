"use strict";
// src/parser/extractStructuredMetadata.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStructuredMetadata = extractStructuredMetadata;
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
function extractStructuredMetadata(text) {
    const metadata = {};
    const regex = /(?:[@#])?(\w+)\s*[:=]\s*(?:"([^"]+)"|(\S+))/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
        const key = match[1];
        const value = match[2] || match[3];
        if (key && value) {
            metadata[key] = value;
        }
    }
    return metadata;
}
