import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetLevelUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetLevelUpdateMessageParser'); }

    constructor() {
    }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _level: number;
    static { (this.prototype as any)._level = 0; }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get petId(): number {
        return this._petId;
    }

    public get level(): number {
        return this._level;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomIndex = param1.readInteger();
        this._petId = param1.readInteger();
        this._level = param1.readInteger();
        return true;
    }
}
