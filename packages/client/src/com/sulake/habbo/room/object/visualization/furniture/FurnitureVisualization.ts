import { asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectVisualizationData } from '@/com/sulake/room/object/visualization/IRoomObjectVisualizationData';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { FurnitureVisualizationData } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualizationData';
import { StringBuffer } from '@/com/sulake/habbo/utils/StringBuffer';
import { RoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/RoomObjectSpriteVisualization';

export class FurnitureVisualization extends RoomObjectSpriteVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureVisualization'); }

    protected static readonly Z_MULTIPLIER: number = Math.sqrt(0.5);
    private readonly _SafeStr_8070: number = 41;
    private static _SafeStr_3561: StringBuffer;
    private static _SafeStr_2628: any[];

    private static concatListWillEqual(param1: any[], param2: any[], param3: any[]): boolean {
        let _loc4_: number = 0;
        if (param3 == null) {
            return false;
        }
        if (param1.length + param2.length != param3.length) {
            return false;
        }
        _loc4_ = 0;
        while (_loc4_ < param1.length) {
            if (param1[_loc4_] !== param3[_loc4_]) {
                return false;
            }
            _loc4_++;
        }
        _loc4_ = 0;
        while (_loc4_ < param2.length) {
            if (param2[_loc4_] !== param3[param1.length + _loc4_]) {
                return false;
            }
            _loc4_++;
        }
        return true;
    }

    constructor() {
        super();
        this.reset();
        if (!FurnitureVisualization._SafeStr_3561) {
            FurnitureVisualization._SafeStr_3561 = new StringBuffer();
            FurnitureVisualization._SafeStr_2628 = [];
            FurnitureVisualization._SafeStr_2628[0] = null;
            FurnitureVisualization._SafeStr_2628[1] = "_";
            FurnitureVisualization._SafeStr_2628[2] = null;
            FurnitureVisualization._SafeStr_2628[3] = "_";
            FurnitureVisualization._SafeStr_2628[4] = null;
            FurnitureVisualization._SafeStr_2628[5] = "_";
            FurnitureVisualization._SafeStr_2628[6] = null;
            FurnitureVisualization._SafeStr_2628[7] = "_";
        }
    }

    protected _lastUpdateTime: number = -1000;
    protected _alphaMultiplier: number = 1;
    protected _SafeStr_3262: boolean = true;
    protected _layerCount: number = 0;
    protected _SafeStr_5412: number = -1;

    declare private _direction: number;
    static { (this.prototype as any)._direction = 0; }

    private _SafeStr_6992: number = NaN;
    private _selectedColor: number = -1;
    private _clickUrl: string = null;
    private _clickHandling: boolean = false;
    private _data: FurnitureVisualizationData = null;
    private _type: string = "";
    private _assetNames: any[] = [];
    private _assetNamesFrame: any[] = [];
    private _SafeStr_6780: number = 0;
    private _SafeStr_5793: number = -1;
    private _SafeStr_6887: number = -1;
    private _SafeStr_2768: any[] = [];
    private _SafeStr_2682: any[] = [];
    private _spriteColors: any[] = [];
    private _SafeStr_2780: any[] = [];
    private _SafeStr_2791: any[] = [];
    private _SafeStr_2796: any[] = [];
    private _spriteMouseCaptures: any[] = [];
    private _SafeStr_2750: any[] = [];
    private _updatedLayers: number = 0;
    private _SafeStr_6340: number = 0;
    private _SafeStr_5748: boolean = false;
    private _SafeStr_5213: boolean = false;
    private _SafeStr_5503: boolean = false;
    private _SafeStr_5861: boolean = false;
    private _filters: any[] = null;

    public get filters(): any[] {
        return this._filters;
    }

    public set filters(param1: any[]) {
        this._filters = param1;
        this._SafeStr_5503 = true;
    }

    public set lookThrough(param1: boolean) {
        if (this._SafeStr_5748 != param1) {
            this._SafeStr_5213 = true;
            this._SafeStr_5748 = param1;
        }
    }

    protected get direction(): number {
        return this._direction;
    }

    protected set direction(param1: number) {
        this._direction = param1;
    }

    protected get type(): string {
        return this._type;
    }

    protected get data(): FurnitureVisualizationData {
        return this._data;
    }

    public override dispose(): void {
        super.dispose();
        this._data = null;
        this._assetNames = null;
        this._assetNamesFrame = null;
        this._SafeStr_2768 = null;
        this._SafeStr_2682 = null;
        this._spriteColors = null;
        this._SafeStr_2780 = null;
        this._SafeStr_2791 = null;
        this._SafeStr_2796 = null;
        this._spriteMouseCaptures = null;
        this._SafeStr_2750 = null;
        this._filters = null;
    }

    protected override reset(): void {
        super.reset();
        this.direction = -1;
        this._data = null;
        this._assetNames = this._assetNames.length > 0 ? [] : this._assetNames;
        this._assetNamesFrame = this._assetNamesFrame.length > 0 ? [] : this._assetNamesFrame;
        this._SafeStr_2768 = this._SafeStr_2768.length > 0 ? [] : this._SafeStr_2768;
        this._SafeStr_2682 = this._SafeStr_2682.length > 0 ? [] : this._SafeStr_2682;
        this._spriteColors = this._spriteColors.length > 0 ? [] : this._spriteColors;
        this._SafeStr_2780 = this._SafeStr_2780.length > 0 ? [] : this._SafeStr_2780;
        this._SafeStr_2791 = this._SafeStr_2791.length > 0 ? [] : this._SafeStr_2791;
        this._SafeStr_2796 = this._SafeStr_2796.length > 0 ? [] : this._SafeStr_2796;
        this._spriteMouseCaptures = this._spriteMouseCaptures.length > 0 ? [] : this._spriteMouseCaptures;
        this._SafeStr_2750 = this._SafeStr_2750.length > 0 ? [] : this._SafeStr_2750;
        this.clearSprites();
    }

    public override initialize(param1: IRoomObjectVisualizationData): boolean {
        this.reset();
        if (param1 == null || !(param1 instanceof FurnitureVisualizationData)) {
            return false;
        }
        this._data = param1 instanceof FurnitureVisualizationData ? param1 : null;
        this._type = this._data.getType();
        return true;
    }

    public override update(param1: IRoomGeometry, param2: number, param3: boolean, param4: boolean): void {
        if (param1 == null) {
            return;
        }
        if (param2 < this._lastUpdateTime + 41) {
            return;
        }
        this._lastUpdateTime += 41;
        if (this._lastUpdateTime + 41 < param2) {
            this._lastUpdateTime = param2 - 41;
        }
        let _loc5_: boolean = false;
        let _loc6_: number = param1.scale;
        if (this.updateObject(_loc6_, param1.direction.x)) {
            _loc5_ = true;
        }
        if (this.updateModel(_loc6_)) {
            _loc5_ = true;
        }
        if (this._SafeStr_5213) {
            _loc5_ = true;
            this._SafeStr_5213 = false;
        }
        if (this._SafeStr_5503) {
            _loc5_ = true;
            this._SafeStr_5503 = false;
        }
        let _loc7_: any = 0;
        if (param4) {
            this._updatedLayers |= this.updateAnimation(_loc6_);
        } else {
            _loc7_ = this.updateAnimation(_loc6_) | this._updatedLayers;
            this._updatedLayers = 0;
        }
        if (_loc5_ || _loc7_ != 0) {
            this.updateSprites(_loc6_ | 0, _loc5_, _loc7_ | 0);
            this._SafeStr_2292 = _loc6_ | 0;
            this.increaseUpdateId();
        }
    }

    protected updateSprites(param1: number, param2: boolean, param3: number): void {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        if (this._layerCount != this.spriteCount) {
            this.createSprites(this._layerCount);
        }
        if (param2) {
            _loc5_ = this.spriteCount - 1;
            while (_loc5_ >= 0) {
                this.updateSprite(param1, _loc5_);
                _loc5_--;
            }
        } else {
            _loc4_ = 0;
            while (param3 > 0) {
                if (param3 & 1) {
                    this.updateSprite(param1, _loc4_);
                }
                _loc4_++;
                param3 >>= 1;
            }
        }
        this._SafeStr_3262 = false;
    }

    protected updateSprite(param1: number, param2: number): void {
        let _loc7_: IGraphicAsset = null;
        let _loc3_: number = NaN;
        let _loc4_: number = 0;
        let _loc5_: string = this.getSpriteAssetName(param1, param2);
        let _loc6_: IRoomObjectSprite = this.getSprite(param2);
        if (_loc6_ != null && _loc5_ != null) {
            _loc7_ = this.getAsset(_loc5_, param2);
            if (_loc7_ != null && _loc7_.asset != null) {
                _loc6_.visible = true;
                _loc6_.objectType = this._type;
                _loc6_.asset = asInstanceOf(_loc7_.asset.content, BitmapData);
                if (_loc7_.asset.content == null) {
                    this._SafeStr_2366 = this._SafeStr_2366 + 1;
                }
                _loc6_.flipH = _loc7_.flipH;
                _loc6_.flipV = _loc7_.flipV;
                _loc6_.direction = this._direction;
                _loc3_ = 0;
                if (param2 != this._SafeStr_5412) {
                    _loc6_.tag = this.getSpriteTag(param1, this._direction, param2);
                    _loc6_.alpha = this.getSpriteAlpha(param1, this._direction, param2);
                    _loc6_.color = this.getSpriteColor(param1, param2, this._selectedColor);
                    _loc6_.offsetX = _loc7_.offsetX + this.getSpriteXOffset(param1, this._direction, param2);
                    _loc6_.offsetY = _loc7_.offsetY + this.getSpriteYOffset(param1, this._direction, param2);
                    _loc6_.alphaTolerance = this.getSpriteMouseCapture(param1, this._direction, param2) ? 128 : 256;
                    _loc6_.blendMode = this.getBlendMode(this.getSpriteInk(param1, this._direction, param2));
                    if (this.getSpriteFlipH(param1, this._direction, param2)) {
                        _loc6_.flipH = !_loc6_.flipH;
                    }
                    if (this._SafeStr_5861 && _loc6_.tag == "invisible") {
                        _loc6_.alpha = 0;
                        _loc6_.alphaTolerance = 256;
                    }
                    _loc3_ = this.getSpriteZOffset(param1, this._direction, param2);
                    _loc3_ -= param2 * 0.001;
                } else {
                    _loc6_.offsetX = _loc7_.offsetX;
                    _loc6_.offsetY = _loc7_.offsetY + this.getSpriteYOffset(param1, this._direction, param2);
                    _loc4_ = 48;
                    _loc4_ = _loc4_ * this._alphaMultiplier | 0;
                    _loc6_.alpha = _loc4_;
                    _loc6_.alphaTolerance = 256;
                    _loc3_ = 1;
                }
                if (this._SafeStr_5748) {
                    _loc6_.alpha *= 0.2;
                }
                _loc3_ *= FurnitureVisualization.Z_MULTIPLIER;
                _loc6_.relativeDepth = _loc3_;
                _loc6_.assetName = _loc7_.assetName;
                _loc6_.libraryAssetName = this.getLibraryAssetNameForSprite(_loc7_, _loc6_);
                _loc6_.assetPosture = this.getPostureForAssetFile(param1, _loc7_.libraryAssetName);
                _loc6_.clickHandling = this._clickHandling;
                this.updateSpriteFilters(param1, _loc6_, param2);
            } else {
                this.resetSprite(_loc6_, param2);
            }
        } else if (_loc6_ != null) {
            this.resetSprite(_loc6_, param2);
        }
    }

    protected getLibraryAssetNameForSprite(param1: IGraphicAsset, param2: IRoomObjectSprite): string {
        return param1.libraryAssetName;
    }

    protected getBlendMode(param1: number): string {
        let _loc2_: string = "normal";
        switch (param1) {
            case 1:
                _loc2_ = "add";
                break;
            case 2:
                _loc2_ = "subtract";
                break;
            case 3:
                _loc2_ = "darken";
                break;
            case 4:
                _loc2_ = "difference";
                break;
            case 5:
                _loc2_ = "multiply";
                break;
            case 6:
                _loc2_ = "invert";
                break;
            case 7:
                _loc2_ = "screen";
        }
        return _loc2_;
    }

    protected updateObject(param1: number, param2: number): boolean {
        let _loc4_: number = NaN;
        let _loc5_: number = 0;
        let _loc3_: IRoomObject = this.object;
        if (_loc3_ == null) {
            return false;
        }
        if (this._SafeStr_3623 != _loc3_.getUpdateID() || param1 != this._SafeStr_2292 || param2 != this._SafeStr_6992) {
            _loc4_ = _loc3_.getDirection().x - (param2 + 135);
            _loc4_ = (_loc4_ % 360 + 360) % 360;
            if (this._data != null) {
                this.direction = _loc5_ = this._data.getDirectionValue(param1 | 0, _loc4_ | 0);
            }
            this._SafeStr_3623 = _loc3_.getUpdateID();
            this._SafeStr_6992 = param2;
            this._SafeStr_2292 = param1 | 0;
            this.updateAssetAndSpriteCache(param1, this._direction);
            return true;
        }
        return false;
    }

    protected updateModel(param1: number): boolean {
        let _loc4_: number = NaN;
        let _loc5_: any = false;
        let _loc2_: IRoomObject = this.object;
        if (_loc2_ == null) {
            return false;
        }
        let _loc3_: IRoomObjectModel = _loc2_.getModel();
        if (_loc3_ == null) {
            return false;
        }
        if (this._SafeStr_2366 != _loc3_.getUpdateID()) {
            this._selectedColor = _loc3_.getNumber("furniture_color") | 0;
            _loc4_ = _loc3_.getNumber("furniture_alpha_multiplier");
            if (isNaN(_loc4_)) {
                _loc4_ = 1;
            }
            if (_loc4_ != this._alphaMultiplier) {
                this._alphaMultiplier = _loc4_;
                this._SafeStr_3262 = true;
            }
            _loc5_ = _loc3_.getNumber("furniture_invisible_layer") > 0;
            if (_loc5_ != this._SafeStr_5861) {
                this._SafeStr_5861 = _loc5_;
                this._SafeStr_3262 = true;
            }
            this._clickUrl = this.getAdClickUrl(_loc3_);
            this._clickHandling = this._clickUrl != null && this._clickUrl != "" && this._clickUrl.indexOf("http") == 0;
            this._SafeStr_6340 = _loc3_.getNumber("furniture_lift_amount");
            this._SafeStr_2366 = _loc3_.getUpdateID();
            return true;
        }
        return false;
    }

    protected getAdClickUrl(param1: IRoomObjectModel): string {
        return param1.getString("furniture_ad_url");
    }

    protected updateAnimation(param1: number): number {
        return 0;
    }

    protected updateLayerCount(param1: number, param2: number): void {
        this._layerCount = param1;
        this._SafeStr_5412 = this._layerCount - this.getAdditionalSpriteCount(param2);
    }

    protected getAdditionalSpriteCount(param1: number): number {
        return 1;
    }

    protected getFrameNumber(param1: number, param2: number): number {
        return 0;
    }

    protected getPostureForAssetFile(param1: number, param2: string): string {
        return null;
    }

    protected getAsset(param1: string, param2: number = -1): IGraphicAsset {
        let _loc3_: any = null;
        if (this.assetCollection != null) {
            return this.assetCollection.getAsset(param1);
        }
        return null;
    }

    protected getSpriteAssetName(param1: number, param2: number): string {
        if (this._data == null || param2 >= FurnitureVisualizationData.LAYER_NAMES.length) {
            return "";
        }
        let _loc4_: string = stringOrNull(this._assetNames[param2]);
        let _loc3_: any = Boolean(this._assetNamesFrame[param2]);
        if (_loc4_ == null || _loc4_.length == 0) {
            _loc4_ = this.getSpriteAssetNameWithoutFrame(param1, param2, true);
            _loc3_ = this._SafeStr_5793 != 1;
        }
        if (_loc3_) {
            _loc4_ += this.getFrameNumber(param1, param2);
        }
        return _loc4_;
    }

    protected getSpriteAssetNameWithoutFrame(param1: number, param2: number, param3: boolean): string {
        let _loc7_: string = null;
        let _loc4_: number = param3 ? this._SafeStr_5793 : this.getSize(param1);
        let _loc5_: any = _loc4_ == 1;
        if (param2 != this._SafeStr_5412) {
            _loc7_ = stringOrNull(FurnitureVisualizationData.LAYER_NAMES[param2]);
        } else {
            _loc7_ = "sd";
        }
        if (_loc5_) {
            return this._type + "_icon_" + _loc7_;
        }
        FurnitureVisualization._SafeStr_2628[0] = this._type;
        FurnitureVisualization._SafeStr_2628[2] = _loc4_;
        FurnitureVisualization._SafeStr_2628[4] = _loc7_;
        FurnitureVisualization._SafeStr_2628[6] = this._direction;
        FurnitureVisualization._SafeStr_3561.length = 0;
        FurnitureVisualization._SafeStr_3561.appendStringArray(FurnitureVisualization._SafeStr_2628);
        let _loc6_: string = FurnitureVisualization._SafeStr_3561.toString();
        if (param3) {
            this._assetNames[param2] = _loc6_;
            this._assetNamesFrame[param2] = !_loc5_;
        }
        return _loc6_;
    }

    protected getSpriteTag(param1: number, param2: number, param3: number): string {
        if (this._SafeStr_2768[param3] != null) {
            return stringOrNull(this._SafeStr_2768[param3]);
        }
        if (this._data == null) {
            return "";
        }
        let _loc4_: string = this._data.getTag(param1, param2, param3);
        this._SafeStr_2768[param3] = _loc4_;
        return _loc4_;
    }

    protected getSpriteFilters(param1: number, param2: number, param3: number): any[] {
        return null;
    }

    protected getSpriteAlpha(param1: number, param2: number, param3: number): number {
        if (this._SafeStr_2682[param3] != null && !this._SafeStr_3262) {
            return this._SafeStr_2682[param3] | 0;
        }
        if (this._data == null) {
            return 255;
        }
        let _loc4_: number = this._data.getAlpha(param1, param2, param3);
        _loc4_ = _loc4_ * this._alphaMultiplier | 0;
        this._SafeStr_2682[param3] = _loc4_;
        return _loc4_;
    }

    protected getSpriteColor(param1: number, param2: number, param3: number): number {
        if (this._spriteColors[param2] != null) {
            return this._spriteColors[param2] | 0;
        }
        if (this._data == null) {
            return 16777215;
        }
        let _loc4_: number = this._data.getColor(param1, param2, param3);
        this._spriteColors[param2] = _loc4_;
        return _loc4_;
    }

    protected getSpriteXOffset(param1: number, param2: number, param3: number): number {
        if (this._SafeStr_2780[param3] != null) {
            return this._SafeStr_2780[param3] | 0;
        }
        if (this._data == null) {
            return 0;
        }
        let _loc4_: number = this._data.getXOffset(param1, param2, param3);
        this._SafeStr_2780[param3] = _loc4_;
        return _loc4_;
    }

    protected getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc4_: number = 0;
        if (param3 != this._SafeStr_5412) {
            if (this._SafeStr_2791[param3] != null) {
                return this._SafeStr_2791[param3] | 0;
            }
            if (this._data != null) {
                _loc4_ = this._data.getYOffset(param1, param2, param3);
                this._SafeStr_2791[param3] = _loc4_;
                return _loc4_;
            }
            return 0;
        }
        return Math.ceil(this._SafeStr_6340 * (param1 / 2)) | 0;
    }

    protected getSpriteMouseCapture(param1: number, param2: number, param3: number): boolean {
        if (this._spriteMouseCaptures[param3] != null) {
            return this._spriteMouseCaptures[param3];
        }
        if (this._data == null) {
            return true;
        }
        let _loc4_: any = !this._data.getIgnoreMouse(param1, param2, param3);
        this._spriteMouseCaptures[param3] = _loc4_;
        return _loc4_;
    }

    protected getSpriteInk(param1: number, param2: number, param3: number): number {
        if (this._SafeStr_2750[param3] != null) {
            return this._SafeStr_2750[param3] | 0;
        }
        if (this._data == null) {
            return 0;
        }
        let _loc4_: number = this._data.getInk(param1, param2, param3);
        this._SafeStr_2750[param3] = _loc4_;
        return _loc4_;
    }

    protected getSpriteZOffset(param1: number, param2: number, param3: number): number {
        if (this._SafeStr_2796[param3] != null) {
            return Number(this._SafeStr_2796[param3]);
        }
        if (this._data == null) {
            return 0;
        }
        let _loc4_: number = this._data.getZOffset(param1, param2, param3);
        this._SafeStr_2796[param3] = _loc4_;
        return _loc4_;
    }

    protected getSpriteFlipH(param1: number, param2: number, param3: number): boolean {
        return false;
    }

    protected getSize(param1: number): number {
        if (this._data != null) {
            return this._data.getSize(param1);
        }
        return param1;
    }

    private updateSpriteFilters(param1: number, param2: IRoomObjectSprite, param3: number): void {
        let _loc4_: any[] = null;
        let _loc5_: any[] = null;
        if (param2.blendMode != "add") {
            _loc4_ = this.getSpriteFilters(param1, this._direction, param3);
            if (_loc4_ == null) {
                param2.filters = this._filters;
            } else if (this._filters == null) {
                param2.filters = _loc4_;
            } else {
                if (FurnitureVisualization.concatListWillEqual(this._filters, _loc4_, param2.filters)) {
                    return;
                }
                _loc5_ = this._filters.concat(_loc4_);
                param2.filters = _loc5_;
            }
        } else if (param2.filters != null) {
            param2.filters = null;
        }
    }

    private resetSprite(param1: IRoomObjectSprite, param2: number): void {
        param1.asset = null;
        param1.assetName = "";
        param1.assetPosture = null;
        param1.alpha = 0;
        param1.tag = "";
        param1.flipH = false;
        param1.flipV = false;
        param1.offsetX = 0;
        param1.offsetY = 0;
        param1.relativeDepth = 0;
        param1.clickHandling = false;
        if (this._SafeStr_3262) {
            delete this._SafeStr_2682[param2];
        }
    }

    private updateAssetAndSpriteCache(param1: number, param2: number): void {
        if (this._SafeStr_6887 != param2 || this._SafeStr_6780 != param1) {
            this._assetNames = [];
            this._assetNamesFrame = [];
            this._SafeStr_2768 = [];
            this._SafeStr_2682 = [];
            this._spriteColors = [];
            this._SafeStr_2780 = [];
            this._SafeStr_2791 = [];
            this._SafeStr_2796 = [];
            this._spriteMouseCaptures = [];
            this._SafeStr_2750 = [];
            this._SafeStr_6887 = param2;
            this._SafeStr_6780 = param1;
            this._SafeStr_5793 = this.getSize(param1 | 0);
            this.updateLayerCount(this._data.getLayerCount(param1 | 0) + this.getAdditionalSpriteCount(param1), param1);
        }
    }
}
