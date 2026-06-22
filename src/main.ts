#!/usr/bin/env node
// Simple CLI entrypoint

import { extractTodosFromDirWithKeywords } from './parser/extractTodosFromDir';
import { generateJsonReport, generateMarkdownReport } from './core/report';
import { parseTodoKeywordsInput } from './parser/todoKeywords';
import { parseIgnoreGlobsInput } from './parser/ignoreGlobs';
import { isDedupStrategy, todoKey } from './core/todoUtils';

interface Options {
  dir: string;
  report: boolean;
  jsonReport: boolean;
  todoKeywords: string[];
  ignoreGlobs: string[];
  dedupStrategy: 'title' | 'normalized-text' | 'hash';
}

function parseArgs(): Options {
  const args = process.argv.slice(2);
  const opts: Options = {
    dir: '.',
    report: false,
    jsonReport: false,
    todoKeywords: [],
    ignoreGlobs: [],
    dedupStrategy: 'title',
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if ((arg === '--dir' || arg === '-d') && args[i + 1]) {
      opts.dir = args[++i];
    } else if (arg === '--report' || arg === '-r') {
      opts.report = true;
    } else if (arg === '--json-report') {
      opts.jsonReport = true;
    } else if (arg === '--todo-keywords' && args[i + 1]) {
      opts.todoKeywords = parseTodoKeywordsInput(args[++i]);
    } else if (arg === '--ignore-globs' && args[i + 1]) {
      opts.ignoreGlobs = parseIgnoreGlobsInput(args[++i]);
    } else if (arg === '--dedup-strategy' && args[i + 1]) {
      const candidate = args[++i];
      if (!isDedupStrategy(candidate)) {
        throw new Error(`Invalid dedup-strategy: ${candidate}. Allowed: title, normalized-text, hash.`);
      }
      opts.dedupStrategy = candidate;
    }
  }

  return opts;
}

function run(): void {
  const { dir, report, jsonReport, todoKeywords, ignoreGlobs, dedupStrategy } = parseArgs();
  const todos = extractTodosFromDirWithKeywords(dir, todoKeywords, ignoreGlobs);

  const deduped = Array.from(
    new Map(
      todos.map((todo) => [todoKey(todo, dedupStrategy), todo])
    ).values()
  );

  console.log(`\u{1F50D} Found ${deduped.length} TODOs`);

  if (report) {
    if (report) {
      generateMarkdownReport(deduped);
      console.log('📝 Generated TODO_REPORT.md');
    }
    if (jsonReport) {
      generateJsonReport(deduped);
      console.log('🧾 Generated TODO_REPORT.json');
    }
    
  }
}

run();
