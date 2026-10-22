import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IIssueHandler extends IDisposable {
    updateIssuesAndMessages(): void;
    showDefaultSanction(param1: number, param2: string): void;
}
