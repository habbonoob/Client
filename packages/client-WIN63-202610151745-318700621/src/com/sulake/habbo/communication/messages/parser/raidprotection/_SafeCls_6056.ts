import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RaidProtectionSettingsSnapshot } from '@/com/sulake/habbo/communication/messages/parser/raidprotection/RaidProtectionSettingsSnapshot';

export class _SafeCls_6056 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.raidprotection::_SafeCls_6056'); }

    declare private _SafeStr_3112: RaidProtectionSettingsSnapshot;

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._SafeStr_3112 = RaidProtectionSettingsSnapshot.readFromMessage(param1);
        return true;
    }

    public flush(): boolean {
        this._SafeStr_3112 = null;
        return true;
    }

    public get settings(): RaidProtectionSettingsSnapshot {
        return this._SafeStr_3112;
    }
}
