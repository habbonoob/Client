import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class GuideOnDutyStatusMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.help::GuideOnDutyStatusMessageParser'); }

    constructor() {
    }

    declare private _guidesOnDuty: number;
    static { (this.prototype as any)._guidesOnDuty = 0; }

    declare private _helpersOnDuty: number;
    static { (this.prototype as any)._helpersOnDuty = 0; }

    declare private _guardiansOnDuty: number;
    static { (this.prototype as any)._guardiansOnDuty = 0; }

    declare private _onDuty: boolean;
    static { (this.prototype as any)._onDuty = false; }

    public get onDuty(): boolean {
        return this._onDuty;
    }

    public get helpersOnDuty(): number {
        return this._helpersOnDuty;
    }

    public get guardiansOnDuty(): number {
        return this._guardiansOnDuty;
    }

    public get guidesOnDuty(): number {
        return this._guidesOnDuty;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._onDuty = param1.readBoolean();
        this._guidesOnDuty = param1.readInteger();
        this._helpersOnDuty = param1.readInteger();
        this._guardiansOnDuty = param1.readInteger();
        return true;
    }
}
