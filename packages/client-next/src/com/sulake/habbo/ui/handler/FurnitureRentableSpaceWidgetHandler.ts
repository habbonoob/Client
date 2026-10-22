import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RentableSpaceRentFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RentableSpaceRentFailedMessageParser';
import type { RentableSpaceStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RentableSpaceStatusMessageParser';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RentableSpaceDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/rentablespace/RentableSpaceDisplayWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RentableSpaceRentFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RentableSpaceRentFailedMessageEvent';
import { RentableSpaceRentOkMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RentableSpaceRentOkMessageEvent';
import { RentableSpaceStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RentableSpaceStatusMessageEvent';
import { RentableSpaceCancelRentMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/RentableSpaceCancelRentMessageComposer';
import { RentableSpaceRentMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/RentableSpaceRentMessageComposer';
import { RentableSpaceStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/RentableSpaceStatusMessageComposer';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureRentableSpaceWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureRentableSpaceWidgetHandler'); }

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _widget: RentableSpaceDisplayWidget;

    declare private _SafeStr_4081: RentableSpaceStatusMessageEvent;

    declare private _SafeStr_3958: RentableSpaceRentOkMessageEvent;

    declare private _SafeStr_3945: RentableSpaceRentFailedMessageEvent;

    constructor() {
    }

    public get type(): string {
        return "RWE_RENTABLESPACE";
    }

    public set widget(param1: RentableSpaceDisplayWidget) {
        this._widget = param1;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        this._SafeStr_4081 = new RentableSpaceStatusMessageEvent(this.onRentableSpaceStatusMessage);
        this._container.connection.addMessageEvent(this._SafeStr_4081);
        this._SafeStr_3958 = new RentableSpaceRentOkMessageEvent(this.onRentableSpaceRentOkMessage);
        this._container.connection.addMessageEvent(this._SafeStr_3958);
        this._SafeStr_3945 = new RentableSpaceRentFailedMessageEvent(this.onRentableSpaceRentFailedMessage);
        this._container.connection.addMessageEvent(this._SafeStr_3945);
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processEvent(param1: Event): void {
        if (this._container.roomEngine == null) {
            return;
        }
        let _loc3_: RoomEngineToWidgetEvent = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IRoomObject = this._container.roomEngine.getRoomObject(_loc3_.roomId, _loc3_.objectId, _loc3_.category);
        switch (param1.type) {
            case "RETWE_OPEN_WIDGET":
                if (_loc2_ != null) {
                    this._widget.show(_loc2_);
                }
                break;
            case "RETWE_CLOSE_WIDGET":
                this._widget.hide(_loc2_);
        }
    }

    public update(): void {
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_4081 != null) {
            this._container.connection.removeMessageEvent(this._SafeStr_4081);
            this._SafeStr_4081 = null;
        }
        if (this._SafeStr_3958 != null) {
            this._container.connection.removeMessageEvent(this._SafeStr_3958);
            this._SafeStr_3958 = null;
        }
        if (this._SafeStr_3945 != null) {
            this._container.connection.removeMessageEvent(this._SafeStr_3945);
            this._SafeStr_3945 = null;
        }
        this._container = null;
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    public onRentableSpaceRentOkMessage = (param1: RentableSpaceRentOkMessageEvent): void => {
        this._widget.updateWidgetState();
    };

    public onRentableSpaceRentFailedMessage = (param1: RentableSpaceRentFailedMessageEvent): void => {
        let _loc2_: RentableSpaceRentFailedMessageParser = param1.getParser();
        this._widget.showErrorView(_loc2_.reason);
    };

    public onRentableSpaceStatusMessage = (param1: RentableSpaceStatusMessageEvent): void => {
        let _loc2_: RentableSpaceStatusMessageParser = param1.getParser();
        this._widget.populateRentInfo(_loc2_.rented, _loc2_.canRent, _loc2_.canRentErrorCode, _loc2_.renterId, _loc2_.renterName, _loc2_.timeRemaining, _loc2_.price);
    };

    public getRentableSpaceStatus(param1: number): void {
        this._container.connection.send(new RentableSpaceStatusMessageComposer(param1));
    }

    public cancelRent(param1: number): void {
        this._container.connection.send(new RentableSpaceCancelRentMessageComposer(param1));
    }

    public rentSpace(param1: number): void {
        this._container.connection.send(new RentableSpaceRentMessageComposer(param1));
    }

    public getUsersClubLevel(): number {
        return this._container.sessionDataManager.clubLevel;
    }

    public getUsersCreditAmount(): number {
        return this._container.catalog.getPurse().credits;
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
