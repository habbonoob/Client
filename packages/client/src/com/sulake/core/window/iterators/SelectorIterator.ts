import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { SelectorController } from '@/com/sulake/core/window/components/SelectorController';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import { Proxy } from '@habbo-pixi/runtime/utils/Proxy';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';

export class SelectorIterator extends Proxy implements IIterator {
    static { registerClassName(this, 'com.sulake.core.window.iterators::SelectorIterator'); }

    constructor(param1: SelectorController) {
        super();
        this._SafeStr_2758 = param1;
    }

    private _SafeStr_2758: SelectorController;

    public get length(): number {
        return this._SafeStr_2758.numSelectables;
    }

    public override getProperty(param1: any): any {
        return this._SafeStr_2758.getChildAt(param1 | 0);
    }

    public override setProperty(param1: any, param2: any): void {
        let _loc4_: number = 0;
        let _loc3_: ISelectableWindow = isISelectableWindow(param2) ? param2 : null;
        if (_loc3_) {
            _loc4_ = this._SafeStr_2758.getSelectableIndex(_loc3_);
            if (_loc4_ == param1) {
                return;
            }
            if (_loc4_ > -1) {
                this._SafeStr_2758.removeSelectable(_loc3_);
            }
            this._SafeStr_2758.addSelectableAt(_loc3_, param1 | 0);
        } else {
            _loc4_ = this._SafeStr_2758.getChildIndex(param2);
            if (_loc4_ == param1) {
                return;
            }
            if (_loc4_ > -1) {
                this._SafeStr_2758.removeChild(_loc3_);
            }
            this._SafeStr_2758.addChildAt(param2, param1 | 0);
        }
    }

    public override nextNameIndex(param1: number): number {
        return param1 < this._SafeStr_2758.numSelectables ? param1 + 1 : 0;
    }

    public override nextValue(param1: number): any {
        return this._SafeStr_2758.getSelectableAt((param1 >>> 0) - 1);
    }

    public indexOf(param1: any): number {
        return this._SafeStr_2758.getSelectableIndex(param1);
    }
}
