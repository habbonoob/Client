import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class Icon implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.view.utils::Icon'); }

    protected static readonly ALIGN_LEFT: number = 0;
    protected static readonly ALIGN_CENTER: number = 1;
    protected static readonly ALIGN_RIGHT: number = 2;
    protected static readonly MASK_HORIZONTAL: number = 3;
    protected static readonly ALIGN_TOP: number = 4;
    protected static readonly ALIGN_MIDDLE: number = 8;
    protected static readonly ALIGN_BOTTOM: number = 18;
    protected static readonly MASK_VERTICAL: number = 18;
    private _disposed: boolean = false;
    private _disabled: boolean = false;

    declare protected _image: BitmapDataAsset;

    declare protected _canvas: IBitmapWrapperWindow;

    private _alignment: number = 9;

    declare protected _SafeStr_2458: Timer;

    protected _frame: number = 0;
    private _point: Point = new Point();
    protected _notify: boolean = false;
    protected _hover: boolean = false;

    constructor() {
        this.onTimerEvent = this.onTimerEvent.bind(this);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get disabled(): boolean {
        return this._disabled;
    }

    protected set image(param1: BitmapDataAsset) {
        this._image = param1;
        this.redraw();
    }

    protected get image(): BitmapDataAsset {
        return this._image;
    }

    protected set canvas(param1: IBitmapWrapperWindow) {
        this._canvas = param1;
        this.redraw();
    }

    protected get canvas(): IBitmapWrapperWindow {
        return this._canvas;
    }

    protected set alignment(param1: number) {
        this._alignment = param1;
        this.redraw();
    }

    protected get alignment(): number {
        return this._alignment;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.toggleTimer(false, 0);
            this.image = null;
            this.canvas = null;
            this._disposed = true;
        }
    }

    public notify(param1: boolean): void {
        this._notify = param1;
        if (this._notify && this._disabled) {
            this.enable(true);
        }
    }

    public hover(param1: boolean): void {
        this._hover = param1;
    }

    public enable(param1: boolean): void {
        this._disabled = !param1;
    }

    protected redraw(): void {
        let _loc1_: BitmapData = null;
        if (this._canvas && !this._canvas.disposed) {
            if (!this._canvas.bitmap) {
                this._canvas.bitmap = new BitmapData(this._canvas.width, this._canvas.height, true, 0);
            } else {
                this._canvas.bitmap.fillRect(this._canvas.bitmap.rect, 0);
            }
            if (this._image && !this._image.disposed) {
                this._point.x = this._point.y = 0;
                _loc1_ = asInstanceOf(this._image.content, BitmapData);
                switch ((this._alignment & 3) - 1) {
                    case 0:
                        this._point.x = this._canvas.bitmap.width / 2 - _loc1_.width / 2;
                        break;
                    case 1:
                        this._point.x = this._canvas.bitmap.width - _loc1_.width;
                }
                switch ((this._alignment & 0x12) - 8) {
                    case 0:
                        this._point.y = this._canvas.bitmap.height / 2 - _loc1_.height / 2;
                        break;
                    case 10:
                        this._point.y = this._canvas.bitmap.height - _loc1_.height;
                }
                this._canvas.bitmap.copyPixels(_loc1_, _loc1_.rect, this._point);
                this._canvas.invalidate();
            }
        }
    }

    protected toggleTimer(param1: boolean, param2: number): void {
        if (param1) {
            if (!this._SafeStr_2458) {
                this._SafeStr_2458 = new Timer(param2, 0);
                this._SafeStr_2458.addEventListener("timer", this.onTimerEvent);
                this._SafeStr_2458.start();
                this.onTimerEvent(null);
            }
            this._SafeStr_2458.delay = param2;
        } else {
            this._frame = 0;
            if (this._SafeStr_2458) {
                this._SafeStr_2458.reset();
                this._SafeStr_2458.removeEventListener("timer", this.onTimerEvent);
                this._SafeStr_2458 = null;
            }
        }
    }

    protected onTimerEvent(param1: TimerEvent): void {
    }

    get [IDisposable](): true {
        return true;
    }
}
