import { castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IGraphicAsset } from '@/com/sulake/room/object/visualization/utils/IGraphicAsset';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { JSONDecoder } from '@habbo-pixi/runtime/json/JSONDecoder';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Logger } from '@/com/sulake/habbo/Logger';
import { ExtraDataManager } from '@/com/sulake/habbo/room/object/visualization/data/ExtraDataManager';
import { ExternalIsometricImageFurniVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/ExternalIsometricImageFurniVisualization';

export class FurnitureExternalImageVisualization extends ExternalIsometricImageFurniVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureExternalImageVisualization'); }

    declare private _SafeStr_6025: boolean;
    static { (this.prototype as any)._SafeStr_6025 = false; }

    declare private _baseUrl: string;

    declare private _SafeStr_5548: string;

    declare private _SafeStr_2991: string;

    private _SafeStr_5250: boolean = false;
    private _SafeStr_4188: string = "";

    declare private _SafeStr_5994: string;

    constructor() {
        super();
        this.hasOutline = true;
    }

    public override setExternalBaseUrls(param1: string, param2: string, param3: boolean): void {
        this._baseUrl = param1;
        this._SafeStr_5548 = param2;
        this._SafeStr_6025 = param3;
    }

    protected override getThumbnailURL(): string {
        let _loc2_: string = null;
        let _loc3_: string = null;
        if (!this.object || this._baseUrl == "disabled" || this._SafeStr_2991 == "REJECTED") {
            return null;
        }
        if (this._SafeStr_2991) {
            return this._SafeStr_2991;
        }
        let _loc1_: string = this.object.getModel().getString("furniture_data");
        if (_loc1_ == null) {
            return null;
        }
        try {
            if (this.object.getType().indexOf("external_image_wallitem_poster") != -1) {
                this._SafeStr_4188 = "";
            } else {
                this._SafeStr_4188 = "postcards/selfie/";
            }
            _loc2_ = this.getJsonValue(_loc1_, "id", null);
            if (_loc2_ && _loc2_.length > 0) {
                if (!this._SafeStr_5250) {
                    this._SafeStr_5994 = _loc2_;
                    this._SafeStr_5250 = true;
                    if (this._SafeStr_6025) {
                        ExtraDataManager.requestExtraDataUrl(this);
                    } else {
                        this.loadExtraData(_loc2_);
                    }
                }
                return null;
            }
            _loc3_ = this.getJsonValue(_loc1_, "w", "url");
            _loc3_ = this.buildThumbnailUrl(_loc3_, this._SafeStr_4188);
        } catch (error) {
            return null;
        }
        this._SafeStr_2991 = _loc3_;
        return _loc3_;
    }

    public getExternalImageUUID(): string {
        return this._SafeStr_5994;
    }

    private buildThumbnailUrl(param1: string, param2: string): string {
        if (param1 == "REJECTED") {
            return param1;
        }
        if (param1.indexOf("http") != 0) {
            param1 = this._baseUrl + param2 + param1;
        }
        param1 = param1.replace(".png", "_small.png");
        if (param1.indexOf(".png") == -1) {
            param1 += "_small.png";
        }
        return param1;
    }

    private getJsonValue(param1: string, param2: string, param3: string): string {
        let _loc5_: any = new JSONDecoder(param1, false).getValue();
        let _loc4_: string = stringOrNull(_loc5_[param2]);
        if (_loc4_ == null && param3 != null) {
            _loc4_ = stringOrNull(_loc5_[param3]);
        }
        return _loc4_;
    }

    private loadExtraData(param1: string): void {
        let _loc3_: string = this._SafeStr_5548 + param1;
        let _loc2_: URLLoader = new URLLoader(new URLRequest(_loc3_));
        _loc2_.addEventListener("complete", this.onExtraDataLoaded);
        _loc2_.addEventListener("ioError", this.onExtraDataError);
        this._SafeStr_5250 = true;
    }

    private onExtraDataError = (param1: Event): void => {
        Logger.log("Extra data failed to load " + param1.toString());
    };

    private onExtraDataLoaded = (param1: Event): void => {
        let _loc2_: string = stringOrNull(castTo(param1.target, URLLoader).data);
        if (_loc2_.length == 0) {
            return;
        }
        let _loc3_: string = this.getJsonValue(_loc2_, "w", "url");
        this._SafeStr_2991 = this.buildThumbnailUrl(_loc3_, this._SafeStr_4188);
    };

    public onUrlFromExtraDataService(param1: string): void {
        this._SafeStr_2991 = this.buildThumbnailUrl(param1, this._SafeStr_4188);
    }

    public getExtraDataUrl(): string {
        return this._SafeStr_5548;
    }

    public override dispose(): void {
        ExtraDataManager.furnitureDisposed(this);
        super.dispose();
    }

    public override getImage(param1: number, param2: number): BitmapData {
        if (!this.assetCollection) {
            return new BitmapData(1, 1, true, 0);
        }
        let _loc3_: string = this.getFullThumbnailAssetName(param2, 32);
        if (this.assetCollection.getAsset(_loc3_) == null && this.object) {
            _loc3_ = this.object.getType() + "_icon_a";
        }
        if (this.assetCollection.getAsset(_loc3_) == null) {
            return new BitmapData(1, 1, true, 0);
        }
        let _loc4_: any = this.assetCollection.getAsset(_loc3_).asset.content;
        if (!_loc4_) {
            return new BitmapData(1, 1, true, 0);
        }
        return (_loc4_ instanceof BitmapData ? _loc4_ : null).clone();
    }

    protected override getLibraryAssetNameForSprite(param1: IGraphicAsset, param2: IRoomObjectSprite): string {
        return this._SafeStr_2991;
    }
}
