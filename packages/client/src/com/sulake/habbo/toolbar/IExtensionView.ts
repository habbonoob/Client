import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IExtensionView {
    get visible(): boolean;
    set visible(param1: boolean);
    get screenHeight(): number;
    get extraMargin(): number;
    set extraMargin(param1: number);
    attachExtension(param1: string, param2: IWindow, param3?: number, param4?: any[]): void;
    detachExtension(param1: string): void;
    hasExtension(param1: string): boolean;
    refreshItemWindow(): void;
}
