import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetExperienceParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetExperienceParser'); }

    private _petId: number = -1;
    private _petRoomIndex: number = -1;
    private _gainedExperience: number = 0;

    constructor() {
    }

    public get petId(): number {
        return this._petId;
    }

    public get petRoomIndex(): number {
        return this._petRoomIndex;
    }

    public get gainedExperience(): number {
        return this._gainedExperience;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        if (param1 == null) {
            return false;
        }
        this._petId = param1.readInteger();
        this._petRoomIndex = param1.readInteger();
        this._gainedExperience = param1.readInteger();
        return true;
    }
}
