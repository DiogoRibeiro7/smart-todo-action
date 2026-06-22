import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getExistingIssueTitles,
  createIssueIfNeeded,
  processStaleTodoIssues,
  StalePolicy
} from '../src/core/issueManager';
import { TodoItem } from '../src/parser/types';

// Mocks
const mockOctokit = {
  rest: {
    issues: {
      listForRepo: vi.fn(),
      getLabel: vi.fn(),
      createLabel: vi.fn(),
      create: vi.fn(),
      addLabels: vi.fn(),
      createComment: vi.fn(),
      update: vi.fn()
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

  it('should skip duplicate issues with normalized-text strategy', async () => {
    const existingKeys: Set<string> = new Set(['[todo] refactor component']);

    await createIssueIfNeeded(octokit, owner, repo, todo, existingKeys, 'normalized-text');

    expect(octokit.rest.issues.create).not.toHaveBeenCalled();
  });
});

describe('processStaleTodoIssues', () => {
  const octokit = mockOctokit as any;
  const owner = 'test-owner';
  const repo = 'test-repo';

  const policy: StalePolicy = {
    staleDays: 30,
    staleLabel: 'stale',
    staleComment: 'Marked stale by action.',
    staleCloseDays: 7,
    staleCloseComment: 'Closing stale issue.',
    managedLabels: ['enhancement', 'bug', 'technical-debt']
  };

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-06-22T00:00:00.000Z'));
    vi.resetAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should mark managed issues as stale when inactive', async () => {
    const now = new Date().toISOString();
    const staleDate = new Date(Date.parse(now) - 31 * 24 * 60 * 60 * 1000).toISOString();

    octokit.rest.issues.listForRepo
      .mockResolvedValueOnce({
        data: [
          {
            number: 101,
            title: '[TODO] Old task',
            updated_at: staleDate,
            labels: [{ name: 'enhancement' }]
          }
        ]
      })
      .mockResolvedValueOnce({ data: [] });

    await processStaleTodoIssues(octokit, owner, repo, policy);

    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      owner,
      repo,
      issue_number: 101,
      labels: ['stale']
    });
    expect(octokit.rest.issues.createComment).toHaveBeenCalledWith({
      owner,
      repo,
      issue_number: 101,
      body: 'Marked stale by action.'
    });
    expect(octokit.rest.issues.update).not.toHaveBeenCalled();
  });

  it('should close managed stale issues after extended inactivity', async () => {
    const now = new Date().toISOString();
    const staleCloseDate = new Date(
      Date.parse(now) - 38 * 24 * 60 * 60 * 1000
    ).toISOString();

    octokit.rest.issues.listForRepo.mockResolvedValueOnce({
      data: [
        {
          number: 202,
          title: '[BUG] Long inactive issue',
          updated_at: staleCloseDate,
          labels: [{ name: 'bug' }, { name: 'stale' }]
        }
      ]
    });

    await processStaleTodoIssues(octokit, owner, repo, policy);

    expect(octokit.rest.issues.createComment).toHaveBeenCalledWith({
      owner,
      repo,
      issue_number: 202,
      body: 'Closing stale issue.'
    });
    expect(octokit.rest.issues.update).toHaveBeenCalledWith({
      owner,
      repo,
      issue_number: 202,
      state: 'closed'
    });
    expect(octokit.rest.issues.addLabels).not.toHaveBeenCalled();
  });

  it('should skip issues without managed labels', async () => {
    const now = new Date().toISOString();
    const staleDate = new Date(Date.parse(now) - 31 * 24 * 60 * 60 * 1000).toISOString();

    octokit.rest.issues.listForRepo.mockResolvedValueOnce({
      data: [
        {
          number: 303,
          title: 'External issue',
          updated_at: staleDate,
          labels: [{ name: 'docs' }]
        }
      ]
    });

    await processStaleTodoIssues(octokit, owner, repo, policy);

    expect(octokit.rest.issues.addLabels).not.toHaveBeenCalled();
    expect(octokit.rest.issues.createComment).not.toHaveBeenCalled();
    expect(octokit.rest.issues.update).not.toHaveBeenCalled();
  });
});
