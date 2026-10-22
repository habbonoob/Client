import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { InterfaceStruct } from '@/com/sulake/core/runtime/InterfaceStruct';

export class InterfaceStructList implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.runtime::InterfaceStructList'); }

    private _SafeStr_2221: any[] = [];

    constructor() {
    }

    public get length(): number {
        return this._SafeStr_2221.length;
    }

    public get disposed(): boolean {
        return this._SafeStr_2221 == null;
    }

    public dispose(): void {
        let _loc1_: InterfaceStruct = null;
        let _loc3_: any = 0;
        let _loc2_: number = this._SafeStr_2221.length;
        _loc3_ = 0;
        while (_loc3_ < _loc2_) {
            _loc1_ = this._SafeStr_2221.pop();
            _loc1_.dispose();
            _loc3_++;
        }
        this._SafeStr_2221 = null;
    }

    public insert(param1: InterfaceStruct): number {
        this._SafeStr_2221.push(param1);
        return this._SafeStr_2221.length;
    }

    public remove(param1: number): InterfaceStruct {
        let _loc2_: InterfaceStruct = null;
        if (param1 < this._SafeStr_2221.length) {
            _loc2_ = this._SafeStr_2221[param1];
            this._SafeStr_2221.splice(param1, 1);
            return _loc2_;
        }
        throw new Error("Index out of range!");
    }

    public find(param1: IID): IUnknown {
        let _loc2_: InterfaceStruct = null;
        let _loc5_: any = 0;
        let _loc3_: string = getQualifiedClassName(param1);
        let _loc4_: number = this._SafeStr_2221.length;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc2_ = asInstanceOf(this._SafeStr_2221[_loc5_], InterfaceStruct);
            if (_loc2_.iis == _loc3_) {
                return _loc2_.unknown;
            }
            _loc5_++;
        }
        return null;
    }

    public getStructByInterface(param1: IID): InterfaceStruct {
        let _loc2_: InterfaceStruct = null;
        let _loc5_: any = 0;
        let _loc3_: string = getQualifiedClassName(param1);
        let _loc4_: number = this._SafeStr_2221.length;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc2_ = asInstanceOf(this._SafeStr_2221[_loc5_], InterfaceStruct);
            if (_loc2_.iis == _loc3_) {
                return _loc2_;
            }
            _loc5_++;
        }
        return null;
    }

    public getIndexByInterface(param1: IID): number {
        let _loc2_: InterfaceStruct = null;
        let _loc5_: number = 0;
        let _loc3_: string = getQualifiedClassName(param1);
        let _loc4_: number = this._SafeStr_2221.length;
        _loc5_ = 0;
        while (_loc5_ < _loc4_) {
            _loc2_ = asInstanceOf(this._SafeStr_2221[_loc5_], InterfaceStruct);
            if (_loc2_.iis == _loc3_) {
                return _loc5_;
            }
            _loc5_++;
        }
        return -1;
    }

    public mapStructsByInterface(param1: IID, param2: any[]): number {
        let _loc3_: InterfaceStruct = null;
        let _loc7_: any = 0;
        let _loc4_: string = getQualifiedClassName(param1);
        let _loc5_: number = 0;
        let _loc6_: number = this._SafeStr_2221.length;
        _loc7_ = 0;
        while (_loc7_ < _loc6_) {
            _loc3_ = asInstanceOf(this._SafeStr_2221[_loc7_], InterfaceStruct);
            if (_loc3_.iis == _loc4_) {
                param2.push(_loc3_);
                _loc5_++;
            }
            _loc7_++;
        }
        return _loc5_;
    }

    public getStructByImplementor(param1: IUnknown): InterfaceStruct {
        let _loc2_: InterfaceStruct = null;
        let _loc4_: any = 0;
        let _loc3_: number = this._SafeStr_2221.length;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = asInstanceOf(this._SafeStr_2221[_loc4_], InterfaceStruct);
            if (_loc2_.unknown == param1) {
                return _loc2_;
            }
            _loc4_++;
        }
        return null;
    }

    public getIndexByImplementor(param1: IUnknown): number {
        let _loc2_: InterfaceStruct = null;
        let _loc4_: any = 0;
        let _loc3_: number = this._SafeStr_2221.length;
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_ = asInstanceOf(this._SafeStr_2221[_loc4_], InterfaceStruct);
            if (_loc2_.unknown == param1) {
                return _loc4_ | 0;
            }
            _loc4_++;
        }
        return -1;
    }

    public mapStructsByImplementor(param1: IUnknown, param2: any[]): number {
        let _loc3_: InterfaceStruct = null;
        let _loc6_: any = 0;
        let _loc5_: number = 0;
        let _loc4_: number = this._SafeStr_2221.length;
        _loc6_ = 0;
        while (_loc6_ < _loc4_) {
            _loc3_ = asInstanceOf(this._SafeStr_2221[_loc6_], InterfaceStruct);
            if (_loc3_.unknown == param1) {
                param2.push(_loc3_);
                _loc5_++;
            }
            _loc6_++;
        }
        return _loc5_;
    }

    public getStructByIndex(param1: number): InterfaceStruct {
        return param1 < this._SafeStr_2221.length ? this._SafeStr_2221[param1] : null;
    }

    public getTotalReferenceCount(): number {
        let _loc1_: InterfaceStruct = null;
        let _loc4_: any = 0;
        let _loc3_: number = 0;
        let _loc2_: number = this._SafeStr_2221.length;
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc1_ = asInstanceOf(this._SafeStr_2221[_loc4_], InterfaceStruct);
            _loc3_ += _loc1_.references;
            _loc4_++;
        }
        return _loc3_;
    }

    get [IDisposable](): true {
        return true;
    }
}
