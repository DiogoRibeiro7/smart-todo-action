"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LABEL_COLORS = exports.LABELS_BY_TAG = void 0;
exports.labelsFromMetadata = labelsFromMetadata;
exports.labelsFromTodo = labelsFromTodo;
exports.ensureLabelExists = ensureLabelExists;
const core = __importStar(require("@actions/core"));
const classifier_1 = require("./classifier"); // Novo: classificador heurístico ou LLM
// Labels atribuídas por tipo de comentário
exports.LABELS_BY_TAG = {
    TODO: ['enhancement'],
    FIXME: ['bug'],
    BUG: ['bug'],
    HACK: ['technical-debt']
};
// Cores associadas a cada label base
exports.LABEL_COLORS = {
    bug: 'd73a4a',
    enhancement: 'a2eeef',
    todo: 'cfd3d7',
    'technical-debt': 'e99695',
    refactor: 'f9d0c4',
    test: 'fef2c0',
    doc: '0075ca'
};
// Fallback para labels metadata:priority, due, etc.
function labelsFromMetadata(metadata) {
    if (!metadata)
        return [];
    return Object.entries(metadata).map(([key, value]) => `${key}:${value}`);
}
// Novo: combina tag, metadata e classificação semântica
function labelsFromTodo(todo) {
    const tag = todo.tag.toUpperCase();
    const tagLabels = exports.LABELS_BY_TAG[tag] || ['todo'];
    const metaLabels = labelsFromMetadata(todo.metadata);
    const semanticLabels = (0, classifier_1.classifyTodoText)(todo.text); // ← vem de `classifier.ts`
    return Array.from(new Set([...tagLabels, ...metaLabels, ...semanticLabels]));
}
// Garante que uma label existe no repositório
async function ensureLabelExists(octokit, owner, repo, label) {
    try {
        await octokit.rest.issues.getLabel({ owner, repo, name: label });
    }
    catch (err) {
        if (err.status === 404) {
            const base = label.split(':')[0];
            const color = exports.LABEL_COLORS[base] || 'cccccc';
            await octokit.rest.issues.createLabel({
                owner,
                repo,
                name: label,
                color,
                description: 'Auto-created by smart-todo-action'
            });
            core.info(`🏷️ Created label: ${label}`);
        }
        else {
            core.warning(`⚠️ Could not verify label "${label}": ${err.message}`);
        }
    }
}
