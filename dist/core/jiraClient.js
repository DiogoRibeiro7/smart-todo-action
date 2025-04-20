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
exports.createJiraIssue = createJiraIssue;
// src/core/jiraClient.ts
const core = __importStar(require("@actions/core"));
const node_fetch_1 = __importDefault(require("node-fetch"));
const baseUrl = core.getInput('jira-base-url');
const email = core.getInput('jira-email');
const apiToken = core.getInput('jira-api-token');
const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
/**
 * Creates a new Jira issue in the specified project.
 *
 * @param summary - The summary or title of the Jira issue.
 * @param description - A detailed description of the Jira issue.
 * @param projectKey - The key of the Jira project where the issue will be created. Defaults to 'TODO'.
 * @returns A promise that resolves to the created Jira issue data.
 * @throws An error if the Jira issue creation fails, including the HTTP status and response text.
 */
async function createJiraIssue(summary, description, projectKey = 'TODO') {
    const response = await (0, node_fetch_1.default)(`${baseUrl}/rest/api/3/issue`, {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${auth}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fields: {
                project: { key: projectKey },
                summary,
                description,
                issuetype: { name: 'Task' }
            }
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Jira issue creation failed: ${response.status} ${text}`);
    }
    const data = await response.json();
    return data;
}
