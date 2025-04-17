import { TodoItem } from '../src/parser/types';
export declare function buildIssueTitle(todo: TodoItem): string;
export declare function isValidTodo(todo: TodoItem): boolean;
export declare function limitTodos(todos: TodoItem[], max?: number): TodoItem[];
export declare function todoKey(todo: TodoItem): string;
