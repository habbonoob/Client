import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IRoomObjectManager } from '@/com/sulake/room/IRoomObjectManager';
import { isIRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { RoomObject } from '@/com/sulake/room/object/RoomObject';

export class RoomObjectManager implements IRoomObjectManager {
    static { registerClassName(this, 'com.sulake.room::RoomObjectManager'); }

    declare private _SafeStr_2502: UtilsMap;

    declare private _SafeStr_2930: UtilsMap;

    constructor() {
        this._SafeStr_2502 = new UtilsMap();
        this._SafeStr_2930 = new UtilsMap();
    }

    public dispose(): void {
        this.reset();
        if (this._SafeStr_2502 != null) {
            this._SafeStr_2502.dispose();
            this._SafeStr_2502 = null;
        }
        if (this._SafeStr_2930 != null) {
            this._SafeStr_2930.dispose();
            this._SafeStr_2930 = null;
        }
    }

    public createObject(param1: number, param2: number, param3: string): IRoomObjectController {
        let _loc4_: RoomObject = new RoomObject(param1, param2 | 0, param3);
        return this.addObject(String(param1), param3, _loc4_);
    }

    private addObject(param1: string, param2: string, param3: IRoomObjectController): IRoomObjectController {
        if (this._SafeStr_2502.getValue(param1) != null) {
            param3.dispose();
            return null;
        }
        this._SafeStr_2502.add(param1, param3);
        let _loc4_: UtilsMap = this.getObjectsForType(param2);
        _loc4_.add(param1, param3);
        return param3;
    }

    private getObjectsForType(param1: string, param2: boolean = true): UtilsMap {
        let _loc3_: UtilsMap = this._SafeStr_2930.getValue(param1);
        if (_loc3_ == null && param2) {
            _loc3_ = new UtilsMap();
            this._SafeStr_2930.add(param1, _loc3_);
        }
        return _loc3_;
    }

    public getObject(param1: number): IRoomObjectController {
        return asGuarded(this._SafeStr_2502.getValue(String(param1)), isIRoomObjectController);
    }

    public getObjects(): any[] {
        return this._SafeStr_2502.getValues();
    }

    public getObjectWithIndex(param1: number): IRoomObjectController {
        return asGuarded(this._SafeStr_2502.getWithIndex(param1), isIRoomObjectController);
    }

    public getObjectCount(): number {
        return this._SafeStr_2502.length | 0;
    }

    public getObjectCountForType(param1: string): number {
        let _loc2_: UtilsMap = this.getObjectsForType(param1, false);
        if (_loc2_ != null) {
            return _loc2_.length | 0;
        }
        return 0;
    }

    public getObjectWithIndexAndType(param1: number, param2: string): IRoomObjectController {
        let _loc4_: any = null;
        let _loc3_: UtilsMap = this.getObjectsForType(param2, false);
        if (_loc3_ != null) {
            return asGuarded(_loc3_.getWithIndex(param1), isIRoomObjectController);
        }
        return null;
    }

    public disposeObject(param1: number): boolean {
        let _loc4_: string = null;
        let _loc2_: UtilsMap = null;
        let _loc3_: string = String(param1);
        let _loc5_: RoomObject = asInstanceOf(this._SafeStr_2502.remove(_loc3_), RoomObject);
        if (_loc5_ != null) {
            _loc4_ = _loc5_.getType();
            _loc2_ = this.getObjectsForType(_loc4_, false);
            if (_loc2_ != null) {
                _loc2_.remove(_loc3_);
            }
            _loc5_.dispose();
            return true;
        }
        return false;
    }

    public reset(): void {
        let _loc2_: number = 0;
        let _loc4_: IRoomObjectController = null;
        let _loc3_: number = 0;
        let _loc1_: UtilsMap = null;
        if (this._SafeStr_2502 != null) {
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2502.length) {
                _loc4_ = asGuarded(this._SafeStr_2502.getWithIndex(_loc2_), isIRoomObjectController);
                if (_loc4_ != null) {
                    _loc4_.dispose();
                }
                _loc2_++;
            }
            this._SafeStr_2502.reset();
        }
        if (this._SafeStr_2930 != null) {
            _loc3_ = 0;
            while (_loc3_ < this._SafeStr_2930.length) {
                _loc1_ = asInstanceOf(this._SafeStr_2930.getWithIndex(_loc3_), UtilsMap);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc3_++;
            }
            this._SafeStr_2930.reset();
        }
    }

    get [IRoomObjectManager](): true {
        return true;
    }
}
