import fetch from 'node-fetch';

/**
 * Creates a new Jira issue in the specified project.
 *
 * @param {Object} params - The parameters for creating the Jira issue.
 * @param {string} params.summary - The summary or title of the Jira issue.
 * @param {string} params.description - The detailed description of the Jira issue.
 * @param {string} params.jiraBaseUrl - The base URL of the Jira instance.
 * @param {string} params.jiraEmail - The email address associated with the Jira account.
 * @param {string} params.jiraApiToken - The API token for authenticating with Jira.
 * @param {string} [params.projectKey='TODO'] - The key of the Jira project where the issue will be created. Defaults to 'TODO'.
 * @param {string} [params.issueType='Task'] - The type of the Jira issue (e.g., 'Task', 'Bug'). Defaults to 'Task'.
 * @returns {Promise<void>} A promise that resolves when the Jira issue is successfully created.
 * @throws {Error} Throws an error if the Jira issue creation fails, including the HTTP status and response text.
 */
export async function createJiraIssue({
  summary,
  description,
  jiraBaseUrl,
  jiraEmail,
  jiraApiToken,
  projectKey = 'TODO',
  issueType = 'Task'
}: {
  summary: string;
  description: string;
  jiraBaseUrl: string;
  jiraEmail: string;
  jiraApiToken: string;
  projectKey?: string;
  issueType?: string;
}): Promise<void> {
  const url = `${jiraBaseUrl}/rest/api/3/issue`;

  const payload = {
    fields: {
      summary,
      description,
      issuetype: { name: issueType },
      project: { key: projectKey }
    }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${jiraEmail}:${jiraApiToken}`).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Jira issue creation failed: ${res.status} — ${text}`);
  }
}
