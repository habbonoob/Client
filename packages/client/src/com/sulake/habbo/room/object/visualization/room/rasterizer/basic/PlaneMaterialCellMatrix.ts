import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { PlaneMaterialCellColumn } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterialCellColumn';
import { Randomizer } from '@/com/sulake/habbo/room/object/visualization/room/utils/Randomizer';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class PlaneMaterialCellMatrix {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneMaterialCellMatrix'); }

    public static readonly REPEAT_MODE_ALL: number = 1;
    public static readonly REPEAT_MODE_BORDERS: number = 2;
    public static readonly REPEAT_MODE_CENTER: number = 3;
    public static readonly REPEAT_MODE_FIRST: number = 4;
    public static readonly REPEAT_MODE_LAST: number = 5;
    public static readonly REPEAT_MODE_RANDOM: number = 6;
    public static readonly REPEAT_MODE_DEFAULT: number = 1;
    public static readonly _SafeStr_5374: number = -1;
    public static readonly MAX_NORMAL_COORDINATE_VALUE: number = 1;
    public static readonly ALIGN_TOP: number = 1;
    public static readonly ALIGN_BOTTOM: number = 2;
    public static readonly ALIGN_DEFAULT: number = 1;

    private static nextRandomColumnIndex(param1: number): number {
        let _loc2_: any[] = Randomizer.getValues(1, 0, param1 * 17631);
        return _loc2_[0] % param1 | 0;
    }

    constructor(param1: number, param2: number = 1, param3: number = 1, param4: number = -1, param5: number = 1, param6: number = -1, param7: number = 1) {
        let _loc8_: number = 0;
        this._columns = [];
        if (param1 < 1) {
            param1 = 1;
        }
        _loc8_ = 0;
        while (_loc8_ < param1) {
            this._columns.push(null);
            _loc8_++;
        }
        this._repeatMode = param2;
        this._align = param3;
        this._normalMinX = param4;
        this._normalMaxX = param5;
        this._normalMinY = param6;
        this._normalMaxY = param7;
        if (this._repeatMode == 6) {
            this._isStatic = false;
        }
    }

    declare private _columns: any[];

    private _repeatMode: number = 1;
    private _align: number = 1;

    declare private _SafeStr_2156: BitmapData;

    private _cachedBitmapNormal: Vector3d = null;
    private _SafeStr_2860: number = 0;
    private _SafeStr_4870: boolean = false;
    private _isStatic: boolean = true;
    private _normalMinX: number = -1;
    private _normalMaxX: number = 1;
    private _normalMinY: number = -1;
    private _normalMaxY: number = 1;

    public get normalMinX(): number {
        return this._normalMinX;
    }

    public get normalMaxX(): number {
        return this._normalMaxX;
    }

    public get normalMinY(): number {
        return this._normalMinY;
    }

    public get normalMaxY(): number {
        return this._normalMaxY;
    }

    public get isStatic(): boolean {
        return this._isStatic;
    }

    public isBottomAligned(): boolean {
        return this._align == 2;
    }

    public dispose(): void {
        if (this._SafeStr_2156 != null) {
            this._SafeStr_2156.dispose();
            this._SafeStr_2156 = null;
        }
        if (this._cachedBitmapNormal != null) {
            this._cachedBitmapNormal = null;
        }
    }

    public clearCache(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneMaterialCellColumn = null;
        if (!this._SafeStr_4870) {
            return;
        }
        if (this._SafeStr_2156 != null) {
            this._SafeStr_2156.dispose();
            this._SafeStr_2156 = null;
        }
        if (this._cachedBitmapNormal != null) {
            this._cachedBitmapNormal.x = 0;
            this._cachedBitmapNormal.y = 0;
            this._cachedBitmapNormal.z = 0;
        }
        this._SafeStr_2860 = 0;
        _loc2_ = 0;
        while (_loc2_ < this._columns.length) {
            _loc1_ = asInstanceOf(this._columns[_loc2_], PlaneMaterialCellColumn);
            if (_loc1_ != null) {
                _loc1_.clearCache();
            }
            _loc2_++;
        }
        this._SafeStr_4870 = false;
    }

    public createColumn(param1: number, param2: number, param3: any[], param4: number = 1): boolean {
        if (param1 < 0 || param1 >= this._columns.length) {
            return false;
        }
        let _loc6_: PlaneMaterialCellColumn = new PlaneMaterialCellColumn(param2, param3, param4);
        let _loc5_: PlaneMaterialCellColumn = asInstanceOf(this._columns[param1], PlaneMaterialCellColumn);
        if (_loc5_ != null) {
            _loc5_.dispose();
        }
        this._columns[param1] = _loc6_;
        if (_loc6_ != null && !_loc6_.isStatic) {
            this._isStatic = false;
        }
        return true;
    }

    public render(param1: BitmapData, param2: number, param3: number, param4: IVector3d, param5: boolean, param6: number, param7: number, param8: boolean): BitmapData {
        let _loc12_: number = 0;
        let _loc11_: PlaneMaterialCellColumn = null;
        let _loc10_: BitmapData = null;
        if (param2 < 1) {
            param2 = 1;
        }
        if (param3 < 1) {
            param3 = 1;
        }
        if (param1 == null || param1.width != param2 || param1.height != param3) {
            param1 = null;
        }
        if (this._cachedBitmapNormal == null) {
            this._cachedBitmapNormal = new Vector3d();
        }
        if (this.isStatic) {
            if (this._SafeStr_2156 != null) {
                if (this._SafeStr_2156.width == param2 && this._SafeStr_2156.height == param3 && Vector3d.isEqual(this._cachedBitmapNormal, param4)) {
                    if (param1 != null) {
                        this.copyCachedBitmapOnCanvas(param1, this._SafeStr_2860, param7, param8);
                        return param1;
                    }
                    return this._SafeStr_2156;
                }
                this._SafeStr_2156.dispose();
                this._SafeStr_2156 = null;
            }
        } else if (this._SafeStr_2156 != null) {
            if (this._SafeStr_2156.width == param2 && this._SafeStr_2156.height == param3) {
                this._SafeStr_2156.fillRect(this._SafeStr_2156.rect, 16777215);
            } else {
                this._SafeStr_2156.dispose();
                this._SafeStr_2156 = null;
            }
        }
        this._SafeStr_4870 = true;
        this._cachedBitmapNormal.assign(param4);
        if (!param5) {
            this._SafeStr_2860 = param3;
            if (this._SafeStr_2156 == null) {
                try {
                    this._SafeStr_2156 = new BitmapData(param2, param3, true, 4294967295);
                } catch (e) {
                    return null;
                }
            } else {
                this._SafeStr_2156.fillRect(this._SafeStr_2156.rect, 4294967295);
            }
            if (param1 != null) {
                this.copyCachedBitmapOnCanvas(param1, param3, param7, param8);
                return param1;
            }
            return this._SafeStr_2156;
        }
        if (this._SafeStr_2156 == null) {
            this._SafeStr_2860 = param3;
            try {
                this._SafeStr_2156 = new BitmapData(param2, param3, true, 16777215);
            } catch (e) {
                this._SafeStr_2156 = null;
                return null;
            }
        }
        let _loc9_: any[] = [];
        _loc12_ = 0;
        while (_loc12_ < this._columns.length) {
            _loc11_ = asInstanceOf(this._columns[_loc12_], PlaneMaterialCellColumn);
            if (_loc11_ != null) {
                _loc10_ = _loc11_.render(param3, param4, param6, param7);
                if (_loc10_ != null) {
                    _loc9_.push(_loc10_);
                }
            }
            _loc12_++;
        }
        if (_loc9_.length == 0) {
            if (param1 != null) {
                return param1;
            }
            return this._SafeStr_2156;
        }
        let _loc13_: number = 0;
        switch (this._repeatMode - 2) {
            case 0:
                _loc13_ = this.renderRepeatBorders(this._SafeStr_2156, _loc9_);
                break;
            case 1:
                _loc13_ = this.renderRepeatCenter(this._SafeStr_2156, _loc9_);
                break;
            case 2:
                _loc13_ = this.renderRepeatFirst(this._SafeStr_2156, _loc9_);
                break;
            case 3:
                _loc13_ = this.renderRepeatLast(this._SafeStr_2156, _loc9_);
                break;
            case 4:
                _loc13_ = this.renderRepeatRandom(this._SafeStr_2156, _loc9_);
                break;
            default:
                _loc13_ = this.renderRepeatAll(this._SafeStr_2156, _loc9_);
        }
        this._SafeStr_2860 = _loc13_;
        if (param1 != null) {
            this.copyCachedBitmapOnCanvas(param1, _loc13_, param7, param8);
            return param1;
        }
        return this._SafeStr_2156;
    }

    public getColumns(param1: number): any[] {
        let _loc2_: any[] = null;
        let _loc4_: number = 0;
        let _loc3_: PlaneMaterialCellColumn = null;
        if (this._repeatMode == 6) {
            _loc2_ = [];
            _loc4_ = 0;
            while (_loc4_ < param1) {
                _loc3_ = this._columns[PlaneMaterialCellMatrix.nextRandomColumnIndex(this._columns.length | 0)];
                if (_loc3_ == null) {
                    break;
                }
                _loc2_.push(_loc3_);
                if (_loc3_.width <= 1) {
                    break;
                }
                _loc4_ += _loc3_.width;
            }
            return _loc2_;
        }
        return this._columns;
    }

    private copyCachedBitmapOnCanvas(param1: BitmapData, param2: number, param3: number, param4: boolean): void {
        if (param1 == null || this._SafeStr_2156 == null || param1 == this._SafeStr_2156) {
            return;
        }
        if (!param4) {
            param3 = param1.height - param2 - param3;
        }
        let _loc5_: Rectangle = null;
        if (this._align == 1) {
            _loc5_ = new Rectangle(0, 0, this._SafeStr_2156.width, this._SafeStr_2860);
        } else {
            _loc5_ = new Rectangle(0, this._SafeStr_2156.height - this._SafeStr_2860, this._SafeStr_2156.width, this._SafeStr_2860);
        }
        param1.copyPixels(this._SafeStr_2156, _loc5_, new Point(0, param3), null, null, true);
    }

    private getColumnsWidth(param1: any[]): number {
        let _loc3_: number = 0;
        let _loc2_: BitmapData = null;
        if (param1 == null || param1.length == 0) {
            return 0;
        }
        let _loc4_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_ = asInstanceOf(param1[_loc3_], BitmapData);
            if (_loc2_ != null) {
                _loc4_ += _loc2_.width;
            }
            _loc3_++;
        }
        return _loc4_;
    }

    private renderColumns(param1: BitmapData, param2: any[], param3: number, param4: boolean): Point {
        let _loc8_: number = 0;
        let _loc5_: number = 0;
        if (param2 == null || param2.length == 0 || param1 == null) {
            return new Point(param3, 0);
        }
        let _loc6_: number = 0;
        let _loc7_: BitmapData = null;
        _loc8_ = 0;
        while (_loc8_ < param2.length) {
            if (param4) {
                _loc7_ = asInstanceOf(param2[_loc8_], BitmapData);
            } else {
                _loc7_ = asInstanceOf(param2[param2.length - 1 - _loc8_], BitmapData);
            }
            if (_loc7_ != null) {
                if (!param4) {
                    param3 -= _loc7_.width;
                }
                _loc5_ = 0;
                if (this._align == 2) {
                    _loc5_ = param1.height - _loc7_.height;
                }
                param1.copyPixels(_loc7_, _loc7_.rect, new Point(param3, _loc5_), _loc7_, null, true);
                if (_loc7_.height > _loc6_) {
                    _loc6_ = _loc7_.height;
                }
                if (param4) {
                    param3 += _loc7_.width;
                }
                if (param4 && param3 >= param1.width || !param4 && param3 <= 0) {
                    return new Point(param3, _loc6_);
                }
            }
            _loc8_++;
        }
        return new Point(param3, _loc6_);
    }

    private renderRepeatAll(param1: BitmapData, param2: any[]): number {
        let _loc6_: Point = null;
        if (param2 == null || param2.length == 0 || param1 == null) {
            return 0;
        }
        let _loc4_: number = 0;
        let _loc5_: number = this.getColumnsWidth(param2);
        let _loc3_: number = 0;
        if (_loc5_ > param1.width) {
        }
        while (_loc3_ < param1.width) {
            _loc6_ = this.renderColumns(param1, param2, _loc3_, true);
            _loc3_ = _loc6_.x | 0;
            if (_loc6_.y > _loc4_) {
                _loc4_ = _loc6_.y | 0;
            }
            if (_loc6_.x == 0) {
                return _loc4_;
            }
        }
        return _loc4_;
    }

    private renderRepeatBorders(param1: BitmapData, param2: any[]): number {
        if (param2 == null || param2.length == 0 || param1 == null) {
            return 0;
        }
        let _loc5_: number = 0;
        let _loc6_: BitmapData = null;
        let _loc9_: any[] = [];
        let _loc3_: number = 0;
        let _loc7_: number = 0;
        _loc7_ = 1;
        while (_loc7_ < param2.length - 1) {
            _loc6_ = asInstanceOf(param2[_loc7_], BitmapData);
            if (_loc6_ != null) {
                _loc3_ += _loc6_.width;
                _loc9_.push(_loc6_);
            }
            _loc7_++;
        }
        if (this._columns.length == 1) {
            _loc6_ = asInstanceOf(this._columns[0], BitmapData);
            if (_loc6_ != null) {
                _loc3_ = _loc6_.width;
                _loc9_.push(_loc6_);
            }
        }
        let _loc4_: any = param1.width - _loc3_ >> 1;
        let _loc10_: Point = null;
        _loc10_ = this.renderColumns(param1, _loc9_, _loc4_ | 0, true);
        let _loc8_: number = _loc10_.x | 0;
        if (_loc10_.y > _loc5_) {
            _loc5_ = _loc10_.y | 0;
        }
        _loc6_ = asInstanceOf(param2[0], BitmapData);
        if (_loc6_ != null) {
            _loc9_ = [_loc6_];
            while (_loc4_ >= 0) {
                _loc10_ = this.renderColumns(param1, _loc9_, _loc4_ | 0, false);
                _loc4_ = _loc10_.x;
                if (_loc10_.y > _loc5_) {
                    _loc5_ = _loc10_.y | 0;
                }
            }
        }
        _loc6_ = asInstanceOf(param2[param2.length - 1], BitmapData);
        if (_loc6_ != null) {
            _loc9_ = [_loc6_];
            while (_loc8_ < param1.height) {
                _loc10_ = this.renderColumns(param1, _loc9_, _loc8_, true);
                _loc8_ = _loc10_.x | 0;
                if (_loc10_.y > _loc5_) {
                    _loc5_ = _loc10_.y | 0;
                }
            }
        }
        return _loc5_;
    }

    private renderRepeatCenter(param1: BitmapData, param2: any[]): number {
        let _loc12_: number = 0;
        let _loc11_: number = 0;
        let _loc5_: number = 0;
        let _loc9_: number = 0;
        let _loc15_: any[] = null;
        if (param2 == null || param2.length == 0 || param1 == null) {
            return 0;
        }
        let _loc13_: number = 0;
        let _loc8_: BitmapData = null;
        let _loc4_: any[] = [];
        let _loc3_: any[] = [];
        let _loc18_: number = 0;
        let _loc7_: number = 0;
        let _loc10_: number = 0;
        _loc10_ = 0;
        while (_loc10_ < param2.length >> 1) {
            _loc8_ = asInstanceOf(param2[_loc10_], BitmapData);
            if (_loc8_ != null) {
                _loc18_ += _loc8_.width;
                _loc4_.push(_loc8_);
            }
            _loc10_++;
        }
        _loc10_ = (param2.length >> 1) + 1;
        while (_loc10_ < param2.length) {
            _loc8_ = asInstanceOf(param2[_loc10_], BitmapData);
            if (_loc8_ != null) {
                _loc7_ += _loc8_.width;
                _loc3_.push(_loc8_);
            }
            _loc10_++;
        }
        let _loc16_: Point = null;
        let _loc14_: number = 0;
        let _loc6_: number = 0;
        let _loc17_: number = param1.width;
        if (_loc18_ + _loc7_ > param1.width) {
            _loc14_ = _loc18_ + _loc7_ - param1.width;
            _loc6_ -= _loc14_ >> 1;
            _loc17_ += _loc14_ - (_loc14_ >> 1);
        }
        if (_loc14_ == 0) {
            _loc8_ = asInstanceOf(param2[param2.length >> 1], BitmapData);
            if (_loc8_ != null) {
                _loc12_ = _loc8_.width;
                _loc11_ = param1.width - (_loc18_ + _loc7_);
                _loc5_ = Math.ceil(_loc11_ / _loc12_) * _loc12_ | 0;
                _loc6_ = _loc18_ - (_loc5_ - _loc11_ >> 1);
                _loc9_ = _loc6_ + _loc5_;
                _loc15_ = [_loc8_];
                while (_loc6_ < _loc9_) {
                    _loc16_ = this.renderColumns(param1, _loc15_, _loc6_, true);
                    _loc6_ = _loc16_.x | 0;
                    if (_loc16_.y > _loc13_) {
                        _loc13_ = _loc16_.y | 0;
                    }
                }
            }
        }
        _loc6_ = 0;
        _loc16_ = this.renderColumns(param1, _loc4_, _loc6_, true);
        if (_loc16_.y > _loc13_) {
            _loc13_ = _loc16_.y | 0;
        }
        _loc16_ = this.renderColumns(param1, _loc3_, _loc17_, false);
        if (_loc16_.y > _loc13_) {
            _loc13_ = _loc16_.y | 0;
        }
        return _loc13_;
    }

    private renderRepeatFirst(param1: BitmapData, param2: any[]): number {
        let _loc6_: any[] = null;
        if (param2 == null || param2.length == 0 || param1 == null) {
            return 0;
        }
        let _loc4_: number = 0;
        let _loc5_: BitmapData = null;
        let _loc3_: number = param1.width;
        let _loc7_: Point = this.renderColumns(param1, param2, _loc3_, false);
        _loc3_ = _loc7_.x | 0;
        if (_loc7_.y > _loc4_) {
            _loc4_ = _loc7_.y | 0;
        }
        _loc5_ = asInstanceOf(param2[0], BitmapData);
        if (_loc5_ != null) {
            _loc6_ = [_loc5_];
            while (_loc3_ >= 0) {
                _loc7_ = this.renderColumns(param1, _loc6_, _loc3_, false);
                _loc3_ = _loc7_.x | 0;
                if (_loc7_.y > _loc4_) {
                    _loc4_ = _loc7_.y | 0;
                }
            }
        }
        return _loc4_;
    }

    private renderRepeatLast(param1: BitmapData, param2: any[]): number {
        let _loc6_: any[] = null;
        if (param2 == null || param2.length == 0 || param1 == null) {
            return 0;
        }
        let _loc4_: number = 0;
        let _loc5_: BitmapData = null;
        let _loc3_: number = 0;
        let _loc7_: Point = this.renderColumns(param1, param2, _loc3_, true);
        _loc3_ = _loc7_.x | 0;
        if (_loc7_.y > _loc4_) {
            _loc4_ = _loc7_.y | 0;
        }
        _loc5_ = asInstanceOf(param2[param2.length - 1], BitmapData);
        if (_loc5_ != null) {
            _loc6_ = [_loc5_];
            while (_loc3_ < param1.width) {
                _loc7_ = this.renderColumns(param1, _loc6_, _loc3_, true);
                _loc3_ = _loc7_.x | 0;
                if (_loc7_.y > _loc4_) {
                    _loc4_ = _loc7_.y | 0;
                }
            }
        }
        return _loc4_;
    }

    private renderRepeatRandom(param1: BitmapData, param2: any[]): number {
        let _loc6_: any[] = null;
        let _loc7_: Point = null;
        if (param2 == null || param2.length == 0 || param1 == null) {
            return 0;
        }
        let _loc4_: number = 0;
        let _loc5_: BitmapData = null;
        let _loc3_: number = 0;
        while (_loc3_ < param1.width) {
            _loc5_ = asInstanceOf(param2[PlaneMaterialCellMatrix.nextRandomColumnIndex(param2.length | 0)], BitmapData);
            if (_loc5_ == null) {
                return _loc4_;
            }
            _loc6_ = [_loc5_];
            _loc7_ = this.renderColumns(param1, _loc6_, _loc3_, true);
            _loc3_ = _loc7_.x | 0;
            if (_loc7_.y > _loc4_) {
                _loc4_ = _loc7_.y | 0;
            }
        }
        return _loc4_;
    }
}
