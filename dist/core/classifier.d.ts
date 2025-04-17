/**
 * Classifies a given TODO text into one or more predefined categories based on its content.
 *
 * @param text - The TODO text to classify.
 * @returns An array of strings representing the labels that match the content of the text.
 *
 * The function identifies the following categories:
 * - `refactor`: Matches keywords related to code refactoring, simplification, or optimization.
 * - `test`: Matches keywords related to testing, such as adding tests or verifying functionality.
 * - `doc`: Matches keywords related to documentation, comments, or explaining code.
 * - `performance`: Matches keywords related to performance improvements or latency issues.
 * - `security`: Matches keywords related to security concerns, vulnerabilities, or sanitization.
 * - `maintenance`: Matches keywords related to deprecation, migration, upgrades, or legacy code removal.
 */
export declare function classifyTodoText(text: string): string[];
