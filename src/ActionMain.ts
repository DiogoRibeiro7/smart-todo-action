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

    core.info(`🔍 Encontrados ${todos.length} TODOs no repositório`);

    for (const todo of todos) {
      core.info(`📌 [${todo.tag}] ${todo.text} (${todo.file}:${todo.line})`);
    }

    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    // No futuro: criar/atualizar issues aqui

    core.info(`Contexto: ${owner}/${repo}`);
  } catch (error: any) {
    core.setFailed(`Erro na execução: ${error.message}`);
  }
}

run();
