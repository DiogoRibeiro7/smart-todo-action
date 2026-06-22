import { describe, it, expect, vi } from 'vitest';

const openaiCreateMock = vi.fn();
const geminiGenerateContentMock = vi.fn();

vi.mock('@actions/core', () => ({
  getInput: vi.fn(),
  warning: vi.fn(),
}));

vi.mock('openai', () => ({
  __esModule: true,
  default: vi.fn(() => ({
    chat: {
      completions: {
        create: openaiCreateMock,
      },
    },
  })),
}));

vi.mock('@google/genai', () => ({
  GoogleGenAI: vi.fn(() => ({
    models: {
      generateContent: geminiGenerateContentMock,
    },
  })),
}));

const getCoreMock = async () => {
  return await import('@actions/core');
};

async function loadClient(provider: string) {
  vi.resetModules();

  const coreMock = await getCoreMock();
  (coreMock.getInput as any).mockReset?.();
  (coreMock.getInput as any).mockImplementation((key: string) => {
    if (key === 'llm-provider') return provider;
    if (key === 'openai-api-key') return 'fake-openai-key';
    if (key === 'gemini-api-key') return 'fake-gemini-key';
    return '';
  });

  openaiCreateMock.mockReset();
  geminiGenerateContentMock.mockReset();

  return await import('../src/core/llm/llmClient');
}

describe('chatCompletionWithRetry', () => {
  it('retries and succeeds with OpenAI', async () => {
    vi.useFakeTimers();
    await loadClient('openai');
    const { chatCompletionWithRetry } = await import('../src/core/llm/llmClient');

    openaiCreateMock
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue({ choices: [{ message: { content: 'ok' } }] });

    const promise = chatCompletionWithRetry({ model: 'gpt', messages: [] }, 2);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(openaiCreateMock).toHaveBeenCalledTimes(2);
    expect(result.choices[0].message.content).toBe('ok');
    vi.useRealTimers();
  });

  it('retries and succeeds with Gemini', async () => {
    vi.useFakeTimers();
    await loadClient('gemini');
    const { chatCompletionWithRetry } = await import('../src/core/llm/llmClient');

    geminiGenerateContentMock
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue({ text: 'ok' });

    const promise = chatCompletionWithRetry({ model: 'any', messages: [{ role: 'user', content: 'hi' }] }, 2);
    await vi.runAllTimersAsync();
    const result = await promise;
    expect(geminiGenerateContentMock).toHaveBeenCalledTimes(2);
    expect(result.choices[0].message.content).toBe('ok');
    vi.useRealTimers();
  });
});
