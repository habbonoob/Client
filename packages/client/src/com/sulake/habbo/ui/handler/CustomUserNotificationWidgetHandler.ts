import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { CustomUserNotificationWidget } from '@/com/sulake/habbo/ui/widget/furniture/requirementsmissing/CustomUserNotificationWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { CustomUserNotificationMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/CustomUserNotificationMessageEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class CustomUserNotificationWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::CustomUserNotificationWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;

    declare private _widget: CustomUserNotificationWidget;

    declare private _SafeStr_3667: IMessageEvent;

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        if (!this._SafeStr_3667) {
            this._SafeStr_3667 = new CustomUserNotificationMessageEvent(this.onFurnitureUsageRequirementMissingMessage);
            this._container.connection.addMessageEvent(this._SafeStr_3667);
        }
    }

    public get type(): string {
        return "RWE_CUSTOM_USER_NOTIFICATION";
    }

    public set widget(param1: CustomUserNotificationWidget) {
        this._widget = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public getWidgetMessages(): any[] {
        return [];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return null;
    }

    public update(): void {
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._container.connection && this._SafeStr_3667) {
                this._container.connection.removeMessageEvent(this._SafeStr_3667);
            }
            this._SafeStr_3667 = null;
            this._widget = null;
            this._container = null;
            this._disposed = true;
        }
    }

    public onFurnitureUsageRequirementMissingMessage = (param1: CustomUserNotificationMessageEvent): void => {
        let _loc2_: number = param1.getParser().code;
        if (this._widget) {
            switch (_loc2_ - 1) {
                case 0:
                    this._widget.open("costumehopper");
                    break;
                case 1:
                    this._widget.open("viphopper");
                    break;
                case 2:
                    this._widget.open("vipgate");
                    break;
                case 3:
                    this._widget.open("respectfailedstage");
                    break;
                case 4:
                    this._widget.open("respectfailedaudience");
            }
        }
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
