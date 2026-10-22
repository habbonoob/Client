import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAnimationLayerData } from '@/com/sulake/habbo/avatar/animation/IAnimationLayerData';
import type { IAvatarDataContainer } from '@/com/sulake/habbo/avatar/animation/IAvatarDataContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IDragAndDropDoneReceiver } from '@/com/sulake/habbo/catalog/viewer/IDragAndDropDoneReceiver';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { CatalogWidgetRoomChangedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetRoomChangedEvent';
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
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLoaderStruct } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AvatarAction } from '@/com/sulake/habbo/avatar/enum/AvatarAction';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { _SafeCls_1953 } from '@/com/sulake/habbo/catalog/viewer/_SafeCls_1953';
import { BundleProductContainer } from '@/com/sulake/habbo/catalog/viewer/BundleProductContainer';
import { ProductDisplayWrapper } from '@/com/sulake/habbo/catalog/viewer/ProductDisplayWrapper';
import { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetBundleDisplayExtraInfoEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetBundleDisplayExtraInfoEvent';
import { CatalogWidgetSpinnerEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetSpinnerEvent';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class ProductViewCatalogWidget extends CatalogWidget implements ICatalogWidget, IGetImageListener, IDragAndDropDoneReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::ProductViewCatalogWidget'); }

    static #staticsReady = false;

    private static readonly WALL_PAPER: number = 2;
    private static readonly _SafeStr_8126: number = 3;
    private static readonly LANDSCAPE: number = 4;
    private static readonly PREVIEW_AVATAR_DEFAULT_BODY_DIRECTION: number = 2;
    private static readonly PREVIEW_AVATAR_DEFAULT_HEAD_DIRECTION: number = 3;
    private static readonly _SafeStr_14160: number = 8;
    private static readonly PREVIEW_MODE_NONE: number = 0;
    private static readonly PREVIEW_MODE_AVATAR: number = 1;
    private static readonly PREVIEW_MODE_FLOOR_FURNITURE: number = 2;
    private static readonly PREVIEW_MODE_WALL_ITEM: number = 3;
    private static readonly PREVIEW_ACTION_STAND: number = 0;
    private static readonly PREVIEW_ACTION_WALK: number = 1;
    private static readonly PREVIEW_ACTION_DANCE: number = 2;
    private static readonly PREVIEW_ACTION_SIT: number = 3;
    private static readonly PREVIEW_ACTION_LAY: number = 4;
    private static readonly PREVIEW_ACTION_WAVE: number = 5;
    private static readonly PREVIEW_ACTION_COUNT: number = 6;
    private static readonly PREVIEW_ZOOM_NORMAL: number = 1;
    private static readonly PREVIEW_ZOOM_IN: number = 2;
    private static readonly PREVIEW_ZOOM_IN_CAMERA_OFFSET_Y: number = 41;
    private static readonly PREVIEW_ZOOM_MOVE_SPEED_DENOMINATOR: number = 9;
    private static readonly PREVIEW_ZOOM_SPEED_SLOW: number = 0.12;

    private static get PREVIEW_SIT_OFFSETS(): Vector3d {
        ProductViewCatalogWidget.#initStatics();
        return ProductViewCatalogWidget.PREVIEW_SIT_OFFSETS;
    }

    private static get PREVIEW_LAY_OFFSETS(): Vector3d {
        ProductViewCatalogWidget.#initStatics();
        return ProductViewCatalogWidget.PREVIEW_LAY_OFFSETS;
    }

    declare private _SafeStr_5168: BitmapData;

    declare private _productName: IWindow;

    declare private _productDescription: IWindow;

    declare private _SafeStr_14161: IStaticBitmapWrapperWindow;

    declare private _SafeStr_14162: IStaticBitmapWrapperWindow;

    declare private _previewImage: IBitmapWrapperWindow;

    declare private _SafeStr_2397: IWindowContainer;

    declare private _SafeStr_14163: IWindow;

    declare private _SafeStr_14164: IWindow;

    declare private _SafeStr_14165: IWindow;

    declare private _SafeStr_14166: IWindow;

    declare private _SafeStr_2987: IWidgetWindow;

    declare private _SafeStr_4878: IProductImageWidget;

    declare private _SafeStr_2691: IDisplayObjectWrapper;

    declare private _SafeStr_14167: Sprite;

    declare private _roomCanvasDisplayObject: DisplayObject;

    declare private _previewOffset: Point;

    declare private _bundleGrid: IItemGridWindow;

    declare protected _gridItemLayout: XML;

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

    private _previewMode: number = 0;

    declare private _SafeStr_14168: boolean;
    static { (this.prototype as any)._SafeStr_14168 = false; }

    private _SafeStr_14169: number = 2;
    private _SafeStr_14170: number = 3;
    private _SafeStr_14171: number = 0;
    private _SafeStr_14172: number = 1;
    private _previewZoomAnimationProgress: number = 0;
    private _previewZoomAnimationTargetProgress: number = 0;
    private _SafeStr_14173: number = 0;
    private _SafeStr_14174: number = 0;
    private _SafeStr_14175: boolean = false;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
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

    public override dispose(): void {
        if (!this.disposed) {
            this.events.removeEventListener("SELECT_PRODUCT", this.onPreviewProduct);
            this.events.removeEventListener("CWE_ROOM_CHANGED", this.onRoomChanged);
            this.events.removeEventListener("CWE_SET_PREVIEWER_STUFFDATA", this.onStuffDataSet);
            this.events.removeEventListener("CWSE_VALUE_CHANGED", this.onSpinnerEvent);
            this.events.removeEventListener("TOTAL_PRICE_WIDGET_INITIALIZED", this.onTotalPriceWidgetInitialized);
            HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
            if (this._SafeStr_14163 != null) {
                this._SafeStr_14163.removeEventListener("WME_CLICK", this.onRotateAvatarLeft);
                this._SafeStr_14163 = null;
            }
            if (this._SafeStr_14164 != null) {
                this._SafeStr_14164.removeEventListener("WME_CLICK", this.onRotateAvatarRight);
                this._SafeStr_14164 = null;
            }
            if (this._SafeStr_14165 != null) {
                this._SafeStr_14165.removeEventListener("WME_CLICK", this.onTogglePreviewMagic);
                this._SafeStr_14165 = null;
            }
            if (this._SafeStr_14166 != null) {
                this._SafeStr_14166.removeEventListener("WME_CLICK", this.onTogglePreviewZoom);
                this._SafeStr_14166 = null;
            }
            this.setFloorFurnitureRotationAvailabilityMonitorEnabled(false);
            this.stopPreviewZoomAnimation();
            this._catalog = null;
            this._SafeStr_2857 = null;
            super.dispose();
            this._SafeStr_5168 = null;
            this._SafeStr_2397 = null;
            this._SafeStr_14167 = null;
            this._roomCanvasDisplayObject = null;
            this._SafeStr_2987 = null;
            this._SafeStr_4878 = null;
        }
    }

    public override init(): boolean {
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
        this._SafeStr_14161 = asGuarded(this._window.findChildByName("tradeable_icon"), isIStaticBitmapWrapperWindow);
        if (this._SafeStr_14161 != null) {
            this._SafeStr_14161.visible = false;
        }
        this._SafeStr_14162 = asGuarded(this._window.findChildByName("recyclable_icon"), isIStaticBitmapWrapperWindow);
        if (this._SafeStr_14162 != null) {
            this._SafeStr_14162.visible = false;
        }
        (isITextWindow(this._productName) ? this._productName : null).textColor = 0;
        (isITextWindow(this._productDescription) ? this._productDescription : null).textColor = 0;
        this._previewImage = asGuarded(this._window.findChildByName("ctlg_teaserimg_1"), isIBitmapWrapperWindow);
        this._SafeStr_2397 = asGuarded(this._window.findChildByName("room_canvas_container"), isIWindowContainer);
        if (this._SafeStr_2397 != null) {
            this._SafeStr_2397.visible = false;
            this._SafeStr_2691 = asGuarded(this._SafeStr_2397.findChildByName("room_canvas"), isIDisplayObjectWrapper);
            if (this._SafeStr_2691 != null && this._catalog.roomPreviewer != null) {
                this._SafeStr_2397.procedure = this.roomCanvasContainerProcedure;
                this.refreshRoomCanvasBinding(true);
            } else {
                this._SafeStr_2397 = null;
                this._SafeStr_2691 = null;
            }
        }
        this._SafeStr_14163 = this._window.findChildByName("rotate_avatar_left");
        if (this._SafeStr_14163 != null) {
            this._SafeStr_14163.visible = false;
            this._SafeStr_14163.addEventListener("WME_CLICK", this.onRotateAvatarLeft);
        }
        this._SafeStr_14164 = this._window.findChildByName("rotate_avatar_right");
        if (this._SafeStr_14164 != null) {
            this._SafeStr_14164.visible = false;
            this._SafeStr_14164.addEventListener("WME_CLICK", this.onRotateAvatarRight);
        }
        this._SafeStr_14165 = this._window.findChildByName("toggle_preview_magic");
        if (this._SafeStr_14165 != null) {
            this._SafeStr_14165.visible = false;
            this._SafeStr_14165.addEventListener("WME_CLICK", this.onTogglePreviewMagic);
        }
        this._SafeStr_14166 = this._window.findChildByName("toggle_preview_zoom");
        if (this._SafeStr_14166 != null) {
            this._SafeStr_14166.visible = false;
            this._SafeStr_14166.addEventListener("WME_CLICK", this.onTogglePreviewZoom);
        }
        this._SafeStr_2987 = asGuarded(this._window.findChildByName("product_image_widget"), isIWidgetWindow);
        if (this._SafeStr_2987 != null) {
            this._SafeStr_4878 = asGuarded(this._SafeStr_2987.widget, isIProductImageWidget);
            this._SafeStr_2987.visible = false;
        }
        this._previewOffset = new Point(this._previewImage.x, this._previewImage.y);
        this._bundleGrid = asGuarded(this._window.findChildByName("bundleGrid"), isIItemGridWindow);
        if (this._bundleGrid == null) {
            Logger.log("[Product View Catalog Widget] Bundle Grid not initialized!");
        }
        let _loc2_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("gridItem"), XmlAsset);
        this._gridItemLayout = asInstanceOf(_loc2_.content, XML);
        let _loc1_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("ctlg_dyndeal_background"), BitmapDataAsset);
        this._SafeStr_5168 = asInstanceOf(_loc1_.content, BitmapData);
        this.events.addEventListener("SELECT_PRODUCT", this.onPreviewProduct);
        this.events.addEventListener("CWE_ROOM_CHANGED", this.onRoomChanged);
        this.events.addEventListener("CWE_SET_PREVIEWER_STUFFDATA", this.onStuffDataSet);
        this.events.addEventListener("CWSE_VALUE_CHANGED", this.onSpinnerEvent);
        this.events.addEventListener("TOTAL_PRICE_WIDGET_INITIALIZED", this.onTotalPriceWidgetInitialized);
        return true;
    }

    private refreshRoomCanvasBinding(param1: boolean = false): void {
        if (this._SafeStr_2691 == null) {
            return;
        }
        let _loc3_: RoomPreviewer = this._catalog.roomPreviewer;
        if (_loc3_ == null) {
            return;
        }
        _loc3_.disableUpdate = false;
        if (param1) {
            _loc3_.reset(false);
        }
        let _loc2_: DisplayObject = _loc3_.getRoomCanvas(this._SafeStr_2691.width, this._SafeStr_2691.height);
        if (_loc2_ != null) {
            this.bindRoomCanvasDisplayObject(_loc2_);
            this.applyRoomCanvasZoom();
        }
    }

    private bindRoomCanvasDisplayObject(param1: DisplayObject): void {
        if (this._SafeStr_2691 == null || param1 == null) {
            return;
        }
        if (this._SafeStr_14167 == null) {
            this._SafeStr_14167 = new Sprite();
            this._SafeStr_14167.mouseEnabled = false;
            this._SafeStr_14167.mouseChildren = false;
            this._SafeStr_2691.setDisplayObject(this._SafeStr_14167);
            if (this._previewZoomAnimationProgress != this._previewZoomAnimationTargetProgress) {
                this.startPreviewZoomAnimation();
            }
            this.setFloorFurnitureRotationAvailabilityMonitorEnabled(this._previewMode == 2);
        }
        this._SafeStr_14167.scrollRect = new Rectangle(0, 0, this._SafeStr_2691.width, this._SafeStr_2691.height);
        if (this._roomCanvasDisplayObject != param1 || param1.parent != this._SafeStr_14167) {
            if (this._roomCanvasDisplayObject != null && this._roomCanvasDisplayObject.parent == this._SafeStr_14167) {
                this._SafeStr_14167.removeChild(this._roomCanvasDisplayObject);
            }
            if (param1.parent != null) {
                param1.parent.removeChild(param1);
            }
            this._SafeStr_14167.addChild(param1);
            this._roomCanvasDisplayObject = param1;
        }
    }

    private onRoomChanged = (param1: CatalogWidgetRoomChangedEvent): void => {
        this.refreshRoomCanvasBinding();
        if (this._SafeStr_4734 != null) {
            this.onPreviewProduct(this._SafeStr_4734);
        }
    };

    private onRotateAvatarLeft = (param1: WindowMouseEvent): void => {
        this.rotateCurrentPreview(1);
        param1.stopPropagation();
    };

    private onRotateAvatarRight = (param1: WindowMouseEvent): void => {
        this.rotateCurrentPreview(-1);
        param1.stopPropagation();
    };

    private onTogglePreviewMagic = (param1: WindowMouseEvent): void => {
        this.cyclePreviewAvatarAction();
        param1.stopPropagation();
    };

    private onTogglePreviewZoom = (param1: WindowMouseEvent): void => {
        this.togglePreviewZoom();
        param1.stopPropagation();
    };

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

    private onPreviewProduct = (param1: SelectProductEvent): void => {
        let _loc30_: string = null;
        let _loc35_: BitmapData = null;
        let _loc29_: Point = null;
        let _loc4_: RoomPreviewer = null;
        let _loc2_: BundleProductContainer = null;
        let _loc26_: IProduct = null;
        let _loc8_: ImageResult = null;
        let _loc21_: IFurnitureData = null;
        let _loc17_: any = undefined;
        let _loc25_: any[] = null;
        let _loc31_: string = null;
        let _loc24_: string = null;
        let _loc10_: string = null;
        let _loc23_: string = null;
        let _loc3_: string = null;
        let _loc36_: string = null;
        let _loc14_: IFurnitureData = null;
        let _loc34_: IAvatarImage = null;
        let _loc27_: string = null;
        let _loc15_: IHabboWindowManager = null;
        let _loc5_: IWindowContainer = null;
        let _loc20_: any = 0;
        let _loc18_: BitmapData = null;
        let _loc9_: HabboCatalog = null;
        let _loc32_: IAvatarImage = null;
        let _loc6_: Point = null;
        let _loc7_: IAvatarDataContainer = null;
        let _loc28_: IAnimationLayerData = null;
        let _loc33_: number = 0;
        let _loc11_: Point = null;
        let _loc13_: number = 0;
        let _loc12_: boolean = false;
        if (param1 == null) {
            return;
        }
        this._SafeStr_4734 = param1;
        this.removeEffectSprites();
        let _loc16_: IPurchasableOffer;
        this._offer = _loc16_ = param1.offer;
        if (this._bundleGrid != null) {
            this._bundleGrid.visible = false;
            this._bundleGrid.destroyGridItems();
        }
        this._productName.caption = _loc16_.localizationName;
        this._productDescription.caption = _loc16_.localizationDescription;
        this.updateAvailabilityIndicators(_loc16_);
        if (this._catalog.multiplePurchaseEnabled && _loc16_.bundlePurchaseAllowed && this._SafeStr_7151) {
            this.setSpinnerToBundleRuleset();
            this.setBundleInfoWidgetToOffer(_loc16_);
            this._SafeStr_5332 = false;
        } else {
            this.events.dispatchEvent(new CatalogWidgetSpinnerEvent("CWSE_HIDE"));
            this.events.dispatchEvent(new CatalogWidgetBundleDisplayExtraInfoEvent("CWPPEIE_HIDE"));
            this._SafeStr_5332 = true;
        }
        if (this._SafeStr_5332) {
            this._SafeStr_2857 = this._catalog.utils.showPriceOnProduct(_loc16_, this._window, this._SafeStr_2857, this._previewImage, -6, false, 6, this.page.acceptSeasonCurrencyAsCredits, this.page.acceptSeasonCurrencyAsCredits);
        } else if (this._SafeStr_2857 != null) {
            this._window.removeChild(this._SafeStr_2857);
            this._SafeStr_2857.dispose();
            this._SafeStr_2857 = null;
        }
        if (_loc16_.badgeCode != null && _loc16_.badgeCode != "") {
            this._catalog.utils.showExtraOnProduct(4, _loc16_.badgeCode, this._window, 6, 44, false, false);
        } else if (_loc16_.extraChatStyleCode && _loc16_.extraChatStyleCode != "") {
            this._catalog.utils.showExtraOnProduct(9, _loc16_.extraChatStyleCode, this._window, 6, 44, false, false);
        } else if (ProductViewCatalogWidget.ninjaEffectBundled(param1)) {
            this._catalog.utils.showAssetImageAsBadgeOnProduct("catalogue_effects_ninja", this._window, 6, 44, true, false);
        } else {
            this._catalog.utils.hideExtraFromProduct(this._window);
        }
        if (this._SafeStr_2987 != null) {
            this._SafeStr_2987.visible = false;
        }
        if (_SafeCls_1953.hasProductImage(_loc16_.localizationId)) {
            this.setPreviewFromAsset(stringOrNull(_SafeCls_1953.PRODUCT_IMAGES.get(_loc16_.localizationId)));
            if (this._SafeStr_2397 != null) {
                this._SafeStr_2397.visible = false;
            }
        } else {
            _loc29_ = new Point(0, 0);
            _loc4_ = this._catalog.roomPreviewer;
            switch (_loc16_.pricingModel) {
                case "pricing_model_bundle":
                    _loc35_ = this._SafeStr_5168.clone();
                    if (this._bundleGrid != null) {
                        this._bundleGrid.visible = true;
                        _loc2_ = asInstanceOf(_loc16_.productContainer, BundleProductContainer);
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
                    _loc26_ = _loc16_.product;
                    if (this._SafeStr_2397 != null && this._SafeStr_5856) {
                        if (_loc26_.productType == "s" || _loc26_.productType == "i" || _loc26_.productType == "e") {
                            this._SafeStr_2397.visible = true;
                        } else {
                            this._SafeStr_2397.visible = false;
                        }
                    }
                    if (_loc4_ != null && this._SafeStr_2691 != null) {
                        _loc4_.addViewOffset.y = _loc26_.isUniqueLimitedItem ? -15 : 0;
                        _loc4_.disableUpdate = false;
                    }
                    switch (_loc26_.productType) {
                        case "s":
                            if (_loc4_ != null && this._SafeStr_2691 != null) {
                                if (_loc26_ == null || _loc26_.furnitureData == null) {
                                    break;
                                }
                                if (_loc26_.furnitureData.category == 23) {
                                    _loc21_ = this._catalog.sessionDataManager.getFloorItemData(_loc26_.furnitureData.id);
                                    _loc17_ = new Array<number>(0).fill(0);
                                    _loc25_ = _loc21_.customParams.split(",");
                                    for (const _loc22_ of _loc25_ ?? []) {
                                        if ((asInstanceOf(this.page.viewer.catalog, HabboCatalog)).avatarRenderManager.isValidFigureSetForGender(parseInt(stringOrNull(_loc22_)) | 0, (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.gender)) {
                                            _loc17_.push(parseInt(stringOrNull(_loc22_)));
                                        }
                                    }
                                    _loc30_ = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).avatarRenderManager.getFigureStringWithFigureIds((asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.figure, (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.gender, _loc17_);
                                    _loc4_.addAvatarIntoRoom(_loc30_);
                                    this.applyPreviewAvatarDirection(_loc4_);
                                    this.applyPreviewAvatarAction(_loc4_);
                                    _loc13_ = 1;
                                } else {
                                    _loc4_.addFurnitureIntoRoom(_loc26_.productClassId, new Vector3d(90, 0, 0), this._overrideStuffData);
                                    _loc13_ = 2;
                                    _loc12_ = _loc4_.canRotatePreviewFurniture();
                                }
                            } else {
                                _loc8_ = this.page.viewer.roomEngine.getFurnitureImage(_loc26_.productClassId, new Vector3d(90, 0, 0), 64, this, 0, _loc26_.extraParam, -1, -1, this._overrideStuffData);
                                _loc16_.previewCallbackId = _loc8_.id;
                            }
                            break;
                        case "i":
                            if (_loc26_.furnitureData.category == 2 || _loc26_.furnitureData.category == 3 || _loc26_.furnitureData.category == 4) {
                                _loc31_ = this._catalog.roomEngine.getRoomStringValue(this._catalog.roomEngine.activeRoomId, "room_wall_type");
                                _loc24_ = this._catalog.roomEngine.getRoomStringValue(this._catalog.roomEngine.activeRoomId, "room_floor_type");
                                _loc10_ = this._catalog.roomEngine.getRoomStringValue(this._catalog.roomEngine.activeRoomId, "room_landscape_type");
                                _loc31_ = _loc31_ && _loc31_.length > 0 ? _loc31_ : "101";
                                _loc24_ = _loc24_ && _loc24_.length > 0 ? _loc24_ : "101";
                                _loc10_ = _loc10_ && _loc10_.length > 0 ? _loc10_ : "1.1";
                                _loc4_.updateRoomWallsAndFloorVisibility(true, true);
                                _loc23_ = _loc26_.furnitureData.category == 3 ? _loc26_.extraParam : _loc24_;
                                _loc3_ = _loc26_.furnitureData.category == 2 ? _loc26_.extraParam : _loc31_;
                                _loc36_ = _loc26_.furnitureData.category == 4 ? _loc26_.extraParam : _loc10_;
                                _loc4_.updateObjectRoom(_loc23_, _loc3_, _loc36_);
                                if (_loc26_.furnitureData.category == 4) {
                                    _loc14_ = this._catalog.getFurnitureDataByName("window_double_default", "i");
                                    _loc4_.addWallItemIntoRoom(_loc14_.id, new Vector3d(90, 0, 0), _loc14_.customParams);
                                }
                            } else if (_loc4_ != null && this._SafeStr_2691 != null) {
                                _loc4_.addWallItemIntoRoom(_loc26_.productClassId, new Vector3d(90, 0, 0), _loc26_.extraParam);
                                _loc13_ = _loc4_.canRotatePreviewWallItem() ? 3 : 0;
                            } else {
                                _loc8_ = this.page.viewer.roomEngine.getWallItemImage(_loc26_.productClassId, new Vector3d(90, 0, 0), 64, this, 0, _loc26_.extraParam);
                                _loc16_.previewCallbackId = _loc8_.id;
                            }
                            break;
                        case "r":
                            _loc34_ = this._catalog.avatarRenderManager.createAvatarImage(_loc26_.extraParam, "h", null);
                            _loc34_.appendAction("gest", "sml");
                            _loc34_.setDirection("full", 4);
                            _loc34_.setDirection("head", 3);
                            _loc35_ = _loc34_.getCroppedImage("full");
                            break;
                        case "e":
                            if (_loc4_ != null && this._SafeStr_2691 != null) {
                                _loc27_ = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).sessionDataManager.figure;
                                _loc4_.addAvatarIntoRoom(_loc27_, _loc26_.productClassId);
                                this.applyPreviewAvatarDirection(_loc4_);
                                this.applyPreviewAvatarAction(_loc4_);
                                _loc13_ = 1;
                            } else {
                                _loc15_ = this.page.viewer.catalog.windowManager;
                                _loc5_ = asGuarded(this._window.findChildByName("pixelsBackground"), isIWindowContainer);
                                _loc20_ = 4291611852;
                                if (_loc5_ != null) {
                                    _loc5_.visible = true;
                                    _loc20_ = _loc5_.color;
                                }
                                _loc35_ = new BitmapData(this._previewImage.width, this._previewImage.height, false, _loc20_ >>> 0);
                                _loc18_ = null;
                                _loc9_ = asInstanceOf(this.page.viewer.catalog, HabboCatalog);
                                if (_loc9_.avatarRenderManager != null) {
                                    _loc30_ = _loc9_.sessionDataManager.figure;
                                    _loc32_ = _loc9_.avatarRenderManager.createAvatarImage(_loc30_, "h");
                                    if (_loc32_ != null) {
                                        _loc32_.setDirection("head", 3);
                                        _loc32_.initActionAppends();
                                        _loc32_.appendAction("gest", "sml");
                                        _loc32_.appendAction("fx", _loc26_.productClassId);
                                        _loc32_.endActionAppends();
                                        _loc32_.updateAnimationByFrames(1);
                                        _loc32_.updateAnimationByFrames(1);
                                        _loc18_ = _loc32_.getImage("full", true);
                                        _loc6_ = new Point(0, 0);
                                        if (_loc18_ != null) {
                                            _loc7_ = _loc32_.avatarSpriteData;
                                            if (_loc7_ != null) {
                                            }
                                            _loc6_.x = (_loc35_.width - _loc18_.width) / 2;
                                            _loc6_.y = (_loc35_.height - _loc18_.height) / 2;
                                            for (const _loc19_ of _loc32_.getSprites() ?? []) {
                                                if (_loc19_.id == "avatar") {
                                                    _loc28_ = _loc32_.getLayerData(_loc19_);
                                                    _loc29_.x = _loc28_.dx;
                                                    _loc29_.y = _loc28_.dy;
                                                }
                                            }
                                        }
                                        _loc33_ = 64;
                                        _loc11_ = new Point((_loc18_.width - _loc33_) / 2, _loc18_.height - _loc33_ / 4);
                                        this.addEffectSprites(_loc35_, _loc32_, _loc29_, _loc6_.add(_loc11_), false);
                                        _loc35_.copyPixels(_loc18_, _loc18_.rect, _loc6_, null, null, true);
                                        this.addEffectSprites(_loc35_, _loc32_, _loc29_, _loc6_.add(_loc11_));
                                    }
                                }
                                if (_loc32_) {
                                    _loc32_.dispose();
                                }
                            }
                            break;
                        case "h":
                            break;
                        case "habbicon":
                            _loc35_ = this.getHabbiconPreviewBitmap(_loc26_.extraParam);
                            if (_loc35_ == null) {
                                HabbiconAssetManager.addEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
                                _loc35_ = new BitmapData(40, 40, false, 9408399);
                            }
                            break;
                        default:
                            if (ProductDisplayWrapper.isSupported(_loc26_.productType) && this._SafeStr_2987 != null) {
                                this._SafeStr_2987.visible = true;
                                this._SafeStr_4878.productInfo = new ProductDisplayWrapper(_loc26_);
                            } else {
                                Logger.log("[Product View Catalog Widget] Unknown Product Type: " + _loc26_.productType);
                            }
                    }
                    if (_loc8_ != null) {
                        _loc35_ = _loc8_.data;
                    }
                    break;
                default:
                    Logger.log("[Product View Catalog Widget] Unknown pricing model" + _loc16_.pricingModel);
            }
            this.setPreviewImage(_loc35_, true, _loc29_);
        }
        this.setPreviewMode(_loc13_, _loc12_);
        if (this._SafeStr_5856 && _loc4_ && this._SafeStr_2691 && this._SafeStr_2397 && this._SafeStr_2691.visible && this._SafeStr_2397.visible) {
            (isITextWindow(this._productName) ? this._productName : null).textColor = 4294967295;
            (isITextWindow(this._productDescription) ? this._productDescription : null).textColor = 4294967295;
        } else {
            (isITextWindow(this._productName) ? this._productName : null).textColor = 4278190080;
            (isITextWindow(this._productDescription) ? this._productDescription : null).textColor = 4278190080;
        }
        this._window.invalidate();
    };

    private rotateCurrentPreview(param1: number): void {
        let _loc2_: RoomPreviewer = this._catalog != null ? this._catalog.roomPreviewer : null;
        if (_loc2_ == null) {
            return;
        }
        switch (this._previewMode - 1) {
            case 0:
                this.rotatePreviewAvatar(param1, _loc2_);
                break;
            case 1:
                _loc2_.rotatePreviewFurniture(param1 > 0);
                break;
            case 2:
                _loc2_.rotatePreviewWallItem();
        }
    }

    private rotatePreviewAvatar(param1: number, param2: RoomPreviewer): void {
        if (this._previewMode != 1 || param2 == null) {
            return;
        }
        if (this._SafeStr_14171 == 3 && this.isDiagonalAvatarDirection(this._SafeStr_14169 + param1)) {
            param1 *= 2;
        } else if (this._SafeStr_14171 == 4 && !this.isValidLayingDirection(this._SafeStr_14169 + param1)) {
            if (this._SafeStr_14169 == 0) {
                param1 = 2;
            } else {
                param1 = -this._SafeStr_14169;
            }
        }
        this._SafeStr_14169 = this.normalizeAvatarDirection(this._SafeStr_14169 + param1);
        this._SafeStr_14170 = this._SafeStr_14169;
        this.applyPreviewAvatarDirection(param2);
    }

    private cyclePreviewAvatarAction(): void {
        let _loc1_: RoomPreviewer = this._catalog != null ? this._catalog.roomPreviewer : null;
        if (this._previewMode != 1 || _loc1_ == null) {
            return;
        }
        this._SafeStr_14171 = this.getNextPreviewAvatarAction(this._SafeStr_14171);
        this.applyPreviewAvatarAction(_loc1_);
    }

    private togglePreviewZoom(): void {
        if (this._previewMode != 1) {
            return;
        }
        this._SafeStr_14172 = this._SafeStr_14172 == 1 ? 2 : 1;
        this.animatePreviewZoomToSelection();
        this.updatePreviewControls();
    }

    private applyPreviewAvatarDirection(param1: RoomPreviewer): void {
        if (param1 == null) {
            return;
        }
        param1.updateAvatarDirectionAndLocation(this._SafeStr_14169, this._SafeStr_14170, this.getPreviewAvatarLocation());
        param1.updatePreviewRoomView(true);
        param1.updateRoomEngine();
    }

    private setPreviewMode(param1: number, param2: boolean = false): void {
        let _loc3_: number = param1;
        if (!this._SafeStr_5856 || this._SafeStr_2397 == null || !this._SafeStr_2397.visible) {
            _loc3_ = 0;
        }
        if (this._previewMode == 1 && _loc3_ != 1) {
            this.resetPreviewAvatarDirection();
            this.resetPreviewAvatarAction();
            this.resetPreviewZoom();
            this.setPreviewZoomAnimationTarget(0, true);
        }
        if (this._previewMode != 1 && _loc3_ == 1) {
            this._SafeStr_14172 = 2;
            this.setPreviewZoomAnimationTarget(1, true);
        }
        this._previewMode = _loc3_;
        this._SafeStr_14168 = this._previewMode == 2 && param2;
        this.setFloorFurnitureRotationAvailabilityMonitorEnabled(this._previewMode == 2);
        if (this._previewMode == 1 && this._previewZoomAnimationProgress != this._previewZoomAnimationTargetProgress) {
            this.animatePreviewZoomToSelection();
        }
        this.updatePreviewControls();
    }

    private setFloorFurnitureRotationAvailabilityMonitorEnabled(param1: boolean): void {
        if (this._SafeStr_14167 == null) {
            return;
        }
        if (param1) {
            if (!this._SafeStr_14167.hasEventListener("enterFrame")) {
                this._SafeStr_14167.addEventListener("enterFrame", this.onFloorFurnitureRotationAvailabilityFrame);
            }
        } else {
            this._SafeStr_14167.removeEventListener("enterFrame", this.onFloorFurnitureRotationAvailabilityFrame);
        }
    }

    private onFloorFurnitureRotationAvailabilityFrame = (param1: Event): void => {
        let _loc2_: RoomPreviewer = this._catalog != null ? this._catalog.roomPreviewer : null;
        if (this._previewMode != 2 || _loc2_ == null) {
            this.setFloorFurnitureRotationAvailabilityMonitorEnabled(false);
            return;
        }
        let _loc3_: boolean = _loc2_.canRotatePreviewFurniture();
        if (this._SafeStr_14168 != _loc3_) {
            this._SafeStr_14168 = _loc3_;
            this.updatePreviewControls();
        }
    };

    private updatePreviewControls(): void {
        let _loc3_: boolean = this._previewMode == 1;
        let _loc1_: boolean = this._previewMode != 0;
        let _loc2_: boolean = _loc1_ && (this._previewMode != 2 || this._SafeStr_14168);
        this.setPreviewButtonState(this._SafeStr_14163, _loc1_, _loc2_);
        this.setPreviewButtonState(this._SafeStr_14164, _loc1_, _loc2_);
        this.setPreviewButtonState(this._SafeStr_14165, _loc3_, _loc3_);
        this.setPreviewButtonState(this._SafeStr_14166, _loc3_, _loc3_);
    }

    private setPreviewButtonState(param1: IWindow, param2: boolean, param3: boolean): void {
        if (param1 == null) {
            return;
        }
        param1.visible = param2;
        if (param3) {
            param1.enable();
        } else {
            param1.disable();
        }
    }

    private resetPreviewAvatarDirection(): void {
        this._SafeStr_14169 = 2;
        this._SafeStr_14170 = 3;
    }

    private resetPreviewAvatarAction(): void {
        this._SafeStr_14171 = 0;
    }

    private getPreviewAvatarLocation(): Vector3d {
        switch (this._SafeStr_14171 - 3) {
            case 0:
                return ProductViewCatalogWidget.PREVIEW_SIT_OFFSETS;
            case 1:
                return ProductViewCatalogWidget.PREVIEW_LAY_OFFSETS;
            default:
                return null;
        }
    }

    private applyPreviewAvatarAction(param1: RoomPreviewer): void {
        if (param1 == null) {
            return;
        }
        param1.updateObjectUserAction("figure_dance", 0);
        param1.updateObjectUserAction("figure_expression", 0);
        switch (this._SafeStr_14171) {
            case 1:
                param1.updateUserPosture("mv");
                break;
            case 2:
                param1.updateUserPosture("std");
                param1.updateObjectUserAction("figure_dance", 1);
                break;
            case 3:
                param1.updateUserPosture("sit");
                break;
            case 4:
                param1.updateUserPosture("lay");
                break;
            case 5:
                param1.updateUserPosture("std");
                param1.updateObjectUserAction("figure_expression", AvatarAction.getExpressionId("wave"));
                break;
            default:
                param1.updateUserPosture("std");
        }
        param1.updateAvatarDirectionAndLocation(this._SafeStr_14169, this._SafeStr_14170, this.getPreviewAvatarLocation());
        param1.updatePreviewRoomView(true);
        param1.updateRoomEngine();
    }

    private getNextPreviewAvatarAction(param1: number): number {
        let _loc2_: number = param1;
        do {
            _loc2_ = (_loc2_ + 1) % 6;
        } while (this.isPreviewAvatarActionSkippedForDirection(_loc2_, this._SafeStr_14169));
        return _loc2_;
    }

    private isPreviewAvatarActionSkippedForDirection(param1: number, param2: number): boolean {
        return param1 == 3 && this.isDiagonalAvatarDirection(param2) || param1 == 4 && !this.isValidLayingDirection(param2);
    }

    private resetPreviewZoom(): void {
        this._SafeStr_14172 = 1;
    }

    private animatePreviewZoomToSelection(): void {
        this.setPreviewZoomAnimationTarget(this._SafeStr_14172 == 2 ? 1 : 0);
    }

    private setPreviewZoomAnimationTarget(param1: number, param2: boolean = false): void {
        param1 = Math.max(0, Math.min(1, param1));
        this._previewZoomAnimationTargetProgress = param1;
        if (param2) {
            this.stopPreviewZoomAnimation();
            this._previewZoomAnimationProgress = param1;
            this._SafeStr_14173 = 0;
            this._SafeStr_14174 = 0;
            this._SafeStr_14175 = false;
            this.applyRoomCanvasZoom();
            return;
        }
        let _loc3_: number = Math.abs(this._previewZoomAnimationTargetProgress - this._previewZoomAnimationProgress);
        if (_loc3_ <= 0) {
            this.stopPreviewZoomAnimation();
            this._previewZoomAnimationProgress = this._previewZoomAnimationTargetProgress;
            this._SafeStr_14174 = 0;
            this._SafeStr_14175 = false;
            this.applyRoomCanvasZoom();
            return;
        }
        this._SafeStr_14173 = _loc3_;
        this._SafeStr_14175 = true;
        this.startPreviewZoomAnimation();
    }

    private startPreviewZoomAnimation(): void {
        if (this._SafeStr_14167 == null || this._SafeStr_14167.hasEventListener("enterFrame")) {
            return;
        }
        this._SafeStr_14167.addEventListener("enterFrame", this.onPreviewZoomAnimationFrame);
    }

    private stopPreviewZoomAnimation(): void {
        if (this._SafeStr_14167 != null && this._SafeStr_14167.hasEventListener("enterFrame")) {
            this._SafeStr_14167.removeEventListener("enterFrame", this.onPreviewZoomAnimationFrame);
        }
    }

    private onPreviewZoomAnimationFrame = (param1: Event): void => {
        let _loc4_: number = this._previewZoomAnimationTargetProgress - this._previewZoomAnimationProgress;
        let _loc2_: number = Math.abs(_loc4_);
        if (_loc2_ <= 0.12) {
            this._previewZoomAnimationProgress = this._previewZoomAnimationTargetProgress;
            this._SafeStr_14174 = 0;
            this._SafeStr_14175 = false;
            this.stopPreviewZoomAnimation();
            this.applyRoomCanvasZoom();
            return;
        }
        if (_loc2_ > this._SafeStr_14173) {
            this._SafeStr_14173 = _loc2_;
        }
        let _loc5_: number = Math.sin(3.141592653589793 * _loc2_ / this._SafeStr_14173);
        let _loc6_: number = 0.06;
        let _loc3_: number = this._SafeStr_14173 / 9;
        let _loc7_: number = _loc6_ + (_loc3_ - _loc6_) * _loc5_;
        if (this._SafeStr_14175) {
            if (_loc7_ < this._SafeStr_14174) {
                _loc7_ = this._SafeStr_14174;
                if (_loc7_ > _loc2_) {
                    _loc7_ = _loc2_;
                }
            } else {
                this._SafeStr_14175 = false;
            }
        }
        this._SafeStr_14174 = _loc7_;
        this._previewZoomAnimationProgress += _loc4_ > 0 ? _loc7_ : -_loc7_;
        this.applyRoomCanvasZoom();
    };

    private applyRoomCanvasZoom(): void {
        if (this._SafeStr_2691 == null || this._roomCanvasDisplayObject == null) {
            return;
        }
        if (this._SafeStr_14167 != null) {
            this._SafeStr_14167.scrollRect = new Rectangle(0, 0, this._SafeStr_2691.width, this._SafeStr_2691.height);
        }
        let _loc1_: number = 1 + (2 - 1) * this._previewZoomAnimationProgress;
        let _loc2_: number = 41 * this._previewZoomAnimationProgress;
        this._roomCanvasDisplayObject.scaleX = _loc1_;
        this._roomCanvasDisplayObject.scaleY = _loc1_;
        this._roomCanvasDisplayObject.x = -(this._SafeStr_2691.width * _loc1_ - this._SafeStr_2691.width) / 2;
        this._roomCanvasDisplayObject.y = -(this._SafeStr_2691.height * _loc1_ - this._SafeStr_2691.height) / 2 - _loc2_;
    }

    private normalizeAvatarDirection(param1: number): number {
        param1 %= 8;
        if (param1 < 0) {
            param1 += 8;
        }
        return param1;
    }

    private isDiagonalAvatarDirection(param1: number): boolean {
        return this.normalizeAvatarDirection(param1) % 2 != 0;
    }

    private isValidLayingDirection(param1: number): boolean {
        let _loc2_: number = this.normalizeAvatarDirection(param1);
        return _loc2_ == 0 || _loc2_ == 2;
    }

    private updateAvailabilityIndicators(param1: IPurchasableOffer): void {
        let _loc2_: IProduct = param1 != null ? param1.product : null;
        let _loc3_: IFurnitureData = _loc2_ != null ? _loc2_.furnitureData : null;
        let _loc4_: boolean = this.page == null || !this.page.isBuilderPage;
        let _loc5_: boolean = _loc2_ != null && _loc3_ != null && (_loc2_.productType == "s" || _loc2_.productType == "i");
        if (this._SafeStr_14161 != null) {
            this._SafeStr_14161.visible = _loc4_ && _loc5_ && !_loc3_.tradeable;
        }
        if (this._SafeStr_14162 != null) {
            this._SafeStr_14162.visible = _loc4_ && _loc5_ && (!_loc3_.recyclable || !_loc3_.tradeable);
        }
    }

    private onHabbiconAssetsLoaded = (param1: Event): void => {
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        if (!this.disposed && this._SafeStr_4734 != null) {
            this.onPreviewProduct(this._SafeStr_4734);
        }
    };

    private getHabbiconPreviewBitmap(param1: string): BitmapData {
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(Number(param1) | 0, false);
        return _loc2_ != null ? _loc2_.clone() : null;
    }

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
        Logger.log("[Product View Catalog Widget] Retrieve Product Preview Asset: " + _loc4_);
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

    public override closed(): void {
        let _loc1_: RoomPreviewer = (asInstanceOf(this.page.viewer.catalog, HabboCatalog)).roomPreviewer;
        if (_loc1_) {
            _loc1_.disableUpdate = true;
        }
        this.setPreviewMode(0);
    }

    public onDragAndDropDone(param1: boolean, param2: string): void {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ProductViewCatalogWidget.#staticsReady) return;
        ProductViewCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ProductViewCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("PREVIEW_SIT_OFFSETS", null);
        set("PREVIEW_LAY_OFFSETS", null);
        set("PREVIEW_SIT_OFFSETS", new Vector3d(2, 2, 0.55));
        set("PREVIEW_LAY_OFFSETS", new Vector3d(1, 1, 0.8));
    }

    get [IGetImageListener](): true {
        return true;
    }
}
