import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomPlaneBitmapMaskData } from '@/com/sulake/habbo/room/object/RoomPlaneBitmapMaskData';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class RoomPlaneBitmapMaskParser {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomPlaneBitmapMaskParser'); }

    constructor() {
        this._masks = new UtilsMap();
    }

    private _masks: UtilsMap = null;

    public get maskCount(): number {
        return this._masks.length | 0;
    }

    public dispose(): void {
        if (this._masks != null) {
            this.reset();
            this._masks.dispose();
            this._masks = null;
        }
    }

    public initialize(param1: XML): boolean {
        let _loc3_: number = 0;
        let _loc14_: XML = null;
        let _loc12_: string = null;
        let _loc5_: string = null;
        let _loc10_: Vector3d = null;
        let _loc13_: string = null;
        let _loc6_: XMLList = null;
        let _loc11_: XML = null;
        let _loc2_: RoomPlaneBitmapMaskData = null;
        if (param1 == null) {
            return false;
        }
        this._masks.reset();
        let _loc7_: any[] = ["id", "type", "category"];
        let _loc8_: any[] = ["x", "y", "z"];
        let _loc9_: XMLList = null;
        let _loc4_: XMLList = param1.child("planeMask");
        _loc3_ = 0;
        while (_loc3_ < _loc4_.length()) {
            _loc14_ = _loc4_.item(_loc3_);
            if (!XMLValidator.checkRequiredAttributes(_loc14_, _loc7_)) {
                return false;
            }
            _loc12_ = _loc14_.attribute("id").toString();
            _loc5_ = _loc14_.attribute("type").toString();
            _loc10_ = null;
            _loc13_ = _loc14_.attribute("category").toString();
            _loc6_ = _loc14_.child("location");
            if (_loc6_.length() != 1) {
                return false;
            }
            _loc11_ = _loc6_.item(0);
            if (!XMLValidator.checkRequiredAttributes(_loc11_, _loc8_)) {
                return false;
            }
            _loc10_ = new Vector3d(Number(_loc11_.attribute("x")), Number(_loc11_.attribute("y")), Number(_loc11_.attribute("z")));
            _loc2_ = new RoomPlaneBitmapMaskData(_loc5_, _loc10_, _loc13_);
            this._masks.add(_loc12_, _loc2_);
            _loc3_++;
        }
        return true;
    }

    public reset(): void {
        let _loc1_: number = 0;
        let _loc2_: RoomPlaneBitmapMaskData = null;
        _loc1_ = 0;
        while (_loc1_ < this._masks.length) {
            _loc2_ = asInstanceOf(this._masks.getWithIndex(_loc1_), RoomPlaneBitmapMaskData);
            if (_loc2_ != null) {
                _loc2_.dispose();
            }
            _loc1_++;
        }
        this._masks.reset();
    }

    public addMask(param1: string, param2: string, param3: IVector3d, param4: string): void {
        let _loc5_: RoomPlaneBitmapMaskData = new RoomPlaneBitmapMaskData(param2, param3, param4);
        this._masks.remove(param1);
        this._masks.add(param1, _loc5_);
    }

    public removeMask(param1: string): boolean {
        let _loc2_: RoomPlaneBitmapMaskData = asInstanceOf(this._masks.remove(param1), RoomPlaneBitmapMaskData);
        if (_loc2_ != null) {
            _loc2_.dispose();
            return true;
        }
        return false;
    }

    public getXML(): XML {
        let _loc4_: number = 0;
        let _loc5_: string = null;
        let _loc6_: string = null;
        let _loc3_: XML = null;
        let _loc1_: IVector3d = null;
        let _loc2_: XML = new XML(`<planeMasks/>`);
        _loc4_ = 0;
        while (_loc4_ < this.maskCount) {
            _loc5_ = this.getMaskType(_loc4_);
            _loc6_ = this.getMaskCategory(_loc4_);
            _loc3_ = new XML(`<planeMask id="${XML.escapeAttribute(_loc4_)}" type="${XML.escapeAttribute(_loc5_)}" category="${XML.escapeAttribute(_loc6_)}"/>`);
            _loc1_ = this.getMaskLocation(_loc4_);
            if (_loc1_ != null) {
                _loc3_.appendChild(new XML(`<location x="${XML.escapeAttribute(_loc1_.x)}" y="${XML.escapeAttribute(_loc1_.y)}" z="${XML.escapeAttribute(_loc1_.z)}"/>`));
                _loc2_.appendChild(_loc3_);
            }
            _loc4_++;
        }
        return _loc2_;
    }

    public getMaskLocation(param1: number): IVector3d {
        if (param1 < 0 || param1 >= this.maskCount) {
            return null;
        }
        let _loc2_: RoomPlaneBitmapMaskData = asInstanceOf(this._masks.getWithIndex(param1), RoomPlaneBitmapMaskData);
        if (_loc2_ != null) {
            return _loc2_.loc;
        }
        return null;
    }

    public getMaskType(param1: number): string {
        if (param1 < 0 || param1 >= this.maskCount) {
            return null;
        }
        let _loc2_: RoomPlaneBitmapMaskData = asInstanceOf(this._masks.getWithIndex(param1), RoomPlaneBitmapMaskData);
        if (_loc2_ != null) {
            return _loc2_.type;
        }
        return null;
    }

    public getMaskCategory(param1: number): string {
        if (param1 < 0 || param1 >= this.maskCount) {
            return null;
        }
        let _loc2_: RoomPlaneBitmapMaskData = asInstanceOf(this._masks.getWithIndex(param1), RoomPlaneBitmapMaskData);
        if (_loc2_ != null) {
            return _loc2_.category;
        }
        return null;
    }
}
