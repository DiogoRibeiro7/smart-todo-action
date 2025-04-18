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
export declare function extractStructuredTags(text: string): Partial<TodoItem>;
