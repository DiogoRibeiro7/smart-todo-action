const DEFAULT_TODO_KEYWORDS = [
  'TODO',
  'FIXME',
  'BUG',
  'HACK',
  'À FAIRE',
  'À CORRIGER',
  'PROBLÈME',
  'ZU TUN',
  'ZU BEHEBEN',
  'FEHLER'
];

const CUSTOM_KEYWORD_PATTERN = /^[A-Za-z][A-Za-z0-9_-]{0,31}$/;

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function parseTodoKeywordsInput(rawInput: string): string[] {
  if (!rawInput.trim()) return [];

  const values = rawInput
    .split(',')
    .map(token => token.trim())
    .filter(Boolean);

  const invalid = values.filter(token => !CUSTOM_KEYWORD_PATTERN.test(token));
  if (invalid.length > 0) {
    throw new Error(
      `Invalid todo-keywords value(s): ${invalid.join(', ')}. Use comma-separated keywords matching [A-Za-z][A-Za-z0-9_-]{0,31}.`
    );
  }

  return Array.from(new Set(values.map(token => token.toUpperCase())));
}

export function buildTodoTagRegex(customKeywords: string[] = []): RegExp {
  const keywords = Array.from(new Set([...DEFAULT_TODO_KEYWORDS, ...customKeywords]));
  const alternation = keywords.map(escapeRegex).join('|');
  return new RegExp(`^\\s*(${alternation})(\\([^)]*\\))?:?\\s*(.*)$`, 'i');
}

