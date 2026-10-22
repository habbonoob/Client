import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface INotify extends IDisposable {
    set title(param1: string);
    get title(): string;
    set summary(param1: string);
    get summary(): string;
    set callback(param1: (...args: any[]) => any);
    get callback(): (...args: any[]) => any;
}
