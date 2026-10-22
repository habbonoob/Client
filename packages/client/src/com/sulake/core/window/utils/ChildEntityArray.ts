import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';
import type { IChildEntityArray } from '@/com/sulake/core/window/utils/IChildEntityArray';
import { ChildEntityArrayReader } from '@/com/sulake/core/window/utils/ChildEntityArrayReader';

export class ChildEntityArray extends ChildEntityArrayReader implements IChildEntityArray {
    static { registerClassName(this, 'com.sulake.core.window.utils::ChildEntityArray'); }

    constructor() {
        super();
    }

    public removeChild(param1: IChildEntity): IChildEntity {
        let _loc2_: number = this._array.indexOf(param1);
        if (_loc2_ < 0) {
            return null;
        }
        this._array.splice(_loc2_, 1);
        return param1;
    }

    public addChild(param1: IChildEntity): IChildEntity {
        this._array.push(param1);
        return param1;
    }

    public addChildAt(param1: IChildEntity, param2: number): IChildEntity {
        this._array.splice(param2, 0, param1);
        return param1;
    }

    public removeChildAt(param1: number): IChildEntity {
        let _loc2_: IChildEntity = this._array[param1];
        if (_loc2_ != null) {
            this._array.splice(param1, 1);
            return _loc2_;
        }
        return null;
    }

    public setChildIndex(param1: IChildEntity, param2: number): void {
        let _loc3_: number = this._array.indexOf(param1);
        if (_loc3_ > -1 && param2 != _loc3_) {
            this._array.splice(_loc3_, 1);
            this._array.splice(param2, 0, param1);
        }
    }

    public swapChildren(param1: IChildEntity, param2: IChildEntity): void {
        let _loc3_: any = 0;
        let _loc6_: any = 0;
        let _loc5_: any = null;
        let _loc4_: any = 0;
        if (param1 != null && param2 != null && param1 != param2) {
            _loc3_ = this._array.indexOf(param1);
            if (_loc3_ < 0) {
                return;
            }
            _loc6_ = this._array.indexOf(param2);
            if (_loc6_ < 0) {
                return;
            }
            if (_loc6_ < _loc3_) {
                _loc5_ = param1;
                param1 = param2;
                param2 = _loc5_;
                _loc4_ = _loc3_;
                _loc3_ = _loc6_;
                _loc6_ = _loc4_;
            }
            this._array.splice(_loc6_, 1);
            this._array.splice(_loc3_, 1);
            this._array.splice(_loc3_, 0, param2);
            this._array.splice(_loc6_, 0, param1);
        }
    }

    public swapChildrenAt(param1: number, param2: number): void {
        this.swapChildren(this._array[param1], this._array[param2]);
    }
}
