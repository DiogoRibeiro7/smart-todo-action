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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/ActionMain.ts
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const fs_1 = __importDefault(require("fs"));
const extractTodosFromDir_1 = require("./parser/extractTodosFromDir");
const extractTodosWithStructuredTagsFromDir_1 = require("./parser/extractTodosWithStructuredTagsFromDir"); // 👈 novo
const issueManager_1 = require("./core/issueManager");
const report_1 = require("./core/report");
const todoUtils_1 = require("./core/todoUtils");
const changelog_1 = require("./core/changelog");
// TODO(priority=high, due=2025-06-01) Refactor login logic @alice #auth type=refactor
async function run() {
    try {
        const token = core.getInput('repo-token', { required: true });
        const generateReport = core.getInput('report') === 'true';
        const titleTemplatePath = core.getInput('issue-title-template');
        const bodyTemplatePath = core.getInput('issue-body-template');
        const workspace = process.env.GITHUB_WORKSPACE || '.';
        // LLM support
        process.env.OPENAI_API_KEY = core.getInput('openai-api-key') || process.env.OPENAI_API_KEY;
        const useLLM = core.getInput('llm') === 'true';
        if (useLLM && !process.env.OPENAI_API_KEY) {
            core.warning('⚠️ LLM is enabled, but OPENAI_API_KEY is not set.');
        }
        const useStructured = core.getInput('structured') === 'true';
        const todos = useStructured
            ? (0, extractTodosWithStructuredTagsFromDir_1.extractTodosWithStructuredTagsFromDir)(workspace)
            : (0, extractTodosFromDir_1.extractTodosFromDir)(workspace);
        const octokit = github.getOctokit(token);
        const { owner, repo } = github.context.repo;
        core.info(`🔍 Found ${todos.length} TODOs`);
        const existingTitles = await (0, issueManager_1.getExistingIssueTitles)(octokit, owner, repo);
        const seenKeys = new Set();
        const uniqueTodos = todos.filter(todo => {
            const key = (0, todoUtils_1.todoKey)(todo);
            if (seenKeys.has(key))
                return false;
            seenKeys.add(key);
            return true;
        });
        const issueLimit = parseInt(core.getInput('limit') || '5', 10);
        const todosToCreate = (0, todoUtils_1.limitTodos)(uniqueTodos, issueLimit);
        for (const todo of todosToCreate) {
            await (0, issueManager_1.createIssueIfNeeded)(octokit, owner, repo, todo, existingTitles, titleTemplatePath, bodyTemplatePath);
        }
        if (generateReport) {
            (0, report_1.generateMarkdownReport)(todos);
            core.info('📝 Generated TODO_REPORT.md');
            const changelog = (0, changelog_1.generateChangelogFromTodos)(todos);
            fs_1.default.writeFileSync('CHANGELOG.md', changelog, 'utf8');
            core.info('📦 Generated CHANGELOG.md');
        }
    }
    catch (error) {
        core.setFailed(`Action failed: ${error.message}`);
    }
}
run();
