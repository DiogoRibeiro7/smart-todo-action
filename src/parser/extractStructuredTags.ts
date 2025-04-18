// src/parser/extractStructuredTags.ts

import { TodoItem } from './types';

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
export function extractStructuredTags(text: string): Partial<TodoItem> {
  const assignees: string[] = [];
  const modules: string[] = [];
  const structured: Record<string, string> = {};

  const words = text.split(/\s+/);

  for (const word of words) {
    if (word.startsWith('@') && word.length > 1) {
      assignees.push(word.slice(1));
    } else if (word.startsWith('#') && word.length > 1) {
      modules.push(word.slice(1));
    } else if (/^[a-zA-Z0-9_-]+=/.test(word)) {
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
