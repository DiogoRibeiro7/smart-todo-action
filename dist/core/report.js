"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMarkdownReport = generateMarkdownReport;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const todoUtils_1 = require("./todoUtils");
const PRIORITY_ORDER = ['high', 'medium', 'low'];
function getPriority(todo) {
    return todo.metadata?.priority?.toLowerCase?.() ?? '';
}
function getDue(todo) {
    return todo.metadata?.due ?? '';
}
function sortTodos(a, b) {
    const pa = getPriority(a);
    const pb = getPriority(b);
    const prioA = PRIORITY_ORDER.indexOf(pa);
    const prioB = PRIORITY_ORDER.indexOf(pb);
    if (prioA !== prioB) {
        return (prioA === -1 ? Infinity : prioA) - (prioB === -1 ? Infinity : prioB);
    }
    const da = getDue(a);
    const db = getDue(b);
    if (da && db)
        return da.localeCompare(db);
    if (da)
        return -1;
    if (db)
        return 1;
    return 0;
}
function generateMarkdownReport(todos) {
    const seen = new Set();
    const uniqueTodos = todos.filter(todo => {
        const key = (0, todoUtils_1.todoKey)(todo);
        if (seen.has(key))
            return false;
        seen.add(key);
        return true;
    });
    const grouped = {};
    for (const todo of uniqueTodos) {
        if (!grouped[todo.tag])
            grouped[todo.tag] = [];
        grouped[todo.tag].push(todo);
    }
    let content = `# 📌 TODO Report\n\nTotal unique TODOs: **${uniqueTodos.length}**\n\n`;
    for (const tag of Object.keys(grouped)) {
        const sorted = grouped[tag].sort(sortTodos);
        content += `## ${tag}\n\n`;
        for (const todo of sorted) {
            const prio = getPriority(todo);
            const due = getDue(todo);
            const meta = [prio && `priority=${prio}`, due && `due=${due}`].filter(Boolean).join(', ');
            content += `- \`${todo.file}:${todo.line}\` — ${todo.text}`;
            if (meta)
                content += ` _( ${meta} )_`;
            content += `\n`;
        }
        content += '\n';
    }
    fs_1.default.writeFileSync(path_1.default.join(process.cwd(), 'TODO_REPORT.md'), content);
}
