import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';

export class PetInventoryMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.pets::PetInventoryMessageParser'); }

    constructor() {
    }

    declare protected _totalFragments: number;
    static { (this.prototype as any)._totalFragments = 0; }

    declare protected _fragmentNo: number;
    static { (this.prototype as any)._fragmentNo = 0; }

    declare private _petListFragment: UtilsMap;

    public get petListFragment(): UtilsMap {
        return this._petListFragment;
    }

    public get totalFragments(): number {
        return this._totalFragments;
    }

    public get fragmentNo(): number {
        return this._fragmentNo;
    }

    public flush(): boolean {
        if (this._petListFragment) {
            this._petListFragment.dispose();
            this._petListFragment = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: PetData = null;
        this._totalFragments = param1.readInteger();
        this._fragmentNo = param1.readInteger();
        this._petListFragment = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = new PetData(param1);
            this._petListFragment.add(_loc4_.id, _loc4_);
            _loc3_++;
        }
        return true;
    }
}
