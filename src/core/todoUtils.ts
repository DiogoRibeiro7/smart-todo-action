import { TodoItem } from '../parser/types';

export function buildIssueTitle(todo: TodoItem): string {
  return `[${todo.tag}] ${todo.text}`;
}

export function isValidTodo(todo: TodoItem): boolean {
  return todo.text.length > 5;
}

export function limitTodos(todos: TodoItem[], max = 5): TodoItem[] {
  return todos.filter(isValidTodo).slice(0, max);
}

export function todoKey(todo: TodoItem): string {
  return `[${todo.tag}] ${todo.text}`;
}
