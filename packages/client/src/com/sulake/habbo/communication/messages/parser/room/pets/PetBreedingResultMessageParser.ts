import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { PetBreedingResultData } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/PetBreedingResultData';

export class PetBreedingResultMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.pets::PetBreedingResultMessageParser'); }

    constructor() {
    }

    declare private _resultData: PetBreedingResultData;

    declare private _otherResultData: PetBreedingResultData;

    public get resultData(): PetBreedingResultData {
        return this._resultData;
    }

    public get otherResultData(): PetBreedingResultData {
        return this._otherResultData;
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._resultData = this.parseResultData(param1);
        this._otherResultData = this.parseResultData(param1);
        return true;
    }

    private parseResultData(param1: IMessageDataWrapper): PetBreedingResultData {
        let _loc2_: number = param1.readInteger();
        let _loc3_: number = param1.readInteger();
        let _loc4_: string = param1.readString();
        let _loc7_: number = param1.readInteger();
        let _loc6_: string = param1.readString();
        let _loc5_: number = param1.readInteger();
        let _loc8_: boolean = param1.readBoolean();
        return new PetBreedingResultData(_loc2_, _loc3_, _loc4_, _loc7_, _loc6_, _loc5_, _loc8_);
    }
}
