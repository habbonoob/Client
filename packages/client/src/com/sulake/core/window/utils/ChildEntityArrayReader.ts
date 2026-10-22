import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IChildEntity } from '@/com/sulake/core/window/utils/IChildEntity';
import type { IChildEntityArrayReader } from '@/com/sulake/core/window/utils/IChildEntityArrayReader';

export class ChildEntityArrayReader implements IChildEntityArrayReader {
    static { registerClassName(this, 'com.sulake.core.window.utils::ChildEntityArrayReader'); }

    protected _array: IChildEntity[] = [];

    public get numChildren(): number {
        return this._array.length | 0;
    }

    public getChildAt(param1: number): IChildEntity {
        return this._array[param1];
    }

    public getChildByID(param1: number): IChildEntity {
        let _loc2_: any = null;
        for (_loc2_ of this._array ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getChildByName(param1: string): IChildEntity {
        let _loc2_: any = null;
        for (_loc2_ of this._array ?? []) {
            if (_loc2_.name == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getChildIndex(param1: IChildEntity): number {
        return this._array.indexOf(param1);
    }

    public groupChildrenWithID(param1: number, param2: any[]): number {
        let _loc4_: any = null;
        let _loc3_: number = 0;
        for (_loc4_ of this._array ?? []) {
            if (_loc4_.id == param1) {
                param2.push(_loc4_);
                _loc3_++;
            }
        }
        return _loc3_;
    }
}
