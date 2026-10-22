import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IToolTipAgentService {
    dispose(): void;
    begin(param1: IWindow, param2?: number): IWindow;
    end(param1: IWindow): IWindow;
    updateCaption(param1: IWindow): void;
}
