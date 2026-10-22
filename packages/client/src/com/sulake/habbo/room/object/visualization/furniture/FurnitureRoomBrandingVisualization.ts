import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { FurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureVisualization';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class FurnitureRoomBrandingVisualization extends FurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureRoomBrandingVisualization'); }

    static #staticsReady = false;

    private static get _log_FurnitureRoomBrandingVisualization(): SimpleLogger {
        FurnitureRoomBrandingVisualization.#initStatics();
        return FurnitureRoomBrandingVisualization._log_FurnitureRoomBrandingVisualization;
    }

    private static readonly BRANDED_IMAGE_SPRITE_TAG: string = "branded_image";
    private static readonly OBJECT_STATE_DEFAULT: number = 0;
    private static readonly OBJECT_STATE_FLIPH: number = 1;
    private static readonly _SafeStr_8205: number = 2;
    private static readonly _SafeStr_8763: number = 3;

    constructor() {
        super();
    }

    declare protected _imageUrl: string;

    protected _SafeStr_4169: boolean = false;

    declare protected _SafeStr_5088: number;
    static { (this.prototype as any)._SafeStr_5088 = 0; }

    declare protected _SafeStr_5066: number;
    static { (this.prototype as any)._SafeStr_5066 = 0; }

    declare protected _SafeStr_5761: number;
    static { (this.prototype as any)._SafeStr_5761 = 0; }

    declare private _dynamicAssetName: string;

    public override dispose(): void {
        if (this._dynamicAssetName && this.assetCollection) {
            this.clearBrandedSpriteAssets();
            this.assetCollection.disposeAsset(this._dynamicAssetName);
            this._dynamicAssetName = null;
        }
        super.dispose();
        this._imageUrl = null;
    }

    protected override updateObject(param1: number, param2: number): boolean {
        if (super.updateObject(param1, param2)) {
            if (this._SafeStr_4169) {
                this.checkAndCreateImageForCurrentState(param1 | 0);
            }
            return true;
        }
        return false;
    }

    protected override updateModel(param1: number): boolean {
        let _loc2_: IRoomObject = null;
        let _loc3_: IRoomObjectModel = null;
        let _loc4_: boolean = super.updateModel(param1);
        if (_loc4_) {
            _loc2_ = this.object;
            if (_loc2_ != null) {
                _loc3_ = _loc2_.getModel();
                if (_loc3_ != null) {
                    this._SafeStr_5088 = _loc3_.getNumber("furniture_branding_offset_x") | 0;
                    this._SafeStr_5066 = _loc3_.getNumber("furniture_branding_offset_y") | 0;
                    this._SafeStr_5761 = _loc3_.getNumber("furniture_branding_offset_z") | 0;
                }
            }
        }
        if (!this._SafeStr_4169) {
            this._SafeStr_4169 = this.checkIfImageReady();
            if (this._SafeStr_4169) {
                this.checkAndCreateImageForCurrentState(param1 | 0);
                return true;
            }
        } else if (this.checkIfImageChanged()) {
            this._SafeStr_4169 = false;
            this._imageUrl = null;
            return true;
        }
        return _loc4_;
    }

    protected override updateSprites(param1: number, param2: boolean, param3: number): void {
        super.updateSprites(param1, param2, param3);
    }

    protected override getSpriteAssetName(param1: number, param2: number): string {
        let _loc7_: number = 0;
        let _loc4_: number = this.getSize(param1);
        let _loc5_: string = this.type;
        let _loc6_: string = "";
        if (param2 < this.spriteCount - 1) {
            _loc6_ = String.fromCharCode("a".charCodeAt(0) + param2);
        } else {
            _loc6_ = "sd";
        }
        if (_loc4_ == 1) {
            _loc5_ += "_icon_" + _loc6_;
        } else {
            _loc7_ = this.getFrameNumber(param1, param2);
            _loc5_ += "_" + _loc4_ + "_" + _loc6_ + "_" + this.direction + "_" + _loc7_;
        }
        let _loc3_: string = this.getSpriteTag(param1, this.direction, param2);
        if (this._imageUrl != null && _loc3_ == "branded_image") {
            return this._imageUrl + "_" + _loc4_ + "_" + this.object.getState(0);
        }
        return _loc5_;
    }

    protected override getLibraryAssetNameForSprite(param1: IGraphicAsset, param2: IRoomObjectSprite): string {
        let _loc3_: string = null;
        if (param2.tag != "branded_image") {
            return super.getLibraryAssetNameForSprite(param1, param2);
        }
        if (this.object) {
            _loc3_ = this.object.getModel().getString("furniture_branding_image_url");
        }
        if (_loc3_ && _loc3_.length > 0) {
            return _loc3_;
        }
        return super.getLibraryAssetNameForSprite(param1, param2);
    }

    protected checkIfImageChanged(): boolean {
        let _loc3_: IRoomObjectModel = null;
        let _loc2_: string = null;
        let _loc1_: IRoomObject = this.object;
        if (_loc1_ != null) {
            _loc3_ = _loc1_.getModel();
            if (_loc3_ != null) {
                _loc2_ = _loc3_.getString("furniture_branding_image_url");
                if (_loc2_ != null && _loc2_ != this._imageUrl) {
                    return true;
                }
            }
        }
        return false;
    }

    protected checkIfImageReady(): boolean {
        let _loc4_: IRoomObjectModel = null;
        let _loc3_: string = null;
        let _loc5_: number = NaN;
        let _loc6_: IGraphicAsset = null;
        let _loc2_: BitmapData = null;
        let _loc1_: IRoomObject = this.object;
        if (_loc1_ != null) {
            _loc4_ = _loc1_.getModel();
            if (_loc4_ != null) {
                _loc3_ = _loc4_.getString("furniture_branding_image_url");
                if (_loc3_ != null) {
                    if (this._imageUrl == null || this._imageUrl != _loc3_) {
                        _loc5_ = _loc4_.getNumber("furniture_branding_image_status");
                        if (_loc5_ == 1) {
                            _loc6_ = this.assetCollection.getAsset(_loc3_);
                            if (_loc6_ != null) {
                                _loc2_ = asInstanceOf(_loc6_.asset.content, BitmapData);
                                if (_loc2_ != null) {
                                    this.imageReady(_loc2_, _loc3_);
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return false;
    }

    protected imageReady(param1: BitmapData, param2: string): void {
        FurnitureRoomBrandingVisualization._log_FurnitureRoomBrandingVisualization.info("billboard visualization got image from url = " + param2);
        if (param1 != null) {
            this._imageUrl = param2;
        } else {
            this._imageUrl = null;
        }
    }

    private checkAndCreateImageForCurrentState(param1: number): void {
        let _loc2_: BitmapData = null;
        let _loc6_: Matrix = null;
        if (this.object == null || this._imageUrl == null) {
            return;
        }
        let _loc11_: IGraphicAsset = this.assetCollection.getAsset(this._imageUrl);
        if (_loc11_ == null) {
            return;
        }
        let _loc14_: number = this.object.getState(0);
        let _loc9_: number = this.getSize(param1);
        let _loc12_: string = this._imageUrl + "_" + _loc9_ + "_" + _loc14_;
        let _loc15_: IGraphicAsset = this.assetCollection.getAsset(_loc12_);
        if (_loc15_ != null) {
            return;
        }
        let _loc10_: BitmapData = asInstanceOf(_loc11_.asset.content, BitmapData);
        if (_loc10_ == null) {
            FurnitureRoomBrandingVisualization._log_FurnitureRoomBrandingVisualization.warn("could not find bitmap data for image " + _loc12_);
            return;
        }
        let _loc4_: boolean = true;
        if (this._imageUrl.indexOf("noscale") > -1) {
            _loc4_ = false;
        }
        if (this._imageUrl.indexOf("force32") > -1) {
            _loc9_ = 32;
        }
        if (_loc9_ == 32 && _loc4_) {
            _loc6_ = new Matrix();
            _loc6_.scale(0.5, 0.5);
            _loc2_ = new BitmapData(_loc10_.width / 2 | 0, _loc10_.height / 2 | 0, true, 16777215);
            _loc2_.draw(_loc10_, _loc6_);
        } else {
            _loc2_ = _loc10_.clone();
        }
        let _loc7_: number = 0;
        let _loc8_: number = 0;
        let _loc5_: boolean = false;
        let _loc13_: boolean = false;
        switch (_loc14_) {
            case 0:
                _loc7_ = 0;
                _loc8_ = 0;
                _loc5_ = false;
                _loc13_ = false;
                break;
            case 1:
                _loc7_ = -_loc2_.width;
                _loc8_ = 0;
                _loc5_ = true;
                _loc13_ = false;
                break;
            case 2:
                _loc7_ = -_loc2_.width;
                _loc8_ = -_loc2_.height;
                _loc5_ = true;
                _loc13_ = true;
                break;
            case 3:
                _loc7_ = 0;
                _loc8_ = -_loc2_.height;
                _loc5_ = false;
                _loc13_ = true;
                break;
            default:
                FurnitureRoomBrandingVisualization._log_FurnitureRoomBrandingVisualization.warn("could not handle unknown state " + _loc14_);
        }
        if (this._dynamicAssetName) {
            this.clearBrandedSpriteAssets();
            this.assetCollection.disposeAsset(this._dynamicAssetName);
        }
        this._dynamicAssetName = _loc12_;
        let _loc3_: boolean = this.assetCollection.addAsset(_loc12_, _loc2_, true, _loc7_, _loc8_, _loc5_, _loc13_);
        if (!_loc3_) {
            FurnitureRoomBrandingVisualization._log_FurnitureRoomBrandingVisualization.warn("could not add asset for image " + _loc12_);
        }
    }

    private clearBrandedSpriteAssets(): void {
        let _loc2_: number = 0;
        let _loc1_: IRoomObjectSprite = null;
        _loc2_ = 0;
        while (_loc2_ < this.spriteCount) {
            _loc1_ = this.getSprite(_loc2_);
            if (_loc1_ != null && _loc1_.tag == "branded_image") {
                _loc1_.asset = null;
            }
            _loc2_++;
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (FurnitureRoomBrandingVisualization.#staticsReady) return;
        FurnitureRoomBrandingVisualization.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(FurnitureRoomBrandingVisualization, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log_FurnitureRoomBrandingVisualization", null);
        set("_log_FurnitureRoomBrandingVisualization", new SimpleLogger("com.sulake.habbo.room.object.visualization.furniture.FurnitureRoomBrandingVisualization"));
    }
}
