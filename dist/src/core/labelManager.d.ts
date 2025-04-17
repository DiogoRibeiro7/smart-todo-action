import * as github from '@actions/github';
export declare const LABELS_BY_TAG: Record<string, string[]>;
export declare const LABEL_COLORS: Record<string, string>;
export declare function labelsFromMetadata(metadata?: Record<string, string>): string[];
export declare function ensureLabelExists(octokit: ReturnType<typeof github.getOctokit>, owner: string, repo: string, label: string): Promise<void>;
