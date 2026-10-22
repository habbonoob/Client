import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideOnDutyStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideOnDutyStatusMessageParser'); }

    declare private _onDuty: boolean;
    static { (this.prototype as any)._onDuty = false; }

    declare private _SafeStr_6747: number;
    static { (this.prototype as any)._SafeStr_6747 = 0; }

    declare private _SafeStr_6075: number;
    static { (this.prototype as any)._SafeStr_6075 = 0; }

    declare private _SafeStr_6766: number;
    static { (this.prototype as any)._SafeStr_6766 = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._onDuty = param1.readBoolean();
        this._SafeStr_6747 = param1.readInteger();
        this._SafeStr_6075 = param1.readInteger();
        this._SafeStr_6766 = param1.readInteger();
        return true;
    }

    public get onDuty(): boolean {
        return this._onDuty;
    }

    public get helpersOnDuty(): number {
        return this._SafeStr_6075;
    }

    public get guardiansOnDuty(): number {
        return this._SafeStr_6766;
    }

    public get guidesOnDuty(): number {
        return this._SafeStr_6747;
    }
}
