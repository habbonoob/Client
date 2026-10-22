import { asGuarded, isNumber, isString, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';

export class RoomObjectModel implements IRoomObjectModelController {
    static { registerClassName(this, 'com.sulake.room.object::RoomObjectModel'); }

    private static readonly MAP_KEYS_PREFIX: string = "ROMC_MAP_KEYS_";
    private static readonly MAP_VALUES_PREFIX: string = "ROMC_MAP_VALUES_";

    constructor() {
        this._SafeStr_3003 = new Dictionary();
        this._SafeStr_2968 = new Dictionary();
        this._SafeStr_3001 = new Dictionary();
        this._SafeStr_3055 = new Dictionary();
        this._SafeStr_4554 = [];
        this._SafeStr_4448 = [];
        this._SafeStr_4562 = [];
        this._SafeStr_4678 = [];
        this._SafeStr_2155 = 0;
    }

    declare private _SafeStr_3003: Map<any, any>;

    declare private _SafeStr_2968: Map<any, any>;

    declare private _SafeStr_3001: Map<any, any>;

    declare private _SafeStr_3055: Map<any, any>;

    declare private _SafeStr_4554: any[];

    declare private _SafeStr_4448: any[];

    declare private _SafeStr_4562: any[];

    declare private _SafeStr_4678: any[];

    declare private _SafeStr_2155: number;
    static { (this.prototype as any)._SafeStr_2155 = 0; }

    public dispose(): void {
        let _loc1_: string = null;
        if (this._SafeStr_3003 != null) {
            for (_loc1_ of this._SafeStr_3003?.keys() ?? []) {
                this._SafeStr_3003.delete(_loc1_);
            }
            this._SafeStr_3003 = null;
        }
        if (this._SafeStr_2968 != null) {
            for (_loc1_ of this._SafeStr_2968?.keys() ?? []) {
                this._SafeStr_2968.delete(_loc1_);
            }
            this._SafeStr_2968 = null;
        }
        if (this._SafeStr_3001 != null) {
            for (_loc1_ of this._SafeStr_3001?.keys() ?? []) {
                this._SafeStr_3001.delete(_loc1_);
            }
            this._SafeStr_3001 = null;
        }
        if (this._SafeStr_3055 != null) {
            for (_loc1_ of this._SafeStr_3055?.keys() ?? []) {
                this._SafeStr_3055.delete(_loc1_);
            }
            this._SafeStr_3055 = null;
        }
        this._SafeStr_4448 = [];
        this._SafeStr_4554 = [];
        this._SafeStr_4678 = [];
        this._SafeStr_4562 = [];
    }

    public hasNumber(param1: string): boolean {
        return this._SafeStr_3003.get(param1) != null;
    }

    public hasNumberArray(param1: string): boolean {
        return this._SafeStr_3001.get(param1) != null;
    }

    public hasString(param1: string): boolean {
        return this._SafeStr_2968.get(param1) != null;
    }

    public hasStringArray(param1: string): boolean {
        return this._SafeStr_3055.get(param1) != null;
    }

    public getNumber(param1: string): number {
        return Number(this._SafeStr_3003.get(param1));
    }

    public getString(param1: string): string {
        return stringOrNull(this._SafeStr_2968.get(param1));
    }

    public getNumberArray(param1: string): any[] {
        let _loc2_: any[] = this._SafeStr_3001.get(param1);
        if (_loc2_ != null) {
            _loc2_ = _loc2_.slice();
        }
        return _loc2_;
    }

    public getStringArray(param1: string): any[] {
        let _loc2_: any[] = this._SafeStr_3055.get(param1);
        if (_loc2_ != null) {
            _loc2_ = _loc2_.slice();
        }
        return _loc2_;
    }

    public getStringToStringMap(param1: string): UtilsMap {
        let _loc4_: number = 0;
        let _loc5_: UtilsMap = new UtilsMap();
        let _loc2_: any[] = this.getStringArray("ROMC_MAP_KEYS_" + param1);
        let _loc3_: any[] = this.getStringArray("ROMC_MAP_VALUES_" + param1);
        if (_loc2_ != null && _loc3_ != null && _loc2_.length == _loc3_.length) {
            _loc4_ = 0;
            while (_loc4_ < _loc2_.length) {
                _loc5_.add(_loc2_[_loc4_], _loc3_[_loc4_]);
                _loc4_++;
            }
        }
        return _loc5_;
    }

    public setNumber(param1: string, param2: number, param3: boolean = false): void {
        if (this._SafeStr_4554.indexOf(param1) >= 0) {
            return;
        }
        if (param3) {
            this._SafeStr_4554.push(param1);
        }
        if (this._SafeStr_3003.get(param1) != param2) {
            this._SafeStr_3003.set(param1, param2);
            this._SafeStr_2155 = this._SafeStr_2155 + 1;
        }
    }

    public setString(param1: string, param2: string, param3: boolean = false): void {
        if (this._SafeStr_4448.indexOf(param1) >= 0) {
            return;
        }
        if (param3) {
            this._SafeStr_4448.push(param1);
        }
        if (this._SafeStr_2968.get(param1) != param2) {
            this._SafeStr_2968.set(param1, param2);
            this._SafeStr_2155 = this._SafeStr_2155 + 1;
        }
    }

    public setNumberArray(param1: string, param2: any[], param3: boolean = false): void {
        if (param2 == null) {
            return;
        }
        if (this._SafeStr_4562.indexOf(param1) >= 0) {
            return;
        }
        if (param3) {
            this._SafeStr_4562.push(param1);
        }
        let _loc6_: any[] = [];
        let _loc7_: number = 0;
        _loc7_ = 0;
        while (_loc7_ < param2.length) {
            if (typeof param2[_loc7_] === "number") {
                _loc6_.push(param2[_loc7_]);
            }
            _loc7_++;
        }
        let _loc5_: any[] = this._SafeStr_3001.get(param1);
        let _loc4_: boolean = true;
        if (_loc5_ != null && _loc5_.length == _loc6_.length) {
            _loc7_ = _loc6_.length - 1;
            while (_loc7_ >= 0) {
                if (asGuarded(_loc6_[_loc7_], isNumber) != asGuarded(_loc5_[_loc7_], isNumber)) {
                    _loc4_ = false;
                    break;
                }
                _loc7_--;
            }
        } else {
            _loc4_ = false;
        }
        if (_loc4_) {
            return;
        }
        this._SafeStr_3001.set(param1, _loc6_);
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public setStringArray(param1: string, param2: any[], param3: boolean = false): void {
        if (param2 == null) {
            return;
        }
        if (this._SafeStr_4678.indexOf(param1) >= 0) {
            return;
        }
        if (param3) {
            this._SafeStr_4678.push(param1);
        }
        let _loc6_: any[] = [];
        let _loc7_: number = 0;
        _loc7_ = 0;
        while (_loc7_ < param2.length) {
            if (typeof param2[_loc7_] === "string") {
                _loc6_.push(param2[_loc7_]);
            }
            _loc7_++;
        }
        let _loc5_: any[] = this._SafeStr_3055.get(param1);
        let _loc4_: boolean = true;
        if (_loc5_ != null && _loc5_.length == _loc6_.length) {
            _loc7_ = _loc6_.length - 1;
            while (_loc7_ >= 0) {
                if (asGuarded(_loc6_[_loc7_], isString) != asGuarded(_loc5_[_loc7_], isString)) {
                    _loc4_ = false;
                    break;
                }
                _loc7_--;
            }
        } else {
            _loc4_ = false;
        }
        if (_loc4_) {
            return;
        }
        this._SafeStr_3055.set(param1, _loc6_);
        this._SafeStr_2155 = this._SafeStr_2155 + 1;
    }

    public setStringToStringMap(param1: string, param2: UtilsMap, param3: boolean = false): void {
        if (param2 == null) {
            return;
        }
        this.setStringArray("ROMC_MAP_KEYS_" + param1, param2.getKeys(), param3);
        this.setStringArray("ROMC_MAP_VALUES_" + param1, param2.getValues(), param3);
    }

    public getUpdateID(): number {
        return this._SafeStr_2155;
    }

    get [IRoomObjectModelController](): true {
        return true;
    }

    get [IRoomObjectModel](): true {
        return true;
    }
}
