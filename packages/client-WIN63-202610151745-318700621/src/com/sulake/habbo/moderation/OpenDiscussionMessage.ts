import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';

export class OpenDiscussionMessage {
    static { registerClassName(this, 'com.sulake.habbo.moderation::OpenDiscussionMessage'); }

    declare private _main: ModerationManager;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _threadId: number;
    static { (this.prototype as any)._threadId = 0; }

    declare private _messageId: number;
    static { (this.prototype as any)._messageId = 0; }

    constructor(param1: ModerationManager, param2: IWindow, param3: number, param4: number, param5: number) {
        this._main = param1;
        this._groupId = param3;
        this._threadId = param4;
        this._messageId = param5;
        param2.procedure = this.onClick;
    }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._main.openThreadMessage(this._groupId, this._threadId, this._messageId);
    };
}
