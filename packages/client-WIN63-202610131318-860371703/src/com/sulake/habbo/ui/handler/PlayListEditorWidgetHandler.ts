import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { FurniListAddOrUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListAddOrUpdateEvent';
import { FurniListEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListEvent';
import { FurniListRemoveEvent } from '@/com/sulake/habbo/communication/messages/incoming/inventory/furni/FurniListRemoveEvent';
import { UseFurnitureMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/room/engine/UseFurnitureMessageComposer';
import { AddJukeboxDiskComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/AddJukeboxDiskComposer';
import { RemoveJukeboxDiskComposer } from '@/com/sulake/habbo/communication/messages/outgoing/sound/RemoveJukeboxDiskComposer';
import { RoomEngineSoundMachineEvent } from '@/com/sulake/habbo/room/events/RoomEngineSoundMachineEvent';
import { NowPlayingEvent } from '@/com/sulake/habbo/sound/events/NowPlayingEvent';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetPlayListEditorEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPlayListEditorEvent';
import { RoomWidgetPlayListEditorNowPlayingEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetPlayListEditorNowPlayingEvent';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';
import { RoomWidgetPlayListModificationMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPlayListModificationMessage';
import { RoomWidgetPlayListPlayStateMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetPlayListPlayStateMessage';

export class PlayListEditorWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::PlayListEditorWidgetHandler'); }

    private _disposed: boolean = false;

    declare private _container: IRoomWidgetHandlerContainer;

    private _connection: IConnection = null;

    declare private _SafeStr_4397: IMessageEvent;

    declare private _SafeStr_5924: IMessageEvent;

    declare private _SafeStr_3423: IMessageEvent;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_PLAYLIST_EDITOR_WIDGET";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
        if (this._container.soundManager) {
            this._container.soundManager.events.addEventListener("SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT", this.processSoundManagerEvent);
            this._container.soundManager.events.addEventListener("PLUE_PLAY_LIST_UPDATED", this.processSoundManagerEvent);
            this._container.soundManager.events.addEventListener("PLUE_PLAY_LIST_FULL", this.processSoundManagerEvent);
            this._container.soundManager.events.addEventListener("NPE_SONG_CHANGED", this.processSoundManagerEvent);
            this._container.soundManager.events.addEventListener("NPE_USER_PLAY_SONG", this.processSoundManagerEvent);
            this._container.soundManager.events.addEventListener("NPW_USER_STOP_SONG", this.processSoundManagerEvent);
        }
    }

    public set connection(param1: IConnection) {
        this._SafeStr_4397 = new FurniListEvent(this.onFurniListUpdated);
        this._SafeStr_5924 = new FurniListRemoveEvent(this.onFurniListUpdated);
        this._SafeStr_3423 = new FurniListAddOrUpdateEvent(this.onFurniListUpdated);
        this._connection = param1;
        this._connection.addMessageEvent(this._SafeStr_4397);
        this._connection.addMessageEvent(this._SafeStr_5924);
        this._connection.addMessageEvent(this._SafeStr_3423);
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            if (this._connection) {
                this._connection.removeMessageEvent(this._SafeStr_4397);
                this._connection.removeMessageEvent(this._SafeStr_5924);
                this._connection.removeMessageEvent(this._SafeStr_3423);
            }
            this._connection = null;
            this._SafeStr_4397 = null;
            if (this._container) {
                if (this._container.soundManager) {
                    if (this._container.soundManager.events) {
                        this._container.soundManager.events.removeEventListener("SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT", this.processSoundManagerEvent);
                        this._container.soundManager.events.removeEventListener("PLUE_PLAY_LIST_UPDATED", this.processSoundManagerEvent);
                        this._container.soundManager.events.removeEventListener("PLUE_PLAY_LIST_FULL", this.processSoundManagerEvent);
                        this._container.soundManager.events.removeEventListener("NPE_SONG_CHANGED", this.processSoundManagerEvent);
                        this._container.soundManager.events.removeEventListener("NPE_USER_PLAY_SONG", this.processSoundManagerEvent);
                        this._container.soundManager.events.removeEventListener("NPW_USER_STOP_SONG", this.processSoundManagerEvent);
                    }
                }
                this._container = null;
            }
        }
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_PLAYLIST_EDITOR", "RWPLAM_ADD_TO_PLAYLIST", "RWPLAM_REMOVE_FROM_PLAYLIST", "RWPLPS_TOGGLE_PLAY_PAUSE", "RWPLUA_OPEN_CATALOGUE_BUTTON_PRESSED"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc5_: RoomWidgetFurniToWidgetMessage = null;
        let _loc4_: IRoomObject = null;
        let _loc7_: boolean = false;
        let _loc2_: boolean = false;
        let _loc3_: RoomWidgetPlayListEditorEvent = null;
        let _loc8_: RoomWidgetPlayListModificationMessage = null;
        let _loc9_: RoomWidgetPlayListModificationMessage = null;
        let _loc6_: RoomWidgetPlayListPlayStateMessage = null;
        switch (param1.type) {
            case "RWFWM_MESSAGE_REQUEST_PLAYLIST_EDITOR":
                _loc5_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                _loc4_ = this._container.roomEngine.getRoomObject(_loc5_.roomId, _loc5_.id, _loc5_.category);
                if (_loc4_ != null) {
                    _loc7_ = this._container.isOwnerOfFurniture(_loc4_);
                    _loc2_ = this._container.roomSession.isRoomOwner || this._container.roomSession.roomControllerLevel >= 1 || this._container.sessionDataManager.isAnyRoomController;
                    if (_loc7_) {
                        _loc3_ = new RoomWidgetPlayListEditorEvent("RWPLEE_SHOW_PLAYLIST_EDITOR", _loc5_.id);
                        this._container.events.dispatchEvent(_loc3_);
                    } else if (_loc2_) {
                        if (this._connection != null) {
                            this._connection.send(new UseFurnitureMessageComposer(_loc4_.getId(), -2));
                        }
                    }
                }
                break;
            case "RWPLAM_ADD_TO_PLAYLIST":
                _loc8_ = param1 instanceof RoomWidgetPlayListModificationMessage ? param1 : null;
                if (this._connection != null) {
                    this._connection.send(new AddJukeboxDiskComposer(_loc8_.diskId, _loc8_.slotNumber));
                }
                break;
            case "RWPLAM_REMOVE_FROM_PLAYLIST":
                _loc9_ = param1 instanceof RoomWidgetPlayListModificationMessage ? param1 : null;
                if (this._connection != null) {
                    this._connection.send(new RemoveJukeboxDiskComposer(_loc9_.slotNumber));
                }
                break;
            case "RWPLPS_TOGGLE_PLAY_PAUSE":
                _loc6_ = param1 instanceof RoomWidgetPlayListPlayStateMessage ? param1 : null;
                if (this._connection != null) {
                    this._connection.send(new UseFurnitureMessageComposer(_loc6_.furniId, _loc6_.position));
                }
                break;
            case "RWPLUA_OPEN_CATALOGUE_BUTTON_PRESSED":
                this._container.habboTracking.trackGoogle("playlistEditorPanelOpenCatalogue", "click");
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("ROSM_JUKEBOX_DISPOSE");
        return _loc1_;
    }

    public processEvent(param1: Event): void {
        let _loc2_: RoomEngineSoundMachineEvent = null;
        let _loc3_: RoomWidgetPlayListEditorEvent = null;
        let _loc4_: any = param1.type;
        if ("ROSM_JUKEBOX_DISPOSE" === _loc4_) {
            _loc2_ = param1 instanceof RoomEngineSoundMachineEvent ? param1 : null;
            _loc3_ = new RoomWidgetPlayListEditorEvent("RWPLEE_HIDE_PLAYLIST_EDITOR", _loc2_.objectId);
            this._container.events.dispatchEvent(_loc3_);
        }
    }

    public update(): void {
    }

    private onFurniListUpdated = (param1: IMessageEvent): void => {
        let _loc2_: FurniListEvent = param1 instanceof FurniListEvent ? param1 : null;
        if (_loc2_ && _loc2_.getParser().fragmentNo == 0) {
            if (this._container != null) {
                if (this._container.events != null) {
                    this._container.events.dispatchEvent(new RoomWidgetPlayListEditorEvent("RWPLEE_INVENTORY_UPDATED", -1));
                }
            }
        }
    };

    private processSoundManagerEvent = (param1: Event): void => {
        let _loc2_: NowPlayingEvent = null;
        switch (param1.type) {
            case "SDIR_SONG_DISK_INVENTORY_RECEIVENT_EVENT":
                this._container.events.dispatchEvent(new RoomWidgetPlayListEditorEvent("RWPLEE_SONG_DISK_INVENTORY_UPDATED"));
                break;
            case "PLUE_PLAY_LIST_UPDATED":
                this._container.events.dispatchEvent(new RoomWidgetPlayListEditorEvent("RWPLEE_PLAY_LIST_UPDATED"));
                break;
            case "PLUE_PLAY_LIST_FULL":
                this._container.events.dispatchEvent(new RoomWidgetPlayListEditorEvent("RWPLEE_PLAY_LIST_FULL"));
                break;
            case "NPE_SONG_CHANGED":
                _loc2_ = param1 instanceof NowPlayingEvent ? param1 : null;
                this._container.events.dispatchEvent(new RoomWidgetPlayListEditorNowPlayingEvent("RWPLENPE_SONG_CHANGED", _loc2_.id, _loc2_.position, _loc2_.priority));
                break;
            case "NPE_USER_PLAY_SONG":
                _loc2_ = param1 instanceof NowPlayingEvent ? param1 : null;
                this._container.events.dispatchEvent(new RoomWidgetPlayListEditorNowPlayingEvent("RWPLENPE_USER_PLAY_SONG", _loc2_.id, _loc2_.position, _loc2_.priority));
                break;
            case "NPW_USER_STOP_SONG":
                _loc2_ = param1 instanceof NowPlayingEvent ? param1 : null;
                this._container.events.dispatchEvent(new RoomWidgetPlayListEditorNowPlayingEvent("RWPLENPW_USER_STOP_SONG", _loc2_.id, _loc2_.position, _loc2_.priority));
        }
    };

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
