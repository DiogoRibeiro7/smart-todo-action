import fs from 'fs';

/**
 * Increment the semantic version based on the requested bump strategy.
 *
 * @param version - Existing semantic version (e.g., "1.2.3").
 * @returns New semantic version string.
 */
function bumpVersion(version: string, bumpKind: string): string {
  const [major, minor, patch] = version.split('.').map(Number);

  if (!Number.isInteger(major) || !Number.isInteger(minor) || !Number.isInteger(patch)) {
    throw new Error(`Invalid version format: ${version}`);
  }

  if (/^\d+\.\d+\.\d+$/.test(bumpKind)) {
    return bumpKind;
  }

  if (bumpKind === 'major') {
    return `${major + 1}.0.0`;
  }

  if (bumpKind === 'minor') {
    return `${major}.${minor + 1}.0`;
  }

  if (bumpKind === 'patch') {
    return `${major}.${minor}.${patch + 1}`;
  }

  throw new Error(`Unsupported bump kind: ${bumpKind}`);
}

/**
 * Read package.json, update its version field, and persist the change.
 *
 * @param filePath - Path to the package.json file.
 */
function updatePackageVersion(filePath: string): void {
  const bumpKind = process.argv[2] ?? 'patch';
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8')) as { version: string };
  const newVersion = bumpVersion(pkg.version, bumpKind);

  // Update version in memory
  pkg.version = newVersion;

  // Write updated package.json back to disk, preserving formatting
  fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(`\u2705 Updated version to ${newVersion}`);
}

(function main() {
  updatePackageVersion('package.json');
})();
