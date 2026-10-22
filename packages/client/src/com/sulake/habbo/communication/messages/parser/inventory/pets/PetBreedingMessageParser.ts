import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetBreedingMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::PetBreedingMessageParser'); }

    public static readonly _SafeStr_7573: number = 1;
    public static readonly _SafeStr_7459: number = 2;
    public static readonly _SafeStr_8294: number = 3;

    constructor() {
    }

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _ownPetId: number;
    static { (this.prototype as any)._ownPetId = 0; }

    declare private _otherPetId: number;
    static { (this.prototype as any)._otherPetId = 0; }

    public get state(): number {
        return this._state;
    }

    public get ownPetId(): number {
        return this._ownPetId;
    }

    public get otherPetId(): number {
        return this._otherPetId;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._state = param1.readInteger();
        this._ownPetId = param1.readInteger();
        this._otherPetId = param1.readInteger();
        return true;
    }
}
