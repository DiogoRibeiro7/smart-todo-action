// src/parser/extractTodosFromContent.ts

import { TodoItem } from './types';
import { normalizeTag } from '../utils/isTextFile';
import { buildTodoTagRegex } from './todoKeywords';

const COMMENT_PATTERNS = [
  { ext: ['.ts', '.js', '.java', '.go', '.c', '.cpp', '.cs', '.rs', '.php', '.h', '.hpp'], pattern: /(?:^|\s)\/\/\s*(.*?)\s*$/ },
  { ext: ['.py', '.sh', '.rb', '.yaml', '.yml'], pattern: /(?:^|\s)#\s*(.*?)\s*$/ },
  { ext: ['.html', '.xml'], pattern: /<!--\s*(.*?)\s*-->/ }
];

function extractMetadata(str: string): Record<string, string> {
  const meta: Record<string, string> = {};
  const match = str.match(/\((.*?)\)/);
  if (match) {
    const content = match[1];
    const pairs: string[] = [];
    let current = '';
    let inQuotes = false;
    let quoteChar = '';

    for (let i = 0; i < content.length; i++) {
      const char = content[i];
      if (char === '\\' && content[i + 1] === quoteChar) {
        current += content[i + 1];
        i += 1;
        continue;
      }

      if ((char === '"' || char === "'") && !inQuotes) {
        inQuotes = true;
        quoteChar = char;
        continue;
      }

      if (char === quoteChar && inQuotes) {
        inQuotes = false;
        quoteChar = '';
        continue;
      }

      if (char === ',' && !inQuotes) {
        pairs.push(current);
        current = '';
        continue;
      }

      current += char;
    }

    if (current.trim()) {
      pairs.push(current);
    }

    for (const pair of pairs) {
      const [key, val] = pair.split('=').map(s => s.trim());
      if (key && val) meta[key] = val;
    }
  }
  return meta;
}

export function extractTodosFromString(content: string, ext: string, customKeywords: string[] = []): TodoItem[] {
  const pattern = COMMENT_PATTERNS.find(p => p.ext.includes(ext));
  if (!pattern) return [];
  const tagRegex = buildTodoTagRegex(customKeywords);

  const lines = content.split('\n');
  const todos: TodoItem[] = [];

  lines.forEach((line, idx) => {
    const commentMatch = line.match(pattern.pattern);
    if (commentMatch) {
      const comment = commentMatch[1];
      const tagMatch = comment.match(tagRegex);
      if (tagMatch) {
        const [_, rawTag, metaRaw, text] = tagMatch;
        const metadata = metaRaw ? extractMetadata(metaRaw) : undefined;
        const tag = normalizeTag(rawTag) ?? rawTag.toUpperCase();
        todos.push({
          file: `inline${ext}`,
          line: idx + 1,
          tag,
          text: text.trim(),
          metadata
        });
      }
    }
  });

  return todos;
}

