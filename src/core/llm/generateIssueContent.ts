// src/core/llm/generateIssueContent.ts
import { TodoItem } from '../../parser/types';
import OpenAI from 'openai';
import * as core from '@actions/core';

const openai = new OpenAI({
    apiKey: core.getInput('openai-api-key'), // correto agora
  });

const model = core.getInput('openai-model') || 'gpt-3.5-turbo';

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
  // 👇 Adiciona aqui
  core.debug(`[DEBUG] OpenAI key starts with: ${process.env.OPENAI_API_KEY?.slice(0, 5)}`);
  core.debug(`[DEBUG] Using model: ${model}`);
  core.debug('[DEBUG] Sending prompt to OpenAI...');
try {
  const response = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.4,
  });
  // TODO(priority=high): improve retry logic for API errors
  const result = response.choices[0].message?.content || '';
  const match = result.match(/TITLE:\s*(.+?)\s*BODY:\s*([\s\S]*)/i);

  if (!match) {
    throw new Error('Failed to parse LLM response.');
  }

  const [, title, body] = match;
  return { title: title.trim(), body: body.trim() };
} catch (err: any) {
  console.error('[ERROR] OpenAI call failed:', err);
  throw err;
}
}

