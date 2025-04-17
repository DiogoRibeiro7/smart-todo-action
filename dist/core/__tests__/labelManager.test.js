"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const labelManager_1 = require("../labelManager");
const mockOctokit = {
    rest: {
        issues: {
            getLabel: vitest_1.vi.fn(),
            createLabel: vitest_1.vi.fn()
        }
    }
};
(0, vitest_1.describe)('labelsFromMetadata', () => {
    (0, vitest_1.it)('should return key:value pairs from metadata object', () => {
        const metadata = { priority: 'high', due: '2025-06-01' };
        const labels = (0, labelManager_1.labelsFromMetadata)(metadata);
        (0, vitest_1.expect)(labels).toEqual(['priority:high', 'due:2025-06-01']);
    });
    (0, vitest_1.it)('should return empty array if metadata is undefined', () => {
        (0, vitest_1.expect)((0, labelManager_1.labelsFromMetadata)(undefined)).toEqual([]);
    });
});
(0, vitest_1.describe)('ensureLabelExists', () => {
    const octokit = mockOctokit;
    beforeEach(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.it)('should not create label if it already exists', async () => {
        octokit.rest.issues.getLabel.mockResolvedValueOnce({ status: 200 });
        await (0, labelManager_1.ensureLabelExists)(octokit, 'test-owner', 'test-repo', 'bug');
        (0, vitest_1.expect)(octokit.rest.issues.getLabel).toHaveBeenCalled();
        (0, vitest_1.expect)(octokit.rest.issues.createLabel).not.toHaveBeenCalled();
    });
    (0, vitest_1.it)('should create label if it does not exist (404)', async () => {
        const error = { status: 404 };
        octokit.rest.issues.getLabel.mockRejectedValueOnce(error);
        octokit.rest.issues.createLabel.mockResolvedValueOnce({});
        await (0, labelManager_1.ensureLabelExists)(octokit, 'test-owner', 'test-repo', 'priority:high');
        (0, vitest_1.expect)(octokit.rest.issues.createLabel).toHaveBeenCalledWith({
            owner: 'test-owner',
            repo: 'test-repo',
            name: 'priority:high',
            color: 'cccccc',
            description: 'Auto-created by smart-todo-action'
        });
    });
});
