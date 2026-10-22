import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetRespectFailedParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetRespectFailedParser'); }

    constructor() {
    }

    declare private _requiredDays: number;
    static { (this.prototype as any)._requiredDays = 0; }

    declare private _avatarAgeInDays: number;
    static { (this.prototype as any)._avatarAgeInDays = 0; }

    public get requiredDays(): number {
        return this._requiredDays;
    }

    public get avatarAgeInDays(): number {
        return this._avatarAgeInDays;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._requiredDays = param1.readInteger();
        this._avatarAgeInDays = param1.readInteger();
        return true;
    }
}
