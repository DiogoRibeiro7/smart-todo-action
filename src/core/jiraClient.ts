// src/core/jiraClient.ts
import * as core from '@actions/core';
import fetch from 'node-fetch';

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
export async function createJiraIssue(summary: string, description: string, projectKey: string = 'TODO') {
  const response = await fetch(`${baseUrl}/rest/api/3/issue`, {
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
