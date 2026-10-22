import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { GlowFilter } from '@habbo-pixi/runtime/filters/GlowFilter';
import { FurnitureChestVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureChestVisualization';
import { GraphicAsset } from '@/com/sulake/room/object/visualization/utils/GraphicAsset';

export class FurnitureFurniChestVisualization extends FurnitureChestVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureFurniChestVisualization'); }

    private static readonly FLOATING_ICON_TAG_PREFIX: string = "floating_icon_";
    private static readonly _SafeStr_8101: number = 4;
    private static readonly FLOATING_PIXELS: number = 2;
    private static readonly _SafeStr_8162: number = 1200;
    private static readonly INDIVIDUAL_FLOATING_ENABLED: boolean = false;
    private static readonly FLOATING_ICON_GLOW_FILTER: any[] = [new GlowFilter(16777215, 1, 2, 2, 10, 1, false, false)];
    private static readonly ICON_POSITIONING: any[] = [[], [[0, -68, 17, 17]], [[16, -70, 4, 4], [-14, -59, 4, 4]], [[12, -52, 2, 2], [-17, -70, 3, 2], [17, -87, 7, 2]], [[14, -50, 2, 2], [-14, -59, 2, 2], [19, -78, 4, 2], [-20, -90, 4, 2]]];

    declare private _iconAssets: GraphicAsset[];

    declare private _lastAssetsStr: string;

    declare private _assetNames_FurnitureFurniChestVisualization: any[];

    declare private _SafeStr_5728: boolean;

    declare private _SafeStr_2700: any[];

    declare private _SafeStr_3359: number;

    declare private _lastFloatUpdate: number;

    constructor() {
        super();
    }

    protected override updateModel(param1: number): boolean {
        let _loc3_: boolean = super.updateModel(param1);
        let _loc2_: string = this.object.getModel().getString("furniture_furni_chest_shown_asset_names");
        if (_loc2_ == null || param1 != 64) {
            _loc2_ = "";
        }
        if (this._lastAssetsStr != _loc2_) {
            this._lastAssetsStr = _loc2_;
            if (this._lastAssetsStr.length == 0) {
                this._assetNames_FurnitureFurniChestVisualization = [];
            } else {
                this._assetNames_FurnitureFurniChestVisualization = this._lastAssetsStr.split(",");
            }
            this.createIconAssets();
            _loc3_ = true;
        }
        return _loc3_;
    }

    protected override updateObject(param1: number, param2: number): boolean {
        let _loc5_: boolean = super.updateObject(param1, param2);
        let _loc3_: number = this._lastUpdateTime - this._lastFloatUpdate;
        let _loc4_: number = 300;
        if (_loc3_ > _loc4_) {
            _loc5_ = true;
            this._lastFloatUpdate = this._lastUpdateTime;
            this._SafeStr_3359 += 1;
            if (this._SafeStr_3359 >= 2 * 2) {
                this._SafeStr_3359 = 0;
            }
        }
        return _loc5_;
    }

    protected override getAdditionalSpriteCount(param1: number): number {
        return super.getAdditionalSpriteCount(param1) + 4;
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        if (!this.isFloatingIcon(param2) || param1 != 64) {
            return super.getSpriteAssetName(param1, param2);
        }
        let _loc3_: number = param2 - this.spriteCount + 4;
        if (_loc3_ < 0 || _loc3_ >= this._assetNames_FurnitureFurniChestVisualization.length) {
            return super.getSpriteAssetName(param1, param2);
        }
        return stringOrNull(this._assetNames_FurnitureFurniChestVisualization[_loc3_]);
    }

    private isFloatingIcon(param1: number): boolean {
        let _loc2_: number = param1 - this.spriteCount + 4;
        return _loc2_ >= 0 && _loc2_ < this._SafeStr_2700.length;
    }

    protected override reset(): void {
        super.reset();
        this.clearIconAssets();
    }

    protected override createSprites(param1: number): void {
        super.createSprites(param1);
    }

    private clearIconAssets(): void {
        this._iconAssets = null;
    }

    private createIconAssets(): void {
        let _loc5_: number = 0;
        let _loc8_: string = null;
        let _loc11_: IGraphicAsset = null;
        let _loc6_: any[] = null;
        let _loc2_: number = 0;
        let _loc1_: number = 0;
        let _loc12_: boolean = false;
        let _loc9_: number = 0;
        let _loc13_: number = 0;
        let _loc7_: number = NaN;
        let _loc10_: number = NaN;
        let _loc4_: number = 0;
        if (this._iconAssets != null) {
            this.clearIconAssets();
        }
        this._iconAssets = [];
        this._SafeStr_2700 = [];
        this._SafeStr_5728 = Math.random() < 0.5;
        this._SafeStr_3359 = 0;
        this._lastFloatUpdate = this._lastUpdateTime;
        let _loc3_: number = Math.min(4, this._assetNames_FurnitureFurniChestVisualization.length) | 0;
        _loc5_ = 0;
        while (_loc5_ < _loc3_) {
            _loc8_ = this.getSpriteAssetName(64, this.spriteCount - 4 + _loc5_);
            _loc11_ = this.assetCollection.getAsset(_loc8_);
            this._iconAssets.push(castTo(_loc11_, GraphicAsset));
            _loc6_ = FurnitureFurniChestVisualization.ICON_POSITIONING[_loc3_][_loc5_];
            _loc2_ = _loc6_[0] + Math.random() * (_loc6_[2] + 1) - _loc6_[2] / 2 | 0;
            _loc1_ = _loc6_[1] + Math.random() * (_loc6_[3] + 1) - _loc6_[3] / 2 | 0;
            _loc12_ = Math.random() < 0.5;
            _loc9_ = _loc11_?.width;
            _loc13_ = _loc11_?.height;
            _loc7_ = this.calculateAlphaForYOffset(_loc1_);
            _loc10_ = 0.001 + _loc1_ / 10000;
            _loc4_ = 0;
            this._SafeStr_2700.push([_loc2_, _loc1_, _loc12_, _loc9_, _loc13_, _loc7_, _loc10_, _loc4_]);
            _loc5_ += 1;
        }
    }

    private calculateAlphaForYOffset(param1: number): number {
        let _loc5_: number = -40;
        let _loc2_: number = -100;
        let _loc4_: number = (param1 - _loc5_) / (_loc2_ - _loc5_);
        let _loc7_: number = 0.9;
        let _loc6_: number = 0.4;
        let _loc3_: number = _loc7_ + (_loc6_ - _loc7_) * _loc4_;
        _loc3_ = Number(Math.max(_loc3_, _loc6_));
        return Number(Math.min(_loc3_, _loc7_));
    }

    protected override getAsset(param1: string, param2: number = -1): IGraphicAsset {
        let _loc3_: number = 0;
        if (this.isFloatingIcon(param2)) {
            _loc3_ = param2 - this.spriteCount + 4;
            if (this._iconAssets == null) {
                this.createIconAssets();
            }
            if (_loc3_ < this._iconAssets.length && this._iconAssets[_loc3_] != null) {
                return this._iconAssets[_loc3_];
            }
        }
        return super.getAsset(param1, param2);
    }

    protected override getSpriteTag(param1: number, param2: number, param3: number): string {
        if (this.isFloatingIcon(param3)) {
            return "floating_icon_" + (param3 - this.spriteCount + 4);
        }
        return super.getSpriteTag(param1, param2, param3);
    }

    protected override getSpriteAlpha(param1: number, param2: number, param3: number): number {
        let _loc6_: number = 0;
        let _loc4_: number = NaN;
        let _loc5_: number = super.getSpriteAlpha(param1, param2, param3);
        if (this.isFloatingIcon(param3)) {
            _loc6_ = param3 - this.spriteCount + 4;
            _loc4_ = Number(this._SafeStr_2700[_loc6_][5]);
            return _loc4_ * _loc5_ | 0;
        }
        return _loc5_ | 0;
    }

    protected override getSpriteColor(param1: number, param2: number, param3: number): number {
        return super.getSpriteColor(param1, param2, param3);
    }

    protected override getSpriteMouseCapture(param1: number, param2: number, param3: number): boolean {
        if (this.isFloatingIcon(param3)) {
            return false;
        }
        return super.getSpriteMouseCapture(param1, param2, param3);
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        let _loc7_: number = 0;
        let _loc6_: boolean = false;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        if (this.isFloatingIcon(param3)) {
            _loc7_ = param3 - this.spriteCount + 4;
            _loc6_ = param2 / 2 % 2 == 1;
            _loc4_ = this._SafeStr_2700[_loc7_][0] | 0;
            _loc5_ = this._SafeStr_2700[_loc7_][3] | 0;
            if (this._SafeStr_5728 != _loc6_) {
                _loc4_ = -_loc4_;
            }
            return _loc4_ - _loc5_ / 2 | 0;
        }
        return super.getSpriteXOffset(param1, param2, param3);
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        let _loc7_: number = 0;
        let _loc5_: number = 0;
        let _loc8_: number = 0;
        let _loc6_: number = 0;
        let _loc4_: number = 0;
        if (this.isFloatingIcon(param3)) {
            _loc7_ = param3 - this.spriteCount + 4;
            _loc5_ = this._SafeStr_2700[_loc7_][1] | 0;
            _loc8_ = this._SafeStr_2700[_loc7_][4] | 0;
            _loc6_ = this._SafeStr_2700[_loc7_][7] | 0;
            _loc4_ = (this._SafeStr_3359 + _loc6_) % (2 * 2);
            if (_loc4_ > 2) {
                _loc4_ = 2 - (_loc4_ - 2);
            }
            return _loc5_ + _loc8_ / 2 - _loc4_ | 0;
        }
        return super.getSpriteYOffset(param1, param2, param3);
    }

    protected override getSpriteZOffset(param1: number, param2: number, param3: number): number {
        let _loc5_: number = 0;
        let _loc4_: number = NaN;
        if (this.isFloatingIcon(param3)) {
            _loc5_ = param3 - this.spriteCount + 4;
            return Number(this._SafeStr_2700[_loc5_][6]);
        }
        return super.getSpriteZOffset(param1, param2, param3);
    }

    protected override getSpriteInk(param1: number, param2: number, param3: number): number {
        if (this.isFloatingIcon(param3)) {
            return 0;
        }
        return super.getSpriteInk(param1, param2, param3);
    }

    protected override getSpriteFilters(param1: number, param2: number, param3: number): any[] {
        if (this.isFloatingIcon(param3)) {
            return FurnitureFurniChestVisualization.FLOATING_ICON_GLOW_FILTER;
        }
        return super.getSpriteFilters(param1, param2, param3);
    }

    protected override getSpriteFlipH(param1: number, param2: number, param3: number): boolean {
        let _loc6_: number = 0;
        let _loc5_: boolean = false;
        let _loc4_: number = 0;
        if (this.isFloatingIcon(param3)) {
            _loc6_ = param3 - this.spriteCount + 4;
            _loc5_ = param2 / 2 % 2 == 1;
            _loc4_ = this._SafeStr_2700[_loc6_][2] | 0;
            return Number(this._SafeStr_5728 != _loc5_) != _loc4_;
        }
        return super.getSpriteFlipH(param1, param2, param3);
    }

    protected override initInstanceFields(): void {
        this._iconAssets = null;
        this._lastAssetsStr = "";
        this._assetNames_FurnitureFurniChestVisualization = [];
        this._SafeStr_5728 = false;
        this._SafeStr_2700 = [];
        this._SafeStr_3359 = 0;
        this._lastFloatUpdate = -1;
        super.initInstanceFields();
    }
}
