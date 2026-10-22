import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { _SafeCls_6024 } from '@/com/sulake/habbo/communication/messages/parser/raidprotection/_SafeCls_6024';

export class RaidProtectionSettingsResultEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.raidprotection::RaidProtectionSettingsResultEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, _SafeCls_6024);
    }

    public getParser(): _SafeCls_6024 {
        return this._parser instanceof _SafeCls_6024 ? this._parser : null;
    }
}
