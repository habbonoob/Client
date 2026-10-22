import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { embedBytes } from '@habbo-pixi/runtime/embed/embed';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import { Shader } from '@habbo-pixi/runtime/display/Shader';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { ShaderFilter } from '@habbo-pixi/runtime/filters/ShaderFilter';
import { ByteArray } from '@habbo-pixi/runtime/utils/ByteArray';
import { Logger } from '@/com/sulake/habbo/Logger';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';

const _loc11__binAsset = embedBytes("roomevents/_loc11_.bin");

export class RoomObjectHighLighter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::RoomObjectHighLighter'); }

    declare private _roomEvents: HabboUserDefinedRoomEvents;

    declare private _filterBW: any[];

    declare private _filterBWWall: any[];

    declare private _SafeStr_5892: any[];

    declare private _dualPicking1Filter: any[];

    declare private _dualPicking2Filter: any[];

    constructor(param1: HabboUserDefinedRoomEvents) {
        this._roomEvents = param1;
        let _loc5_: number = 154;
        let _loc12_: number = 0.75;
        let _loc9_: number = 25.5;
        let _loc13_: number = 25.5;
        let _loc15_: any[] = [1 - _loc12_, 0, 0, 0, _loc12_ * _loc5_, 0, 1 - _loc12_, 0, 0, _loc12_ * _loc5_ + _loc9_, 0, 0, 1 - _loc12_, 0, _loc12_ * _loc5_ + _loc13_, 0, 0, 0, 1, 0];
        let _loc6_: ColorMatrixFilter = new ColorMatrixFilter(_loc15_);
        // [Embed(source="/_assets/_loc11_.bin", mimeType="application/octet-stream")]
        const _loc11_ = _loc11__binAsset;
        let _loc10_: Shader = new Shader(asInstanceOf(new _loc11_(), ByteArray));
        let _loc2_: ShaderFilter = new ShaderFilter(_loc10_);
        this._filterBW = [_loc6_, _loc2_];
        let _loc3_: GlowFilter = new GlowFilter(16777215, 1, 5, 5, 3, 1, true, false);
        this._filterBWWall = [_loc6_, _loc2_, _loc3_];
        let _loc7_: any[] = [0.9, 0, 0, 0, 0, 0, 1, 0, 0, 40, 0, 0, 1, 0, 80, 0, 0, 0, 0.8, 0];
        let _loc8_: ColorMatrixFilter = new ColorMatrixFilter(_loc7_);
        this._SafeStr_5892 = [_loc8_];
        let _loc14_: any[] = [1.13, 0, 0, 0, 35, 0, 1.13, 0, 0, 35, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
        this._dualPicking1Filter = [new ColorMatrixFilter(_loc14_)];
        let _loc4_: any[] = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1.15, 0, 40, 0, 0, 0, 1, 0];
        this._dualPicking2Filter = [new ColorMatrixFilter(_loc4_)];
    }

    public static addFiltersToFurni(param1: IRoomObject, param2: any[], param3: boolean = false): void {
        if (!param1) {
            return;
        }
        if (RoomObjectHighLighter.hasFilters(param1, param2)) {
            return;
        }
        let _loc4_: FurnitureVisualization = asInstanceOf(param1.getVisualization(), FurnitureVisualization);
        Logger.log("Furni visualization: " + _loc4_);
        let _loc5_: any[] = _loc4_.filters == null ? [] : _loc4_.filters;
        _loc5_ = param3 ? param2.concat(_loc5_) : _loc5_.concat(param2);
        _loc4_.filters = _loc5_;
    }

    public static removeFiltersFromFurni(param1: IRoomObject, param2: any[]): void {
        let _loc5_: number = 0;
        if (!param1) {
            return;
        }
        let _loc4_: FurnitureVisualization = asInstanceOf(param1.getVisualization(), FurnitureVisualization);
        Logger.log("Furni visualization: " + _loc4_);
        if (_loc4_.filters == null) {
            return;
        }
        let _loc6_: any[] = _loc4_.filters.slice();
        for (const _loc3_ of param2 ?? []) {
            _loc5_ = _loc6_.indexOf(_loc3_);
            if (_loc5_ != -1) {
                _loc6_.splice(_loc5_, 1)[0];
            }
        }
        _loc4_.filters = _loc6_;
    }

    public static hasFilters(param1: IRoomObject, param2: any[]): boolean {
        let _loc5_: number = 0;
        if (!param1) {
            return false;
        }
        let _loc4_: FurnitureVisualization = asInstanceOf(param1.getVisualization(), FurnitureVisualization);
        if (_loc4_.filters == null) {
            return false;
        }
        let _loc6_: any[] = _loc4_.filters.slice();
        for (const _loc3_ of param2 ?? []) {
            _loc5_ = _loc6_.indexOf(_loc3_);
            if (_loc5_ != -1) {
                return true;
            }
        }
        return false;
    }

    public hide(param1: number, param2: boolean, param3: number): void {
        this.inactivateFurni(this.getFurni(param1), param1 < 0, param2, param3);
    }

    public hideAll(param1: Map<any, any>, param2: boolean, param3: number): void {
        for (const _loc4_ of param1?.keys() ?? []) {
            Logger.log("Show furni as unselected: " + _loc4_);
            this.inactivateFurni(this.getFurni(parseInt(stringOrNull(_loc4_)) | 0), _loc4_ < 0, param2, param3);
        }
    }

    public show(param1: number, param2: boolean, param3: number): void {
        this.activateFurni(this.getFurni(param1), param1 < 0, param2, param3);
    }

    public showAll(param1: Map<any, any>, param2: boolean, param3: number): void {
        for (const _loc4_ of param1?.keys() ?? []) {
            Logger.log("Show furni as selected: " + _loc4_);
            this.activateFurni(this.getFurni(parseInt(stringOrNull(_loc4_)) | 0), _loc4_ < 0, param2, param3);
        }
    }

    private getFurni(param1: number): IRoomObject {
        if (param1 < 0) {
            param1 = -param1;
            return this._roomEvents.roomEngine.getRoomObject(this._roomEvents.roomId, param1, 20);
        }
        return this._roomEvents.roomEngine.getRoomObject(this._roomEvents.roomId, param1, 10);
    }

    public highlightActiveWired(param1: number): void {
        RoomObjectHighLighter.addFiltersToFurni(this.getFurni(param1), this._SafeStr_5892);
    }

    public unhighlightActiveWired(param1: number): void {
        RoomObjectHighLighter.removeFiltersFromFurni(this.getFurni(param1), this._SafeStr_5892);
    }

    private activateFurni(param1: IRoomObject, param2: boolean, param3: boolean, param4: number): void {
        RoomObjectHighLighter.addFiltersToFurni(param1, param2 ? this._filterBWWall : this._filterBW, true);
        if (param3) {
            RoomObjectHighLighter.addFiltersToFurni(param1, param4 == 1 ? this._dualPicking1Filter : this._dualPicking2Filter);
        }
    }

    private inactivateFurni(param1: IRoomObject, param2: boolean, param3: boolean, param4: number): void {
        RoomObjectHighLighter.removeFiltersFromFurni(param1, param2 ? this._filterBWWall : this._filterBW);
        if (param3) {
            RoomObjectHighLighter.removeFiltersFromFurni(param1, param4 == 1 ? this._dualPicking1Filter : this._dualPicking2Filter);
            if (RoomObjectHighLighter.hasFilters(param1, param4 == 1 ? this._dualPicking2Filter : this._dualPicking1Filter)) {
                RoomObjectHighLighter.addFiltersToFurni(param1, param2 ? this._filterBWWall : this._filterBW, true);
            }
        }
    }
}
