import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';

export class Canvas extends BitmapData {
    static { registerClassName(this, 'com.sulake.habbo.utils::Canvas'); }

    constructor(param1: number, param2: number, param3: boolean = true, param4: number = 0) {
        super(param1, param2, param3, param4);
    }

    private static sortByVerticalPosition(param1: Point, param2: Point): number {
        if (param1.y > param2.y) {
            return 1;
        }
        if (param1.y < param2.y) {
            return -1;
        }
        return 0;
    }

    private static sampleLeftWallTexture(param1: BitmapData, param2: Point, param3: number, param4: number, param5: number): number {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = NaN;
        let _loc9_: number = NaN;
        let _loc10_: any = 0;
        if (param1) {
            _loc6_ = param3 - param2.x | 0;
            _loc7_ = param4 - param2.y | 0;
            _loc8_ = _loc6_ % param1.width;
            _loc9_ = (_loc7_ + _loc6_ / 2) % param1.height;
            _loc10_ = param1.getPixel32(_loc8_ | 0, _loc9_ | 0);
            return Canvas.colorize(_loc10_ >>> 0, param5);
        }
        return param5;
    }

    private static sampleRightWallTexture(param1: BitmapData, param2: Point, param3: number, param4: number, param5: number): number {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = NaN;
        let _loc9_: number = NaN;
        let _loc10_: any = 0;
        if (param1) {
            _loc6_ = param3 - param2.x | 0;
            _loc7_ = param4 - param2.y | 0;
            _loc8_ = _loc6_ % param1.width;
            _loc9_ = (_loc7_ - _loc6_ / 2) % param1.height;
            _loc10_ = param1.getPixel32(_loc8_ | 0, _loc9_ | 0);
            return Canvas.colorize(_loc10_ >>> 0, param5);
        }
        return param5;
    }

    private static sampleFloorTexture(param1: BitmapData, param2: Point, param3: number, param4: number, param5: number): number {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = NaN;
        let _loc9_: number = NaN;
        let _loc10_: any = 0;
        if (param1) {
            _loc6_ = param3 - param2.x | 0;
            _loc7_ = param4 - param2.y | 0;
            _loc8_ = (_loc7_ + _loc6_ / 2) % param1.width;
            _loc9_ = (_loc7_ - _loc6_ / 2) % param1.height;
            _loc10_ = param1.getPixel32(_loc8_ | 0, _loc9_ | 0);
            return Canvas.colorize(_loc10_ >>> 0, param5);
        }
        return param5;
    }

    public static colorize(param1: number, param2: number): number {
        if (param2 == 4294967295) {
            return param1;
        }
        let _loc3_: number = (param2 >> 16 & 0xFF) >>> 0;
        let _loc5_: number = (param2 >> 8 & 0xFF) >>> 0;
        let _loc4_: number = (param2 & 0xFF) >>> 0;
        _loc3_ = (param1 >> 16 & 0xFF) * _loc3_ / 255 >>> 0;
        _loc5_ = (param1 >> 8 & 0xFF) * _loc5_ / 255 >>> 0;
        _loc4_ = (param1 & 0xFF) * _loc4_ / 255 >>> 0;
        return ((param1 && 4278190080) | _loc3_ << 16 | _loc5_ << 8 | _loc4_) >>> 0;
    }

    public static averageColor(param1: BitmapData): number {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: any = 0;
        if (param1 == null) {
            return 16777215;
        }
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: number = 0;
        _loc6_ = 0;
        while (_loc6_ < param1.width) {
            _loc7_ = 0;
            while (_loc7_ < param1.height) {
                _loc8_ = param1.getPixel32(_loc6_, _loc7_);
                if ((_loc8_ >> 24 & 0xFF) > 0) {
                    _loc2_ += _loc8_ >> 16 & 0xFF;
                    _loc4_ += _loc8_ >> 8 & 0xFF;
                    _loc5_ += _loc8_ & 0xFF;
                    _loc3_++;
                }
                _loc7_++;
            }
            _loc6_++;
        }
        if (_loc3_ == 0) {
            return 16777215;
        }
        _loc2_ /= _loc3_;
        _loc4_ /= _loc3_;
        _loc5_ /= _loc3_;
        return (_loc2_ << 16 | _loc4_ << 8 | _loc5_) >>> 0;
    }

    public drawQuad(param1: Point[], param2: BitmapData, param3: number = 4294967295): void {
        let _loc4_: Point = null;
        let _loc5_: (...args: any[]) => any = null;
        if (param1.length != 4) {
            return;
        }
        if (param1[1].x == param1[3].x) {
            _loc4_ = param1[3];
            if (param1[0].y < param1[1].y) {
                _loc5_ = Canvas.sampleLeftWallTexture;
            } else {
                _loc5_ = Canvas.sampleRightWallTexture;
            }
        } else {
            _loc4_ = param1[3];
            _loc5_ = Canvas.sampleFloorTexture;
        }
        this.fillTriangle(param1.slice(0, 3), param2, _loc4_, _loc5_, param3);
        this.fillTriangle(param1.slice(1, 4), param2, _loc4_, _loc5_, param3);
    }

    public fillTriangle(param1: Point[], param2: BitmapData, param3: Point, param4: (...args: any[]) => any, param5: number): void {
        if (param1.length != 3) {
            return;
        }
        let _loc12_: Point[] = param1.concat();
        _loc12_.sort(Canvas.sortByVerticalPosition);
        let _loc6_: Point = new Point(_loc12_[1].x - _loc12_[0].x, _loc12_[1].y - _loc12_[0].y);
        let _loc7_: Point = new Point(_loc12_[2].x - _loc12_[0].x, _loc12_[2].y - _loc12_[0].y);
        let _loc8_: Point = new Point(_loc12_[2].x - _loc12_[1].x, _loc12_[2].y - _loc12_[1].y);
        let _loc9_: number = 0;
        let _loc10_: number = 0;
        let _loc11_: number = 0;
        if (_loc6_.y != 0 && _loc7_.y != 0) {
            _loc9_ = 0;
            while (_loc9_ < _loc6_.y) {
                _loc10_ = _loc12_[0].x + _loc6_.x / _loc6_.y * _loc9_ | 0;
                _loc11_ = _loc12_[0].x + _loc7_.x / _loc7_.y * _loc9_ | 0;
                this.drawHorizontalLine(_loc10_, _loc11_, _loc12_[0].y + _loc9_ | 0, param2, param3, param4, param5);
                _loc9_++;
            }
        }
        if (_loc7_.y != 0 && _loc8_.y != 0) {
            _loc9_ = 0;
            while (_loc9_ < _loc8_.y) {
                _loc10_ = _loc12_[1].x + _loc8_.x / _loc8_.y * _loc9_ | 0;
                _loc11_ = _loc12_[0].x + _loc7_.x / _loc7_.y * (_loc6_.y + _loc9_) | 0;
                this.drawHorizontalLine(_loc10_, _loc11_, _loc12_[1].y + _loc9_ | 0, param2, param3, param4, param5);
                _loc9_++;
            }
        }
    }

    private drawHorizontalLine(param1: number, param2: number, param3: number, param4: BitmapData, param5: Point, param6: (...args: any[]) => any, param7: number): void {
        let _loc8_: number = 0;
        if (param1 < param2) {
            _loc8_ = param1;
            while (_loc8_ < param2) {
                this.setPixel(_loc8_, param3, param6(param4, param5, _loc8_, param3, param7) >>> 0);
                _loc8_++;
            }
        } else {
            _loc8_ = param2;
            while (_loc8_ < param1) {
                this.setPixel(_loc8_, param3, param6(param4, param5, _loc8_, param3, param7) >>> 0);
                _loc8_++;
            }
        }
    }
}
