import * as github from '@actions/github';
import { TodoItem } from '../parser/types';
export declare function getExistingIssueTitles(octokit: ReturnType<typeof github.getOctokit>, owner: string, repo: string): Promise<Set<string>>;
export declare function createIssueIfNeeded(octokit: ReturnType<typeof github.getOctokit>, owner: string, repo: string, todo: TodoItem, existingTitles: Set<string>, titlePath?: string, bodyPath?: string): Promise<void>;
