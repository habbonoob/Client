import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindowRenderer } from '@/com/sulake/core/window/graphics/IWindowRenderer';
import type { IInputEventTracker } from '@/com/sulake/core/window/IInputEventTracker';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export class EventProcessorState {
    static { registerClassName(this, 'com.sulake.core.window.utils::EventProcessorState'); }

    constructor(param1: IWindowRenderer, param2: IDesktopWindow, param3: IWindow, param4: IWindow, param5: IWindow, param6: IWindow, param7: IInputEventTracker[]) {
        this.renderer = param1;
        this.desktop = param2;
        this.hoverTarget = param3;
        this.lastClickTarget = param4;
        this.lastMouseDownTarget = param5;
        this.lastClickAwayTarget = param6;
        this.eventTrackers = param7;
    }

    declare public renderer: IWindowRenderer;

    declare public desktop: IDesktopWindow;

    declare public hoverTarget: IWindow;

    declare public lastClickTarget: IWindow;

    declare public lastMouseDownTarget: IWindow;

    declare public lastClickAwayTarget: IWindow;

    declare public eventTrackers: IInputEventTracker[];
}
