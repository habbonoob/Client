import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetSupplementedNotificationParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.users::PetSupplementedNotificationParser'); }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _supplementType: number;
    static { (this.prototype as any)._supplementType = 0; }

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._petId = param1.readInteger();
        this._userId = param1.readInteger();
        this._supplementType = param1.readInteger();
        return true;
    }

    public get petId(): number {
        return this._petId;
    }

    public get userId(): number {
        return this._userId;
    }

    public get supplementType(): number {
        return this._supplementType;
    }
}
