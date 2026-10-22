import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export interface IWidget extends IDisposable, IIterable {
    get properties(): any[];
    set properties(param1: any[]);
}
