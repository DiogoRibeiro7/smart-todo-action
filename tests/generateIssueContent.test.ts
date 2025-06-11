// tests/generateIssueContent.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import OpenAI from 'openai';

async function loadGenerator(provider: string) {
  vi.resetModules();
  const coreModule = await import('@actions/core');
  (coreModule.getInput as any) = vi.fn((key: string) => {
    if (key === 'llm-provider') return provider;
    if (key === 'openai-api-key') return 'fake-key';
    if (key === 'openai-model') return 'gpt-3.5-turbo';
    if (key === 'gemini-model') return 'gemini-1.5-pro';
    return '';
  });
  return await import('../src/core/llm/generateIssueContent');
}
import { TodoItem } from '../src/parser/types';

vi.mock('@actions/core');
vi.mock('openai');
vi.mock('@google/genai');

describe('generateIssueTitleAndBodyLLM', () => {
  const mockCreate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (OpenAI as unknown as any).prototype.chat = {
      completions: { create: mockCreate },
    };
  });

  it('should return title and body when OpenAI responds correctly', async () => {
    const { generateIssueTitleAndBodyLLM } = await loadGenerator('openai');
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
    const { generateIssueTitleAndBodyLLM } = await loadGenerator('openai');
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
    const { generateIssueTitleAndBodyLLM } = await loadGenerator('openai');
    vi.useFakeTimers();

    const todo: TodoItem = {
      tag: 'TODO',
      text: 'Handle error',
      file: 'src/error.ts',
      line: 99,
      metadata: {},
    };

    mockCreate.mockRejectedValue(new Error('API failure'));

    const promise = generateIssueTitleAndBodyLLM(todo);
    const expectation = expect(promise).rejects.toThrow('API failure');
    await vi.runAllTimersAsync();
    await expectation;
    vi.useRealTimers();
  });

  it('should work with Gemini provider', async () => {
    const { generateIssueTitleAndBodyLLM } = await loadGenerator('gemini');
    const todo: TodoItem = {
      tag: 'TODO',
      text: 'Gemini task',
      file: 'src/file.ts',
      line: 5,
      metadata: {},
    };

    (await import('@google/genai')).GoogleGenAI.prototype.models = {
      generateContent: vi.fn().mockResolvedValue({ text: 'TITLE: G\nBODY: B' }),
    } as any;

    const result = await generateIssueTitleAndBodyLLM(todo);
    expect(result).toEqual({ title: 'G', body: 'B' });
  });
});

