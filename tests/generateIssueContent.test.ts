// tests/generateIssueContent.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as core from '@actions/core';
import OpenAI from 'openai';
import { generateIssueTitleAndBodyLLM } from '../src/core/llm/generateIssueContent';
import { TodoItem } from '../src/parser/types';

vi.mock('@actions/core');
vi.mock('openai');

describe('generateIssueTitleAndBodyLLM', () => {
  const mockCore = core as unknown as { getInput: (key: string) => string };
  const mockCreate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock `core.getInput`
    (mockCore.getInput as any) = vi.fn((key: string) => {
      if (key === 'openai-api-key') return 'fake-key';
      if (key === 'openai-model') return 'gpt-3.5-turbo';
      return '';
    });

    // Mock `openai.chat.completions.create`
    (OpenAI as unknown as any).prototype.chat = {
      completions: {
        create: mockCreate,
      },
    };
  });

  it('should return title and body when OpenAI responds correctly', async () => {
    const todo: TodoItem = {
      tag: 'TODO',
      text: 'Refactor this function',
      file: 'src/file.ts',
      line: 10,
      metadata: { priority: 'high' },
    };

    mockCreate.mockResolvedValue({
      choices: [
        {
          message: {
            content: 'TITLE: Improve function\nBODY:\nThis function needs to be refactored for clarity.',
          },
        },
      ],
    });

    const result = await generateIssueTitleAndBodyLLM(todo);

    expect(result).toEqual({
      title: 'Improve function',
      body: 'This function needs to be refactored for clarity.',
    });
  });

  it('should throw if response format is invalid', async () => {
    const todo: TodoItem = {
      tag: 'TODO',
      text: 'Missing format',
      file: 'src/file.ts',
      line: 15,
      metadata: {},
    };

    mockCreate.mockResolvedValue({
      choices: [
        {
          message: { content: 'no format here' },
        },
      ],
    });

    await expect(() => generateIssueTitleAndBodyLLM(todo)).rejects.toThrow('Failed to parse LLM response.');
  });

  it('should throw if OpenAI call fails', async () => {
    const todo: TodoItem = {
      tag: 'TODO',
      text: 'Handle error',
      file: 'src/error.ts',
      line: 99,
      metadata: {},
    };

    mockCreate.mockRejectedValue(new Error('API failure'));

    await expect(() => generateIssueTitleAndBodyLLM(todo)).rejects.toThrow('API failure');
  });
});

