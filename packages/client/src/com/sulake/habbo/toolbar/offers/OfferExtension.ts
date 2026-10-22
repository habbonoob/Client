import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IOfferCenter } from '@/com/sulake/habbo/catalog/offers/IOfferCenter';
import type { IOfferExtension } from '@/com/sulake/habbo/catalog/offers/IOfferExtension';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class OfferExtension implements IOfferExtension, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.offers::OfferExtension'); }

    constructor(param1: HabboToolbar, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboCatalog) {
        this._toolbar = param1;
        this._window = asGuarded(param2.buildFromXML(asInstanceOf(param3.getAssetByName("offer_extension_xml").content, XML)), isIWindowContainer);
        this._window.procedure = this.windowProcedure;
        this._window.visible = false;
        this._SafeStr_2221 = asGuarded(this._window.findChildByName("list"), isIItemListWindow);
        this._offerCenter = param4.getOfferCenter(this);
        param1.extensionView.attachExtension("video_offers", this.window, 8);
        this.refresh();
    }

    declare private _toolbar: HabboToolbar;

    declare private _offerCenter: IOfferCenter;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._SafeStr_2221 = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._toolbar = null;
        this._disposed = true;
    }

    public indicateRewards(): void {
        if (this._window != null) {
            this._window.visible = true;
            this._window.findChildByName("check_rewards").visible = true;
            this.refresh();
        }
    }

    public indicateVideoAvailable(param1: boolean): void {
        let _loc2_: IWindow = null;
        if (this._window != null) {
            this._window.visible ||= param1;
            _loc2_ = this._window.findChildByName("start_video");
            _loc2_.visible = param1;
            if (this._offerCenter.showingVideo) {
                _loc2_.disable();
                _loc2_.color = 10066329;
            } else {
                _loc2_.enable();
                _loc2_.color = 12932417;
            }
            this.refresh();
        }
    }

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "start_video":
                this._offerCenter.showVideo();
                break;
            case "check_rewards":
                this._offerCenter.showRewards();
        }
    };

    private refresh(): void {
        this._SafeStr_2221.arrangeListItems();
        this._window.visible = this._SafeStr_2221.getListItemAt(0).visible || this._SafeStr_2221.getListItemAt(1).visible;
        this._toolbar.extensionView.refreshItemWindow();
    }

    get [IDisposable](): true {
        return true;
    }
}
