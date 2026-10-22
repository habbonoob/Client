import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { _SafeCls_6050 } from '@/com/sulake/habbo/communication/messages/incoming/inventory/badges/_SafeCls_6050';

export class BadgesParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.badges::BadgesParser'); }

    declare protected _totalFragments: number;
    static { (this.prototype as any)._totalFragments = 0; }

    declare protected _fragmentNo: number;
    static { (this.prototype as any)._fragmentNo = 0; }

    declare private _currentFragment: UtilsMap;

    constructor() {
    }

    public get totalFragments(): number {
        return this._totalFragments;
    }

    public get fragmentNo(): number {
        return this._fragmentNo;
    }

    public get currentFragment(): UtilsMap {
        return this._currentFragment;
    }

    public flush(): boolean {
        if (this._currentFragment) {
            this._currentFragment.dispose();
            this._currentFragment = null;
        }
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        let _loc2_: number = 0;
        let _loc3_: string = null;
        let _loc4_: number = 0;
        this._totalFragments = param1.readInteger();
        this._fragmentNo = param1.readInteger();
        this._currentFragment = new UtilsMap();
        let _loc5_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc5_) {
            _loc2_ = param1.readInteger();
            _loc3_ = param1.readString();
            this._currentFragment.add(_loc3_, new _SafeCls_6050(_loc2_, _loc3_, param1.readInteger(), param1.readInteger()));
            _loc4_++;
        }
        return true;
    }
}
