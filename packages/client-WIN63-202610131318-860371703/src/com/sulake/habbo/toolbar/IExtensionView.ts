import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IExtensionView {
    set visible(param1: boolean);
    get visible(): boolean;
    get screenHeight(): number;
    attachExtension(param1: string, param2: IWindow, param3?: number, param4?: any[]): void;
    detachExtension(param1: string): void;
    hasExtension(param1: string): boolean;
    set extraMargin(param1: number);
    get extraMargin(): number;
    refreshItemWindow(): void;
}
