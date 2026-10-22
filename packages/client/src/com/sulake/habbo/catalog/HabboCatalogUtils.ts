import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { BundleDiscountRuleset } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BundleDiscountRuleset';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { VipBenefitsWindow } from '@/com/sulake/habbo/catalog/club/VipBenefitsWindow';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';

export class HabboCatalogUtils implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog::HabboCatalogUtils'); }

    private static readonly PRICE_CREDIT: string = "credit";
    private static readonly PRICE_SILVER: string = "silver";
    private static readonly PRICE_ACTIVITY_POINT: string = "activityPoint";
    private static readonly DEFAULT_ACTIVITY_POINTS_PRICE_COLOR: any = 9032648;

    public static buildersClub(param1: string): boolean {
        return param1.indexOf("builders_club") == 0 || param1.indexOf("loyalty_bc") == 0;
    }

    public static replaceCenteredImage(param1: IBitmapWrapperWindow, param2: BitmapData, param3: Rectangle = null): void {
        if (!param1.bitmap) {
            param1.bitmap = new BitmapData(param1.width, param1.height, true, 0);
        } else {
            param1.bitmap.fillRect(param1.bitmap.rect, 0);
        }
        let _loc5_: BitmapData = param1.bitmap;
        let _loc4_: Rectangle = param3 != null ? param3 : param2.rect;
        _loc5_.copyPixels(param2, _loc4_, new Point((_loc5_.width - _loc4_.width) / 2, (_loc5_.height - _loc4_.height) / 2), null, null, true);
        param1.invalidate();
    }

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
    }

    private BADGE_CHATSTYLE_WIDGET_NAME: string = "HCU_dynamic_badge";

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_3731: VipBenefitsWindow;

    private _bundleDiscountFlatPriceSteps: any[] = new Array(0);

    declare private _bundleDiscountHighestFlatPriceStep: number;
    static { (this.prototype as any)._bundleDiscountHighestFlatPriceStep = 0; }

    private _productBitmapWrappers: Map<any, any> = new Dictionary();
    private _SafeStr_6835: boolean = false;
    private _SafeStr_6792: boolean = false;
    private _SafeStr_6571: boolean = false;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get bundleDiscountFlatPriceSteps(): any[] {
        return this._bundleDiscountFlatPriceSteps;
    }

    public get bundleDiscountHighestFlatPriceStep(): number {
        return this._bundleDiscountHighestFlatPriceStep;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_3731 != null) {
                this._SafeStr_3731.dispose();
                this._SafeStr_3731 = null;
            }
            this._catalog = null;
            this._productBitmapWrappers = null;
            this._disposed = true;
        }
    }

    public createWindow(param1: string, param2: number = 1, param3: UtilsMap = null): IWindow {
        let _loc5_: any[] = null;
        let _loc6_: IBitmapWrapperWindow = null;
        if (this._catalog.windowManager == null || this._catalog.assets == null) {
            return null;
        }
        let _loc9_: XmlAsset = asInstanceOf(this._catalog.assets.getAssetByName(param1), XmlAsset);
        if (_loc9_ == null || _loc9_.content == null) {
            return null;
        }
        let _loc8_: IWindow = this._catalog.windowManager.buildFromXML(asInstanceOf(_loc9_.content, XML), param2, param3);
        let _loc4_: IWindowContainer = isIWindowContainer(_loc8_) ? _loc8_ : null;
        if (_loc4_ != null) {
            _loc5_ = [];
            _loc4_.groupChildrenWithTag("bitmap", _loc5_, -1);
            for (const _loc7_ of _loc5_ ?? []) {
                _loc6_ = isIBitmapWrapperWindow(_loc7_) ? _loc7_ : null;
                if (_loc6_ != null) {
                    _loc6_.disposesBitmap = false;
                    this.setCatalogItemImage(_loc6_, _loc6_.bitmapAssetName);
                }
            }
        }
        return _loc8_;
    }

    public showPriceInContainer(param1: IWindowContainer, param2: IPurchasableOffer, param3: number = 1, param4: boolean = false, param5: boolean = false): void {
        if (param2 == null) {
            return;
        }
        let _loc6_: any[] = this.getPriceArray(param2, param3, param4);
        this.renderPriceInContainer(param1, _loc6_, param4, param5, false);
    }

    public getPriceMap(param1: IPurchasableOffer, param2: number): UtilsMap {
        let _loc4_: number = 0;
        let _loc3_: UtilsMap = new UtilsMap();
        if (param1.priceInCredits > 0) {
            _loc4_ = this.calculateBundlePrice(param1.bundlePurchaseAllowed, param1.priceInCredits, param2);
            _loc3_.add("credit", { "amount": _loc4_ });
        }
        if (param1.priceInActivityPoints > 0) {
            _loc4_ = this.calculateBundlePrice(param1.bundlePurchaseAllowed, param1.priceInActivityPoints, param2);
            _loc3_.add("activityPoint", { "amount": _loc4_, "activityPointType": param1.activityPointType });
        }
        if (param1.priceInSilver > 0) {
            _loc3_.add("silver", { "amount": param1.priceInSilver });
        }
        if (_loc3_.length == 0) {
            _loc3_.add("credit", { "amount": 0 });
        }
        return _loc3_;
    }

    public showPriceOnProduct(param1: IPurchasableOffer, param2: IWindowContainer, param3: IWindow, param4: IWindow, param5: number, param6: boolean, param7: number, param8: boolean = false, param9: boolean = false): IWindow {
        let _loc10_: any = null;
        if (param3 != null) {
            param2.removeChild(param3);
            param3.dispose();
        }
        if (this._catalog.catalogType == "BUILDERS_CLUB") {
            return null;
        }
        param3 = this._catalog.utils.createWindow("priceDisplayWidget");
        param2.addChild(param3);
        let _loc11_: IWindowContainer = asGuarded(param2.findChildByName("price_box_new"), isIWindowContainer);
        if (_loc11_ != null) {
            this._catalog.utils.showPriceInContainer(_loc11_, param1, 1, param8, param9);
            _loc10_ = param2.findChildByName("room_canvas_container");
            if (_loc10_ == null) {
                _loc10_ = param4;
            }
            if (_loc10_ != null) {
                param3.x = _loc10_.x + _loc10_.width + param5 - param3.width | 0;
                if (param6) {
                    param3.y = _loc10_.y + param7 | 0;
                } else {
                    param3.y = _loc10_.y + _loc10_.height - (param3.height + param7) | 0;
                }
            }
            if (param1.priceInActivityPoints == 0) {
                param3.color = 14992765;
            }
            if (param1.priceInCredits == 0) {
                if (param1.activityPointType == 0) {
                    param3.color = 11257559;
                } else if (ActivityPointTypeEnum.isSeasonal(param1.activityPointType)) {
                    param3.color = this.getSeasonalCurrencyPriceColor(param1.activityPointType);
                } else {
                    param3.color = 9032648;
                }
            }
            if (param1.priceInSilver > 0) {
                param3.color = 15790320;
            }
        }
        return param3;
    }

    public showExtraOnProduct(param1: number, param2: string, param3: IWindowContainer, param4: number, param5: number, param6: boolean = true, param7: boolean = true): void {
        let _loc12_: BitmapData = null;
        let _loc8_: IWindowContainer = asGuarded(param3.findChildByName(this.BADGE_CHATSTYLE_WIDGET_NAME), isIWindowContainer);
        if (_loc8_ == null) {
            _loc8_ = asGuarded(this.createWindow("badgeDisplayWidget"), isIWindowContainer);
            _loc8_.name = this.BADGE_CHATSTYLE_WIDGET_NAME;
        }
        let _loc11_: IStaticBitmapWrapperWindow = castGuarded(_loc8_.findChildByName("asset_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc13_: IWidgetWindow = asGuarded(_loc8_.findChildByName("badge_image"), isIWidgetWindow);
        let _loc9_: IBadgeImageWidget = asGuarded(_loc13_.widget, isIBadgeImageWidget);
        let _loc10_: IBitmapWrapperWindow = asGuarded(_loc8_.findChildByName("chat_style"), isIBitmapWrapperWindow);
        if (param1 == 9) {
            _loc11_.assetUri = "catalogue_chatstyle_background";
            _loc13_.visible = false;
            _loc10_.visible = true;
            _loc12_ = this._catalog.freeFlowChat.chatStyleLibrary.getStyle(Number(param2) | 0).selectorPreview.clone();
            _loc10_.bitmap = _loc12_;
        } else if (param1 == 4) {
            _loc11_.assetUri = "catalogue_badge_background";
            _loc13_.visible = true;
            _loc10_.visible = false;
            _loc9_.badgeId = param2;
        }
        _loc8_.width = _loc11_.width;
        _loc8_.height = _loc11_.height;
        param3.addChild(_loc8_);
        _loc8_.x = param7 ? param4 : param3.width - _loc8_.width - param4;
        _loc8_.y = param6 ? param5 : param3.height - _loc8_.height - param5;
    }

    public hideExtraFromProduct(param1: IWindowContainer): void {
        let _loc2_: IWindowContainer = asGuarded(param1.findChildByName(this.BADGE_CHATSTYLE_WIDGET_NAME), isIWindowContainer);
        if (_loc2_) {
            param1.removeChild(_loc2_);
        }
    }

    public showAssetImageAsBadgeOnProduct(param1: string, param2: IWindowContainer, param3: number, param4: number, param5: boolean = true, param6: boolean = true): void {
        let _loc7_: IWindowContainer = asGuarded(param2.findChildByName(this.BADGE_CHATSTYLE_WIDGET_NAME), isIWindowContainer);
        if (_loc7_ == null) {
            _loc7_ = asGuarded(this.createWindow("badgeDisplayWidget"), isIWindowContainer);
            _loc7_.name = this.BADGE_CHATSTYLE_WIDGET_NAME;
        }
        _loc7_.findChildByName("chat_style").visible = false;
        _loc7_.findChildByName("badge_image").visible = false;
        let _loc8_: IStaticBitmapWrapperWindow = castGuarded(_loc7_.findChildByName("badge_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        _loc8_.assetUri = param1;
        _loc7_.width = _loc8_.width;
        _loc7_.height = _loc8_.height;
        param2.addChild(_loc7_);
        _loc7_.x = param6 ? param3 : param2.width - _loc7_.width - param3;
        _loc7_.y = param5 ? param4 : param2.height - _loc7_.height - param4;
    }

    public setCatalogItemImage(param1: IBitmapWrapperWindow, param2: string): void {
        if (param1 == null) {
            return;
        }
        let _loc6_: IAsset = this._catalog.assets.getAssetByName(param2);
        if (_loc6_ == null) {
            return;
        }
        let _loc3_: BitmapData = asInstanceOf(_loc6_.content, BitmapData);
        if (_loc3_ == null) {
            return;
        }
        if (param1.bitmap != null) {
            param1.bitmap.dispose();
            param1.bitmap = null;
        }
        if (param1.bitmap == null) {
            param1.bitmap = new BitmapData(param1.width, param1.height, true, 0);
        }
        let _loc4_: number = (param1.width - _loc3_.width) * 0.5 | 0;
        let _loc5_: number = (param1.height - _loc3_.height) * 0.5 | 0;
        param1.bitmap.draw(_loc3_, new Matrix(1, 0, 0, 1, _loc4_, _loc5_));
    }

    public showVipBenefits(): void {
        if (this._catalog.getBoolean("catalog.vip.benefits.enabled")) {
            if (this._SafeStr_3731 == null || this._SafeStr_3731.disposed) {
                this._SafeStr_3731 = new VipBenefitsWindow(this._catalog);
            }
        } else {
            this.openLink(this._catalog.getProperty("link.format.club"));
        }
    }

    public openLink(param1: string): void {
        if (param1 != "") {
            this._catalog.windowManager.alert("${catalog.alert.external.link.title}", "${catalog.alert.external.link.desc}", 0, this.onExternalLinkAlertClose);
            HabboWebTools.openWebPage(param1, "habboMain");
        }
    }

    public calculateBundlePrice(param1: boolean, param2: number, param3: number): number {
        return param2 * param3;
    }

    public getDiscountItemsCount(param1: number): number {
        let _loc2_: number = this.getBasicBundleDiscountSize(param1);
        _loc2_ += this.getBonusBundleDiscountSize(param1);
        return _loc2_ + this.getThresholdBundleDiscountSize(param1);
    }

    public resolveBundleDiscountFlatPriceSteps(): void {
        let _loc1_: number = 0;
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        this._bundleDiscountFlatPriceSteps = [];
        this._bundleDiscountHighestFlatPriceStep = 0;
        _loc1_ = 0;
        while (_loc1_ < 99) {
            _loc2_ = this.calculateBundlePrice(true, 1, _loc1_);
            _loc3_ = this.calculateBundlePrice(true, 1, _loc1_ + 1);
            if (_loc2_ == _loc3_) {
                this._bundleDiscountFlatPriceSteps.push(_loc1_);
                this._bundleDiscountHighestFlatPriceStep = _loc1_;
            }
            _loc1_++;
        }
    }

    public spinnerValueChangedEventTrack(): void {
        if (!this._SafeStr_6835) {
            HabboTracking.getInstance().trackEventLog("Catalog", "spinnerValueChanged", "client.bundle.discounts");
            this._SafeStr_6835 = true;
        }
    }

    public bundlesInfoShownEventTrack(): void {
        if (!this._SafeStr_6792) {
            HabboTracking.getInstance().trackEventLog("Catalog", "bundlesInfoOpened", "client.bundle.discounts");
            this._SafeStr_6792 = true;
        }
    }

    public discountShownEventTrack(): void {
        if (!this._SafeStr_6571) {
            HabboTracking.getInstance().trackEventLog("Catalog", "discountItemShown", "client.bundle.discounts");
            this._SafeStr_6571 = true;
        }
    }

    public displayProductIcon(param1: string, param2: number, param3: IBitmapWrapperWindow): void {
        let _loc4_: ImageResult = null;
        let _loc5_: any = undefined;
        if (this._catalog == null) {
            return;
        }
        switch (param1) {
            case "s":
                _loc4_ = this._catalog.roomEngine.getFurnitureIcon(param2, this);
                break;
            case "i":
                _loc4_ = this._catalog.roomEngine.getWallItemIcon(param2, this);
                break;
            case "e":
                param3.bitmap = this._catalog.getPixelEffectIcon(param2);
                break;
            case "h":
                param3.bitmap = this._catalog.getSubscriptionProductIcon(param2);
        }
        if (_loc4_ != null) {
            param3.bitmap = _loc4_.data;
            if (_loc4_.id != 0) {
                _loc5_ = this._productBitmapWrappers.get(_loc4_.id);
                if (_loc5_ == null) {
                    _loc5_ = new Array<IBitmapWrapperWindow>(0).fill(null);
                    this._productBitmapWrappers.set(_loc4_.id, _loc5_);
                }
                _loc5_.push(param3);
            }
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        let _loc3_: IBitmapWrapperWindow[] = this._productBitmapWrappers.get(param1);
        if (_loc3_ == null) {
            return;
        }
        for (const _loc4_ of _loc3_ ?? []) {
            _loc4_.bitmap = param2;
        }
        this._productBitmapWrappers.delete(param1);
    }

    public imageFailed(param1: number): void {
    }

    private renderPriceInContainer(param1: IWindowContainer, param2: any[], param3: boolean, param4: boolean, param5: boolean): void {
        let _loc6_: number = 0;
        let _loc7_: IItemListWindow = this.createPriceContainer(param1);
        if (_loc7_ == null) {
            return;
        }
        _loc6_ = 0;
        while (_loc6_ < param2.length) {
            this.renderPriceItem(_loc7_, _loc6_, param2[_loc6_], param3, param4, param5);
            _loc6_++;
        }
        let _loc8_: number = _loc6_ * 2 + 2;
        while (_loc7_.numListItems > _loc8_) {
            _loc7_.removeListItemAt(_loc8_ - 1);
        }
        param1.addChild(_loc7_);
    }

    private renderPriceItem(param1: IItemListWindow, param2: number, param3: any, param4: boolean, param5: boolean, param6: boolean): void {
        let _loc7_: ITextWindow = asGuarded(param1.getListItemByName("amount_" + param2), isITextWindow);
        let _loc8_: IIconWindow = castGuarded(param1.getListItemByName("unit_" + param2), isIIconWindow, "com.sulake.core.window.components.IIconWindow");
        _loc7_.text = param6 ? "" : (param2 > 0 ? "+ " : "") + param3.amount;
        _loc8_.style = ActivityPointTypeEnum.getIconStyleFor(param3.unit | 0, this._catalog, true, param5) >>> 0;
        _loc8_.width = param4 && param5 ? 53 : 22;
        _loc8_.fitToSize();
    }

    private createPriceContainer(param1: IWindowContainer): IItemListWindow {
        if (param1 == null) {
            return null;
        }
        let _loc2_: IItemListWindow = asGuarded(this.createWindow("price_display"), isIItemListWindow);
        if (_loc2_ == null) {
            return null;
        }
        while (param1.numChildren > 0) {
            param1.removeChildAt(0).dispose();
        }
        return _loc2_;
    }

    private getPriceArray(param1: IPurchasableOffer, param2: number, param3: boolean): any[] {
        let _loc6_: number = 0;
        let _loc5_: number = -1;
        let _loc4_: any[] = [];
        if (param1.priceInCredits > 0) {
            _loc6_ = this.calculateBundlePrice(param1.bundlePurchaseAllowed, param1.priceInCredits, param2);
            _loc5_ = param3 ? this._catalog.getSeasonalCurrencyActivityPointType() : -1;
            _loc4_.push({ "amount": _loc6_, "unit": _loc5_ });
        }
        if (param1.priceInActivityPoints > 0) {
            _loc6_ = this.calculateBundlePrice(param1.bundlePurchaseAllowed, param1.priceInActivityPoints, param2);
            _loc4_.push({ "amount": _loc6_, "unit": param1.activityPointType });
        }
        if (param1.priceInSilver > 0) {
            _loc4_.push({ "amount": param1.priceInSilver, "unit": 1000 });
        }
        if (param1.priceInEmerald > 0) {
            _loc4_.push({ "amount": param1.priceInEmerald, "unit": 1001 });
        }
        if (_loc4_.length == 0) {
            _loc4_.push({ "amount": 0, "unit": -1 });
        }
        return _loc4_;
    }

    private getSeasonalCurrencyPriceColor(param1: number): number {
        if (!ActivityPointTypeEnum.isSeasonal(param1)) {
            return 9032648;
        }
        let _loc3_: string = this._catalog.getProperty("seasonalcurrency.id." + param1);
        if (_loc3_ == "") {
            return 9032648;
        }
        let _loc2_: string = this._catalog.getProperty("seasonalcurrency." + _loc3_ + ".color");
        if (_loc2_ == "") {
            return 9032648;
        }
        return ColorConverter.hexToUint(this._catalog.getProperty("seasonalcurrency.preset." + _loc2_ + ".border"));
    }

    private onExternalLinkAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        param1.dispose();
    };

    private getBasicBundleDiscountSize(param1: number): number {
        let _loc3_: BundleDiscountRuleset = this._catalog.bundleDiscountRuleset;
        if (!_loc3_ || _loc3_.bundleSize <= 0) {
            return 0;
        }
        let _loc2_: number = param1 / _loc3_.bundleSize | 0;
        return _loc2_ * _loc3_.bundleDiscountSize;
    }

    private getBonusBundleDiscountSize(param1: number): number {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: BundleDiscountRuleset = this._catalog.bundleDiscountRuleset;
        if (!_loc3_ || _loc3_.bundleSize <= 0) {
            return 0;
        }
        let _loc2_: number = param1 / _loc3_.bundleSize | 0;
        if (_loc2_ >= _loc3_.bonusThreshold) {
            _loc4_ = param1 % _loc3_.bundleSize;
            if (_loc4_ == _loc3_.bundleSize - 1) {
                _loc5_++;
            }
            _loc5_ += _loc2_ - _loc3_.bonusThreshold;
        }
        return _loc5_;
    }

    private getThresholdBundleDiscountSize(param1: number): number {
        let _loc4_: number = 0;
        let _loc2_: BundleDiscountRuleset = this._catalog.bundleDiscountRuleset;
        if (_loc2_) {
            for (const _loc3_ of _loc2_.additionalBonusDiscountThresholdQuantities ?? []) {
                if (param1 >= _loc3_) {
                    _loc4_++;
                }
            }
        }
        return _loc4_;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
