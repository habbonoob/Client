import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { ButtonController, WindowController } from '@/com/sulake/core/window/Classes.group';
import { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isISelectorWindow } from '@/com/sulake/core/window/components/ISelectorWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class SelectableButtonController extends ButtonController implements ISelectableWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::SelectableButtonController'); }

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public get selector(): ISelectorWindow {
        let _loc1_: IWindow = null;
        if (this._parent) {
            _loc1_ = this._parent instanceof WindowController ? this._parent : null;
            while (_loc1_) {
                if (isISelectorWindow(_loc1_)) {
                    return isISelectorWindow(_loc1_) ? _loc1_ : null;
                }
                _loc1_ = _loc1_.parent;
            }
        }
        return null;
    }

    public get isSelected(): boolean {
        return this.testStateFlag(8);
    }

    public set isSelected(param1: boolean) {
        this.setStateFlag(8, param1);
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc3_: WindowController = null;
        let _loc4_: WindowEvent = null;
        if (param2.type == "WE_ACTIVATED") {
            if (this._parent) {
                if (!(isISelectorWindow(this._parent))) {
                    _loc3_ = asInstanceOf(this._parent.parent, WindowController);
                    while (_loc3_) {
                        if (isISelectorWindow(_loc3_)) {
                            _loc4_ = WindowEvent.allocate("WE_CHILD_ACTIVATED", this, null);
                            _loc3_.update(this, _loc4_);
                            _loc4_.recycle();
                            break;
                        }
                        _loc3_ = asInstanceOf(_loc3_.parent, WindowController);
                    }
                }
            }
        }
        return super.update(param1, param2);
    }

    public select(): boolean {
        if (this.getStateFlag(8)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_SELECT", this, null, true);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(8, true);
        _loc1_ = WindowEvent.allocate("WE_SELECTED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    public unselect(): boolean {
        if (!this.getStateFlag(8)) {
            return true;
        }
        let _loc1_: WindowEvent = WindowEvent.allocate("WE_UNSELECT", this, null, true);
        this.update(this, _loc1_);
        if (_loc1_.isDefaultPrevented()) {
            _loc1_.recycle();
            return false;
        }
        _loc1_.recycle();
        this.setStateFlag(8, false);
        _loc1_ = WindowEvent.allocate("WE_UNSELECTED", this, null);
        this.update(this, _loc1_);
        _loc1_.recycle();
        return true;
    }

    get [ISelectableWindow](): true {
        return true;
    }
}
