import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniStackingHeightMap {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::FurniStackingHeightMap'); }

    declare private _heightMap: number[];

    declare private _SafeStr_4661: boolean[];

    declare private _SafeStr_4204: boolean[];

    private _width: number = 0;
    private _height: number = 0;

    constructor(param1: number, param2: number) {
        this._width = param1;
        this._height = param2;
        this._heightMap = new Array<number>(param1 * param2 >>> 0).fill(NaN);
        this._SafeStr_4661 = new Array<boolean>(param1 * param2 >>> 0).fill(false);
        this._SafeStr_4204 = new Array<boolean>(param1 * param2 >>> 0).fill(false);
    }

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height;
    }

    public dispose(): void {
        this._heightMap = null;
        this._SafeStr_4661 = null;
        this._SafeStr_4204 = null;
        this._width = 0;
        this._height = 0;
    }

    private validPosition(param1: number, param2: number): boolean {
        return param1 >= 0 && param1 < this._width && param2 >= 0 && param2 < this._height;
    }

    public getTileHeight(param1: number, param2: number): number {
        return this.validPosition(param1, param2) ? this._heightMap[param2 * this._width + param1] : 0;
    }

    public setTileHeight(param1: number, param2: number, param3: number): void {
        if (this.validPosition(param1, param2)) {
            this._heightMap[param2 * this._width + param1] = param3;
        }
    }

    public setStackingBlocked(param1: number, param2: number, param3: boolean): void {
        if (this.validPosition(param1, param2)) {
            this._SafeStr_4661[param2 * this._width + param1] = param3;
        }
    }

    public setIsRoomTile(param1: number, param2: number, param3: boolean): void {
        if (this.validPosition(param1, param2)) {
            this._SafeStr_4204[param2 * this._width + param1] = param3;
        }
    }

    public validateLocation(param1: number, param2: number, param3: number, param4: number, param5: number, param6: number, param7: number, param8: number, param9: boolean, param10: number = -1): boolean {
        let _loc13_: number = 0;
        let _loc11_: number = 0;
        let _loc12_: number = 0;
        if (!this.validPosition(param1, param2) || !this.validPosition(param1 + param3 - 1, param2 + param4 - 1)) {
            return false;
        }
        if (param5 < 0 || param5 >= this._width) {
            param5 = 0;
        }
        if (param6 < 0 || param6 >= this._height) {
            param6 = 0;
        }
        param7 = Math.min(param7, this._width - param5) | 0;
        param8 = Math.min(param8, this._height - param6) | 0;
        if (param10 == -1) {
            param10 = this.getTileHeight(param1, param2);
        }
        _loc13_ = param2;
        while (_loc13_ < param2 + param4) {
            _loc11_ = param1;
            while (_loc11_ < param1 + param3) {
                if (_loc11_ < param5 || _loc11_ >= param5 + param7 || _loc13_ < param6 || _loc13_ >= param6 + param8) {
                    _loc12_ = _loc13_ * this._width + _loc11_;
                    if (param9) {
                        if (!this._SafeStr_4204[_loc12_]) {
                            return false;
                        }
                    } else if (this._SafeStr_4661[_loc12_] || !this._SafeStr_4204[_loc12_] || Math.abs(this._heightMap[_loc12_] - param10) > 0.01) {
                        return false;
                    }
                }
                _loc11_++;
            }
            _loc13_++;
        }
        return true;
    }
}
