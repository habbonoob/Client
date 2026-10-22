import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { FollowFriendMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendlist/FollowFriendMessageComposer';

export class VisitUserUtil {
    static { registerClassName(this, 'com.sulake.habbo.util::VisitUserUtil'); }

    declare private _main: ModerationManager;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    constructor(param1: ModerationManager, param2: IWindow, param3: number) {
        this._main = param1;
        this._userId = param3;
        param2.procedure = this.onClick;
    }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.connection.send(new FollowFriendMessageComposer(this._userId));
    };
}
