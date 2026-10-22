import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IGestureAgentService {
    dispose(): void;
    begin(param1: IWindow, param2: (...args: any[]) => any, param3: number, param4: number, param5: number): IWindow;
    end(param1: IWindow): IWindow;
}
