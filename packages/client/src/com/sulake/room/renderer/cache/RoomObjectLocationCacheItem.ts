import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomObjectLocationCacheItem {
    static { registerClassName(this, 'com.sulake.room.renderer.cache::RoomObjectLocationCacheItem'); }

    constructor(param1: string) {
        this._roomObjectVariableAccurateZ = param1;
        this._SafeStr_2784 = new Vector3d();
        this._SafeStr_3307 = new Vector3d();
    }

    private _roomObjectVariableAccurateZ: string = "";
    private _geometryUpdateId: number = -1;
    private _SafeStr_6982: number = -1;
    private _SafeStr_4686: Vector3d = new Vector3d();
    private _SafeStr_2784: Vector3d = null;
    private _SafeStr_3307: Vector3d = null;
    private _locationChanged: boolean = false;

    public get locationChanged(): boolean {
        return this._locationChanged;
    }

    public dispose(): void {
        this._SafeStr_2784 = null;
        this._SafeStr_3307 = null;
    }

    public getScreenLocation(param1: IRoomObject, param2: IRoomGeometry): IVector3d {
        let _loc7_: IVector3d = null;
        let _loc3_: number = NaN;
        let _loc5_: IVector3d = null;
        if (param1 == null || param2 == null) {
            return null;
        }
        let _loc4_: boolean = false;
        let _loc6_: IVector3d = param1.getLocation();
        if (param2.updateId != this._geometryUpdateId || param1.getUpdateID() != this._SafeStr_6982) {
            this._SafeStr_6982 = param1.getUpdateID();
            if (param2.updateId != this._geometryUpdateId || _loc6_.x != this._SafeStr_4686.x || _loc6_.y != this._SafeStr_4686.y || _loc6_.z != this._SafeStr_4686.z) {
                this._geometryUpdateId = param2.updateId;
                this._SafeStr_4686.assign(_loc6_);
                _loc4_ = true;
            }
        }
        this._locationChanged = _loc4_;
        if (_loc4_) {
            _loc7_ = param2.getScreenPosition(_loc6_);
            if (_loc7_ == null) {
                return null;
            }
            _loc3_ = param1.getModel().getNumber(this._roomObjectVariableAccurateZ);
            if (isNaN(_loc3_) || _loc3_ == 0) {
                this._SafeStr_3307.x = Math.round(_loc6_.x);
                this._SafeStr_3307.y = Math.round(_loc6_.y);
                this._SafeStr_3307.z = _loc6_.z;
                if (this._SafeStr_3307.x != _loc6_.x || this._SafeStr_3307.y != _loc6_.y) {
                    _loc5_ = param2.getScreenPosition(this._SafeStr_3307);
                    this._SafeStr_2784.assign(_loc7_);
                    if (_loc5_ != null) {
                        this._SafeStr_2784.z = _loc5_.z;
                    }
                } else {
                    this._SafeStr_2784.assign(_loc7_);
                }
            } else {
                this._SafeStr_2784.assign(_loc7_);
            }
            this._SafeStr_2784.x = Math.round(this._SafeStr_2784.x);
            this._SafeStr_2784.y = Math.round(this._SafeStr_2784.y);
        }
        return this._SafeStr_2784;
    }
}
