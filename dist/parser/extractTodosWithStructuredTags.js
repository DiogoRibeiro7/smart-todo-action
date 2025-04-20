"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTodosWithStructuredTags = extractTodosWithStructuredTags;
const extractTodosFromContent_1 = require("./extractTodosFromContent");
const extractStructuredTags_1 = require("./extractStructuredTags");
const fs_1 = __importDefault(require("fs"));
function extractTodosWithStructuredTags(filePath) {
    const ext = filePath.slice(filePath.lastIndexOf('.'));
    const content = fs_1.default.readFileSync(filePath, 'utf8');
    const todos = (0, extractTodosFromContent_1.extractTodosFromString)(content, ext);
    return todos.map(todo => {
        const structured = (0, extractStructuredTags_1.extractStructuredTags)(todo.text);
        return {
            ...todo,
            metadata: {
                ...(todo.metadata || {}),
                ...Object.fromEntries(Object.entries(structured).map(([key, value]) => [key, String(value)])),
            },
        };
    });
}
