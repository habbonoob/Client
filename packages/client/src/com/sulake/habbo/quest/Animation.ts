import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { AnimationObject } from '@/com/sulake/habbo/quest/AnimationObject';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class Animation implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::Animation'); }

    constructor(param1: IBitmapWrapperWindow) {
        this._canvas = param1;
        this._canvas.visible = false;
        if (param1.bitmap == null) {
            param1.bitmap = new BitmapData(param1.width, param1.height, true, 0);
        }
    }

    declare private _canvas: IBitmapWrapperWindow;

    declare private _SafeStr_3729: number;
    static { (this.prototype as any)._SafeStr_3729 = 0; }

    declare private _SafeStr_3785: boolean;
    static { (this.prototype as any)._SafeStr_3785 = false; }

    private _sprites: any[] = [];

    public get disposed(): boolean {
        return this._canvas == null;
    }

    public dispose(): void {
        this._canvas = null;
        if (this._sprites) {
            for (const _loc1_ of this._sprites ?? []) {
                _loc1_.dispose();
            }
            this._sprites = null;
        }
    }

    public addObject(param1: AnimationObject): void {
        this._sprites.push(param1);
    }

    public stop(): void {
        this._SafeStr_3785 = false;
        this._canvas.visible = false;
    }

    public restart(): void {
        this._SafeStr_3729 = 0;
        this._SafeStr_3785 = true;
        for (const _loc1_ of this._sprites ?? []) {
            _loc1_.onAnimationStart();
        }
        this.draw();
        this._canvas.visible = true;
    }

    public update(param1: number): void {
        if (this._SafeStr_3785) {
            this._SafeStr_3729 += param1;
            this.draw();
        }
    }

    private draw(): void {
        let _loc1_: boolean = false;
        let _loc3_: BitmapData = null;
        this._canvas.bitmap.fillRect(this._canvas.bitmap.rect, 0);
        if (this._SafeStr_3785) {
            _loc1_ = false;
            for (const _loc2_ of this._sprites ?? []) {
                if (!_loc2_.isFinished(this._SafeStr_3729)) {
                    _loc1_ = true;
                    _loc3_ = _loc2_.getBitmap(this._SafeStr_3729);
                    if (_loc3_ != null) {
                        this._canvas.bitmap.copyPixels(_loc3_, _loc3_.rect, _loc2_.getPosition(this._SafeStr_3729));
                    }
                }
            }
        }
        this._canvas.invalidate();
        this._SafeStr_3785 = _loc1_;
    }

    get [IDisposable](): true {
        return true;
    }
}
