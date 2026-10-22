import { asGuarded, isNumber, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class LegacyWallGeometry implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::LegacyWallGeometry'); }

    public static readonly _SafeStr_8073: string = "l";
    public static readonly DIRECTION_RIGHT: string = "r";
    private _disposed: boolean = false;
    private _scale: number = 64;
    private _heightMap: any[] = [];
    private _width: number = 0;
    private _height: number = 0;
    private _floorHeight: number = 0;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get scale(): number {
        return this._scale;
    }

    public set scale(param1: number) {
        this._scale = param1;
    }

    public dispose(): void {
        this.reset();
        this._disposed = true;
    }

    public initialize(param1: number, param2: number, param3: number): void {
        let _loc6_: number = 0;
        let _loc4_: any[] = null;
        let _loc5_: number = 0;
        if (param1 <= this._width && param2 <= this._height) {
            this._width = param1;
            this._height = param2;
            this._floorHeight = param3;
            return;
        }
        this.reset();
        _loc6_ = 0;
        while (_loc6_ < param2) {
            _loc4_ = [];
            this._heightMap.push(_loc4_);
            _loc5_ = 0;
            while (_loc5_ < param1) {
                _loc4_.push(0);
                _loc5_++;
            }
            _loc6_++;
        }
        this._width = param1;
        this._height = param2;
        this._floorHeight = param3;
    }

    private reset(): void {
        let _loc2_: number = 0;
        let _loc1_: any[] = null;
        if (this._heightMap != null) {
            _loc2_ = 0;
            while (_loc2_ < this._heightMap.length) {
                _loc1_ = asGuarded(this._heightMap[_loc2_], Array.isArray);
                _loc2_++;
            }
            this._heightMap = [];
        }
    }

    public setTileHeight(param1: number, param2: number, param3: number): boolean {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return false;
        }
        let _loc4_: any[] = asGuarded(this._heightMap[param2], Array.isArray);
        if (_loc4_ != null) {
            _loc4_[param1] = param3;
            return true;
        }
        return false;
    }

    public getTileHeight(param1: number, param2: number): number {
        if (param1 < 0 || param1 >= this._width || param2 < 0 || param2 >= this._height) {
            return 0;
        }
        let _loc3_: any[] = asGuarded(this._heightMap[param2], Array.isArray);
        if (_loc3_ != null) {
            return asGuarded(_loc3_[param1], isNumber);
        }
        return 0;
    }

    public getLocation(param1: number, param2: number, param3: number, param4: number, param5: string): IVector3d {
        let _loc7_: number = param1;
        let _loc8_: number = param2;
        let _loc9_: number = this.getTileHeight(param1, param2);
        if (param5 == "r") {
            _loc7_ += param3 / (this._scale / 2) - 0.5;
            _loc8_ += 0.5;
            _loc9_ -= (param4 - param3 / 2) / (this._scale / 2);
        } else {
            _loc8_ += (this._scale / 2 - param3) / (this._scale / 2) - 0.5;
            _loc7_ += 0.5;
            _loc9_ -= (param4 - (this._scale / 2 - param3) / 2) / (this._scale / 2);
        }
        return new Vector3d(_loc7_, _loc8_, _loc9_);
    }

    public getLocationOldFormat(param1: number, param2: number, param3: string): IVector3d {
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        _loc7_ = Math.ceil(param1) | 0;
        _loc5_ = _loc7_ - param1;
        let _loc8_: any = 0;
        let _loc9_: any = 0;
        let _loc12_: number = 0;
        let _loc11_: number = 0;
        let _loc13_: number = 0;
        _loc6_ = 0;
        while (_loc6_ < this._width) {
            if (_loc7_ >= 0 && _loc7_ < this._height) {
                if (this.getTileHeight(_loc6_, _loc7_) <= this._floorHeight) {
                    _loc8_ = _loc6_ - 1;
                    _loc9_ = _loc7_;
                    _loc4_ = _loc6_;
                    param3 = "l";
                    break;
                }
                if (this.getTileHeight(_loc6_, _loc7_ + 1) <= this._floorHeight) {
                    _loc8_ = _loc6_;
                    _loc9_ = _loc7_;
                    _loc4_ = _loc9_ - param1;
                    param3 = "r";
                    break;
                }
            }
            _loc7_++;
            _loc6_++;
        }
        _loc12_ = this.scale / 2 * _loc5_ | 0;
        let _loc10_: number = -_loc4_ * this.scale / 2;
        _loc10_ = _loc10_ + -param2 * 18 / 32 * this.scale / 2;
        _loc13_ = this.getTileHeight(_loc8_ | 0, _loc9_ | 0);
        _loc11_ = _loc13_ * this.scale / 2 + _loc10_ | 0;
        if (param3 == "r") {
            _loc11_ = _loc11_ + _loc5_ * this.scale / 4 | 0;
        } else {
            _loc11_ = _loc11_ + (1 - _loc5_) * this.scale / 4 | 0;
        }
        return this.getLocation(_loc8_ | 0, _loc9_ | 0, _loc12_, _loc11_, param3);
    }

    public getOldLocation(param1: IVector3d, param2: number): any[] {
        if (param1 == null) {
            return null;
        }
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        let _loc7_: number = 0;
        let _loc5_: number = 0;
        let _loc8_: string = "";
        let _loc6_: number = 0;
        if (param2 == 90) {
            _loc3_ = Math.floor(param1.x - 0.5);
            _loc4_ = Math.floor(param1.y + 0.5);
            _loc6_ = this.getTileHeight(_loc3_ | 0, _loc4_ | 0);
            _loc7_ = this._scale / 2 - (param1.y - _loc4_ + 0.5) * (this._scale / 2);
            _loc5_ = (_loc6_ - param1.z) * (this._scale / 2) + (this._scale / 2 - _loc7_) / 2;
            _loc8_ = "l";
        } else {
            if (param2 != 180) {
                return null;
            }
            _loc3_ = Math.floor(param1.x + 0.5);
            _loc4_ = Math.floor(param1.y - 0.5);
            _loc6_ = this.getTileHeight(_loc3_ | 0, _loc4_ | 0);
            _loc7_ = (param1.x + 0.5 - _loc3_) * (this._scale / 2);
            _loc5_ = (_loc6_ - param1.z) * (this._scale / 2) + _loc7_ / 2;
            _loc8_ = "r";
        }
        return [_loc3_, _loc4_, _loc7_, _loc5_, _loc8_];
    }

    public getOldLocationString(param1: IVector3d, param2: number): string {
        let _loc3_: any[] = this.getOldLocation(param1, param2);
        if (_loc3_ == null) {
            return null;
        }
        let _loc4_: number = _loc3_[0] | 0;
        let _loc5_: number = _loc3_[1] | 0;
        let _loc9_: number = _loc3_[2] | 0;
        let _loc6_: number = _loc3_[3] | 0;
        let _loc8_: string = stringOrNull(_loc3_[4]);
        return ":w=" + _loc4_ + "," + _loc5_ + " l=" + _loc9_ + "," + _loc6_ + " " + _loc8_;
    }

    public getDirection(param1: string): number {
        if (param1 == "r") {
            return 180;
        }
        return 90;
    }

    public getFloorAltitude(param1: number, param2: number): number {
        let _loc4_: number = this.getTileHeight(param1, param2) | 0;
        let _loc3_: number = _loc4_ + 1;
        return _loc4_ + ((this.getTileHeight(param1 - 1, param2 - 1) | 0) == _loc3_ || (this.getTileHeight(param1, param2 - 1) | 0) == _loc3_ || (this.getTileHeight(param1 + 1, param2 - 1) | 0) == _loc3_ || (this.getTileHeight(param1 - 1, param2) | 0) == _loc3_ || (this.getTileHeight(param1 + 1, param2) | 0) == _loc3_ || (this.getTileHeight(param1 - 1, param2 + 1) | 0) == _loc3_ || (this.getTileHeight(param1, param2 + 1) | 0) == _loc3_ || (this.getTileHeight(param1 + 1, param2 + 1) | 0) == _loc3_ ? 0.5 : 0);
    }

    public isRoomTile(param1: number, param2: number): boolean {
        return param1 >= 0 && param1 < this._width && param2 >= 0 && param2 < this._height && this._heightMap[param2][param1] >= 0;
    }

    get [IDisposable](): true {
        return true;
    }
}
