import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Logger } from '@/com/sulake/habbo/Logger';

export class SnowWarAnimatedWindowElement implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::SnowWarAnimatedWindowElement'); }

    declare private _frameCount: number;
    static { (this.prototype as any)._frameCount = 0; }

    declare private _SafeStr_3743: string;

    declare private _frames: any[];

    declare private _currentFrame: number;
    static { (this.prototype as any)._currentFrame = 0; }

    declare private _chestBasedItemSample: IBitmapWrapperWindow;

    declare private _SafeStr_2458: Timer;

    private _disposed: boolean = false;

    constructor(param1: IAssetLibrary, param2: IBitmapWrapperWindow, param3: string, param4: number, param5: number = 100, param6: boolean = false) {
        let _loc7_: number = 0;
        this._frames = [];
        this._chestBasedItemSample = param2;
        this._SafeStr_3743 = param3;
        this._frameCount = param4;
        _loc7_ = 1;
        while (_loc7_ <= this._frameCount) {
            if (param1.hasAsset(this._SafeStr_3743 + _loc7_)) {
                this._frames.push(asInstanceOf(param1.getAssetByName(this._SafeStr_3743 + _loc7_).content, BitmapData));
            } else {
                this._frames.push(new BitmapData(1, 1));
                Logger.log("Missing asset for Snow War: " + this._SafeStr_3743 + _loc7_);
            }
            _loc7_++;
        }
        if (param6) {
            this._frameCount += param4 - 2;
            _loc7_ = param4 - 1;
            while (_loc7_ > 1) {
                if (param1.hasAsset(this._SafeStr_3743 + _loc7_)) {
                    this._frames.push(asInstanceOf(param1.getAssetByName(this._SafeStr_3743 + _loc7_).content, BitmapData));
                } else {
                    this._frames.push(new BitmapData(1, 1));
                    Logger.log("Missing loop asset for Snow War: " + this._SafeStr_3743 + _loc7_);
                }
                _loc7_--;
            }
        }
        this.update();
        this._SafeStr_2458 = new Timer(param5);
        this._SafeStr_2458.addEventListener("timer", this.onTimer);
        this._SafeStr_2458.start();
    }

    public dispose(): void {
        if (!this._disposed) {
            this._SafeStr_2458.removeEventListener("timer", this.onTimer);
            this._SafeStr_2458.stop();
            this._SafeStr_2458 = null;
            if (this._chestBasedItemSample && this._chestBasedItemSample.bitmap) {
                this._chestBasedItemSample.bitmap.fillRect(this._chestBasedItemSample.bitmap.rect, 0);
                this._chestBasedItemSample.invalidate();
            }
            this._chestBasedItemSample = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private onTimer = (param1: TimerEvent): void => {
        this.update();
    };

    private update(): void {
        this._currentFrame = ++this._currentFrame % this._frameCount;
        if (!this._chestBasedItemSample.bitmap) {
            this._chestBasedItemSample.bitmap = new BitmapData(this._chestBasedItemSample.width, this._chestBasedItemSample.height);
        }
        this._chestBasedItemSample.bitmap.fillRect(this._chestBasedItemSample.bitmap.rect, 0);
        let _loc2_: BitmapData = this._frames[this._currentFrame];
        let _loc1_: Point = new Point((this._chestBasedItemSample.width - _loc2_.width) / 2, (this._chestBasedItemSample.height - _loc2_.height) / 2);
        this._chestBasedItemSample.bitmap.copyPixels(_loc2_, _loc2_.rect, _loc1_);
        this._chestBasedItemSample.invalidate();
    }

    get [IDisposable](): true {
        return true;
    }
}
