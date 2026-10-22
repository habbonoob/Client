import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { ITouchAwareWindow } from '@/com/sulake/core/window/utils/tablet/ITouchAwareWindow';
import type { WindowContext } from '@/com/sulake/core/window/WindowContext';
import type { WindowController } from '@/com/sulake/core/window/WindowController';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { InteractiveController } from '@/com/sulake/core/window/Classes.group';
import { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { WindowTouchEvent } from '@/com/sulake/core/window/events/WindowTouchEvent';

export class ButtonController extends InteractiveController implements IButtonWindow, ITouchAwareWindow {
    static { registerClassName(this, 'com.sulake.core.window.components::ButtonController'); }

    protected static readonly TEXT_FIELD_NAME: string = "_BTN_TEXT";
    protected static readonly CAPTION_BLEND_CHANGE: number = 0.5;

    constructor(param1: string, param2: number, param3: number, param4: number, param5: WindowContext, param6: Rectangle, param7: IWindow, param8: (...args: any[]) => any, param9: any[] = null, param10: any[] = null, param11: number = 0) {
        param4 |= 131072;
        super(param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11);
    }

    public override set caption(param1: string) {
        super.caption = param1;
        let _loc2_: IWindow = this.getChildByName("_BTN_TEXT");
        if (_loc2_ != null) {
            _loc2_.caption = this.caption;
        }
    }

    public override set blend(param1: number) {
        super.blend = param1;
        let _loc3_: IWindow = this.getChildByName("_BTN_TEXT");
        let _loc2_: boolean = this.getStateFlag(32);
        if (_loc3_ != null) {
            _loc3_.blend = _loc2_ ? param1 / 2 : param1;
        }
    }

    public override update(param1: WindowController, param2: WindowEvent): boolean {
        let _loc5_: string = null;
        let _loc4_: WindowEvent = null;
        let _loc3_: boolean = false;
        if (param2 instanceof WindowEvent) {
            switch (param2.type) {
                case "WE_CHILD_RESIZED":
                    this.width = 0;
                    break;
                case "WE_ENABLED":
                    try {
                        this.getChildByName("_BTN_TEXT").blend = this.getChildByName("_BTN_TEXT").blend + 0.5;
                        break;
                    } catch (e) {
                        break;
                    }
                    break;
                case "WE_DISABLED":
                    try {
                        this.getChildByName("_BTN_TEXT").blend = this.getChildByName("_BTN_TEXT").blend - 0.5;
                    } catch (e) {
                    }
            }
        } else if ((param2 as unknown) instanceof WindowTouchEvent) {
            // (unreachable, as in AS3: a WindowTouchEvent is a WindowEvent and took the branch above)
            _loc5_ = "";
            switch ((param2 as WindowEvent).type) {
                case "WTE_BEGIN":
                    _loc5_ = "WME_DOWN";
                    break;
                case "WTE_END":
                    _loc5_ = "WME_UP";
                    break;
                case "WTE_TAP":
                    _loc5_ = "WME_CLICK";
            }
            _loc4_ = WindowMouseEvent.allocate_WindowMouseEvent(_loc5_, castTo(param2, WindowTouchEvent).window, castTo(param2, WindowTouchEvent).related, castTo(param2, WindowTouchEvent).localX, castTo(param2, WindowTouchEvent).localY, castTo(param2, WindowTouchEvent).stageX, castTo(param2, WindowTouchEvent).stageY, castTo(param2, WindowTouchEvent).altKey, castTo(param2, WindowTouchEvent).ctrlKey, castTo(param2, WindowTouchEvent).shiftKey, true, 0);
            _loc3_ = super.update(param1, _loc4_);
            _loc4_.recycle();
            return _loc3_;
        }
        return super.update(param1, param2);
    }

    public override get caption(): string {
        return super.caption;
    }

    public override get blend(): number {
        return super.blend;
    }

    get [IButtonWindow](): true {
        return true;
    }
}
