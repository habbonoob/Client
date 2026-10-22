import { asGuarded, asInstanceOf, isNumber } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomFloorHole } from '@/com/sulake/habbo/room/object/RoomFloorHole';
import { RoomPlaneData } from '@/com/sulake/habbo/room/object/RoomPlaneData';
import { RoomWallData } from '@/com/sulake/habbo/room/object/RoomWallData';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class RoomPlaneParser {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomPlaneParser'); }

    private static readonly FLOOR_THICKNESS: number = 0.25;
    private static readonly WALL_THICKNESS: number = 0.25;
    private static readonly MAX_WALL_ADDITIONAL_HEIGHT: number = 20;
    public static readonly _SafeStr_7824: number = -110;
    public static readonly _SafeStr_7833: number = -100;
    private _SafeStr_2383: any[] = [];
    private _SafeStr_2706: any[] = [];
    private _width: number = 0;
    private _height: number = 0;
    private _minX: number = 0;
    private _maxX: number = 0;
    private _minY: number = 0;
    private _maxY: number = 0;
    private _planes: any[] = [];
    private _temporaryHighlightPlanes: any[] = [];
    private _SafeStr_4572: number = 0;
    private _wallThicknessMultiplier: number = 1;
    private _floorThicknessMultiplier: number = 1;
    private _SafeStr_3370: number = -1;
    private _floorHeight: number = 0;
    private _floorHoles: UtilsMap = null;
    private _SafeStr_2601: UtilsMap = null;
    private _SafeStr_2736: any[] = [];

    declare private _SafeStr_5690: number[][];

    constructor() {
        this._SafeStr_4572 = 3.6;
        this._wallThicknessMultiplier = 1;
        this._floorThicknessMultiplier = 1;
        this._floorHoles = new UtilsMap();
        this._SafeStr_2601 = new UtilsMap();
    }

    private static getFloorHeight(param1: any[]): number {
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: any[] = null;
        let _loc8_: number = param1.length | 0;
        let _loc3_: number = 0;
        if (_loc8_ == 0) {
            return 0;
        }
        let _loc7_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < _loc8_) {
            _loc2_ = asGuarded(param1[_loc5_], Array.isArray);
            _loc4_ = 0;
            while (_loc4_ < _loc2_.length) {
                _loc6_ = Number(_loc2_[_loc4_]) | 0;
                if (_loc6_ > _loc7_) {
                    _loc7_ = _loc6_;
                }
                _loc4_++;
            }
            _loc5_++;
        }
        return _loc7_;
    }

    private static findEntranceTile(param1: any[]): Point {
        if (param1 == null) {
            return null;
        }
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc2_: any[] = null;
        let _loc6_: number = param1.length | 0;
        if (_loc6_ == 0) {
            return null;
        }
        let _loc5_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < _loc6_) {
            _loc2_ = asGuarded(param1[_loc4_], Array.isArray);
            if (_loc2_ == null || _loc2_.length == 0) {
                return null;
            }
            _loc3_ = 0;
            while (_loc3_ < _loc2_.length) {
                if (Number(_loc2_[_loc3_]) >= 0) {
                    _loc5_.push(_loc3_);
                    break;
                }
                _loc3_++;
            }
            if (_loc5_.length < _loc4_ + 1) {
                _loc5_.push(_loc2_.length + 1);
            }
            _loc4_++;
        }
        _loc4_ = 1;
        while (_loc4_ < _loc5_.length - 1) {
            if ((_loc5_[_loc4_] | 0) <= (_loc5_[_loc4_ - 1] | 0) - 1 && (_loc5_[_loc4_] | 0) <= (_loc5_[_loc4_ + 1] | 0) - 1) {
                return new Point(_loc5_[_loc4_] | 0, _loc4_);
            }
            _loc4_++;
        }
        return null;
    }

    private static expandFloorTiles(param1: number[][]): number[][] {
        let _loc12_: number = 0;
        let _loc13_: number = 0;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc11_: number = 0;
        let _loc17_: number = 0;
        let _loc14_: number = 0;
        let _loc9_: number = 0;
        let _loc15_: number = 0;
        let _loc10_: number = 0;
        let _loc2_: number = 0;
        let _loc5_: number = param1.length;
        let _loc16_: number = param1[0].length;
        let _loc7_: number[][] = new Array<number[]>(_loc5_ * 4 >>> 0).fill(null);
        _loc13_ = 0;
        while (_loc13_ < _loc5_ * 4) {
            _loc7_[_loc13_] = new Array<number>(_loc16_ * 4 >>> 0).fill(0);
            _loc13_++;
        }
        let _loc8_: number = 0;
        _loc13_ = 0;
        while (_loc13_ < _loc5_) {
            _loc6_ = 0;
            _loc12_ = 0;
            while (_loc12_ < _loc16_) {
                _loc11_ = param1[_loc13_][_loc12_];
                if (_loc11_ < 0 || _loc11_ <= 255) {
                    _loc4_ = 0;
                    while (_loc4_ < 4) {
                        _loc3_ = 0;
                        while (_loc3_ < 4) {
                            _loc7_[_loc8_ + _loc4_][_loc6_ + _loc3_] = _loc11_ < 0 ? _loc11_ : _loc11_ * 4;
                            _loc3_++;
                        }
                        _loc4_++;
                    }
                } else {
                    _loc17_ = (_loc11_ & 0xFF) * 4;
                    _loc14_ = _loc17_ + (_loc11_ >> 11 & 1) * 3;
                    _loc9_ = _loc17_ + (_loc11_ >> 10 & 1) * 3;
                    _loc15_ = _loc17_ + (_loc11_ >> 9 & 1) * 3;
                    _loc10_ = _loc17_ + (_loc11_ >> 8 & 1) * 3;
                    _loc3_ = 0;
                    while (_loc3_ < 3) {
                        _loc2_ = _loc3_ + 1;
                        _loc7_[_loc8_][_loc6_ + _loc3_] = (_loc14_ * (3 - _loc3_) + _loc9_ * _loc3_) / 3 | 0;
                        _loc7_[_loc8_ + 3][_loc6_ + _loc2_] = (_loc15_ * (3 - _loc2_) + _loc10_ * _loc2_) / 3 | 0;
                        _loc7_[_loc8_ + _loc2_][_loc6_] = (_loc14_ * (3 - _loc2_) + _loc15_ * _loc2_) / 3 | 0;
                        _loc7_[_loc8_ + _loc3_][_loc6_ + 3] = (_loc9_ * (3 - _loc3_) + _loc10_ * _loc3_) / 3 | 0;
                        _loc3_++;
                    }
                    _loc7_[_loc8_ + 1][_loc6_ + 1] = _loc14_ > _loc17_ ? _loc17_ + 2 : _loc17_ + 1;
                    _loc7_[_loc8_ + 1][_loc6_ + 2] = _loc9_ > _loc17_ ? _loc17_ + 2 : _loc17_ + 1;
                    _loc7_[_loc8_ + 2][_loc6_ + 1] = _loc15_ > _loc17_ ? _loc17_ + 2 : _loc17_ + 1;
                    _loc7_[_loc8_ + 2][_loc6_ + 2] = _loc10_ > _loc17_ ? _loc17_ + 2 : _loc17_ + 1;
                }
                _loc6_ += 4;
                _loc12_++;
            }
            _loc8_ += 4;
            _loc13_++;
        }
        return _loc7_;
    }

    private static addTileTypes(param1: number[][]): void {
        let _loc14_: number = 0;
        let _loc15_: number = 0;
        let _loc17_: number = 0;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        let _loc11_: number = 0;
        let _loc12_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc13_: number = 0;
        let _loc10_: number = param1.length - 1 >>> 0;
        let _loc16_: number = param1[0].length - 1 >>> 0;
        _loc15_ = 1;
        while (_loc15_ < _loc10_) {
            _loc14_ = 1;
            while (_loc14_ < _loc16_) {
                _loc17_ = param1[_loc15_][_loc14_];
                if (_loc17_ >= 0) {
                    _loc4_ = param1[_loc15_ - 1][_loc14_ - 1] & 0xFF;
                    _loc5_ = param1[_loc15_ - 1][_loc14_] & 0xFF;
                    _loc6_ = param1[_loc15_ - 1][_loc14_ + 1] & 0xFF;
                    _loc7_ = param1[_loc15_][_loc14_ - 1] & 0xFF;
                    _loc8_ = param1[_loc15_][_loc14_ + 1] & 0xFF;
                    _loc9_ = param1[_loc15_ + 1][_loc14_ - 1] & 0xFF;
                    _loc11_ = param1[_loc15_ + 1][_loc14_] & 0xFF;
                    _loc12_ = param1[_loc15_ + 1][_loc14_ + 1] & 0xFF;
                    _loc3_ = _loc17_ + 1;
                    _loc2_ = _loc17_ - 1;
                    _loc13_ = (_loc4_ == _loc3_ || _loc5_ == _loc3_ || _loc7_ == _loc3_ ? 8 : 0) | (_loc6_ == _loc3_ || _loc5_ == _loc3_ || _loc8_ == _loc3_ ? 4 : 0) | (_loc9_ == _loc3_ || _loc11_ == _loc3_ || _loc7_ == _loc3_ ? 2 : 0) | (_loc12_ == _loc3_ || _loc11_ == _loc3_ || _loc8_ == _loc3_ ? 1 : 0);
                    if (_loc13_ == 15) {
                        _loc13_ = 0;
                    }
                    param1[_loc15_][_loc14_] = _loc17_ | _loc13_ << 8;
                }
                _loc14_++;
            }
            _loc15_++;
        }
    }

    private static unpadHeightMap(param1: number[][]): void {
        param1.shift();
        param1.pop();
        for (const _loc2_ of param1 ?? []) {
            _loc2_.shift();
            _loc2_.pop();
        }
    }

    private static padHeightMap(param1: number[][]): void {
        let _loc2_: number[] = new Array<number>(0).fill(0);
        let _loc3_: number[] = new Array<number>(0).fill(0);
        for (const _loc5_ of param1 ?? []) {
            _loc5_.push(-110);
            _loc5_.unshift(-110);
        }
        for (const _loc4_ of param1[0] ?? []) {
            _loc2_.push(-110);
            _loc3_.push(-110);
        }
        param1.push(_loc3_);
        param1.unshift(_loc2_);
    }

    public get minX(): number {
        return this._minX;
    }

    public get maxX(): number {
        return this._maxX;
    }

    public get minY(): number {
        return this._minY;
    }

    public get maxY(): number {
        return this._maxY;
    }

    public get tileMapWidth(): number {
        return this._width;
    }

    public get tileMapHeight(): number {
        return this._height;
    }

    public get planeCount(): number {
        return this._planes.length | 0;
    }

    public get floorHeight(): number {
        if (this._SafeStr_3370 != -1) {
            return this._SafeStr_3370;
        }
        return this._floorHeight;
    }

    public get wallHeight(): number {
        if (this._SafeStr_3370 != -1) {
            return this._SafeStr_3370 + 3.6;
        }
        return this._SafeStr_4572;
    }

    public set wallHeight(param1: number) {
        if (param1 < 0) {
            param1 = 0;
        }
        this._SafeStr_4572 = param1;
    }

    public get wallThicknessMultiplier(): number {
        return this._wallThicknessMultiplier;
    }

    public set wallThicknessMultiplier(param1: number) {
        if (param1 < 0) {
            param1 = 0;
        }
        this._wallThicknessMultiplier = param1;
    }

    public get floorThicknessMultiplier(): number {
        return this._floorThicknessMultiplier;
    }

    public set floorThicknessMultiplier(param1: number) {
        if (param1 < 0) {
            param1 = 0;
        }
        this._floorThicknessMultiplier = param1;
    }

    public dispose(): void {
        this._planes = null;
        this._SafeStr_2383 = null;
        this._SafeStr_2706 = null;
        this._SafeStr_2736 = null;
        if (this._floorHoles != null) {
            this._floorHoles.dispose();
            this._floorHoles = null;
        }
        if (this._SafeStr_2601 != null) {
            this._SafeStr_2601.dispose();
            this._SafeStr_2601 = null;
        }
    }

    public reset(): void {
        this._planes = [];
        this._SafeStr_2383 = [];
        this._SafeStr_2706 = [];
        this._SafeStr_2383 = [];
        this._SafeStr_2706 = [];
        this._width = 0;
        this._height = 0;
        this._minX = 0;
        this._maxX = 0;
        this._minY = 0;
        this._maxY = 0;
        this._floorHeight = 0;
        this._SafeStr_2736 = [];
    }

    public initializeTileMap(param1: number, param2: number): boolean {
        let _loc4_: number = 0;
        let _loc7_: any[] = null;
        let _loc3_: any[] = null;
        let _loc5_: any[] = null;
        let _loc6_: number = 0;
        if (param1 < 0) {
            param1 = 0;
        }
        if (param2 < 0) {
            param2 = 0;
        }
        this._SafeStr_2383 = [];
        this._SafeStr_2706 = [];
        this._SafeStr_2736 = [];
        _loc4_ = 0;
        while (_loc4_ < param2) {
            _loc7_ = [];
            _loc3_ = [];
            _loc5_ = [];
            _loc6_ = 0;
            while (_loc6_ < param1) {
                _loc7_[_loc6_] = -110;
                _loc3_[_loc6_] = -110;
                _loc5_[_loc6_] = false;
                _loc6_++;
            }
            this._SafeStr_2383.push(_loc7_);
            this._SafeStr_2706.push(_loc3_);
            this._SafeStr_2736.push(_loc5_);
            _loc4_++;
        }
        this._width = param1;
        this._height = param2;
        this._minX = this._width;
        this._maxX = -1;
        this._minY = this._height;
        this._maxY = -1;
        return true;
    }

    public setTileHeight(param1: number, param2: number, param3: number): boolean {
        let _loc8_: any[] = null;
        let _loc5_: boolean = false;
        let _loc7_: number = 0;
        let _loc4_: boolean = false;
        let _loc6_: number = 0;
        if (param1 >= 0 && param1 < this._width && param2 >= 0 && param2 < this._height) {
            _loc8_ = asGuarded(this._SafeStr_2383[param2], Array.isArray);
            _loc8_[param1] = param3;
            if (param3 >= 0) {
                if (param1 < this._minX) {
                    this._minX = param1;
                }
                if (param1 > this._maxX) {
                    this._maxX = param1;
                }
                if (param2 < this._minY) {
                    this._minY = param2;
                }
                if (param2 > this._maxY) {
                    this._maxY = param2;
                }
            } else {
                if (param1 == this._minX || param1 == this._maxX) {
                    _loc5_ = false;
                    _loc7_ = this._minY;
                    while (_loc7_ < this._maxY) {
                        if (this.getTileHeightInternal(param1, _loc7_) >= 0) {
                            _loc5_ = true;
                            break;
                        }
                        _loc7_++;
                    }
                    if (!_loc5_) {
                        if (param1 == this._minX) {
                            this._minX = this._minX + 1;
                        }
                        if (param1 == this._maxX) {
                            this._maxX = this._maxX - 1;
                        }
                    }
                }
                if (param2 == this._minY || param2 == this._maxY) {
                    _loc4_ = false;
                    _loc6_ = this._minX;
                    while (_loc6_ < this._maxX) {
                        if (this.getTileHeight(_loc6_, param2) >= 0) {
                            _loc4_ = true;
                            break;
                        }
                        _loc6_++;
                    }
                    if (!_loc4_) {
                        if (param2 == this._minY) {
                            this._minY = this._minY + 1;
                        }
                        if (param2 == this._maxY) {
                            this._maxY = this._maxY - 1;
                        }
                    }
                }
            }
            return true;
        }
        return false;
    }

    public getTileHeight(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return -110;
        }
        let _loc3_: any[] = asGuarded(this._SafeStr_2383[param2], Array.isArray);
        return Math.abs(asGuarded(_loc3_[param1], isNumber));
    }

    private getTileHeightOriginal(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return -110;
        }
        if (this._SafeStr_2736[param2][param1]) {
            return -100;
        }
        let _loc3_: any[] = asGuarded(this._SafeStr_2706[param2], Array.isArray);
        return asGuarded(_loc3_[param1], isNumber);
    }

    private getTileHeightInternal(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return -110;
        }
        let _loc3_: any[] = asGuarded(this._SafeStr_2383[param2], Array.isArray);
        return asGuarded(_loc3_[param1], isNumber);
    }

    public initializeFromTileData(param1: number = -1): boolean {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        this._SafeStr_3370 = param1;
        _loc3_ = 0;
        while (_loc3_ < this._height) {
            _loc2_ = 0;
            while (_loc2_ < this._width) {
                this._SafeStr_2706[_loc3_][_loc2_] = this._SafeStr_2383[_loc3_][_loc2_];
                _loc2_++;
            }
            _loc3_++;
        }
        let _loc4_: Point = RoomPlaneParser.findEntranceTile(this._SafeStr_2383);
        _loc3_ = 0;
        while (_loc3_ < this._height) {
            _loc2_ = 0;
            while (_loc2_ < this._width) {
                if (this._SafeStr_2736[_loc3_][_loc2_]) {
                    this.setTileHeight(_loc2_, _loc3_, -100);
                }
                _loc2_++;
            }
            _loc3_++;
        }
        return this.initialize(_loc4_);
    }

    private initialize(param1: Point): boolean {
        let _loc4_: number = 0;
        if (param1 != null) {
            _loc4_ = this.getTileHeight(param1.x | 0, param1.y | 0) | 0;
            this.setTileHeight(param1.x | 0, param1.y | 0, -110);
        }
        this._floorHeight = RoomPlaneParser.getFloorHeight(this._SafeStr_2383);
        this.createWallPlanes();
        let _loc2_: number[][] = new Array<number[]>(0).fill(null);
        for (const _loc3_ of this._SafeStr_2383 ?? []) {
            _loc2_.push(Array.from(_loc3_));
        }
        RoomPlaneParser.padHeightMap(_loc2_);
        RoomPlaneParser.addTileTypes(_loc2_);
        RoomPlaneParser.unpadHeightMap(_loc2_);
        this._SafeStr_5690 = RoomPlaneParser.expandFloorTiles(_loc2_);
        this.extractPlanes(this._SafeStr_5690);
        if (param1 != null) {
            this.setTileHeight(param1.x | 0, param1.y | 0, _loc4_);
            this.addFloor(new Vector3d(param1.x + 0.5, param1.y + 0.5, _loc4_), new Vector3d(-1, 0, 0), new Vector3d(0, -1, 0), false, false, false, false);
        }
        return true;
    }

    public initializeHighlightArea(param1: number, param2: number, param3: number, param4: number): void {
        this.clearHighlightArea();
        this.extractPlanes(this._SafeStr_5690, param1 * 4, param2 * 4, param3 * 4, param4 * 4, true);
    }

    public clearHighlightArea(): number {
        let _loc1_: number = this._temporaryHighlightPlanes.length | 0;
        this._planes = this._planes.slice(0, this._planes.length - this._temporaryHighlightPlanes.length);
        this._temporaryHighlightPlanes.length = 0;
        return _loc1_;
    }

    private generateWallData(param1: Point, param2: boolean): RoomWallData {
        let _loc3_: boolean = false;
        let _loc9_: boolean = false;
        let _loc12_: number = 0;
        let _loc11_: Point = null;
        let _loc8_: number = 0;
        let _loc4_: RoomWallData = new RoomWallData();
        let _loc5_: any[] = [this.extractTopWall, this.extractRightWall, this.extractBottomWall, this.extractLeftWall];
        let _loc6_: number = 0;
        let _loc10_: Point = new Point(param1.x, param1.y);
        let _loc7_: number = 0;
        while (_loc7_++ < 1000) {
            _loc3_ = false;
            _loc9_ = false;
            _loc12_ = _loc6_;
            if (_loc10_.x < this.minX || _loc10_.x > this.maxX || _loc10_.y < this.minY || _loc10_.y > this.maxY) {
                _loc3_ = true;
            }
            _loc11_ = _loc5_[_loc6_](_loc10_, param2);
            if (_loc11_ == null) {
                return null;
            }
            _loc8_ = Math.abs(_loc11_.x - _loc10_.x) + Math.abs(_loc11_.y - _loc10_.y) | 0;
            if (_loc10_.x == _loc11_.x || _loc10_.y == _loc11_.y) {
                _loc6_ = (_loc6_ - 1 + _loc5_.length) % _loc5_.length;
                _loc8_ += 1;
                _loc9_ = true;
            } else {
                _loc6_ = (_loc6_ + 1) % _loc5_.length;
                _loc8_ -= 1;
            }
            _loc4_.addWall(_loc10_, _loc12_, _loc8_, _loc3_, _loc9_);
            if (_loc11_.x == param1.x && _loc11_.y == param1.y && (_loc11_.x != _loc10_.x || _loc11_.y != _loc10_.y)) {
                break;
            }
            _loc10_ = _loc11_;
        }
        if (_loc4_.count == 0) {
            return null;
        }
        return _loc4_;
    }

    private hidePeninsulaWallChains(param1: RoomWallData): void {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc8_: number = 0;
        let _loc6_: boolean = false;
        let _loc7_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: number = param1.count;
        while (_loc5_ < _loc4_) {
            _loc2_ = _loc5_;
            _loc3_ = _loc5_;
            _loc8_ = 0;
            _loc6_ = false;
            while (!param1.getBorder(_loc5_) && _loc5_ < _loc4_) {
                if (param1.getLeftTurn(_loc5_)) {
                    _loc8_++;
                } else if (_loc8_ > 0) {
                    _loc8_--;
                }
                if (_loc8_ > 1) {
                    _loc6_ = true;
                }
                _loc3_ = _loc5_;
                _loc5_++;
            }
            if (_loc6_) {
                _loc7_ = _loc2_;
                while (_loc7_ <= _loc3_) {
                    param1.setHideWall(_loc7_, true);
                    _loc7_++;
                }
            }
            _loc5_++;
        }
    }

    private updateWallsNextToHoles(param1: RoomWallData): void {
        let _loc8_: number = 0;
        let _loc4_: Point = null;
        let _loc10_: number = 0;
        let _loc7_: number = 0;
        let _loc5_: IVector3d = null;
        let _loc3_: IVector3d = null;
        let _loc2_: number = 0;
        let _loc9_: number = 0;
        let _loc6_: number = param1.count;
        _loc8_ = 0;
        while (_loc8_ < _loc6_) {
            if (!param1.getHideWall(_loc8_)) {
                _loc4_ = param1.getCorner(_loc8_);
                _loc10_ = param1.getDirection(_loc8_);
                _loc7_ = param1.getLength(_loc8_);
                _loc5_ = RoomWallData.WALL_DIRECTION_VECTORS[_loc10_];
                _loc3_ = RoomWallData.WALL_NORMAL_VECTORS[_loc10_];
                _loc2_ = 0;
                _loc9_ = 0;
                while (_loc9_ < _loc7_) {
                    if (this.getTileHeightInternal(_loc4_.x + _loc9_ * _loc5_.x - _loc3_.x | 0, _loc4_.y + _loc9_ * _loc5_.y - _loc3_.y | 0) == -100) {
                        if (_loc9_ > 0 && _loc2_ == 0) {
                            param1.setLength(_loc8_, _loc9_);
                            break;
                        }
                        _loc2_++;
                    } else if (_loc2_ > 0) {
                        param1.moveCorner(_loc8_, _loc2_);
                        break;
                    }
                    _loc9_++;
                }
                if (_loc2_ == _loc7_) {
                    param1.setHideWall(_loc8_, true);
                }
            }
            _loc8_++;
        }
    }

    private resolveOriginalWallIndex(param1: Point, param2: Point, param3: RoomWallData): number {
        let _loc7_: number = 0;
        let _loc14_: Point = null;
        let _loc10_: Point = null;
        let _loc11_: number = 0;
        let _loc8_: number = 0;
        let _loc15_: number = 0;
        let _loc9_: number = 0;
        let _loc12_: number = Math.min(param1.y, param2.y) | 0;
        let _loc4_: number = Math.max(param1.y, param2.y) | 0;
        let _loc13_: number = Math.min(param1.x, param2.x) | 0;
        let _loc5_: number = Math.max(param1.x, param2.x) | 0;
        let _loc6_: number = param3.count;
        _loc7_ = 0;
        while (_loc7_ < _loc6_) {
            _loc14_ = param3.getCorner(_loc7_);
            _loc10_ = param3.getEndPoint(_loc7_);
            if (param1.x == param2.x) {
                if (_loc14_.x == param1.x && _loc10_.x == param1.x) {
                    _loc11_ = Math.min(_loc14_.y, _loc10_.y) | 0;
                    _loc8_ = Math.max(_loc14_.y, _loc10_.y) | 0;
                    if (_loc11_ <= _loc12_ && _loc4_ <= _loc8_) {
                        return _loc7_;
                    }
                }
            } else if (param1.y == param2.y) {
                if (_loc14_.y == param1.y && _loc10_.y == param1.y) {
                    _loc15_ = Math.min(_loc14_.x, _loc10_.x) | 0;
                    _loc9_ = Math.max(_loc14_.x, _loc10_.x) | 0;
                    if (_loc15_ <= _loc13_ && _loc5_ <= _loc9_) {
                        return _loc7_;
                    }
                }
            }
            _loc7_++;
        }
        return -1;
    }

    private hideOriginallyHiddenWalls(param1: RoomWallData, param2: RoomWallData): void {
        let _loc8_: number = 0;
        let _loc6_: Point = null;
        let _loc3_: Point = null;
        let _loc4_: IVector3d = null;
        let _loc7_: number = 0;
        let _loc9_: number = 0;
        let _loc5_: number = param1.count;
        _loc8_ = 0;
        while (_loc8_ < _loc5_) {
            if (!param1.getHideWall(_loc8_)) {
                _loc6_ = param1.getCorner(_loc8_);
                _loc3_ = new Point(_loc6_.x, _loc6_.y);
                _loc4_ = RoomWallData.WALL_DIRECTION_VECTORS[param1.getDirection(_loc8_)];
                _loc7_ = param1.getLength(_loc8_);
                _loc3_.x += _loc4_.x * _loc7_;
                _loc3_.y += _loc4_.y * _loc7_;
                _loc9_ = this.resolveOriginalWallIndex(_loc6_, _loc3_, param2);
                if (_loc9_ >= 0) {
                    if (param2.getHideWall(_loc9_)) {
                        param1.setHideWall(_loc8_, true);
                    }
                } else {
                    param1.setHideWall(_loc8_, true);
                }
            }
            _loc8_++;
        }
    }

    private checkWallHiding(param1: RoomWallData, param2: RoomWallData): void {
        this.hidePeninsulaWallChains(param2);
        this.updateWallsNextToHoles(param1);
        this.hideOriginallyHiddenWalls(param1, param2);
    }

    private addWalls(param1: RoomWallData, param2: RoomWallData): void {
        let _loc25_: number = 0;
        let _loc14_: number = 0;
        let _loc17_: number = 0;
        let _loc10_: Point = null;
        let _loc13_: number = 0;
        let _loc16_: number = 0;
        let _loc11_: IVector3d = null;
        let _loc6_: IVector3d = null;
        let _loc20_: number = NaN;
        let _loc18_: number = 0;
        let _loc27_: number = NaN;
        let _loc24_: number = NaN;
        let _loc3_: Vector3d = null;
        let _loc4_: number = NaN;
        let _loc9_: Vector3d = null;
        let _loc19_: Vector3d = null;
        let _loc12_: number = 0;
        let _loc8_: Vector3d = null;
        let _loc21_: boolean = false;
        let _loc7_: boolean = false;
        let _loc26_: boolean = false;
        let _loc5_: boolean = false;
        let _loc22_: boolean = false;
        let _loc15_: number = param1.count;
        let _loc23_: number = param2.count;
        _loc17_ = 0;
        while (_loc17_ < _loc15_) {
            if (!param1.getHideWall(_loc17_)) {
                _loc10_ = param1.getCorner(_loc17_);
                _loc13_ = param1.getDirection(_loc17_);
                _loc16_ = param1.getLength(_loc17_);
                _loc11_ = RoomWallData.WALL_DIRECTION_VECTORS[_loc13_];
                _loc6_ = RoomWallData.WALL_NORMAL_VECTORS[_loc13_];
                _loc20_ = -1;
                _loc18_ = 0;
                while (_loc18_ < _loc16_) {
                    _loc27_ = this.getTileHeightInternal(_loc10_.x + _loc18_ * _loc11_.x + _loc6_.x | 0, _loc10_.y + _loc18_ * _loc11_.y + _loc6_.y | 0);
                    if (_loc27_ >= 0 && (_loc27_ < _loc20_ || _loc20_ < 0)) {
                        _loc20_ = _loc27_;
                    }
                    _loc18_++;
                }
                _loc24_ = _loc20_;
                _loc3_ = new Vector3d(_loc10_.x, _loc10_.y, _loc24_);
                _loc3_ = Vector3d.sum(_loc3_, Vector3d.product(_loc6_, 0.5));
                _loc3_ = Vector3d.sum(_loc3_, Vector3d.product(_loc11_, -0.5));
                _loc4_ = this.wallHeight + Math.min(20, this.floorHeight) - _loc20_;
                _loc9_ = Vector3d.product(_loc11_, -_loc16_);
                _loc19_ = new Vector3d(0, 0, _loc4_);
                _loc3_ = Vector3d.dif(_loc3_, _loc9_);
                _loc12_ = this.resolveOriginalWallIndex(_loc10_, param1.getEndPoint(_loc17_), param2);
                if (_loc12_ >= 0) {
                    _loc25_ = param2.getDirection((_loc12_ + 1) % _loc23_);
                    _loc14_ = param2.getDirection((_loc12_ - 1 + _loc23_) % _loc23_);
                } else {
                    _loc25_ = param1.getDirection((_loc17_ + 1) % _loc15_);
                    _loc14_ = param1.getDirection((_loc17_ - 1 + _loc15_) % _loc15_);
                }
                _loc8_ = null;
                if ((_loc25_ - _loc13_ + 4) % 4 == 3) {
                    _loc8_ = RoomWallData.WALL_NORMAL_VECTORS[_loc25_];
                } else if ((_loc13_ - _loc14_ + 4) % 4 == 3) {
                    _loc8_ = RoomWallData.WALL_NORMAL_VECTORS[_loc14_];
                }
                _loc21_ = param1.getLeftTurn(_loc17_);
                _loc7_ = param1.getLeftTurn((_loc17_ - 1 + _loc15_) % _loc15_);
                _loc26_ = param1.getHideWall((_loc17_ + 1) % _loc15_);
                _loc5_ = param1.getManuallyLeftCut(_loc17_);
                _loc22_ = param1.getManuallyRightCut(_loc17_);
                this.addWall(_loc3_, _loc9_, _loc19_, _loc8_, !_loc7_ || _loc5_, !_loc21_ || _loc22_, !_loc26_);
            }
            _loc17_++;
        }
    }

    private createWallPlanes(): boolean {
        let _loc3_: number = 0;
        let _loc11_: number = 0;
        let _loc6_: any[] = this._SafeStr_2383;
        if (_loc6_ == null) {
            return false;
        }
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc1_: any[] = null;
        let _loc14_: number = _loc6_.length | 0;
        let _loc8_: number = 0;
        if (_loc14_ == 0) {
            return false;
        }
        _loc4_ = 0;
        while (_loc4_ < _loc14_) {
            _loc1_ = asGuarded(_loc6_[_loc4_], Array.isArray);
            if (_loc1_ == null || _loc1_.length == 0) {
                return false;
            }
            if (_loc8_ > 0) {
                _loc8_ = Math.min(_loc8_, _loc1_.length) | 0;
            } else {
                _loc8_ = _loc1_.length | 0;
            }
            _loc4_++;
        }
        let _loc13_: number = Math.min(20, this._SafeStr_3370 != -1 ? this._SafeStr_3370 : RoomPlaneParser.getFloorHeight(_loc6_));
        let _loc9_: number = this.minX;
        let _loc10_: number = this.minY;
        _loc10_ = this.minY;
        while (_loc10_ <= this.maxY) {
            if (this.getTileHeightInternal(_loc9_, _loc10_) > -100) {
                _loc10_--;
                break;
            }
            _loc10_++;
        }
        if (_loc10_ > this.maxY) {
            return false;
        }
        let _loc2_: Point = new Point(_loc9_, _loc10_);
        let _loc7_: RoomWallData = this.generateWallData(_loc2_, true);
        let _loc12_: RoomWallData = this.generateWallData(_loc2_, false);
        if (_loc7_ != null) {
            _loc3_ = _loc7_.count;
            _loc11_ = _loc12_.count;
            this.checkWallHiding(_loc7_, _loc12_);
            this.addWalls(_loc7_, _loc12_);
        }
        _loc5_ = 0;
        while (_loc5_ < this.tileMapHeight) {
            _loc4_ = 0;
            while (_loc4_ < this.tileMapWidth) {
                if (this.getTileHeightInternal(_loc4_, _loc5_) < 0) {
                    this.setTileHeight(_loc4_, _loc5_, -(_loc13_ + this.wallHeight));
                }
                _loc4_++;
            }
            _loc5_++;
        }
        return true;
    }

    private extractTopWall = (param1: Point, param2: boolean): Point => {
        if (param1 == null) {
            return null;
        }
        let _loc3_: number = 1;
        let _loc4_: number = -100;
        if (!param2) {
            _loc4_ = -110;
        }
        while (_loc3_ < 1000) {
            if (this.getTileHeightInternal(param1.x + _loc3_ | 0, param1.y | 0) > _loc4_) {
                return new Point(param1.x + _loc3_ - 1, param1.y);
            }
            if (this.getTileHeightInternal(param1.x + _loc3_ | 0, param1.y + 1 | 0) <= _loc4_) {
                return new Point(param1.x + _loc3_, param1.y + 1);
            }
            _loc3_++;
        }
        return null;
    };

    private extractRightWall = (param1: Point, param2: boolean): Point => {
        if (param1 == null) {
            return null;
        }
        let _loc3_: number = 1;
        let _loc4_: number = -100;
        if (!param2) {
            _loc4_ = -110;
        }
        while (_loc3_ < 1000) {
            if (this.getTileHeightInternal(param1.x | 0, param1.y + _loc3_ | 0) > _loc4_) {
                return new Point(param1.x, param1.y + (_loc3_ - 1));
            }
            if (this.getTileHeightInternal(param1.x - 1 | 0, param1.y + _loc3_ | 0) <= _loc4_) {
                return new Point(param1.x - 1, param1.y + _loc3_);
            }
            _loc3_++;
        }
        return null;
    };

    private extractBottomWall = (param1: Point, param2: boolean): Point => {
        if (param1 == null) {
            return null;
        }
        let _loc3_: number = 1;
        let _loc4_: number = -100;
        if (!param2) {
            _loc4_ = -110;
        }
        while (_loc3_ < 1000) {
            if (this.getTileHeightInternal(param1.x - _loc3_ | 0, param1.y | 0) > _loc4_) {
                return new Point(param1.x - (_loc3_ - 1), param1.y);
            }
            if (this.getTileHeightInternal(param1.x - _loc3_ | 0, param1.y - 1 | 0) <= _loc4_) {
                return new Point(param1.x - _loc3_, param1.y - 1);
            }
            _loc3_++;
        }
        return null;
    };

    private extractLeftWall = (param1: Point, param2: boolean): Point => {
        if (param1 == null) {
            return null;
        }
        let _loc3_: number = 1;
        let _loc4_: number = -100;
        if (!param2) {
            _loc4_ = -110;
        }
        while (_loc3_ < 1000) {
            if (this.getTileHeightInternal(param1.x | 0, param1.y - _loc3_ | 0) > _loc4_) {
                return new Point(param1.x, param1.y - (_loc3_ - 1));
            }
            if (this.getTileHeightInternal(param1.x + 1 | 0, param1.y - _loc3_ | 0) <= _loc4_) {
                return new Point(param1.x + 1, param1.y - _loc3_);
            }
            _loc3_++;
        }
        return null;
    };

    private addWall(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: IVector3d, param5: boolean, param6: boolean, param7: boolean): void {
        let _loc12_: Vector3d = null;
        this.addPlane(2, param1, param2, param3, [param4]);
        this.addPlane(3, param1, param2, param3, [param4]);
        let _loc10_: number = 0.25 * this._wallThicknessMultiplier;
        let _loc8_: number = 0.25 * this._floorThicknessMultiplier;
        let _loc11_: Vector3d = Vector3d.crossProduct(param2, param3);
        let _loc9_: Vector3d = Vector3d.product(_loc11_, 1 / _loc11_.length * -_loc10_);
        this.addPlane(2, Vector3d.sum(param1, param3), param2, _loc9_, [_loc11_, param4]);
        if (param5) {
            this.addPlane(2, Vector3d.sum(Vector3d.sum(param1, param2), param3), Vector3d.product(param3, -(param3.length + _loc8_) / param3.length), _loc9_, [_loc11_, param4]);
        }
        if (param6) {
            this.addPlane(2, Vector3d.sum(param1, Vector3d.product(param3, -_loc8_ / param3.length)), Vector3d.product(param3, (param3.length + _loc8_) / param3.length), _loc9_, [_loc11_, param4]);
            if (param7) {
                _loc12_ = Vector3d.product(param2, _loc10_ / param2.length);
                this.addPlane(2, Vector3d.sum(Vector3d.sum(param1, param3), Vector3d.product(_loc12_, -1)), _loc12_, _loc9_, [_loc11_, param2, param4]);
            }
        }
    }

    private addFloor(param1: IVector3d, param2: IVector3d, param3: IVector3d, param4: boolean, param5: boolean, param6: boolean, param7: boolean, param8: boolean = false): void {
        let _loc11_: number = NaN;
        let _loc10_: Vector3d = null;
        let _loc9_: Vector3d = null;
        let _loc12_: RoomPlaneData = this.addPlane(1, param1, param2, param3, null, param8);
        if (_loc12_ != null) {
            _loc11_ = 0.25 * this._floorThicknessMultiplier;
            _loc10_ = new Vector3d(0, 0, _loc11_);
            _loc9_ = Vector3d.dif(param1, _loc10_);
            if (param6) {
                this.addPlane(1, _loc9_, param2, _loc10_, null, param8);
            }
            if (param7) {
                this.addPlane(1, Vector3d.sum(_loc9_, Vector3d.sum(param2, param3)), Vector3d.product(param2, -1), _loc10_, null, param8);
            }
            if (param4) {
                this.addPlane(1, Vector3d.sum(_loc9_, param3), Vector3d.product(param3, -1), _loc10_, null, param8);
            }
            if (param5) {
                this.addPlane(1, Vector3d.sum(_loc9_, param2), param3, _loc10_, null, param8);
            }
        }
    }

    public initializeFromXML(param1: XML): boolean {
        let _loc4_: number = 0;
        let _loc13_: XML = null;
        let _loc12_: XMLList = null;
        let _loc3_: number = 0;
        let _loc10_: XML = null;
        let _loc16_: number = NaN;
        let _loc6_: XML = null;
        let _loc8_: XMLList = null;
        let _loc5_: number = 0;
        let _loc7_: XML = null;
        if (param1 == null) {
            return false;
        }
        this.reset();
        this.resetFloorHoles();
        if (!XMLValidator.checkRequiredAttributes(param1.child("tileMap").item(0), ["width", "height", "wallHeight"])) {
            return false;
        }
        let _loc9_: number = parseInt(param1.child("tileMap").attribute("width").toString()) | 0;
        let _loc15_: number = parseInt(param1.child("tileMap").attribute("height").toString()) | 0;
        let _loc14_: number = parseFloat(param1.child("tileMap").attribute("wallHeight").toString());
        let _loc2_: number = parseInt(param1.child("tileMap").attribute("fixedWallsHeight").toString()) | 0;
        this.initializeTileMap(_loc9_, _loc15_);
        let _loc11_: XMLList = param1.child("tileMap").child("tileRow");
        _loc4_ = 0;
        while (_loc4_ < _loc11_.length()) {
            _loc13_ = _loc11_.item(_loc4_);
            _loc12_ = _loc13_.child("tile");
            _loc3_ = 0;
            while (_loc3_ < _loc12_.length()) {
                _loc10_ = _loc12_.item(_loc3_);
                _loc16_ = parseFloat(_loc10_.attribute("height").toString());
                this.setTileHeight(_loc3_, _loc4_, _loc16_);
                _loc3_++;
            }
            _loc4_++;
        }
        if (param1.child("holeMap").length() > 0) {
            _loc6_ = param1.child("holeMap").item(0);
            _loc8_ = _loc6_.child("hole");
            _loc5_ = 0;
            while (_loc5_ < _loc8_.length()) {
                _loc7_ = _loc8_.item(_loc5_);
                if (XMLValidator.checkRequiredAttributes(_loc7_, ["id", "x", "y", "width", "height", "invert"])) {
                    this.addFloorHole(Number(_loc7_.attribute("id")) | 0, Number(_loc7_.attribute("x")) | 0, Number(_loc7_.attribute("y")) | 0, Number(_loc7_.attribute("width")) | 0, Number(_loc7_.attribute("height")) | 0, _loc7_.attribute("invert")?.toString() == "true");
                }
                _loc5_++;
            }
            this.initializeHoleMap();
        }
        this.wallHeight = _loc14_;
        this.initializeFromTileData(_loc2_);
        return true;
    }

    private addPlane(param1: number, param2: IVector3d, param3: IVector3d, param4: IVector3d, param5: any[] = null, param6: boolean = false): RoomPlaneData {
        if (param3.length == 0 || param4.length == 0) {
            return null;
        }
        let _loc7_: RoomPlaneData = new RoomPlaneData(param1, param2, param3, param4, param5);
        this._planes.push(_loc7_);
        if (param6) {
            this._temporaryHighlightPlanes.push(_loc7_);
        }
        return _loc7_;
    }

    public isPlaneTemporaryHighlighter(param1: number): boolean {
        if (param1 < 0 || param1 >= this.planeCount) {
            return false;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ == null) {
            return false;
        }
        return this._temporaryHighlightPlanes.indexOf(_loc2_) != -1;
    }

    public getXML(): XML {
        let _loc5_: number = 0;
        let _loc1_: XML = null;
        let _loc12_: any[] = null;
        let _loc3_: number = 0;
        let _loc14_: number = NaN;
        let _loc4_: XML = null;
        let _loc8_: RoomFloorHole = null;
        let _loc13_: number = 0;
        let _loc2_: XML = null;
        let _loc7_: number = 0;
        let _loc9_: XML = new XML(`<tileMap width="${XML.escapeAttribute(this._width)}" height="${XML.escapeAttribute(this._height)}" wallHeight="${XML.escapeAttribute(this._SafeStr_4572)}" fixedWallsHeight="${XML.escapeAttribute(this._SafeStr_3370)}"/>`);
        _loc5_ = 0;
        while (_loc5_ < this._height) {
            _loc1_ = new XML(`<tileRow/>`);
            _loc12_ = this._SafeStr_2706[_loc5_];
            _loc3_ = 0;
            while (_loc3_ < this._width) {
                _loc14_ = Number(_loc12_[_loc3_]);
                _loc4_ = new XML(`<tile height="${XML.escapeAttribute(_loc14_)}"/>`);
                _loc1_.appendChild(_loc4_);
                _loc3_++;
            }
            _loc9_.appendChild(_loc1_);
            _loc5_++;
        }
        let _loc11_: XML = new XML(`<holeMap/>`);
        _loc7_ = 0;
        while (_loc7_ < this._floorHoles.length) {
            _loc8_ = this._floorHoles.getWithIndex(_loc7_);
            if (_loc8_ != null) {
                _loc13_ = this._floorHoles.getKey(_loc7_) | 0;
                _loc2_ = new XML(`<hole id="${XML.escapeAttribute(_loc13_)}" x="${XML.escapeAttribute(_loc8_.x)}" y="${XML.escapeAttribute(_loc8_.y)}" width="${XML.escapeAttribute(_loc8_.width)}" height="${XML.escapeAttribute(_loc8_.height)}" invert="${XML.escapeAttribute(false)}"/>`);
                _loc11_.appendChild(_loc2_);
            }
            _loc7_++;
        }
        _loc7_ = 0;
        while (_loc7_ < this._SafeStr_2601.length) {
            _loc8_ = this._SafeStr_2601.getWithIndex(_loc7_);
            if (_loc8_ != null) {
                _loc13_ = this._SafeStr_2601.getKey(_loc7_) | 0;
                _loc2_ = new XML(`<hole id="${XML.escapeAttribute(_loc13_)}" x="${XML.escapeAttribute(_loc8_.x)}" y="${XML.escapeAttribute(_loc8_.y)}" width="${XML.escapeAttribute(_loc8_.width)}" height="${XML.escapeAttribute(_loc8_.height)}" invert="${XML.escapeAttribute(true)}"/>`);
                _loc11_.appendChild(_loc2_);
            }
            _loc7_++;
        }
        let _loc10_: XML = new XML(`<roomData/>`);
        _loc10_.appendChild(_loc9_);
        _loc10_.appendChild(_loc11_);
        let _loc6_: XML = new XML(`<dimensions minX="${XML.escapeAttribute(this.minX)}" maxX="${XML.escapeAttribute(this.maxX)}" minY="${XML.escapeAttribute(this.minY)}" maxY="${XML.escapeAttribute(this.maxY)}" />`);
        _loc10_.appendChild(_loc6_);
        return _loc10_;
    }

    public getPlaneLocation(param1: number): IVector3d {
        if (param1 < 0 || param1 >= this.planeCount) {
            return null;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            return _loc2_.loc;
        }
        return null;
    }

    public getPlaneNormal(param1: number): IVector3d {
        if (param1 < 0 || param1 >= this.planeCount) {
            return null;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            return _loc2_.normal;
        }
        return null;
    }

    public getPlaneLeftSide(param1: number): IVector3d {
        if (param1 < 0 || param1 >= this.planeCount) {
            return null;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            return _loc2_.leftSide;
        }
        return null;
    }

    public getPlaneRightSide(param1: number): IVector3d {
        if (param1 < 0 || param1 >= this.planeCount) {
            return null;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            return _loc2_.rightSide;
        }
        return null;
    }

    public getPlaneNormalDirection(param1: number): IVector3d {
        if (param1 < 0 || param1 >= this.planeCount) {
            return null;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            return _loc2_.normalDirection;
        }
        return null;
    }

    public getPlaneSecondaryNormals(param1: number): any[] {
        let _loc3_: any[] = null;
        let _loc4_: number = 0;
        if (param1 < 0 || param1 >= this.planeCount) {
            return null;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            _loc3_ = [];
            _loc4_ = 0;
            while (_loc4_ < _loc2_.secondaryNormalCount) {
                _loc3_.push(_loc2_.getSecondaryNormal(_loc4_));
                _loc4_++;
            }
            return _loc3_;
        }
        return null;
    }

    public getPlaneType(param1: number): number {
        if (param1 < 0 || param1 >= this.planeCount) {
            return 0;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            return _loc2_.type;
        }
        return 0;
    }

    public getPlaneMaskCount(param1: number): number {
        if (param1 < 0 || param1 >= this.planeCount) {
            return 0;
        }
        let _loc2_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc2_ != null) {
            return _loc2_.maskCount;
        }
        return 0;
    }

    public getPlaneMaskLeftSideLoc(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this.planeCount) {
            return -1;
        }
        let _loc3_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc3_ != null) {
            return _loc3_.getMaskLeftSideLoc(param2);
        }
        return -1;
    }

    public getPlaneMaskRightSideLoc(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this.planeCount) {
            return -1;
        }
        let _loc3_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc3_ != null) {
            return _loc3_.getMaskRightSideLoc(param2);
        }
        return -1;
    }

    public getPlaneMaskLeftSideLength(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this.planeCount) {
            return -1;
        }
        let _loc3_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc3_ != null) {
            return _loc3_.getMaskLeftSideLength(param2);
        }
        return -1;
    }

    public getPlaneMaskRightSideLength(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this.planeCount) {
            return -1;
        }
        let _loc3_: RoomPlaneData = asInstanceOf(this._planes[param1], RoomPlaneData);
        if (_loc3_ != null) {
            return _loc3_.getMaskRightSideLength(param2);
        }
        return -1;
    }

    public addFloorHole(param1: number, param2: number, param3: number, param4: number, param5: number, param6: boolean = false): void {
        this.removeFloorHole(param1);
        let _loc7_: RoomFloorHole = new RoomFloorHole(param2, param3, param4, param5);
        if (param6) {
            this._SafeStr_2601.add(param1, _loc7_);
        } else {
            this._floorHoles.add(param1, _loc7_);
        }
    }

    public removeFloorHole(param1: number): void {
        this._floorHoles.remove(param1);
        this._SafeStr_2601.remove(param1);
    }

    public resetFloorHoles(): void {
        this._floorHoles.reset();
        this._SafeStr_2601.reset();
    }

    private initializeHoleMap(): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc6_: any[] = null;
        let _loc1_: RoomFloorHole = null;
        let _loc5_: number = 0;
        let _loc2_: boolean = this._SafeStr_2601.length > 0;
        _loc4_ = 0;
        while (_loc4_ < this._height) {
            _loc6_ = this._SafeStr_2736[_loc4_];
            _loc3_ = 0;
            while (_loc3_ < this._width) {
                _loc6_[_loc3_] = _loc2_;
                _loc3_++;
            }
            _loc4_++;
        }
        _loc5_ = 0;
        while (_loc5_ < this._SafeStr_2601.length) {
            _loc1_ = this._SafeStr_2601.getWithIndex(_loc5_);
            this.initializeHole(_loc1_, true);
            _loc5_++;
        }
        _loc5_ = 0;
        while (_loc5_ < this._floorHoles.length) {
            _loc1_ = this._floorHoles.getWithIndex(_loc5_);
            this.initializeHole(_loc1_);
            _loc5_++;
        }
    }

    private initializeHole(param1: RoomFloorHole, param2: boolean = false): void {
        let _loc4_: number = 0;
        let _loc8_: number = 0;
        let _loc3_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc9_: any[] = null;
        let _loc6_: number = 0;
        if (param1 != null) {
            _loc4_ = param1.x;
            _loc8_ = param1.x + param1.width - 1;
            _loc3_ = param1.y;
            _loc5_ = param1.y + param1.height - 1;
            _loc4_ = _loc4_ < 0 ? 0 : _loc4_;
            _loc8_ = _loc8_ >= this._width ? this._width - 1 : _loc8_;
            _loc3_ = _loc3_ < 0 ? 0 : _loc3_;
            _loc5_ = _loc5_ >= this._height ? this._height - 1 : _loc5_;
            _loc7_ = _loc3_;
            while (_loc7_ <= _loc5_) {
                _loc9_ = this._SafeStr_2736[_loc7_];
                _loc6_ = _loc4_;
                while (_loc6_ <= _loc8_) {
                    _loc9_[_loc6_] = !param2;
                    _loc6_++;
                }
                _loc7_++;
            }
        }
    }

    private extractPlanes(param1: number[][], param2: number = 0, param3: number = 0, param4: number = -1, param5: number = -1, param6: boolean = false): void {
        let _loc13_: number = 0;
        let _loc24_: number = 0;
        let _loc25_: number = 0;
        let _loc9_: number = 0;
        let _loc19_: any = 0;
        let _loc16_: number = 0;
        let _loc10_: boolean = false;
        let _loc8_: boolean = false;
        let _loc20_: boolean = false;
        let _loc12_: boolean = false;
        let _loc21_: any = 0;
        let _loc23_: any = 0;
        let _loc11_: boolean = false;
        let _loc15_: number = NaN;
        let _loc17_: number = NaN;
        let _loc18_: number = NaN;
        let _loc28_: number = NaN;
        let _loc14_: number = param1.length;
        let _loc26_: number = param1[0].length;
        let _loc27_: number = (param5 == -1 ? _loc14_ : Math.min(_loc14_, param3 + param5)) >>> 0;
        let _loc22_: number = (param4 == -1 ? _loc26_ : Math.min(_loc26_, param2 + param4)) >>> 0;
        let _loc7_: boolean[][] = new Array<boolean[]>(_loc27_).fill(null);
        _loc13_ = 0;
        while (_loc13_ < _loc27_) {
            _loc7_[_loc13_] = new Array<boolean>(_loc22_).fill(false);
            _loc13_++;
        }
        _loc24_ = param3;
        while (_loc24_ < _loc27_) {
            _loc25_ = param2;
            while (_loc25_ < _loc22_) {
                _loc9_ = param1[_loc24_][_loc25_];
                if (!(_loc9_ < 0 || _loc7_[_loc24_][_loc25_])) {
                    _loc10_ = _loc25_ == 0 || param1[_loc24_][_loc25_ - 1] != _loc9_;
                    _loc8_ = _loc24_ == 0 || param1[_loc24_ - 1][_loc25_] != _loc9_;
                    _loc19_ = _loc25_ + 1;
                    while (_loc19_ < _loc22_) {
                        if (param1[_loc24_][_loc19_] != _loc9_ || _loc7_[_loc24_][_loc19_] || _loc24_ > 0 && param1[_loc24_ - 1][_loc19_] == _loc9_ == _loc8_) {
                            break;
                        }
                        _loc19_++;
                    }
                    _loc20_ = _loc19_ == _loc26_ || param1[_loc24_][_loc19_] != _loc9_;
                    _loc11_ = false;
                    _loc16_ = _loc24_ + 1;
                    while (_loc16_ <= _loc27_ && !_loc11_) {
                        _loc12_ = _loc16_ == _loc14_ || param1[_loc16_][_loc25_] != _loc9_;
                        _loc11_ = _loc16_ == _loc27_ || _loc12_ || _loc25_ > 0 && param1[_loc16_][_loc25_ - 1] == _loc9_ == _loc10_ || _loc19_ < _loc26_ && param1[_loc16_][_loc19_] == _loc9_ == _loc20_;
                        if (_loc16_ == _loc14_) {
                            break;
                        }
                        _loc21_ = _loc25_;
                        while (_loc21_ < _loc19_) {
                            if (param1[_loc16_][_loc21_] == _loc9_ == _loc12_) {
                                _loc11_ = true;
                                _loc19_ = _loc21_;
                                break;
                            }
                            _loc21_++;
                        }
                        if (_loc11_) {
                            break;
                        }
                        _loc16_++;
                    }
                    if (!_loc12_) {
                        _loc12_ = _loc16_ == _loc14_;
                    }
                    _loc20_ = _loc19_ == _loc26_ || param1[_loc24_][_loc19_] != _loc9_;
                    _loc23_ = _loc24_;
                    while (_loc23_ < _loc16_) {
                        _loc21_ = _loc25_;
                        while (_loc21_ < _loc19_) {
                            _loc7_[_loc23_][_loc21_] = true;
                            _loc21_++;
                        }
                        _loc23_++;
                    }
                    _loc15_ = _loc25_ / 4 - 0.5;
                    _loc17_ = _loc24_ / 4 - 0.5;
                    _loc18_ = (_loc19_ - _loc25_) / 4;
                    _loc28_ = (_loc16_ - _loc24_) / 4;
                    this.addFloor(new Vector3d(_loc15_ + _loc18_, _loc17_ + _loc28_, _loc9_ / 4), new Vector3d(-_loc18_, 0, 0), new Vector3d(0, -_loc28_, 0), _loc20_, _loc10_, _loc12_, _loc8_, param6);
                }
                _loc25_++;
            }
            _loc24_++;
        }
    }
}
