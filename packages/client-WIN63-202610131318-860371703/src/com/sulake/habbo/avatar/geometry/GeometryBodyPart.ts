import { asGuarded, asInstanceOf, isNumber } from '@habbo-pixi/runtime/lang/cast';
import { keysOf, valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Matrix4x4 } from '@/com/sulake/habbo/avatar/geometry/Matrix4x4';
import type { Vector3D } from '@/com/sulake/habbo/avatar/geometry/Vector3D';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { GeometryItem } from '@/com/sulake/habbo/avatar/geometry/GeometryItem';
import { Node3D } from '@/com/sulake/habbo/avatar/geometry/Node3D';

export class GeometryBodyPart extends Node3D {
    static { registerClassName(this, 'com.sulake.habbo.avatar.geometry::GeometryBodyPart'); }

    declare private _id: string;

    declare private _parts: Map<any, any>;

    declare private _radius: number;
    static { (this.prototype as any)._radius = NaN; }

    declare private _SafeStr_2462: Map<any, any>;

    constructor(param1: XML) {
        let _loc2_: GeometryItem = null;
        super(parseFloat(param1.attribute("x").toString()), parseFloat(param1.attribute("y").toString()), parseFloat(param1.attribute("z").toString()));
        this._radius = parseFloat(param1.attribute("radius").toString());
        this._id = String(param1.attribute("id"));
        this._parts = new Dictionary();
        this._SafeStr_2462 = new Dictionary();
        for (const _loc3_ of param1.descendants("item") ?? []) {
            _loc2_ = new GeometryItem(_loc3_);
            this._parts.set(String(_loc3_.attribute("id")), _loc2_);
        }
    }

    public getDynamicParts(param1: IAvatarImage): any[] {
        let _loc3_: any[] = [];
        if (this._SafeStr_2462.get(param1) !== undefined) {
            for (const _loc2_ of valuesOf(this._SafeStr_2462.get(param1))) {
                if (_loc2_ != null) {
                    _loc3_.push(_loc2_);
                }
            }
        }
        return _loc3_;
    }

    public getPartIds(param1: IAvatarImage): any[] {
        let _loc2_: any = null;
        let _loc3_: any[] = [];
        for (_loc2_ of this._parts?.values() ?? []) {
            if (_loc2_ != null) {
                _loc3_.push(_loc2_.id);
            }
        }
        if (this._SafeStr_2462.get(param1) !== undefined) {
            for (_loc2_ of valuesOf(this._SafeStr_2462.get(param1))) {
                if (_loc2_ != null) {
                    _loc3_.push(_loc2_.id);
                }
            }
        }
        return _loc3_;
    }

    public removeDynamicParts(param1: IAvatarImage): boolean {
        if (this._SafeStr_2462.get(param1) !== undefined) {
            for (const _loc2_ of keysOf(this._SafeStr_2462.get(param1))) {
                delete this._SafeStr_2462.get(param1)[_loc2_];
            }
            this._SafeStr_2462.set(param1, null);
            this._SafeStr_2462.delete(param1);
        }
        return true;
    }

    public addPart(param1: XML, param2: IAvatarImage): boolean {
        let _loc3_: string = String(param1.attribute("id"));
        if (this.hasPart(_loc3_, param2)) {
            return false;
        }
        if (this._SafeStr_2462.get(param2) === undefined) {
            // the parts are read back by valuesOf/keysOf and written as properties: a plain object holds them for both, where
            // a Dictionary (a Map) kept the properties out of its entries and the parts an effect adds (the Ghost Sheet) were lost
            this._SafeStr_2462.set(param2, {});
        }
        this._SafeStr_2462.get(param2)[_loc3_] = new GeometryItem(param1, true);
        return true;
    }

    public hasPart(param1: string, param2: IAvatarImage): boolean {
        let _loc3_: GeometryItem = this._parts.get(param1);
        if (_loc3_ == null && this._SafeStr_2462.get(param2) !== undefined) {
            _loc3_ = this._SafeStr_2462.get(param2)[param1];
        }
        return _loc3_ != null;
    }

    public getParts(param1: Matrix4x4, param2: Vector3D, param3: any[], param4: IAvatarImage): any[] {
        let _loc6_: number = NaN;
        let _loc5_: GeometryItem = null;
        let _loc9_: any[] = [];
        let _loc8_: any[] = [];
        for (_loc5_ of this._parts?.values() ?? []) {
            if (_loc5_ != null) {
                _loc5_.applyTransform(param1);
                _loc6_ = _loc5_.getDistance(param2);
                _loc9_.push([_loc6_, _loc5_]);
            }
        }
        for (_loc5_ of valuesOf(this._SafeStr_2462.get(param4))) {
            if (_loc5_ != null) {
                _loc5_.applyTransform(param1);
                _loc6_ = _loc5_.getDistance(param2);
                _loc9_.push([_loc6_, _loc5_]);
            }
        }
        _loc9_.sort(this.orderParts);
        for (const _loc7_ of _loc9_ ?? []) {
            _loc5_ = asInstanceOf(_loc7_[1], GeometryItem);
            _loc8_.push(_loc5_.id);
        }
        return _loc8_;
    }

    public getDistance(param1: Vector3D): number {
        let _loc3_: number = Number(Math.abs(param1.z - this.transformedLocation.z - this._radius));
        let _loc2_: number = Number(Math.abs(param1.z - this.transformedLocation.z + this._radius));
        return Math.min(_loc3_, _loc2_);
    }

    public get id(): string {
        return this._id;
    }

    private orderParts = (param1: any[], param2: any[]): number => {
        let _loc3_: number = Number(asGuarded(param1[0], isNumber));
        let _loc4_: number = Number(asGuarded(param2[0], isNumber));
        if (_loc3_ < _loc4_) {
            return -1;
        }
        if (_loc3_ > _loc4_) {
            return 1;
        }
        return 0;
    };

    public get radius(): number {
        return this._radius;
    }
}
