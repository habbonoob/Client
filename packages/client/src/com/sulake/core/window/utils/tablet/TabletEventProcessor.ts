import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { EventProcessorState } from '@/com/sulake/core/window/utils/EventProcessorState';
import type { IEventQueue } from '@/com/sulake/core/window/utils/IEventQueue';
import { MouseEventProcessor, WindowController } from '@/com/sulake/core/window/Classes.group';

export class TabletEventProcessor extends MouseEventProcessor {
    static { registerClassName(this, 'com.sulake.core.window.utils.tablet::TabletEventProcessor'); }

    constructor() {
        super();
    }

    private _SafeStr_8377: string = "";

    public override process(param1: EventProcessorState, param2: IEventQueue): void {
        if (param2.length == 0) {
            return;
        }
        this._SafeStr_2264 = param1.desktop;
        this._SafeStr_2262 = param1.hoverTarget instanceof WindowController ? param1.hoverTarget : null;
        this._SafeStr_2320 = param1.lastClickTarget instanceof WindowController ? param1.lastClickTarget : null;
        this._renderer = param1.renderer;
        this._eventTrackers = param1.eventTrackers;
        param2.begin();
        param2.end();
        param1.desktop = this._SafeStr_2264;
        param1.hoverTarget = this._SafeStr_2262;
        param1.lastClickTarget = this._SafeStr_2320;
        param1.renderer = this._renderer;
        param1.eventTrackers = this._eventTrackers;
    }
}
