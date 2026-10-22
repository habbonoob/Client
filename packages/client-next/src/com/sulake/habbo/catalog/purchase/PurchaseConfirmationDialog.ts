import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { CollectiblesController } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesController';
import type { CollectiblesView } from '@/com/sulake/habbo/catalog/collectibles/CollectiblesView';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { GiftWrappingConfiguration } from '@/com/sulake/habbo/catalog/purchase/GiftWrappingConfiguration';
import type { ICatalogPage } from '@/com/sulake/habbo/catalog/viewer/ICatalogPage';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { CollectibleBaseItem } from '@/com/sulake/habbo/communication/messages/parser/collectibles/CollectibleBaseItem';
import type { NftStoreOffer } from '@/com/sulake/habbo/communication/messages/parser/collectibles/NftStoreOffer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import type { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { isIIterable } from '@/com/sulake/core/window/utils/IIterable';
import { ClubBuyOfferData } from '@/com/sulake/habbo/catalog/club/ClubBuyOfferData';
import { RenderableShopNftItem } from '@/com/sulake/habbo/catalog/collectibles/RenderableShopNftItem';
import { MintTokenPurchaseOffer } from '@/com/sulake/habbo/catalog/collectibles/tabs/MintTokenPurchaseOffer';
import { NftStorePurchaseOffer } from '@/com/sulake/habbo/catalog/collectibles/tabs/NftStorePurchaseOffer';
import { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog.group';
import { HabboCatalogUtils } from '@/com/sulake/habbo/catalog/HabboCatalogUtils';
import { GameTokensOffer } from '@/com/sulake/habbo/catalog/viewer/GameTokensOffer';
import { Offer } from '@/com/sulake/habbo/catalog/viewer/Offer';
import { ProductImageConfiguration } from '@/com/sulake/habbo/catalog/viewer/ProductImageConfiguration';
import { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import { RentUtils } from '@/com/sulake/habbo/catalog/viewer/widgets/utils/RentUtils';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class PurchaseConfirmationDialog implements IAvatarImageListener, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purchase::PurchaseConfirmationDialog'); }

    declare private _catalog: HabboCatalog;

    declare private _roomEngine: IRoomEngine;

    declare private _localization: IHabboLocalizationManager;

    declare private _SafeStr_2288: CollectiblesController;

    declare private _collectibles: CollectiblesView;

    declare private _assets: IAssetLibrary;

    declare private _offerId: number;
    static { (this.prototype as any)._offerId = 0; }

    private _productType: string = "";
    private _SafeStr_14156: number = 0;

    declare private _pageId: number;
    static { (this.prototype as any)._pageId = 0; }

    declare private _extraParameter: string;

    private _stuffData: IStuffData = null;

    declare private _friends: any[];

    declare private _userName: string;

    declare private _SafeStr_2495: IWindowContainer;

    declare private _SafeStr_3360: IWindowContainer;

    private _highlightIndex: number = -1;

    declare private _quantity: number;
    static { (this.prototype as any)._quantity = 0; }

    private _SafeStr_7337: boolean = false;

    declare private _nftProductCode: string;

    private readonly MAX_SUGGESTIONS: number = 10;
    private _receiverName: string = "";

    declare private _SafeStr_3965: number;
    static { (this.prototype as any)._SafeStr_3965 = 0; }

    private _SafeStr_4427: number = 0;
    private _stuffTypes: any[] = [];
    private _ribbonTypes: any[] = [];
    private _boxTypes: any[] = [];

    declare private _SafeStr_2329: number;
    static { (this.prototype as any)._SafeStr_2329 = 0; }

    declare private _SafeStr_2328: number;
    static { (this.prototype as any)._SafeStr_2328 = 0; }

    declare private _SafeStr_4004: number;
    static { (this.prototype as any)._SafeStr_4004 = 0; }

    declare private _SafeStr_3547: number;
    static { (this.prototype as any)._SafeStr_3547 = 0; }

    private _SafeStr_2562: Timer = null;
    private readonly COLOR_EVEN: number = 4293848814;
    private readonly COLOR_ODD: number = 4294967295;
    private readonly COLOR_HIGHLIGHT: number = 4291613146;

    declare private _window: IFrameWindow;

    private _disposed: boolean = false;

    constructor(param1: IHabboLocalizationManager, param2: IAssetLibrary) {
        this._localization = param1;
        this._assets = param2;
    }

    private static isValentinesBox(param1: number): boolean {
        return param1 == 8;
    }

    public showOffer(param1: IHabboCatalog, param2: IRoomEngine, param3: IPurchasableOffer, param4: number, param5: string, param6: number, param7: IStuffData, param8: any[], param9: string, param10: BitmapData): void {
        let _loc11_: NftStorePurchaseOffer = null;
        this._catalog = param1 instanceof HabboCatalog ? param1 : null;
        this._roomEngine = param2;
        this._offerId = param3.offerId;
        this._pageId = param4;
        this._extraParameter = param5;
        this._stuffData = param7;
        this._friends = param8;
        this._userName = param9;
        this._quantity = param6;
        this._SafeStr_7337 = this._catalog.bundleDiscountEnabled ? param3.bundlePurchaseAllowed : false;
        if (param3 instanceof Offer && param3.product != null) {
            this._productType = param3.product.productType;
            this._SafeStr_14156 = this._productType == "habbicon" ? Number(param3.product.extraParam) | 0 : 0;
        } else if (param3 instanceof ClubBuyOfferData || HabboCatalogUtils.buildersClub(param3.localizationId)) {
            this._productType = "h";
        } else if (param3 instanceof GameTokensOffer) {
            this._productType = "GAME_TOKEN";
        } else if (param3 instanceof MintTokenPurchaseOffer) {
            this._productType = "MINT_TOKEN";
        } else {
            if (!(param3 instanceof NftStorePurchaseOffer)) {
                return;
            }
            _loc11_ = param3 instanceof NftStorePurchaseOffer ? param3 : null;
            this._productType = "n";
            this._nftProductCode = _loc11_.productCode;
        }
        this.showConfirmationDialog(param3, param10);
        this._catalog.syncPlacedOfferWithPurchase(param3);
    }

    private hideRaffle(): void {
        let _loc1_: IWindow = this._window.findChildByName("raffle_container");
        if (_loc1_ != null && _loc1_.visible) {
            _loc1_.visible = false;
            if (this._SafeStr_2562 != null) {
                this._catalog.notifications.addItem("${notification.raffle.ongoing}", "ltd");
            }
        }
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hideRaffle();
        this._disposed = true;
        this._catalog = null;
        this._roomEngine = null;
        this._offerId = -1;
        this._SafeStr_14156 = 0;
        this._pageId = -1;
        this._extraParameter = "";
        this._friends = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2562 != null && this._SafeStr_2562.running) {
            this._SafeStr_2562.stop();
        }
        this._SafeStr_2562 = null;
        this._SafeStr_2495 = null;
        if (this._SafeStr_3360 != null) {
            this._SafeStr_3360.dispose();
            this._SafeStr_3360 = null;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get productType(): string {
        return this._productType;
    }

    public getIconWrapper(): IBitmapWrapperWindow {
        return this._window ? asGuarded(this._window.findChildByName("product_image"), isIBitmapWrapperWindow) : null;
    }

    public getNftImage(): IProductImageWidget {
        let _loc1_: IWidgetWindow = asGuarded(this._window.findChildByName("nft_image"), isIWidgetWindow);
        return asGuarded(_loc1_.widget, isIProductImageWidget);
    }

    public isGiftPurchase(): boolean {
        return this._receiverName != null && this._receiverName != "";
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (param1 == this._SafeStr_3965) {
            this._SafeStr_3965 = 0;
            this.setImage(param2, true);
        }
    }

    public imageFailed(param1: number): void {
    }

    private setImage(param1: BitmapData, param2: boolean): void {
        if (this._window == null || param1 == null || this.disposed) {
            return;
        }
        let _loc5_: IBitmapWrapperWindow = this.getIconWrapper();
        if (_loc5_ == null) {
            return;
        }
        if (_loc5_.bitmap != null) {
            _loc5_.bitmap.dispose();
            _loc5_.bitmap = null;
        }
        if (_loc5_.bitmap == null) {
            _loc5_.bitmap = new BitmapData(_loc5_.width, _loc5_.height, true, 0);
        }
        let _loc3_: number = (_loc5_.width - param1.width) * 0.5 | 0;
        let _loc4_: number = (_loc5_.height - param1.height) * 0.5 | 0;
        _loc5_.bitmap.draw(param1, new Matrix(1, 0, 0, 1, _loc3_, _loc4_));
        if (param2) {
            param1.dispose();
        }
    }

    private showConfirmationDialog(param1: IPurchasableOffer, param2: BitmapData): void {
        let _loc20_: IProductData = null;
        let _loc21_: IItemListWindow = null;
        let _loc8_: number = 0;
        let _loc15_: NftStorePurchaseOffer = null;
        let _loc10_: CollectibleBaseItem = null;
        let _loc11_: boolean = false;
        let _loc17_: string = null;
        let _loc22_: BitmapDataAsset = null;
        let _loc19_: IRoomEngine = null;
        let _loc6_: ImageResult = null;
        let _loc13_: BitmapData = null;
        let _loc5_: number = 0;
        let _loc7_: string = null;
        let _loc3_: IProduct = null;
        let _loc12_: IAvatarImage = null;
        if (this._catalog == null) {
            return;
        }
        if (this._window != null) {
            this._window.dispose();
        }
        this._window = asGuarded(this._catalog.utils.createWindow("purchase_confirmation", 2), isIFrameWindow);
        if (this._window == null) {
            return;
        }
        this._window.color = (param1 instanceof MintTokenPurchaseOffer || param1 instanceof NftStorePurchaseOffer ? 2763306 : 4296112) >>> 0;
        this.updateLocalizations(param1);
        let _loc18_: IWindowContainer = asGuarded(this._window.findChildByName("purchase_cost_box"), isIWindowContainer);
        this._catalog.utils.showPriceInContainer(_loc18_, param1, this._quantity);
        this.addClickListener("buy_button", this.onBuyButtonClick);
        this.addClickListener("cancel_button", this.onClose);
        this.addClickListener("header_button_close", this.onClose);
        this.hideRaffle();
        this._window.center();
        if (this._catalog.getBoolean("disclaimer.credit_spending.enabled")) {
            this._window.findChildByName("spending_disclaimer").addEventListener("WME_CLICK", this.onSpendingDisclaimerClicked);
            this._window.findChildByName("spending_disclaimer").addEventListener("WME_DOUBLE_CLICK", this.onSpendingDisclaimerClicked);
            this.setDisclaimerAccepted(false);
        } else {
            this._window.findChildByName("disclaimer").dispose();
            this.setDisclaimerAccepted(true);
        }
        let _loc14_: ITextWindow = asGuarded(this._window.findChildByName("product_name"), isITextWindow);
        if (_loc14_ != null) {
            _loc20_ = this._catalog.getProductData(param1.localizationId);
            _loc14_.text = _loc20_?.name;
        }
        let _loc4_: ITextWindow = asGuarded(this._window.findChildByName("quantity"), isITextWindow);
        if (_loc4_ != null) {
            if (this._catalog.multiplePurchaseEnabled && this._quantity > 1) {
                _loc4_.text = "X " + this._quantity;
            } else {
                _loc21_ = castGuarded(this._window.findChildByName("properties_itemlist"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
                if (_loc21_ != null) {
                    _loc21_.removeListItem(_loc4_);
                }
            }
        }
        this._window.findChildByName("freeQuantity").visible = false;
        if (this._catalog.bundleDiscountEnabled) {
            _loc8_ = this._catalog.utils.getDiscountItemsCount(this._quantity);
            this._window.findChildByName("freeQuantity").visible = _loc8_ > 0;
            this._catalog.localization.registerParameter("shop.bonus.items.count", "amount", _loc8_.toString());
        }
        let _loc16_: IWidgetWindow = asGuarded(this._window.findChildByName("nft_image"), isIWidgetWindow);
        let _loc23_: IProductImageWidget = asGuarded(_loc16_.widget, isIProductImageWidget);
        if (param1 instanceof NftStorePurchaseOffer) {
            _loc15_ = param1 instanceof NftStorePurchaseOffer ? param1 : null;
            _loc10_ = _loc15_.productInfo;
            _loc23_.productInfo = new RenderableShopNftItem(_loc10_);
            return;
        }
        _loc16_.visible = false;
        _loc23_.clearPreviewer();
        let _loc9_: IBitmapWrapperWindow = this.getIconWrapper();
        if (_loc9_ != null) {
            _loc11_ = false;
            if (ProductImageConfiguration.hasProductImage(param1.localizationId)) {
                _loc17_ = stringOrNull(ProductImageConfiguration.PRODUCT_IMAGES.get(param1.localizationId));
                _loc22_ = asInstanceOf(this._assets.getAssetByName(_loc17_), BitmapDataAsset);
                if (_loc22_) {
                    this.setImage(asInstanceOf(_loc22_.content, BitmapData), false);
                    _loc11_ = true;
                }
            }
            if (!_loc11_ && (param1.product || param1 instanceof MintTokenPurchaseOffer)) {
                _loc19_ = this._catalog.roomEngine;
                _loc5_ = 0;
                _loc7_ = "";
                if (param1 instanceof Offer) {
                    _loc3_ = param1.product;
                    if (_loc3_ != null) {
                        _loc5_ = _loc3_.productClassId;
                        _loc7_ = _loc3_.extraParam;
                    }
                }
                if (param2 == null) {
                    switch (this.productType) {
                        case "s":
                            _loc6_ = _loc19_.getFurnitureImage(_loc5_, new Vector3d(90, 0, 0), 64, this, 0, _loc7_, -1, -1, this._stuffData);
                            break;
                        case "i":
                            _loc6_ = _loc19_.getWallItemImage(_loc5_, new Vector3d(90, 0, 0), 64, this, 0, _loc7_);
                            break;
                        case "e":
                            _loc13_ = this._catalog.getPixelEffectIcon(_loc5_);
                            break;
                        case "h":
                            _loc13_ = this._catalog.getSubscriptionProductIcon(_loc5_);
                            break;
                        case "MINT_TOKEN":
                            _loc13_ = this._catalog.getMintTokenProductIcon();
                            break;
                        case "chat_style":
                            _loc13_ = this._catalog.freeFlowChat.chatStyleLibrary.getStyle(Number(_loc3_.extraParam) | 0).selectorPreview.clone();
                            break;
                        case "r":
                            _loc12_ = this._catalog.avatarRenderManager.createAvatarImage(_loc7_, "h", null, this);
                            _loc12_.setDirection("full", 3);
                            _loc12_.appendAction("wave");
                            _loc12_.appendAction("gest", "sml");
                            _loc13_ = _loc12_.getImage("full", true);
                            _loc12_.dispose();
                            break;
                        case "habbicon":
                            _loc13_ = this.getHabbiconPreviewBitmap(_loc7_);
                            if (_loc13_ == null) {
                                _loc13_ = new BitmapData(40, 40, false, 9408399);
                            }
                    }
                    if (_loc6_ != null) {
                        _loc13_ = _loc6_.data;
                        this._SafeStr_3965 = _loc6_.id;
                    }
                } else {
                    _loc13_ = param2;
                }
                this.setImage(_loc13_, true);
                RentUtils.updateBuyCaption(param1, asGuarded(this._window.findChildByName("buy_button"), isIButtonWindow));
            }
        }
    }

    private showNftConfirmationDialog(param1: NftStoreOffer): void {
    }

    private onSpendingDisclaimerClicked = (param1: WindowMouseEvent): void => {
        let _loc2_: ICheckBoxWindow = asGuarded(param1.target, isICheckBoxWindow);
        if (_loc2_ != null) {
            this.setDisclaimerAccepted(_loc2_.isSelected);
        }
    };

    private setDisclaimerAccepted(param1: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("buy_button");
        if (_loc2_ == null) {
            return;
        }
        if (param1) {
            _loc2_.enable();
        } else {
            _loc2_.disable();
        }
    }

    private updateLocalizations(param1: IPurchasableOffer): void {
        if (param1 == null) {
            return;
        }
        let _loc2_: IProductData = this._catalog.getProductData(param1.localizationId);
        let _loc3_: string = _loc2_?.name;
        this._catalog.windowManager.registerLocalizationParameter("catalog.purchase.confirmation.dialog.costs", "offer_name", _loc3_);
    }

    private addClickListener(param1: string, param2: (...args: any[]) => any): void {
        let _loc3_: IWindow = this._window.findChildByName(param1);
        if (_loc3_ != null) {
            _loc3_.addEventListener("WME_CLICK", param2);
        }
    }

    public getAvatarFaceBitmap(param1: string): BitmapData {
        if (this._catalog == null || this._catalog.avatarRenderManager == null) {
            return null;
        }
        let _loc2_: BitmapData = null;
        let _loc3_: IAvatarImage = this._catalog.avatarRenderManager.createAvatarImage(param1, "h", null, this);
        if (_loc3_ != null) {
            _loc2_ = _loc3_.getCroppedImage("head");
            _loc3_.dispose();
        }
        return _loc2_;
    }

    public avatarImageReady(param1: string): void {
        if (this._catalog == null || this._window == null || Boolean(this._window.disposed) || this.disposed) {
            return;
        }
        if (param1 == this._catalog.sessionDataManager.figure) {
            this.updateGiftDialogAvatarImage();
        }
        let _loc2_: IAvatarImage = this._catalog.avatarRenderManager.createAvatarImage(param1, "h", null, this);
        _loc2_.setDirection("full", 3);
        _loc2_.appendAction("wave");
        _loc2_.appendAction("gest", "sml");
        let _loc3_: BitmapData = _loc2_.getImage("full", true);
        _loc2_.dispose();
        this.setImage(_loc3_, true);
    }

    private getHabbiconPreviewBitmap(param1: string): BitmapData {
        let _loc2_: BitmapData = HabbiconAssetManager.getPreviewBitmap(Number(param1) | 0, false);
        return _loc2_ != null ? _loc2_.clone() : null;
    }

    private enableGiftDialogAvatarImage(param1: boolean): void {
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("avatar_image"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            if (param1) {
                this.updateGiftDialogAvatarImage();
            } else {
                this.updateUnknownSenderAvatarImage();
            }
        }
        let _loc3_: ITextWindow = asGuarded(this._window.findChildByName("message_from"), isITextWindow);
        if (_loc3_ != null) {
            _loc3_.visible = param1;
        }
    }

    private updateGiftDialogAvatarImage(): void {
        let _loc1_: BitmapData = this.getAvatarFaceBitmap(this._catalog.sessionDataManager.figure);
        if (_loc1_ != null) {
            this.updateAvatarImage(_loc1_);
        }
    }

    private updateUnknownSenderAvatarImage(): void {
        let _loc1_: BitmapData = null;
        let _loc2_: BitmapDataAsset = asInstanceOf(this._assets.getAssetByName("gift_incognito"), BitmapDataAsset);
        if (_loc2_ != null) {
            _loc1_ = asInstanceOf(_loc2_.content, BitmapData);
            if (_loc1_ != null) {
                this.updateAvatarImage(_loc1_.clone());
            }
        }
    }

    private updateAvatarImage(param1: BitmapData): void {
        if (param1 == null) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("avatar_image"), isIBitmapWrapperWindow);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.bitmap = param1;
        _loc2_.width = param1.width;
        _loc2_.height = param1.height;
    }

    private onShowFaceSelected = (param1: WindowEvent): void => {
        this.enableGiftDialogAvatarImage(true);
        this.updateGiftDialogAvatarImage();
    };

    private onShowFaceUnselected = (param1: WindowEvent): void => {
        this.enableGiftDialogAvatarImage(false);
    };

    private isShowPurchaserName(): boolean {
        let _loc1_: ICheckBoxWindow = null;
        if (this.isModerator()) {
            if (this._window != null) {
                _loc1_ = asGuarded(this._window.findChildByName("show_face_checkbox"), isICheckBoxWindow);
                if (_loc1_ != null) {
                    return _loc1_.isSelected;
                }
            }
            return false;
        }
        return true;
    }

    private updateGiftDialogLabels(): void {
        let _loc9_: IWindow = null;
        if (this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        let _loc3_: boolean = this.isDefaultBoxSelected();
        let _loc6_: string = "";
        let _loc7_: string = "";
        let _loc1_: ILocalization = null;
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("pick_box_title"), isITextWindow);
        if (_loc2_ != null) {
            _loc7_ = _loc3_ ? "catalog.gift_wrapping_new.box.default" : "catalog.gift_wrapping_new.box." + this._boxTypes[this._SafeStr_2328];
            _loc1_ = this._localization.getLocalizationRaw(_loc7_);
            _loc6_ = _loc7_;
            if (_loc1_ != null) {
                _loc6_ = _loc1_.value;
            }
            _loc2_.text = _loc6_;
        }
        let _loc5_: ITextWindow = asGuarded(this._window.findChildByName("pick_box_price_title"), isITextWindow);
        if (_loc5_ != null) {
            _loc7_ = _loc3_ ? "catalog.gift_wrapping_new.freeprice" : "catalog.gift_wrapping_new.price";
            _loc1_ = this._localization.getLocalizationRaw(_loc7_);
            _loc6_ = _loc7_;
            if (_loc1_ != null) {
                _loc6_ = _loc1_.value;
            }
            _loc5_.text = _loc6_;
        }
        let _loc8_: IItemListWindow = asGuarded(this._window.findChildByName("price_box_container"), isIItemListWindow);
        if (_loc8_ != null) {
            _loc9_ = _loc8_.getListItemByName("small_coin");
            if (_loc9_ != null) {
                _loc9_.visible = !_loc3_;
                _loc8_.arrangeListItems();
            }
        }
        let _loc4_: ITextWindow = asGuarded(this._window.findChildByName("pick_ribbon_title"), isITextWindow);
        if (_loc4_ != null) {
            _loc7_ = "catalog.gift_wrapping_new.ribbon." + this._SafeStr_2329;
            _loc1_ = this._localization.getLocalizationRaw(_loc7_);
            _loc6_ = _loc7_;
            if (_loc1_ != null) {
                _loc6_ = _loc1_.value;
            }
            _loc4_.text = _loc6_;
        }
    }

    public showGiftDialog(): void {
        let _loc4_: string = null;
        let _loc6_: string = null;
        let _loc11_: string = null;
        let _loc3_: number = NaN;
        if (this._window != null) {
            this._window.dispose();
        }
        let _loc7_: GiftWrappingConfiguration = this._catalog.giftWrappingConfiguration;
        this._window = asGuarded(this._catalog.utils.createWindow("gift_wrapping"), isIFrameWindow);
        if (this._window == null) {
            return;
        }
        this._window.center();
        this.addClickListener("give_gift_button", this.onGiveGiftButtonClick);
        this.addClickListener("cancel_link_region", this.onCancelGift);
        this.addClickListener("header_button_close", this.onCancelGift);
        let _loc8_: IWindow = this._window.findChildByName("name_input");
        if (_loc8_ != null) {
            if (this._userName != null) {
                this.setReceiverName(this._userName);
            } else {
                this.focusNameField();
            }
            this.updateNameHint();
            _loc8_.addEventListener("WE_CHANGE", this.onNameInputChange);
            _loc8_.addEventListener("WME_DOWN", this.onNameInputMouseDown);
            _loc8_.addEventListener("WKE_KEY_UP", this.onNameInputKeyUp);
            _loc8_.addEventListener("WE_FOCUSED", this.onNameInputFocus);
            _loc8_.addEventListener("WE_UNFOCUSED", this.onNameInputUnfocus);
        }
        let _loc9_: IStaticBitmapWrapperWindow = asGuarded(this._window.findChildByName("gift_card"), isIStaticBitmapWrapperWindow);
        if (_loc9_) {
            _loc4_ = this._catalog.getProperty("catalog.gift_wrapping_new.gift_card");
            if (_loc4_ != "") {
                _loc9_.assetUri = "${image.library.url}Giftcards/" + _loc4_ + ".png";
            }
        }
        let _loc2_: ICheckBoxWindow = asGuarded(this._window.findChildByName("show_face_checkbox"), isICheckBoxWindow);
        if (_loc2_) {
            if (this.isModerator()) {
                _loc2_.visible = true;
                _loc2_.select();
                _loc2_.addEventListener("WE_SELECT", this.onShowFaceSelected);
                _loc2_.addEventListener("WE_UNSELECT", this.onShowFaceUnselected);
            } else {
                _loc2_.visible = false;
            }
        }
        let _loc1_: IWindow = this._window.findChildByName("show_face_checkbox_title");
        if (_loc1_ != null && !this.isModerator()) {
            _loc1_.visible = false;
        }
        this.updateGiftDialogAvatarImage();
        let _loc5_: IWindow = this._window.findChildByName("message_input");
        if (_loc5_ != null) {
            this.updateMessageHint();
            _loc5_.addEventListener("WE_CHANGE", this.onMessageInputChange);
            _loc5_.addEventListener("WE_FOCUSED", this.onMessageInputFocus);
            _loc5_.addEventListener("WE_UNFOCUSED", this.onMessageInputUnfocus);
        }
        let _loc10_: IWindow = this._window.findChildByName("message_from");
        if (_loc10_ != null) {
            _loc6_ = this._catalog.sessionDataManager.userName;
            _loc11_ = "catalog.gift_wrapping_new.message_from";
            this._localization.registerParameter(_loc11_, "name", _loc6_);
            _loc10_.caption = this._localization.getLocalization(_loc11_, _loc6_);
        }
        this.addClickListener("ribbon_prev", this.onPreviousGiftWrap);
        this.addClickListener("ribbon_next", this.onNextGiftWrap);
        this.addClickListener("box_prev", this.onPreviousGiftBox);
        this.addClickListener("box_next", this.onNextGiftBox);
        this._localization.registerParameter("catalog.gift_wrapping_new.price", "price", _loc7_.price.toString());
        if (_loc7_.defaultStuffTypes.length > 0) {
            _loc3_ = Math.floor(Math.random() * _loc7_.defaultStuffTypes.length);
            this._SafeStr_4427 = _loc7_.defaultStuffTypes[_loc3_] | 0;
        }
        this._stuffTypes = _loc7_.stuffTypes;
        this._boxTypes = this._boxTypes.concat(_loc7_.boxTypes);
        this._boxTypes.push(this._SafeStr_4427);
        this._ribbonTypes = _loc7_.ribbonTypes;
        this._SafeStr_4004 = this._stuffTypes[0] | 0;
        this._SafeStr_2329 = this._ribbonTypes[0] | 0;
        this._SafeStr_2328 = this._catalog.getInteger("catalog.purchase.gift_wrapping.default_box_index", 0);
        if (this._SafeStr_2328 < 0 || this._SafeStr_2328 > this._boxTypes.length - 1) {
            this._SafeStr_2328 = 0;
        }
        this.initColorGrid();
        this.updateColorGrid();
        this.updatePreview();
    }

    private isModerator(): boolean {
        return this._catalog.sessionDataManager.hasSecurity(5);
    }

    private isDefaultBoxSelected(): boolean {
        return this._boxTypes[this._SafeStr_2328] == this._SafeStr_4427;
    }

    private updatePreview(): void {
        if (this._SafeStr_2329 < 0) {
            this._SafeStr_2329 = this._ribbonTypes.length - 1;
        }
        if (this._SafeStr_2329 > this._ribbonTypes.length - 1) {
            this._SafeStr_2329 = 0;
        }
        if (this._SafeStr_2328 < 0) {
            this._SafeStr_2328 = this._boxTypes.length - 1;
        }
        if (this._SafeStr_2328 > this._boxTypes.length - 1) {
            this._SafeStr_2328 = 0;
        }
        let _loc5_: number = this._boxTypes[this._SafeStr_2328] | 0;
        if (PurchaseConfirmationDialog.isValentinesBox(_loc5_)) {
            this._SafeStr_2329 = 10;
            if (this._SafeStr_2329 > this._ribbonTypes.length - 1) {
                this._SafeStr_2329 = 0;
            }
        }
        let _loc2_: number = _loc5_ * 1000 + this._ribbonTypes[this._SafeStr_2329] | 0;
        if (this._window == null) {
            return;
        }
        if (this._roomEngine == null) {
            return;
        }
        let _loc3_: string = _loc2_.toString();
        let _loc6_: number = this._SafeStr_4004;
        let _loc1_: boolean = this.isDefaultBoxSelected();
        if (_loc1_) {
            this.enableBoxColorAndRibbonSelectors(false);
            _loc6_ = this._SafeStr_4427;
            _loc3_ = "";
        } else if (PurchaseConfirmationDialog.isValentinesBox(_loc5_)) {
            this.enableBoxColorAndRibbonSelectors(false);
        } else {
            this.enableBoxColorAndRibbonSelectors(true);
            if (_loc5_ >= 3 && _loc5_ <= 6) {
                this.enableBoxColorSelectors(false);
            }
        }
        let _loc4_: ImageResult = this._roomEngine.getFurnitureImage(_loc6_, new Vector3d(180), 64, this, 0, _loc3_);
        if (_loc4_ == null) {
            return;
        }
        this._SafeStr_3965 = _loc4_.id;
        this.setImage(_loc4_.data, true);
        this.showSuggestions(false);
        this.updateGiftDialogLabels();
    }

    private initColorGrid(): void {
        let _loc3_: IFurnitureData = null;
        let _loc2_: IWindowContainer = null;
        if (this._window == null) {
            return;
        }
        let _loc1_: IItemGridWindow = asGuarded(this._window.findChildByName("color_grid"), isIItemGridWindow);
        _loc1_.destroyGridItems();
        let _loc5_: IWindowContainer = asGuarded(this._catalog.utils.createWindow("gift_palette_item"), isIWindowContainer);
        for (const _loc4_ of this._stuffTypes ?? []) {
            _loc3_ = this._catalog.getFurnitureData(_loc4_ | 0, "s");
            _loc2_ = asGuarded(_loc5_.clone(), isIWindowContainer);
            if (!(!_loc3_ || !_loc2_)) {
                _loc2_.addEventListener("WME_CLICK", this.onColorItemClick);
                _loc2_.findChildByName("color").color = _loc3_.colours[0] >>> 0;
                _loc2_.id = _loc4_ | 0;
                _loc1_.addGridItem(_loc2_);
            }
        }
    }

    private giveGift(): void {
        let _loc3_: IWindow = this._window.findChildByName("name_input");
        if (_loc3_ == null) {
            return;
        }
        let _loc4_: string = _loc3_.caption;
        let _loc1_: IWindow = this._window.findChildByName("message_input");
        let _loc8_: string = _loc1_?.caption;
        let _loc9_: boolean = this.isDefaultBoxSelected();
        let _loc7_: number = _loc9_ ? this._SafeStr_4427 : this._SafeStr_4004;
        let _loc5_: number = Number(_loc9_ ? 0 : this._boxTypes[this._SafeStr_2328]) | 0;
        let _loc6_: number = Number(_loc9_ ? 0 : this._ribbonTypes[this._SafeStr_2329]) | 0;
        let _loc2_: boolean = this.isShowPurchaserName();
        this._catalog.purchaseProductAsGift(this._pageId, this._offerId, this._extraParameter, _loc4_, _loc8_, _loc7_, _loc5_, _loc6_, _loc2_);
    }

    private safeDisable(param1: string): void {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ != null) {
            _loc2_.disable();
        }
    }

    private safeEnable(param1: string): void {
        let _loc2_: IWindow = this._window.findChildByName(param1);
        if (_loc2_ != null) {
            _loc2_.enable();
        }
    }

    private onBuyButtonClick = (param1: WindowEvent): void => {
        let _loc2_: ICatalogPage = null;
        if (this._productType == "habbicon" && !this._catalog.getBoolean("habbicons.enabled")) {
            return;
        }
        if (this._productType == "habbicon" && this._catalog.isHabbiconOwned(this._SafeStr_14156)) {
            this._catalog.showHabbiconAlreadyOwnedAlert();
            return;
        }
        this.safeDisable("buy_button");
        this.safeDisable("cancel_button");
        this.safeDisable("publish_check");
        if (this._productType == "GAME_TOKEN") {
            this._catalog.purchaseGameTokensOffer(this._extraParameter);
        } else if (this._productType == "MINT_TOKEN") {
            this._catalog.purchaseMintTokens(this._offerId, this._extraParameter);
        } else if (this._productType == "n") {
            this._catalog.purchaseNftOffer(this._nftProductCode, this._extraParameter);
        } else {
            this._catalog.purchaseProduct(this._pageId, this._offerId, this._extraParameter, this._quantity);
            _loc2_ = this._catalog.currentPage;
            if (_loc2_ != null) {
                _loc2_.dispatchWidgetEvent(new CatalogWidgetEvent("PURCHASE"));
            }
        }
    };

    private onGiftButtonClick = (param1: WindowEvent): void => {
        this.showGiftDialog();
        HabboTracking.getInstance().trackEventLog("Catalog", "clickConfirm", "client.buy_as_gift.clicked");
    };

    private onClose = (param1: WindowEvent): void => {
        this._catalog.resetPlacedOfferData();
        this.dispose();
    };

    private onGiveGiftButtonClick = (param1: WindowEvent): void => {
        this.giveGift();
        this.enableGiftButton(false);
        this._catalog.giftReceiver = null;
        this._catalog.resetPlacedOfferData();
    };

    private onCancelGift = (param1: WindowEvent): void => {
        this._catalog.resetPlacedOfferData();
        this.dispose();
    };

    private onPreviousGiftWrap = (param1: WindowEvent): void => {
        this._SafeStr_2329 = this._SafeStr_2329 - 1;
        this.updatePreview();
    };

    private onNextGiftWrap = (param1: WindowEvent): void => {
        this._SafeStr_2329 = this._SafeStr_2329 + 1;
        this.updatePreview();
    };

    private onPreviousGiftBox = (param1: WindowEvent): void => {
        this._SafeStr_2328 = this._SafeStr_2328 - 1;
        this.updatePreview();
    };

    private onNextGiftBox = (param1: WindowEvent): void => {
        this._SafeStr_2328 = this._SafeStr_2328 + 1;
        this.updatePreview();
    };

    private onNameInputChange = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        if (_loc2_ == null) {
            return;
        }
        this.updateNameHint();
        if (this._receiverName == _loc2_.caption) {
            return;
        }
        let _loc3_: string = _loc2_.caption.toLowerCase();
        let _loc5_: any[] = [];
        for (const _loc4_ of this._friends ?? []) {
            if (_loc4_.toLowerCase().search(_loc3_) != -1) {
                _loc5_.push(_loc4_);
            }
            if (_loc5_.length >= 10) {
                break;
            }
        }
        this._receiverName = _loc2_.caption;
        this.updateSuggestions(_loc5_);
    };

    private onNameInputMouseDown = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        if (_loc2_ == null) {
            return;
        }
        this.showSuggestions(false);
    };

    private onNameInputKeyUp = (param1: WindowEvent): void => {
        let _loc3_: boolean = false;
        let _loc4_: WindowKeyboardEvent = param1 instanceof WindowKeyboardEvent ? param1 : null;
        let _loc2_: IWindow = param1.target;
        switch (_loc4_.keyCode) {
            case 38:
                this.highlightSuggestion(this._highlightIndex - 1);
                break;
            case 40:
                this.highlightSuggestion(this._highlightIndex + 1);
                if (_loc2_ != null) {
                    if (_loc2_.caption.length == 0) {
                        if (this._SafeStr_2495 == null || !this._SafeStr_2495.visible) {
                            _loc3_ = this.showAllFriendSuggestions();
                            if (_loc3_) {
                                this.highlightSuggestion(0);
                            }
                        }
                    }
                }
                break;
            case 13:
                this.selectHighlighted();
                break;
            case 9:
                this.focusMessageField();
        }
    };

    private showAllFriendSuggestions(): boolean {
        let _loc2_: any[] = null;
        if (this._friends != null && this._friends.length > 0) {
            _loc2_ = [];
            for (const _loc1_ of this._friends ?? []) {
                _loc2_.push(_loc1_);
                if (_loc2_.length >= 10) {
                    break;
                }
            }
            this.updateSuggestions(_loc2_);
            this.showSuggestions(true);
            return true;
        }
        return false;
    }

    private focusNameField(): void {
        if (this._window == null) {
            return;
        }
        let _loc1_: ITextFieldWindow = asGuarded(this._window.findChildByName("name_input"), isITextFieldWindow);
        if (_loc1_ == null) {
            return;
        }
        _loc1_.visible = true;
        _loc1_.focus();
    }

    private focusMessageField(): void {
        if (this._window == null) {
            return;
        }
        let _loc1_: ITextFieldWindow = asGuarded(this._window.findChildByName("message_input"), isITextFieldWindow);
        if (_loc1_ == null) {
            return;
        }
        _loc1_.visible = true;
        _loc1_.focus();
    }

    private selectHighlighted(): void {
        if (this._SafeStr_2495 == null || !this._SafeStr_2495.visible) {
            return;
        }
        let _loc3_: IItemListWindow = asGuarded(this._SafeStr_2495.findChildByName("suggestion_list"), isIItemListWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc1_: IWindowContainer = asGuarded(_loc3_.getListItemAt(this._highlightIndex >>> 0), isIWindowContainer);
        if (_loc1_ == null) {
            return;
        }
        let _loc2_: IWindow = _loc1_.findChildByName("name_text");
        if (_loc2_ == null) {
            return;
        }
        this.setReceiverName(_loc2_.caption);
        this.showSuggestions(false);
    }

    private showSuggestions(param1: boolean): void {
        if (this._SafeStr_2495 == null) {
            return;
        }
        this._SafeStr_2495.visible = param1;
        if (!param1) {
            this.showMessageInput(true);
        }
    }

    private showMessageInput(param1: boolean): void {
        let _loc2_: IWindow = this._window.findChildByName("message_input");
        if (_loc2_ != null) {
            _loc2_.visible = param1;
        }
    }

    private onMessageInputChange = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        if (_loc2_ == null) {
            return;
        }
        this.updateMessageHint();
    };

    private onNameInputFocus = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        if (_loc2_ == null) {
            return;
        }
        this.updateNameHint();
    };

    private onNameInputUnfocus = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.target;
        if (_loc2_ == null) {
            return;
        }
        this.updateNameHint();
    };

    private onMessageInputFocus = (param1: WindowEvent): void => {
        this.updateMessageHint();
        this.showSuggestions(false);
    };

    private onMessageInputUnfocus = (param1: WindowEvent): void => {
        this.updateMessageHint();
    };

    private updateNameHint(): void {
        if (this._window == null) {
            return;
        }
        let _loc1_: IWindow = this._window.findChildByName("name_input");
        if (_loc1_ == null) {
            return;
        }
        let _loc2_: string = _loc1_.caption;
        if (_loc2_ == null || _loc2_.length == 0) {
            this.enableHint(true, "name_input_hint", "catalog.gift_wrapping_new.name_hint");
        } else {
            this.enableHint(false, "name_input_hint", "catalog.gift_wrapping_new.name_hint");
        }
    }

    private updateMessageHint(): void {
        if (this._window == null) {
            return;
        }
        let _loc1_: IWindow = this._window.findChildByName("message_input");
        if (_loc1_ == null) {
            return;
        }
        let _loc2_: string = _loc1_.caption;
        if (_loc2_ == null || _loc2_.length == 0) {
            this.enableHint(true, "message_input_hint", "catalog.gift_wrapping_new.message_hint");
        } else {
            this.enableHint(false, "message_input_hint", "catalog.gift_wrapping_new.message_hint");
        }
    }

    private enableHint(param1: boolean, param2: string, param3: string): void {
        let _loc4_: ITextWindow = asGuarded(this._window.findChildByName(param2), isITextWindow);
        if (_loc4_ != null) {
            _loc4_.text = this._localization.getLocalization(param3);
            _loc4_.visible = param1;
        }
    }

    private enableRibbonSelectors(param1: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("ribbon_prev");
        this.enableWindow(_loc2_, param1);
        let _loc3_: IWindow = this._window.findChildByName("ribbon_next");
        this.enableWindow(_loc3_, param1);
        let _loc4_: IWindow = this._window.findChildByName("pick_ribbon_title");
        this.enableWindow(_loc4_, param1);
    }

    private enableBoxColorAndRibbonSelectors(param1: boolean): void {
        this.enableBoxColorSelectors(param1);
        this.enableRibbonSelectors(param1);
    }

    private enableBoxColorSelectors(param1: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc3_: IWindow = this._window.findChildByName("box_color_title");
        this.enableWindow(_loc3_, param1);
        let _loc2_: IWindowContainer = asGuarded(this._window.findChildByName("color_picker_container"), isIWindowContainer);
        if (_loc2_ != null) {
            this.enableWindow(_loc2_, param1);
        }
    }

    private enableWindow(param1: IWindow, param2: boolean): void {
        let _loc3_: IIterator = null;
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: IWindow = null;
        this.enableElement(param1, param2);
        if (isIIterable(param1)) {
            _loc3_ = castGuarded(param1, isIIterable, "com.sulake.core.window.utils.IIterable").iterator;
            _loc4_ = _loc3_.length | 0;
            if (_loc4_ > 0) {
                _loc5_ = 0;
                while (_loc5_ < _loc4_) {
                    _loc6_ = asGuarded(_loc3_[_loc5_], isIWindow);
                    if (_loc6_ != null) {
                        this.enableElement(_loc6_, param2);
                        if (isIIterable(_loc6_)) {
                            this.enableWindow(_loc6_, param2);
                        }
                    }
                    _loc5_++;
                }
            }
        }
    }

    private enableElement(param1: IWindow, param2: boolean): void {
        if (param2) {
            param1.blend = 1;
            param1.enable();
        } else {
            param1.blend = 0.5;
            param1.disable();
        }
    }

    private updateSuggestions(param1: any[]): void {
        let _loc5_: IWindowContainer = null;
        let _loc7_: ITextWindow = null;
        let _loc2_: number = 0;
        let _loc8_: number = 0;
        let _loc10_: TextFormat = null;
        let _loc3_: number = 0;
        if (this._SafeStr_2495 == null) {
            this._SafeStr_2495 = asGuarded(this._window.findChildByName("suggestion_container"), isIWindowContainer);
        }
        if (this._SafeStr_3360 == null) {
            this._SafeStr_3360 = asGuarded(this._catalog.utils.createWindow("suggestion_list_item_new"), isIWindowContainer);
        }
        if (this._SafeStr_2495 == null || this._SafeStr_3360 == null) {
            return;
        }
        let _loc9_: IItemListWindow = asGuarded(this._SafeStr_2495.findChildByName("suggestion_list"), isIItemListWindow);
        if (_loc9_ == null) {
            return;
        }
        _loc9_.removeListItems();
        if (param1.length == 0) {
            this.showSuggestions(false);
            return;
        }
        this.showSuggestions(true);
        let _loc6_: number = 0;
        for (const _loc4_ of param1 ?? []) {
            _loc5_ = asGuarded(this._SafeStr_3360.clone(), isIWindowContainer);
            if (_loc5_ != null) {
                _loc5_.addEventListener("WME_CLICK", this.onSuggestionsClick);
                _loc5_.addEventListener("WME_OVER", this.onSuggestionsMouseOver);
                _loc7_ = asGuarded(_loc5_.findChildByName("name_text"), isITextWindow);
                if (_loc7_ != null) {
                    _loc7_.text = stringOrNull(_loc4_);
                    if (this._receiverName != null) {
                        _loc2_ = this._receiverName.length;
                        if (_loc2_ > 0) {
                            _loc8_ = _loc4_.toLowerCase().search(this._receiverName.toLowerCase()) | 0;
                            if (_loc8_ != -1) {
                                _loc10_ = _loc7_.getTextFormat();
                                _loc10_.bold = true;
                                _loc3_ = _loc8_ + _loc2_;
                                if (_loc3_ > _loc4_.length) {
                                    _loc3_ = _loc4_.length | 0;
                                }
                                _loc7_.setTextFormat(_loc10_, _loc8_, _loc3_);
                            }
                        }
                    }
                    _loc9_.addListItem(_loc5_);
                }
                _loc5_.color = this.getColor(_loc6_);
                _loc6_++;
            }
        }
        this.showMessageInput(param1.length < 2);
        this.highlightSuggestion(0);
    }

    private onSuggestionsClick = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = asGuarded(param1.target, isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: ITextWindow = asGuarded(_loc2_.findChildByName("name_text"), isITextWindow);
        if (_loc3_ == null) {
            return;
        }
        this.setReceiverName(_loc3_.text);
        this.showSuggestions(false);
    };

    private onSuggestionsMouseOver = (param1: WindowEvent): void => {
        let _loc2_: IWindowContainer = asGuarded(param1.target, isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IItemListWindow = asGuarded(this._SafeStr_2495.findChildByName("suggestion_list"), isIItemListWindow);
        if (_loc3_ == null) {
            return;
        }
        this.highlightSuggestion(_loc3_.getListItemIndex(_loc2_));
    };

    private highlightSuggestion(param1: number): void {
        let _loc2_: IWindowContainer = null;
        if (this._SafeStr_2495 == null) {
            return;
        }
        let _loc3_: IItemListWindow = asGuarded(this._SafeStr_2495.findChildByName("suggestion_list"), isIItemListWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc2_ = asGuarded(_loc3_.getListItemAt(this._highlightIndex >>> 0), isIWindowContainer);
        if (_loc2_ != null) {
            _loc2_.color = this.getColor(this._highlightIndex);
        }
        this._highlightIndex = param1;
        if (this._highlightIndex < 0) {
            this._highlightIndex = _loc3_.numListItems - 1;
        }
        if (this._highlightIndex >= _loc3_.numListItems) {
            this._highlightIndex = 0;
        }
        _loc2_ = asGuarded(_loc3_.getListItemAt(this._highlightIndex >>> 0), isIWindowContainer);
        if (_loc2_ != null) {
            _loc2_.color = 4291613146;
        }
    }

    private getColor(param1: number): number {
        return param1 % 2 == 0 ? 4293848814 : 4294967295;
    }

    private setReceiverName(param1: string): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("name_input");
        if (_loc2_ == null) {
            return;
        }
        _loc2_.caption = param1;
        this.updateNameHint();
        this.focusMessageField();
    }

    private onColorItemClick = (param1: WindowEvent): void => {
        this._SafeStr_4004 = param1.target.id;
        this.updateColorGrid();
        this.updatePreview();
    };

    private updateColorGrid(): void {
        let _loc1_: IWindowContainer = null;
        let _loc2_: IWindow = null;
        let _loc4_: number = 0;
        if (this._window == null) {
            return;
        }
        let _loc3_: IItemGridWindow = asGuarded(this._window.findChildByName("color_grid"), isIItemGridWindow);
        if (_loc3_ == null) {
            return;
        }
        _loc4_ = 0;
        while (_loc4_ < _loc3_.numGridItems) {
            _loc1_ = asGuarded(_loc3_.getGridItemAt(_loc4_ >>> 0), isIWindowContainer);
            if (_loc1_ != null) {
                _loc2_ = _loc1_.findChildByName("selection");
                if (_loc2_ != null) {
                    _loc2_.visible = _loc1_.id == this._SafeStr_4004;
                }
            }
            _loc4_++;
        }
    }

    public receiverNotFound(): void {
        if (this.disposed) {
            return;
        }
        this.enableGiftButton(true);
        if (!this._catalog || !this._catalog.windowManager) {
            return;
        }
        this._catalog.windowManager.alert("${catalog.gift_wrapping.receiver_not_found.title}", "${catalog.gift_wrapping.receiver_not_found.info}", 0, this.alertHandler);
    }

    private alertHandler = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
        this.enableGiftButton(true);
    };

    private enableGiftButton(param1: boolean): void {
        if (this._window == null) {
            return;
        }
        let _loc2_: IButtonWindow = asGuarded(this._window.findChildByName("give_gift_button"), isIButtonWindow);
        if (_loc2_ != null) {
            param1 ? _loc2_.enable() : Boolean(_loc2_.disable());
        }
    }

    public notEnoughCredits(): void {
        if (this.disposed) {
            return;
        }
        if (this._window == null) {
            return;
        }
        this.enableGiftButton(true);
        this.safeEnable("header_button_close");
        let _loc1_: ICheckBoxWindow = asGuarded(this._window.findChildByName("use_free_checkbox"), isICheckBoxWindow);
        if (_loc1_ != null) {
            _loc1_.select();
        }
    }

    public ltdRaffleStarted(): void {
        let _loc1_: IWindow = this._window.findChildByName("raffle_container");
        if (_loc1_ != null) {
            _loc1_.visible = true;
        }
        this._SafeStr_3547 = 1;
        this.updateDots();
        this._SafeStr_2562 = new Timer(150);
        this._SafeStr_2562.addEventListener("timer", this.onRaffleTimerTick);
        this._SafeStr_2562.start();
    }

    public ltdRaffleEnded(): void {
        let _loc1_: IWindow = null;
        if (!this._disposed) {
            _loc1_ = this._window.findChildByName("raffle_container");
            if (_loc1_ != null) {
                _loc1_.visible = false;
            }
            if (this._SafeStr_2562 != null && this._SafeStr_2562.running) {
                this._SafeStr_2562.stop();
            }
            this._SafeStr_2562 = null;
        }
    }

    private onRaffleTimerTick = (param1: TimerEvent): void => {
        this._SafeStr_3547 += 1;
        if (this._SafeStr_3547 > 14) {
            this._SafeStr_3547 = 1;
        }
        this.updateDots();
    };

    private updateDots(): void {
        let _loc1_: number = 0;
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("raffle_text"), isITextWindow);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: string = this._localization.getLocalization("catalog.purchase.confirmation.dialog.raffling");
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_3547) {
            _loc3_ += ".";
            _loc1_ += 1;
        }
        _loc2_.text = _loc3_;
    }

    public turnIntoGifting(): void {
        let _loc1_: IWindow = this._window.findChildByName("buy_button");
        _loc1_.removeEventListener("WME_CLICK", this.onBuyButtonClick);
        _loc1_.addEventListener("WME_CLICK", this.onGiftButtonClick);
        _loc1_.caption = "${catalog.purchase_confirmation.gift}";
        this._window.caption = "${catalog.purchase_confirmation.gift.title}";
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
