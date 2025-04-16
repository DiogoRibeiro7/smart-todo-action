import fs from 'fs';
import path from 'path';

const DEFAULT_TEMPLATES: Record<string, string> = {
  'issueTitle.txt': '[{{tag}}] {{text}}',
  'issueBody.md': 'Found in `{{file}}:{{line}}`\n\n```\n{{text}}\n```'
};

export function applyTemplate(template: string, data: Record<string, string | number>): string {
  return template.replace(/{{(.*?)}}/g, (_, key) => String(data[key.trim()] ?? ''));
}

export function loadTemplate(templatePath: string): string {
  const isRelative = !path.isAbsolute(templatePath);
  const resolvedPath = isRelative
    ? path.resolve(process.cwd(), templatePath)
    : templatePath;

  try {
    return fs.readFileSync(resolvedPath, 'utf-8');
  } catch (err) {
    const fallback = DEFAULT_TEMPLATES[path.basename(templatePath)];
    if (fallback) return fallback;
    throw new Error(`Template not found: ${templatePath}`);
  }
}

