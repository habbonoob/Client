import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { CatalogWidgetColourIndexEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColourIndexEvent';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { TextInputEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/TextInputEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIContainerButtonWindow } from '@/com/sulake/core/window/components/IContainerButtonWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { _SafeCls_1953 } from '@/com/sulake/habbo/catalog/viewer/_SafeCls_1953';
import { Offer } from '@/com/sulake/habbo/catalog/viewer/Offer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetColoursEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColoursEvent';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { SetExtraPurchaseParameterEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetExtraPurchaseParameterEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class TrophyCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::TrophyCatalogWidget'); }

    private static readonly gold: number = 16763904;
    private static readonly silver: number = 13421772;
    private static readonly bronze: number = 13395456;

    declare private _previewImage: IBitmapWrapperWindow;

    declare private _trophyOffers: UtilsMap;

    private _SafeStr_2510: number = 0;
    private _SafeStr_3293: string = "g";

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2857: IWindow;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override dispose(): void {
        if (this._trophyOffers != null) {
            this._trophyOffers.dispose();
        }
        this._trophyOffers = null;
        this._catalog = null;
        this._SafeStr_2857 = null;
        super.dispose();
    }

    public override init(): boolean {
        let _loc7_: string = null;
        let _loc6_: string = null;
        let _loc2_: UtilsMap = null;
        let _loc3_: IWindowContainer = null;
        if (!super.init()) {
            return false;
        }
        this._previewImage = asGuarded(this.window.findChildByName("ctlg_teaserimg_1"), isIBitmapWrapperWindow);
        this.events.addEventListener("SELECT_PRODUCT", this.onSelectProduct);
        this.events.addEventListener("COLOUR_INDEX", this.onColourIndex);
        this.events.addEventListener("TEXT_INPUT", this.onTextInput);
        let _loc5_: IContainerButtonWindow = asGuarded(this.window.findChildByName("ctlg_nextmodel_button"), isIContainerButtonWindow);
        let _loc4_: IContainerButtonWindow = asGuarded(this.window.findChildByName("ctlg_prevmodel_button"), isIContainerButtonWindow);
        if (_loc5_ != null) {
            _loc5_.addEventListener("WME_CLICK", this.onClickNext);
        }
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onClickPrev);
        }
        this._trophyOffers = new UtilsMap();
        let _loc1_: Offer = null;
        for (const $e of this.page.offers ?? []) {
            _loc1_ = castTo($e, Offer);
            _loc7_ = this.getBaseNameFromProduct(_loc1_.localizationId);
            _loc6_ = this.getTrophyTypeFromProduct(_loc1_.localizationId);
            if (this._trophyOffers.getValue(_loc7_) == null) {
                this._trophyOffers.add(_loc7_, new UtilsMap());
            }
            _loc2_ = asInstanceOf(this._trophyOffers.getValue(_loc7_), UtilsMap);
            _loc2_.add(_loc6_, _loc1_);
        }
        if (this.page.offers.length == 1) {
            _loc5_.visible = _loc4_.visible = false;
            if (this.page.offers[0].product.isColorable == false) {
                if (castGuarded(this.window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer")) {
                    _loc3_ = asGuarded(castGuarded(this.window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").findChildByName("colourGridWidget"), isIWindowContainer);
                    if (_loc3_) {
                        _loc3_.visible = false;
                    }
                }
            }
        }
        this.events.addEventListener("WIDGETS_INITIALIZED", this.onWidgetsInitialized);
        return true;
    }

    private onWidgetsInitialized = (param1: CatalogWidgetEvent): void => {
        let _loc3_: Offer = null;
        let _loc4_: any[] = [];
        _loc4_.push(16763904);
        _loc4_.push(13421772);
        _loc4_.push(13395456);
        let _loc2_: UtilsMap = this._trophyOffers.getWithIndex(this._SafeStr_2510);
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getValue(this._SafeStr_3293);
            if (_loc3_ == null) {
                _loc3_ = _loc2_.getWithIndex(0);
            }
            if (_loc3_ != null) {
                this.events.dispatchEvent(new SelectProductEvent(_loc3_));
            }
        }
        this.events.dispatchEvent(new CatalogWidgetColoursEvent(_loc4_, "ctlg_clr_40x32_1", "ctlg_clr_40x32_2", "ctlg_clr_40x32_3"));
    };

    private onSelectProduct = (param1: SelectProductEvent): void => {
        let _loc5_: BitmapData = null;
        let _loc3_: IProduct = null;
        let _loc4_: ImageResult = null;
        if (param1 == null) {
            return;
        }
        let _loc2_: IPurchasableOffer = param1.offer;
        let _loc6_: IProductData = this.page.viewer.catalog.getProductData(_loc2_.localizationId);
        if (_SafeCls_1953.hasProductImage(_loc2_.localizationId)) {
            this.setPreviewFromAsset(stringOrNull(_SafeCls_1953.PRODUCT_IMAGES.get(_loc2_.localizationId)));
        } else {
            _loc3_ = _loc2_.product;
            _loc4_ = this.page.viewer.roomEngine.getFurnitureImage(_loc3_.productClassId, new Vector3d(2, 0, 0), 64, this, 0, _loc3_.extraParam);
            _loc2_.previewCallbackId = _loc4_.id;
            if (_loc4_ != null) {
                _loc5_ = _loc4_.data;
            }
            this.setPreviewImage(_loc5_, true);
        }
        this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(_loc2_, this._window, this._SafeStr_2857, this._previewImage, 0, false, 0);
    };

    private onColourIndex = (param1: CatalogWidgetColourIndexEvent): void => {
        let _loc3_: Offer = null;
        if (param1.index == 0) {
            this._SafeStr_3293 = "g";
        }
        if (param1.index == 1) {
            this._SafeStr_3293 = "s";
        }
        if (param1.index == 2) {
            this._SafeStr_3293 = "b";
        }
        let _loc2_: UtilsMap = this._trophyOffers.getWithIndex(this._SafeStr_2510);
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getValue(this._SafeStr_3293);
            if (_loc3_ == null) {
                _loc3_ = _loc2_.getWithIndex(0);
            }
            if (_loc3_ != null) {
                this.events.dispatchEvent(new SelectProductEvent(_loc3_));
            }
        }
        this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(_loc3_, this._window, this._SafeStr_2857, this._previewImage, 0, false, 0);
    };

    public onTextInput = (param1: TextInputEvent): void => {
        this.events.dispatchEvent(new SetExtraPurchaseParameterEvent(param1.text));
    };

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed || this.page == null || this.page.offers == null) {
            return;
        }
        for (const _loc3_ of this.page.offers ?? []) {
            if (_loc3_.previewCallbackId == param1) {
                _loc3_.previewCallbackId = 0;
                this.setPreviewImage(param2, true);
                break;
            }
        }
    }

    public imageFailed(param1: number): void {
    }

    private getBaseNameFromProduct(param1: string): string {
        let _loc2_: string = this.getTrophyTypeFromProduct(param1);
        if (_loc2_.length > 0) {
            return param1.slice(0, param1.length - 1 - _loc2_.length);
        }
        return param1;
    }

    private getTrophyTypeFromProduct(param1: string): string {
        let _loc3_: number = param1.indexOf("prizetrophy_2011_");
        if (_loc3_ != -1) {
            return "";
        }
        let _loc2_: number = param1.lastIndexOf("_") + 1;
        if (_loc2_ <= 0) {
            return "";
        }
        let _loc4_: string = param1.substr(_loc2_);
        if (_loc4_.length > 1 || _loc4_ != "g" && _loc4_ != "s" && _loc4_ != "b") {
            return "";
        }
        return _loc4_;
    }

    private onClickNext = (param1: WindowMouseEvent): void => {
        let _loc3_: Offer = null;
        this._SafeStr_2510 = this._SafeStr_2510 + 1;
        if (this._SafeStr_2510 >= this._trophyOffers.length) {
            this._SafeStr_2510 = 0;
        }
        let _loc2_: UtilsMap = this._trophyOffers.getWithIndex(this._SafeStr_2510);
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getValue(this._SafeStr_3293);
            if (_loc3_ == null) {
                _loc3_ = _loc2_.getWithIndex(0);
            }
            if (_loc3_ != null) {
                this.events.dispatchEvent(new SelectProductEvent(_loc3_));
            }
        }
    };

    private onClickPrev = (param1: WindowMouseEvent): void => {
        let _loc3_: Offer = null;
        this._SafeStr_2510 = this._SafeStr_2510 - 1;
        if (this._SafeStr_2510 < 0) {
            this._SafeStr_2510 = this._trophyOffers.length - 1;
        }
        let _loc2_: UtilsMap = this._trophyOffers.getWithIndex(this._SafeStr_2510);
        if (_loc2_ != null) {
            _loc3_ = _loc2_.getValue(this._SafeStr_3293);
            if (_loc3_ == null) {
                _loc3_ = _loc2_.getWithIndex(0);
            }
            if (_loc3_ != null) {
                this.events.dispatchEvent(new SelectProductEvent(_loc3_));
            }
        }
    };

    private setPreviewImage(param1: BitmapData, param2: boolean): void {
        let _loc3_: Point = null;
        if (!this.window.disposed && this._previewImage != null) {
            if (param1 == null) {
                param1 = new BitmapData(1, 1);
                param2 = true;
            }
            if (this._previewImage.bitmap == null) {
                this._previewImage.bitmap = new BitmapData(this._previewImage.width, this._previewImage.height, true, 16777215);
            }
            this._previewImage.bitmap.fillRect(this._previewImage.bitmap.rect, 16777215);
            _loc3_ = new Point((this._previewImage.width - param1.width) / 2, (this._previewImage.height - param1.height) / 2);
            this._previewImage.bitmap.copyPixels(param1, param1.rect, _loc3_, null, null, true);
            this._previewImage.invalidate();
        }
        if (param2 && param1 != null) {
            param1.dispose();
        }
    }

    private setPreviewFromAsset(param1: string): void {
        let _loc2_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc2_ == null) {
            this.retrievePreviewAsset(param1);
            return;
        }
        this.setPreviewImage(asInstanceOf(_loc2_.content, BitmapData), false);
    }

    private retrievePreviewAsset(param1: string): void {
        let _loc4_: string = this.page.viewer.catalog.imageGalleryHost + param1 + ".gif";
        Logger.log("[TrophyCatalogWidget] Retrieve Product Preview Asset: " + _loc4_);
        let _loc2_: URLRequest = new URLRequest(_loc4_);
        let _loc3_: AssetLoaderStruct = this.page.viewer.catalog.assets.loadAssetFromFile(param1, _loc2_, "image/gif");
        _loc3_.addEventListener("AssetLoaderEventComplete", this.onPreviewImageReady);
    }

    private onPreviewImageReady = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc2_ != null) {
            this.setPreviewFromAsset(_loc2_.assetName);
        }
    };

    get [IGetImageListener](): true {
        return true;
    }
}
