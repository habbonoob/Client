import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';

export class CalendarArrowButton {
    static { registerClassName(this, 'com.sulake.habbo.quest.seasonalcalendar::CalendarArrowButton'); }

    public static readonly DIRECTION_BACK: number = 0;
    public static readonly _SafeStr_8484: number = 1;
    public static readonly STATE_INACTIVE: number = 0;
    public static readonly STATE_ACTIVE: number = 1;
    public static readonly STATE_HILITE: number = 2;
    private static readonly PRESSED_OFFSET_PIXELS: Point = new Point(1, 1);

    declare private _window: IBitmapWrapperWindow;

    declare private _callback: (...args: any[]) => any;

    private _state: number = 0;
    private _pressed: boolean = false;

    declare private _SafeStr_4853: Point;

    declare private _SafeStr_3953: BitmapData;

    declare private _SafeStr_4186: BitmapData;

    declare private _SafeStr_3882: BitmapData;

    constructor(param1: IAssetLibrary, param2: IBitmapWrapperWindow, param3: number, param4: (...args: any[]) => any) {
        this._window = param2;
        this._window.procedure = this.procedure;
        this._callback = param4;
        switch (param3) {
            case 0:
                this._SafeStr_4186 = castTo(param1.getAssetByName("arrow_back_active").content, BitmapData).clone();
                this._SafeStr_3953 = castTo(param1.getAssetByName("arrow_back_inactive").content, BitmapData).clone();
                this._SafeStr_3882 = castTo(param1.getAssetByName("arrow_back_hilite").content, BitmapData).clone();
                break;
            case 1:
                this._SafeStr_4186 = castTo(param1.getAssetByName("arrow_next_active").content, BitmapData).clone();
                this._SafeStr_3953 = castTo(param1.getAssetByName("arrow_next_inactive").content, BitmapData).clone();
                this._SafeStr_3882 = castTo(param1.getAssetByName("arrow_next_hilite").content, BitmapData).clone();
        }
        this._SafeStr_4853 = new Point(this._window.x, this._window.y);
        this.updateWindow();
    }

    public dispose(): void {
        this._SafeStr_4186 = null;
        this._SafeStr_3882 = null;
        this._SafeStr_3953 = null;
        this._window.procedure = null;
        this._window = null;
        this._callback = null;
    }

    public activate(): void {
        if (this._state != 1 && this._state != 2) {
            this._state = 1;
        }
        this.updateWindow();
    }

    public deactivate(): void {
        this._state = 0;
        this.updateWindow();
    }

    public isInactive(): boolean {
        return this._state == 0;
    }

    private updateWindow(): void {
        switch (this._state) {
            case 0:
                this._window.bitmap = this._SafeStr_3953;
                break;
            case 1:
                this._window.bitmap = this._SafeStr_4186;
                break;
            case 2:
                this._window.bitmap = this._SafeStr_3882;
        }
        if (this._pressed) {
            this._window.x = this._SafeStr_4853.x + CalendarArrowButton.PRESSED_OFFSET_PIXELS.x | 0;
            this._window.y = this._SafeStr_4853.y + CalendarArrowButton.PRESSED_OFFSET_PIXELS.y | 0;
        } else {
            this._window.position = this._SafeStr_4853;
        }
    }

    private procedure = (param1: WindowEvent, param2: IWindow): void => {
        if ((param1 instanceof WindowMouseEvent ? param1 : null) != null) {
            switch (param1.type) {
                case "WME_OVER":
                    if (this._state != 0) {
                        this._state = 2;
                    }
                    break;
                case "WME_OUT":
                    if (this._state != 0) {
                        this._state = 1;
                    }
                    break;
                case "WME_DOWN":
                    this._pressed = true;
                    break;
                case "WME_UP":
                case "WME_UP_OUTSIDE":
                    this._pressed = false;
            }
            this.updateWindow();
            this._callback(param1, param2);
        }
    };
}
