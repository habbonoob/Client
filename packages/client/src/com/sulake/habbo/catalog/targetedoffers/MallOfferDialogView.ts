import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboMallOffer } from '@/com/sulake/habbo/catalog/targetedoffers/data/HabboMallOffer';
import type { OfferController } from '@/com/sulake/habbo/catalog/targetedoffers/OfferController';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class MallOfferDialogView {
    static { registerClassName(this, 'com.sulake.habbo.catalog.targetedoffers::MallOfferDialogView'); }

    constructor(param1: OfferController, param2: HabboMallOffer) {
        let _loc3_: string = null;
        this._controller = param1;
        this._offer = param2;
        this._window = castGuarded(this._controller.catalog.windowManager.buildFromXML(XML.from(this._controller.catalog.assets.getAssetByName("targeted_offer_habbomall_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        castGuarded(this._window, isIFrameWindow, "com.sulake.core.window.components.IFrameWindow").title.text = this.getLocalization(this._offer.title);
        castGuarded(this._window.findChildByName("txt_title"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = this.getLocalization(this._offer.title);
        if (param2.imageUrl && param2.imageUrl.length > 0) {
            _loc3_ = (asGuarded(this._controller.catalog, isICoreConfiguration)).getProperty("image.library.url");
            castGuarded(this._window.findChildByName("bmp_illustration"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = _loc3_ + param2.imageUrl;
        }
        this._window.procedure = this.onInput;
        this._window.center();
    }

    declare private _controller: OfferController;

    declare private _window: IWindowContainer;

    declare private _offer: HabboMallOffer;

    public dispose(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private onInput = (param1: WindowEvent, param2: IWindow): void => {
        if (!this._controller || !this._offer) {
            return;
        }
        if (param1.type == "WME_DOWN") {
            switch (param2.name) {
                case "header_button_close":
                    this._controller.onHabboMallOfferClosed(this._offer);
                    break;
                case "btn_buy":
                    this._controller.onHabboMallOfferOpened(this._offer);
            }
        }
    };

    private getLocalization(param1: string, param2: string = null): string {
        return this._controller.catalog.localization.getLocalization(param1, param2 || param1);
    }
}
