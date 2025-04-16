import fs from 'fs';
import path from 'path';

const DEFAULT_TEMPLATES: Record<string, string> = {
  'issueTitle.txt': '[{{tag}}] {{text}}',
  'issueBody.md': 'Found in `{{file}}:{{line}}`\n\n```\n{{text}}\n```'
};

export function applyTemplate(template: string, data: Record<string, string | number>) {
  return template.replace(/{{(.*?)}}/g, (_, key) => String(data[key.trim()] ?? ''));
}

export function loadTemplate(name: string): string {
  try {
    const filePath = path.join(__dirname, name);
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    const fallback = DEFAULT_TEMPLATES[name];
    if (fallback) {
      return fallback;
    } else {
      throw new Error(`Missing template: ${name}`);
    }
  }
}
