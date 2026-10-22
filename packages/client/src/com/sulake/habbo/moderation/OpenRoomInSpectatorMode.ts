import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';

export class OpenRoomInSpectatorMode {
    static { registerClassName(this, 'com.sulake.habbo.moderation::OpenRoomInSpectatorMode'); }

    constructor(param1: ModerationManager, param2: IWindow, param3: number) {
        this._main = param1;
        this._roomId = param3;
        param2.procedure = this.onClick;
    }

    declare private _main: ModerationManager;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.goToRoom(this._roomId);
    };
}
