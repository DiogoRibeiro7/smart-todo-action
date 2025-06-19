import fs from 'fs';

/**
 * Increment the patch component of a semantic version string.
 *
 * @param version - Existing semantic version (e.g., "1.2.3").
 * @returns New version string with the patch number incremented.
 */
function bumpPatchVersion(version: string): string {
  const [major, minor, patch] = version.split('.').map(Number);
  return `${major}.${minor}.${patch + 1}`;
}

/**
 * Read package.json, update its version field, and persist the change.
 *
 * @param filePath - Path to the package.json file.
 */
function updatePackageVersion(filePath: string): void {
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8')) as { version: string };
  const newVersion = bumpPatchVersion(pkg.version);

  // Update version in memory
  pkg.version = newVersion;

  // Write updated package.json back to disk, preserving formatting
  fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
  console.log(`\u2705 Updated version to ${newVersion}`);
}

(function main() {
  updatePackageVersion('package.json');
})();
