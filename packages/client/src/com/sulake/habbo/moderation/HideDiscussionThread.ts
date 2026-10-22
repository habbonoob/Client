import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ChatlogCtrl } from '@/com/sulake/habbo/moderation/ChatlogCtrl';
import type { ModerationManager } from '@/com/sulake/habbo/moderation/ModerationManager';
import { ModerateThreadMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/groupforums/ModerateThreadMessageComposer';

export class HideDiscussionThread {
    static { registerClassName(this, 'com.sulake.habbo.moderation::HideDiscussionThread'); }

    constructor(param1: ModerationManager, param2: ChatlogCtrl, param3: IWindow, param4: number, param5: number) {
        this._main = param1;
        this._popup = param2;
        this._groupId = param4;
        this._threadId = param5;
        param3.procedure = this.onClick;
    }

    declare private _main: ModerationManager;

    declare private _popup: ChatlogCtrl;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    declare private _threadId: number;
    static { (this.prototype as any)._threadId = 0; }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._popup.dispose();
        this._main.connection.send(new ModerateThreadMessageComposer(this._groupId, this._threadId, 20));
    };
}
