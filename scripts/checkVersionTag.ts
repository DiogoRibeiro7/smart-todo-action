import { readFileSync } from 'fs';
import { execSync } from 'child_process';

const pkg = JSON.parse(readFileSync('package.json', 'utf8'));

function getGitTag(): string | null {
  const envTag = process.env.GITHUB_REF?.startsWith('refs/tags/')
    ? process.env.GITHUB_REF.replace('refs/tags/', '')
    : undefined;
  if (envTag) return envTag;
  try {
    return execSync('git describe --tags --exact-match').toString().trim();
  } catch {
    return null;
  }
}

const tag = getGitTag();
if (!tag) {
  console.log('No git tag found; skipping version check');
  process.exit(0);
}

const normalizedTag = tag.startsWith('v') ? tag.slice(1) : tag;
if (pkg.version !== normalizedTag) {
  console.error(
    `Version mismatch: package.json is ${pkg.version} but tag is ${tag}`
  );
  process.exit(1);
}

console.log(`\u2714\ufe0f package.json version ${pkg.version} matches tag ${tag}`);
