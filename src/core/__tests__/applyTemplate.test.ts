import { applyTemplate } from '../../templates/utils';
import { describe, it, expect } from 'vitest'

describe('applyTemplate', () => {
  it('replaces simple variables', () => {
    const template = '[{{tag}}] {{text}}';
    const data = {
      tag: 'TODO',
      text: 'Implement login flow'
    };

    const result = applyTemplate(template, data);
    expect(result).toBe('[TODO] Implement login flow');
  });

  it('ignores missing variables', () => {
    const template = 'Priority: {{priority}}';
    const data = {
      tag: 'TODO'
    };

    const result = applyTemplate(template, data);
    expect(result).toBe('Priority: ');
  });

  it('handles numeric values', () => {
    const template = 'Line {{line}}: {{text}}';
    const data = {
      line: 42,
      text: 'Optimize loop'
    };

    const result = applyTemplate(template, data);
    expect(result).toBe('Line 42: Optimize loop');
  });
});




