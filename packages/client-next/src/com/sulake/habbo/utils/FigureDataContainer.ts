import { asGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Logger } from '@/com/sulake/habbo/Logger';

export class FigureDataContainer {
    static { registerClassName(this, 'com.sulake.habbo.utils::FigureDataContainer'); }

    public static readonly MALE: string = "M";
    public static readonly _SafeStr_7562: string = "F";
    public static readonly _SafeStr_7504: string = "U";
    public static readonly SCALE: string = "h";
    public static readonly ACTION: string = "std";
    public static readonly DEFAULT_FRAME: string = "0";
    private static readonly BLOCKED_FX_TYPES: any[] = [28, 29, 30, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 68];

    declare private _data: Map<any, any>;

    declare private _colors: Map<any, any>;

    private _gender: string = "M";

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    private _SafeStr_5603: number = -1;

    constructor() {
    }

    public loadAvatarData(param1: string, param2: string): void {
        this._data = new Dictionary();
        this._colors = new Dictionary();
        this._gender = param2;
        this.parseFigureString(param1);
    }

    public dispose(): void {
        this._data = null;
        this._colors = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private parseFigureString(param1: string): void {
        let _loc2_: any[] = null;
        let _loc6_: string = null;
        let _loc3_: number = 0;
        let _loc5_: any[] = null;
        let _loc4_: number = 0;
        if (param1 == null) {
            return;
        }
        for (const _loc7_ of param1.split(".") ?? []) {
            _loc2_ = _loc7_.split("-");
            if (_loc2_.length > 0) {
                _loc6_ = String(_loc2_[0]);
                _loc3_ = parseInt(stringOrNull(_loc2_[1])) | 0;
                _loc5_ = [];
                _loc4_ = 2;
                while (_loc4_ < _loc2_.length) {
                    _loc5_.push(parseInt(stringOrNull(_loc2_[_loc4_])));
                    _loc4_++;
                }
                if (_loc5_.length == 0) {
                    _loc5_.push(0);
                }
                this.savePartSetId(_loc6_, _loc3_, false);
                this.savePartSetColourId(_loc6_, _loc5_, false);
            }
        }
    }

    public hasSetType(param1: string): boolean {
        return this._data.get(param1) != null;
    }

    public getPartSetId(param1: string): number {
        if (this._data.get(param1) != null) {
            return this._data.get(param1) | 0;
        }
        return -1;
    }

    public getColourIds(param1: string): any[] {
        if (this._colors.get(param1) != null) {
            return this._colors.get(param1);
        }
        return [];
    }

    public getFigureString(): string {
        let _loc2_: string = null;
        let _loc8_: any[] = null;
        let _loc3_: string = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: string = "";
        let _loc1_: any[] = [];
        for (const _loc7_ of this._data?.keys() ?? []) {
            if (this._data.get(_loc7_) != null) {
                _loc2_ = stringOrNull(this._data.get(_loc7_));
                _loc8_ = asGuarded(this._colors.get(_loc7_), Array.isArray);
                _loc3_ = _loc7_ + "-" + _loc2_;
                if (_loc8_) {
                    _loc4_ = 0;
                    while (_loc4_ < _loc8_.length) {
                        _loc3_ += "-" + _loc8_[_loc4_];
                        _loc4_++;
                    }
                }
                _loc1_.push(_loc3_);
            }
        }
        _loc5_ = 0;
        while (_loc5_ < _loc1_.length) {
            _loc6_ += _loc1_[_loc5_];
            if (_loc5_ < _loc1_.length - 1) {
                _loc6_ += ".";
            }
            _loc5_++;
        }
        return _loc6_;
    }

    public savePartData(param1: string, param2: number, param3: any[], param4: boolean = false): void {
        this.savePartSetId(param1, param2, param4);
        this.savePartSetColourId(param1, param3, param4);
    }

    private savePartSetId(param1: string, param2: number, param3: boolean = true): void {
        switch (param1) {
            case "hd":
            case "hr":
            case "ha":
            case "he":
            case "ea":
            case "fa":
            case "ch":
            case "cc":
            case "ca":
            case "cp":
            case "lg":
            case "sh":
            case "wa":
            case "mc":
            case "pt":
                if (param2 >= 0) {
                    this._data.set(param1, param2);
                } else {
                    this._data.delete(param1);
                }
                break;
            default:
                Logger.log("[FigureData] Unknown partset: " + param1 + ", can not store id: " + param2);
        }
    }

    public savePartSetColourId(param1: string, param2: any[], param3: boolean = true): void {
        switch (param1) {
            case "hd":
            case "hr":
            case "ha":
            case "he":
            case "ea":
            case "fa":
            case "ch":
            case "cc":
            case "ca":
            case "cp":
            case "lg":
            case "sh":
            case "wa":
            case "mc":
            case "pt":
                this._colors.set(param1, param2);
                break;
            default:
                Logger.log("[FigureData] Unknown partset: " + param1 + ", can not store color-ids");
        }
    }

    public getFigureStringWithFace(param1: number): string {
        let _loc4_: number = 0;
        let _loc10_: any[] = null;
        let _loc5_: string = null;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc3_: any[] = [];
        _loc3_.push("hd");
        let _loc8_: string = "";
        let _loc2_: any[] = [];
        for (const _loc9_ of _loc3_ ?? []) {
            if (this._colors.get(_loc9_) != null) {
                _loc4_ = this._data.get(_loc9_) | 0;
                _loc10_ = asGuarded(this._colors.get(_loc9_), Array.isArray);
                if (_loc9_ == "hd") {
                    _loc4_ = param1;
                }
                _loc5_ = _loc9_ + "-" + _loc4_;
                if (_loc4_ >= 0) {
                    _loc6_ = 0;
                    while (_loc6_ < _loc10_.length) {
                        _loc5_ += "-" + _loc10_[_loc6_];
                        _loc6_++;
                    }
                }
                _loc2_.push(_loc5_);
            }
        }
        _loc7_ = 0;
        while (_loc7_ < _loc2_.length) {
            _loc8_ += _loc2_[_loc7_];
            if (_loc7_ < _loc2_.length - 1) {
                _loc8_ += ".";
            }
            _loc7_++;
        }
        return _loc8_;
    }

    public get gender(): string {
        return this._gender;
    }
}
