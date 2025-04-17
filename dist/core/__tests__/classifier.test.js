"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const classifier_1 = require("../classifier");
(0, vitest_1.describe)('classifyTodoText', () => {
    (0, vitest_1.it)('classifies refactor-related TODOs', () => {
        const text = 'Refactor this function to improve readability';
        (0, vitest_1.expect)((0, classifier_1.classifyTodoText)(text)).toContain('refactor');
    });
    (0, vitest_1.it)('classifies test-related TODOs', () => {
        const text = 'Add unit tests for edge cases';
        (0, vitest_1.expect)((0, classifier_1.classifyTodoText)(text)).toContain('test');
    });
    (0, vitest_1.it)('classifies doc-related TODOs', () => {
        const text = 'Document this method and its arguments';
        (0, vitest_1.expect)((0, classifier_1.classifyTodoText)(text)).toContain('doc');
    });
    (0, vitest_1.it)('classifies performance-related TODOs', () => {
        const text = 'Optimize this query to reduce latency';
        (0, vitest_1.expect)((0, classifier_1.classifyTodoText)(text)).toContain('performance');
    });
    (0, vitest_1.it)('classifies security-related TODOs', () => {
        const text = 'Check for injection vulnerabilities';
        (0, vitest_1.expect)((0, classifier_1.classifyTodoText)(text)).toContain('security');
    });
    (0, vitest_1.it)('classifies maintenance-related TODOs', () => {
        const text = 'Deprecate old API and migrate to v2';
        (0, vitest_1.expect)((0, classifier_1.classifyTodoText)(text)).toContain('maintenance');
    });
    (0, vitest_1.it)('returns empty array for unrelated TODOs', () => {
        const text = 'Ask John about next steps';
        (0, vitest_1.expect)((0, classifier_1.classifyTodoText)(text)).toEqual([]);
    });
    (0, vitest_1.it)('handles mixed case and accents', () => {
        const text = 'Rewrite legacy logic and add docs';
        const labels = (0, classifier_1.classifyTodoText)(text);
        (0, vitest_1.expect)(labels).toContain('refactor');
        (0, vitest_1.expect)(labels).toContain('doc');
    });
});
