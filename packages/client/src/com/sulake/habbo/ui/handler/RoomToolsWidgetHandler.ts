import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { SessionDataPreferencesEvent } from '@/com/sulake/habbo/session/events/SessionDataPreferencesEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsWidget';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { RateFlatMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/RateFlatMessageComposer';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class RoomToolsWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::RoomToolsWidgetHandler'); }

    constructor() {
    }

    private _communicationManagerMessageEvents: IMessageEvent[] = [];

    declare private _widget: RoomToolsWidget;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    declare private _communicationManager: IHabboCommunicationManager;

    public set communicationManager(param1: IHabboCommunicationManager) {
        this._communicationManager = param1;
        this._communicationManagerMessageEvents.push(this._communicationManager.addHabboConnectionMessageEvent(new GetGuestRoomResultEvent(this.onRoomInfo)));
    }

    declare private _navigator: IHabboNavigator;

    public get navigator(): IHabboNavigator {
        return this._navigator;
    }

    public set navigator(param1: IHabboNavigator) {
        this._navigator = param1;
    }

    declare private _container: IRoomWidgetHandlerContainer;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        if (this._container && this._container.sessionDataManager) {
            this._container.sessionDataManager.events.removeEventListener("APUE_UPDATED", this.onSessionDataPreferences);
        }
        this._container = param1;
        if (this._container == null) {
            return;
        }
        this._container.sessionDataManager.events.addEventListener("APUE_UPDATED", this.onSessionDataPreferences);
    }

    public set widget(param1: RoomToolsWidget) {
        this._widget = param1;
    }

    public get type(): string {
        return "RWE_ROOM_TOOLS";
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._container.sessionDataManager;
    }

    public get canRate(): boolean {
        return this._navigator.canRateRoom();
    }

    public toggleRoomInfoWindow(): void {
        this._navigator.toggleRoomInfoVisibility();
    }

    public goToPrivateRoom(param1: number): void {
        this._navigator.goToPrivateRoom(param1);
    }

    public getWidgetMessages(): any[] {
        return ["RWZTM_ZOOM_TOGGLE"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public update(): void {
    }

    public dispose(): void {
        this._disposed = true;
        if (this._communicationManager) {
            for (const _loc1_ of this._communicationManagerMessageEvents ?? []) {
                this._communicationManager.removeHabboConnectionMessageEvent(_loc1_);
            }
            this._communicationManagerMessageEvents = null;
            this._communicationManager = null;
        }
        if (this._container && this._container.sessionDataManager) {
            this._container.sessionDataManager.events.removeEventListener("APUE_UPDATED", this.onSessionDataPreferences);
        }
        this._navigator = null;
        this._widget = null;
    }

    public rateRoom(): void {
        this._container.connection.send(new RateFlatMessageComposer(1));
    }

    private onRoomInfo = (param1: IMessageEvent): void => {
        let _loc3_: string = null;
        let _loc2_: GetGuestRoomResultMessageParser = castTo(param1, GetGuestRoomResultEvent).getParser();
        let _loc4_: GuestRoomData = _loc2_.data;
        if (_loc4_) {
            this._widget.updateRoomData(_loc4_);
        }
        if (_loc2_.enterRoom) {
            if (_loc4_) {
                _loc3_ = _loc4_.showOwner ? this._widget.localizations.getLocalizationWithParams("room.tool.room.owner.prefix", "By") + " " + _loc4_.ownerName : this._widget.localizations.getLocalizationWithParams("room.tool.public.room", "Public room");
                this._widget.showRoomInfo(true, _loc4_.roomName, _loc3_, _loc4_.tags);
                this._widget.storeRoomData(_loc4_);
                this._widget.enterNewRoom(_loc4_.flatId);
            }
        }
    };

    public processEvent(param1: Event): void {
    }

    private onSessionDataPreferences = (param1: SessionDataPreferencesEvent): void => {
    };

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
