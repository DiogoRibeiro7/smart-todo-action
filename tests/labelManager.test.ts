import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as core from '@actions/core';
import path from 'path';
import { labelsFromMetadata, ensureLabelExists, loadLabelConfig } from '../src/core/labelManager';

const mockOctokit = {
  rest: {
    issues: {
      getLabel: vi.fn(),
      createLabel: vi.fn()
    }
  }
};

describe('labelsFromMetadata', () => {
  it('should return key:value pairs from metadata object', () => {
    const metadata = { priority: 'high', due: '2025-06-01' };
    const labels = labelsFromMetadata(metadata);
    expect(labels).toEqual(['priority:high', 'due:2025-06-01']);
  });

  it('should return empty array if metadata is undefined', () => {
    expect(labelsFromMetadata(undefined)).toEqual([]);
  });
});

describe('ensureLabelExists', () => {
  const octokit = mockOctokit as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not create label if it already exists', async () => {
    octokit.rest.issues.getLabel.mockResolvedValueOnce({ status: 200 });

    await ensureLabelExists(octokit, 'test-owner', 'test-repo', 'bug');

    expect(octokit.rest.issues.getLabel).toHaveBeenCalled();
    expect(octokit.rest.issues.createLabel).not.toHaveBeenCalled();
  });

  it('should create label if it does not exist (404)', async () => {
    const error = { status: 404 };
    octokit.rest.issues.getLabel.mockRejectedValueOnce(error);
    octokit.rest.issues.createLabel.mockResolvedValueOnce({});

    await ensureLabelExists(octokit, 'test-owner', 'test-repo', 'priority:high');

    expect(octokit.rest.issues.createLabel).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      name: 'priority:high',
      color: 'cccccc',
      description: 'Auto-created by smart-todo-action'
    });
  });

  it('should use custom config for color and description', async () => {
    const error = { status: 404 } as any;
    octokit.rest.issues.getLabel.mockRejectedValueOnce(error);
    octokit.rest.issues.createLabel.mockResolvedValueOnce({});

    const cfg = path.join(__dirname, 'fixtures/label-config.json');
    loadLabelConfig(cfg);

    await ensureLabelExists(octokit, 'test-owner', 'test-repo', 'bug');

    expect(octokit.rest.issues.createLabel).toHaveBeenCalledWith({
      owner: 'test-owner',
      repo: 'test-repo',
      name: 'bug',
      color: 'ff0000',
      description: 'Custom bug'
    });
  });
});

