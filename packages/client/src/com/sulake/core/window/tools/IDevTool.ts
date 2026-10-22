import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export interface IDevTool extends IDisposable {
    get caption(): string;
    get visible(): boolean;
    set visible(param1: boolean);
}
