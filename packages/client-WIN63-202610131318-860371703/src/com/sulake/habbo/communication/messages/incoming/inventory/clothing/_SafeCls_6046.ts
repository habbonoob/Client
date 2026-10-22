import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6043 } from '@/com/sulake/habbo/communication/messages/parser/inventory/clothing/_SafeCls_6043';

export class _SafeCls_6046 extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.clothing::_SafeCls_6046'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6043);
    }

    public getParser(): _SafeCls_6043 {
        return this._parser instanceof _SafeCls_6043 ? this._parser : null;
    }
}
