import { asGuarded, asInstanceOf, isNumber, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { AvatarSet } from '@/com/sulake/habbo/avatar/geometry/AvatarSet';
import { GeometryBodyPart } from '@/com/sulake/habbo/avatar/geometry/GeometryBodyPart';
import { Matrix4x4 } from '@/com/sulake/habbo/avatar/geometry/Matrix4x4';
import { Vector3D } from '@/com/sulake/habbo/avatar/geometry/Vector3D';
import { AvatarCanvas } from '@/com/sulake/habbo/avatar/structure/AvatarCanvas';
import { Logger } from '@/com/sulake/habbo/Logger';

export class AvatarModelGeometry {
    static { registerClassName(this, 'com.sulake.habbo.avatar.geometry::AvatarModelGeometry'); }

    declare private _SafeStr_5931: AvatarSet;

    declare private _geometryTypes: Map<any, any>;

    declare private _SafeStr_5567: Map<any, any>;

    declare private _SafeStr_5284: Map<any, any>;

    declare private _SafeStr_5418: Map<any, any>;

    declare private _SafeStr_3575: Matrix4x4;

    declare private _camera: Vector3D;

    declare private _canvases: Map<any, any>;

    constructor(param1: XML) {
        let _loc17_: any;
        let _loc13_: number = NaN;
        let _loc14_: number = NaN;
        let _loc15_: number = NaN;
        let _loc2_: any = null;
        let _loc11_: any = null;
        let _loc12_: AvatarCanvas = null;
        let _loc6_: string = null;
        let _loc4_: Map<any, any> = null;
        let _loc16_: any = null;
        let _loc7_: Map<any, any> = null;
        let _loc5_: Map<any, any> = null;
        let _loc3_: any = null;
        let _loc9_: GeometryBodyPart = null;
        let _loc10_: string = null;
        this._camera = new Vector3D(0, 0, 10);
        this._SafeStr_3575 = new Matrix4x4();
        this._geometryTypes = new Dictionary();
        this._SafeStr_5567 = new Dictionary();
        this._SafeStr_5284 = new Dictionary();
        this._SafeStr_5418 = new Dictionary();
        this._SafeStr_5931 = new AvatarSet(param1.child("avatarset").item(0));
        this._canvases = new Dictionary();
        let _loc8_: XML = param1.child("camera").item(0);
        if (_loc8_ != null) {
            _loc13_ = Number(parseFloat(_loc8_.child("x").text().toString()));
            _loc14_ = Number(parseFloat(_loc8_.child("y").text().toString()));
            _loc15_ = Number(parseFloat(_loc8_.child("z").text().toString()));
            this._camera.x = _loc13_;
            this._camera.y = _loc14_;
            this._camera.z = _loc15_;
        }
        for (_loc2_ of param1.child("canvas") ?? []) {
            _loc6_ = String(_loc2_.attribute("scale"));
            _loc4_ = new Dictionary();
            for (_loc11_ of _loc2_.child("geometry") ?? []) {
                _loc12_ = new AvatarCanvas(_loc11_, _loc6_);
                _loc4_.set(String(_loc11_.attribute("id")), _loc12_);
            }
            this._canvases.set(_loc6_, _loc4_);
        }
        for (_loc16_ of param1.child("type") ?? []) {
            _loc7_ = new Dictionary();
            _loc5_ = new Dictionary();
            for (_loc3_ of _loc16_.child("bodypart") ?? []) {
                _loc9_ = new GeometryBodyPart(_loc3_);
                _loc7_.set(String(_loc3_.attribute("id")), _loc9_);
                _loc10_ = String(_loc3_.attribute("id"));
                if (_loc3_.attribute("order-before") != undefined && String(_loc3_.attribute("order-before")) != "") {
                    this._SafeStr_5284.set(_loc10_, String(_loc3_.attribute("order-before")));
                }
                if (_loc3_.attribute("order-after") != undefined && String(_loc3_.attribute("order-after")) != "") {
                    this._SafeStr_5418.set(_loc10_, String(_loc3_.attribute("order-after")));
                }
                for (_loc17_ of _loc9_.getPartIds(null) ?? []) {
                    _loc5_.set(_loc17_, _loc9_);
                }
            }
            this._geometryTypes.set(String(_loc16_.attribute("id")), _loc7_);
            this._SafeStr_5567.set(String(_loc16_.attribute("id")), _loc5_);
        }
    }

    public removeDynamicItems(param1: IAvatarImage): void {
        let _loc2_: any = null;
        let _loc3_: any = null;
        for (_loc2_ of this._geometryTypes?.values() ?? []) {
            for (_loc3_ of valuesOf(_loc2_)) {
                _loc3_.removeDynamicParts(param1);
            }
        }
    }

    public getBodyPartIdsInAvatarSet(param1: string): any[] {
        let _loc3_: any[] = [];
        let _loc2_: AvatarSet = this._SafeStr_5931.findAvatarSet(param1);
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getBodyParts();
        }
        return _loc3_;
    }

    public isMainAvatarSet(param1: string): boolean {
        let _loc2_: AvatarSet = this._SafeStr_5931.findAvatarSet(param1);
        if (_loc2_ != null) {
            return _loc2_.isMain;
        }
        return false;
    }

    public getCanvas(param1: string, param2: string): AvatarCanvas {
        let _loc4_: AvatarCanvas = null;
        let _loc3_: Map<any, any> = this._canvases.get(param1);
        if (_loc3_ != null) {
            _loc4_ = asInstanceOf(_loc3_.get(param2), AvatarCanvas);
        }
        return _loc4_;
    }

    private typeExists(param1: string): boolean {
        return this._geometryTypes.get(param1) != null;
    }

    private hasBodyPart(param1: string, param2: string): boolean {
        let _loc3_: Map<any, any> = null;
        if (this.typeExists(param1)) {
            _loc3_ = asInstanceOf(this._geometryTypes.get(param1), Map);
            return _loc3_.get(param2) != null;
        }
        return false;
    }

    private getBodyPartIDs(param1: string): any[] {
        let _loc4_: Map<any, any> = this.getBodyPartsOfType(param1);
        let _loc2_: any[] = [];
        for (const _loc3_ of this._geometryTypes?.keys() ?? []) {
            _loc2_.push(_loc3_);
        }
        return _loc2_;
    }

    private getBodyPartsOfType(param1: string): Map<any, any> {
        if (this.typeExists(param1)) {
            return asInstanceOf(this._geometryTypes.get(param1), Map);
        }
        return new Dictionary();
    }

    public getBodyPart(param1: string, param2: string): GeometryBodyPart {
        let _loc3_: Map<any, any> = this.getBodyPartsOfType(param1);
        return _loc3_.get(param2);
    }

    public getBodyPartOfItem(param1: string, param2: string, param3: IAvatarImage): GeometryBodyPart {
        let _loc6_: GeometryBodyPart = null;
        let _loc5_: Map<any, any> = null;
        let _loc4_: Map<any, any> = this._SafeStr_5567.get(param1);
        if (_loc4_ != null) {
            _loc6_ = _loc4_.get(param2);
            if (_loc6_ != null) {
                return _loc6_;
            }
            _loc5_ = this.getBodyPartsOfType(param1);
            for (_loc6_ of _loc5_?.values() ?? []) {
                if (_loc6_.hasPart(param2, param3)) {
                    return _loc6_;
                }
            }
        }
        return null;
    }

    private getBodyPartsInAvatarSet(param1: Map<any, any>, param2: string): any[] {
        let _loc6_: GeometryBodyPart = null;
        let _loc4_: any = null;
        let _loc5_: any[] = [];
        let _loc3_: any[] = this.getBodyPartIdsInAvatarSet(param2);
        for (_loc4_ of _loc3_ ?? []) {
            _loc6_ = param1.get(_loc4_);
            if (_loc6_ != null) {
                _loc5_.push(_loc6_);
            }
        }
        return _loc5_;
    }

    private placeBodyPartBefore(param1: any[], param2: string, param3: string): void {
        let _loc5_: number = param1.indexOf(param2);
        if (_loc5_ == -1) {
            return;
        }
        param1.splice(_loc5_, 1);
        let _loc4_: number = param1.indexOf(param3);
        if (_loc4_ == -1) {
            return;
        }
        param1.splice(_loc4_, 0, param2);
    }

    private placeBodyPartAfter(param1: any[], param2: string, param3: string): void {
        let _loc5_: number = param1.indexOf(param2);
        if (_loc5_ == -1) {
            return;
        }
        param1.splice(_loc5_, 1);
        let _loc4_: number = param1.indexOf(param3);
        if (_loc4_ == -1) {
            return;
        }
        param1.splice(_loc4_ + 1, 0, param2);
    }

    public getBodyPartsAtAngle(param1: string, param2: number, param3: string): any[] {
        let _loc12_: GeometryBodyPart = null;
        let _loc8_: number = NaN;
        let _loc9_: any = null;
        if (param3 == null) {
            Logger.log("[AvatarModelGeometry] ERROR: Geometry ID not found for action: ");
            return [];
        }
        let _loc4_: Map<any, any> = this.getBodyPartsOfType(param3);
        let _loc7_: any[] = this.getBodyPartsInAvatarSet(_loc4_, param1);
        let _loc10_: any[] = [];
        let _loc5_: any[] = [];
        this._SafeStr_3575 = Matrix4x4.getYRotationMatrix(param2);
        for (_loc12_ of _loc7_ ?? []) {
            _loc12_.applyTransform(this._SafeStr_3575);
            _loc8_ = _loc12_.getDistance(this._camera);
            _loc10_.push([_loc8_, _loc12_]);
        }
        _loc10_.sort(this.orderByDistance);
        for (_loc9_ of _loc10_ ?? []) {
            _loc12_ = asInstanceOf(_loc9_[1], GeometryBodyPart);
            _loc5_.push(_loc12_.id);
        }
        for (const _loc6_ of this._SafeStr_5284?.keys() ?? []) {
            this.placeBodyPartBefore(_loc5_, stringOrNull(_loc6_), stringOrNull(this._SafeStr_5284.get(_loc6_)));
        }
        for (const _loc11_ of this._SafeStr_5418?.keys() ?? []) {
            this.placeBodyPartAfter(_loc5_, stringOrNull(_loc11_), stringOrNull(this._SafeStr_5418.get(_loc11_)));
        }
        return _loc5_;
    }

    public getParts(param1: string, param2: string, param3: number, param4: any[], param5: IAvatarImage): any[] {
        let _loc6_: GeometryBodyPart = null;
        if (this.hasBodyPart(param1, param2)) {
            _loc6_ = asInstanceOf(this.getBodyPartsOfType(param1).get(param2), GeometryBodyPart);
            this._SafeStr_3575 = Matrix4x4.getYRotationMatrix(param3);
            return _loc6_.getParts(this._SafeStr_3575, this._camera, param4, param5);
        }
        return [];
    }

    private orderByDistance = (param1: any[], param2: any[]): number => {
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
}
