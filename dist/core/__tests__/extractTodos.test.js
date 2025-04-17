"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const extractTodosFromContent_1 = require("../../parser/extractTodosFromContent");
(0, vitest_1.describe)('extractTodos', () => {
    (0, vitest_1.it)('extracts simple TODOs with //', () => {
        const content = `// TODO: clean this up\nconst a = 1;`;
        const todos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.js');
        (0, vitest_1.expect)(todos.length).toBe(1);
        (0, vitest_1.expect)(todos[0].text).toBe('clean this up');
        (0, vitest_1.expect)(todos[0].tag).toBe('TODO');
        (0, vitest_1.expect)(todos[0].line).toBe(1);
    });
    (0, vitest_1.it)('extracts multiple tags', () => {
        const content = `# BUG: crashes\n# FIXME: something wrong`;
        const todos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.py');
        (0, vitest_1.expect)(todos.length).toBe(2);
        (0, vitest_1.expect)(todos.map(t => t.tag)).toEqual(['BUG', 'FIXME']);
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
    (0, vitest_1.it)('supports HTML comments', () => {
        const content = `<!-- TODO: fix layout -->`;
        const todos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.html');
        (0, vitest_1.expect)(todos.length).toBe(1);
        (0, vitest_1.expect)(todos[0].tag).toBe('TODO');
    });
    (0, vitest_1.it)('returns empty list if no TODOs are found', () => {
        const content = `const x = 5; // just a comment`;
        const todos = (0, extractTodosFromContent_1.extractTodosFromString)(content, '.js');
        (0, vitest_1.expect)(todos.length).toBe(0);
    });
});
