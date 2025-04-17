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
const core = __importStar(require("@actions/core"));
const github = __importStar(require("@actions/github"));
const extractTodosFromDir_1 = require("./parser/extractTodosFromDir");
const issueManager_1 = require("./core/issueManager");
const report_1 = require("./core/report");
const todoUtils_1 = require("./core/todoUtils");
async function run() {
    try {
        const token = core.getInput('repo-token', { required: true });
        const generateReport = core.getInput('report') === 'true';
        const titleTemplatePath = core.getInput('issue-title-template');
        const bodyTemplatePath = core.getInput('issue-body-template');
        const workspace = process.env.GITHUB_WORKSPACE || '.';
        const todos = (0, extractTodosFromDir_1.extractTodosFromDir)(workspace);
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
        const todosToCreate = (0, todoUtils_1.limitTodos)(uniqueTodos, 5);
        for (const todo of todosToCreate) {
            await (0, issueManager_1.createIssueIfNeeded)(octokit, owner, repo, todo, existingTitles, titleTemplatePath, bodyTemplatePath);
        }
        if (generateReport) {
            (0, report_1.generateMarkdownReport)(todos);
            core.info('📝 Generated TODO_REPORT.md');
        }
    }
    catch (error) {
        core.setFailed(`Action failed: ${error.message}`);
    }
}
run();
