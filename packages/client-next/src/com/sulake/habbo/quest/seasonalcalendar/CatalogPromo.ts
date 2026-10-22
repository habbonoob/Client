import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CatalogPageMessageProductData } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPageMessageProductData';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { MainWindow } from '@/com/sulake/habbo/quest/seasonalcalendar/MainWindow';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IProductData } from '@/com/sulake/habbo/session/product/IProductData';
import type { IProductDataListener } from '@/com/sulake/habbo/session/product/IProductDataListener';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogPublishedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/CatalogPublishedMessageEvent';
import { SeasonalCalendarDailyOfferMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/SeasonalCalendarDailyOfferMessageEvent';
import { GetSeasonalCalendarDailyOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetSeasonalCalendarDailyOfferMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class CatalogPromo implements IDisposable, IGetImageListener, IProductDataListener {
    static { registerClassName(this, 'com.sulake.habbo.quest.seasonalcalendar::CatalogPromo'); }

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IWindowContainer;

    declare private _connection: IConnection;

    declare private _SafeStr_2133: MainWindow;

    private _productData: CatalogPageMessageProductData = null;
    private _offerId: number = -1;
    private _pageId: number = -1;
    private _SafeStr_5539: SeasonalCalendarDailyOfferMessageEvent = null;
    private _SafeStr_3983: IMessageEvent = null;
    private _SafeStr_4160: IMessageEvent = null;

    constructor(param1: HabboQuestEngine, param2: MainWindow) {
        this._questEngine = param1;
        this._SafeStr_2133 = param2;
    }

    public dispose(): void {
        if (this._connection) {
            if (this._SafeStr_3983) {
                this._connection.removeMessageEvent(this._SafeStr_3983);
                this._SafeStr_3983 = null;
            }
            if (this._SafeStr_4160) {
                this._connection.removeMessageEvent(this._SafeStr_4160);
                this._SafeStr_4160 = null;
            }
            this._connection = null;
        }
        this._questEngine = null;
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public onActivityPoints(param1: number, param2: number): void {
        if (param1 == this.getActivityPointType()) {
            this._questEngine.localization.registerParameter("quests.seasonalcalendar.promo.balance", "amount", "" + param2);
            if (this._window != null) {
                this.refresh();
            }
        }
    }

    private getActivityPointType(): number {
        let _loc1_: string = this._questEngine.configuration.getProperty("seasonalQuestCalendar.currency");
        return isNaN(Number(_loc1_)) ? 0 : Number(_loc1_) | 0;
    }

    public prepare(param1: IFrameWindow): void {
        this._window = castGuarded(param1.findChildByName("catalog_promo_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.findChildByName("buy_button").disable();
        this._window.findChildByName("buy_button").procedure = this.onBuyButton;
        this._connection = this._questEngine.communication.connection;
        if (this._connection != null) {
            this._SafeStr_3983 = new SeasonalCalendarDailyOfferMessageEvent(this.onDailyOfferMessage);
            this._SafeStr_4160 = new CatalogPublishedMessageEvent(this.onCatalogPublished);
            this._connection.addMessageEvent(this._SafeStr_3983);
            this._connection.addMessageEvent(this._SafeStr_4160);
            this._connection.send(new GetSeasonalCalendarDailyOfferMessageComposer());
        }
    }

    public refresh(): void {
        let _loc5_: string = null;
        let _loc2_: ImageResult = null;
        let _loc4_: ITextWindow = castGuarded(this._window.findChildByName("your_balance_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc1_: IWindowContainer = castGuarded(this._window.findChildByName("currency_icon_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc1_.x = _loc4_.x + _loc4_.width;
        Util.hideChildren(_loc1_);
        let _loc3_: IWindow = _loc1_.findChildByName("currency_icon_" + this.getActivityPointType());
        if (_loc3_ != null) {
            _loc3_.visible = true;
        }
        if (this._productData != null) {
            _loc5_ = null;
            _loc2_ = null;
            if (this._productData.productType == "i") {
                _loc2_ = this._questEngine.roomEngine.getWallItemImage(this._productData.furniClassId, new Vector3d(90, 0, 0), 64, this, 0, this._productData.extraParam);
            } else if (this._productData.productType == "s") {
                _loc2_ = this._questEngine.roomEngine.getFurnitureImage(this._productData.furniClassId, new Vector3d(90, 0, 0), 64, this);
            }
            if (_loc2_ != null && _loc2_.data != null) {
                this.setPromoFurniImage(_loc2_.data);
            }
        }
    }

    public imageReady(param1: number, param2: BitmapData): void {
        this.setPromoFurniImage(param2);
    }

    public imageFailed(param1: number): void {
    }

    private onBuyButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            Logger.log("Buy button clicked");
            if (this._offerId != -1) {
                this._questEngine.catalog.openCatalogPageById(this._pageId, this._offerId, "NORMAL");
            }
        }
    };

    private onDailyOfferMessage = (param1: SeasonalCalendarDailyOfferMessageEvent): void => {
        this._window.findChildByName("buy_button").enable();
        let _loc2_: IProductData = this._questEngine.sessionDataManager.getProductData(param1.offer.localizationId);
        if (_loc2_ != null) {
            castGuarded(this._window.findChildByName("promo_info"), isITextWindow, "com.sulake.core.window.components.ITextWindow").text = _loc2_.name;
            this._pageId = param1.pageId;
            this._offerId = param1.offer.offerId;
            if (param1.offer.products.length > 0) {
                this._productData = param1.offer.products[0];
                this.refresh();
            }
        } else if (this._SafeStr_5539 == null) {
            this._SafeStr_5539 = param1;
            this._questEngine.sessionDataManager.addProductsReadyEventListener(this);
        }
    };

    public productDataReady(): void {
        this.onDailyOfferMessage(this._SafeStr_5539);
    }

    private setPromoFurniImage(param1: BitmapData): void {
        let _loc5_: IBitmapWrapperWindow = castGuarded(this._window.findChildByName("furni_preview"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        let _loc2_: BitmapData = new BitmapData(_loc5_.width, _loc5_.height, true, 0);
        let _loc3_: Rectangle = param1.rect;
        if (_loc3_.width > _loc2_.rect.width) {
            _loc3_.x = (_loc3_.width - _loc2_.rect.width) / 2;
            _loc3_.width = _loc2_.rect.width;
        }
        if (_loc3_.height > _loc2_.rect.height) {
            _loc3_.y = (_loc3_.height - _loc2_.rect.height) / 2;
            _loc3_.height = _loc2_.rect.height;
        }
        let _loc4_: Point = new Point(0, 0);
        if (_loc2_.rect.width > _loc3_.width) {
            _loc4_.x = (_loc2_.rect.width - _loc3_.width) / 2;
        }
        if (_loc2_.rect.height > _loc3_.height) {
            _loc4_.y = (_loc2_.rect.height - _loc3_.height) / 2;
        }
        _loc2_.copyPixels(param1, _loc3_, _loc4_);
        _loc5_.bitmap = _loc2_;
    }

    private onCatalogPublished = (param1: IMessageEvent): void => {
        if (this._connection != null) {
            this._connection.send(new GetSeasonalCalendarDailyOfferMessageComposer());
        }
    };

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
