import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import { generateJsonReport } from '../src/core/report';
import { TodoItem } from '../src/parser/types';

describe('generateJsonReport', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('writes deduplicated todos as stable JSON', () => {
    const todos: TodoItem[] = [
      { tag: 'TODO', text: 'first task', file: 'src/a.ts', line: 1, metadata: { priority: 'high' } },
      { tag: 'TODO', text: 'first task', file: 'src/a.ts', line: 1 },
      { tag: 'BUG', text: 'urgent issue', file: 'src/b.ts', line: 2 }
    ];

    const writeSpy = vi.spyOn(fs, 'writeFileSync').mockImplementation(() => undefined as unknown as void);

    generateJsonReport(todos);

    const [, payload] = writeSpy.mock.calls.find(([filePath]) => String(filePath).endsWith('TODO_REPORT.json')) ?? [];
    expect(payload).toBeDefined();

    const parsed: TodoItem[] = JSON.parse(String(payload));
    expect(parsed.length).toBe(2);
    expect(parsed[0].tag).toBe('BUG');
    expect(parsed[1].tag).toBe('TODO');
  });
});
