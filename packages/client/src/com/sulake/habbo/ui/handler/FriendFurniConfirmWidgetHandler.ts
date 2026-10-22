import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { FriendFurniConfirmWidget } from '@/com/sulake/habbo/ui/widget/furniture/friendfurni/FriendFurniConfirmWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FriendFurniCancelLockMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendfurni/FriendFurniCancelLockMessageEvent';
import { FriendFurniOtherLockConfirmedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendfurni/FriendFurniOtherLockConfirmedMessageEvent';
import { FriendFurniStartConfirmationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/friendfurni/FriendFurniStartConfirmationMessageEvent';
import { FriendFurniConfirmLockMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/friendfurni/FriendFurniConfirmLockMessageComposer';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FriendFurniConfirmWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FriendFurniConfirmWidgetHandler'); }

    constructor() {
    }

    declare private _widget: FriendFurniConfirmWidget;

    declare private _connection: IConnection;

    private _SafeStr_4703: IMessageEvent = null;
    private _SafeStr_5777: IMessageEvent = null;
    private _SafeStr_5928: IMessageEvent = null;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    private _container: IRoomWidgetHandlerContainer = null;

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public set widget(param1: FriendFurniConfirmWidget) {
        this._widget = param1;
    }

    public set connection(param1: IConnection) {
        this._connection = param1;
        if (!this._SafeStr_4703) {
            this._SafeStr_4703 = new FriendFurniStartConfirmationMessageEvent(this.onStartConfirmation);
            this._SafeStr_5777 = new FriendFurniOtherLockConfirmedMessageEvent(this.onOtherLockConfirmed);
            this._SafeStr_5928 = new FriendFurniCancelLockMessageEvent(this.onCancelLock);
            this._connection.addMessageEvent(this._SafeStr_4703);
            this._connection.addMessageEvent(this._SafeStr_5777);
            this._connection.addMessageEvent(this._SafeStr_5928);
        }
    }

    public get type(): string {
        return "";
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._connection && this._SafeStr_4703) {
                this._connection.removeMessageEvent(this._SafeStr_4703);
                this._connection.removeMessageEvent(this._SafeStr_5777);
                this._connection.removeMessageEvent(this._SafeStr_5928);
                this._connection = null;
            }
            this._widget = null;
            this._container = null;
            this._disposed = true;
        }
    }

    public sendLockConfirm(param1: number, param2: boolean): void {
        this._connection.send(new FriendFurniConfirmLockMessageComposer(param1, param2));
    }

    public getProcessedEvents(): any[] {
        return null;
    }

    public getWidgetMessages(): any[] {
        return [];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public update(): void {
    }

    private onStartConfirmation = (param1: FriendFurniStartConfirmationMessageEvent): void => {
        this._widget.open(param1.getParser().stuffId, param1.getParser().isOwner);
    };

    private onOtherLockConfirmed = (param1: FriendFurniOtherLockConfirmedMessageEvent): void => {
        this._widget.otherConfirmed(param1.getParser().stuffId);
    };

    private onCancelLock = (param1: FriendFurniCancelLockMessageEvent): void => {
        this._widget.close(param1.getParser().stuffId);
    };

    public processEvent(param1: Event): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
