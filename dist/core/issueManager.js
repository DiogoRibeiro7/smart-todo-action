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
exports.getExistingIssueTitles = getExistingIssueTitles;
exports.createIssueIfNeeded = createIssueIfNeeded;
const core = __importStar(require("@actions/core"));
const labelManager_1 = require("./labelManager");
const utils_1 = require("../templates/utils");
async function getExistingIssueTitles(octokit, owner, repo) {
    const existing = new Set();
    const perPage = 100;
    let page = 1;
    let done = false;
    while (!done) {
        const { data } = await octokit.rest.issues.listForRepo({
            owner,
            repo,
            state: 'open',
            per_page: perPage,
            page
        });
        for (const issue of data) {
            if (!issue.pull_request) {
                existing.add(issue.title);
            }
        }
        if (data.length < perPage) {
            done = true;
        }
        else {
            page++;
        }
    }
    return existing;
}
async function createIssueIfNeeded(octokit, owner, repo, todo, existingTitles, titlePath, bodyPath) {
    const titleTemplate = (0, utils_1.loadTemplate)('issueTitle.txt');
    const bodyTemplate = (0, utils_1.loadTemplate)('issueBody.md');
    const flattened = {
        ...todo,
        ...todo.metadata
    };
    const title = (0, utils_1.applyTemplate)(titleTemplate, flattened);
    const body = (0, utils_1.applyTemplate)(bodyTemplate, flattened);
    if (existingTitles.has(title)) {
        core.info(`🟡 Skipping duplicate issue: ${title}`);
        return;
    }
    const labels = (0, labelManager_1.labelsFromTodo)(todo);
    for (const label of labels) {
        await (0, labelManager_1.ensureLabelExists)(octokit, owner, repo, label);
    }
    try {
        await octokit.rest.issues.create({
            owner,
            repo,
            title,
            body,
            labels
        });
        core.info(`✅ Created issue with labels [${labels.join(', ')}]: ${title}`);
    }
    catch (err) {
        core.warning(`⚠️ Failed to create issue for: ${title} — ${err.message}`);
    }
}
