import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import type { ILocalizable } from '@/com/sulake/core/localization/ILocalizable';
import { ILocalization } from '@/com/sulake/core/localization/ILocalization';

export class Localization implements ILocalization {
    static { registerClassName(this, 'com.sulake.core.localization::Localization'); }

    constructor(param1: ICoreLocalizationManager, param2: string, param3: string = null) {
        this._manager = param1;
        this._key = param2;
        this._value = param3;
    }

    declare private _manager: ICoreLocalizationManager;

    declare private _key: string;

    declare private _value: string;

    declare private _parameters: Map<any, any>;

    declare private _listeners: any[];

    private _isInitialized: boolean = false;

    public get isInitialized(): boolean {
        return this._value != null;
    }

    public get value(): string {
        return this.fillParameterValues();
    }

    public get raw(): string {
        return this._value;
    }

    public setValue(param1: string): void {
        this._value = param1;
        this.updateListeners();
    }

    public registerListener(param1: ILocalizable): void {
        if (!this._listeners) {
            this._listeners = [];
        }
        if (this._listeners.indexOf(param1) == -1) {
            this._listeners.push(param1);
        }
        param1.localization = this._manager.interpolate(this.value);
    }

    public removeListener(param1: ILocalizable): void {
        let _loc2_: number = 0;
        if (this._listeners) {
            _loc2_ = this._listeners.indexOf(param1);
            if (_loc2_ >= 0) {
                this._listeners.splice(_loc2_, 1);
            }
        }
    }

    public registerParameter(param1: string, param2: string, param3: string = "%"): void {
        if (!this._parameters) {
            this._parameters = new Dictionary();
        }
        this._parameters.set(param1, { "id": param3, "value": param2 });
        this.updateListeners();
    }

    public updateListeners(): void {
        let _loc1_: string = this._manager.interpolate(this.value);
        if (this._listeners) {
            for (const _loc2_ of this._listeners ?? []) {
                _loc2_.localization = _loc1_;
            }
        }
    }

    private fillParameterValues(): string {
        let _loc12_: any = null;
        let _loc15_: string = null;
        let _loc7_: string = null;
        let _loc13_: RegExp = null;
        let _loc1_: number = 0;
        let _loc4_: RegExp = null;
        let _loc8_: RegExp = null;
        let _loc6_: number = 0;
        let _loc3_: string = null;
        let _loc11_: string = null;
        let _loc10_: string = null;
        let _loc9_: string = this._value;
        if (_loc9_ == null) {
            return null;
        }
        if (this._parameters) {
            for (const _loc14_ of this._parameters?.keys() ?? []) {
                _loc12_ = this._parameters.get(_loc14_);
                _loc15_ = stringOrNull(_loc12_.id + _loc14_ + _loc12_.id);
                _loc7_ = stringOrNull(_loc12_.value);
                _loc13_ = new RegExp(_loc15_, "gim");
                _loc9_ = _loc9_.replace(_loc13_, _loc7_);
                if (_loc9_.toLowerCase().indexOf(_loc12_.id + "{" + _loc14_) >= 0) {
                    switch (Number(_loc7_) | 0) {
                        case 0:
                            _loc1_ = 1;
                            break;
                        case 1:
                            _loc1_ = 2;
                            break;
                        default:
                            _loc1_ = 3;
                    }
                    _loc4_ = new RegExp(_loc12_.id + "\\{" + _loc14_ + "\\|([^|]*)\\|([^|]*)\\|([^}]*)\\}", "gim");
                    _loc8_ = new RegExp(_loc12_.id + _loc12_.id, "gim");
                    _loc9_ = _loc9_.replace(_loc4_, "$" + _loc1_);
                    _loc9_ = _loc9_.replace(_loc8_, _loc7_);
                }
            }
        }
        let _loc2_: RegExp = /%%%([A-Za-z0-9_])+%%%/g;
        let _loc5_: any[] = _loc9_.match(_loc2_);
        if (_loc5_ != null) {
            _loc6_ = _loc5_.length - 1;
            while (_loc6_ >= 0) {
                _loc3_ = stringOrNull(_loc5_[_loc6_].substring(3, _loc5_[_loc6_].length - 3));
                _loc11_ = this._key + "." + _loc3_;
                _loc10_ = this._manager.getLocalization(_loc11_, _loc3_);
                _loc9_ = _loc9_.replace(_loc5_[_loc6_], _loc10_);
                _loc6_--;
            }
        }
        return _loc9_;
    }

    get [ILocalization](): true {
        return true;
    }
}
