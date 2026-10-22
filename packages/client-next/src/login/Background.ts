import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBitmap } from '@habbo-pixi/runtime/embed/embed';
import type { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

const background_tiles_png_pngAsset = embedBitmap("shared/background_tiles_png.png");

export class Background extends Sprite implements IDisposable {
    static { registerClassName(this, 'login::Background'); }

    private static readonly background_tiles_png = background_tiles_png_pngAsset;

    declare private _SafeStr_6346: BitmapData;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _lines: Sprite;

    constructor() {
        super();
        this.addEventListener("addedToStage", this.onAddedToStage);
        this.addEventListener("removedFromStage", this.onRemovedFromStage);
    }

    public dispose(): void {
        this._disposed = true;
        while (this.numChildren > 0) {
            this.removeChildAt(0);
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private onRemovedFromStage = (param1: Event): void => {
    };

    protected onAddedToStage = (param1: Event): void => {
        this._lines = new Sprite();
        let _loc2_: Bitmap = new Background.background_tiles_png();
        this._SafeStr_6346 = _loc2_.bitmapData;
        this.addChild(this._lines);
        this.resize();
    };

    protected stageChangeResize(param1: Event): void {
        this.resize();
    }

    public resize(): void {
        let _loc2_: string = null;
        let _loc5_: any[] = null;
        let _loc3_: any[] = null;
        let _loc4_: any[] = null;
        let _loc1_: Matrix = null;
        let _loc6_: string = null;
        if (this.stage) {
            _loc2_ = "linear";
            _loc5_ = [809599, 801381];
            _loc3_ = [1, 1];
            _loc4_ = [127, 255];
            _loc1_ = new Matrix();
            _loc1_.createGradientBox(50, 100, 0, 0, 0);
            _loc1_.rotate(3.141592653589793 / 2);
            _loc1_.scale(this.stage.stageWidth / 50, this.stage.stageHeight / 100);
            _loc6_ = "pad";
            this.graphics.beginGradientFill(_loc2_, _loc5_, _loc3_, _loc4_, _loc1_, _loc6_);
            this.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
            if (this._lines != null) {
                this._lines.graphics.clear();
                this._lines.graphics.beginBitmapFill(this._SafeStr_6346);
                this._lines.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight);
                this._lines.graphics.endFill();
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
