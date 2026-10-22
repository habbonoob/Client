import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';
import type { IAvatarDataContainer } from '@/com/sulake/habbo/avatar/animation/IAvatarDataContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IDragAndDropDoneReceiver } from '@/com/sulake/habbo/catalog/viewer/IDragAndDropDoneReceiver';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import type { SetRoomPreviewerStuffDataEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SetRoomPreviewerStuffDataEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { RoomPreviewer } from '@/com/sulake/habbo/room/preview/RoomPreviewer';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { BundleProductContainer } from '@/com/sulake/habbo/catalog/viewer/BundleProductContainer';
import { ProductDisplayWrapper } from '@/com/sulake/habbo/catalog/viewer/ProductDisplayWrapper';
import { ProductImageConfiguration } from '@/com/sulake/habbo/catalog/viewer/ProductImageConfiguration';
import { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetBundleDisplayExtraInfoEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetBundleDisplayExtraInfoEvent';
import { CatalogWidgetSpinnerEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSpinnerEvent';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ProductViewCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener, IDragAndDropDoneReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::ProductViewCatalogWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ProductViewCatalogWidget.#initStatics();
        return ProductViewCatalogWidget._log;
    }

    private static readonly WALL_PAPER: number = 2;
    private static readonly _SafeStr_8126: number = 3;
    private static readonly LANDSCAPE: number = 4;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    declare protected _gridItemLayout: XML;

    declare private _SafeStr_5168: BitmapData;

    declare private _productName: IWindow;

    declare private _productDescription: IWindow;

    declare private _previewImage: IBitmapWrapperWindow;

    declare private _SafeStr_2397: IWindowContainer;

    declare private _SafeStr_2987: IWidgetWindow;

    declare private _SafeStr_4878: IProductImageWidget;

    declare private _SafeStr_2691: IDisplayObjectWrapper;

    declare private _previewOffset: Point;

    declare private _bundleGrid: IItemGridWindow;

    declare private _effectSprites: any[];

    declare private _overrideStuffData: IStuffData;

    private _SafeStr_4734: SelectProductEvent = null;

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2857: IWindow;

    private _SafeStr_5332: boolean = true;
    private _SafeStr_7151: boolean = false;
    private _SafeStr_5856: boolean = true;

    declare private _offer: IPurchasableOffer;

    declare private _SafeStr_4072: boolean;
    static { (this.prototype as any)._SafeStr_4072 = false; }

    public override dispose(): void {
        if (!this.disposed) {
            this.events.removeEventListener("SELECT_PRODUCT", this.onPreviewProduct);
            this.events.removeEventListener("CWE_SET_PREVIEWER_STUFFDATA", this.onStuffDataSet);
            this.events.removeEventListener("CWSE_VALUE_CHANGED", this.onSpinnerEvent);
            this.events.removeEventListener("TOTAL_PRICE_WIDGET_INITIALIZED", this.onTotalPriceWidgetInitialized);
            this._catalog = null;
            this._SafeStr_2857 = null;
            super.dispose();
            this._SafeStr_5168 = null;
            this._SafeStr_2397 = null;
            this._SafeStr_2987 = null;
            this._SafeStr_4878 = null;
        }
    }

    public override init(): boolean {
        let _loc4_: RoomPreviewer = null;
        let _loc3_: DisplayObject = null;
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("productViewWidget");
        if (!this._isEmbedded) {
            this._window.getChildAt(0).width = this._window.width;
            this._window.getChildAt(0).height = this._window.height;
        }
        if (this._window.tags.indexOf("2X") > -1) {
        }
        this._SafeStr_5856 = this._window.tags.indexOf("NO_ROOM_CANVAS") == -1;
        this._SafeStr_2857 = null;
        this._productName = this._window.findChildByName("ctlg_product_name");
        this._productName.caption = "";
        this._productDescription = this._window.findChildByName("ctlg_description");
        this._productDescription.caption = "";
        (isITextWindow(this._productName) ? this._productName : null).textColor = 0;
        (isITextWindow(this._productDescription) ? this._productDescription : null).textColor = 0;
        this._previewImage = asGuarded(this._window.findChildByName("ctlg_teaserimg_1"), isIBitmapWrapperWindow);
        this._SafeStr_2397 = asGuarded(this._window.findChildByName("room_canvas_container"), isIWindowContainer);
        if (this._SafeStr_2397 != null) {
            this._SafeStr_2397.visible = false;
            this._SafeStr_2691 = asGuarded(this._SafeStr_2397.findChildByName("room_canvas"), isIDisplayObjectWrapper);
            _loc4_ = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).roomPreviewer;
            if (this._SafeStr_2691 != null && _loc4_ != null) {
                this._SafeStr_2397.procedure = this.roomCanvasContainerProcedure;
                _loc4_.disableUpdate = false;
                _loc4_.reset(false);
                _loc3_ = _loc4_.getRoomCanvas(this._SafeStr_2691.width, this._SafeStr_2691.height);
                if (_loc3_ != null) {
                    this._SafeStr_2691.setDisplayObject(_loc3_);
                }
            } else {
                this._SafeStr_2397 = null;
                this._SafeStr_2691 = null;
            }
        }
        this._SafeStr_2987 = asGuarded(this._window.findChildByName("product_image_widget"), isIWidgetWindow);
        if (this._SafeStr_2987 != null) {
            this._SafeStr_4878 = asGuarded(this._SafeStr_2987.widget, isIProductImageWidget);
            this._SafeStr_2987.visible = false;
        }
        this._previewOffset = new Point(this._previewImage.x, this._previewImage.y);
        this._bundleGrid = asGuarded(this._window.findChildByName("bundleGrid"), isIItemGridWindow);
        if (this._bundleGrid == null) {
            ProductViewCatalogWidget._log.warn("[Product View Catalog Widget] Bundle Grid not initialized!");
        }
        let _loc2_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("gridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(_loc2_.content, XML);
        let _loc1_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("ctlg_dyndeal_background"), BitmapDataAsset);
        this._SafeStr_5168 = asInstanceOf(_loc1_.content, BitmapData);
        this.events.addEventListener("SELECT_PRODUCT", this.onPreviewProduct);
        this.events.addEventListener("CWE_SET_PREVIEWER_STUFFDATA", this.onStuffDataSet);
        this.events.addEventListener("CWSE_VALUE_CHANGED", this.onSpinnerEvent);
        this.events.addEventListener("TOTAL_PRICE_WIDGET_INITIALIZED", this.onTotalPriceWidgetInitialized);
        return true;
    }

    public override closed(): void {
        let _loc1_: RoomPreviewer = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).roomPreviewer;
        if (_loc1_) {
            _loc1_.disableUpdate = true;
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this.disposed || this.page == null || this.page.offers == null) {
            return;
        }
        for (const _loc3_ of this.page.offers ?? []) {
            if (_loc3_.previewCallbackId == param1) {
                this.setPreviewImage(param2, true);
                _loc3_.previewCallbackId = 0;
                break;
            }
        }
    }

    public imageFailed(param1: number): void {
    }

    public onDragAndDropDone(param1: boolean, param2: string): void {
    }

    private roomCanvasContainerProcedure = (param1: WindowEvent, param2: IWindow): void => {
        switch (param1.type) {
            case "WME_CLICK":
                if (this._catalog.roomPreviewer != null) {
                    this._catalog.roomPreviewer.changeRoomObjectState();
                }
                break;
            case "WME_UP":
            case "WME_OVER":
                this._SafeStr_4072 = false;
                break;
            case "WME_DOWN":
                this._SafeStr_4072 = true;
                break;
            case "WME_OUT":
                if (this._SafeStr_4072) {
                    if (this._catalog.isDraggable(this._offer)) {
                        this._catalog.requestSelectedItemToMover(this, this._offer);
                    }
                }
                this._SafeStr_4072 = false;
        }
    };

    private setBundleInfoWidgetToOffer(param1: IPurchasableOffer): void {
        let _loc2_: ExtraInfoItemData = new ExtraInfoItemData(5);
        _loc2_.activityPointType = param1.activityPointType;
        _loc2_.priceActivityPoints = param1.priceInActivityPoints;
        _loc2_.priceCredits = param1.priceInCredits;
        _loc2_.priceSilver = param1.priceInSilver;
        _loc2_.badgeCode = param1.badgeCode;
        this.events.dispatchEvent(new CatalogWidgetBundleDisplayExtraInfoEvent("CWPPEIE_RESET", _loc2_));
    }

    private setSpinnerToBundleRuleset(): void {
        if (this._catalog.bundleDiscountEnabled) {
            this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_RESET", 1, this._catalog.utils.bundleDiscountFlatPriceSteps));
        } else {
            this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_RESET", 1));
        }
        this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_SHOW"));
        if (this._catalog.bundleDiscountRuleset != null) {
            this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_SET_MAX", this._catalog.bundleDiscountRuleset.maxPurchaseSize));
        }
        this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_SET_MIN", 1));
    }

    private addEffectSprites(param1: BitmapData, param2: IAvatarImage, param3: Point, param4: Point, param5: boolean = true): void {
        let _loc9_: any = null;
        let _loc17_: number = 0;
        let _loc10_: IAnimationLayerData = null;
        let _loc19_: number = 0;
        let _loc14_: number = 0;
        let _loc15_: number = 0;
        let _loc16_: number = 0;
        let _loc20_: number = 0;
        let _loc7_: string = null;
        let _loc6_: BitmapDataAsset = null;
        let _loc8_: BitmapData = null;
        let _loc18_: number = NaN;
        let _loc12_: number = NaN;
        let _loc13_: number = NaN;
        let _loc11_: Matrix = null;
        for (_loc9_ of param2.getSprites() ?? []) {
            _loc17_ = this._window.getChildIndex(this._previewImage);
            _loc10_ = param2.getLayerData(_loc9_);
            _loc19_ = 0;
            _loc14_ = _loc9_.getDirectionOffsetX(param2.getDirection());
            _loc15_ = _loc9_.getDirectionOffsetY(param2.getDirection());
            _loc16_ = _loc9_.getDirectionOffsetZ(param2.getDirection());
            _loc20_ = 0;
            if (!param5) {
                if (_loc16_ >= 0) {
                    continue;
                }
            } else if (_loc16_ < 0) {
                continue;
            }
            if (_loc9_.hasDirections) {
                _loc20_ = param2.getDirection();
            }
            if (_loc10_ != null) {
                _loc19_ = _loc10_.animationFrame;
                _loc14_ += _loc10_.dx;
                _loc15_ += _loc10_.dy;
                _loc20_ += _loc10_.directionOffset;
            }
            if (_loc20_ < 0) {
                _loc20_ += 8;
            }
            if (_loc20_ > 7) {
                _loc20_ -= 8;
            }
            _loc7_ = param2.getScale() + "_" + _loc9_.member + "_" + _loc20_ + "_" + _loc19_;
            _loc6_ = param2.getAsset(_loc7_);
            if (_loc6_ != null) {
                _loc8_ = (asInstanceOf(_loc6_.content, BitmapData)).clone();
                _loc18_ = 1;
                _loc12_ = param4.x - 1 * _loc6_.offset.x + _loc14_;
                _loc13_ = param4.y - 1 * _loc6_.offset.y + _loc15_;
                if (_loc9_.ink == 33) {
                    _loc11_ = new Matrix(1, 0, 0, 1, _loc12_ - param3.x, _loc13_ - param3.y);
                    param1.draw(_loc8_, _loc11_, null, "add", null, false);
                } else {
                    param1.copyPixels(_loc8_, _loc8_.rect, new Point(_loc12_ - param3.x, _loc13_ - param3.y));
                }
            }
        }
    }

    private removeEffectSprites(): void {
        for (let _loc1_ of this._effectSprites ?? []) {
            this._window.removeChild(_loc1_);
            _loc1_.dispose();
            _loc1_ = null;
        }
        this._effectSprites = [];
    }

    private setPreviewImage(param1: BitmapData, param2: boolean, param3: Point = null): void {
        let _loc4_: Point = null;
        if (this._previewImage != null && !this.window.disposed) {
            if (param1 == null) {
                param1 = new BitmapData(1, 1);
                param2 = true;
            }
            if (this._previewImage.bitmap == null) {
                this._previewImage.bitmap = new BitmapData(this._previewImage.width, this._previewImage.height, true, 16777215);
            }
            this._previewImage.bitmap.fillRect(this._previewImage.bitmap.rect, 16777215);
            _loc4_ = new Point((this._previewImage.width - param1.width) / 2, (this._previewImage.height - param1.height) / 2);
            this._previewImage.bitmap.copyPixels(param1, param1.rect, _loc4_, null, null, true);
            this._previewImage.invalidate();
            this._previewImage.x = this._previewOffset.x | 0;
            this._previewImage.y = this._previewOffset.y | 0;
            if (param3 != null) {
                this._previewImage.x += param3.x;
                this._previewImage.y += param3.y;
            }
        }
        if (param2) {
            param1.dispose();
        }
    }

    private setPreviewFromAsset(param1: string): void {
        if (!param1 || !this.page || !this.page.viewer || !this.page.viewer.catalog || !this.page.viewer.catalog.assets) {
            return;
        }
        let _loc2_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc2_ == null) {
            this.retrievePreviewAsset(param1);
            return;
        }
        this.setPreviewImage(asInstanceOf(_loc2_.content, BitmapData), false);
    }

    private retrievePreviewAsset(param1: string): void {
        if (!param1 || !this.page || !this.page.viewer || !this.page.viewer.catalog) {
            return;
        }
        let _loc4_: string = this.page.viewer.catalog.imageGalleryHost + param1 + ".gif";
        ProductViewCatalogWidget._log.info("[Product View Catalog Widget] Retrieve Product Preview Asset: " + _loc4_);
        let _loc2_: URLRequest = new URLRequest(_loc4_);
        if (!this.page.viewer.catalog.assets) {
            return;
        }
        let _loc3_: AssetLoaderStruct = this.page.viewer.catalog.assets.loadAssetFromFile(param1, _loc2_, "image/gif");
        if (!_loc3_) {
            return;
        }
        _loc3_.addEventListener("AssetLoaderEventComplete", this.onPreviewImageReady);
    }

    private static ninjaEffectBundled(param1: SelectProductEvent): boolean {
        let _loc3_: number = 0;
        let _loc2_: IProduct = null;
        let _loc4_: boolean = false;
        if (param1.offer.productContainer.products.length == 2) {
            _loc3_ = 0;
            while (_loc3_ < 2) {
                _loc2_ = param1.offer.productContainer.products[_loc3_];
                if (_loc2_.productType == "e" && _loc2_.productClassId == 108) {
                    _loc4_ = true;
                }
                _loc3_++;
            }
        }
        return _loc4_;
    }

    private onPreviewProduct = (param1: SelectProductEvent): void => {
        let _loc28_: string = null;
        let _loc33_: BitmapData = null;
        let _loc27_: Point = null;
        let _loc4_: RoomPreviewer = null;
        let _loc2_: BundleProductContainer = null;
        let _loc24_: IProduct = null;
        let _loc8_: ImageResult = null;
        let _loc19_: IFurnitureData = null;
        let _loc15_: any = undefined;
        let _loc23_: any[] = null;
        let _loc29_: string = null;
        let _loc22_: string = null;
        let _loc10_: string = null;
        let _loc21_: string = null;
        let _loc3_: string = null;
        let _loc34_: string = null;
        let _loc12_: IFurnitureData = null;
        let _loc32_: IAvatarImage = null;
        let _loc25_: string = null;
        let _loc13_: IHabboWindowManager = null;
        let _loc5_: IWindowContainer = null;
        let _loc18_: any = 0;
        let _loc16_: BitmapData = null;
        let _loc9_: HabboCatalog = null;
        let _loc30_: IAvatarImage = null;
        let _loc6_: Point = null;
        let _loc7_: IAvatarDataContainer = null;
        let _loc26_: IAnimationLayerData = null;
        let _loc31_: number = 0;
        let _loc11_: Point = null;
        if (param1 == null) {
            return;
        }
        this._SafeStr_4734 = param1;
        this.removeEffectSprites();
        let _loc14_: IPurchasableOffer;
        this._offer = _loc14_ = param1.offer;
        if (this._bundleGrid != null) {
            this._bundleGrid.visible = false;
            this._bundleGrid.destroyGridItems();
        }
        this._productName.caption = _loc14_.localizationName;
        this._productDescription.caption = _loc14_.localizationDescription;
        this._productDescription.y = this._productName.y + this._productName.height;
        if (this._catalog.multiplePurchaseEnabled && _loc14_.bundlePurchaseAllowed && this._SafeStr_7151) {
            this.setSpinnerToBundleRuleset();
            this.setBundleInfoWidgetToOffer(_loc14_);
            this._SafeStr_5332 = false;
        } else {
            this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_HIDE"));
            this.events.dispatchEvent(new CatalogWidgetBundleDisplayExtraInfoEvent("CWPPEIE_HIDE"));
            this._SafeStr_5332 = true;
        }
        if (this._SafeStr_5332) {
            this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(_loc14_, this._window, this._SafeStr_2857, this._previewImage, -6, false, 6, this.page.acceptSeasonCurrencyAsCredits, this.page.acceptSeasonCurrencyAsCredits);
        } else if (this._SafeStr_2857 != null) {
            this._window.removeChild(this._SafeStr_2857);
            this._SafeStr_2857.dispose();
            this._SafeStr_2857 = null;
        }
        if (_loc14_.badgeCode != null && _loc14_.badgeCode != "") {
            this._catalog.utils.showExtraOnProduct(4, _loc14_.badgeCode, this._window, 6, 38, true, false);
        } else if (_loc14_.extraChatStyleCode && _loc14_.extraChatStyleCode != "") {
            this._catalog.utils.showExtraOnProduct(9, _loc14_.extraChatStyleCode, this._window, 6, 38, true, false);
        } else if (ProductViewCatalogWidget.ninjaEffectBundled(param1)) {
            this._catalog.utils.showAssetImageAsBadgeOnProduct("catalogue_effects_ninja", this._window, 6, 38, true, false);
        } else {
            this._catalog.utils.hideExtraFromProduct(this._window);
        }
        if (this._SafeStr_2987 != null) {
            this._SafeStr_2987.visible = false;
        }
        if (ProductImageConfiguration.hasProductImage(_loc14_.localizationId)) {
            this.setPreviewFromAsset(stringOrNull(ProductImageConfiguration.PRODUCT_IMAGES.get(_loc14_.localizationId)));
            if (this._SafeStr_2397 != null) {
                this._SafeStr_2397.visible = false;
            }
        } else {
            _loc27_ = new Point(0, 0);
            _loc4_ = this._catalog.roomPreviewer;
            switch (_loc14_.pricingModel) {
                case "pricing_model_bundle":
                    _loc33_ = this._SafeStr_5168.clone();
                    if (this._bundleGrid != null) {
                        this._bundleGrid.visible = true;
                        _loc2_ = asInstanceOf(_loc14_.productContainer, BundleProductContainer);
                        _loc2_.populateItemGrid(this._bundleGrid, this._gridItemLayout);
                        this._bundleGrid.scrollV = 0;
                    }
                    if (this._SafeStr_2397 != null) {
                        this._SafeStr_2397.visible = false;
                    }
                    break;
                case "pricing_model_single":
                case "pricing_model_multi":
                case "pricing_model_furniture":
                    _loc24_ = _loc14_.product;
                    if (this._SafeStr_2397 != null && this._SafeStr_5856) {
                        if (_loc24_.productType == "s" || _loc24_.productType == "i" || _loc24_.productType == "e") {
                            this._SafeStr_2397.visible = true;
                        } else {
                            this._SafeStr_2397.visible = false;
                        }
                    }
                    if (_loc4_ != null && this._SafeStr_2691 != null) {
                        _loc4_.addViewOffset.y = _loc24_.isUniqueLimitedItem ? -15 : 0;
                        _loc4_.disableUpdate = false;
                    }
                    switch (_loc24_.productType) {
                        case "s":
                            if (_loc4_ != null && this._SafeStr_2691 != null) {
                                if (!(_loc24_ == null || _loc24_.furnitureData == null)) {
                                    if (_loc24_.furnitureData.category == 23) {
                                        _loc19_ = this._catalog.sessionDataManager.getFloorItemData(_loc24_.furnitureData.id);
                                        _loc15_ = new Array<number>(0).fill(0);
                                        _loc23_ = _loc19_.customParams.split(",");
                                        for (const _loc20_ of _loc23_ ?? []) {
                                            if ((asInstanceOf(this.page.viewer.catalog, HabboCatalog)).avatarRenderManager.isValidFigureSetForGender(parseInt(stringOrNull(_loc20_)) | 0, (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.gender)) {
                                                _loc15_.push(parseInt(stringOrNull(_loc20_)));
                                            }
                                        }
                                        _loc28_ = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).avatarRenderManager.getFigureStringWithFigureIds((asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.figure, (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.gender, _loc15_);
                                        _loc4_.addAvatarIntoRoom(_loc28_, _loc24_.productClassId);
                                        break;
                                    }
                                    _loc4_.addFurnitureIntoRoom(_loc24_.productClassId, new Vector3d(90, 0, 0), this._overrideStuffData);
                                }
                                break;
                            }
                            _loc8_ = this.page.viewer.roomEngine.getFurnitureImage(_loc24_.productClassId, new Vector3d(90, 0, 0), 64, this, 0, _loc24_.extraParam, -1, -1, this._overrideStuffData);
                            _loc14_.previewCallbackId = _loc8_.id;
                            break;
                        case "i":
                            if (_loc24_.furnitureData.category == 2 || _loc24_.furnitureData.category == 3 || _loc24_.furnitureData.category == 4) {
                                _loc29_ = this._catalog.roomEngine.getRoomStringValue(this._catalog.roomEngine.activeRoomId, "room_wall_type");
                                _loc22_ = this._catalog.roomEngine.getRoomStringValue(this._catalog.roomEngine.activeRoomId, "room_floor_type");
                                _loc10_ = this._catalog.roomEngine.getRoomStringValue(this._catalog.roomEngine.activeRoomId, "room_landscape_type");
                                _loc29_ = _loc29_ && _loc29_.length > 0 ? _loc29_ : "101";
                                _loc22_ = _loc22_ && _loc22_.length > 0 ? _loc22_ : "101";
                                _loc10_ = _loc10_ && _loc10_.length > 0 ? _loc10_ : "1.1";
                                _loc4_.updateRoomWallsAndFloorVisibility(true, true);
                                _loc21_ = _loc24_.furnitureData.category == 3 ? _loc24_.extraParam : _loc22_;
                                _loc3_ = _loc24_.furnitureData.category == 2 ? _loc24_.extraParam : _loc29_;
                                _loc34_ = _loc24_.furnitureData.category == 4 ? _loc24_.extraParam : _loc10_;
                                _loc4_.updateObjectRoom(_loc21_, _loc3_, _loc34_);
                                if (_loc24_.furnitureData.category == 4) {
                                    _loc12_ = this._catalog.getFurnitureDataByName("ads_twi_windw", "i");
                                    _loc4_.addWallItemIntoRoom(_loc12_.id, new Vector3d(90, 0, 0), _loc12_.customParams);
                                }
                                break;
                            }
                            if (_loc4_ != null && this._SafeStr_2691 != null) {
                                _loc4_.addWallItemIntoRoom(_loc24_.productClassId, new Vector3d(90, 0, 0), _loc24_.extraParam);
                                break;
                            }
                            _loc8_ = this.page.viewer.roomEngine.getWallItemImage(_loc24_.productClassId, new Vector3d(90, 0, 0), 64, this, 0, _loc24_.extraParam);
                            _loc14_.previewCallbackId = _loc8_.id;
                            break;
                        case "r":
                            _loc32_ = this._catalog.avatarRenderManager.createAvatarImage(_loc24_.extraParam, "h", null);
                            _loc32_.appendAction("gest", "sml");
                            _loc32_.setDirection("full", 4);
                            _loc32_.setDirection("head", 3);
                            _loc33_ = _loc32_.getCroppedImage("full");
                            break;
                        case "e":
                            if (_loc4_ != null && this._SafeStr_2691 != null) {
                                _loc25_ = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.figure;
                                _loc4_.addAvatarIntoRoom(_loc25_, _loc24_.productClassId);
                                break;
                            }
                            _loc13_ = this.page.viewer.catalog.windowManager;
                            _loc5_ = asGuarded(this._window.findChildByName("pixelsBackground"), isIWindowContainer);
                            _loc18_ = 4291611852;
                            if (_loc5_ != null) {
                                _loc5_.visible = true;
                                _loc18_ = _loc5_.color;
                            }
                            _loc33_ = new BitmapData(this._previewImage.width, this._previewImage.height, false, _loc18_ >>> 0);
                            _loc16_ = null;
                            _loc9_ = asInstanceOf(this.page.viewer.catalog, HabboCatalog);
                            if (_loc9_.avatarRenderManager != null) {
                                _loc28_ = _loc9_.sessionDataManager.figure;
                                _loc30_ = _loc9_.avatarRenderManager.createAvatarImage(_loc28_, "h");
                                if (_loc30_ != null) {
                                    _loc30_.setDirection("head", 3);
                                    _loc30_.initActionAppends();
                                    _loc30_.appendAction("gest", "sml");
                                    _loc30_.appendAction("fx", _loc24_.productClassId);
                                    _loc30_.endActionAppends();
                                    _loc30_.updateAnimationByFrames(1);
                                    _loc30_.updateAnimationByFrames(1);
                                    _loc16_ = _loc30_.getImage("full", true);
                                    _loc6_ = new Point(0, 0);
                                    if (_loc16_ != null) {
                                        _loc7_ = _loc30_.avatarSpriteData;
                                        if (_loc7_ != null) {
                                        }
                                        _loc6_.x = (_loc33_.width - _loc16_.width) / 2;
                                        _loc6_.y = (_loc33_.height - _loc16_.height) / 2;
                                        for (const _loc17_ of _loc30_.getSprites() ?? []) {
                                            if (_loc17_.id == "avatar") {
                                                _loc26_ = _loc30_.getLayerData(_loc17_);
                                                _loc27_.x = _loc26_.dx;
                                                _loc27_.y = _loc26_.dy;
                                            }
                                        }
                                    }
                                    _loc31_ = 64;
                                    _loc11_ = new Point((_loc16_.width - _loc31_) / 2, _loc16_.height - _loc31_ / 4);
                                    this.addEffectSprites(_loc33_, _loc30_, _loc27_, _loc6_.add(_loc11_), false);
                                    _loc33_.copyPixels(_loc16_, _loc16_.rect, _loc6_, null, null, true);
                                    this.addEffectSprites(_loc33_, _loc30_, _loc27_, _loc6_.add(_loc11_));
                                }
                            }
                            if (_loc30_) {
                                _loc30_.dispose();
                            }
                            break;
                        case "h":
                            break;
                        default:
                            if (ProductDisplayWrapper.isSupported(_loc24_.productType) && this._SafeStr_2987 != null) {
                                this._SafeStr_2987.visible = true;
                                this._SafeStr_4878.productInfo = new ProductDisplayWrapper(_loc24_);
                                break;
                            }
                            ProductViewCatalogWidget._log.warn("[Product View Catalog Widget] Unknown Product Type: " + _loc24_.productType);
                    }
                    if (_loc8_ != null) {
                        _loc33_ = _loc8_.data;
                    }
                    break;
                default:
                    ProductViewCatalogWidget._log.warn("[Product View Catalog Widget] Unknown pricing model" + _loc14_.pricingModel);
            }
            this.setPreviewImage(_loc33_, true, _loc27_);
        }
        if (this._SafeStr_5856 && _loc4_ && this._SafeStr_2691 && this._SafeStr_2397 && this._SafeStr_2691.visible && this._SafeStr_2397.visible) {
            (isITextWindow(this._productName) ? this._productName : null).textColor = 4294967295;
            (isITextWindow(this._productDescription) ? this._productDescription : null).textColor = 4294967295;
        } else {
            (isITextWindow(this._productName) ? this._productName : null).textColor = 4278190080;
            (isITextWindow(this._productDescription) ? this._productDescription : null).textColor = 4278190080;
        }
        this._window.invalidate();
    };

    private onPreviewImageReady = (param1: AssetLoaderEvent): void => {
        let _loc2_: AssetLoaderStruct = asInstanceOf(param1.target, AssetLoaderStruct);
        if (_loc2_ != null) {
            this.setPreviewFromAsset(_loc2_.assetName);
            _loc2_.removeEventListener("AssetLoaderEventComplete", this.onPreviewImageReady);
        }
    };

    private onStuffDataSet = (param1: SetRoomPreviewerStuffDataEvent): void => {
        let _loc2_: RoomPreviewer = null;
        this._overrideStuffData = param1.stuffData;
        if (this._SafeStr_4734 != null) {
            _loc2_ = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).roomPreviewer;
            if (_loc2_ != null) {
                _loc2_.reset(false);
            }
            this.onPreviewProduct(this._SafeStr_4734);
        }
    };

    private onSpinnerEvent = (param1: CatalogWidgetSpinnerEvent): void => {
        let _loc2_: IWindowContainer = null;
        if (param1.type == "CWSE_VALUE_CHANGED") {
            _loc2_ = asGuarded(this.window.findChildByName("price_box_new"), isIWindowContainer);
            if (_loc2_ != null && this._SafeStr_4734 != null) {
                this._catalog.utils.showPriceInContainer(_loc2_, this._SafeStr_4734.offer);
            }
        }
    };

    private onTotalPriceWidgetInitialized = (param1: Event): void => {
        this._SafeStr_7151 = true;
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ProductViewCatalogWidget.#staticsReady) return;
        ProductViewCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ProductViewCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.widgets.ProductViewCatalogWidget"));
    }

    get [IGetImageListener](): true {
        return true;
    }
}
