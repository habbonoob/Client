import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class InputSourcesConf {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents::InputSourcesConf'); }

    public static readonly FURNI_SOURCE_FURNI_PICKS_1: number = 100;
    public static readonly FURNI_SOURCE_FURNI_PICKS_2: number = 101;

    private static readAllowedSources(param1: IMessageDataWrapper): any[] {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: any[] = [];
        let _loc2_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_[_loc4_] = [];
            _loc5_ = param1.readInteger();
            _loc6_ = 0;
            while (_loc6_ < _loc5_) {
                _loc3_[_loc4_][_loc6_] = param1.readInteger();
                _loc6_++;
            }
            _loc4_++;
        }
        return _loc3_;
    }

    private static readDefaultSources(param1: IMessageDataWrapper): any[] {
        let _loc4_: number = 0;
        let _loc2_: any[] = [];
        let _loc3_: number = param1.readInteger();
        _loc4_ = 0;
        while (_loc4_ < _loc3_) {
            _loc2_.push(param1.readInteger());
            _loc4_++;
        }
        return _loc2_;
    }

    constructor(param1: IMessageDataWrapper) {
        this._SafeStr_5700 = InputSourcesConf.readAllowedSources(param1);
        this._SafeStr_5537 = InputSourcesConf.readAllowedSources(param1);
        this._defaultFurniSources = InputSourcesConf.readDefaultSources(param1);
        this._defaultUserSources = InputSourcesConf.readDefaultSources(param1);
    }

    private _SafeStr_7580: number = 110;

    declare private _SafeStr_5700: any[];

    declare private _SafeStr_5537: any[];

    declare private _defaultFurniSources: any[];

    declare private _defaultUserSources: any[];

    public get amountFurniSelections(): number {
        return this._SafeStr_5700.length | 0;
    }

    public get amountUserSelections(): number {
        return this._SafeStr_5537.length | 0;
    }

    public get defaultFurniSources(): any[] {
        return this._defaultFurniSources;
    }

    public get defaultUserSources(): any[] {
        return this._defaultUserSources;
    }

    public getAllowedFurniSources(param1: number): any[] {
        return this._SafeStr_5700[param1];
    }

    public getAllowedUserSources(param1: number): any[] {
        return this._SafeStr_5537[param1];
    }

    public isUsingAdvancedSettings(param1: any[], param2: any[]): boolean {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < this._defaultFurniSources.length) {
            _loc4_ = this._defaultFurniSources[_loc5_] | 0;
            if (_loc4_ != param1[_loc5_]) {
                return true;
            }
            _loc5_++;
        }
        _loc5_ = 0;
        while (_loc5_ < this._defaultUserSources.length) {
            _loc3_ = this._defaultUserSources[_loc5_] | 0;
            if (_loc3_ != param2[_loc5_]) {
                return true;
            }
            _loc5_++;
        }
        return false;
    }

    public allowFurniSelection(): boolean {
        let _loc1_: number = 0;
        _loc1_ = 0;
        while (_loc1_ < this.amountFurniSelections) {
            if (this.getAllowedFurniSources(_loc1_).indexOf(100) != -1 || this.getAllowedFurniSources(_loc1_).indexOf(101) != -1 || this.getAllowedFurniSources(_loc1_).indexOf(this._SafeStr_7580) != -1) {
                return true;
            }
            _loc1_++;
        }
        return false;
    }

    public isDualFurniPickingMode(): boolean {
        let _loc1_: number = 0;
        let _loc3_: boolean = false;
        let _loc2_: boolean = false;
        _loc1_ = 0;
        while (_loc1_ < this.amountFurniSelections) {
            if (this.getAllowedFurniSources(_loc1_).indexOf(100) != -1) {
                _loc3_ = true;
            }
            if (this.getAllowedFurniSources(_loc1_).indexOf(101) != -1) {
                _loc2_ = true;
            }
            _loc1_++;
        }
        return _loc3_ && _loc2_;
    }

    public isFurniSelectionDefault(): boolean {
        return this._defaultFurniSources.indexOf(100) != -1 || this._defaultFurniSources.indexOf(101) != -1;
    }
}
