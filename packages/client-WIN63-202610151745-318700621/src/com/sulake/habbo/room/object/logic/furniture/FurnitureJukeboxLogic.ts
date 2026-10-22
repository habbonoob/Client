import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { RoomObjectStateChangeEvent } from '@/com/sulake/habbo/room/events/RoomObjectStateChangeEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureJukeboxLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureJukeboxLogic'); }

    declare private _SafeStr_4876: boolean;
    static { (this.prototype as any)._SafeStr_4876 = false; }

    private _isInitialized: boolean = false;
    private _SafeStr_3894: number = -1;

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROFCAE_JUKEBOX_START", "ROFCAE_JUKEBOX_MACHINE_STOP", "ROFCAE_JUKEBOX_DISPOSE", "ROFCAE_JUKEBOX_INIT", "ROWRE_JUKEBOX_PLAYLIST_EDITOR"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override dispose(): void {
        this.requestDispose();
        super.dispose();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc4_: RoomObjectDataUpdateMessage = null;
        let _loc2_: IRoomObjectModelController = null;
        let _loc3_: number = 0;
        super.processUpdateMessage(param1);
        if (this.object == null) {
            return;
        }
        if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
            if (!this._isInitialized) {
                this.requestInit();
            }
            this.object.getModelController().setString("RWEIEP_INFOSTAND_EXTRA_PARAM", "RWEIEP_JUKEBOX");
            _loc4_ = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
            if (_loc4_ == null) {
                return;
            }
            _loc2_ = this.object.getModelController();
            if (_loc2_ == null) {
                return;
            }
            _loc3_ = this.object.getState(0);
            if (_loc3_ != this._SafeStr_3894) {
                this._SafeStr_3894 = _loc3_;
                if (_loc3_ == 1) {
                    this.requestPlayList();
                } else if (_loc3_ == 0) {
                    this.requestStopPlaying();
                }
            }
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        let _loc3_: string = param1.type;
        if ("doubleClick" !== _loc3_) {
            super.mouseEvent(param1, param2);
        } else {
            this.useObject();
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_JUKEBOX_PLAYLIST_EDITOR", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
            this.eventDispatcher.dispatchEvent(new RoomObjectStateChangeEvent("ROSCE_STATE_CHANGE", this.object, -1));
        }
    }

    private requestInit(): void {
        if (this.object == null || this.eventDispatcher == null) {
            return;
        }
        this._SafeStr_4876 = true;
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_JUKEBOX_INIT", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
        this._isInitialized = true;
    }

    private requestPlayList(): void {
        if (this.object == null || this.eventDispatcher == null) {
            return;
        }
        this._SafeStr_4876 = true;
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_JUKEBOX_START", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
    }

    private requestStopPlaying(): void {
        if (this.object == null || this.eventDispatcher == null) {
            return;
        }
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_JUKEBOX_MACHINE_STOP", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
    }

    private requestDispose(): void {
        if (!this._SafeStr_4876) {
            return;
        }
        if (this.object == null || this.eventDispatcher == null) {
            return;
        }
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_JUKEBOX_DISPOSE", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
    }
}
