import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class ConfirmBreedingResultParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::ConfirmBreedingResultParser'); }

    declare private _breedingNestStuffId: number;
    static { (this.prototype as any)._breedingNestStuffId = 0; }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._breedingNestStuffId = 0;
        this._result = 0;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._breedingNestStuffId = param1.readInteger();
        this._result = param1.readInteger();
        return true;
    }

    public get breedingNestStuffId(): number {
        return this._breedingNestStuffId;
    }

    public get result(): number {
        return this._result;
    }
}
