import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class NestBreedingSuccessParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::NestBreedingSuccessParser'); }

    declare private _rarityCategory: number;
    static { (this.prototype as any)._rarityCategory = 0; }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    constructor() {
    }

    public flush(): boolean {
        this._petId = -1;
        this._rarityCategory = -1;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._petId = param1.readInteger();
        this._rarityCategory = param1.readInteger();
        return true;
    }

    public get rarityCategory(): number {
        return this._rarityCategory;
    }

    public get petId(): number {
        return this._petId;
    }
}
