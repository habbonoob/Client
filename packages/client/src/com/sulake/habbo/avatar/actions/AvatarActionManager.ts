import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IActiveActionData } from '@/com/sulake/habbo/avatar/actions/IActiveActionData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { ActionDefinition } from '@/com/sulake/habbo/avatar/actions/ActionDefinition';
import { ActiveActionData } from '@/com/sulake/habbo/avatar/actions/ActiveActionData';

export class AvatarActionManager {
    static { registerClassName(this, 'com.sulake.habbo.avatar.actions::AvatarActionManager'); }

    constructor(param1: IAssetLibrary, param2: XML) {
        this._assets = param1;
        this._SafeStr_2403 = new Dictionary();
        this.updateActions(param2);
    }

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_2403: Map<any, any>;

    declare private _defaultAction: ActionDefinition;

    declare private _SafeStr_3621: ActionDefinition;

    public updateActions(param1: XML): void {
        let _loc4_: string = null;
        let _loc3_: ActionDefinition = null;
        for (const _loc2_ of param1.child("action") ?? []) {
            _loc4_ = String(_loc2_.attribute("state"));
            if (_loc4_ != "") {
                _loc3_ = new ActionDefinition(_loc2_);
                this._SafeStr_2403.set(_loc4_, _loc3_);
            }
        }
        this.parseActionOffsets();
    }

    public getActionDefinition(param1: string): ActionDefinition {
        for (const _loc2_ of this._SafeStr_2403?.values() ?? []) {
            if (_loc2_.id == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getActionDefinitionWithState(param1: string): ActionDefinition {
        return this._SafeStr_2403.get(param1);
    }

    public getDefaultAction(): ActionDefinition {
        if (this._defaultAction) {
            return this._defaultAction;
        }
        for (const _loc1_ of this._SafeStr_2403?.values() ?? []) {
            if (_loc1_.isDefault) {
                this._defaultAction = _loc1_;
                return _loc1_;
            }
        }
        return null;
    }

    public getDefaultLayAction(): ActionDefinition {
        if (this._SafeStr_3621) {
            return this._SafeStr_3621;
        }
        this._SafeStr_3621 = this.getDefaultAction().copy();
        this._SafeStr_3621.setGeometryType("horizontal");
        this._SafeStr_3621.setState("lay");
        this._SafeStr_3621.setAssetPartDefinition("lay");
        return this._SafeStr_3621;
    }

    public getCanvasOffsets(param1: any[], param2: string, param3: number): any[] {
        let _loc4_: any[] = null;
        let _loc5_: ActiveActionData = null;
        let _loc7_: ActionDefinition = null;
        let _loc6_: number = 0;
        _loc6_ = 0;
        while (_loc6_ < param1.length) {
            _loc5_ = asInstanceOf(param1[_loc6_], ActiveActionData);
            _loc7_ = asInstanceOf(this._SafeStr_2403.get(_loc5_.actionType), ActionDefinition);
            if (_loc7_ != null && _loc7_.getOffsets(param2, param3) != null) {
                _loc4_ = _loc7_.getOffsets(param2, param3);
            }
            _loc6_++;
        }
        return _loc4_;
    }

    public sortActions(param1: any[]): any[] {
        let _loc4_: ActionDefinition = null;
        param1 = this.filterActions(param1);
        let _loc2_: any[] = [];
        for (const _loc3_ of param1 ?? []) {
            _loc4_ = this._SafeStr_2403.get(_loc3_.actionType);
            if (_loc4_ != null) {
                _loc3_.definition = _loc4_;
                _loc2_.push(_loc3_);
            }
        }
        _loc2_.sort(this.orderByPrecedence);
        return _loc2_;
    }

    private parseActionOffsets(): void {
        let _loc2_: any;
        let _loc8_: any = null;
        let _loc9_: any = null;
        let _loc3_: string = null;
        let _loc7_: XML = null;
        let _loc6_: string = null;
        let _loc10_: number = 0;
        let _loc1_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: number = NaN;
        for (_loc9_ of this._SafeStr_2403?.values() ?? []) {
            _loc3_ = stringOrNull(_loc9_.state);
            if (this._assets.hasAsset("action_offset_" + _loc3_)) {
                _loc7_ = asInstanceOf(this._assets.getAssetByName("action_offset_" + _loc3_).content, XML);
                for (_loc2_ of _loc7_.child("offset") ?? []) {
                    _loc6_ = String(_loc2_.attribute("size"));
                    _loc10_ = parseInt(_loc2_.attribute("direction").toString()) | 0;
                    _loc1_ = parseInt(_loc2_.attribute("x").toString()) | 0;
                    _loc5_ = parseInt(_loc2_.attribute("y").toString()) | 0;
                    _loc4_ = Number(_loc2_.attribute("z"));
                    _loc9_.setOffsets(_loc6_, _loc10_, [_loc1_, _loc5_, _loc4_]);
                }
            }
        }
    }

    private filterActions(param1: any[]): any[] {
        let _loc3_: ActiveActionData = null;
        let _loc7_: ActionDefinition = null;
        let _loc4_: number = 0;
        let _loc5_: string = null;
        let _loc2_: any[] = [];
        let _loc6_: any[] = [];
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ = asInstanceOf(param1[_loc4_], ActiveActionData);
            _loc7_ = asInstanceOf(this._SafeStr_2403.get(_loc3_.actionType), ActionDefinition);
            if (_loc7_ != null) {
                _loc6_ = _loc6_.concat(_loc7_.getPrevents(_loc3_.actionParameter));
            }
            _loc4_++;
        }
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ = asInstanceOf(param1[_loc4_], ActiveActionData);
            _loc5_ = _loc3_.actionType;
            if (_loc3_.actionType == "fx") {
                _loc5_ += "." + _loc3_.actionParameter;
            }
            if (_loc6_.indexOf(_loc5_) == -1) {
                _loc2_.push(_loc3_);
            }
            _loc4_++;
        }
        return _loc2_;
    }

    private orderByPrecedence = (param1: IActiveActionData, param2: IActiveActionData): number => {
        let _loc3_: number = param1.definition.precedence;
        let _loc4_: number = param2.definition.precedence;
        if (_loc3_ < _loc4_) {
            return 1;
        }
        if (_loc3_ > _loc4_) {
            return -1;
        }
        return 0;
    };
}
