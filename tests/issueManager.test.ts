import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as core from '@actions/core';
import { getExistingIssueTitles, createIssueIfNeeded } from '../src/core/issueManager';
import { TodoItem } from '../src/parser/types';

// Mocks
const mockOctokit = {
  rest: {
    issues: {
      listForRepo: vi.fn(),
      getLabel: vi.fn(),
      createLabel: vi.fn(),
      create: vi.fn()
    }
  }
};

vi.mock('../src/core/labelManager', () => ({
  ensureLabelExists: vi.fn(),
  LABELS_BY_TAG: { TODO: ['enhancement'] },
  labelsFromMetadata: () => ['priority:high'],
  labelsFromTodo: (todo: TodoItem) => ['enhancement', 'priority:high', 'refactor'] // 🆕 mock do novo método
}));

describe('getExistingIssueTitles', () => {
  const octokit = mockOctokit as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should collect titles of open issues (paginated)', async () => {
    octokit.rest.issues.listForRepo
      .mockResolvedValueOnce({ data: [{ title: 'Issue 1' }, { title: 'Issue 2' }] })
      .mockResolvedValueOnce({ data: [] });

    const titles = await getExistingIssueTitles(octokit, 'test-owner', 'test-repo');
    expect([...titles]).toEqual(['Issue 1', 'Issue 2']);
  });
});

describe('createIssueIfNeeded', () => {
  const octokit = mockOctokit as any;
  const owner = 'test-owner';
  const repo = 'test-repo';

  const todo: TodoItem = {
    tag: 'TODO',
    text: 'Refactor component',
    file: 'src/file.ts',
    line: 42,
    metadata: { priority: 'high' }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should skip duplicate issues', async () => {
    const existingTitles: Set<string> = new Set(['[TODO] Refactor component']);

    await createIssueIfNeeded(octokit, owner, repo, todo, existingTitles);

    expect(octokit.rest.issues.create).not.toHaveBeenCalled(); // ✅ espera não ser chamado
  });

  it('should create a new issue if not duplicated', async () => {
    const existingTitles: Set<string> = new Set();

    await createIssueIfNeeded(octokit, owner, repo, todo, existingTitles);

    expect(octokit.rest.issues.create).toHaveBeenCalledWith({
      owner,
      repo,
      title: '[TODO] Refactor component',
      body: expect.stringContaining('Refactor component'),
      labels: ['enhancement', 'priority:high', 'refactor'] // ✅ agora incluindo semantic label
    });
  });
});
