"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classifyTodoText = classifyTodoText;
function classifyTodoText(text) {
    const lower = text.toLowerCase();
    const labels = new Set();
    // Refactor / cleanup
    if (/\b(refactor|simplify|clean[\s\-]?up|restructure|optimi[sz]e|rework|rewrite)\b/.test(lower)) {
        labels.add('refactor');
    }
    // Testing
    if (/\b(tests?|add(ed)? tests?|unit tests?|test\s+coverage|verify|assert)\b/.test(lower)) {
        labels.add('test');
    }
    // Documentation
    if (/\b(docs?|documentation|comment[s]?|explain|document(ed|ing)?)\b/.test(lower)) {
        labels.add('doc');
    }
    // Performance
    if (/\b(performance|perf|slow|latency|optimi[sz]e)\b/.test(lower)) {
        labels.add('performance');
    }
    // Security
    if (/\b(security|vuln(?:erability)?|injection|auth|encrypt|sanitize)\b/.test(lower)) {
        labels.add('security');
    }
    // Deprecation / migration / upgrade
    if (/\b(deprecat(e|ed|ing)?|migrat(e|ed|ing)?|upgrade[d]?|legacy|remove[d]?)\b/.test(lower)) {
        labels.add('maintenance');
    }
    return Array.from(labels);
}
