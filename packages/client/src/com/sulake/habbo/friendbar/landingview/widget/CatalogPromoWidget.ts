import { castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILocalization } from '@/com/sulake/core/localization/ILocalization';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';

export class CatalogPromoWidget implements ILandingViewWidget, ISettingsAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::CatalogPromoWidget'); }

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    declare private _landingView: HabboLandingView;

    declare private _targetCatalogPageName: string;

    declare private _container: IWindowContainer;

    public get container(): IWindow {
        return this._container;
    }

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    protected get xmlAssetName(): string {
        return "catalog_promo";
    }

    public initialize(): void {
        let _loc2_: number = 0;
        this._container = castGuarded(this._landingView.getXmlWindow(this.xmlAssetName), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._targetCatalogPageName = this._landingView.getProperty("landing.view.catalog.promo.target");
        let _loc3_: IStaticBitmapWrapperWindow = castGuarded(this._container.findChildByName("picture"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        _loc3_.assetUri = this._landingView.getProperty("landing.view.catalog.promo.image.uri");
        this._container.findChildByName("open_page_button").addEventListener("WME_CLICK", this.onOpenPageButtonClicked);
        if (this._targetCatalogPageName == "" && _loc3_.assetUri == "") {
            this._container.visible = false;
        } else {
            this._container.visible = true;
        }
        let _loc1_: UtilsMap = new UtilsMap();
        _loc1_.add("catalog_promo_caption", "landing.view.catalog.promo.caption");
        _loc1_.add("catalog_promo_info", "landing.view.catalog.promo.info");
        _loc1_.add("open_page_button", "landing.view.catalog.open.page");
        _loc1_.add("catalog_promo_picture_text", "landing.view.catalog.promo.picture.text");
        _loc1_.add("catalog_promo_title", "landing.view.catalog.promo.title");
        _loc2_ = 0;
        while (_loc2_ < _loc1_.length) {
            this.setCustomLocalization(stringOrNull(_loc1_.getKeys()[_loc2_]), stringOrNull(_loc1_.getValues()[_loc2_]), this._targetCatalogPageName);
            _loc2_++;
        }
    }

    public refresh(): void {
    }

    public dispose(): void {
        if (!this.disposed) {
            this._landingView = null;
            if (this._container != null) {
                this._container.dispose();
                this._container = null;
            }
            this._disposed = true;
        }
    }

    private onOpenPageButtonClicked = (param1: WindowMouseEvent): void => {
        this._landingView.catalog.openCatalogPage(this._targetCatalogPageName);
    };

    private setCustomLocalization(param1: string, param2: string, param3: string): void {
        let _loc5_: IWindow = null;
        let _loc4_: ILocalization = this._landingView.localizationManager.getLocalizationRaw(param2 + "." + param3);
        if (_loc4_ != null) {
            _loc5_ = this._container.findChildByName(param1);
            if (_loc5_ != null) {
                _loc5_.caption = "${" + param2 + "." + param3 + "}";
            }
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }
}
