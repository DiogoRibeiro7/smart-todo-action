function normalizeLine(value) {
  return String(value || '').trim();
}

function classifyCommit(subject, body) {
  const s = normalizeLine(subject);
  const b = normalizeLine(body);
  const lower = s.toLowerCase();
  const typeMatch = s.match(/^([a-z]+)(\([^)]+\))?(!)?:\s+/i);
  const type = typeMatch ? typeMatch[1].toLowerCase() : '';
  const scope = typeMatch && typeMatch[2] ? typeMatch[2].toLowerCase() : '';
  const hasBang = Boolean(typeMatch && typeMatch[3]);

  if (hasBang || /breaking change/i.test(b)) return 'breaking';
  if (scope.includes('deps') || /dependabot|\bdeps?\b|\bdependency\b/.test(lower)) return 'dependencies';
  if (type === 'fix') return 'fixes';
  return 'highlights';
}

function buildReleaseNotes({ branch, tag, fromRef, toRef, commits }) {
  const sections = {
    highlights: new Set(),
    fixes: new Set(),
    dependencies: new Set(),
    breaking: new Set(),
  };

  for (const commit of commits) {
    const subject = normalizeLine(commit.subject);
    if (!subject) continue;
    const category = classifyCommit(subject, commit.body);
    sections[category].add(subject);
  }

  const out = [];
  out.push(`# ${tag} Release Notes`);
  out.push('');
  out.push(`- Branch: \`${branch}\``);
  if (fromRef && toRef) {
    out.push(`- Range: \`${fromRef}..${toRef}\``);
  }

  const orderedSections = [
    ['highlights', 'Highlights'],
    ['fixes', 'Fixes'],
    ['dependencies', 'Dependencies'],
    ['breaking', 'Breaking Changes'],
  ];

  for (const [key, title] of orderedSections) {
    const entries = Array.from(sections[key]).sort((a, b) => a.localeCompare(b));
    if (entries.length === 0) continue;
    out.push('');
    out.push(`## ${title}`);
    for (const line of entries) {
      out.push(`- ${line}`);
    }
  }

  return `${out.join('\n')}\n`;
}

module.exports = {
  buildReleaseNotes,
};
