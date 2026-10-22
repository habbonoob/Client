import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { VimeoDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/video/VimeoDisplayWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { SetObjectDataMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/SetObjectDataMessageComposer';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureVimeoDisplayWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureVimeoDisplayWidgetHandler'); }

    private static readonly VIDEO_ID_KEY: string = "videoId";

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _widget: VimeoDisplayWidget;

    constructor() {
    }

    public get type(): string {
        return "RWE_VIMEO";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public set widget(param1: VimeoDisplayWidget) {
        this._widget = param1;
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
        let _loc5_: boolean = false;
        let _loc2_: string = null;
        if (this._container.roomEngine == null) {
            return;
        }
        let _loc4_: RoomEngineToWidgetEvent = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: IRoomObject = this._container.roomEngine.getRoomObject(_loc4_.roomId, _loc4_.objectId, _loc4_.category);
        switch (param1.type) {
            case "RETWE_OPEN_WIDGET":
                if (_loc3_ != null) {
                    _loc5_ = this._container.sessionDataManager.hasSecurity(5);
                    _loc2_ = stringOrNull(_loc3_.getModel().getStringToStringMap("furniture_data").getValue("videoId"));
                    this._widget.show(_loc3_, _loc5_, Number(_loc2_) | 0);
                }
                break;
            case "RETWE_CLOSE_WIDGET":
                this._widget.hide(_loc3_);
        }
    }

    public update(): void {
    }

    public dispose(): void {
        if (this.disposed) {
            return;
        }
        this._container = null;
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    public setVideo(param1: IRoomObject, param2: number): void {
        let _loc3_: UtilsMap = new UtilsMap();
        _loc3_.add("videoId", param2.toString());
        this._container.connection.send(new SetObjectDataMessageComposer(param1.getId(), _loc3_));
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
