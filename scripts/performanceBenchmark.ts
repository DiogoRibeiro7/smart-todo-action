import fs from 'fs';
import os from 'os';
import path from 'path';
import { performance } from 'perf_hooks';
import { extractTodosFromDirWithKeywords } from '../src/parser/extractTodosFromDir';

interface BenchmarkBaseline {
  name: string;
  files: number;
  linesPerFile: number;
  subdirectories: number;
  keywords: string[];
  baselineMs: number;
  thresholdPercent: number;
  notes?: string;
}

const BASELINE_FILE = path.resolve(process.cwd(), 'benchmarks', 'scan-baseline.json');

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    updateBaseline: args.includes('--update-baseline'),
    dryRun: args.includes('--dry-run')
  };
}

function loadBaseline(): BenchmarkBaseline {
  const raw = fs.readFileSync(BASELINE_FILE, 'utf8');
  return JSON.parse(raw) as BenchmarkBaseline;
}

function buildFixture(baseDir: string, cfg: BenchmarkBaseline) {
  const { files, linesPerFile, subdirectories, keywords } = cfg;
  const filesPerDir = Math.max(1, Math.floor(files / Math.max(1, subdirectories)));
  const remainder = files % subdirectories;
  const tsHeader = [
    '// TODO: baseline perf entry',
    '# FIXME: baseline perf',
    '<!-- HACK: baseline perf -->'
  ];

  for (let dir = 0; dir < subdirectories; dir++) {
    const sectionDir = path.join(baseDir, `module-${String(dir).padStart(3, '0')}`);
    fs.mkdirSync(sectionDir, { recursive: true });

    const count = filesPerDir + (dir < remainder ? 1 : 0);
    for (let i = 0; i < count; i++) {
      const idx = dir * filesPerDir + i;
      const useTs = (idx % 2) === 0;
      const fileName = path.join(sectionDir, useTs ? `file-${idx}.ts` : `script-${idx}.py`);
      const lines = [];

      for (let line = 0; line < linesPerFile; line++) {
        const keyword = keywords[(idx + line) % keywords.length];
        const text = `${keyword}(title=${keyword} ${idx}-${line}, owner=team): generated line ${line}`;

        if (useTs) {
          lines.push(`// ${text}`);
        } else {
          lines.push(`# ${text}`);
        }
        lines.push(`const value${line} = ${idx * linesPerFile + line};`);
      }

      lines.unshift(tsHeader[idx % tsHeader.length]);
      fs.writeFileSync(fileName, lines.join('\n'), 'utf8');
    }
  }
}

function runScan(dir: string): number {
  const start = performance.now();
  const todos = extractTodosFromDirWithKeywords(dir, ['PERF', 'NOTE'], []);
  if (todos.length === 0) {
    throw new Error('Benchmark produced no TODOs. Fixture generation failed.');
  }
  return performance.now() - start;
}

function main() {
  const args = parseArgs();
  const baseline = loadBaseline();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'smart-todo-bench-'));

  try {
    const rootDir = path.join(tempDir, 'fixture');
    fs.mkdirSync(rootDir, { recursive: true });
    buildFixture(rootDir, baseline);

    const durationMs = runScan(rootDir);
    const rounded = Number(durationMs.toFixed(2));
    const budget = baseline.baselineMs * (1 + baseline.thresholdPercent / 100);

    console.log(`Baseline: ${baseline.baselineMs} ms`);
    console.log(`Threshold: +${baseline.thresholdPercent}%`);
    console.log(`Observed: ${rounded} ms`);
    console.log(`Allowed max: ${budget.toFixed(2)} ms`);

    if (args.updateBaseline) {
      const next = { ...baseline, baselineMs: rounded };
      if (args.dryRun) {
        console.log('DRY_RUN enabled: baseline not updated.');
      } else {
        fs.writeFileSync(BASELINE_FILE, JSON.stringify(next, null, 2), 'utf8');
        console.log(`Updated baseline to ${rounded} ms`);
      }
      return;
    }

    if (rounded > budget) {
      console.error(`❌ Scanner benchmark regressed: ${rounded}ms exceeded ${budget.toFixed(2)}ms`);
      process.exit(1);
    }

    console.log('✅ Scanner benchmark within threshold.');
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}

main();
