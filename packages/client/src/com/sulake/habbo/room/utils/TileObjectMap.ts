import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class TileObjectMap {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::TileObjectMap'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        TileObjectMap.#initStatics();
        return TileObjectMap._log;
    }

    constructor(param1: number, param2: number) {
        let _loc3_: number = 0;
        this._tileObjectMap = new Array<IRoomObject[]>(param2 >>> 0).fill(null);
        _loc3_ = 0;
        while (_loc3_ < param2) {
            this._tileObjectMap[_loc3_] = new Array<IRoomObject>(param1 >>> 0).fill(null);
            _loc3_++;
        }
        this._width = param1;
        this._height = param2;
    }

    declare private _tileObjectMap: IRoomObject[][];

    private _width: number = 0;
    private _height: number = 0;

    public clear(): void {
        let _loc2_: number = 0;
        for (const _loc1_ of this._tileObjectMap ?? []) {
            _loc2_ = 0;
            while (_loc2_ < this._width) {
                _loc1_[_loc2_] = null;
                _loc2_++;
            }
        }
    }

    public populate(param1: any[]): void {
        this.clear();
        for (const _loc2_ of param1 ?? []) {
            this.addRoomObject(_loc2_);
        }
    }

    public dispose(): void {
        this._tileObjectMap = null;
        this._width = 0;
        this._height = 0;
    }

    public getObjectIntTile(param1: number, param2: number): IRoomObject {
        if (param1 >= 0 && param1 < this._width && param2 >= 0 && param2 < this._height) {
            return this._tileObjectMap[param2][param1];
        }
        return null;
    }

    public setObjectInTile(param1: number, param2: number, param3: IRoomObject): void {
        if (!param3.isInitialized()) {
            TileObjectMap._log.warn("Assigning non initialized object to tile object map!");
            return;
        }
        if (param1 >= 0 && param1 < this._width && param2 >= 0 && param2 < this._height) {
            this._tileObjectMap[param2][param1] = param3;
        }
    }

    public addRoomObject(param1: IRoomObject): void {
        let _loc4_: IRoomObject = null;
        let _loc8_: number = 0;
        let _loc6_: number = 0;
        if (param1 == null || param1.getModel() == null || !param1.isInitialized()) {
            return;
        }
        let _loc2_: IVector3d = param1.getLocation();
        if (_loc2_ == null) {
            return;
        }
        let _loc9_: IVector3d = param1.getDirection();
        if (_loc9_ == null) {
            return;
        }
        let _loc5_: any = param1.getModel().getNumber("furniture_size_x") | 0;
        let _loc10_: any = param1.getModel().getNumber("furniture_size_y") | 0;
        if (_loc5_ < 1) {
            _loc5_ = 1;
        }
        if (_loc10_ < 1) {
            _loc10_ = 1;
        }
        let _loc3_: any = 0;
        let _loc7_: number = (_loc9_.x + 45 | 0) % 360 / 90 | 0;
        if (_loc7_ == 1 || _loc7_ == 3) {
            _loc3_ = _loc5_;
            _loc5_ = _loc10_;
            _loc10_ = _loc3_;
        }
        _loc8_ = _loc2_.y | 0;
        while (_loc8_ < _loc2_.y + _loc10_) {
            _loc6_ = _loc2_.x | 0;
            while (_loc6_ < _loc2_.x + _loc5_) {
                _loc4_ = this.getObjectIntTile(_loc6_, _loc8_);
                if (!_loc4_ || _loc4_ != param1 && _loc4_.getLocation().z <= _loc2_.z) {
                    this.setObjectInTile(_loc6_, _loc8_, param1);
                }
                _loc6_++;
            }
            _loc8_++;
        }
    }

    public toString(): string {
        let _loc4_: IRoomObject = null;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc1_: string = "";
        _loc3_ = 0;
        while (_loc3_ < this._height) {
            _loc2_ = 0;
            while (_loc2_ < this._width) {
                _loc4_ = this._tileObjectMap[_loc3_][_loc2_];
                _loc1_ += (_loc4_ ? _loc4_.getId() : "x") + "\t";
                _loc2_++;
            }
            _loc1_ += "\n";
            _loc3_++;
        }
        return _loc1_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TileObjectMap.#staticsReady) return;
        TileObjectMap.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TileObjectMap, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.room.utils.TileObjectMap"));
    }
}
