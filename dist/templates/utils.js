"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyTemplate = applyTemplate;
exports.loadTemplate = loadTemplate;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const DEFAULT_TEMPLATES = {
    'issueTitle.txt': '[{{tag}}] {{text}}',
    'issueBody.md': 'Found in `{{file}}:{{line}}`\n\n```\n{{text}}\n```'
};
function applyTemplate(template, data) {
    return template.replace(/{{(.*?)}}/g, (_, key) => String(data[key.trim()] ?? ''));
}
function loadTemplate(templatePath) {
    const isRelative = !path_1.default.isAbsolute(templatePath);
    const resolvedPath = isRelative
        ? path_1.default.resolve(process.cwd(), templatePath)
        : templatePath;
    try {
        return fs_1.default.readFileSync(resolvedPath, 'utf-8');
    }
    catch (err) {
        const fallback = DEFAULT_TEMPLATES[path_1.default.basename(templatePath)];
        if (fallback)
            return fallback;
        throw new Error(`Template not found: ${templatePath}`);
    }
}
