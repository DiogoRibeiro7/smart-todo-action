const fs = require('node:fs');
const { execSync } = require('node:child_process');
const { buildReleaseNotes } = require('./releaseNotes');

function readEnv(name, fallback = '') {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function listTags() {
  const output = execSync('git tag --list "v*" --sort=-creatordate', { encoding: 'utf8' }).trim();
  return output ? output.split(/\r?\n/).map((x) => x.trim()).filter(Boolean) : [];
}

function collectCommits(fromRef, toRef) {
  const range = fromRef ? `${fromRef}..${toRef}` : toRef;
  const output = execSync(`git log --format=%s%x00%b%x1e ${range}`, { encoding: 'utf8' });

  return output
    .split('\x1e')
    .map((record) => record.trim())
    .filter(Boolean)
    .map((record) => {
      const [subject = '', body = ''] = record.split('\x00');
      return { subject: subject.trim(), body: body.trim() };
    });
}

function main() {
  const tag = readEnv('RELEASE_TAG', 'v0.0.0');
  const branch = readEnv('RELEASE_BRANCH', 'unknown');
  const toRef = readEnv('RELEASE_TO_REF', 'HEAD');
  const notesPath = readEnv('RELEASE_NOTES_PATH', 'RELEASE_NOTES.md');

  const allTags = listTags();
  const fromRef = allTags.find((t) => t !== tag) || '';
  const commits = collectCommits(fromRef, toRef);

  const notes = buildReleaseNotes({
    branch,
    tag,
    fromRef,
    toRef,
    commits,
  });

  fs.writeFileSync(notesPath, notes, 'utf8');
  console.log(`Generated ${notesPath} with ${commits.length} commit(s).`);
}

main();
