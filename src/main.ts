#!/usr/bin/env node
// Simple CLI entrypoint

import { extractTodosFromDir } from './parser/extractTodosFromDir';
import { generateMarkdownReport } from './core/report';

interface Options {
  dir: string;
  report: boolean;
}

function parseArgs(): Options {
  const args = process.argv.slice(2);
  const opts: Options = { dir: '.', report: false };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if ((arg === '--dir' || arg === '-d') && args[i + 1]) {
      opts.dir = args[++i];
    } else if (arg === '--report' || arg === '-r') {
      opts.report = true;
    }
  }

  return opts;
}

function run(): void {
  const { dir, report } = parseArgs();
  const todos = extractTodosFromDir(dir);
  console.log(`\u{1F50D} Found ${todos.length} TODOs`);

  if (report) {
    generateMarkdownReport(todos);
    console.log('📝 Generated TODO_REPORT.md');
  }
}

run();
