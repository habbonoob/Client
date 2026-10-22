import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ClubGiftController } from '@/com/sulake/habbo/catalog/club/ClubGiftController';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Offer } from '@/com/sulake/habbo/catalog/viewer/Offer';
import { Product } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { ClubGiftData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/ClubGiftData';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class ClubGiftWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::ClubGiftWidget'); }

    declare private _controller: ClubGiftController;

    declare private _offers: UtilsMap;

    declare private _preview: IWindowContainer;

    declare private _catalog: HabboCatalog;

    private readonly DAYS_IN_MONTH: number = 31;

    constructor(param1: IWindowContainer, param2: ClubGiftController, param3: HabboCatalog) {
        super(param1);
        this._catalog = param3;
        this._controller = param2;
        this._offers = new UtilsMap();
    }

    public override dispose(): void {
        super.dispose();
        this._controller = null;
        this._catalog = null;
        if (this._preview) {
            this._preview.dispose();
            this._preview = null;
        }
    }

    public override init(): boolean {
        if (!this.window) {
            return false;
        }
        if (!super.init()) {
            return false;
        }
        this._controller.widget = this;
        this.attachWidgetView("clubGiftWidget");
        this._window.findChildByName("info_text").caption = "";
        this._window.findChildByName("past_club_days").caption = "";
        this._window.findChildByName("past_vip_days").caption = "";
        this.update();
        return true;
    }

    public update(): void {
        this.updateInfo();
        this.updateList();
    }

    private updateInfo(): void {
        let _loc6_: string = null;
        let _loc4_: number = 0;
        let _loc1_: number = 0;
        let _loc5_: number = 0;
        if (!this._controller || !this.window) {
            return;
        }
        let _loc7_: IWindow = this.window.findChildByName("info_text");
        if (!_loc7_) {
            return;
        }
        if (this._controller.giftsAvailable > 0) {
            _loc6_ = "catalog.club_gift.available";
            this._controller.localization.registerParameter(_loc6_, "amount", this._controller.giftsAvailable.toString());
        } else if (this._controller.daysUntilNextGift > 0) {
            _loc6_ = "catalog.club_gift.days_until_next";
            this._controller.localization.registerParameter(_loc6_, "days", this._controller.daysUntilNextGift.toString());
        } else if (this._controller.hasClub) {
            _loc6_ = "catalog.club_gift.not_available";
        } else {
            _loc6_ = "catalog.club_gift.no_club";
        }
        _loc7_.caption = this._controller.localization.getLocalization(_loc6_);
        if (!this._controller.purse) {
            return;
        }
        let _loc2_: IWindow = this.window.findChildByName("past_club_days");
        if (_loc2_) {
            _loc5_ = this._controller.purse.pastClubDays + this._controller.purse.pastVipDays;
            _loc6_ = _loc5_ >= 31 ? "catalog.club_gift.past_club.long" : "catalog.club_gift.past_club";
            _loc4_ = _loc5_ % 31;
            _loc1_ = _loc5_ / 31 | 0;
            this._controller.localization.registerParameter(_loc6_, "days", _loc4_.toString());
            this._controller.localization.registerParameter(_loc6_, "months", _loc1_.toString());
            _loc2_.caption = this._controller.localization.getLocalization(_loc6_);
        }
        let _loc3_: IWindow = this.window.findChildByName("past_vip_days");
        if (_loc3_) {
            _loc6_ = this._controller.purse.pastVipDays >= 31 ? "catalog.club_gift.past_vip.long" : "catalog.club_gift.past_vip";
            _loc4_ = this._controller.purse.pastVipDays % 31;
            _loc1_ = this._controller.purse.pastVipDays / 31 | 0;
            this._controller.localization.registerParameter(_loc6_, "days", _loc4_.toString());
            this._controller.localization.registerParameter(_loc6_, "months", _loc1_.toString());
            _loc3_.caption = this._controller.localization.getLocalization(_loc6_);
        }
    }

    private updateList(): void {
        let _loc8_: any;
        let _loc1_: IPurchasableOffer = null;
        let _loc3_: IWindow = null;
        let _loc11_: any = undefined;
        let _loc12_: IProductData = null;
        let _loc9_: IFurnitureData = null;
        let _loc5_: Product = null;
        let _loc6_: ClubGiftData = null;
        if (!this._controller || !this.window || !this.page) {
            return;
        }
        for (_loc1_ of valuesOf(this._offers)) {
            _loc1_.dispose();
        }
        this._offers.reset();
        let _loc2_: any[] = this._controller.getOffers();
        if (!_loc2_) {
            return;
        }
        let _loc4_: UtilsMap = this._controller.getGiftData();
        if (!_loc4_) {
            return;
        }
        let _loc10_: IItemListWindow = asGuarded(this.window.findChildByName("gift_list"), isIItemListWindow);
        if (!_loc10_) {
            return;
        }
        _loc10_.destroyListItems();
        for (const _loc7_ of _loc2_ ?? []) {
            _loc11_ = new Array<IProduct>(0).fill(null);
            _loc12_ = this._controller.catalog.getProductData(stringOrNull(_loc7_.localizationId));
            for (_loc8_ of valuesOf(_loc7_.products)) {
                _loc9_ = this._controller.catalog.getFurnitureData(_loc8_.furniClassId | 0, stringOrNull(_loc8_.productType));
                _loc5_ = new Product(stringOrNull(_loc8_.productType), _loc8_.furniClassId | 0, stringOrNull(_loc8_.extraParam), _loc8_.productCount | 0, _loc12_, _loc9_, this._catalog);
                _loc11_.push(_loc5_);
            }
            _loc1_ = new Offer(_loc7_.offerId | 0, stringOrNull(_loc7_.localizationId), _loc7_.isRent, _loc7_.priceInCredits | 0, _loc7_.priceInActivityPoints | 0, _loc7_.activityPointType | 0, _loc7_.priceInSilver | 0, _loc7_.giftable, _loc7_.clubLevel | 0, _loc11_, _loc7_.bundlePurchaseAllowed, this._catalog);
            _loc1_.page = this.page;
            _loc6_ = asInstanceOf(_loc4_.getValue(_loc1_.offerId), ClubGiftData);
            _loc3_ = this.createListItem(_loc1_, _loc6_);
            if (_loc3_) {
                _loc10_.addListItem(_loc3_);
                this._offers.add(_loc1_.offerId, _loc1_);
            }
        }
    }

    private createListItem(param1: IPurchasableOffer, param2: ClubGiftData): IWindow {
        let _loc9_: number = 0;
        let _loc13_: string = null;
        let _loc8_: number = 0;
        let _loc12_: number = 0;
        if (!param1 || !param1.product || !param2) {
            return null;
        }
        let _loc3_: IWindowContainer = asGuarded(this.createWindow("club_gift_list_item"), isIWindowContainer);
        if (!_loc3_) {
            return null;
        }
        _loc3_.procedure = this.clickHandler;
        let _loc4_: IProduct = param1.product;
        if (!_loc4_) {
            return null;
        }
        let _loc6_: IProductData = _loc4_.productData;
        if (!_loc6_) {
            return null;
        }
        this.setText(_loc3_.findChildByName("gift_name"), _loc6_.name);
        this.setText(_loc3_.findChildByName("gift_desc"), _loc6_.description);
        if (param2.isVip) {
            _loc9_ = param2.daysRequired - this._controller.purse.pastVipDays;
        } else {
            _loc9_ = param2.daysRequired - (this._controller.purse.pastClubDays + this._controller.purse.pastVipDays);
        }
        if (!param2.isSelectable && _loc9_ > 0) {
            if (param2.isVip) {
                _loc13_ = "catalog.club_gift.vip_missing";
            } else {
                _loc13_ = "catalog.club_gift.club_missing";
            }
            if (_loc9_ >= 31) {
                _loc13_ += ".long";
            }
            _loc8_ = _loc9_ % 31;
            _loc12_ = _loc9_ / 31 | 0;
            this._controller.localization.registerParameter(_loc13_, "days", _loc8_.toString());
            this._controller.localization.registerParameter(_loc13_, "months", _loc12_.toString());
        } else if (this._controller.giftsAvailable > 0) {
            _loc13_ = "catalog.club_gift.selectable";
        } else {
            _loc13_ = "";
        }
        this.setText(_loc3_.findChildByName("months_required"), _loc13_.length > 0 ? this._controller.localization.getLocalization(_loc13_) : "");
        let _loc10_: IIconWindow = asGuarded(_loc3_.findChildByName("vip_icon"), isIIconWindow);
        if (_loc10_) {
            _loc10_.visible = param2.isVip;
        }
        let _loc11_: IButtonWindow = asGuarded(_loc3_.findChildByName("select_button"), isIButtonWindow);
        if (_loc11_) {
            if (param2.isSelectable && this._controller.giftsAvailable > 0) {
                _loc11_.enable();
            } else {
                _loc11_.disable();
            }
            _loc11_.id = param1.offerId;
        }
        let _loc7_: IProductContainer = param1.productContainer;
        if (!_loc7_) {
            return null;
        }
        if (!this.page || !this.page.viewer || !this.page.viewer.roomEngine) {
            return null;
        }
        let _loc5_: IWindowContainer = asGuarded(_loc3_.findChildByName("image_container"), isIWindowContainer);
        if (_loc5_) {
            _loc7_.view = _loc5_;
            _loc7_.initProductIcon(this.page.viewer.roomEngine);
            _loc5_.procedure = this.mouseOverHandler;
            _loc5_.id = param1.offerId;
        }
        return _loc3_;
    }

    private setText(param1: IWindow, param2: string): void {
        param1.caption = param2;
    }

    private clickHandler = (param1: WindowEvent, param2: IWindow): void => {
        if (!param1 || !param2 || !this._offers || !this._controller) {
            return;
        }
        if (param1.type != "WME_CLICK") {
            return;
        }
        if (param2.name != "select_button") {
            return;
        }
        let _loc3_: IPurchasableOffer = this._offers.getValue(param2.id);
        if (!_loc3_) {
            return;
        }
        this._controller.selectGift(_loc3_);
    };

    private mouseOverHandler = (param1: WindowEvent, param2: IWindow): void => {
        let _loc4_: Rectangle = null;
        if (!param1 || !param2 || !this._offers) {
            return;
        }
        if (param2.name != "image_container") {
            return;
        }
        let _loc3_: IPurchasableOffer = this._offers.getValue(param2.id);
        if (!_loc3_) {
            return;
        }
        if (param1.type == "WME_OVER") {
            _loc4_ = new Rectangle();
            param2.getGlobalRectangle(_loc4_);
        }
        if (param1.type == "WME_OUT") {
            this.hidePreview();
        }
    };

    private showPreview(param1: Offer, param2: Rectangle): void {
        let _loc6_: ImageResult = null;
        if (!param1 || !param1.productContainer) {
            return;
        }
        if (!this.page || !this.page.viewer || !this.page.viewer.roomEngine) {
            return;
        }
        let _loc4_: IProduct = param1.product;
        if (!_loc4_) {
            return;
        }
        if (!this._preview) {
            this._preview = asGuarded(this.createWindow("club_gift_preview"), isIWindowContainer);
        }
        if (!this._preview) {
            return;
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._preview.findChildByName("image"), isIBitmapWrapperWindow);
        if (!_loc3_) {
            return;
        }
        switch (_loc4_.productType) {
            case "s":
                _loc6_ = this.page.viewer.roomEngine.getFurnitureImage(_loc4_.productClassId, new Vector3d(90), 64, null, 0, _loc4_.extraParam);
                break;
            case "i":
                _loc6_ = this.page.viewer.roomEngine.getWallItemImage(_loc4_.productClassId, new Vector3d(90), 64, null, 0, _loc4_.extraParam);
                break;
            default:
                return;
        }
        if (!_loc6_ || !_loc6_.data) {
            return;
        }
        _loc3_.width = _loc6_.data.width;
        _loc3_.height = _loc6_.data.height;
        if (_loc3_.bitmap) {
            _loc3_.bitmap.dispose();
        }
        _loc3_.bitmap = new BitmapData(_loc3_.width, _loc3_.height);
        _loc3_.bitmap.draw(_loc6_.data);
        _loc6_.data.dispose();
        let _loc5_: Point = Point.interpolate(param2.topLeft, param2.bottomRight, 0.5);
        this._preview.setGlobalPosition(_loc5_.subtract(new Point(this._preview.width / 2, this._preview.height / 2)));
        this._preview.visible = true;
        this._preview.activate();
    }

    private hidePreview(): void {
        if (this._preview) {
            this._preview.visible = false;
        }
    }

    private createWindow(param1: string): IWindow {
        if (!this._controller || !this._controller.assets || !this._controller.windowManager) {
            return null;
        }
        let _loc3_: XmlAsset = asInstanceOf(this._controller.assets.getAssetByName(param1), XmlAsset);
        if (!_loc3_ || !_loc3_.content) {
            return null;
        }
        let _loc2_: XML = asInstanceOf(_loc3_.content, XML);
        if (!_loc2_) {
            return null;
        }
        return this._controller.windowManager.buildFromXML(_loc2_);
    }
}
