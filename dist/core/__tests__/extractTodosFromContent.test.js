"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const extractTodosFromContent_1 = require("../../parser/extractTodosFromContent");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('extractTodosFromString', () => {
    (0, vitest_1.it)('extracts multiple TODO-style tags', () => {
        const content = `// BUG: crash here\n# FIXME: wrong\n<!-- TODO: layout -->`;
        const jsTodos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.js');
        const pyTodos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.py');
        const htmlTodos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.html');
        (0, vitest_1.expect)(jsTodos.length).toBe(1);
        (0, vitest_1.expect)(jsTodos[0].tag).toBe('BUG');
        (0, vitest_1.expect)(pyTodos.length).toBe(1);
        (0, vitest_1.expect)(pyTodos[0].tag).toBe('FIXME');
        (0, vitest_1.expect)(htmlTodos.length).toBe(1);
        (0, vitest_1.expect)(htmlTodos[0].tag).toBe('TODO');
    });
    (0, vitest_1.it)('extracts metadata key=value pairs', () => {
        const content = `// TODO(priority=high, due=2025-06-01): fix it`;
        const todos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.js');
        (0, vitest_1.expect)(todos.length).toBe(1);
        (0, vitest_1.expect)(todos[0].metadata).toEqual({
            priority: 'high',
            due: '2025-06-01'
        });
    });
});
