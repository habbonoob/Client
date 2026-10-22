import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import type { ICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogPageWithEarliestExpiryMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageWithEarliestExpiryMessageEvent';
import { GetCatalogPageWithEarliestExpiryMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetCatalogPageWithEarliestExpiryMessageComposer';
import { CatalogPageWithEarliestExpiryMessageParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/CatalogPageWithEarliestExpiryMessageParser';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';
import { isICountdownWidget } from '@/com/sulake/habbo/window/widgets/ICountdownWidget';

export class ExpiringCatalogPageSmallWidget implements ILandingViewWidget, ISettingsAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::ExpiringCatalogPageSmallWidget'); }

    private static readonly REFRESH_PERIOD_IN_MILLIS: number = 30000;

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    declare private _landingView: HabboLandingView;

    private _pageName: string = "";

    declare private _lastRequestTime: Date;

    declare private _secondsToExpiry: number;
    static { (this.prototype as any)._secondsToExpiry = 0; }

    declare private _container: IWindowContainer;

    public get container(): IWindow {
        return this._container;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    public dispose(): void {
        this._landingView = null;
        this._container = null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("expiring_catalog_page_small"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._container.findChildByName("open_catalog_button").procedure = this.onOpenCatalogButton;
        this._container.visible = false;
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new CatalogPageWithEarliestExpiryMessageEvent(this.onCatalogPage));
    }

    public refresh(): void {
        if (this._lastRequestTime == null || this._lastRequestTime.getTime() + 30000 < new Date().getTime()) {
            this._landingView.send(new GetCatalogPageWithEarliestExpiryMessageComposer());
            this._lastRequestTime = new Date();
        }
    }

    private refreshContent(): void {
        if (this._pageName == "") {
            this._container.visible = false;
            return;
        }
        this._container.visible = true;
        this._container.findChildByName("page_header_txt").caption = this.getText("landing.view.pageexpiry.page." + this._pageName + ".header");
        this._container.findChildByName("page_desc_txt").caption = this.getText("landing.view.pageexpiry.page." + this._pageName + ".desc");
        let _loc1_: IStaticBitmapWrapperWindow = castGuarded(this._container.findChildByName("promo_bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        _loc1_.assetUri = "${image.library.url}reception/catalog_teaser_" + this._pageName + ".png";
        this.refreshTimer();
    }

    private getText(param1: string): string {
        return "${" + param1 + "}";
    }

    private onOpenCatalogButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.catalog.openCatalogPage(this._pageName);
            this._landingView.tracking.trackGoogle("landingView", "click_goToExpiringCatalogPage");
        }
    };

    private refreshTimer(): void {
        let _loc1_: IWidgetWindow = castGuarded(this._container.findChildByName("countdown_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc2_: ICountdownWidget = castGuarded(_loc1_.widget, isICountdownWidget, "com.sulake.habbo.window.widgets.ICountdownWidget");
        _loc2_.seconds = this._secondsToExpiry;
    }

    private onCatalogPage = (param1: IMessageEvent): void => {
        let _loc2_: CatalogPageWithEarliestExpiryMessageParser = castTo(param1.parser, CatalogPageWithEarliestExpiryMessageParser);
        this._pageName = _loc2_.pageName;
        this._secondsToExpiry = _loc2_.secondsToExpiry;
        this.refreshContent();
    };

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }
}
