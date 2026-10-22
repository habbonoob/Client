import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomDesktop } from '@/com/sulake/habbo/ui/RoomDesktop';
import type { RoomThumbnailCameraWidget } from '@/com/sulake/habbo/ui/widget/camera/RoomThumbnailCameraWidget';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ThumbnailStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/camera/ThumbnailStatusMessageEvent';
import { RenderRoomThumbnailMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/camera/RenderRoomThumbnailMessageComposer';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class RoomThumbnailCameraWidgetHandler implements IRoomWidgetHandler, IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::RoomThumbnailCameraWidgetHandler'); }

    private _container: IRoomWidgetHandlerContainer = null;

    declare private _roomDesktop: RoomDesktop;

    declare private _widget: RoomThumbnailCameraWidget;

    declare private _SafeStr_5247: ThumbnailStatusMessageEvent;

    constructor(param1: RoomDesktop) {
        this._roomDesktop = param1;
    }

    public get roomDesktop(): RoomDesktop {
        return this._roomDesktop;
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public getWidgetMessages(): any[] {
        return null;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        return null;
    }

    public set widget(param1: RoomThumbnailCameraWidget) {
        this._widget = param1;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        this._SafeStr_5247 = new ThumbnailStatusMessageEvent(this.onThumbnailStatus);
        this._container.connection.addMessageEvent(this._SafeStr_5247);
    }

    public dispose(): void {
        if (this._container && this._container.connection && this._SafeStr_5247) {
            this._container.connection.removeMessageEvent(this._SafeStr_5247);
        }
    }

    public get disposed(): boolean {
        return false;
    }

    public processEvent(param1: Event): void {
    }

    public update(): void {
    }

    public get type(): string {
        return "RWE_ROOM_THUMBNAIL_CAMERA";
    }

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public collectPhotoData(): RenderRoomThumbnailMessageComposer {
        return castTo(this._roomDesktop.roomEngine.getRenderRoomMessage(this._widget.viewPort, this._roomDesktop.roomBackgroundColor, true), RenderRoomThumbnailMessageComposer);
    }

    public sendPhotoData(param1: RenderRoomThumbnailMessageComposer): void {
        this._container.connection.send(param1);
    }

    private onThumbnailStatus = (param1: ThumbnailStatusMessageEvent): void => {
        this._widget.destroy();
        if (param1.getParser().isOk()) {
            this._container.windowManager.alert("${navigator.thumbnail.camera.title}", "${navigator.thumbnail.camera.success}", 16, null);
        } else if (param1.getParser().isRenderLimitHit()) {
            this._container.windowManager.alert("${generic.alert.title}", "${camera.render.count.info}", 0, null);
        }
    };

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
