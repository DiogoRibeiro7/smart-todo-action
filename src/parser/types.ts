export interface TodoItem {
    file: string;
    line: number;
    tag: string;
    text: string;
    metadata?: Record<string, string>;
  }
  