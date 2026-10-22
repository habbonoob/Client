import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { TargetedOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/TargetedOffer';
import type { OfferController } from '@/com/sulake/habbo/catalog/targetedoffers/OfferController';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { OfferView } from '@/com/sulake/habbo/catalog/targetedoffers/OfferView';

export class TargetedOfferMinimizedView extends OfferView {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers::TargetedOfferMinimizedView'); }

    private static readonly IMAGE_DEFAULT_URL: string = "targetedoffers/offer_default_icon.png";

    constructor(param1: OfferController, param2: TargetedOffer) {
        let _loc6_: IItemListWindow = null;
        super(param1, param2);
        this._window = castGuarded(this._controller.catalog.windowManager.buildFromXML(XML.from(this._controller.catalog.assets.getAssetByName("targeted_offer_minimized_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc5_: ITextWindow = castGuarded(this._window.findChildByName("txt_title"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc5_) {
            _loc5_.text = this.getLocalization(param2.title);
        }
        let _loc3_: string = (asGuarded(this._controller.catalog, isICoreConfiguration)).getProperty("image.library.url");
        let _loc4_: string = param2.iconImageUrl && param2.iconImageUrl.length > 0 ? param2.iconImageUrl : "targetedoffers/offer_default_icon.png";
        castGuarded(this._window.findChildByName("bmp_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc3_ + _loc4_;
        this._timeLeftText = this.getLocalization("targeted.offer.minimized.timeleft", "");
        if (this._offer.expirationTime == 0) {
            _loc6_ = asGuarded(this._window.findChildByName("itemlist"), isIItemListWindow);
            if (_loc6_) {
                _loc6_.removeListItem(this._window.findChildByName("cnt_time_left"));
            }
        } else {
            this.startUpdateTimer();
        }
        this._window.procedure = this.onInput;
        this._controller.attachExtension(this._window);
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (!this._controller) {
            return;
        }
        if (param1.type == "WME_DOWN") {
            this._controller.maximizeOffer(this._offer);
            param2.name;
        }
    };

    public get window(): IWindow {
        return this._window;
    }
}
