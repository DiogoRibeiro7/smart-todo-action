"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateChangelogFromTodos = generateChangelogFromTodos;
const classifier_1 = require("./classifier");
function formatGroupHeader(tag, semantic, metadataKey, metadataValue) {
    const parts = [tag];
    if (semantic)
        parts.push(semantic);
    if (metadataKey && metadataValue)
        parts.push(`${metadataKey}:${metadataValue}`);
    return `## ${parts.join(' · ')}`;
}
function generateChangelogFromTodos(todos) {
    const groups = {};
    for (const todo of todos) {
        const semantics = (0, classifier_1.classifyTodoText)(todo.text);
        const metadataEntries = Object.entries(todo.metadata || {}) || [['', '']];
        const tag = todo.tag.toUpperCase();
        for (const semantic of semantics.length ? semantics : ['']) {
            for (const [metaKey, metaValue] of metadataEntries.length ? metadataEntries : [['', '']]) {
                const key = JSON.stringify({ tag, semantic, metaKey, metaValue });
                if (!groups[key])
                    groups[key] = [];
                groups[key].push(todo);
            }
        }
    }
    const output = ['# 📝 Changelog (from TODOs)', ''];
    for (const key of Object.keys(groups)) {
        const { tag, semantic, metaKey, metaValue } = JSON.parse(key);
        output.push(formatGroupHeader(tag, semantic, metaKey, metaValue));
        for (const todo of groups[key]) {
            output.push(`- ${todo.text} (\`${todo.file}:${todo.line}\`)`);
        }
        output.push('');
    }
    return output.join('\n');
}
