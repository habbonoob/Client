import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { FurniData } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniData';

export class FurniListParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.furni::FurniListParser'); }

    declare protected _totalFragments: number;
    static { (this.prototype as any)._totalFragments = 0; }

    declare protected _fragmentNo: number;
    static { (this.prototype as any)._fragmentNo = 0; }

    declare private _furniFragment: UtilsMap;

    constructor() {
    }

    public get totalFragments(): number {
        return this._totalFragments;
    }

    public get fragmentNo(): number {
        return this._fragmentNo;
    }

    public get furniFragment(): UtilsMap {
        return this._furniFragment;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc3_: number = 0;
        let _loc4_: FurniData = null;
        this._totalFragments = param1.readInteger();
        this._fragmentNo = param1.readInteger();
        this._furniFragment = new UtilsMap();
        let _loc2_: number = param1.readInteger();
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc4_ = new FurniData(param1);
            this._furniFragment.add(_loc4_.itemId, _loc4_);
            _loc3_++;
        }
        return true;
    }

    public flush(): boolean {
        if (this._furniFragment) {
            this._furniFragment.dispose();
            this._furniFragment = null;
        }
        return true;
    }
}
