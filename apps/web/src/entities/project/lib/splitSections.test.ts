import { describe, expect, it } from 'vitest';
import { splitSections } from './splitSections.ts';

describe('splitSections', () => {
  it('cuts a body on "## <kind>" headings', () => {
    expect(splitSections('## context\nA.\n\n## role\nB.')).toEqual([
      { kind: 'context', bodyMd: 'A.' },
      { kind: 'role', bodyMd: 'B.' },
    ]);
  });

  it('ignores headings that are not section kinds', () => {
    expect(splitSections('## context\nA.\n## Autre titre\nsuite')).toEqual([{ kind: 'context', bodyMd: 'A.\n## Autre titre\nsuite' }]);
  });
});
