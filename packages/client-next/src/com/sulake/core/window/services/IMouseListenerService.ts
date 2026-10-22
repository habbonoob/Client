import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IMouseListenerService {
    get eventTypes(): any[];
    get areaLimit(): number;
    set areaLimit(param1: number);
    dispose(): void;
    begin(param1: IWindow, param2?: number): IWindow;
    end(param1: IWindow): IWindow;
}
