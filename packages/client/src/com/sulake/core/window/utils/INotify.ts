import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface INotify extends IDisposable {
    get title(): string;
    set title(param1: string);
    get summary(): string;
    set summary(param1: string);
    get callback(): (...args: any[]) => any;
    set callback(param1: (...args: any[]) => any);
}
