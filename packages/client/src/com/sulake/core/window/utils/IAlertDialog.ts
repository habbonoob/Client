import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { ICaption } from '@/com/sulake/core/window/utils/ICaption';

export interface IAlertDialog extends IDisposable {
    get title(): string;
    set title(param1: string);
    get summary(): string;
    set summary(param1: string);
    get callback(): (...args: any[]) => any;
    set callback(param1: (...args: any[]) => any);
    get titleBarColor(): number;
    set titleBarColor(param1: number);
    getButtonCaption(param1: number): ICaption;
    setButtonCaption(param1: number, param2: ICaption): void;
}
