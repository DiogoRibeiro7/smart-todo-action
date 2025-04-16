import { TodoItem } from './types';

const COMMENT_PATTERNS = [
  { ext: ['.ts', '.js', '.java', '.go'], pattern: /^\s*\/\/\s*(.*)$/ },
  { ext: ['.py', '.sh', '.rb'], pattern: /^\s*#\s*(.*)$/ },
  { ext: ['.html', '.xml'], pattern: /<!--\s*(.*?)\s*-->/ }
];

const TAG_REGEX = /(TODO|FIXME|BUG|HACK)(\([^)]*\))?:?\s*(.*)/i;

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

export function extractTodosFromString(content: string, ext: string): TodoItem[] {
  const pattern = COMMENT_PATTERNS.find(p => p.ext.includes(ext));
  if (!pattern) return [];

  const lines = content.split('\n');
  const todos: TodoItem[] = [];

  lines.forEach((line, idx) => {
    const commentMatch = line.match(pattern.pattern);
    if (commentMatch) {
      const comment = commentMatch[1];
      const tagMatch = comment.match(TAG_REGEX);
      if (tagMatch) {
        const [_, tag, metaRaw, text] = tagMatch;
        const metadata = metaRaw ? extractMetadata(metaRaw) : undefined;
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
