import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6055 } from '@/com/sulake/habbo/communication/messages/parser/raidprotection/_SafeCls_6055';

export class RaidProtectionCapabilityEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.raidprotection::RaidProtectionCapabilityEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6055);
    }

    public getParser(): _SafeCls_6055 {
        return this._parser instanceof _SafeCls_6055 ? this._parser : null;
    }
}
