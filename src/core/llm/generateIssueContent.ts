// src/core/llm/generateIssueContent.ts
import { TodoItem } from '../../parser/types';
import * as core from '@actions/core';
import { chatCompletionWithRetry } from './llmClient';

const provider = core.getInput('llm-provider') || 'openai';
const model =
  provider === 'gemini'
    ? core.getInput('gemini-model') || 'gemini-1.5-pro'
    : core.getInput('openai-model') || 'gpt-3.5-turbo';

export async function generateIssueTitleAndBodyLLM(todo: TodoItem): Promise<{ title: string; body: string }> {
  const prompt = `
You are a helpful assistant converting inline TODO comments from source code into GitHub Issues.

The TODO is:
- Tag: ${todo.tag}
- Text: ${todo.text}
- File: ${todo.file}
- Line: ${todo.line}
- Metadata: ${JSON.stringify(todo.metadata)}

Generate a concise and descriptive GitHub issue title, followed by a detailed body with context.

Format:
TITLE: <title>
BODY:
<detailed body>
`;
  core.debug(`[DEBUG] LLM provider: ${provider}`);
  if (provider === 'openai') {
    core.debug(`[DEBUG] OpenAI key starts with: ${process.env.OPENAI_API_KEY?.slice(0, 5)}`);
  } else {
    core.debug(`[DEBUG] Gemini key starts with: ${process.env.GEMINI_API_KEY?.slice(0, 5)}`);
  }
  core.debug(`[DEBUG] Using model: ${model}`);
  core.debug('[DEBUG] Sending prompt to LLM...');
try {
  const response = await chatCompletionWithRetry({
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
  });
  const result = response.choices[0].message?.content || '';
  const match = result.match(/TITLE:\s*(.+?)\s*BODY:\s*([\s\S]*)/i);

  if (!match) {
    throw new Error('Failed to parse LLM response.');
  }

  const [, title, body] = match;
  return { title: title.trim(), body: body.trim() };
} catch (err: any) {
  console.error('[ERROR] LLM call failed:', err);
  throw err;
}
}

