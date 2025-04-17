"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTodosFromFile = extractTodosFromFile;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const COMMENT_PATTERNS = [
    { ext: ['.ts', '.js', '.java', '.go'], pattern: /^\s*\/\/\s*(.*)$/ },
    { ext: ['.py', '.sh', '.rb'], pattern: /^\s*#\s*(.*)$/ },
    { ext: ['.html', '.xml'], pattern: /<!--\s*(.*?)\s*-->/ }
];
const TAG_REGEX = /(TODO|FIXME|BUG|HACK)(\([^)]*\))?:?\s*(.*)/i;
function extractMetadata(str) {
    const meta = {};
    const match = str.match(/\((.*?)\)/);
    if (match) {
        const content = match[1];
        content.split(',').forEach(pair => {
            const [key, val] = pair.split('=').map(s => s.trim());
            if (key && val)
                meta[key] = val;
        });
    }
    return meta;
}
function extractTodosFromFile(filePath) {
    const ext = path_1.default.extname(filePath);
    const pattern = COMMENT_PATTERNS.find(p => p.ext.includes(ext));
    if (!pattern)
        return [];
    const lines = fs_1.default.readFileSync(filePath, 'utf-8').split('\n');
    const todos = [];
    lines.forEach((line, idx) => {
        const commentMatch = line.match(pattern.pattern);
        if (commentMatch) {
            const comment = commentMatch[1];
            const tagMatch = comment.match(TAG_REGEX);
            if (tagMatch) {
                const [_, tag, metaRaw, text] = tagMatch;
                const metadata = metaRaw ? extractMetadata(metaRaw) : undefined;
                todos.push({
                    file: filePath,
                    line: idx + 1,
                    tag,
                    text: text.trim(),
                    metadata
                });
            }
        }
    });
    return todos;
}
