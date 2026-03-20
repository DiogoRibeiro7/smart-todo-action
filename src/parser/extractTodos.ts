import fs from 'fs';
import path from 'path';
import { TodoItem } from './types';
import { normalizeTag } from '../utils/isTextFile';
import { buildTodoTagRegex } from './todoKeywords';

const COMMENT_PATTERNS = [
  { ext: ['.ts', '.js', '.java', '.go', '.c', '.cpp', '.cs', '.rs', '.php', '.h', '.hpp'], pattern: /^\s*\/\/\s*(.*)$/ },
  { ext: ['.py', '.sh', '.rb', '.yaml', '.yml'], pattern: /^\s*#\s*(.*)$/ },
  { ext: ['.html', '.xml'], pattern: /<!--\s*(.*?)\s*-->/ }
];

function extractMetadata(str: string): Record<string, string> {
  const meta: Record<string, string> = {};
  const match = str.match(/\((.*?)\)/);
  if (match) {
    const content = match[1];
    content.split(',').forEach(pair => {
      const [key, val] = pair.split('=').map(s => s.trim());
      if (key && val) meta[key] = val;
    });
  }
  return meta;
}

export function extractTodosFromFile(filePath: string, customKeywords: string[] = []): TodoItem[] {
  const ext = path.extname(filePath);
  const pattern = COMMENT_PATTERNS.find(p => p.ext.includes(ext));
  if (!pattern) return [];
  const tagRegex = buildTodoTagRegex(customKeywords);

  const lines = fs.readFileSync(filePath, 'utf-8').split('\n');
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
          file: filePath,
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
