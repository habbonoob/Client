import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { InteractiveController, ScrollBarController } from '@/com/sulake/core/window/Classes.group';
import { IDragBarWindow } from '@/com/sulake/core/window/components/IDragBarWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';

export class ScrollBarLiftController extends InteractiveController implements IDragBarWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::ScrollBarLiftController'); }

    protected _SafeStr_4832: number = 0;
    protected _SafeStr_5392: number = 0;

    declare protected _scrollBar: ScrollBarController;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 32;
        param4 = (param4 | 0x8000) >>> 0;
        param4 = (param4 | 0x0101) >>> 0;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
        let _loc12_: IWindow = param7;
        while (_loc12_ != null) {
            if (isIScrollbarWindow(_loc12_)) {
                this._scrollBar = castTo(_loc12_, ScrollBarController);
                _loc12_ = null;
            } else {
                _loc12_ = _loc12_.parent;
            }
        }
        if (this._scrollBar.horizontal) {
            this.limits.minWidth = this.width;
        } else {
            this.limits.minHeight = this.height;
        }
    }

    public get scrollbarOffsetX(): number {
        return this._SafeStr_4832;
    }

    public get scrollbarOffsetY(): number {
        return this._SafeStr_5392;
    }

    public set scrollbarOffsetX(param1: number) {
    }

    public set scrollbarOffsetY(param1: number) {
    }

    public override offset(param1: number, param2: number): void {
        let _loc3_: WindowEvent = null;
        super.offset(param1, param2);
        this._SafeStr_4832 = this.x != 0 ? this.x / (this._parent.width - this.width) : 0;
        this._SafeStr_5392 = this.y != 0 ? this.y / (this._parent.height - this.height) : 0;
        if (this._parent != this._scrollBar) {
            _loc3_ = WindowEvent.allocate("WE_CHILD_RELOCATED", this, null);
            this._scrollBar.update(this, _loc3_);
            _loc3_.recycle();
        }
    }

    get [IDragBarWindow](): true {
        return true;
    }
}
