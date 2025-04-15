import * as core from '@actions/core';
import * as github from '@actions/github';
import path from 'path';
import { extractTodosFromDir } from './parser/extractTodosFromDir';
import { TodoItem } from './parser/types';

async function run(): Promise<void> {
    try {
      const token = core.getInput('repo-token', { required: true });
      const workspace = process.env.GITHUB_WORKSPACE || '.';
  
      const todos: TodoItem[] = extractTodosFromDir(workspace);
      const octokit = github.getOctokit(token);
      const { owner, repo } = github.context.repo;
  
      core.info(`🔍 Found ${todos.length} TODOs`);
  
      // Limit to avoid triggering GitHub's rate limiter
      const MAX_ISSUES = 5;
  
      const todosToCreate = todos
        .filter(todo => todo.text && todo.text.length > 5)
        .slice(0, MAX_ISSUES);
  
      for (const todo of todosToCreate) {
        const title = `[${todo.tag}] ${todo.text}`;
        const body = `Found in \`${todo.file}:${todo.line}\`\n\n\`\`\`\n${todo.text}\n\`\`\``;
  
        try {
          await octokit.rest.issues.create({
            owner,
            repo,
            title,
            body
          });
  
          core.info(`✅ Created issue: ${title}`);
        } catch (err: any) {
          core.warning(`⚠️ Failed to create issue for: ${title} — ${err.message}`);
        }
      }
  
    } catch (error: any) {
      core.setFailed(`Action failed: ${error.message}`);
    }
  }
  
  run();



// async function run(): Promise<void> {
//   try {
//     const token = core.getInput('repo-token', { required: true });
//     const workspace = process.env.GITHUB_WORKSPACE || '.';

//     const todos: TodoItem[] = extractTodosFromDir(workspace);
//     const octokit = github.getOctokit(token);
//     const { owner, repo } = github.context.repo;

//     core.info(`🔍 Found ${todos.length} TODOs`);

//     for (const todo of todos) {
//       const title = `[${todo.tag}] ${todo.text}`;
//       const body = `Found in \`${todo.file}:${todo.line}\`\n\n\`\`\`\n${todo.text}\n\`\`\``;

//       await octokit.rest.issues.create({
//         owner,
//         repo,
//         title,
//         body
//       });

//       core.info(`✅ Created issue: ${title}`);
//     }

//   } catch (error: any) {
//     core.setFailed(`Action failed: ${error.message}`);
//   }
// }

// run();
