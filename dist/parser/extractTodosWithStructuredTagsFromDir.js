"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTodosWithStructuredTagsFromDir = extractTodosWithStructuredTagsFromDir;
// src/parser/extractTodosWithStructuredTagsFromDir.ts
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const extractTodosWithStructuredTags_1 = require("./extractTodosWithStructuredTags");
function extractTodosWithStructuredTagsFromDir(dir) {
    const todos = [];
    function walk(currentPath) {
        const entries = fs_1.default.readdirSync(currentPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path_1.default.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            }
            else if (entry.isFile()) {
                try {
                    const fileTodos = (0, extractTodosWithStructuredTags_1.extractTodosWithStructuredTags)(fullPath);
                    todos.push(...fileTodos);
                }
                catch {
                    // opcional: log de ficheiros ignorados
                }
            }
        }
    }
    walk(dir);
    return todos;
}
