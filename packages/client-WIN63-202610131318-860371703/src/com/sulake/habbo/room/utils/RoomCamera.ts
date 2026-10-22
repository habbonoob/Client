import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomCamera {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::RoomCamera'); }

    private static readonly MOVE_SPEED_DENOMINATOR: number = 12;
    private _targetId: number = -1;
    private _SafeStr_6218: number = -2;
    private _SafeStr_2390: Vector3d = null;
    private _SafeStr_3850: number = 0;
    private _SafeStr_4441: number = 0;
    private _SafeStr_5452: boolean = false;
    private _location: Vector3d = null;
    private _targetObjectLoc: Vector3d = new Vector3d();
    private _limitedLocationX: boolean = false;
    private _limitedLocationY: boolean = false;
    private _SafeStr_6820: boolean = false;
    private _centeredLocY: boolean = false;
    private _SafeStr_7226: number = 0;
    private _SafeStr_6359: number = 0;
    private _scale: number = 0;
    private _roomWd: number = 0;
    private _SafeStr_6830: number = 0;
    private _geometryUpdateId: number = -1;
    private _SafeStr_5078: boolean = false;

    declare private _SafeStr_6997: number;
    static { (this.prototype as any)._SafeStr_6997 = 0; }

    constructor() {
    }

    public get location(): IVector3d {
        return this._location;
    }

    public get targetId(): number {
        return this._targetId;
    }

    public get targetCategory(): number {
        return this._SafeStr_6218;
    }

    public get targetObjectLoc(): IVector3d {
        return this._targetObjectLoc;
    }

    public get limitedLocationX(): boolean {
        return this._limitedLocationX;
    }

    public get limitedLocationY(): boolean {
        return this._limitedLocationY;
    }

    public get centeredLocX(): boolean {
        return this._SafeStr_6820;
    }

    public get centeredLocY(): boolean {
        return this._centeredLocY;
    }

    public get screenWd(): number {
        return this._SafeStr_7226;
    }

    public get screenHt(): number {
        return this._SafeStr_6359;
    }

    public get scale(): number {
        return this._scale;
    }

    public get roomWd(): number {
        return this._roomWd;
    }

    public get roomHt(): number {
        return this._SafeStr_6830;
    }

    public get geometryUpdateId(): number {
        return this._geometryUpdateId;
    }

    public get isMoving(): boolean {
        if (this._SafeStr_2390 != null && this._location != null) {
            return true;
        }
        return false;
    }

    public set targetId(param1: number) {
        this._targetId = param1;
    }

    public set targetObjectLoc(param1: IVector3d) {
        this._targetObjectLoc.assign(param1);
    }

    public set targetCategory(param1: number) {
        this._SafeStr_6218 = param1;
    }

    public set limitedLocationX(param1: boolean) {
        this._limitedLocationX = param1;
    }

    public set limitedLocationY(param1: boolean) {
        this._limitedLocationY = param1;
    }

    public set centeredLocX(param1: boolean) {
        this._SafeStr_6820 = param1;
    }

    public set centeredLocY(param1: boolean) {
        this._centeredLocY = param1;
    }

    public set screenWd(param1: number) {
        this._SafeStr_7226 = param1;
    }

    public set screenHt(param1: number) {
        this._SafeStr_6359 = param1;
    }

    public set scale(param1: number) {
        if (this._scale != param1) {
            this._scale = param1;
            this._SafeStr_5078 = true;
        }
    }

    public set roomWd(param1: number) {
        this._roomWd = param1;
    }

    public set roomHt(param1: number) {
        this._SafeStr_6830 = param1;
    }

    public set geometryUpdateId(param1: number) {
        this._geometryUpdateId = param1;
    }

    public set target(param1: IVector3d) {
        let _loc2_: Vector3d = null;
        if (this._SafeStr_2390 == null) {
            this._SafeStr_2390 = new Vector3d();
        }
        if (this._SafeStr_2390.x != param1.x || this._SafeStr_2390.y != param1.y || this._SafeStr_2390.z != param1.z) {
            this._SafeStr_2390.assign(param1);
            _loc2_ = Vector3d.dif(this._SafeStr_2390, this._location);
            this._SafeStr_3850 = _loc2_.length;
            this._SafeStr_5452 = true;
        }
    }

    public dispose(): void {
        this._SafeStr_2390 = null;
        this._location = null;
    }

    public initializeLocation(param1: IVector3d): void {
        if (this._location != null) {
            return;
        }
        this._location = new Vector3d();
        this._location.assign(param1);
    }

    public resetLocation(param1: IVector3d): void {
        if (this._location == null) {
            this._location = new Vector3d();
        }
        this._location.assign(param1);
    }

    public update(param1: number, param2: number): void {
        let _loc4_: Vector3d = null;
        let _loc5_: number = NaN;
        let _loc6_: number = NaN;
        let _loc3_: number = NaN;
        let _loc7_: number = NaN;
        if (this._SafeStr_6997 > 0 && this._SafeStr_2390 != null && this._location != null) {
            if (this._SafeStr_5078) {
                this._SafeStr_5078 = false;
                this._location = this._SafeStr_2390;
                this._SafeStr_2390 = null;
                return;
            }
            _loc4_ = Vector3d.dif(this._SafeStr_2390, this._location);
            if (_loc4_.length > this._SafeStr_3850) {
                this._SafeStr_3850 = _loc4_.length;
            }
            if (_loc4_.length <= param2) {
                this._location = this._SafeStr_2390;
                this._SafeStr_2390 = null;
                this._SafeStr_4441 = 0;
            } else {
                _loc5_ = Number(Math.sin(3.141592653589793 * _loc4_.length / this._SafeStr_3850));
                _loc6_ = param2 * 0.5;
                _loc3_ = this._SafeStr_3850 / 12;
                _loc7_ = _loc6_ + (_loc3_ - _loc6_) * _loc5_;
                if (this._SafeStr_5452) {
                    if (_loc7_ < this._SafeStr_4441) {
                        _loc7_ = this._SafeStr_4441;
                        if (_loc7_ > _loc4_.length) {
                            _loc7_ = _loc4_.length;
                        }
                    } else {
                        this._SafeStr_5452 = false;
                    }
                }
                this._SafeStr_4441 = _loc7_;
                _loc4_.div(_loc4_.length);
                _loc4_.mul(_loc7_);
                this._location = Vector3d.sum(this._location, _loc4_);
            }
        }
    }

    public reset(): void {
        this._geometryUpdateId = -1;
    }

    public activateFollowing(param1: number): void {
        this._SafeStr_6997 = param1;
    }
}
