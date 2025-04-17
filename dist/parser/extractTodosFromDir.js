"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTodosFromDir = extractTodosFromDir;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const extractTodos_1 = require("./extractTodos");
const SUPPORTED_EXTENSIONS = ['.ts', '.js', '.py', '.go', '.java', '.rb', '.sh', '.html', '.xml'];
function extractTodosFromDir(dirPath) {
    const todos = [];
    function walk(currentPath) {
        const entries = fs_1.default.readdirSync(currentPath, { withFileTypes: true });
        for (const entry of entries) {
            const fullPath = path_1.default.join(currentPath, entry.name);
            if (entry.isDirectory()) {
                walk(fullPath);
            }
            else if (entry.isFile()) {
                const ext = path_1.default.extname(entry.name);
                if (SUPPORTED_EXTENSIONS.includes(ext)) {
                    const fileTodos = (0, extractTodos_1.extractTodosFromFile)(fullPath);
                    todos.push(...fileTodos);
                }
            }
        }
    }
    walk(dirPath);
    return todos;
}
