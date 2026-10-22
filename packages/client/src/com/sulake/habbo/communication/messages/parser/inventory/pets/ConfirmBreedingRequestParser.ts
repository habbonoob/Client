import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { BreedingPetInfo } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/BreedingPetInfo';
import { RarityCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/room/pets/RarityCategoryData';

export class ConfirmBreedingRequestParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::ConfirmBreedingRequestParser'); }

    constructor() {
    }

    declare private _nestId: number;
    static { (this.prototype as any)._nestId = 0; }

    declare private _resultPetType: number;
    static { (this.prototype as any)._resultPetType = 0; }

    declare private _pet1: BreedingPetInfo;

    public get pet1(): BreedingPetInfo {
        return this._pet1;
    }

    declare private _pet2: BreedingPetInfo;

    public get pet2(): BreedingPetInfo {
        return this._pet2;
    }

    declare private _rarityCategories: any[];

    public get rarityCategories(): any[] {
        return this._rarityCategories;
    }

    public get nestId(): number {
        return this._nestId;
    }

    public get resultPetType(): number {
        return this._resultPetType;
    }

    public flush(): boolean {
        this._nestId = 0;
        if (this._pet1) {
            this._pet1.dispose();
            this._pet1 = null;
        }
        if (this._pet2) {
            this._pet2.dispose();
            this._pet2 = null;
        }
        for (const _loc1_ of this._rarityCategories ?? []) {
            _loc1_.dispose();
        }
        this._rarityCategories = [];
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        this._nestId = param1.readInteger();
        this._pet1 = new BreedingPetInfo(param1);
        this._pet2 = new BreedingPetInfo(param1);
        let _loc3_: number = param1.readInteger();
        _loc2_ = 0;
        while (_loc2_ < _loc3_) {
            this._rarityCategories.push(new RarityCategoryData(param1));
            _loc2_++;
        }
        this._resultPetType = param1.readInteger();
        return true;
    }
}
