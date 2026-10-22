import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PromoArticleData } from '@/com/sulake/habbo/communication/messages/incoming/landingview/PromoArticleData';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { PromoArticlesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/landingview/PromoArticlesMessageEvent';
import { GetPromoArticlesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/landingview/GetPromoArticlesMessageComposer';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class PromoArticleWidget implements ILandingViewWidget, ISettingsAwareWidget, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::PromoArticleWidget'); }

    private static readonly REFRESH_PERIOD_IN_MILLIS: number = 600000;
    private static readonly FADE_LENGTH: number = 500;
    private static readonly MAX_ARTICLES: number = 10;

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    private _SafeStr_2845: number = 0;
    private _articles: any[] = [];

    declare private _lastRequestTime: Date;

    declare private _SafeStr_3614: IMessageEvent;

    private _SafeStr_3529: number = 0;

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("promo_article"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._container.procedure = this.onMouse;
        this._SafeStr_3614 = new PromoArticlesMessageEvent(this.onPromoArticles);
        this._landingView.communicationManager.addHabboConnectionMessageEvent(this._SafeStr_3614);
    }

    public refresh(): void {
        if (this._lastRequestTime == null || this._lastRequestTime.getTime() + 600000 < new Date().getTime()) {
            this._landingView.send(new GetPromoArticlesMessageComposer());
            this._lastRequestTime = new Date();
        } else {
            this.goToArticle(this._SafeStr_2845);
        }
    }

    public get container(): IWindow {
        return this._container;
    }

    public dispose(): void {
        if (this._SafeStr_3614 && this._landingView) {
            this._landingView.communicationManager.removeHabboConnectionMessageEvent(this._SafeStr_3614);
            this._SafeStr_3614.dispose();
            this._SafeStr_3614 = null;
        }
        if (this._container) {
            this._container.dispose();
            this._container = null;
        }
        this._landingView = null;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    private refreshContent(): void {
        this.setArticleContent();
        this.setNavigationDisks();
    }

    private setArticleContent(): void {
        let _loc1_: PromoArticleData = this._articles[this._SafeStr_2845];
        if (_loc1_) {
            this._container.findChildByName("promo_title").caption = _loc1_.title;
            this._container.findChildByName("promo_text").caption = _loc1_.bodyText;
            this._container.findChildByName("button").visible = !(_loc1_.linkType == 2 || _loc1_.linkType == 0 && _loc1_.linkContent == "");
            this._container.findChildByName("button").immediateClickMode = true;
            this._container.findChildByName("button").caption = _loc1_.buttonText;
            this._container.findChildByName("promo_image").visible = _loc1_.imageUrl != "";
            try {
                castGuarded(this._container.findChildByName("promo_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "${image.library.url}" + _loc1_.imageUrl;
            } catch (e) {
                this._landingView.context.warning("Missing image url for promo article with title: " + _loc1_.title);
            }
        }
    }

    private setNavigationDisks(): void {
        let _loc3_: number = 0;
        let _loc4_: IRegionWindow = null;
        let _loc2_: IStaticBitmapWrapperWindow = null;
        let _loc1_: IWindowContainer = castGuarded(this._container.findChildByName("navigation"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_ = 0;
        while (_loc3_ < 10) {
            _loc4_ = castGuarded(_loc1_.getChildAt(_loc3_), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
            if (this._articles.length > _loc3_) {
                _loc2_ = castGuarded(_loc4_.getChildAt(0), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
                _loc2_.assetUri = "progress_disk_flat_" + (this._SafeStr_2845 == _loc3_ ? "on" : "off");
                _loc4_.visible = true;
            } else {
                _loc4_.visible = false;
            }
            _loc3_++;
        }
    }

    private goToArticle(param1: number): void {
        let _loc2_: boolean = param1 == this._SafeStr_2845;
        if (this._articles.length == 0) {
            return;
        }
        if (param1 < 0) {
            this._SafeStr_2845 = this._articles.length - 1;
        } else if (param1 >= this._articles.length) {
            this._SafeStr_2845 = 0;
        } else {
            this._SafeStr_2845 = param1;
        }
        if (_loc2_) {
            this.refreshContent();
        } else {
            this.startFade();
        }
    }

    private startFade(): void {
        this._SafeStr_3529 = 0;
        this._landingView.registerUpdateReceiver(this, 1);
    }

    private stopFade(): void {
        this._landingView.removeUpdateReceiver(this);
        this.setBlend(1);
    }

    private followLink(): void {
        let _loc1_: PromoArticleData = this._articles[this._SafeStr_2845];
        switch (_loc1_.linkType) {
            case 0:
                HabboWebTools.openWebPage(_loc1_.linkContent);
                break;
            case 1:
                this._landingView.context.createLinkEvent(_loc1_.linkContent);
        }
    }

    private onMouse = (param1: WindowEvent, param2: IWindow): void => {
        if (param2.name == "article_navigation") {
            if (param1.type == "WME_OVER") {
                this.hoverOverNavigation(param2, true);
            } else if (param1.type == "WME_OUT" && param2.id != this._SafeStr_2845) {
                this.hoverOverNavigation(param2, false);
            }
        }
        if (param1.type != "WME_CLICK") {
            return;
        }
        switch (param2.name) {
            case "button":
                this.followLink();
                break;
            case "article_navigation":
                this.goToArticle(param2.id);
        }
    };

    private hoverOverNavigation(param1: IWindow, param2: boolean): void {
        let _loc3_: IStaticBitmapWrapperWindow = castGuarded(castGuarded(param1, isIWindowContainer, "com.sulake.core.window.IWindowContainer").getChildAt(0), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        if (!_loc3_) {
            return;
        }
        _loc3_.assetUri = "progress_disk_flat_" + (param2 ? "on" : "off");
    }

    private onPromoArticles = (param1: PromoArticlesMessageEvent): void => {
        this._articles = [];
        for (const _loc2_ of param1.getParser().articles ?? []) {
            this._articles.push(_loc2_);
        }
        this.refresh();
    };

    private setBlend(param1: number): void {
        this._container.findChildByName("promo_title").blend = param1;
        this._container.findChildByName("promo_text").blend = param1;
        this._container.findChildByName("button").blend = param1;
        this._container.findChildByName("promo_image").blend = param1;
    }

    public update(param1: number): void {
        let _loc2_: number = this._SafeStr_3529 + param1 >>> 0;
        if (this._SafeStr_3529 < 500) {
            this.setBlend(Math.max(0, 1 - this._SafeStr_3529 / 500));
            if (_loc2_ >= 500) {
                this.refreshContent();
            }
        } else {
            this.setBlend(Math.min(1, (this._SafeStr_3529 - 500) / 500));
        }
        this._SafeStr_3529 = _loc2_;
        if (this._SafeStr_3529 >= 500 * 2) {
            this.stopFade();
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
