/**
 * classifyTodoText.ts
 * -------------------
 * Heuristic classification of TODO comment text into common categories like `refactor`, `test`, `doc`, etc.
 * These labels are added in addition to tag-based and metadata-based labels.
 * This can be replaced with a smarter LLM-powered classifier later on.
 */

/**
 * Returns semantic labels based on the content of the TODO text.
 * These are meant to capture the intent of the TODO using simple keyword heuristics.
 *
 * @param text The body of the TODO comment (without tag).
 * @returns A list of labels like 'refactor', 'test', 'doc', etc.
 */
export function classifyTodoText(text: string): string[] {
    const lower = text.toLowerCase();
    const labels = new Set<string>();
  
    // Refactor / cleanup
    if (
      /\b(refactor|simplify|cleanup|restructure|optimi[sz]e|rework|rewrite)\b/.test(lower)
    ) {
      labels.add('refactor');
    }
  
    // Testing
    if (
      /\b(test|add test|unit test|coverage|verify)\b/.test(lower)
    ) {
      labels.add('test');
    }
  
    // Documentation
    if (
      /\b(doc|docs|documentation|comment|explain)\b/.test(lower)
    ) {
      labels.add('doc');
    }
  
    // Performance
    if (
      /\b(performance|perf|slow|latency|optimi[sz]e)\b/.test(lower)
    ) {
      labels.add('performance');
    }
  
    // Security
    if (
      /\b(security|vuln|injection|auth|encrypt|sanitize)\b/.test(lower)
    ) {
      labels.add('security');
    }
  
    // Deprecation or migration
    if (
      /\b(deprecate|migrate|upgrade|legacy|remove)\b/.test(lower)
    ) {
      labels.add('maintenance');
    }
  
    return Array.from(labels);
  }
  