import { asInstanceOf, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { GetGuestRoomResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/GetGuestRoomResultMessageParser';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { GetGuestRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetGuestRoomMessageComposer';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureRoomLinkHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureRoomLinkHandler'); }

    private static readonly INTERNAL_LINK_KEY: string = "internalLink";

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _confirmDialog: IConfirmDialog;

    private _communicationManagerMessageEvents: IMessageEvent[] = [];

    declare private _communicationManager: IHabboCommunicationManager;

    private _roomIdToEnter: number = 0;

    declare private _link: string;

    constructor() {
    }

    public get type(): string {
        return "RWE_ROOM_LINK";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public set communicationManager(param1: IHabboCommunicationManager) {
        this._communicationManager = param1;
        this._communicationManagerMessageEvents.push(this._communicationManager.addHabboConnectionMessageEvent(new GetGuestRoomResultEvent(this.onRoomInfo)));
    }

    private onRoomInfo = (param1: IMessageEvent): void => {
        let message: string;
        let roomName: string;
        let ownerName: string;
        let event: IMessageEvent = param1;
        let p: GetGuestRoomResultMessageParser = castTo(event, GetGuestRoomResultEvent).getParser();
        let roomData: GuestRoomData = p.data;
        if (roomData && roomData.flatId == this._roomIdToEnter) {
            this._roomIdToEnter = 0;
            message = "${room.link.confirmation.message}";
            roomName = roomData.roomName;
            ownerName = roomData.ownerName;
            message = this._container.localization.getLocalization("room.link.confirmation.message");
            if (message != null && message.indexOf("%%room_name%%") > -1) {
                message = message.replace("%%room_name%%", roomName);
            }
            if (message != null && message.indexOf("%%room_owner%%") > -1) {
                message = message.replace("%%room_owner%%", ownerName);
            }
            this._confirmDialog = this._container.windowManager.confirm("${room.link.confirmation.title}", message, (0x10 | 0x20) >>> 0, (param1: IAlertDialog, param2: WindowEvent): void => {
                if (this._container.roomEngine != null && param2.type == "WE_OK") {
                    if (this._link != null && this._link.length > 0) {
                        (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("navigator/goto/" + this._link);
                    }
                }
                param1.dispose();
            });
        }
    };

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RETWE_REQUEST_ROOM_LINK"];
    }

    public processEvent(param1: Event): void {
        let _loc5_: RoomEngineToWidgetEvent = null;
        let _loc2_: IRoomObject = null;
        let _loc4_: IRoomObjectModel = null;
        let _loc3_: string = null;
        let _loc6_: string = param1.type;
        if ("RETWE_REQUEST_ROOM_LINK" === _loc6_) {
            _loc5_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
            while (true) {
                if (param1 != null && this._container.roomEngine != null) {
                    _loc2_ = this._container.roomEngine.getRoomObject(_loc5_.roomId, _loc5_.objectId, _loc5_.category);
                    if (_loc2_ != null) {
                        _loc4_ = _loc2_.getModel();
                        _loc3_ = stringOrNull(_loc4_.getStringToStringMap("furniture_data").getValue("internalLink"));
                        if (_loc3_ == null || _loc3_.length == 0) {
                            _loc3_ = _loc4_.getString("furniture_internal_link");
                        }
                        if (_loc3_ == null) {
                            break;
                        }
                        if (this._container.navigator != null && this._container.localization != null) {
                            if (this._confirmDialog != null) {
                                this._confirmDialog.dispose();
                                this._confirmDialog = null;
                            }
                            this._link = _loc3_;
                            this._roomIdToEnter = parseInt(_loc3_, 10) | 0;
                            this._communicationManager.connection.send(new GetGuestRoomMessageComposer(this._roomIdToEnter, false, false));
                        } else {
                            (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("navigator/goto/" + _loc3_);
                        }
                    }
                }
                break;
            }
        }
    }

    public update(): void {
    }

    public dispose(): void {
        if (this._communicationManager) {
            for (const _loc1_ of this._communicationManagerMessageEvents ?? []) {
                this._communicationManager.removeHabboConnectionMessageEvent(_loc1_);
            }
            this._communicationManagerMessageEvents = null;
            this._communicationManager = null;
        }
        if (this._confirmDialog != null) {
            this._confirmDialog.dispose();
            this._confirmDialog = null;
        }
        this._container = null;
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
