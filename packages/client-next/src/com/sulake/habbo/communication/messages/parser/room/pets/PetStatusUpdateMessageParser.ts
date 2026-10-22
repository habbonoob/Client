import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class PetStatusUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetStatusUpdateMessageParser'); }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _petId: number;
    static { (this.prototype as any)._petId = 0; }

    declare private _canBreed: boolean;
    static { (this.prototype as any)._canBreed = false; }

    declare private _canHarvest: boolean;
    static { (this.prototype as any)._canHarvest = false; }

    declare private _canRevive: boolean;
    static { (this.prototype as any)._canRevive = false; }

    declare private _hasBreedingPermission: boolean;
    static { (this.prototype as any)._hasBreedingPermission = false; }

    constructor() {
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get petId(): number {
        return this._petId;
    }

    public get canBreed(): boolean {
        return this._canBreed;
    }

    public get canHarvest(): boolean {
        return this._canHarvest;
    }

    public get canRevive(): boolean {
        return this._canRevive;
    }

    public flush(): boolean {
        return true;
    }

    public get hasBreedingPermission(): boolean {
        return this._hasBreedingPermission;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomIndex = param1.readInteger();
        this._petId = param1.readInteger();
        this._canBreed = param1.readBoolean();
        this._canHarvest = param1.readBoolean();
        this._canRevive = param1.readBoolean();
        this._hasBreedingPermission = param1.readBoolean();
        return true;
    }
}
