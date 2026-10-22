import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class _SafeCls_6065 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.rewardtrack::_SafeCls_6065'); }

    declare private _SafeStr_14373: number;
    static { (this.prototype as any)._SafeStr_14373 = 0; }

    declare private _SafeStr_14374: number;
    static { (this.prototype as any)._SafeStr_14374 = 0; }

    declare private _SafeStr_14367: boolean;
    static { (this.prototype as any)._SafeStr_14367 = false; }

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_14373 = param1.readInteger();
        this._SafeStr_14374 = param1.readInteger();
        this._SafeStr_14367 = param1.readBoolean();
    }

    public get requiredCount(): number {
        return this._SafeStr_14373;
    }

    public get pointsReward(): number {
        return this._SafeStr_14374;
    }

    public get premium(): boolean {
        return this._SafeStr_14367;
    }
}
