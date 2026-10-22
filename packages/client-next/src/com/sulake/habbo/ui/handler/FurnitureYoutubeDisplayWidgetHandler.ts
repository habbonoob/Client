import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { YoutubeControlVideoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/YoutubeControlVideoMessageParser';
import type { YoutubeDisplayPlaylistsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/YoutubeDisplayPlaylistsMessageParser';
import type { YoutubeDisplayVideoMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/YoutubeDisplayVideoMessageParser';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { YoutubeDisplayWidget } from '@/com/sulake/habbo/ui/widget/furniture/video/YoutubeDisplayWidget';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { YoutubeControlVideoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/YoutubeControlVideoMessageEvent';
import { YoutubeDisplayPlaylistsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/YoutubeDisplayPlaylistsMessageEvent';
import { YoutubeDisplayVideoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/furniture/YoutubeDisplayVideoMessageEvent';
import { ControlYoutubeDisplayPlaybackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/ControlYoutubeDisplayPlaybackMessageComposer';
import { GetYoutubeDisplayStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/GetYoutubeDisplayStatusMessageComposer';
import { SetYoutubeDisplayPlaylistMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/furniture/SetYoutubeDisplayPlaylistMessageComposer';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';

export class FurnitureYoutubeDisplayWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureYoutubeDisplayWidgetHandler'); }

    private static readonly CONTROL_COMMAND_PREVIOUS_VIDEO: number = 0;
    private static readonly CONTROL_COMMAND_NEXT_VIDEO: number = 1;
    private static readonly CONTROL_COMMAND_PAUSE_VIDEO: number = 2;
    private static readonly CONTROL_COMMAND_CONTINUE_VIDEO: number = 3;

    declare private _container: IRoomWidgetHandlerContainer;

    declare private _widget: YoutubeDisplayWidget;

    declare private _events: IMessageEvent[];

    constructor() {
    }

    public get type(): string {
        return "RWE_YOUTUBE";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        this.addMessageEvent(new YoutubeDisplayVideoMessageEvent(this.onVideo));
        this.addMessageEvent(new YoutubeDisplayPlaylistsMessageEvent(this.onPlaylists));
        this.addMessageEvent(new YoutubeControlVideoMessageEvent(this.onControlVideo));
    }

    private addMessageEvent(param1: IMessageEvent): void {
        if (this._events == null) {
            this._events = new Array<IMessageEvent>(0).fill(null);
        }
        this._events.push(param1);
        this._container.connection.addMessageEvent(param1);
    }

    private removeEvents(): void {
        for (const _loc1_ of this._events ?? []) {
            this._container.connection.removeMessageEvent(_loc1_);
            _loc1_.dispose();
        }
    }

    private onVideo = (param1: YoutubeDisplayVideoMessageEvent): void => {
        let _loc2_: YoutubeDisplayVideoMessageParser = param1.getParser();
        this._widget.showVideo(_loc2_.furniId, _loc2_.videoId, _loc2_.startAtSeconds, _loc2_.endAtSeconds, _loc2_.state);
    };

    private onControlVideo = (param1: YoutubeControlVideoMessageEvent): void => {
        let _loc2_: YoutubeControlVideoMessageParser = param1.getParser();
        this._widget.controlVideo(_loc2_.furniId, _loc2_.commandId);
    };

    private onPlaylists = (param1: YoutubeDisplayPlaylistsMessageEvent): void => {
        let _loc2_: YoutubeDisplayPlaylistsMessageParser = param1.getParser();
        this._widget.populatePlaylists(_loc2_.furniId, _loc2_.playlists, _loc2_.selectedPlaylistId);
    };

    public set widget(param1: YoutubeDisplayWidget) {
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
        let _loc3_: boolean = false;
        if (this._container.roomEngine == null) {
            return;
        }
        let _loc4_: RoomEngineToWidgetEvent = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        let _loc2_: IRoomObject = this._container.roomEngine.getRoomObject(_loc4_.roomId, _loc4_.objectId, _loc4_.category);
        switch (param1.type) {
            case "RETWE_OPEN_WIDGET":
                if (_loc2_ != null) {
                    _loc3_ = this._container.isOwnerOfFurniture(_loc2_) || this._container.sessionDataManager.hasSecurity(4);
                    this._widget.show(_loc2_, _loc3_);
                    this._container.connection.send(new GetYoutubeDisplayStatusMessageComposer(_loc2_.getId()));
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
        this.removeEvents();
        this._container = null;
    }

    public get disposed(): boolean {
        return this._container == null;
    }

    public selectPlaylist(param1: number, param2: string): void {
        this._container.connection.send(new SetYoutubeDisplayPlaylistMessageComposer(param1, param2));
    }

    public switchToPreviousVideo(param1: number): void {
        this._container.connection.send(new ControlYoutubeDisplayPlaybackMessageComposer(param1, 0));
    }

    public switchToNextVideo(param1: number): void {
        this._container.connection.send(new ControlYoutubeDisplayPlaybackMessageComposer(param1, 1));
    }

    public pauseVideo(param1: number): void {
        this._container.connection.send(new ControlYoutubeDisplayPlaybackMessageComposer(param1, 2));
    }

    public continueVideo(param1: number): void {
        this._container.connection.send(new ControlYoutubeDisplayPlaybackMessageComposer(param1, 3));
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
