import { describe, it, expect, vi } from 'vitest';

vi.mock('@google/genai');
vi.mock('openai');

async function loadClient(provider: string) {
  vi.resetModules();
  vi.restoreAllMocks();
  const core = await import('@actions/core');
  vi.spyOn(core, 'getInput').mockImplementation((key: string) => {
    if (key === 'llm-provider') return provider;
    if (key === 'openai-api-key') return 'fake-openai-key';
    if (key === 'gemini-api-key') return 'fake-gemini-key';
    return '';
  });
  return await import('../src/core/llm/llmClient');
}

describe('chatCompletionWithRetry', () => {
  it('retries and succeeds with OpenAI', async () => {
    vi.useFakeTimers();
    const { openai, chatCompletionWithRetry } = await loadClient('openai');
    const mockCreate = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue({ choices: [{ message: { content: 'ok' } }] });
    (openai as any).chat = { completions: { create: mockCreate } };

    const promise = chatCompletionWithRetry({ model: 'gpt', messages: [] }, 2);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(mockCreate).toHaveBeenCalledTimes(2);
    expect(result.choices[0].message.content).toBe('ok');
    vi.useRealTimers();
  });

  it('retries and succeeds with Gemini', async () => {
    vi.useFakeTimers();
    const { gemini, chatCompletionWithRetry } = await loadClient('gemini');
    const mockGen = vi.fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue({ text: 'ok' });
    (gemini as any).models = { generateContent: mockGen };

    const promise = chatCompletionWithRetry({ model: 'any', messages: [{ role: 'user', content: 'hi' }] }, 2);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(mockGen).toHaveBeenCalledTimes(2);
    expect(result.choices[0].message.content).toBe('ok');
    vi.useRealTimers();
  });
});
