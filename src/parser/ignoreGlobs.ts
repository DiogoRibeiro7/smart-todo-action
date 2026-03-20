const DEFAULT_IGNORED_GLOBS = [
  '**/node_modules/**',
  '**/dist/**',
  '**/coverage/**'
];

function escapeRegex(value: string): string {
  return value.replace(/[.+^${}()|[\]\\]/g, '\\$&');
}

function globToRegex(glob: string): RegExp {
  const normalized = glob.replace(/\\/g, '/').replace(/^\.\/+/, '');
  const hasLeadingAnyDir = normalized.startsWith('**/');
  const source = hasLeadingAnyDir ? normalized.slice(3) : normalized;
  let regex = '';

  for (let i = 0; i < source.length; i += 1) {
    const current = source[i];
    const next = source[i + 1];

    if (current === '*' && next === '*') {
      regex += '.*';
      i += 1;
      continue;
    }

    if (current === '*') {
      regex += '[^/]*';
      continue;
    }

    if (current === '?') {
      regex += '[^/]';
      continue;
    }

    regex += escapeRegex(current);
  }

  const prefix = hasLeadingAnyDir ? '(?:.*/)?' : '';

  if (!source.includes('/')) {
    return new RegExp(`^(?:.*/)?${prefix}${regex}(?:/.*)?$`);
  }

  return new RegExp(`^${prefix}${regex}$`);
}

export function parseIgnoreGlobsInput(rawInput: string): string[] {
  if (!rawInput.trim()) return [];
  return rawInput
    .split(',')
    .map(token => token.trim())
    .filter(Boolean)
    .map(token => token.replace(/\\/g, '/'));
}

export function buildIgnoreMatchers(customIgnoreGlobs: string[] = []): RegExp[] {
  const all = [...DEFAULT_IGNORED_GLOBS, ...customIgnoreGlobs];
  return all.map(globToRegex);
}

export function shouldIgnorePath(relativePath: string, matchers: RegExp[]): boolean {
  const normalized = relativePath.replace(/\\/g, '/').replace(/^\.\//, '');
  return matchers.some(matcher => matcher.test(normalized) || matcher.test(`${normalized}/`));
}
