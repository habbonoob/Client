import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';

export class PetRespectNotificationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::PetRespectNotificationParser'); }

    public static readonly _SafeStr_8761: number = 16;

    constructor() {
    }

    declare private _respect: number;
    static { (this.prototype as any)._respect = 0; }

    declare private _petOwnerId: number;
    static { (this.prototype as any)._petOwnerId = 0; }

    declare private _SafeStr_2395: PetData;

    public get petOwnerId(): number {
        return this._petOwnerId;
    }

    public get respect(): number {
        return this._respect;
    }

    public get petData(): PetData {
        return this._SafeStr_2395;
    }

    public flush(): boolean {
        this._SafeStr_2395 = null;
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._respect = param1.readInteger();
        this._petOwnerId = param1.readInteger();
        this._SafeStr_2395 = new PetData(param1);
        return true;
    }

    public isTreat(): boolean {
        return this._SafeStr_2395.typeId == 16;
    }
}
