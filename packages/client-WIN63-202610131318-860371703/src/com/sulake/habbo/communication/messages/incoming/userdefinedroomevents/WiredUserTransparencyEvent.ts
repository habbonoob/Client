import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6126 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6126';

export class WiredUserTransparencyEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::WiredUserTransparencyEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6126);
    }

    public getParser(): _SafeCls_6126 {
        return this._parser instanceof _SafeCls_6126 ? this._parser : null;
    }
}
