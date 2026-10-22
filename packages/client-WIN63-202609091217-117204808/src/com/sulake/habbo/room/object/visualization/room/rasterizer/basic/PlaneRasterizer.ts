import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PlaneMaterialCellMatrix } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterialCellMatrix';
import type { PlaneVisualization } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneVisualization';
import type { IPlaneRasterizer } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/IPlaneRasterizer';
import type { PlaneBitmapData } from '@/com/sulake/habbo/room/object/visualization/room/utils/PlaneBitmapData';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IGraphicAssetCollection } from '@/com/sulake/room/object/visualization/utils/IGraphicAssetCollection';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Plane } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/Plane';
import { PlaneMaterial } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterial';
import { PlaneMaterialCell } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneMaterialCell';
import { PlaneTexture } from '@/com/sulake/habbo/room/object/visualization/room/rasterizer/basic/PlaneTexture';
import { BitmapDataUtil } from '@/com/sulake/room/utils/BitmapDataUtil';
import { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class PlaneRasterizer implements IPlaneRasterizer {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.room.rasterizer.basic::PlaneRasterizer'); }

    protected static readonly DEFAULT_TYPE: string = "default";
    private _assetCollection: IGraphicAssetCollection = null;
    private _materials: UtilsMap = null;
    private _textures: UtilsMap = null;
    private _planes: UtilsMap = null;
    private _geometries: UtilsMap = null;
    private _data: XML = null;

    constructor() {
        this._textures = new UtilsMap();
        this._materials = new UtilsMap();
        this._planes = new UtilsMap();
        this._geometries = new UtilsMap();
    }

    protected get data(): XML {
        return this._data;
    }

    protected get assetCollection(): IGraphicAssetCollection {
        return this._assetCollection;
    }

    public initializeDimensions(param1: number, param2: number): boolean {
        return true;
    }

    public dispose(): void {
        let _loc1_: Plane = null;
        let _loc3_: RoomGeometry = null;
        let _loc2_: number = 0;
        if (this._planes != null) {
            _loc2_ = 0;
            while (_loc2_ < this._planes.length) {
                _loc1_ = asInstanceOf(this._planes.getWithIndex(_loc2_), Plane);
                if (_loc1_ != null) {
                    _loc1_.dispose();
                }
                _loc2_++;
            }
            this._planes.dispose();
            this._planes = null;
        }
        if (this._materials != null) {
            this.resetMaterials();
            this._materials.dispose();
            this._materials = null;
        }
        if (this._textures != null) {
            this.resetTextures();
            this._textures.dispose();
            this._textures = null;
        }
        if (this._geometries != null) {
            _loc2_ = 0;
            while (_loc2_ < this._geometries.length) {
                _loc3_ = this._geometries.getWithIndex(_loc2_);
                if (_loc3_ != null) {
                    _loc3_.dispose();
                }
                _loc2_++;
            }
            this._geometries.dispose();
            this._geometries = null;
        }
        this._data = null;
        this._assetCollection = null;
    }

    public clearCache(): void {
        let _loc1_: Plane = null;
        let _loc2_: PlaneMaterial = null;
        let _loc3_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._planes.length) {
            _loc1_ = asInstanceOf(this._planes.getWithIndex(_loc3_), Plane);
            if (_loc1_ != null) {
                _loc1_.clearCache();
            }
            _loc3_++;
        }
        _loc3_ = 0;
        while (_loc3_ < this._materials.length) {
            _loc2_ = asInstanceOf(this._materials.getWithIndex(_loc3_), PlaneMaterial);
            if (_loc2_ != null) {
                _loc2_.clearCache();
            }
            _loc3_++;
        }
    }

    public initialize(param1: XML): void {
        this._data = param1;
    }

    public reinitialize(): void {
        this.resetTextures();
        this.resetMaterials();
        this.initializeAll();
    }

    private resetMaterials(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneMaterial = null;
        _loc2_ = 0;
        while (_loc2_ < this._materials.length) {
            _loc1_ = asInstanceOf(this._materials.getWithIndex(_loc2_), PlaneMaterial);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
            _loc2_++;
        }
        this._materials.reset();
    }

    private resetTextures(): void {
        let _loc2_: number = 0;
        let _loc1_: PlaneTexture = null;
        _loc2_ = 0;
        while (_loc2_ < this._textures.length) {
            _loc1_ = asInstanceOf(this._textures.getWithIndex(_loc2_), PlaneTexture);
            if (_loc1_ != null) {
                _loc1_.dispose();
            }
            _loc2_++;
        }
        this._textures.reset();
    }

    protected getTexture(param1: string): PlaneTexture {
        return asInstanceOf(this._textures.getValue(param1), PlaneTexture);
    }

    protected getMaterial(param1: string): PlaneMaterial {
        return asInstanceOf(this._materials.getValue(param1), PlaneMaterial);
    }

    protected getPlane(param1: string): Plane {
        return this._planes.getValue(param1);
    }

    protected addPlane(param1: string, param2: Plane): boolean {
        if (param2 == null) {
            return false;
        }
        if (this._planes.getValue(param1) == null) {
            this._planes.add(param1, param2);
            return true;
        }
        return false;
    }

    public initializeAssetCollection(param1: IGraphicAssetCollection): void {
        if (this.data == null) {
            return;
        }
        this._assetCollection = param1;
        this.initializeAll();
    }

    private initializeAll(): void {
        if (this.data == null) {
            return;
        }
        this.initializeTexturesAndMaterials();
        this.initializePlanes();
    }

    private initializeTexturesAndMaterials(): void {
        let _loc2_: XMLList = this.data.child("textures");
        if (_loc2_.length() > 0) {
            this.parseTextures(_loc2_.item(0), this.assetCollection);
        }
        let _loc1_: XMLList = this.data.child("materials");
        if (_loc1_.length() > 0) {
            this.parsePlaneMaterials(_loc1_.item(0));
        }
    }

    protected initializePlanes(): void {
    }

    private parseTextures(param1: XML, param2: IGraphicAssetCollection): void {
        let _loc7_: number = 0;
        let _loc6_: XML = null;
        let _loc16_: string = null;
        let _loc4_: PlaneTexture = null;
        let _loc3_: XMLList = null;
        let _loc9_: number = 0;
        let _loc13_: XML = null;
        let _loc8_: number = NaN;
        let _loc18_: number = NaN;
        let _loc10_: number = NaN;
        let _loc14_: number = NaN;
        let _loc15_: string = null;
        let _loc17_: IGraphicAsset = null;
        let _loc11_: BitmapDataAsset = null;
        let _loc12_: BitmapData = null;
        if (param1 == null || param2 == null) {
            return;
        }
        let _loc5_: XMLList = param1.child("texture");
        _loc7_ = 0;
        while (_loc7_ < _loc5_.length()) {
            _loc6_ = _loc5_.item(_loc7_);
            if (XMLValidator.checkRequiredAttributes(_loc6_, ["id"])) {
                _loc16_ = _loc6_.attribute("id").toString();
                if (this._textures.getValue(_loc16_) == null) {
                    _loc4_ = new PlaneTexture();
                    _loc3_ = _loc6_.child("bitmap");
                    _loc9_ = 0;
                    while (_loc9_ < _loc3_.length()) {
                        _loc13_ = _loc3_.item(_loc9_);
                        if (XMLValidator.checkRequiredAttributes(_loc13_, ["assetName"])) {
                            _loc8_ = -1;
                            _loc18_ = 1;
                            _loc10_ = -1;
                            _loc14_ = 1;
                            if (String(_loc13_.attribute("normalMinX")) != "") {
                                _loc8_ = parseFloat(_loc13_.attribute("normalMinX").toString());
                            }
                            if (String(_loc13_.attribute("normalMaxX")) != "") {
                                _loc18_ = parseFloat(_loc13_.attribute("normalMaxX").toString());
                            }
                            if (String(_loc13_.attribute("normalMinY")) != "") {
                                _loc10_ = parseFloat(_loc13_.attribute("normalMinY").toString());
                            }
                            if (String(_loc13_.attribute("normalMaxY")) != "") {
                                _loc14_ = parseFloat(_loc13_.attribute("normalMaxY").toString());
                            }
                            _loc15_ = _loc13_.attribute("assetName").toString();
                            _loc17_ = param2.getAsset(_loc15_);
                            if (_loc17_ != null) {
                                _loc11_ = asInstanceOf(_loc17_.asset, BitmapDataAsset);
                                if (_loc11_ != null) {
                                    _loc12_ = asInstanceOf(_loc11_.content, BitmapData);
                                    if (_loc12_ != null) {
                                        if (_loc17_.flipH) {
                                            _loc12_ = BitmapDataUtil.getFlipHBitmapData(_loc12_);
                                        } else {
                                            _loc12_ = _loc12_.clone();
                                        }
                                        _loc4_.addBitmap(_loc12_, _loc8_, _loc18_, _loc10_, _loc14_, _loc15_);
                                    }
                                }
                            }
                        }
                        _loc9_++;
                    }
                    this._textures.add(_loc16_, _loc4_);
                }
            }
            _loc7_++;
        }
    }

    private parsePlaneMaterials(param1: XML): void {
        let _loc4_: number = 0;
        let _loc15_: XML = null;
        let _loc20_: string = null;
        let _loc8_: PlaneMaterial = null;
        let _loc2_: XMLList = null;
        let _loc6_: number = 0;
        let _loc11_: XML = null;
        let _loc16_: string = null;
        let _loc12_: string = null;
        let _loc3_: number = 0;
        let _loc10_: number = 0;
        let _loc5_: number = NaN;
        let _loc21_: number = NaN;
        let _loc7_: number = NaN;
        let _loc19_: number = NaN;
        let _loc18_: XMLList = null;
        let _loc13_: PlaneMaterialCellMatrix = null;
        let _loc9_: number = 0;
        let _loc14_: XML = null;
        if (param1 == null) {
            return;
        }
        let _loc17_: XMLList = param1.child("material");
        _loc4_ = 0;
        while (_loc4_ < _loc17_.length()) {
            _loc15_ = _loc17_.item(_loc4_);
            if (XMLValidator.checkRequiredAttributes(_loc15_, ["id"])) {
                _loc20_ = _loc15_.attribute("id").toString();
                _loc8_ = new PlaneMaterial();
                _loc2_ = _loc15_.child("materialCellMatrix");
                _loc6_ = 0;
                while (_loc6_ < _loc2_.length()) {
                    _loc11_ = _loc2_.item(_loc6_);
                    _loc16_ = _loc11_.attribute("repeatMode").toString();
                    _loc12_ = _loc11_.attribute("align").toString();
                    _loc3_ = 1;
                    switch (_loc16_) {
                        case "borders":
                            _loc3_ = 2;
                            break;
                        case "center":
                            _loc3_ = 3;
                            break;
                        case "first":
                            _loc3_ = 4;
                            break;
                        case "last":
                            _loc3_ = 5;
                            break;
                        case "random":
                            _loc3_ = 6;
                    }
                    _loc10_ = 1;
                    switch (_loc12_) {
                        case "top":
                            _loc10_ = 1;
                            break;
                        case "bottom":
                            _loc10_ = 2;
                    }
                    _loc5_ = -1;
                    _loc21_ = 1;
                    _loc7_ = -1;
                    _loc19_ = 1;
                    if (String(_loc11_.attribute("normalMinX")) != "") {
                        _loc5_ = parseFloat(_loc11_.attribute("normalMinX").toString());
                    }
                    if (String(_loc11_.attribute("normalMaxX")) != "") {
                        _loc21_ = parseFloat(_loc11_.attribute("normalMaxX").toString());
                    }
                    if (String(_loc11_.attribute("normalMinY")) != "") {
                        _loc7_ = parseFloat(_loc11_.attribute("normalMinY").toString());
                    }
                    if (String(_loc11_.attribute("normalMaxY")) != "") {
                        _loc19_ = parseFloat(_loc11_.attribute("normalMaxY").toString());
                    }
                    _loc18_ = _loc11_.child("materialCellColumn");
                    if (_loc18_.length() > 0) {
                        _loc13_ = null;
                        _loc13_ = _loc8_.addMaterialCellMatrix(_loc18_.length(), _loc3_, _loc10_, _loc5_, _loc21_, _loc7_, _loc19_);
                        _loc9_ = 0;
                        while (_loc9_ < _loc18_.length()) {
                            _loc14_ = _loc18_.item(_loc9_);
                            this.parsePlaneMaterialCellColumn(_loc14_, _loc13_, _loc9_);
                            _loc9_++;
                        }
                    }
                    this._materials.add(_loc20_, _loc8_);
                    _loc6_++;
                }
            }
            _loc4_++;
        }
    }

    private parsePlaneMaterialCellColumn(param1: XML, param2: PlaneMaterialCellMatrix, param3: number): void {
        if (param1 == null || param2 == null) {
            return;
        }
        let _loc5_: string = param1.attribute("repeatMode").toString();
        let _loc7_: number = parseInt(param1.attribute("width").toString()) | 0;
        let _loc6_: number = 1;
        switch (_loc5_) {
            case "borders":
                _loc6_ = 2;
                break;
            case "center":
                _loc6_ = 3;
                break;
            case "first":
                _loc6_ = 4;
                break;
            case "last":
                _loc6_ = 5;
                break;
            case "none":
                _loc6_ = 0;
        }
        let _loc4_: any[] = this.parsePlaneMaterialCells(param1);
        param2.createColumn(param3, _loc7_, _loc4_, _loc6_);
    }

    private parsePlaneMaterialCells(param1: XML): any[] {
        let _loc6_: number = 0;
        let _loc13_: XML = null;
        let _loc8_: string = null;
        let _loc20_: any[] = null;
        let _loc21_: any[] = null;
        let _loc2_: any[] = null;
        let _loc14_: number = 0;
        let _loc3_: XMLList = null;
        let _loc10_: XML = null;
        let _loc18_: XMLList = null;
        let _loc4_: XMLList = null;
        let _loc15_: XML = null;
        let _loc12_: XML = null;
        let _loc7_: number = 0;
        let _loc16_: string = null;
        let _loc19_: IGraphicAsset = null;
        let _loc5_: PlaneTexture = null;
        let _loc9_: PlaneMaterialCell = null;
        if (param1 == null) {
            return null;
        }
        let _loc11_: any[] = [];
        let _loc17_: XMLList = param1.child("materialCell");
        _loc6_ = 0;
        while (_loc6_ < _loc17_.length()) {
            _loc13_ = _loc17_.item(_loc6_);
            _loc8_ = _loc13_.attribute("textureId").toString();
            _loc20_ = null;
            _loc21_ = null;
            _loc2_ = null;
            _loc14_ = 0;
            _loc3_ = _loc13_.child("extraItemData");
            if (_loc3_.length() > 0) {
                _loc10_ = _loc3_.item(0);
                _loc18_ = _loc10_.child("extraItemTypes");
                _loc4_ = _loc10_.child("offsets");
                if (_loc18_.length() > 0 && _loc4_.length() > 0) {
                    _loc15_ = _loc18_.item(0);
                    _loc12_ = _loc4_.item(0);
                    _loc20_ = this.parseExtraItemTypes(_loc15_);
                    _loc2_ = this.parseExtraItemOffsets(_loc12_);
                    _loc14_ = _loc2_.length | 0;
                    if (String(_loc10_.attribute("limitMax")) != "") {
                        _loc14_ = parseInt(_loc10_.attribute("limitMax").toString()) | 0;
                    }
                }
            }
            if (_loc20_ != null) {
                _loc21_ = [];
                _loc7_ = 0;
                while (_loc7_ < _loc20_.length) {
                    _loc16_ = stringOrNull(_loc20_[_loc6_]);
                    _loc19_ = this._assetCollection.getAsset(_loc16_);
                    if (_loc19_ != null) {
                        _loc21_.push(_loc19_);
                    }
                    _loc7_++;
                }
            }
            _loc5_ = this.getTexture(_loc8_);
            _loc9_ = new PlaneMaterialCell(_loc5_, _loc21_, _loc2_, _loc14_);
            _loc11_.push(_loc9_);
            _loc6_++;
        }
        if (_loc11_.length == 0) {
            _loc11_ = null;
        }
        return _loc11_;
    }

    private parseExtraItemTypes(param1: XML): any[] {
        let _loc3_: XMLList = null;
        let _loc4_: number = 0;
        let _loc5_: XML = null;
        let _loc6_: string = null;
        let _loc2_: any[] = [];
        let _loc7_: any[] = ["assetName"];
        if (param1 != null) {
            _loc3_ = param1.child("extraItemType");
            _loc4_ = 0;
            while (_loc4_ < _loc3_.length()) {
                _loc5_ = _loc3_.item(_loc4_);
                if (XMLValidator.checkRequiredAttributes(_loc5_, _loc7_)) {
                    _loc6_ = _loc5_.attribute("assetName").toString();
                    _loc2_.push(_loc6_);
                }
                _loc4_++;
            }
        }
        return _loc2_;
    }

    private parseExtraItemOffsets(param1: XML): any[] {
        let _loc4_: XMLList = null;
        let _loc6_: number = 0;
        let _loc3_: XML = null;
        let _loc5_: number = 0;
        let _loc7_: number = 0;
        let _loc2_: any[] = [];
        let _loc8_: any[] = ["x", "y"];
        if (param1 != null) {
            _loc4_ = param1.child("offset");
            _loc6_ = 0;
            while (_loc6_ < _loc4_.length()) {
                _loc3_ = _loc4_.item(_loc6_);
                if (XMLValidator.checkRequiredAttributes(_loc3_, _loc8_)) {
                    _loc5_ = parseInt(_loc3_.attribute("x").toString()) | 0;
                    _loc7_ = parseInt(_loc3_.attribute("y").toString()) | 0;
                    _loc2_.push(new Point(_loc5_, _loc7_));
                }
                _loc6_++;
            }
        }
        return _loc2_;
    }

    protected getGeometry(param1: number, param2: number, param3: number): IRoomGeometry {
        param2 = Math.abs(param2);
        if (param2 > 90) {
            param2 = 90;
        }
        param3 = Math.abs(param3);
        if (param3 > 90) {
            param3 = 90;
        }
        let _loc5_: string = param1 + "_" + Math.round(param2) + "_" + Math.round(param3);
        let _loc4_: IRoomGeometry = this._geometries.getValue(_loc5_);
        if (_loc4_ == null) {
            _loc4_ = new RoomGeometry(param1, new Vector3d(param2, param3), new Vector3d(-10, 0, 0));
            this._geometries.add(_loc5_, _loc4_);
        }
        return _loc4_;
    }

    protected parseVisualizations(param1: Plane, param2: XMLList): void {
        let _loc8_: number = 0;
        let _loc3_: XML = null;
        let _loc16_: number = 0;
        let _loc6_: string = null;
        let _loc20_: string = null;
        let _loc18_: number = NaN;
        let _loc14_: number = NaN;
        let _loc19_: XMLList = null;
        let _loc7_: PlaneVisualization = null;
        let _loc10_: number = 0;
        let _loc13_: XML = null;
        let _loc17_: PlaneMaterial = null;
        let _loc11_: number = 0;
        let _loc12_: string = null;
        let _loc21_: string = null;
        let _loc4_: number = 0;
        let _loc9_: string = null;
        let _loc5_: any = 0;
        let _loc15_: string = null;
        if (param1 == null || param2 == null) {
            return;
        }
        _loc8_ = 0;
        while (_loc8_ < param2.length()) {
            _loc3_ = param2.item(_loc8_);
            if (XMLValidator.checkRequiredAttributes(_loc3_, ["size"])) {
                _loc16_ = parseInt(_loc3_.attribute("size").toString()) | 0;
                _loc6_ = _loc3_.attribute("horizontalAngle").toString();
                _loc20_ = _loc3_.attribute("verticalAngle").toString();
                _loc18_ = 45;
                if (_loc6_ != "") {
                    _loc18_ = parseFloat(_loc6_);
                }
                _loc14_ = 30;
                if (_loc20_ != "") {
                    _loc14_ = parseFloat(_loc20_);
                }
                _loc19_ = _loc3_.child("visualizationLayer");
                _loc7_ = param1.createPlaneVisualization(_loc16_, _loc19_.length(), this.getGeometry(_loc16_, _loc18_, _loc14_));
                if (_loc7_ != null) {
                    _loc10_ = 0;
                    while (_loc10_ < _loc19_.length()) {
                        _loc13_ = _loc19_.item(_loc10_);
                        _loc17_ = null;
                        _loc11_ = 1;
                        if (XMLValidator.checkRequiredAttributes(_loc13_, ["materialId"])) {
                            _loc12_ = _loc13_.attribute("materialId").toString();
                            _loc17_ = this.getMaterial(_loc12_);
                        }
                        _loc21_ = _loc13_.attribute("offset").toString();
                        _loc4_ = 0;
                        if (_loc21_.length > 0) {
                            _loc4_ = parseInt(_loc21_) | 0;
                        }
                        _loc9_ = _loc13_.attribute("color").toString();
                        _loc5_ = 16777215;
                        if (_loc9_.length > 0) {
                            _loc5_ = parseInt(_loc9_) >>> 0;
                        }
                        _loc15_ = _loc13_.attribute("align").toString();
                        if (_loc15_ == "bottom") {
                            _loc11_ = 2;
                        } else if (_loc15_ == "top") {
                            _loc11_ = 1;
                        }
                        _loc7_.setLayer(_loc10_, _loc17_, _loc5_ >>> 0, _loc11_, _loc4_);
                        _loc10_++;
                    }
                }
            }
            _loc8_++;
        }
    }

    public render(param1: BitmapData, param2: string, param3: number, param4: number, param5: number, param6: IVector3d, param7: boolean, param8: number = 0, param9: number = 0, param10: number = 0, param11: number = 0, param12: number = 0): PlaneBitmapData {
        return null;
    }

    public getTextureIdentifier(param1: number, param2: IVector3d): string {
        return String(param1);
    }

    public getLayers(param1: string): any[] {
        let _loc2_: Plane = this.getPlane(param1);
        if (_loc2_ == null) {
            _loc2_ = this.getPlane("default");
        }
        return _loc2_.getLayers();
    }
}
