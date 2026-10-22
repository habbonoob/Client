import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { ExternalImageWidget } from '@/com/sulake/habbo/ui/widget/furniture/externalimage/ExternalImageWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { RoomEngineUseProductEvent } from '@/com/sulake/habbo/room/events/RoomEngineUseProductEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class ExternalImageWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::ExternalImageWidgetHandler'); }

    private _disposed: boolean = false;

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _widget: ExternalImageWidget;

    constructor() {
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set widget(param1: ExternalImageWidget) {
        this._widget = param1;
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["ROSM_USE_PRODUCT_FROM_INVENTORY"];
    }

    public processEvent(param1: Event): void {
        let _loc2_: RoomEngineUseProductEvent = null;
        if (this._container.roomEngine == null) {
            return;
        }
        if (param1 instanceof RoomEngineUseProductEvent) {
            _loc2_ = param1 instanceof RoomEngineUseProductEvent ? param1 : null;
            if (_loc2_.type == "ROSM_USE_PRODUCT_FROM_INVENTORY") {
                this._widget.showWithFurniID(_loc2_.objectId);
            }
        }
        let _loc4_: RoomEngineToWidgetEvent = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: IRoomObject = this._container.roomEngine.getRoomObject(_loc4_.roomId, _loc4_.objectId, _loc4_.category);
        switch (param1.type) {
            case "RETWE_OPEN_WIDGET":
                if (_loc3_ != null) {
                    this._widget.showWithRoomObject(_loc3_);
                }
                break;
            case "RETWE_CLOSE_WIDGET":
                this._widget.hide();
        }
    }

    public deleteCard(param1: number): void {
        if (this._container != null && this._container.roomEngine != null) {
            this._container.roomEngine.deleteRoomObject(param1, 20);
        }
    }

    public isRoomOwner(): boolean {
        return this._container.roomSession.isRoomOwner;
    }

    public hasRightsToRemove(): boolean {
        return this._container.roomSession.roomControllerLevel >= 4;
    }

    public sendMessage(param1: IMessageComposer): void {
        this._container.connection.send(param1);
    }

    public update(): void {
    }

    public dispose(): void {
        this._container = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_EXTERNAL_IMAGE";
    }

    public get storiesImageUrlBase(): string {
        return this._container.config.getProperty("stories.image_url_base");
    }

    public get storiesImageShareUrl(): string {
        return this._container.config.getProperty("stories.image.sharing_url_base");
    }

    public get extraDataServiceUrl(): string {
        return this._container.config.getProperty("extra_data_service_url");
    }

    public isSelfieReportingEnabled(): boolean {
        return this._container.config.getProperty("stories.report.selfie.enabled") == "true";
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
