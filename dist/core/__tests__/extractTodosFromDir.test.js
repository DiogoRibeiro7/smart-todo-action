"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const path_1 = __importDefault(require("path"));
const extractTodosFromDir_1 = require("../../parser/extractTodosFromDir");
(0, vitest_1.describe)('extractTodosFromDir', () => {
    const base = path_1.default.join(__dirname, 'fixtures');
    (0, vitest_1.it)('should extract TODOs from supported files recursively', () => {
        const todos = (0, extractTodosFromDir_1.extractTodosFromDir)(base);
        (0, vitest_1.expect)(todos.length).toBe(2);
        const texts = todos.map(t => t.text);
        (0, vitest_1.expect)(texts).toContain('Refactor this module');
        (0, vitest_1.expect)(texts).toContain('Handle edge case');
        const tags = todos.map(t => t.tag);
        (0, vitest_1.expect)(tags).toContain('TODO');
        (0, vitest_1.expect)(tags).toContain('FIXME');
    });
    (0, vitest_1.it)('should include correct file and line information', () => {
        const todos = (0, extractTodosFromDir_1.extractTodosFromDir)(base);
        const one = todos.find(t => t.text.includes('Refactor'));
        (0, vitest_1.expect)(one?.file.endsWith('one-file.ts')).toBe(true);
        (0, vitest_1.expect)(typeof one?.line).toBe('number');
        (0, vitest_1.expect)(one?.line).toBeGreaterThan(0);
    });
});
