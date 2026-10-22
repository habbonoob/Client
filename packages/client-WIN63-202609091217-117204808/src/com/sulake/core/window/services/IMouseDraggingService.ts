import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IMouseDraggingService {
    dispose(): void;
    begin(param1: IWindow, param2?: number): IWindow;
    end(param1: IWindow): IWindow;
}
