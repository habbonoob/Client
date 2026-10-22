import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Mouse } from '@habbo-pixi/runtime/ui/Mouse';

export class MouseCursorControl {
    static { registerClassName(this, 'com.sulake.core.window.utils::MouseCursorControl'); }

    private static _type: number = 0;
    private static _SafeStr_2427: Stage;
    private static _visible: boolean = true;
    private static _disposed: boolean = false;
    private static _SafeStr_5121: boolean = true;
    private static _SafeStr_2404: DisplayObject;
    private static _SafeStr_5641: Map<any, any> = new Dictionary();

    constructor(param1: DisplayObject) {
        MouseCursorControl._SafeStr_2427 = param1.stage;
    }

    public static dispose(): void {
        if (!MouseCursorControl._disposed) {
            if (MouseCursorControl._SafeStr_2404) {
                MouseCursorControl._SafeStr_2427.removeChild(MouseCursorControl._SafeStr_2404);
                MouseCursorControl._SafeStr_2427.removeEventListener("mouseLeave", MouseCursorControl.onStageMouseLeave);
                MouseCursorControl._SafeStr_2427.removeEventListener("mouseMove", MouseCursorControl.onStageMouseMove);
                MouseCursorControl._SafeStr_2427.removeEventListener("mouseOver", MouseCursorControl.onStageMouseMove);
                MouseCursorControl._SafeStr_2427.removeEventListener("mouseOut", MouseCursorControl.onStageMouseMove);
            }
            MouseCursorControl._disposed = true;
        }
    }

    public static get disposed(): boolean {
        return MouseCursorControl._disposed;
    }

    public static get type(): number {
        return MouseCursorControl._type;
    }

    public static set type(param1: number) {
        if (MouseCursorControl._type != param1) {
            MouseCursorControl._type = param1;
            MouseCursorControl._SafeStr_5121 = true;
        }
    }

    public static get visible(): boolean {
        return MouseCursorControl._visible;
    }

    public static set visible(param1: boolean) {
        MouseCursorControl._visible = param1;
        if (MouseCursorControl._visible) {
            if (MouseCursorControl._SafeStr_2404) {
                MouseCursorControl._SafeStr_2404.visible = true;
            } else {
                Mouse.show();
            }
        } else if (MouseCursorControl._SafeStr_2404) {
            MouseCursorControl._SafeStr_2404.visible = false;
        } else {
            Mouse.hide();
        }
    }

    public static change(): void {
        let _loc1_: DisplayObject = null;
        if (MouseCursorControl._SafeStr_5121) {
            _loc1_ = MouseCursorControl._SafeStr_5641.get(MouseCursorControl._type);
            if (_loc1_) {
                if (MouseCursorControl._SafeStr_2404) {
                    MouseCursorControl._SafeStr_2427.removeChild(MouseCursorControl._SafeStr_2404);
                } else {
                    MouseCursorControl._SafeStr_2427.addEventListener("mouseLeave", MouseCursorControl.onStageMouseLeave);
                    MouseCursorControl._SafeStr_2427.addEventListener("mouseMove", MouseCursorControl.onStageMouseMove);
                    MouseCursorControl._SafeStr_2427.addEventListener("mouseOver", MouseCursorControl.onStageMouseMove);
                    MouseCursorControl._SafeStr_2427.addEventListener("mouseOut", MouseCursorControl.onStageMouseMove);
                    Mouse.hide();
                }
                MouseCursorControl._SafeStr_2404 = _loc1_;
                MouseCursorControl._SafeStr_2427.addChild(MouseCursorControl._SafeStr_2404);
            } else {
                if (MouseCursorControl._SafeStr_2404) {
                    MouseCursorControl._SafeStr_2427.removeChild(MouseCursorControl._SafeStr_2404);
                    MouseCursorControl._SafeStr_2427.removeEventListener("mouseLeave", MouseCursorControl.onStageMouseLeave);
                    MouseCursorControl._SafeStr_2427.removeEventListener("mouseMove", MouseCursorControl.onStageMouseMove);
                    MouseCursorControl._SafeStr_2427.removeEventListener("mouseOver", MouseCursorControl.onStageMouseMove);
                    MouseCursorControl._SafeStr_2427.removeEventListener("mouseOut", MouseCursorControl.onStageMouseMove);
                    MouseCursorControl._SafeStr_2404 = null;
                    Mouse.show();
                }
                switch (MouseCursorControl._type) {
                    case 0:
                    case 1:
                        Mouse.cursor = "auto";
                        break;
                    case 2:
                        Mouse.cursor = "button";
                        break;
                    case 5:
                    case 6:
                    case 7:
                    case 8:
                        Mouse.cursor = "hand";
                        break;
                    case 14:
                        Mouse.cursor = "ibeam";
                        break;
                    case 4294967294:
                        Mouse.cursor = "auto";
                        Mouse.hide();
                }
            }
            MouseCursorControl._SafeStr_5121 = false;
        }
    }

    public static defineCustomCursorType(param1: number, param2: DisplayObject): void {
        MouseCursorControl._SafeStr_5641.set(param1, param2);
    }

    private static onStageMouseMove(param1: MouseEvent): void {
        if (MouseCursorControl._SafeStr_2404) {
            MouseCursorControl._SafeStr_2404.x = param1.stageX - 2;
            MouseCursorControl._SafeStr_2404.y = param1.stageY;
            if (MouseCursorControl._type == 0) {
                MouseCursorControl._visible = false;
                Mouse.show();
            } else {
                MouseCursorControl._visible = true;
                Mouse.hide();
            }
        }
    }

    private static onStageMouseLeave(param1: Event): void {
        if (MouseCursorControl._SafeStr_2404 && MouseCursorControl._type != 0) {
            Mouse.hide();
            MouseCursorControl._visible = false;
        }
    }
}
