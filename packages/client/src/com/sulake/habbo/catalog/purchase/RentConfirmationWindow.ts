import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { FurniRentOrBuyoutOfferMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/FurniRentOrBuyoutOfferMessageParser';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FurniRentOrBuyoutOfferMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/FurniRentOrBuyoutOfferMessageEvent';
import { ExtendRentOrBuyoutFurniMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/ExtendRentOrBuyoutFurniMessageComposer';
import { ExtendRentOrBuyoutStripItemMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/ExtendRentOrBuyoutStripItemMessageComposer';
import { GetRentOrBuyoutOfferMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/GetRentOrBuyoutOfferMessageComposer';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RentConfirmationWindow implements IDisposable, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.catalog.purchase::RentConfirmationWindow'); }

    private static readonly MODE_INFOSTAND: number = 1;
    private static readonly MODE_INVENTORY: number = 2;
    private static readonly MODE_CATALOGUE: number = 3;

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
        this._offerMessageEvent = new FurniRentOrBuyoutOfferMessageEvent(this.onFurniRentOrBuyoutOffer);
        this._catalog.connection.addMessageEvent(this._offerMessageEvent);
    }

    declare private _offerMessageEvent: FurniRentOrBuyoutOfferMessageEvent;

    declare private _window: IWindowContainer;

    declare private _isBuyout: boolean;
    static { (this.prototype as any)._isBuyout = false; }

    private _id: number = -1;

    declare private _catalog: HabboCatalog;

    declare private _furniData: IFurnitureData;

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    private _SafeStr_5922: number = -1;

    declare private _SafeStr_6961: number;
    static { (this.prototype as any)._SafeStr_6961 = 0; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get roomEngine(): IRoomEngine {
        return this._catalog.roomEngine;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.close();
        if (this._offerMessageEvent != null) {
            this._catalog.connection.removeMessageEvent(this._offerMessageEvent);
            this._offerMessageEvent = null;
        }
        this._disposed = true;
    }

    public show(param1: IFurnitureData, param2: boolean, param3: number = -1, param4: number = -1, param5: boolean = false): void {
        this.close();
        this._furniData = param1;
        this._SafeStr_5922 = param3;
        this._SafeStr_6961 = param4;
        if (param5) {
            this._mode = 3;
        } else if (this._SafeStr_5922 > -1) {
            this._mode = 1;
        } else {
            this._mode = 2;
        }
        let _loc6_: any = param1.type == "i";
        this._catalog.connection.send(new GetRentOrBuyoutOfferMessageComposer(_loc6_, param1.fullName, param2));
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._window != null && param1 == this._id) {
            castGuarded(this._window.findChildByName("image"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow").bitmap = param2;
        }
    }

    public imageFailed(param1: number): void {
    }

    private onFurniRentOrBuyoutOffer = (param1: FurniRentOrBuyoutOfferMessageEvent): void => {
        let _loc3_: ImageResult = null;
        if (this._furniData == null) {
            return;
        }
        let _loc2_: FurniRentOrBuyoutOfferMessageParser = param1.getParser();
        if (this._furniData.fullName != _loc2_.furniTypeName) {
            return;
        }
        this._isBuyout = _loc2_.buyout;
        if (this._catalog.getPurse().credits < _loc2_.priceInCredits) {
            this._catalog.showNotEnoughCreditsAlert();
            return;
        }
        if (this._catalog.getPurse().getActivityPointsForType(_loc2_.activityPointType) < _loc2_.priceInActivityPoints) {
            this._catalog.showNotEnoughActivityPointsAlert(_loc2_.activityPointType);
            return;
        }
        this._window = asGuarded(this._catalog.windowManager.buildFromXML(asInstanceOf(this._catalog.assets.getAssetByName("rent_confirmation").content, XML)), isIWindowContainer);
        if (_loc2_.priceInCredits > 0) {
            this._window.findChildByName("price_amount").caption = _loc2_.priceInCredits.toString();
            castGuarded(this._window.findChildByName("price_type"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = "toolbar_credit_icon_0";
        } else {
            this._window.findChildByName("price_amount").caption = _loc2_.priceInActivityPoints.toString();
        }
        if (this._isBuyout) {
            this._window.caption = "${rent.confirmation.title.buyout}";
            this._window.findChildByName("rental_description").visible = false;
            this._window.findChildByName("ok_button").caption = "${catalog.purchase_confirmation.buy}";
        }
        this._window.findChildByName("furni_name").caption = this._furniData.localizedName;
        castGuarded(this._window.findChildByName("content_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").arrangeListItems();
        this._window.center();
        this._window.procedure = this.windowProcedure;
        switch (this._furniData.type) {
            case "s":
                _loc3_ = this.roomEngine.getFurnitureImage(this._furniData.id, new Vector3d(90, 0, 0), 64, this);
                break;
            case "i":
                _loc3_ = this.roomEngine.getWallItemImage(this._furniData.id, new Vector3d(90, 0, 0), 64, this);
        }
        castGuarded(this._window.findChildByName("image"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow").bitmap = _loc3_.data;
        this._id = _loc3_.id;
    };

    private windowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK" || this._window == null) {
            return;
        }
        switch (param2.name) {
            case "cancel_button":
            case "header_button_close":
                this.close();
                break;
            case "ok_button":
                switch (this._mode - 1) {
                    case 0:
                        this._catalog.connection.send(new ExtendRentOrBuyoutFurniMessageComposer(this._furniData.type == "i", this._SafeStr_5922, this._isBuyout));
                        break;
                    case 1:
                        this._catalog.connection.send(new ExtendRentOrBuyoutStripItemMessageComposer(this._SafeStr_6961, this._isBuyout));
                        break;
                    case 2:
                        this._catalog.purchaseOffer(this._furniData.rentOfferId);
                }
                this.close();
        }
    };

    private close(): void {
        if (this._window == null) {
            return;
        }
        this._window.dispose();
        this._window = null;
        this._id = -1;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
