/**
 * Creates a new Jira issue in the specified project.
 *
 * @param summary - The summary or title of the Jira issue.
 * @param description - A detailed description of the Jira issue.
 * @param projectKey - The key of the Jira project where the issue will be created. Defaults to 'TODO'.
 * @returns A promise that resolves to the created Jira issue data.
 * @throws An error if the Jira issue creation fails, including the HTTP status and response text.
 */
export declare function createJiraIssue(summary: string, description: string, projectKey?: string): Promise<unknown>;
