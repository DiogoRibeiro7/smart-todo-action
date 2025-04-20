"use strict";
// src/parser/extractStructuredTags.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractStructuredTags = extractStructuredTags;
/**
 * Extracts structured tags from TODO comment text.
 *
 * Supports:
 * - @username → assignees
 * - #module → modules
 * - key=value → structured metadata
 *
 * @param text Raw TODO text
 * @returns Partial<TodoItem> with assignees, modules, and structured tags
 */
function extractStructuredTags(text) {
    const assignees = [];
    const modules = [];
    const structured = {};
    const words = text.split(/\s+/);
    for (const word of words) {
        if (word.startsWith('@') && word.length > 1) {
            assignees.push(word.slice(1));
        }
        else if (word.startsWith('#') && word.length > 1) {
            modules.push(word.slice(1));
        }
        else if (/^[a-zA-Z0-9_-]+=/.test(word)) {
            const [key, ...valueParts] = word.split('=');
            const value = valueParts.join('=');
            if (key && value) {
                structured[key] = value.replace(/^['"]|['"]$/g, ''); // strip quotes
            }
        }
    }
    return {
        assignees: assignees.length ? assignees : undefined,
        modules: modules.length ? modules : undefined,
        structured: Object.keys(structured).length ? structured : undefined,
    };
}
