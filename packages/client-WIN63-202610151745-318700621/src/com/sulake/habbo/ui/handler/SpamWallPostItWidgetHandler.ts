import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { RequestSpamWallPostItMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RequestSpamWallPostItMessageParser';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RequestSpamWallPostItMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/RequestSpamWallPostItMessageEvent';
import { AddSpamWallPostItMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/AddSpamWallPostItMessageComposer';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetSpamWallPostItEditEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetSpamWallPostItEditEvent';
import { RoomWidgetSpamWallPostItFinishEditingMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetSpamWallPostItFinishEditingMessage';

export class SpamWallPostItWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::SpamWallPostItWidgetHandler'); }

    private _disposed: boolean = false;

    declare private _container: IRoomWidgetHandlerContainer;

    private _connection: IConnection = null;

    declare private _SafeStr_5542: IMessageEvent;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_SPAMWALL_POSTIT_WIDGET";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public set connection(param1: IConnection) {
        this._SafeStr_5542 = new RequestSpamWallPostItMessageEvent(this.onSpamWallPostItRequest);
        this._connection = param1;
        this._connection.addMessageEvent(this._SafeStr_5542);
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            this._connection.removeMessageEvent(this._SafeStr_5542);
            this._connection = null;
        }
    }

    private onSpamWallPostItRequest = (param1: RequestSpamWallPostItMessageEvent): void => {
        let _loc7_: string = null;
        if (param1 == null) {
            return;
        }
        let _loc5_: RequestSpamWallPostItMessageParser = param1.getParser();
        let _loc2_: number = _loc5_.itemId;
        let _loc6_: string = _loc5_.location;
        let _loc3_: string = "post_it";
        let _loc4_: IFurnitureItem = null;
        if (this._container.inventory != null) {
            _loc4_ = this._container.inventory.getWallItemById(_loc2_);
        }
        if (_loc4_ != null && this._container.roomEngine != null) {
            _loc7_ = this._container.roomEngine.getWallItemType(_loc4_.type);
            if (_loc7_.match("post_it_")) {
                _loc3_ = _loc7_;
            }
        }
        if (this._container != null) {
            if (this._container.events != null) {
                this._container.events.dispatchEvent(new RoomWidgetSpamWallPostItEditEvent("RWSWPUE_OPEN_EDITOR", _loc2_, _loc6_, _loc3_));
            }
        }
    };

    public getWidgetMessages(): any[] {
        return ["RWSWPUE_OPEN_EDITOR", "RWSWPFEE_SEND_POSTIT_DATA"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc2_: RoomWidgetSpamWallPostItFinishEditingMessage = null;
        let _loc3_: AddSpamWallPostItMessageComposer = null;
        let _loc4_: string = param1.type;
        if ("RWSWPFEE_SEND_POSTIT_DATA" === _loc4_) {
            _loc2_ = param1 instanceof RoomWidgetSpamWallPostItFinishEditingMessage ? param1 : null;
            if (_loc2_ != null) {
                if (this._connection != null) {
                    _loc3_ = new AddSpamWallPostItMessageComposer(_loc2_.objectId, _loc2_.location, _loc2_.colorHex, _loc2_.text);
                    this._connection.send(_loc3_);
                }
            }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processEvent(param1: Event): void {
    }

    public update(): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
