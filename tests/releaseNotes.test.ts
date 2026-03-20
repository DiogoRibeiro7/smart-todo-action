import { describe, it, expect } from 'vitest';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { buildReleaseNotes } = require('../scripts/releaseNotes');

describe('buildReleaseNotes', () => {
  it('builds deterministic sections and omits empty ones', () => {
    const notes = buildReleaseNotes({
      branch: 'main',
      tag: 'v1.2.3',
      fromRef: 'v1.2.2',
      toRef: 'HEAD',
      commits: [
        { subject: 'fix: patch parser edge case', body: '' },
        { subject: 'chore(deps): bump glob to 10.5.0', body: '' },
        { subject: 'feat: add release summary output', body: '' },
      ],
    });

    expect(notes).toContain('## Highlights');
    expect(notes).toContain('## Fixes');
    expect(notes).toContain('## Dependencies');
    expect(notes).not.toContain('## Breaking Changes');

    const highlightsIndex = notes.indexOf('## Highlights');
    const fixesIndex = notes.indexOf('## Fixes');
    const depsIndex = notes.indexOf('## Dependencies');
    expect(highlightsIndex).toBeLessThan(fixesIndex);
    expect(fixesIndex).toBeLessThan(depsIndex);
  });
});
