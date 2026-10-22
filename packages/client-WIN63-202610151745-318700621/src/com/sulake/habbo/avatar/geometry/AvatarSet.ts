import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';

export class AvatarSet {
    static { registerClassName(this, 'com.sulake.habbo.avatar.geometry::AvatarSet'); }

    declare private _id: string;

    declare private _SafeStr_4500: Map<any, any>;

    declare private _SafeStr_5933: any[];

    declare private _SafeStr_6857: any[];

    declare private _isMain: boolean;
    static { (this.prototype as any)._isMain = false; }

    constructor(param1: XML) {
        let _loc4_: AvatarSet = null;
        this._id = String(param1.attribute("id"));
        let _loc3_: string = String(param1.attribute("main"));
        this._isMain = _loc3_ == null ? false : Boolean(parseInt(_loc3_));
        this._SafeStr_4500 = new Dictionary();
        this._SafeStr_5933 = [];
        for (const _loc6_ of param1.child("avatarset") ?? []) {
            _loc4_ = new AvatarSet(_loc6_);
            this._SafeStr_4500.set(String(_loc6_.attribute("id")), _loc4_);
        }
        for (const _loc2_ of param1.child("bodypart") ?? []) {
            this._SafeStr_5933.push(String(_loc2_.attribute("id")));
        }
        let _loc5_: any[] = this._SafeStr_5933.concat();
        for (_loc4_ of this._SafeStr_4500?.values() ?? []) {
            _loc5_ = _loc5_.concat(_loc4_.getBodyParts());
        }
        this._SafeStr_6857 = _loc5_;
    }

    public findAvatarSet(param1: string): AvatarSet {
        if (param1 == this._id) {
            return this;
        }
        for (const _loc2_ of this._SafeStr_4500?.values() ?? []) {
            if (_loc2_.findAvatarSet(param1) != null) {
                return _loc2_;
            }
        }
        return null;
    }

    public getBodyParts(): any[] {
        return this._SafeStr_6857.concat();
    }

    public get id(): string {
        return this._id;
    }

    public get isMain(): boolean {
        if (this._isMain) {
            return true;
        }
        for (const _loc1_ of this._SafeStr_4500?.values() ?? []) {
            if (_loc1_.isMain) {
                return true;
            }
        }
        return false;
    }
}
