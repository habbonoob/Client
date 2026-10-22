import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { RaidProtectionSettingsSnapshot } from '@/com/sulake/habbo/communication/messages/parser/raidprotection/RaidProtectionSettingsSnapshot';

export class _SafeCls_6024 implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.raidprotection::_SafeCls_6024'); }

    public static readonly _SafeStr_5833: number = 0;
    public static readonly _SafeStr_15135: number = 1;
    public static readonly _SafeStr_15136: number = 2;
    public static readonly _SafeStr_15137: number = 3;
    public static readonly _SafeStr_15138: number = 4;
    public static readonly _SafeStr_15139: number = 5;
    public static readonly _SafeStr_15140: number = 6;

    declare private _resultCode: number;
    static { (this.prototype as any)._resultCode = 0; }

    declare private _SafeStr_3112: RaidProtectionSettingsSnapshot;

    constructor() {
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = param1.readInteger();
        this._resultCode = param1.readInteger();
        this._SafeStr_3112 = RaidProtectionSettingsSnapshot.readAfterRoomId(_loc2_, param1);
        return true;
    }

    public flush(): boolean {
        this._resultCode = 0;
        this._SafeStr_3112 = null;
        return true;
    }

    public get resultCode(): number {
        return this._resultCode;
    }

    public get settings(): RaidProtectionSettingsSnapshot {
        return this._SafeStr_3112;
    }
}
