import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectController } from '@/com/sulake/room/object/IRoomObjectController';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { BufferedRoomObjectModelDataEvent } from '@/com/sulake/habbo/room/utils/BufferedRoomObjectModelDataEvent';

export class _SafeCls_6115 implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::_SafeCls_6115'); }

    private _rooms: UtilsMap = new UtilsMap();
    private _events: EventDispatcher = new EventDispatcher();

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor() {
    }

    private static disposeRoomData(param1: UtilsMap): void {
        let _loc4_: number = 0;
        let _loc3_: UtilsMap = null;
        let _loc2_: number = 0;
        let _loc5_: UtilsMap = null;
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            _loc3_ = asInstanceOf(param1.getWithIndex(_loc4_), UtilsMap);
            _loc2_ = 0;
            while (_loc2_ < _loc3_.length) {
                _loc5_ = asInstanceOf(_loc3_.getWithIndex(_loc2_), UtilsMap);
                _loc5_.dispose();
                _loc2_++;
            }
            _loc3_.dispose();
            _loc4_++;
        }
        param1.dispose();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get events(): IEventDispatcher {
        return this._events;
    }

    public setData(param1: number, param2: number, param3: number, param4: string, param5: any): void {
        if (param5 == null) {
            this.removeData(param1, param2, param3, param4);
            return;
        }
        let _loc6_: UtilsMap = this.getDataByType(param1, param2, param3, true);
        if (_loc6_.hasKey(param4)) {
            _loc6_.replace(param4, param5);
        } else {
            _loc6_.add(param4, param5);
        }
    }

    public getData(param1: number, param2: number, param3: number, param4: string): any {
        let _loc5_: UtilsMap = this.getDataByType(param1, param2, param3, false);
        return _loc5_ == null ? null : _loc5_.getValue(param4);
    }

    public removeData(param1: number, param2: number, param3: number, param4: string): any {
        let _loc6_: UtilsMap = this.getDataByType(param1, param2, param3, false);
        if (_loc6_ == null) {
            return null;
        }
        let _loc5_: any = _loc6_.remove(param4);
        if (_loc6_.length == 0) {
            this.removeObjectData(param1, param2, param3, _loc6_);
        }
        return _loc5_;
    }

    public clearDataType(param1: number, param2: string): void {
        let _loc7_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: UtilsMap = null;
        let _loc3_: number = 0;
        let _loc8_: number = 0;
        let _loc9_: UtilsMap = null;
        let _loc5_: UtilsMap = asInstanceOf(this._rooms.getValue(param1), UtilsMap);
        if (_loc5_ == null) {
            return;
        }
        _loc7_ = _loc5_.length - 1;
        while (_loc7_ >= 0) {
            _loc6_ = _loc5_.getKey(_loc7_) | 0;
            _loc4_ = asInstanceOf(_loc5_.getWithIndex(_loc7_), UtilsMap);
            _loc3_ = _loc4_.length - 1;
            while (_loc3_ >= 0) {
                _loc8_ = _loc4_.getKey(_loc3_) | 0;
                _loc9_ = asInstanceOf(_loc4_.getWithIndex(_loc3_), UtilsMap);
                _loc9_.remove(param2);
                if (_loc9_.length == 0) {
                    _loc4_.remove(_loc8_);
                    _loc9_.dispose();
                }
                _loc3_--;
            }
            if (_loc4_.length == 0) {
                _loc5_.remove(_loc6_);
                _loc4_.dispose();
            }
            _loc7_--;
        }
        if (_loc5_.length == 0) {
            this._rooms.remove(param1);
            _loc5_.dispose();
        }
    }

    public clearObject(param1: number, param2: number, param3: number): void {
        let _loc4_: UtilsMap = this.getDataByType(param1, param2, param3, false);
        if (_loc4_ != null) {
            this.removeObjectData(param1, param2, param3, _loc4_);
        }
    }

    public clearRoom(param1: number): void {
        let _loc2_: UtilsMap = asInstanceOf(this._rooms.remove(param1), UtilsMap);
        if (_loc2_ != null) {
            _SafeCls_6115.disposeRoomData(_loc2_);
        }
    }

    public captureObject(param1: number, param2: number, param3: number, param4: IRoomObjectController): void {
        this._events.dispatchEvent(new BufferedRoomObjectModelDataEvent("BROMDME_CAPTURE", param1, param2, param3, param4));
    }

    public restoreObject(param1: number, param2: number, param3: number, param4: IRoomObjectController): void {
        let _loc8_: number = 0;
        let _loc6_: any = null;
        let _loc9_: BufferedRoomObjectModelDataEvent = null;
        let _loc10_: UtilsMap = this.getDataByType(param1, param2, param3, false);
        if (_loc10_ == null) {
            return;
        }
        let _loc5_: string[] = new Array<string>(0).fill(null);
        _loc8_ = 0;
        while (_loc8_ < _loc10_.length) {
            _loc5_.push(String(_loc10_.getKey(_loc8_)));
            _loc8_++;
        }
        for (const _loc7_ of _loc5_ ?? []) {
            _loc6_ = this.getData(param1, param2, param3, _loc7_);
            if (_loc6_ != null) {
                _loc9_ = new BufferedRoomObjectModelDataEvent("BROMDME_RESTORE", param1, param2, param3, param4, _loc7_, _loc6_);
                this._events.dispatchEvent(_loc9_);
                if (_loc9_.restored && this.getData(param1, param2, param3, _loc7_) === _loc6_) {
                    this.removeData(param1, param2, param3, _loc7_);
                }
            }
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        while (this._rooms.length > 0) {
            this.clearRoom(this._rooms.getKey(0) | 0);
        }
        this._rooms.dispose();
        this._rooms = null;
        this._events = null;
        this._disposed = true;
    }

    private getDataByType(param1: number, param2: number, param3: number, param4: boolean): UtilsMap {
        let _loc6_: UtilsMap = asInstanceOf(this._rooms.getValue(param1), UtilsMap);
        if (_loc6_ == null) {
            if (!param4) {
                return null;
            }
            _loc6_ = new UtilsMap();
            this._rooms.add(param1, _loc6_);
        }
        let _loc5_: UtilsMap = asInstanceOf(_loc6_.getValue(param3), UtilsMap);
        if (_loc5_ == null) {
            if (!param4) {
                return null;
            }
            _loc5_ = new UtilsMap();
            _loc6_.add(param3, _loc5_);
        }
        let _loc7_: UtilsMap = asInstanceOf(_loc5_.getValue(param2), UtilsMap);
        if (_loc7_ == null && param4) {
            _loc7_ = new UtilsMap();
            _loc5_.add(param2, _loc7_);
        }
        return _loc7_;
    }

    private removeObjectData(param1: number, param2: number, param3: number, param4: UtilsMap): void {
        let _loc6_: UtilsMap = asInstanceOf(this._rooms.getValue(param1), UtilsMap);
        let _loc5_: UtilsMap = asInstanceOf(_loc6_.getValue(param3), UtilsMap);
        _loc5_.remove(param2);
        param4.dispose();
        if (_loc5_.length == 0) {
            _loc6_.remove(param3);
            _loc5_.dispose();
        }
        if (_loc6_.length == 0) {
            this._rooms.remove(param1);
            _loc6_.dispose();
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
