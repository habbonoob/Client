import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class CalendarBackgroundRenderer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.seasonalcalendar::CalendarBackgroundRenderer'); }

    constructor() {
    }

    declare private _images: BitmapData[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._images = null;
        }
    }

    public initializeImageChain(param1: BitmapData[]): void {
        this._images = param1;
    }

    public getSlice(param1: number, param2: number): BitmapData {
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: BitmapData = null;
        let _loc4_: number = 0;
        if (this._disposed || this._images == null || this._images.length == 0) {
            return new BitmapData(1, 1);
        }
        let _loc8_: BitmapData = new BitmapData(param2, this._images[0].height, false, 0);
        let _loc3_: number = 0;
        while (_loc3_ < param2) {
            _loc5_ = param1 + _loc3_;
            _loc7_ = this.getImageIndexForOffset(_loc5_);
            if (_loc7_ < 0) {
                _loc3_ += -param1;
                if (param1 >= 0) {
                    return new BitmapData(1, 1);
                }
            } else {
                _loc6_ = this._images[_loc7_];
                _loc4_ = this.getRelativeXForOffset(_loc5_);
                if (_loc6_.width > _loc4_ + param2 - _loc3_) {
                    _loc8_.copyPixels(_loc6_, new Rectangle(_loc4_, 0, param2 - _loc3_, _loc6_.height), new Point(_loc3_, 0));
                    _loc3_ += param2 - _loc3_;
                } else {
                    _loc8_.copyPixels(_loc6_, new Rectangle(_loc4_, 0, _loc6_.width - _loc4_, _loc6_.height), new Point(_loc3_, 0));
                    _loc3_ += _loc6_.width - _loc4_;
                }
            }
        }
        return _loc8_;
    }

    public getImageIndexForOffset(param1: number): number {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._images.length) {
            if (_loc2_ <= param1 && param1 < _loc2_ + this._images[_loc3_].width) {
                return _loc3_;
            }
            _loc2_ += this._images[_loc3_].width;
            _loc3_++;
        }
        return -1;
    }

    private getRelativeXForOffset(param1: number): number {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._images.length) {
            if (_loc2_ <= param1 && param1 < _loc2_ + this._images[_loc3_].width) {
                return param1 - _loc2_;
            }
            _loc2_ += this._images[_loc3_].width;
            _loc3_++;
        }
        return -1;
    }

    get [IDisposable](): true {
        return true;
    }
}
