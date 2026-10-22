import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { IGridItem } from '@/com/sulake/habbo/catalog/viewer/IGridItem';
import type { IProduct } from '@/com/sulake/habbo/catalog/viewer/IProduct';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { ActivityPointTypeEnum } from '@/com/sulake/habbo/catalog/purse/ActivityPointTypeEnum';
import { IProductContainer } from '@/com/sulake/habbo/catalog/viewer/IProductContainer';
import { Product } from '@/com/sulake/habbo/catalog/viewer/ProductContainer.group';
import { ProductGridItem } from '@/com/sulake/habbo/catalog/viewer/ProductGridItem';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class ProductContainer extends ProductGridItem implements IGetImageListener, IProductContainer, IGridItem, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer::ProductContainer'); }

    private static readonly ELEMENT_TOTAL_PRICE_CONTAINER: string = "totalprice_container";
    private static readonly _SafeStr_8196: string = "amount_text_left";
    private static readonly ELEMENT_AMOUNT_TEXT_RIGHT: string = "amount_text_right";
    private static readonly ELEMENT_CURRENCY_INDICATOR_BITMAP_RIGHT: string = "currency_indicator_bitmap_right";

    declare protected _offer: IPurchasableOffer;

    declare protected _products: IProduct[];

    constructor(param1: IPurchasableOffer, param2: IProduct[], param3: HabboCatalog) {
        let _loc5_: string = null;
        super(param3);
        for (const _loc4_ of param2 ?? []) {
            if (_loc4_.productType != "b") {
                _loc5_ = _loc4_.extraParam;
                break;
            }
        }
        this._offer = param1;
        this._products = param2;
    }

    public get products(): IProduct[] {
        return this._products;
    }

    public get firstProduct(): IProduct {
        if (!this._products || this._products.length == 0) {
            return null;
        }
        if (this._products.length == 1) {
            return this._products[0];
        }
        if (this._products.length == 2 && (this._products[1].productType == "b" || this._products[0].productType == "b")) {
            return this._products[0].productType == "b" ? this._products[1] : this._products[0];
        }
        let _loc1_: IProduct[] = Product.stripAddonProducts(this._products);
        return _loc1_.length > 0 ? _loc1_[0] : null;
    }

    public get offer(): IPurchasableOffer {
        return this._offer;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        for (const _loc1_ of this._products ?? []) {
            _loc1_.dispose();
        }
        this._products = null;
        super.dispose();
    }

    public get isLazy(): boolean {
        return false;
    }

    public initProductIcon(param1: IRoomEngine, param2: IStuffData = null): void {
    }

    public override set view(param1: IWindowContainer) {
        let _loc3_: number = 0;
        let _loc2_: IProduct = null;
        super.view = param1;
        if (this._view == null) {
            return;
        }
        if (this.catalog && (this._offer.badgeCode && this._offer.badgeCode != "" || this._offer.extraChatStyleCode && this._offer.extraChatStyleCode != "") && this._offer.productContainer.products.length > 1) {
            this.setAddOnIcon("catalog_icon_badge_included");
        } else if (this.catalog && this._offer.productContainer.products.length == 2) {
            _loc3_ = 0;
            while (_loc3_ < 2) {
                _loc2_ = this._offer.productContainer.products[_loc3_];
                if (_loc2_.productType == "e" && _loc2_.productClassId == 108) {
                    this.setAddOnIcon("catalog_icon_ninja_effect_included");
                }
                _loc3_++;
            }
        }
        this.setClubIconLevel(this.offer.clubLevel);
        if (this.catalog.isDraggable(this.offer)) {
            this.setDraggable(true);
        }
    }

    private setAddOnIcon(param1: string): void {
        let _loc3_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("badge_add_on"), isIBitmapWrapperWindow);
        let _loc4_: IAsset = this.catalog.assets.getAssetByName(param1);
        _loc3_.bitmap = asInstanceOf(_loc4_.content, BitmapData);
        let _loc2_: BitmapData = asInstanceOf(_loc4_.content, BitmapData);
        _loc3_.width = _loc2_.width;
        _loc3_.height = _loc2_.height;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        this.setIconImage(param2, true);
    }

    public imageFailed(param1: number): void {
    }

    public setClubIconLevel(param1: number): void {
        if (this.view == null) {
            return;
        }
        let _loc2_: IWindow = this.view.findChildByName("clubLevelIcon");
        if (_loc2_ == null) {
            return;
        }
        switch (this.offer.clubLevel) {
            case 0:
                _loc2_.visible = false;
                break;
            case 1:
                _loc2_.visible = true;
                _loc2_.style = 11;
                _loc2_.x += 3;
                break;
            case 2:
                _loc2_.visible = true;
                _loc2_.style = 12;
        }
    }

    public avatarImageReady(param1: string): void {
        if (!this.disposed) {
            for (const _loc2_ of this.products ?? []) {
                if (_loc2_.productType == "r" && _loc2_.extraParam == param1) {
                    this.setIconImage(this.renderAvatarImage(_loc2_.extraParam, this), true);
                    return;
                }
            }
        }
    }

    public createCurrencyIndicators(param1: HabboCatalog): void {
        let _loc3_: ITextWindow = null;
        let _loc7_: ITextWindow = null;
        let _loc6_: IWindow = null;
        let _loc2_: ITextWindow = null;
        let _loc4_: IWindow = null;
        if (this._offer.priceInCredits > 0) {
            if (this._offer.priceInActivityPoints > 0) {
                _loc3_ = castGuarded(this._view.findChildByName("amount_text_left"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            } else {
                _loc3_ = castGuarded(this._view.findChildByName("amount_text_right"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            }
            if (_loc3_) {
                _loc3_.text = this._offer.priceInCredits + "";
            }
        }
        if (this._offer.priceInActivityPoints > 0) {
            _loc7_ = castGuarded(this._view.findChildByName("amount_text_right"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            if (_loc7_) {
                _loc6_ = this._view.findChildByName("currency_indicator_bitmap_right");
                if (_loc6_) {
                    _loc6_.style = ActivityPointTypeEnum.getIconStyleFor(this._offer.activityPointType, param1, false) >>> 0;
                }
                _loc7_.text = this._offer.priceInActivityPoints + "";
            }
        } else if (this._offer.priceInSilver > 0) {
            _loc2_ = castGuarded(this._view.findChildByName("amount_text_right"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
            if (_loc2_) {
                _loc4_ = this._view.findChildByName("currency_indicator_bitmap_right");
                if (_loc4_) {
                    _loc4_.style = ActivityPointTypeEnum.getIconStyleFor(1000, param1, false) >>> 0;
                }
                _loc2_.text = this._offer.priceInSilver + "";
            }
        }
        let _loc5_: IItemListWindow = castGuarded(this._view.findChildByName("totalprice_container"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        if (_loc5_) {
            _loc5_.arrangeListItems();
        }
    }

    public override get view(): IWindowContainer {
        return super.view;
    }

    get [IGetImageListener](): true {
        return true;
    }

    get [IProductContainer](): true {
        return true;
    }
}
