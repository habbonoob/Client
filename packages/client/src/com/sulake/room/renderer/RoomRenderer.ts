import { asGuarded, asInstanceOf, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomRenderingCanvas } from '@/com/sulake/room/renderer/IRoomRenderingCanvas';
import type { IRoomSpriteCanvasContainer } from '@/com/sulake/room/renderer/IRoomSpriteCanvasContainer';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { ErrorReportStorage } from '@/com/sulake/core/utils/ErrorReportStorage';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { IRoomRenderer } from '@/com/sulake/room/renderer/IRoomRenderer';
import { isIRoomRenderingCanvas } from '@/com/sulake/room/renderer/IRoomRenderingCanvas';
import { RoomSpriteCanvas } from '@/com/sulake/room/renderer/RoomSpriteCanvas';
import { RotatingRoomSpriteCanvas } from '@/com/sulake/room/renderer/RotatingRoomSpriteCanvas';
import { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';

export class RoomRenderer implements IRoomRenderer, IRoomSpriteCanvasContainer {
    static { registerClassName(this, 'com.sulake.room.renderer::RoomRenderer'); }

    constructor(param1: Component) {
        this._SafeStr_2502 = new UtilsMap();
        this._canvases = new UtilsMap();
        if (param1 != null) {
            this._component = param1;
        }
    }

    declare private _SafeStr_2502: UtilsMap;

    declare private _canvases: UtilsMap;

    declare private _component: Component;

    private _roomObjectVariableAccurateZ: string = null;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get roomObjectVariableAccurateZ(): string {
        return this._roomObjectVariableAccurateZ;
    }

    public set roomObjectVariableAccurateZ(param1: string) {
        this._roomObjectVariableAccurateZ = param1;
    }

    public dispose(): void {
        let _loc2_: number = 0;
        let _loc1_: RoomSpriteCanvas = null;
        if (this.disposed) {
            return;
        }
        if (this._canvases != null) {
            _loc2_ = 0;
            while (_loc2_ < this._canvases.length) {
                _loc1_ = asInstanceOf(this._canvases.getWithIndex(_loc2_), RoomSpriteCanvas);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._canvases.dispose();
            this._canvases = null;
        }
        if (this._SafeStr_2502 != null) {
            this._SafeStr_2502.dispose();
            this._SafeStr_2502 = null;
        }
        if (this._component != null) {
            this._component = null;
        }
        this._disposed = true;
    }

    public reset(): void {
        this._SafeStr_2502.reset();
    }

    public getRoomObjectIdentifier(param1: IRoomObject): string {
        if (param1 != null) {
            return String(param1.getInstanceId());
        }
        return null;
    }

    public feedRoomObject(param1: IRoomObject): void {
        if (param1 == null) {
            return;
        }
        this._SafeStr_2502.add(this.getRoomObjectIdentifier(param1), param1);
    }

    public removeRoomObject(param1: IRoomObject): void {
        let _loc3_: number = 0;
        let _loc2_: RoomSpriteCanvas = null;
        let _loc4_: string = this.getRoomObjectIdentifier(param1);
        this._SafeStr_2502.remove(_loc4_);
        _loc3_ = 0;
        while (_loc3_ < this._canvases.length) {
            _loc2_ = asInstanceOf(this._canvases.getWithIndex(_loc3_), RoomSpriteCanvas);
            if (_loc2_ != null) {
                _loc2_.roomObjectRemoved(_loc4_);
            }
            _loc3_++;
        }
    }

    public getRoomObject(param1: string): IRoomObject {
        return asGuarded(this._SafeStr_2502.getValue(param1), isIRoomObject);
    }

    public getRoomObjectWithIndex(param1: number): IRoomObject {
        return asGuarded(this._SafeStr_2502.getWithIndex(param1), isIRoomObject);
    }

    public getRoomObjectIdWithIndex(param1: number): string {
        return asGuarded(this._SafeStr_2502.getKey(param1), isString);
    }

    public getRoomObjectCount(): number {
        return this._SafeStr_2502.length | 0;
    }

    public render(): void {
        let _loc3_: number = 0;
        let _loc2_: IRoomRenderingCanvas = null;
        let _loc1_: number = getTimer();
        ErrorReportStorage.addDebugData("Canvas count", String(this._canvases.length));
        _loc3_ = this._canvases.length - 1;
        while (_loc3_ >= 0) {
            _loc2_ = asGuarded(this._canvases.getWithIndex(_loc3_), isIRoomRenderingCanvas);
            if (_loc2_ != null) {
                _loc2_.render(_loc1_);
            }
            _loc3_--;
        }
    }

    public createCanvas(param1: number, param2: number, param3: number, param4: number): IRoomRenderingCanvas {
        let _loc6_: RoomGeometry = null;
        let _loc5_: IRoomRenderingCanvas = asGuarded(this._canvases.getValue(String(param1)), isIRoomRenderingCanvas);
        if (_loc5_ != null) {
            _loc5_.initialize(param2, param3);
            _loc6_ = asInstanceOf(_loc5_.geometry, RoomGeometry);
            if (_loc6_) {
                _loc6_.scale = param4;
            }
            return _loc5_;
        }
        _loc5_ = this.createCanvasInstance(param1, param2, param3, param4);
        this._canvases.add(String(param1), _loc5_);
        return _loc5_;
    }

    public getCanvas(param1: number): IRoomRenderingCanvas {
        return asGuarded(this._canvases.getValue(String(param1)), isIRoomRenderingCanvas);
    }

    public disposeCanvas(param1: number): boolean {
        let _loc2_: RoomSpriteCanvas = asInstanceOf(this._canvases.remove(String(param1)), RoomSpriteCanvas);
        if (_loc2_ != null) {
            _loc2_.dispose();
        }
        return false;
    }

    public update(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: RoomSpriteCanvas = null;
        this.render();
        _loc3_ = this._canvases.length - 1;
        while (_loc3_ >= 0) {
            _loc2_ = asInstanceOf(this._canvases.getWithIndex(_loc3_), RoomSpriteCanvas);
            if (_loc2_ != null) {
                _loc2_.update();
            }
            _loc3_--;
        }
    }

    protected createCanvasInstance(param1: number, param2: number, param3: number, param4: number): IRoomRenderingCanvas {
        return new RotatingRoomSpriteCanvas(this, param1, param2, param3, param4);
    }

    get [IRoomRenderer](): true {
        return true;
    }
}
