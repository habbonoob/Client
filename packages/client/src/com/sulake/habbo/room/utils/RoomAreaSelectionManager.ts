import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { RoomObjectTileMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectTileMouseEvent';
import type { IRoomAreaSelectionManager } from '@/com/sulake/habbo/room/IRoomAreaSelectionManager';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';
import { RoomVisualization } from '@/com/sulake/habbo/room/object/visualization/room/RoomVisualization';

export class RoomAreaSelectionManager implements IRoomAreaSelectionManager {
    static { registerClassName(this, 'com.sulake.habbo.room.utils::RoomAreaSelectionManager'); }

    static #staticsReady = false;

    private static get HIGHLIGHT_FILTERS(): any {
        RoomAreaSelectionManager.#initStatics();
        return RoomAreaSelectionManager.HIGHLIGHT_FILTERS;
    }

    public static NOT_ACTIVE: number = 0;
    public static NOT_SELECTING_AREA: number = 1;
    public static AWAITING_MOUSE_DOWN: number = 2;
    public static SELECTING: number = 3;

    private static createHighlightFilters(): any {
        let _loc3_: any = {};
        let _loc4_: any[] = [1.5, 0, 0, 0, 0, 0, 1.5, 0, 0, 20, 0, 0, 1.5, 0, 20, 0, 0, 0, 1, 0];
        let _loc2_: any[] = [1.05, 0, 0, 0, 0, 0, 1.3, 0, 0, 8, 0, 0, 1.8, 0, 20, 0, 0, 0, 1, 0];
        let _loc1_: any[] = [0.55, 0, 0, 0, -10, 0, 0.55, 0, 0, -10, 0, 0, 0.55, 0, -10, 0, 0, 0, 1, 0];
        _loc3_["highlight_brighten"] = [new ColorMatrixFilter(_loc4_)];
        _loc3_["highlight_blue"] = [new ColorMatrixFilter(_loc2_)];
        _loc3_["highlight_darken"] = [new ColorMatrixFilter(_loc1_)];
        return _loc3_;
    }

    constructor(param1: IRoomEngine) {
        this._roomEngine = param1;
        this._roomEngine.events.addEventListener("REOE_ADDED", this.onRoomObjectAdded);
    }

    declare private _roomEngine: IRoomEngine;

    private _areaSelectionState: number = RoomAreaSelectionManager.NOT_ACTIVE;
    private _SafeStr_4018: number = 0;
    private _SafeStr_3898: number = 0;
    private _targetX: number = 0;
    private _targetY: number = 0;
    private _highlightRootX: number = 0;
    private _highlightRootY: number = 0;
    private _highlightWidth: number = 0;
    private _highlightHeight: number = 0;

    declare private _callback: (...args: any[]) => any;

    private _highlightType: string = "highlight_brighten";

    public get areaSelectionState(): number {
        return this._areaSelectionState;
    }

    public startSelecting(): void {
        if (this._areaSelectionState == RoomAreaSelectionManager.NOT_SELECTING_AREA) {
            this.clearHighlightSilent();
            this._areaSelectionState = RoomAreaSelectionManager.AWAITING_MOUSE_DOWN;
            this._roomEngine.setMoveBlocked(true);
        }
    }

    public finishSelecting(): boolean {
        if (this._areaSelectionState == RoomAreaSelectionManager.SELECTING) {
            this._areaSelectionState = RoomAreaSelectionManager.NOT_SELECTING_AREA;
            this._roomEngine.setMoveBlocked(false);
            if (this._callback != null) {
                this._callback(this._highlightRootX, this._highlightRootY, this._highlightWidth, this._highlightHeight);
            }
            return true;
        }
        return false;
    }

    public clearHighlight(): void {
        if (this._areaSelectionState == RoomAreaSelectionManager.NOT_ACTIVE) {
            return;
        }
        this.clearHighlightSilent();
        this._areaSelectionState = RoomAreaSelectionManager.NOT_SELECTING_AREA;
        this._roomEngine.setMoveBlocked(false);
        if (this._callback != null) {
            this._callback(0, 0, 0, 0);
        }
    }

    public setHighlight(param1: number, param2: number, param3: number, param4: number): void {
        let _loc5_: RoomVisualization = null;
        if (this._areaSelectionState == RoomAreaSelectionManager.NOT_ACTIVE) {
            return;
        }
        this._highlightRootX = param1;
        this._highlightRootY = param2;
        this._highlightWidth = param3;
        this._highlightHeight = param4;
        let _loc6_: IRoomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);
        if (_loc6_ != null) {
            _loc5_ = asInstanceOf(_loc6_.getVisualization(), RoomVisualization);
            _loc5_.initializeHighlightArea(param1, param2, param3, param4, RoomAreaSelectionManager.HIGHLIGHT_FILTERS[this._highlightType]);
        }
    }

    public activate(param1: (...args: any[]) => any, param2: string): boolean {
        let _loc3_: FurnitureVisualization = null;
        if (this._areaSelectionState != RoomAreaSelectionManager.NOT_ACTIVE) {
            return false;
        }
        this._callback = param1;
        this._highlightType = param2;
        for (const _loc4_ of this.getAllFurnis() ?? []) {
            _loc3_ = asInstanceOf(_loc4_.getVisualization(), FurnitureVisualization);
            if (_loc3_ != null) {
                _loc3_.lookThrough = true;
            }
        }
        this._areaSelectionState = RoomAreaSelectionManager.NOT_SELECTING_AREA;
        return true;
    }

    public deactivate(): void {
        let _loc1_: FurnitureVisualization = null;
        if (this._areaSelectionState == RoomAreaSelectionManager.NOT_ACTIVE) {
            return;
        }
        this._callback = null;
        for (const _loc2_ of this.getAllFurnis() ?? []) {
            _loc1_ = asInstanceOf(_loc2_.getVisualization(), FurnitureVisualization);
            if (_loc1_ != null) {
                _loc1_.lookThrough = false;
            }
        }
        this.clearHighlight();
        this._areaSelectionState = RoomAreaSelectionManager.NOT_ACTIVE;
    }

    public dispose(): void {
        this.deactivate();
        this._roomEngine.events.removeEventListener("REOE_ADDED", this.onRoomObjectAdded);
    }

    private getAllFurnis(): any[] {
        return this._roomEngine.getObjectsByCategory(20).concat(this._roomEngine.getObjectsByCategory(10));
    }

    private clearHighlightSilent(): void {
        let _loc1_: RoomVisualization = null;
        let _loc2_: IRoomObject = this._roomEngine.getRoomObject(this._roomEngine.activeRoomId, -1, 0);
        if (_loc2_ != null) {
            _loc1_ = asInstanceOf(_loc2_.getVisualization(), RoomVisualization);
            _loc1_.clearHighlightArea();
        }
    }

    public handleTileMouseEvent(param1: RoomObjectTileMouseEvent): void {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: boolean = this._areaSelectionState == RoomAreaSelectionManager.AWAITING_MOUSE_DOWN && param1.type == "ROE_MOUSE_DOWN";
        if (param1.shiftKey && this._areaSelectionState == RoomAreaSelectionManager.NOT_SELECTING_AREA && param1.type == "ROE_MOUSE_DOWN") {
            this.startSelecting();
            _loc3_ = true;
        }
        if (_loc3_) {
            this._areaSelectionState = RoomAreaSelectionManager.SELECTING;
            this._SafeStr_4018 = param1.tileXAsInt;
            this._SafeStr_3898 = param1.tileYAsInt;
            this._targetX = param1.tileXAsInt;
            this._targetY = param1.tileYAsInt;
            this.setHighlight(this._SafeStr_4018, this._SafeStr_3898, 1, 1);
        } else if (this._areaSelectionState == RoomAreaSelectionManager.SELECTING && param1.type == "ROE_MOUSE_MOVE") {
            if (param1.tileXAsInt != this._targetX || param1.tileYAsInt != this._targetY) {
                this._targetX = param1.tileXAsInt;
                this._targetY = param1.tileYAsInt;
                if (this._targetX > this._SafeStr_4018) {
                    _loc4_ = this._SafeStr_4018;
                    _loc2_ = this._targetX - this._SafeStr_4018 + 1;
                } else {
                    _loc4_ = this._targetX;
                    _loc2_ = this._SafeStr_4018 - this._targetX + 1;
                }
                if (this._targetY > this._SafeStr_3898) {
                    _loc5_ = this._SafeStr_3898;
                    _loc6_ = this._targetY - this._SafeStr_3898 + 1;
                } else {
                    _loc5_ = this._targetY;
                    _loc6_ = this._SafeStr_3898 - this._targetY + 1;
                }
                this.setHighlight(_loc4_, _loc5_, _loc2_, _loc6_);
            }
        }
    }

    private onRoomObjectAdded = (param1: RoomEngineObjectEvent): void => {
        let _loc2_: FurnitureVisualization = null;
        if (this._areaSelectionState == RoomAreaSelectionManager.NOT_ACTIVE) {
            return;
        }
        if (param1.type != "REOE_ADDED") {
            return;
        }
        if (param1.roomId != this._roomEngine.activeRoomId) {
            return;
        }
        if (param1.category != 10 && param1.category != 20) {
            return;
        }
        let _loc3_: IRoomObject = this._roomEngine.getRoomObject(param1.roomId, param1.objectId, param1.category);
        if (_loc3_) {
            _loc2_ = asInstanceOf(_loc3_.getVisualization(), FurnitureVisualization);
            if (_loc2_ != null) {
                _loc2_.lookThrough = true;
            }
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomAreaSelectionManager.#staticsReady) return;
        RoomAreaSelectionManager.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomAreaSelectionManager, name, { value, writable: true, configurable: true, enumerable: true });
        set("HIGHLIGHT_FILTERS", null);
        set("HIGHLIGHT_FILTERS", RoomAreaSelectionManager.createHighlightFilters());
    }
}
