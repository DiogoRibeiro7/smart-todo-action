export interface TodoItem {
  tag: string;
  text: string;
  file: string;
  line: number;
  metadata?: Record<string, string>;

  [key: string]: string | number | Record<string, string> | undefined;
}
  