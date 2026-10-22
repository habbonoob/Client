import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IPlaneRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/IPlaneRasterizer';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { PlaneMaskManager } from '@/com/sulake/habbo/room/object/visualization/room/mask/PlaneMaskManager';
import { LandscapeRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/animated/LandscapeRasterizer';
import { FloorRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/FloorRasterizer';
import { WallAdRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/WallAdRasterizer';
import { WallRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/WallRasterizer';
import { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';

export class RoomVisualizationData implements IRoomObjectVisualizationData {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room::RoomVisualizationData'); }

    constructor() {
        this._wallRasterizer = new WallRasterizer();
        this._floorRasterizer = new FloorRasterizer();
        this._wallAdRasterizr = new WallAdRasterizer();
        this._landscapeRasterizer = new LandscapeRasterizer();
        this._maskManager = new PlaneMaskManager();
    }

    declare private _wallRasterizer: WallRasterizer;

    declare private _floorRasterizer: FloorRasterizer;

    declare private _wallAdRasterizr: WallAdRasterizer;

    declare private _landscapeRasterizer: LandscapeRasterizer;

    declare private _maskManager: PlaneMaskManager;

    private _initialized: boolean = false;

    public get initialized(): boolean {
        return this._initialized;
    }

    public get floorRasterizer(): IPlaneRasterizer {
        return this._floorRasterizer;
    }

    public get wallRasterizer(): IPlaneRasterizer {
        return this._wallRasterizer;
    }

    public get wallAdRasterizr(): WallAdRasterizer {
        return this._wallAdRasterizr;
    }

    public get landscapeRasterizer(): IPlaneRasterizer {
        return this._landscapeRasterizer;
    }

    public get maskManager(): PlaneMaskManager {
        return this._maskManager;
    }

    public dispose(): void {
        if (this._wallRasterizer != null) {
            this._wallRasterizer.dispose();
            this._wallRasterizer = null;
        }
        if (this._floorRasterizer != null) {
            this._floorRasterizer.dispose();
            this._floorRasterizer = null;
        }
        if (this._wallAdRasterizr != null) {
            this._wallAdRasterizr.dispose();
            this._wallAdRasterizr = null;
        }
        if (this._landscapeRasterizer != null) {
            this._landscapeRasterizer.dispose();
            this._landscapeRasterizer = null;
        }
        if (this._maskManager != null) {
            this._maskManager.dispose();
            this._maskManager = null;
        }
    }

    public clearCache(): void {
        if (this._wallRasterizer != null) {
            this._wallRasterizer.clearCache();
        }
        if (this._floorRasterizer != null) {
            this._floorRasterizer.clearCache();
        }
        if (this._landscapeRasterizer != null) {
            this._landscapeRasterizer.clearCache();
        }
    }

    public initialize(param1: XML): boolean {
        let _loc4_: XML = null;
        let _loc3_: XML = null;
        let _loc7_: XML = null;
        let _loc11_: XML = null;
        let _loc6_: XML = null;
        this.reset();
        if (param1 == null) {
            return false;
        }
        let _loc5_: XMLList = param1.child("wallData");
        if (_loc5_.length() > 0) {
            _loc4_ = _loc5_.item(0);
            this._wallRasterizer.initialize(_loc4_);
        }
        let _loc2_: XMLList = param1.child("floorData");
        if (_loc2_.length() > 0) {
            _loc3_ = _loc2_.item(0);
            this._floorRasterizer.initialize(_loc3_);
        }
        let _loc10_: XMLList = param1.child("wallAdData");
        if (_loc10_.length() > 0) {
            _loc7_ = _loc10_.item(0);
            this._wallAdRasterizr.initialize(_loc7_);
        }
        let _loc8_: XMLList = param1.child("landscapeData");
        if (_loc8_.length() > 0) {
            _loc11_ = _loc8_.item(0);
            this._landscapeRasterizer.initialize(_loc11_);
        }
        let _loc9_: XMLList = param1.child("maskData");
        if (_loc9_.length() > 0) {
            _loc6_ = _loc9_.item(0);
            this._maskManager.initialize(_loc6_);
        }
        return true;
    }

    public initializeAssetCollection(param1: IGraphicAssetCollection): void {
        if (this._initialized) {
            return;
        }
        this._wallRasterizer.initializeAssetCollection(param1);
        this._floorRasterizer.initializeAssetCollection(param1);
        this._wallAdRasterizr.initializeAssetCollection(param1);
        this._landscapeRasterizer.initializeAssetCollection(param1);
        this._maskManager.initializeAssetCollection(param1);
        this._initialized = true;
    }

    protected reset(): void {
    }

    get [IRoomObjectVisualizationData](): true {
        return true;
    }
}
