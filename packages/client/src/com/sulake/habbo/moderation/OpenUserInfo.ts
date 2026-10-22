import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { UserInfoFrameCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl.group';

export class OpenUserInfo {
    static { registerClassName(this, 'com.sulake.habbo.moderation::OpenUserInfo'); }

    constructor(param1: IFrameWindow, param2: ModerationManager, param3: IWindow, param4: number) {
        this._frame = param1;
        this._main = param2;
        this._userId = param4;
        param3.procedure = this.onClick;
    }

    declare private _frame: IFrameWindow;

    declare private _main: ModerationManager;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.windowTracker.show(new UserInfoFrameCtrl(this._main, this._userId), this._frame, false, false, true);
    };
}
