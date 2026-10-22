import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6051 } from '@/com/sulake/habbo/communication/messages/parser/habbicons/_SafeCls_6051';

export class UserHabbiconStatusChangedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.habbicons::UserHabbiconStatusChangedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6051);
    }

    public getParser(): _SafeCls_6051 {
        return this._parser instanceof _SafeCls_6051 ? this._parser : null;
    }
}
