import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export interface IInputEventTracker {
    eventReceived(param1: WindowEvent, param2: IWindow): void;
}
