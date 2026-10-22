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

    constructor(param1: RoomDesktop) {
        this._roomDesktop = param1;
    }

    declare private _roomDesktop: RoomDesktop;

    declare private _widget: RoomThumbnailCameraWidget;

    declare private _SafeStr_5247: ThumbnailStatusMessageEvent;

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        this._SafeStr_5247 = new ThumbnailStatusMessageEvent(this.onThumbnailStatus);
        this._container.connection.addMessageEvent(this._SafeStr_5247);
    }

    public get roomDesktop(): RoomDesktop {
        return this._roomDesktop;
    }

    public set widget(param1: RoomThumbnailCameraWidget) {
        this._widget = param1;
    }

    public get disposed(): boolean {
        return false;
    }

    public get type(): string {
        return "RWE_ROOM_THUMBNAIL_CAMERA";
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

    public dispose(): void {
        if (this._container && this._container.connection && this._SafeStr_5247) {
            this._container.connection.removeMessageEvent(this._SafeStr_5247);
        }
    }

    public update(): void {
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

    public processEvent(param1: Event): void {
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
