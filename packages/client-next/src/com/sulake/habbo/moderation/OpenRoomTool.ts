import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { RoomToolCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';

export class OpenRoomTool {
    static { registerClassName(this, 'com.sulake.habbo.moderation::OpenRoomTool'); }

    declare private _frame: IFrameWindow;

    declare private _main: ModerationManager;

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    constructor(param1: IFrameWindow, param2: ModerationManager, param3: IWindow, param4: number) {
        this._frame = param1;
        this._main = param2;
        this._roomId = param4;
        param3.procedure = this.onClick;
    }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.windowTracker.show(new RoomToolCtrl(this._main, this._roomId), this._frame, false, false, true);
    };

    private onAlertClose(param1: IAlertDialog, param2: WindowEvent): void {
        param1.dispose();
    }
}
