import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import { Proxy } from '@habbo-pixi/runtime/utils/Proxy';
import { isIWindow } from '@/com/sulake/core/window/IWindow';

export class ContainerIterator extends Proxy implements IIterator {
    static { registerClassName(this, 'com.sulake.core.window.iterators::ContainerIterator'); }

    private _SafeStr_2758: WindowController;

    constructor(param1: WindowController) {
        super();
        this._SafeStr_2758 = param1;
    }

    public get length(): number {
        return this._SafeStr_2758.numChildren >>> 0;
    }

    public indexOf(param1: any): number {
        return this._SafeStr_2758.getChildIndex(param1);
    }

    public override getProperty(param1: any): any {
        return this._SafeStr_2758.getChildAt(param1 >>> 0 | 0);
    }

    public override setProperty(param1: any, param2: any): void {
        let _loc3_: IWindow = null;
        _loc3_ = isIWindow(param2) ? param2 : null;
        let _loc4_: number = this._SafeStr_2758.getChildIndex(_loc3_);
        if (_loc4_ == param1) {
            return;
        }
        if (_loc4_ > -1) {
            this._SafeStr_2758.removeChild(_loc3_);
        }
        this._SafeStr_2758.addChildAt(_loc3_, param1 >>> 0 | 0);
    }

    public override nextNameIndex(param1: number): number {
        return param1 < this._SafeStr_2758.numChildren ? param1 + 1 : 0;
    }

    public override nextValue(param1: number): any {
        return this._SafeStr_2758.getChildAt((param1 >>> 0) - 1);
    }
}
