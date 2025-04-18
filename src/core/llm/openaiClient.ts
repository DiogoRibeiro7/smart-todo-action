// src/core/llm/openaiClient.ts
import OpenAI from 'openai';
import * as core from '@actions/core';

export const openai = new OpenAI({
  apiKey: core.getInput('openai-api-key'),
});
