import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class _SafeCls_6058 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::_SafeCls_6058'); }

    declare private _SafeStr_14094: number;
    static { (this.prototype as any)._SafeStr_14094 = 0; }

    declare private _SafeStr_14095: number;
    static { (this.prototype as any)._SafeStr_14095 = 0; }

    declare private _SafeStr_14092: boolean;
    static { (this.prototype as any)._SafeStr_14092 = false; }

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_14094 = param1.readInteger();
        this._SafeStr_14095 = param1.readInteger();
        this._SafeStr_14092 = param1.readBoolean();
    }

    public get requiredCount(): number {
        return this._SafeStr_14094;
    }

    public get pointsReward(): number {
        return this._SafeStr_14095;
    }

    public get premium(): boolean {
        return this._SafeStr_14092;
    }
}
