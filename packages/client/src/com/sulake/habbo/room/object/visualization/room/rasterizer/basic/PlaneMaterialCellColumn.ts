import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { PlaneMaterialCell } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterialCell';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class PlaneMaterialCellColumn {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneMaterialCellColumn'); }

    public static readonly REPEAT_MODE_NONE: number = 0;
    public static readonly REPEAT_MODE_ALL: number = 1;
    public static readonly REPEAT_MODE_BORDERS: number = 2;
    public static readonly REPEAT_MODE_CENTER: number = 3;
    public static readonly REPEAT_MODE_FIRST: number = 4;
    public static readonly REPEAT_MODE_LAST: number = 5;

    constructor(param1: number, param2: any[], param3: number = 1) {
        let _loc4_: number = 0;
        let _loc5_: PlaneMaterialCell = null;
        this._cells = [];
        if (param1 < 1) {
            param1 = 1;
        }
        this._width = param1;
        if (param2 != null) {
            _loc4_ = 0;
            while (_loc4_ < param2.length) {
                _loc5_ = asInstanceOf(param2[_loc4_], PlaneMaterialCell);
                if (_loc5_ != null) {
                    this._cells.push(_loc5_);
                    if (!_loc5_.isStatic) {
                        this._isStatic = false;
                    }
                }
                _loc4_++;
            }
        }
        this._repeatMode = param3;
    }

    declare private _cells: any[];

    private _repeatMode: number = 1;

    declare private _SafeStr_2156: BitmapData;

    private _cachedBitmapNormal: Vector3d = null;

    declare private _SafeStr_6126: number;
    static { (this.prototype as any)._SafeStr_6126 = 0; }

    declare private _SafeStr_6114: number;
    static { (this.prototype as any)._SafeStr_6114 = 0; }

    private _SafeStr_4870: boolean = false;
    private _isStatic: boolean = true;
    private _width: number = 1;

    public get width(): number {
        return this._width;
    }

    public get isStatic(): boolean {
        return this._isStatic;
    }

    public isRepeated(): boolean {
        return this._repeatMode != 0;
    }

    public dispose(): void {
        let _loc1_: number = 0;
        let _loc2_: PlaneMaterialCell = null;
        if (this._cells != null) {
            _loc1_ = 0;
            while (_loc1_ < this._cells.length) {
                _loc2_ = asInstanceOf(this._cells[_loc1_], PlaneMaterialCell);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
                _loc1_++;
            }
            this._cells = null;
        }
        if (this._SafeStr_2156 != null) {
            this._SafeStr_2156.dispose();
            this._SafeStr_2156 = null;
        }
        if (this._cachedBitmapNormal != null) {
            this._cachedBitmapNormal = null;
        }
    }

    public clearCache(): void {
        let _loc1_: number = 0;
        let _loc2_: PlaneMaterialCell = null;
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
        if (this._cells != null) {
            _loc1_ = 0;
            while (_loc1_ < this._cells.length) {
                _loc2_ = asInstanceOf(this._cells[_loc1_], PlaneMaterialCell);
                if (_loc2_ != null) {
                    _loc2_.clearCache();
                }
                _loc1_++;
            }
        }
        this._SafeStr_4870 = false;
    }

    public render(param1: number, param2: IVector3d, param3: number, param4: number): BitmapData {
        let _loc5_: number = 0;
        if (this._repeatMode == 0) {
            param1 = _loc5_ = this.getCellsHeight(this._cells, param2);
        }
        if (this._cachedBitmapNormal == null) {
            this._cachedBitmapNormal = new Vector3d();
        }
        if (this.isStatic) {
            if (this._SafeStr_2156 != null) {
                if (this._SafeStr_2156.height == param1 && Vector3d.isEqual(this._cachedBitmapNormal, param2) && this._SafeStr_6126 == param3 && this._SafeStr_6114 == param4) {
                    return this._SafeStr_2156;
                }
                this._SafeStr_2156.dispose();
                this._SafeStr_2156 = null;
            }
        } else if (this._SafeStr_2156 != null) {
            if (this._SafeStr_2156.height == param1) {
                this._SafeStr_2156.fillRect(this._SafeStr_2156.rect, 16777215);
            } else {
                this._SafeStr_2156.dispose();
                this._SafeStr_2156 = null;
            }
        }
        this._SafeStr_4870 = true;
        if (this._SafeStr_2156 == null) {
            try {
                this._SafeStr_2156 = new BitmapData(this._width, param1, true, 16777215);
            } catch (e) {
                return null;
            }
        }
        this._cachedBitmapNormal.assign(param2);
        this._SafeStr_6126 = param3;
        this._SafeStr_6114 = param4;
        if (this._cells.length == 0) {
            return this._SafeStr_2156;
        }
        switch (this._repeatMode) {
            case 0:
                this.renderRepeatNone(param2);
                break;
            case 2:
                this.renderRepeatBorders(param2);
                break;
            case 3:
                this.renderRepeatCenter(param2);
                break;
            case 4:
                this.renderRepeatFirst(param2);
                break;
            case 5:
                this.renderRepeatLast(param2);
                break;
            default:
                this.renderRepeatAll(param2, param3, param4);
        }
        return this._SafeStr_2156;
    }

    public getCells(): any[] {
        return this._cells;
    }

    private getCellsHeight(param1: any[], param2: IVector3d): number {
        let _loc3_: number = 0;
        let _loc5_: PlaneMaterialCell = null;
        let _loc6_: number = 0;
        if (param1 == null || param1.length == 0) {
            return 0;
        }
        let _loc4_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc5_ = asInstanceOf(param1[_loc3_], PlaneMaterialCell);
            if (_loc5_ != null) {
                _loc6_ = _loc5_.getHeight(param2);
                _loc4_ += _loc6_;
            }
            _loc3_++;
        }
        return _loc4_;
    }

    private renderCells(param1: any[], param2: number, param3: boolean, param4: IVector3d, param5: number = 0, param6: number = 0): number {
        let _loc8_: number = 0;
        if (param1 == null || param1.length == 0 || this._SafeStr_2156 == null) {
            return param2;
        }
        let _loc9_: PlaneMaterialCell = null;
        let _loc7_: BitmapData = null;
        _loc8_ = 0;
        while (_loc8_ < param1.length) {
            if (param3) {
                _loc9_ = asInstanceOf(param1[_loc8_], PlaneMaterialCell);
            } else {
                _loc9_ = asInstanceOf(param1[param1.length - 1 - _loc8_], PlaneMaterialCell);
            }
            if (_loc9_ != null) {
                _loc7_ = _loc9_.render(param4, param5, param6);
                if (_loc7_ != null) {
                    if (!param3) {
                        param2 -= _loc7_.height;
                    }
                    this._SafeStr_2156.copyPixels(_loc7_, _loc7_.rect, new Point(0, param2), _loc7_, null, true);
                    if (param3) {
                        param2 += _loc7_.height;
                    }
                    if (param3 && param2 >= this._SafeStr_2156.height || !param3 && param2 <= 0) {
                        return param2;
                    }
                }
            }
            _loc8_++;
        }
        return param2;
    }

    private renderRepeatNone(param1: IVector3d): void {
        if (this._cells.length == 0 || this._SafeStr_2156 == null) {
            return;
        }
        this.renderCells(this._cells, 0, true, param1);
    }

    private renderRepeatAll(param1: IVector3d, param2: number, param3: number): void {
        if (this._cells.length == 0 || this._SafeStr_2156 == null) {
            return;
        }
        let _loc5_: number = this.getCellsHeight(this._cells, param1);
        let _loc4_: number = 0;
        if (_loc5_ > this._SafeStr_2156.height) {
        }
        while (_loc4_ < this._SafeStr_2156.height) {
            _loc4_ = this.renderCells(this._cells, _loc4_, true, param1, param2, param3);
            if (_loc4_ == 0) {
                return;
            }
        }
    }

    private renderRepeatBorders(param1: IVector3d): void {
        if (this._cells.length == 0 || this._SafeStr_2156 == null) {
            return;
        }
        let _loc8_: PlaneMaterialCell = null;
        let _loc5_: BitmapData = null;
        let _loc3_: any[] = [];
        let _loc2_: number = 0;
        let _loc9_: number = 0;
        let _loc6_: number = 0;
        _loc6_ = 1;
        while (_loc6_ < this._cells.length - 1) {
            _loc8_ = asInstanceOf(this._cells[_loc6_], PlaneMaterialCell);
            if (_loc8_ != null) {
                _loc9_ = _loc8_.getHeight(param1);
                if (_loc9_ > 0) {
                    _loc2_ += _loc9_;
                    _loc3_.push(_loc8_);
                }
            }
            _loc6_++;
        }
        if (this._cells.length == 1) {
            _loc8_ = asInstanceOf(this._cells[0], PlaneMaterialCell);
            if (_loc8_ != null) {
                _loc9_ = _loc8_.getHeight(param1);
                if (_loc9_ > 0) {
                    _loc2_ += _loc9_;
                    _loc3_.push(_loc8_);
                }
            }
        }
        let _loc4_: any = this._SafeStr_2156.height - _loc2_ >> 1;
        let _loc7_: number = this.renderCells(_loc3_, _loc4_ | 0, true, param1);
        _loc8_ = asInstanceOf(this._cells[0], PlaneMaterialCell);
        if (_loc8_ != null) {
            _loc3_ = [_loc8_];
            while (_loc4_ >= 0) {
                _loc4_ = this.renderCells(_loc3_, _loc4_ | 0, false, param1);
            }
        }
        _loc8_ = asInstanceOf(this._cells[this._cells.length - 1], PlaneMaterialCell);
        if (_loc8_ != null) {
            _loc3_ = [_loc8_];
            while (_loc7_ < this._SafeStr_2156.height) {
                _loc7_ = this.renderCells(_loc3_, _loc7_, true, param1);
            }
        }
    }

    private renderRepeatCenter(param1: IVector3d): void {
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: number = 0;
        let _loc8_: any[] = null;
        if (this._cells.length == 0 || this._SafeStr_2156 == null) {
            return;
        }
        let _loc5_: PlaneMaterialCell = null;
        let _loc9_: BitmapData = null;
        let _loc11_: any[] = [];
        let _loc14_: any[] = [];
        let _loc10_: number = 0;
        let _loc12_: number = 0;
        let _loc16_: number = 0;
        let _loc4_: number = 0;
        _loc4_ = 0;
        while (_loc4_ < this._cells.length >> 1) {
            _loc5_ = asInstanceOf(this._cells[_loc4_], PlaneMaterialCell);
            if (_loc5_ != null) {
                _loc16_ = _loc5_.getHeight(param1);
                if (_loc16_ > 0) {
                    _loc10_ += _loc16_;
                    _loc11_.push(_loc5_);
                }
            }
            _loc4_++;
        }
        _loc4_ = (this._cells.length >> 1) + 1;
        while (_loc4_ < this._cells.length) {
            _loc5_ = asInstanceOf(this._cells[_loc4_], PlaneMaterialCell);
            if (_loc5_ != null) {
                _loc16_ = _loc5_.getHeight(param1);
                if (_loc16_ > 0) {
                    _loc12_ += _loc16_;
                    _loc14_.push(_loc5_);
                }
            }
            _loc4_++;
        }
        let _loc13_: number = 0;
        let _loc2_: number = 0;
        let _loc15_: number = this._SafeStr_2156.height;
        if (_loc10_ + _loc12_ > this._SafeStr_2156.height) {
            _loc13_ = _loc10_ + _loc12_ - this._SafeStr_2156.height;
            _loc2_ -= _loc13_ >> 1;
            _loc15_ += _loc13_ - (_loc13_ >> 1);
        }
        if (_loc13_ == 0) {
            _loc5_ = asInstanceOf(this._cells[this._cells.length >> 1], PlaneMaterialCell);
            if (_loc5_ != null) {
                _loc16_ = _loc5_.getHeight(param1);
                if (_loc16_ > 0) {
                    _loc7_ = this._SafeStr_2156.height - (_loc10_ + _loc12_);
                    _loc6_ = Math.ceil(_loc7_ / _loc16_) * _loc16_ | 0;
                    _loc2_ = _loc10_ - (_loc6_ - _loc7_ >> 1);
                    _loc3_ = _loc2_ + _loc6_;
                    _loc8_ = [_loc5_];
                    while (_loc2_ < _loc3_) {
                        _loc2_ = this.renderCells(_loc8_, _loc2_, true, param1);
                    }
                }
            }
        }
        _loc2_ = 0;
        this.renderCells(_loc11_, _loc2_, true, param1);
        this.renderCells(_loc14_, _loc15_, false, param1);
    }

    private renderRepeatFirst(param1: IVector3d): void {
        let _loc2_: any[] = null;
        if (this._cells.length == 0 || this._SafeStr_2156 == null) {
            return;
        }
        let _loc4_: PlaneMaterialCell = null;
        let _loc3_: number = this._SafeStr_2156.height;
        _loc3_ = this.renderCells(this._cells, _loc3_, false, param1);
        _loc4_ = asInstanceOf(this._cells[0], PlaneMaterialCell);
        if (_loc4_ != null) {
            _loc2_ = [_loc4_];
            while (_loc3_ >= 0) {
                _loc3_ = this.renderCells(_loc2_, _loc3_, false, param1);
            }
        }
    }

    private renderRepeatLast(param1: IVector3d): void {
        let _loc2_: any[] = null;
        if (this._cells.length == 0 || this._SafeStr_2156 == null) {
            return;
        }
        let _loc4_: PlaneMaterialCell = null;
        let _loc3_: number = 0;
        _loc3_ = this.renderCells(this._cells, _loc3_, true, param1);
        _loc4_ = asInstanceOf(this._cells[this._cells.length - 1], PlaneMaterialCell);
        if (_loc4_ != null) {
            _loc2_ = [_loc4_];
            while (_loc3_ < this._SafeStr_2156.height) {
                _loc3_ = this.renderCells(_loc2_, _loc3_, true, param1);
            }
        }
    }
}
