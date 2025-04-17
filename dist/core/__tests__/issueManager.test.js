"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const issueManager_1 = require("../issueManager");
// Mocks
const mockOctokit = {
    rest: {
        issues: {
            listForRepo: vitest_1.vi.fn(),
            getLabel: vitest_1.vi.fn(),
            createLabel: vitest_1.vi.fn(),
            create: vitest_1.vi.fn()
        }
    }
};
vitest_1.vi.mock('../labelManager', () => ({
    ensureLabelExists: vitest_1.vi.fn(),
    LABELS_BY_TAG: { TODO: ['enhancement'] },
    labelsFromMetadata: () => ['priority:high']
}));
(0, vitest_1.describe)('getExistingIssueTitles', () => {
    const octokit = mockOctokit;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should collect titles of open issues (paginated)', async () => {
        octokit.rest.issues.listForRepo
            .mockResolvedValueOnce({ data: [{ title: 'Issue 1' }, { title: 'Issue 2' }] })
            .mockResolvedValueOnce({ data: [] });
        const titles = await (0, issueManager_1.getExistingIssueTitles)(octokit, 'test-owner', 'test-repo');
        (0, vitest_1.expect)([...titles]).toEqual(['Issue 1', 'Issue 2']);
    });
});
(0, vitest_1.describe)('createIssueIfNeeded', () => {
    const octokit = mockOctokit;
    const owner = 'test-owner';
    const repo = 'test-repo';
    const todo = {
        tag: 'TODO',
        text: 'Refactor component',
        file: 'src/file.ts',
        line: 42,
        metadata: { priority: 'high' }
    };
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should skip duplicate issues', async () => {
        const existingTitles = new Set(['[TODO] Refactor component']);
        await (0, issueManager_1.createIssueIfNeeded)(octokit, owner, repo, todo, existingTitles);
        (0, vitest_1.expect)(octokit.rest.issues.create).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('should create a new issue if not duplicated', async () => {
        const existingTitles = new Set();
        await (0, issueManager_1.createIssueIfNeeded)(octokit, owner, repo, todo, existingTitles);
        (0, vitest_1.expect)(octokit.rest.issues.create).toHaveBeenCalledWith({
            owner,
            repo,
            title: '[TODO] Refactor component',
            body: vitest_1.expect.stringContaining('src/file.ts'),
            labels: ['enhancement', 'priority:high']
        });
    });
});
