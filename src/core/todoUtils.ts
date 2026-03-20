import { TodoItem } from '../parser/types';
import crypto from 'crypto';

export type DedupStrategy = 'title' | 'normalized-text' | 'hash';

export function buildIssueTitle(todo: TodoItem): string {
  return `[${todo.tag}] ${todo.text}`;
}

export function isValidTodo(todo: TodoItem): boolean {
  return todo.text.length > 5;
}

export function limitTodos(todos: TodoItem[], max = 5): TodoItem[] {
  return todos.filter(isValidTodo).slice(0, max);
}

export function normalizeForDedup(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

export function isDedupStrategy(value: string): value is DedupStrategy {
  return value === 'title' || value === 'normalized-text' || value === 'hash';
}

export function dedupKeyFromTitle(title: string, strategy: DedupStrategy): string {
  if (strategy === 'title') return title;

  const normalized = normalizeForDedup(title);
  if (strategy === 'normalized-text') return normalized;

  return crypto.createHash('sha256').update(normalized).digest('hex');
}

export function dedupKeyFromTodo(todo: TodoItem, strategy: DedupStrategy): string {
  const title = buildIssueTitle(todo);
  return dedupKeyFromTitle(title, strategy);
}

export function todoKey(todo: TodoItem, strategy: DedupStrategy = 'title'): string {
  return dedupKeyFromTodo(todo, strategy);
}
