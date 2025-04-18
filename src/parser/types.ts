export interface TodoItem {
  tag: string;
  text: string;
  file: string;
  line: number;
  metadata?: Record<string, string>;

  assignees?: string[];         // ← @username
  modules?: string[];           // ← #module
  structured?: Record<string, string>; // ← key=value

  [key: string]: string | number | string[] | Record<string, string> | undefined;
}
  