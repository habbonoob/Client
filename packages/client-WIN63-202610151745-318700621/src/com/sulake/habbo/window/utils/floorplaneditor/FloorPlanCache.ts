import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { FloorHeightMapMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/FloorHeightMapMessageEvent';
import type { RoomOccupiedTilesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/layout/RoomOccupiedTilesMessageEvent';
import type { RoomOccupiedTilesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/layout/RoomOccupiedTilesMessageParser';
import type { BCFloorPlanEditor } from '@/com/sulake/habbo/window/utils/floorplaneditor/BCFloorPlanEditor';
import type { Point } from '@habbo-pixi/runtime/geom/Point';

export class FloorPlanCache {
    static { registerClassName(this, 'com.sulake.habbo.window.utils.floorplaneditor::FloorPlanCache'); }

    private readonly MAX_AREA: number = 3025;
    private readonly MAX_AXIS_LENGTH: number = 64;

    declare private _bcFloorPlanEditor: BCFloorPlanEditor;

    declare private _floorWidth: number;
    static { (this.prototype as any)._floorWidth = 0; }

    declare private _floorHeight: number;
    static { (this.prototype as any)._floorHeight = 0; }

    declare private _floorPlanCache: any[];

    private _floorPlanCacheBuffer: any[] = null;

    declare private _reservedTiles: any[];

    declare private _entryPoint: Point;

    declare private _entryPointDir: number;
    static { (this.prototype as any)._entryPointDir = 0; }

    declare private _showedPopup: boolean;
    static { (this.prototype as any)._showedPopup = false; }

    constructor(param1: BCFloorPlanEditor) {
        this._bcFloorPlanEditor = param1;
    }

    public onFloorHeightMap(param1: FloorHeightMapMessageEvent): void {
        this.updateFloorPlanCache(param1.getParser().text);
        this._showedPopup = false;
    }

    public onOccupiedTiles(param1: RoomOccupiedTilesMessageEvent): void {
        let _loc2_: RoomOccupiedTilesMessageParser = null;
        if (this._floorPlanCache) {
            _loc2_ = param1.getParser();
            this.resetReservedTiles();
            for (const _loc3_ of _loc2_.occupiedTiles ?? []) {
                this._reservedTiles[_loc3_.y][_loc3_.x] = true;
            }
        }
    }

    private resetReservedTiles(): void {
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        this._reservedTiles = [];
        _loc2_ = 0;
        while (_loc2_ < this.floorHeight) {
            this._reservedTiles.push([]);
            _loc1_ = 0;
            while (_loc1_ < this.floorWidth) {
                this._reservedTiles[_loc2_].push(false);
                _loc1_++;
            }
            _loc2_++;
        }
    }

    private updateFloorPlanCache(param1: string = ""): void {
        let _loc2_: any[] = param1.split("\r");
        this._floorPlanCache = [];
        for (const _loc3_ of _loc2_ ?? []) {
            if (_loc3_.length > 0) {
                this._floorPlanCache.push(_loc3_);
            }
        }
        this.checkDimensions();
    }

    private checkDimensions(): boolean {
        this._floorWidth = -1;
        this._floorHeight = -1;
        if (this._floorPlanCache.length == 0) {
            return false;
        }
        let _loc1_: number = String(this._floorPlanCache[0]).length;
        let _loc3_: number = 0;
        for (const _loc2_ of this._floorPlanCache ?? []) {
            if (_loc2_.length == 0) {
                break;
            }
            _loc3_++;
        }
        this._floorWidth = _loc1_;
        this._floorHeight = _loc3_;
        return true;
    }

    private allowDrawAt(param1: number, param2: number): boolean {
        if (this._floorPlanCache == null || !this.checkSizeLimits(param2 + 1 >>> 0, param1 + 1 >>> 0)) {
            return false;
        }
        if (param1 == 0 || param2 == 0) {
            return this.isDoorTileAllowedAt(param1, param2);
        }
        return true;
    }

    private isDoorTileAllowedAt(param1: number, param2: number): boolean {
        return this.isFirstColumnZeroOrHasDoorAt(param1, param2) && this.isFirstRowZeroOrHasDoorAt(param1, param2);
    }

    private isFirstColumnZeroOrHasDoorAt(param1: number, param2: number): boolean {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._floorHeight) {
            if (_loc3_ != param2 && this._floorPlanCache[_loc3_].substr(0, 1) != "x") {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    private isFirstRowZeroOrHasDoorAt(param1: number, param2: number): boolean {
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._floorWidth) {
            if (_loc3_ != param1 && this._floorPlanCache[0].substr(_loc3_, 1) != "x") {
                return false;
            }
            _loc3_++;
        }
        return true;
    }

    public setHeightAt(param1: number, param2: number, param3: number): boolean {
        if (param1 < 0 || param2 < 0) {
            return false;
        }
        if (!this.allowDrawAt(param1, param2)) {
            return false;
        }
        while (param1 >= this._floorWidth) {
            if (!this.addColumn()) {
                return false;
            }
        }
        while (param2 >= this._floorHeight) {
            if (!this.addRow()) {
                return false;
            }
        }
        if (this.isTileReserved(param1, param2)) {
            return false;
        }
        this._floorPlanCache[param2] = this.setCharAt(String(this._floorPlanCache[param2]), param3 < 0 ? "x" : param3.toString(33), param1);
        return true;
    }

    public getHeightAt(param1: number, param2: number): number {
        if (this._floorPlanCache == null || param1 < 0 || param1 >= this._floorWidth || param2 < 0 || param2 >= this._floorHeight) {
            return -1;
        }
        let _loc3_: string = String(this._floorPlanCache[param2]).charAt(param1);
        return (_loc3_ == "x" ? -1 : Number(parseInt(_loc3_, 33))) | 0;
    }

    private setCharAt(param1: string, param2: string, param3: number): string {
        return param1.substr(0, param3) + param2 + param1.substr(param3 + 1);
    }

    public get floorWidth(): number {
        return this._floorWidth;
    }

    public get floorHeight(): number {
        return this._floorHeight;
    }

    public getData(): string {
        let _loc1_: number = 0;
        let _loc2_: string = "";
        _loc1_ = 0;
        while (_loc1_ < this._floorPlanCache.length) {
            _loc2_ = _loc2_ + this._floorPlanCache[_loc1_] + "\r";
            _loc1_++;
        }
        return _loc2_;
    }

    public isTileReserved(param1: number, param2: number): boolean {
        if (!this._reservedTiles) {
            return false;
        }
        if (this._reservedTiles.length < param2 + 1) {
            return false;
        }
        if (this._reservedTiles[param2].length < param1 + 1) {
            return false;
        }
        return this._reservedTiles[param2][param1];
    }

    public isEntryPoint(param1: number, param2: number): boolean {
        if (!this._entryPoint) {
            return false;
        }
        return this._entryPoint.x == param1 && this._entryPoint.y == param2;
    }

    public get entryPoint(): Point {
        return this._entryPoint;
    }

    public set entryPoint(param1: Point) {
        this._entryPoint = param1;
    }

    public get entryPointDir(): number {
        return this._entryPointDir | 0;
    }

    public set entryPointDir(param1: number) {
        if (param1 < 0) {
            param1 = 7;
        }
        if (param1 > 7) {
            param1 = 0;
        }
        this._entryPointDir = param1 >>> 0;
    }

    private addColumn(param1: boolean = false): boolean {
        let _loc2_: number = 0;
        if (!this.checkSizeLimits(this._floorWidth + 1 >>> 0, this._floorHeight >>> 0)) {
            if (!this._showedPopup && !param1) {
                this._bcFloorPlanEditor.windowManager.simpleAlert("${floor.plan.editor.alert}", null, "${floor.plan.editor.size.limit.exceeded}");
                this._bcFloorPlanEditor.heightMapEditor.drawing = false;
                this._showedPopup = true;
            }
            return false;
        }
        _loc2_ = 0;
        while (_loc2_ < this._floorHeight) {
            if (String(this._floorPlanCache[_loc2_]).length > 0) {
                this._floorPlanCache[_loc2_] += "x";
                this._reservedTiles[_loc2_].push(false);
            }
            _loc2_++;
        }
        this._floorWidth += 1;
        return true;
    }

    private addRow(param1: boolean = false): boolean {
        let _loc3_: number = 0;
        if (!this.checkSizeLimits(this._floorWidth >>> 0, this._floorHeight + 1 >>> 0)) {
            if (!this._showedPopup && !param1) {
                this._bcFloorPlanEditor.windowManager.simpleAlert("${floor.plan.editor.alert}", null, "${floor.plan.editor.size.limit.exceeded}");
                this._bcFloorPlanEditor.heightMapEditor.drawing = false;
                this._showedPopup = true;
            }
            return false;
        }
        let _loc2_: string = "";
        _loc3_ = 0;
        while (_loc3_ < this._floorWidth) {
            _loc2_ += "x";
            _loc3_++;
        }
        this._floorPlanCache.push(_loc2_);
        let _loc4_: any[] = [];
        _loc3_ = 0;
        while (_loc3_ < this._floorWidth) {
            _loc4_.push(false);
            _loc3_++;
        }
        this._reservedTiles.push(_loc4_);
        this._floorHeight += 1;
        return true;
    }

    public attemptExpandColumns(param1: number): boolean {
        while (param1 >= this.floorWidth) {
            if (!this.addColumn(true)) {
                return false;
            }
        }
        return true;
    }

    public attemptExpandRows(param1: number): boolean {
        while (param1 >= this.floorHeight) {
            if (!this.addRow(true)) {
                return false;
            }
        }
        return true;
    }

    private checkSizeLimits(param1: number, param2: number): boolean {
        return !(!this._bcFloorPlanEditor.largeFloorPlansAllowed && (param1 - 1) * (param2 - 1) > 3025 || param1 > 64 || param2 > 64);
    }

    public initTemporaryCache(): void {
        this._floorPlanCacheBuffer = this._floorPlanCache;
        this.clearTemporaryCache();
    }

    public clearTemporaryCache(): void {
        let _loc1_: number = 0;
        if (this._floorPlanCacheBuffer != null) {
            this._floorPlanCache = [];
            _loc1_ = 0;
            while (_loc1_ < this._floorPlanCacheBuffer.length) {
                this._floorPlanCache.push(this._floorPlanCacheBuffer[_loc1_]);
                _loc1_++;
            }
            this.checkDimensions();
        }
    }

    public submitTemporaryCache(): void {
        this._floorPlanCacheBuffer = null;
    }
}
