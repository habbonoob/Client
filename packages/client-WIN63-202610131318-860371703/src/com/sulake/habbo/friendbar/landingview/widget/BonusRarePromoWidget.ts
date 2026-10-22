import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import type { CommonWidgetSettings } from '@/com/sulake/habbo/friendbar/landingview/layout/CommonWidgetSettings';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BonusRareInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/BonusRareInfoMessageEvent';
import { GetBonusRareInfoMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetBonusRareInfoMessageComposer';
import { WidgetContainerLayout } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { ISettingsAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISettingsAwareWidget';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';

export class BonusRarePromoWidget implements ILandingViewWidget, IProductDataListener, ISettingsAwareWidget, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::BonusRarePromoWidget'); }

    declare private _landingView: HabboLandingView;

    declare private _container: IWindowContainer;

    declare private _productType: string;

    private _productClassId: number = -1;

    declare private _totalCoinsForBonus: number;
    static { (this.prototype as any)._totalCoinsForBonus = 0; }

    declare private _coinsStillRequiredToBuy: number;
    static { (this.prototype as any)._coinsStillRequiredToBuy = 0; }

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    public dispose(): void {
        if (!this.disposed) {
            this._landingView.roomEngine.events.removeEventListener("REE_ENGINE_INITIALIZED", this.onRoomEngineInitialized);
            this._landingView.communicationManager.removeHabboConnectionMessageEvent(new BonusRareInfoMessageEvent(this.onBonusRareInfoMessage));
            this._landingView = null;
            this._container = null;
        }
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("bonus_rare_promo"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._container.findChildByName("buy_button").procedure = this.onOpenCreditsPageButton;
        this._container.visible = false;
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new BonusRareInfoMessageEvent(this.onBonusRareInfoMessage));
        this._landingView.roomEngine.events.addEventListener("REE_ENGINE_INITIALIZED", this.onRoomEngineInitialized);
        this.requestBonusRareInfo();
    }

    private requestBonusRareInfo(): void {
        this._landingView.communicationManager.connection.send(new GetBonusRareInfoMessageComposer());
    }

    public refresh(): void {
        this.requestBonusRareInfo();
    }

    public get container(): IWindow {
        return this._container;
    }

    public productDataReady(): void {
        this.refreshContent();
    }

    public imageReady(param1: number, param2: BitmapData): void {
        this.refreshContent();
    }

    public imageFailed(param1: number): void {
    }

    private onRoomEngineInitialized = (param1: RoomEngineEvent): void => {
        this.refreshContent();
    };

    private refreshContent(): void {
        if (this.disposed) {
            return;
        }
        this._container.visible = this._productClassId != -1;
        let _loc1_: IProductData = this._landingView.getProductData(this._productType, this);
        if (_loc1_ != null) {
            castGuarded(this._container.findChildByName("promo_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this._landingView.getProperty("landing.view.bonus.rare.image.uri");
            this._container.findChildByName("header").caption = this._landingView.localizationManager.getLocalizationWithParams("landing.view.bonus.rare.header", "", "rarename", _loc1_.name, "amount", this._totalCoinsForBonus);
            this._container.findChildByName("status").caption = this._landingView.localizationManager.getLocalizationWithParams("landing.view.bonus.rare.status", "", "amount", this._coinsStillRequiredToBuy, "total", this._totalCoinsForBonus);
            this.setProgress(this._totalCoinsForBonus - this._coinsStillRequiredToBuy, this._totalCoinsForBonus);
        }
    }

    private onBonusRareInfoMessage = (param1: BonusRareInfoMessageEvent): void => {
        this._productType = param1.getParser().productType;
        this._productClassId = param1.getParser().productClassId;
        this._totalCoinsForBonus = param1.getParser().totalCoinsForBonus;
        this._coinsStillRequiredToBuy = param1.getParser().coinsStillRequiredToBuy;
        this.refreshContent();
    };

    private onOpenCreditsPageButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.tracking.trackGoogle("landingView", "click_bonusRarePromoOpenCreditsPage");
            this._landingView.catalog.openCreditsHabblet();
        }
    };

    public set settings(param1: CommonWidgetSettings) {
        WidgetContainerLayout.applyCommonWidgetSettings(this._container, param1);
    }

    private setProgress(param1: number, param2: number): void {
        let _loc5_: number = this._container.findChildByName("bar_a_bkg").width;
        let _loc4_: number = this._container.findChildByName("bar_a_bkg").x;
        let _loc3_: number = param1 / param2 * _loc5_ | 0;
        this._container.findChildByName("bar_a_c").width = _loc3_;
        this._container.findChildByName("bar_a_r").x = _loc3_ + _loc4_;
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISettingsAwareWidget](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
