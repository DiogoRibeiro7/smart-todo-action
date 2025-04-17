/**
 * classifyTodoText.ts
 * -------------------
 * Heuristic classification of TODO comment text into common categories like `refactor`, `test`, `doc`, etc.
 * These labels are added in addition to tag-based and metadata-based labels.
 * This can be replaced with a smarter LLM-powered classifier later on.
 */
/**
 * Returns semantic labels based on the content of the TODO text.
 * These are meant to capture the intent of the TODO using simple keyword heuristics.
 *
 * @param text The body of the TODO comment (without tag).
 * @returns A list of labels like 'refactor', 'test', 'doc', etc.
 */
export declare function classifyTodoText(text: string): string[];
