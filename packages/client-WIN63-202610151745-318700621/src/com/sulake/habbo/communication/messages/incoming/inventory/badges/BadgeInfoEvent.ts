import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6063 } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/_SafeCls_6063';

export class BadgeInfoEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.badges::BadgeInfoEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6063);
    }

    public getParser(): _SafeCls_6063 {
        return this._parser instanceof _SafeCls_6063 ? this._parser : null;
    }
}
