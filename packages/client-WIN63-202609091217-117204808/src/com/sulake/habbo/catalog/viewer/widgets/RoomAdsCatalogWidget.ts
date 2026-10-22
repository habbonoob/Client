import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';
import type { CatalogWidgetEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { RoomAdPurchaseInfoEventParser } from '@/com/sulake/habbo/communication/messages/parser/catalog/RoomAdPurchaseInfoEventParser';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { RoomAdPurchaseData } from '@/com/sulake/habbo/catalog/purchase/RoomAdPurchaseData';
import { Offer } from '@/com/sulake/habbo/catalog/viewer/Offer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { SelectProductEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/SelectProductEvent';
import { RoomAdPurchaseInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/catalog/RoomAdPurchaseInfoEvent';
import { RoomEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/RoomEntryData';
import { RoomId } from '@/com/sulake/room/utils/RoomId';

export class RoomAdsCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::RoomAdsCatalogWidget'); }

    declare private _catalog: HabboCatalog;

    private _SafeStr_3605: IMessageEvent = null;

    declare private _name: string;

    declare private _description: string;

    declare private _rooms: any[];

    declare private _isVip: boolean;
    static { (this.prototype as any)._isVip = false; }

    declare private _SafeStr_3234: IDropMenuWindow;

    constructor(param1: IWindowContainer, param2: HabboCatalog) {
        super(param1);
        this._catalog = param2;
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        if (this._catalog == null) {
            return false;
        }
        let _loc4_: IConnection = this._catalog.connection;
        if (this._SafeStr_3605 == null) {
            this._SafeStr_3605 = new RoomAdPurchaseInfoEvent(this.onPurchaseInfoEvent);
            _loc4_.addMessageEvent(this._SafeStr_3605);
        }
        this._catalog.getRoomAdsPurchaseInfo();
        this.window.findChildByName("name_input_text").addEventListener("WE_CHANGE", this.onNameWindowEvent);
        this.window.findChildByName("desc_input_text").addEventListener("WE_CHANGE", this.onDescWindowEvent);
        this.events.addEventListener("PURCHASE", this.onPurchaseConfirmationEvent);
        let _loc2_: RoomAdPurchaseData = this._catalog.roomAdPurchaseData;
        let _loc3_: number = this._catalog.getInteger("room_ad.duration.minutes", 120);
        let _loc1_: number = this.getExtensionMinutes(_loc2_, _loc3_);
        this._catalog.localization.registerParameter("roomad.catalog_text", "duration", String(_loc1_));
        this._catalog.roomEngine.events.addEventListener("REE_INITIALIZED", this.onRoomInitialized);
        this.populateEventCategories();
        return true;
    }

    private getExtensionMinutes(param1: RoomAdPurchaseData, param2: number): number {
        let _loc6_: boolean = this._catalog.getBoolean("roomad.limited_extension");
        if (!_loc6_ || param1 == null || param1.expirationTime == null) {
            return param2;
        }
        let _loc8_: Date = new Date();
        let _loc3_: number = _loc8_.getTime();
        let _loc7_: number = param1.expirationTime.getTime();
        let _loc5_: number = _loc3_ - _loc7_;
        let _loc4_: number = _loc5_ / 60000;
        return _loc4_ + param2 | 0;
    }

    private populateEventCategories(): void {
        if (this.window == null) {
            return;
        }
        this._SafeStr_3234 = asGuarded(this.window.findChildByName("categories_list"), isIDropMenuWindow);
        let _loc2_: any[] = [];
        for (const _loc1_ of this._catalog.navigator.visibleEventCategories ?? []) {
            _loc2_.push("${navigator.searchcode.title.eventcategory__" + _loc1_.categoryId + "}");
        }
        this._SafeStr_3234.populate(_loc2_);
        this._SafeStr_3234.selection = 0;
        this._SafeStr_3234.addEventListener("WE_SELECTED", this.onEventCategoryMenuEvent);
    }

    private onRoomInitialized = (param1: RoomEngineEvent): void => {
        if (param1 == null) {
            return;
        }
        if (!RoomId.isRoomPreviewerId(param1.roomId)) {
            this.setDefaultRoom(param1.roomId, false);
        }
    };

    private setDefaultRoom(param1: number, param2: boolean = false): void {
        let _loc6_: number = 0;
        let _loc3_: RoomEntryData = null;
        let _loc9_: string = null;
        let _loc7_: RoomAdPurchaseData = null;
        if (this.window == null) {
            return;
        }
        let _loc8_: IDropMenuWindow = asGuarded(this.window.findChildByName("room_drop_menu"), isIDropMenuWindow);
        if (this._rooms == null) {
            if (_loc8_.numMenuItems > 0) {
                _loc8_.selection = 0;
            }
            return;
        }
        let _loc5_: number = 0;
        let _loc4_: any[] = [];
        _loc6_ = 0;
        while (_loc6_ < this._rooms.length) {
            _loc3_ = asInstanceOf(this._rooms[_loc6_], RoomEntryData);
            if (param2) {
                if (_loc3_.roomName.length > 25) {
                    _loc9_ = _loc3_.roomName.substr(0, 25) + "...";
                    _loc4_.push(_loc9_);
                } else {
                    _loc4_.push(_loc3_.roomName);
                }
            }
            if (_loc3_.roomId == param1) {
                _loc5_ = _loc6_;
            }
            _loc6_++;
        }
        if (param2) {
            if (_loc4_.length == 0) {
                _loc4_.push(this._catalog.localization.getLocalization("roomad.no.available.room", "roomad.no.available.room"));
            }
            _loc8_.populate(_loc4_);
        }
        let _loc10_: RoomEntryData = asInstanceOf(this._rooms[_loc5_], RoomEntryData);
        if (_loc10_ != null) {
            _loc8_.selection = _loc5_;
            _loc7_ = this._catalog.roomAdPurchaseData;
            if (_loc7_ == null) {
                _loc7_ = new RoomAdPurchaseData();
                this._catalog.roomAdPurchaseData = _loc7_;
            }
            _loc7_.flatId = _loc10_.roomId;
        } else {
            _loc8_.selection = 0;
        }
    }

    private setExtendData(): void {
        let _loc1_: RoomEntryData = null;
        let _loc2_: RoomAdPurchaseData = this._catalog.roomAdPurchaseData;
        if (_loc2_ != null && _loc2_.extended) {
            this.window.findChildByName("name_input_text").caption = _loc2_.name;
            this.window.findChildByName("desc_input_text").caption = _loc2_.description;
            _loc1_ = new RoomEntryData(_loc2_.flatId, _loc2_.roomName, false);
            if (this._rooms != null) {
                this._rooms.push(_loc1_);
            }
            if (this._SafeStr_3234 == null) {
                this._SafeStr_3234 = asGuarded(this.window.findChildByName("categories_list"), isIDropMenuWindow);
            }
            this._SafeStr_3234.selection = _loc2_.categoryId - 1;
        }
    }

    public onPurchaseInfoEvent = (param1: IMessageEvent): void => {
        let _loc5_: RoomAdPurchaseData = null;
        let _loc4_: IWindowContainer = null;
        if (!this.window || Boolean(this.window.disposed)) {
            return;
        }
        let _loc7_: RoomAdPurchaseInfoEvent = param1 instanceof RoomAdPurchaseInfoEvent ? param1 : null;
        let _loc3_: RoomAdPurchaseInfoEventParser = _loc7_.getParser();
        let _loc6_: IDropMenuWindow = asGuarded(this.window.findChildByName("room_drop_menu"), isIDropMenuWindow);
        this._rooms = _loc3_.rooms;
        this._isVip = _loc3_.isVip;
        let _loc8_: number = this._catalog.roomEngine.activeRoomId;
        this.setExtendData();
        this.populateEventCategories();
        this.setDefaultRoom(_loc8_, true);
        let _loc2_: IPurchasableOffer = this.selectedOffer();
        if (_loc2_ != null) {
            this.events.dispatchEvent(new SelectProductEvent(_loc2_));
            _loc5_ = this._catalog.roomAdPurchaseData;
            if (_loc5_ == null) {
                _loc5_ = new RoomAdPurchaseData();
                this._catalog.roomAdPurchaseData = _loc5_;
            }
            _loc5_.offerId = _loc2_.offerId;
            this._catalog.roomAdPurchaseData = _loc5_;
            _loc4_ = asGuarded(this.window.findChildByName("price_container"), isIWindowContainer);
            this._catalog.utils.showPriceInContainer(_loc4_, _loc2_);
        }
    };

    private onPurchaseConfirmationEvent = (param1: CatalogWidgetEvent): void => {
        this._catalog.getRoomAdsPurchaseInfo();
        this.window.findChildByName("name_input_text").caption = "";
        this.window.findChildByName("desc_input_text").caption = "";
        if (this._catalog.roomAdPurchaseData) {
            this._catalog.roomAdPurchaseData.clear();
        }
    };

    private onNameWindowEvent = (param1: WindowEvent): void => {
        let _loc3_: ITextFieldWindow = asGuarded(param1.target, isITextFieldWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: RoomAdPurchaseData = this._catalog.roomAdPurchaseData;
        if (_loc2_ != null) {
            _loc2_.name = _loc3_.text;
        }
    };

    private onDescWindowEvent = (param1: WindowEvent): void => {
        let _loc3_: ITextFieldWindow = asGuarded(param1.target, isITextFieldWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: RoomAdPurchaseData = this._catalog.roomAdPurchaseData;
        if (_loc2_ != null) {
            _loc2_.description = _loc3_.text;
        }
    };

    private onRoomDropMenuEvent(param1: WindowEvent, param2: IWindow): void {
        let _loc5_: number = 0;
        let _loc4_: RoomEntryData = null;
        let _loc6_: RoomAdPurchaseData = null;
        let _loc3_: number = 0;
        let _loc7_: IWindow = null;
        let _loc8_: string = null;
        if (param1.type == "WE_SELECTED" && this._rooms.length > 0) {
            _loc5_ = castGuarded(param2, isIDropMenuWindow, "com.sulake.core.window.components.IDropMenuWindow").selection;
            _loc4_ = asInstanceOf(this._rooms[_loc5_], RoomEntryData);
            _loc6_ = this._catalog.roomAdPurchaseData;
            if (_loc6_) {
                _loc6_.flatId = _loc4_.roomId;
                _loc3_ = this._catalog.getInteger("room_ad.duration.minutes", 120);
                if (_loc4_.roomId == _loc6_.extendedFlatId) {
                    _loc3_ = this.getExtensionMinutes(_loc6_, _loc3_);
                }
                _loc7_ = this.window.findChildByName("ctlg_text_1");
                _loc7_.caption = "${roomad.catalog_text}";
                this._catalog.localization.registerParameter("roomad.catalog_text", "duration", String(_loc3_));
                _loc8_ = this._catalog.localization.getLocalization("roomad.catalog_text");
                _loc7_.caption = _loc8_;
            }
        }
    }

    private onEventCategoryMenuEvent = (param1: WindowEvent): void => {
        let _loc3_: number = 0;
        let _loc5_: number = -1;
        let _loc6_: number = this._SafeStr_3234.selection;
        for (const _loc2_ of this._catalog.navigator.visibleEventCategories ?? []) {
            if (_loc2_.visible) {
                if (_loc6_ == _loc3_) {
                    _loc5_ = _loc2_.categoryId | 0;
                    break;
                }
                _loc3_++;
            }
        }
        let _loc4_: RoomAdPurchaseData = this._catalog.roomAdPurchaseData;
        if (_loc4_) {
            _loc4_.categoryId = _loc5_;
        }
    };

    private selectedOffer(): IPurchasableOffer {
        let _loc3_: number = 0;
        let _loc2_: Offer = null;
        let _loc1_: IPurchasableOffer[] = this.page.offers;
        if (_loc1_ != null && _loc1_) {
            if (_loc1_.length == 1) {
                return _loc1_[0];
            }
            _loc3_ = 0;
            while (_loc3_ < _loc1_.length) {
                _loc2_ = asInstanceOf(_loc1_[_loc3_], Offer);
                if (_loc2_.clubLevel == 2 && this._isVip || _loc2_.clubLevel != 2 && !this._isVip) {
                    return _loc2_;
                }
                _loc3_++;
            }
        }
        return null;
    }

    public override dispose(): void {
        let _loc1_: IConnection = null;
        super.dispose();
        if (this._catalog != null) {
            _loc1_ = this._catalog.connection;
            if (this._SafeStr_3605 != null) {
                _loc1_.removeMessageEvent(this._SafeStr_3605);
                this._SafeStr_3605 = null;
            }
            this._catalog.roomEngine.events.removeEventListener("REE_INITIALIZED", this.onRoomInitialized);
            this._catalog = null;
        }
    }
}
