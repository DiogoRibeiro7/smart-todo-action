export interface TodoItem {
    tag: string;
    text: string;
    file: string;
    line: number;
    metadata?: Record<string, string>;
    assignees?: string[];
    modules?: string[];
    structured?: Record<string, string>;
    [key: string]: string | number | string[] | Record<string, string> | undefined;
}
