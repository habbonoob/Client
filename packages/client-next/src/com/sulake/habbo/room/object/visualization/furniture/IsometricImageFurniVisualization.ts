import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class IsometricImageFurniVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::IsometricImageFurniVisualization'); }

    protected static readonly THUMBNAIL_SPRITE_TAG: string = "THUMBNAIL";
    private _thumbnailAssetNameSmall: string = null;
    private _thumbnailAssetNameNormal: string = null;
    private _hasOutline: boolean = false;

    declare private _thumbnailImageSmall: BitmapData;

    declare private _thumbnailImageNormal: BitmapData;

    declare private _SafeStr_7292: number;
    static { (this.prototype as any)._SafeStr_7292 = 0; }

    declare private _SafeStr_5220: boolean;
    static { (this.prototype as any)._SafeStr_5220 = false; }

    constructor() {
        super();
    }

    public set hasOutline(param1: boolean) {
        this._hasOutline = param1;
    }

    public get hasThumbnailImage(): boolean {
        return this._thumbnailImageNormal != null;
    }

    public setThumbnailImages(param1: BitmapData, param2: BitmapData = null): void {
        this._thumbnailImageNormal = param1;
        this._thumbnailImageSmall = param2 ?? param1;
        this._SafeStr_5220 = true;
    }

    protected override updateModel(param1: number): boolean {
        let _loc2_: boolean = super.updateModel(param1);
        if (!this.object) {
            return _loc2_;
        }
        if (!this._SafeStr_5220 && this._SafeStr_7292 == this.direction) {
            return _loc2_;
        }
        this.refreshThumbnail();
        return true;
    }

    private refreshThumbnail(): void {
        if (this.assetCollection == null) {
            return;
        }
        if (this._thumbnailImageNormal != null) {
            this.addThumbnailAsset(this._thumbnailImageNormal, 64);
            this.addThumbnailAsset(this._thumbnailImageSmall, 32);
        } else {
            this.clearThumbnailSpriteAssets();
            this.assetCollection.disposeAsset(this.getThumbnailAssetName(64));
            this.assetCollection.disposeAsset(this.getThumbnailAssetName(32));
        }
        this._SafeStr_5220 = false;
        this._SafeStr_7292 = this.direction;
    }

    private addThumbnailAsset(param1: BitmapData, param2: number): void {
        let _loc5_: number = 0;
        let _loc6_: string = null;
        let _loc4_: IGraphicAsset = null;
        let _loc3_: BitmapData = null;
        let _loc7_: string = null;
        _loc5_ = 0;
        while (_loc5_ < this.spriteCount) {
            if (this.getSpriteTag(param2, this.direction, _loc5_) == "THUMBNAIL") {
                _loc6_ = this.getSpriteAssetNameWithoutFrame(param2, _loc5_, false) + this.getFrameNumber(param2, _loc5_);
                _loc4_ = this.getAsset(_loc6_, _loc5_);
                if (_loc4_ != null) {
                    _loc3_ = this.generateTransformedThumbnail(param1, _loc4_);
                    _loc7_ = this.getThumbnailAssetName(param2);
                    this.clearThumbnailSpriteAssets();
                    this.assetCollection.disposeAsset(_loc7_);
                    this.assetCollection.addAsset(_loc7_, _loc3_, true, _loc4_.offsetX, _loc4_.offsetY);
                }
                return;
            }
            _loc5_++;
        }
    }

    private clearThumbnailSpriteAssets(): void {
        let _loc2_: number = 0;
        let _loc1_: IRoomObjectSprite = null;
        _loc2_ = 0;
        while (_loc2_ < this.spriteCount) {
            _loc1_ = this.getSprite(_loc2_);
            if (_loc1_ != null && _loc1_.tag == "THUMBNAIL") {
                _loc1_.asset = null;
            }
            _loc2_++;
        }
    }

    private generateTransformedThumbnail(param1: BitmapData, param2: IGraphicAsset): BitmapData {
        let _loc3_: BitmapData = null;
        let _loc8_: Bitmap = null;
        let _loc7_: ColorTransform = null;
        let _loc4_: number = 1.1;
        let _loc6_: Matrix = new Matrix();
        let _loc5_: number = param2.width / param1.width;
        switch (this.direction) {
            case 0:
            case 4:
                _loc6_.a = _loc5_;
                _loc6_.b = 0.5 * _loc5_;
                _loc6_.c = 0;
                _loc6_.d = _loc5_ * _loc4_;
                _loc6_.tx = 0;
                _loc6_.ty = 0;
                break;
            case 2:
                _loc6_.a = _loc5_;
                _loc6_.b = -0.5 * _loc5_;
                _loc6_.c = 0;
                _loc6_.d = _loc5_ * _loc4_;
                _loc6_.tx = 0;
                _loc6_.ty = 0.5 * _loc5_ * param1.width;
                break;
            default:
                _loc6_.a = _loc5_;
                _loc6_.b = 0;
                _loc6_.c = 0;
                _loc6_.d = _loc5_;
                _loc6_.tx = 0;
                _loc6_.ty = 0;
        }
        if (this._hasOutline) {
            _loc3_ = new BitmapData(param2.width + 2, param2.height + 2, true, 0);
            _loc8_ = new Bitmap(param1);
            _loc7_ = new ColorTransform();
            _loc7_.color = 0;
            _loc3_.draw(_loc8_, _loc6_, _loc7_);
            _loc6_.tx += 1;
            _loc6_.ty -= 1;
            _loc3_.draw(_loc8_, _loc6_, _loc7_);
            _loc6_.ty += 2;
            _loc3_.draw(_loc8_, _loc6_, _loc7_);
            _loc6_.tx += 1;
            _loc6_.ty -= 1;
            _loc3_.draw(_loc8_, _loc6_, _loc7_);
            _loc6_.tx -= 1;
            _loc3_.draw(_loc8_, _loc6_);
        } else {
            _loc3_ = new BitmapData(param2.width, param2.height, true, 0);
            _loc3_.draw(param1, _loc6_);
        }
        return _loc3_;
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        if (this._thumbnailImageNormal == null || this.getSpriteTag(param1, this.direction, param2) != "THUMBNAIL") {
            return super.getSpriteAssetName(param1, param2);
        }
        return this.getThumbnailAssetName(param1);
    }

    protected getThumbnailAssetName(param1: number): string {
        if (this._thumbnailAssetNameSmall == null) {
            this._thumbnailAssetNameSmall = this.getFullThumbnailAssetName(this.object.getId(), 32);
            this._thumbnailAssetNameNormal = this.getFullThumbnailAssetName(this.object.getId(), 64);
        }
        return param1 == 32 ? this._thumbnailAssetNameSmall : this._thumbnailAssetNameNormal;
    }

    protected getFullThumbnailAssetName(param1: number, param2: number): string {
        return [this.type, param1, "thumb", param2].join("_");
    }
}
