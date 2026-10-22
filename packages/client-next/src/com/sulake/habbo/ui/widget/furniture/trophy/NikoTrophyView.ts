import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ITrophyView } from '@/com/sulake/habbo/ui/widget/furniture/trophy/ITrophyView';
import type { TrophyFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/trophy/TrophyFurniWidget';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class NikoTrophyView implements ITrophyView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.trophy::NikoTrophyView'); }

    declare private _viewType: number;
    static { (this.prototype as any)._viewType = 0; }

    declare private _widget: TrophyFurniWidget;

    declare private _window: IWindowContainer;

    constructor(param1: TrophyFurniWidget, param2: number) {
        this._widget = param1;
        this._viewType = param2;
    }

    public dispose(): void {
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        this._widget = null;
    }

    public showInterface(): boolean {
        let _loc2_: IWindow = null;
        let _loc4_: ITextWindow = null;
        let _loc6_: ITextLinkWindow = null;
        let _loc3_: ITextWindow = null;
        let _loc7_: IStaticBitmapWrapperWindow = null;
        let _loc5_: any = null;
        let _loc8_: IAsset = this._widget.assets.getAssetByName("niko_trophy");
        let _loc1_: XmlAsset = castTo(_loc8_, XmlAsset);
        if (_loc1_ == null) {
            return false;
        }
        if (this._window == null) {
            this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
        }
        this._window.center();
        _loc2_ = this._window.findChildByName("header_button_close");
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_CLICK", this.onCloseElem);
        }
        _loc4_ = asGuarded(this._window.findChildByName("html_textbox"), isITextWindow);
        if (_loc4_ != null) {
            switch (this._viewType - 10) {
                case 0:
                    _loc4_.text = this._widget.localizations.getLocalization("niko.trophy.description.silver");
                    break;
                case 10:
                    _loc4_.text = this._widget.localizations.getLocalization("niko.trophy.description.gold");
            }
        }
        _loc6_ = asGuarded(this._window.findChildByName("store_link"), isITextLinkWindow);
        if (_loc6_ != null) {
            _loc6_.addEventListener("WME_CLICK", this.onAppstoreLink);
        }
        _loc3_ = asGuarded(this._window.findChildByName("date"), isITextWindow);
        if (_loc3_ != null) {
            this._widget.localizations.registerParameter("trophy.niko.date", "date", this._widget.date);
            _loc3_.text = this._widget.localizations.getLocalization("trophy.niko.date");
        }
        _loc7_ = asGuarded(this._window.findChildByName("preview_image"), isIStaticBitmapWrapperWindow);
        if (_loc7_ != null) {
            if (this._viewType == 20) {
                _loc7_.assetUri = "${image.library.url}niko/niko_trophy_gold.png";
            } else {
                _loc7_.assetUri = "${image.library.url}niko/niko_trophy_silver.png";
            }
        }
        _loc7_ = asGuarded(this._window.findChildByName("store_image"), isIStaticBitmapWrapperWindow);
        if (_loc7_ != null) {
            _loc7_.assetUri = "${image.library.url}niko/" + this._widget.configuration.getProperty("niko.trophy.appstore.image") + ".png";
        }
        let _loc9_: IRegionWindow = asGuarded(this._window.findChildByName("appstore_region"), isIRegionWindow);
        if (_loc9_) {
            _loc9_.addEventListener("WME_CLICK", this.onAppstoreLink);
        }
        return true;
    }

    public disposeInterface(): void {
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private onAppstoreLink = (param1: WindowMouseEvent): void => {
        let _loc2_: string = this._widget.configuration.getProperty("niko.appstore.link.url");
        HabboWebTools.openWebPage(_loc2_, "habboMain");
    };

    private onCloseElem = (param1: WindowMouseEvent): void => {
        this.disposeInterface();
    };
}
