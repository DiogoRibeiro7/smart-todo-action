import { TodoItem } from '../../parser/types';
export declare function generateIssueTitleAndBodyLLM(todo: TodoItem): Promise<{
    title: string;
    body: string;
}>;
