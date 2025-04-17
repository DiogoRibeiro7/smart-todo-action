"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const extractTodosFromContent_1 = require("../../parser/extractTodosFromContent");
(0, vitest_1.describe)('extractTodosFromString - comment support by extension', () => {
    (0, vitest_1.it)('extracts from JS-style (//) for .js/.ts/.go/.java', () => {
        const code = `// TODO: js comment\n// BUG: broken`;
        const extensions = ['.js', '.ts', '.go', '.java'];
        for (const ext of extensions) {
            const todos = (0, extractTodosFromContent_1.extractTodosFromString)(code, ext);
            (0, vitest_1.expect)(todos.length).toBe(2);
            (0, vitest_1.expect)(todos[0].tag).toBe('TODO');
            (0, vitest_1.expect)(todos[1].tag).toBe('BUG');
        }
    });
    (0, vitest_1.it)('extracts from Python-style (#) for .py/.sh/.rb', () => {
        const code = `# TODO: python comment\n# FIXME: fix me`;
        const extensions = ['.py', '.sh', '.rb'];
        for (const ext of extensions) {
            const todos = (0, extractTodosFromContent_1.extractTodosFromString)(code, ext);
            (0, vitest_1.expect)(todos.length).toBe(2);
            (0, vitest_1.expect)(todos[0].tag).toBe('TODO');
            (0, vitest_1.expect)(todos[1].tag).toBe('FIXME');
        }
    });
    (0, vitest_1.it)('extracts from HTML-style (<!-- -->) for .html/.xml', () => {
        const code = `<!-- TODO: html fix -->\n<!-- HACK: temp hack -->`;
        const extensions = ['.html', '.xml'];
        for (const ext of extensions) {
            const todos = (0, extractTodosFromContent_1.extractTodosFromString)(code, ext);
            (0, vitest_1.expect)(todos.length).toBe(2);
            (0, vitest_1.expect)(todos[0].tag).toBe('TODO');
            (0, vitest_1.expect)(todos[1].tag).toBe('HACK');
        }
    });
    (0, vitest_1.it)('returns [] for unsupported extensions', () => {
        const code = `// TODO: will not be parsed`;
        const todos = (0, extractTodosFromContent_1.extractTodosFromString)(code, '.txt');
        (0, vitest_1.expect)(todos).toEqual([]);
    });
});
