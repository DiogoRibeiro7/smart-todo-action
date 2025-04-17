"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../templates/utils");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('applyTemplate', () => {
    (0, vitest_1.it)('replaces simple variables', () => {
        const template = '[{{tag}}] {{text}}';
        const data = {
            tag: 'TODO',
            text: 'Implement login flow'
        };
        const result = (0, utils_1.applyTemplate)(template, data);
        (0, vitest_1.expect)(result).toBe('[TODO] Implement login flow');
    });
    (0, vitest_1.it)('ignores missing variables', () => {
        const template = 'Priority: {{priority}}';
        const data = {
            tag: 'TODO'
        };
        const result = (0, utils_1.applyTemplate)(template, data);
        (0, vitest_1.expect)(result).toBe('Priority: ');
    });
    (0, vitest_1.it)('handles numeric values', () => {
        const template = 'Line {{line}}: {{text}}';
        const data = {
            line: 42,
            text: 'Optimize loop'
        };
        const result = (0, utils_1.applyTemplate)(template, data);
        (0, vitest_1.expect)(result).toBe('Line 42: Optimize loop');
    });
});
