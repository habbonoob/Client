import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NewUserExperienceGift } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGift';
import type { NewUserExperienceGiftOptions } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGiftOptions';
import type { NewUserExperienceGiftProduct } from '@/com/sulake/habbo/communication/messages/incoming/nux/NewUserExperienceGiftProduct';
import type { HabboNuxDialogs } from '@/com/sulake/habbo/nux/HabboNuxDialogs';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { NewUserExperienceGetGiftsSelection } from '@/com/sulake/habbo/communication/messages/outgoing/nux/NewUserExperienceGetGiftsSelection';

export class NuxGiftSelectionView implements IProductDataListener {
    static { registerClassName(this, 'com.sulake.habbo.nux::NuxGiftSelectionView'); }

    constructor(param1: HabboNuxDialogs, param2: NewUserExperienceGiftOptions[]) {
        this._component = param1;
        this._giftOptions = param2;
        this._SafeStr_2236 = 0;
        this._SafeStr_5818 = [];
        if (this._component.sessionDataManager && this._component.sessionDataManager.loadProductData(this)) {
            this.show();
        }
    }

    declare private _frame: IFrameWindow;

    declare private _component: HabboNuxDialogs;

    declare private _SafeStr_4466: IWindowContainer;

    declare private _giftOptions: NewUserExperienceGiftOptions[];

    declare private _SafeStr_2236: number;
    static { (this.prototype as any)._SafeStr_2236 = 0; }

    declare private _SafeStr_5818: NewUserExperienceGetGiftsSelection[];

    public get disposed(): boolean {
        return this._component == null;
    }

    public productDataReady(): void {
        this.show();
    }

    public dispose(): void {
        if (this._frame) {
            this._frame.dispose();
            this._frame = null;
        }
        this._component = null;
        this._SafeStr_4466 = null;
    }

    private hide(): void {
        if (this._component) {
            this._component.destroyNuxOfferView();
        }
    }

    private show(): void {
        if (this._frame != null) {
            this._frame.dispose();
        }
        let _loc2_: XmlAsset = asInstanceOf(this._component.assets.getAssetByName("nux_gift_selection_xml"), XmlAsset);
        this._frame = asGuarded(this._component.windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIFrameWindow);
        if (this._frame == null) {
            throw new Error("Failed to construct window from XML!");
        }
        let _loc1_: IWindow = this._frame.findChildByTag("close");
        if (_loc1_) {
            _loc1_.visible = false;
        }
        this.populateStep();
    }

    private populateStep(): void {
        let _loc6_: number = 0;
        let _loc2_: NewUserExperienceGift = null;
        let _loc12_: IWindowContainer = null;
        let _loc3_: ITextWindow = null;
        let _loc9_: IButtonWindow = null;
        let _loc10_: IWindowContainer = null;
        let _loc14_: IStaticBitmapWrapperWindow = null;
        let _loc13_: string = null;
        let _loc15_: number = 0;
        let _loc4_: NewUserExperienceGiftProduct = null;
        let _loc16_: string = null;
        let _loc8_: string = null;
        let _loc11_: IProductData = null;
        let _loc17_: string = null;
        if (!this._giftOptions || !this._giftOptions.length) {
            return;
        }
        let _loc1_: NewUserExperienceGiftOptions = this._giftOptions[this._SafeStr_2236];
        let _loc5_: IItemListWindow = asGuarded(this._frame.findChildByName("nux_gift_selection_list"), isIItemListWindow);
        if (!this._SafeStr_4466) {
            this._SafeStr_4466 = asGuarded(_loc5_.getListItemAt(0), isIWindowContainer);
        }
        _loc5_.removeListItems();
        let _loc7_: string = decodeURI(this._component.localizationManager.getLocalization("nux.gift.selection.separator", ", "));
        _loc6_ = 0;
        while (_loc6_ < _loc1_.options.length) {
            _loc2_ = _loc1_.options[_loc6_];
            _loc12_ = asGuarded(this._SafeStr_4466.clone(), isIWindowContainer);
            _loc3_ = asGuarded(_loc12_.getChildByName("option_heading"), isITextWindow);
            _loc9_ = asGuarded(_loc12_.getChildByName("option_button"), isIButtonWindow);
            _loc10_ = asGuarded(_loc12_.getChildByName("option_thumbnail"), isIWindowContainer);
            _loc14_ = asGuarded(_loc10_.getChildByName("option_bitmap"), isIStaticBitmapWrapperWindow);
            _loc13_ = "";
            if (_loc2_.productOfferList.length) {
                _loc15_ = 0;
                while (_loc15_ < _loc2_.productOfferList.length) {
                    _loc4_ = _loc2_.productOfferList[_loc15_];
                    _loc16_ = _loc4_.productCode;
                    _loc8_ = _loc4_.localizationKey;
                    if (_loc8_ != null) {
                        _loc13_ += this._component.localizationManager.getLocalization(_loc8_, _loc8_);
                    } else {
                        _loc11_ = this._component.catalog.getProductData(_loc16_);
                        if (_loc11_ && _loc11_.name) {
                            _loc13_ += _loc11_.name;
                        } else {
                            _loc13_ += this._component.localizationManager.getLocalization("product_" + _loc16_ + "_name", "product_" + _loc16_ + "_name");
                        }
                    }
                    if (_loc15_ < _loc2_.productOfferList.length - 1) {
                        _loc13_ += _loc7_;
                    }
                    _loc15_++;
                }
            }
            _loc17_ = _loc2_.thumbnailUrl;
            if (_loc17_) {
                _loc14_.assetUri = this._component.configuration.getProperty("image.library.url") + _loc17_;
            }
            _loc3_.text = _loc13_;
            _loc9_.name = _loc6_.toString();
            _loc9_.procedure = this.onSelectOption;
            _loc5_.addListItem(_loc12_);
            _loc6_++;
        }
        _loc5_.arrangeListItems();
        if (this._giftOptions.length > 1) {
            this._frame.caption = this._component.localizationManager.getLocalization("nux.gift.selection.title") + " " + (this._SafeStr_2236 + 1) + "/" + this._giftOptions.length;
        }
        this._frame.center();
    }

    private onSelectOption = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: NewUserExperienceGiftOptions = null;
        let _loc6_: IItemListWindow = null;
        let _loc4_: number = 0;
        let _loc5_: NewUserExperienceGetGiftsSelection = null;
        if (param1.type == "WME_CLICK") {
            _loc3_ = this._giftOptions[this._SafeStr_2236];
            _loc6_ = asGuarded(this._frame.findChildByName("nux_gift_selection_list"), isIItemListWindow);
            _loc4_ = _loc6_.getListItemIndex(param2.parent);
            if (_loc4_ == -1) {
                return;
            }
            _loc5_ = new NewUserExperienceGetGiftsSelection(_loc3_.dayIndex, _loc3_.stepIndex, _loc4_);
            this._SafeStr_5818.push(_loc5_);
            this._SafeStr_2236 = this._SafeStr_2236 + 1;
            if (this._SafeStr_2236 == this._giftOptions.length) {
                this._component.onSendGetGifts(this._SafeStr_5818);
            } else {
                this.show();
            }
        }
    };

    private onClose(param1: WindowMouseEvent): void {
        this.hide();
    }

    get [IDisposable](): true {
        return true;
    }
}
