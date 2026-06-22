// src/core/llm/openaiClient.ts
import OpenAI from 'openai';
import { GoogleGenAI } from '@google/genai';
import * as core from '@actions/core';

type LlmProvider = 'openai' | 'gemini';

function resolveProvider(): LlmProvider {
  const provider = core.getInput('llm-provider') || process.env.LLM_PROVIDER || 'openai';
  return provider === 'gemini' ? 'gemini' : 'openai';
}

function resolveApiKey(provider: LlmProvider): string {
  if (provider === 'openai') {
    return process.env.OPENAI_API_KEY || core.getInput('openai-api-key') || '';
  }

  return process.env.GEMINI_API_KEY || core.getInput('gemini-api-key') || '';
}

/**
 * Wraps `openai.chat.completions.create` with simple retry logic.
 * Retries on failure with exponential backoff.
 *
 * @param params Parameters forwarded to OpenAI
 * @param maxRetries Maximum number of attempts before throwing
 */
export interface ChatCompletionParams {
  model: string;
  messages: { role: string; content: string }[];
  temperature?: number;
}

export async function chatCompletionWithRetry(
  params: ChatCompletionParams,
  maxRetries = 3
): Promise<{ choices: { message: { content: string } }[] }> {
  let attempt = 0;
  for (;;) {
    try {
      const provider = resolveProvider();
      const apiKey = resolveApiKey(provider);
      if (!apiKey) {
        throw new Error(`Missing API key for ${provider} LLM provider.`);
      }

      if (provider === 'gemini') {
        const gemini = new GoogleGenAI({ apiKey });
        const prompt = params.messages.map(m => m.content).join('\n');
        const response = await gemini.models.generateContent({
          model: params.model,
          contents: prompt,
          generationConfig: { temperature: params.temperature },
        } as any);
        return { choices: [{ message: { content: (response as any).text } }] } as any;
      }

      const openai = new OpenAI({ apiKey });
      return (await openai.chat.completions.create(params as any)) as any;
    } catch (err) {
      attempt++;
      if (attempt > maxRetries) throw err;
      const delay = Math.min(1000 * 2 ** attempt, 5000);
      core.warning(`LLM request failed (attempt ${attempt}). Retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}
