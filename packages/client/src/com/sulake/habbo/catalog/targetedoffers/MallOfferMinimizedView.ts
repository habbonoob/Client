import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboMallOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/HabboMallOffer';
import type { OfferController } from '@/com/sulake/habbo/catalog/targetedoffers/OfferController';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { OfferView } from '@/com/sulake/habbo/catalog/targetedoffers/OfferView';

export class MallOfferMinimizedView extends OfferView {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers::MallOfferMinimizedView'); }

    private static readonly IMAGE_DEFAULT_URL: string = "targetedoffers/offer_default_icon.png";

    constructor(param1: OfferController, param2: HabboMallOffer) {
        super(param1, null);
        this._SafeStr_7231 = param2;
        this._window = castGuarded(this._controller.catalog.windowManager.buildFromXML(XML.from(this._controller.catalog.assets.getAssetByName("targeted_offer_minimized_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc4_: ITextWindow = castGuarded(this._window.findChildByName("txt_title"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc4_) {
            _loc4_.text = this.getLocalization(param2.title);
        }
        let _loc3_: string = (asGuarded(this._controller.catalog, isICoreConfiguration)).getProperty("image.library.url");
        castGuarded(this._window.findChildByName("bmp_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc3_ + "targetedoffers/offer_default_icon.png";
        this._window.procedure = this.onInput;
        this._controller.attachExtension(this._window);
    }

    declare private _SafeStr_7231: HabboMallOffer;

    public get window(): IWindow {
        return this._window;
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (!this._controller) {
            return;
        }
        if (param1.type == "WME_DOWN") {
            this._controller.maximizeMallOffer(this._SafeStr_7231);
            param2.name;
        }
    };
}
