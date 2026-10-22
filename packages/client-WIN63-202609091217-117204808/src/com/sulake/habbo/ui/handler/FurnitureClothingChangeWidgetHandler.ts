import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboAvatarEditorDataSaver } from '@/com/sulake/habbo/avatar/IHabboAvatarEditorDataSaver';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { RoomWidgetClothingChangeUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetClothingChangeUpdateEvent';
import { RoomWidgetClothingChangeMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetClothingChangeMessage';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';

export class FurnitureClothingChangeWidgetHandler implements IRoomWidgetHandler, IHabboAvatarEditorDataSaver {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::FurnitureClothingChangeWidgetHandler'); }

    private static readonly DEFAULT_BOY_CLOTHES: string = "hd-99999-99999.lg-270-62";
    private static readonly DEFAULT_GIRL_CLOTHES: string = "hd-99999-99999.ch-630-62.lg-695-62";
    private _disposed: boolean = false;
    private _container: IRoomWidgetHandlerContainer = null;
    private _objectId: number = -1;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_CLOTHING_CHANGE";
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public dispose(): void {
        if (this._container && this._container.avatarEditor) {
            this._container.avatarEditor.close(1);
        }
        this._disposed = true;
        this._container = null;
    }

    public getWidgetMessages(): any[] {
        return ["RWFWM_MESSAGE_REQUEST_CLOTHING_CHANGE", "RWCCM_REQUEST_EDITOR", "RWCM_OPEN_AVATAR_EDITOR"];
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc6_: RoomWidgetFurniToWidgetMessage = null;
        let _loc3_: boolean = false;
        let _loc7_: RoomWidgetClothingChangeMessage = null;
        let _loc5_: string = null;
        let _loc8_: string = null;
        let _loc4_: IRoomObject = null;
        let _loc9_: IRoomObjectModel = null;
        let _loc2_: RoomWidgetClothingChangeUpdateEvent = null;
        switch (param1.type) {
            case "RWFWM_MESSAGE_REQUEST_CLOTHING_CHANGE":
                _loc6_ = param1 instanceof RoomWidgetFurniToWidgetMessage ? param1 : null;
                _loc4_ = this._container.roomEngine.getRoomObject(_loc6_.roomId, _loc6_.id, _loc6_.category);
                if (_loc4_ != null) {
                    _loc9_ = _loc4_.getModel();
                    if (_loc9_ != null) {
                        _loc3_ = this._container.roomSession.isRoomOwner || this._container.sessionDataManager.isAnyRoomController || this._container.roomSession.roomControllerLevel >= 1;
                        if (_loc3_) {
                            _loc2_ = new RoomWidgetClothingChangeUpdateEvent("RWCCUE_SHOW_GENDER_SELECTION", _loc6_.id, _loc6_.category, _loc6_.roomId);
                            this._container.events.dispatchEvent(_loc2_);
                        }
                    }
                }
                break;
            case "RWCCM_REQUEST_EDITOR":
                _loc7_ = param1 instanceof RoomWidgetClothingChangeMessage ? param1 : null;
                _loc4_ = this._container.roomEngine.getRoomObject(_loc7_.roomId, _loc7_.objectId, _loc7_.objectCategory);
                if (_loc4_ != null) {
                    _loc9_ = _loc4_.getModel();
                    if (_loc9_ != null) {
                        this._objectId = _loc7_.objectId;
                        _loc5_ = "M";
                        _loc8_ = _loc9_.getString("furniture_clothing_boy");
                        if (_loc8_ == null || _loc8_ == "") {
                            _loc8_ = "hd-99999-99999.lg-270-62";
                        }
                        if (_loc7_.gender == "F") {
                            _loc5_ = "F";
                            _loc8_ = _loc9_.getString("furniture_clothing_girl");
                            if (_loc8_ == null || _loc8_ == "") {
                                _loc8_ = "hd-99999-99999.ch-630-62.lg-695-62";
                            }
                        }
                        if (this._container.avatarEditor.openEditor(1, this, ["torso", "legs"], false, "${widget.furni.clothingchange.editor.title}")) {
                            this._container.avatarEditor.loadAvatarInEditor(1, _loc8_, _loc5_, 0);
                            _loc2_ = new RoomWidgetClothingChangeUpdateEvent("RWCCUE_SHOW_GENDER_SELECTION", _loc7_.objectId, _loc7_.objectCategory, _loc7_.roomId);
                            this._container.events.dispatchEvent(_loc2_);
                        }
                    }
                }
        }
        return null;
    }

    public update(): void {
    }

    public getProcessedEvents(): any[] {
        return [];
    }

    public processEvent(param1: Event): void {
    }

    public saveFigure(param1: string, param2: string): void {
        if (this._container == null) {
            return;
        }
        this._container.roomSession.sendUpdateClothingChangeFurniture(this._objectId, param2, param1);
        this._container.avatarEditor.close(1);
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
