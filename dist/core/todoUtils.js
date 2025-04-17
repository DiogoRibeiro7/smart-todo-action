"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildIssueTitle = buildIssueTitle;
exports.isValidTodo = isValidTodo;
exports.limitTodos = limitTodos;
exports.todoKey = todoKey;
function buildIssueTitle(todo) {
    return `[${todo.tag}] ${todo.text}`;
}
function isValidTodo(todo) {
    return todo.text.length > 5;
}
function limitTodos(todos, max = 5) {
    return todos.filter(isValidTodo).slice(0, max);
}
function todoKey(todo) {
    return `[${todo.tag}] ${todo.text}`;
}
