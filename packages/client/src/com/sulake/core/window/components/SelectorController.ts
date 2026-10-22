import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { SelectorIterator } from '@/com/sulake/core/window/iterators/SelectorIterator';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';

export class SelectorController extends InteractiveController implements ISelectorWindow, IIterable {
    static { registerClassName(this, 'com.sulake.core.window.components::SelectorController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any = null, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    declare protected _SafeStr_6003: boolean;

    declare private _selected: ISelectableWindow;

    public get iterator(): IIterator {
        return new SelectorIterator(this);
    }

    public get numSelectables(): number {
        return this.numChildren >>> 0;
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        if (param2.type == "WE_CHILD_ACTIVATED") {
            if (isISelectableWindow(param1)) {
                this.setSelected(isISelectableWindow(param1) ? param1 : null);
            }
        }
        return super.update(param1, param2);
    }

    public getSelected(): ISelectableWindow {
        return isISelectableWindow(this._selected) ? this._selected : null;
    }

    public setSelected(param1: ISelectableWindow): void {
        let _loc2_: ISelectableWindow = null;
        if (param1 != null) {
            if (param1 != this._selected) {
                if (this._selected != null) {
                    if (!this._selected.unselect()) {
                        return;
                    }
                }
                _loc2_ = this._selected;
                this._selected = param1;
                if (this._selected.select()) {
                    if (this.getChildIndex(param1) > -1) {
                        if (this._SafeStr_6003) {
                            if (this.getChildIndex(param1) != this.numChildren - 1) {
                                this.setChildIndex(param1, this.numChildren - 1);
                            }
                        }
                    }
                } else {
                    this._selected = _loc2_;
                    if (this._selected != null) {
                        this._selected.select();
                    }
                }
            }
        }
    }

    public addSelectable(param1: ISelectableWindow): ISelectableWindow {
        return castGuarded(this.addChild(param1), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow");
    }

    public addSelectableAt(param1: ISelectableWindow, param2: number): ISelectableWindow {
        return castGuarded(this.addChildAt(param1, param2), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow");
    }

    public getSelectableAt(param1: number): ISelectableWindow {
        return asGuarded(this.getChildAt(param1), isISelectableWindow);
    }

    public getSelectableByID(param1: number): ISelectableWindow {
        return asGuarded(this.getChildByID(param1 | 0), isISelectableWindow);
    }

    public getSelectableByTag(param1: string): ISelectableWindow {
        return asGuarded(this.getChildByTag(param1), isISelectableWindow);
    }

    public getSelectableByName(param1: string): ISelectableWindow {
        return asGuarded(this.getChildByName(param1), isISelectableWindow);
    }

    public getSelectableIndex(param1: ISelectableWindow): number {
        return this.getChildIndex(param1);
    }

    public removeSelectable(param1: ISelectableWindow): ISelectableWindow {
        let _loc2_: number = this.getChildIndex(param1);
        if (_loc2_ > -1) {
            if (param1 == this._selected) {
                if (this.numSelectables > 1) {
                    this.setSelected(this.getSelectableAt(_loc2_ == 0 ? 1 : 0));
                } else {
                    this._selected = null;
                }
            }
            return castGuarded(this.removeChild(param1), isISelectableWindow, "com.sulake.core.window.components.ISelectableWindow");
        }
        return null;
    }

    protected override initInstanceFields(): void {
        this._SafeStr_6003 = true;
        super.initInstanceFields();
    }

    get [ISelectorWindow](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
