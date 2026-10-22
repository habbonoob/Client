import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureSoundMachineLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureSoundMachineLogic'); }

    declare private _SafeStr_4876: boolean;
    static { (this.prototype as any)._SafeStr_4876 = false; }

    private _isInitialized: boolean = false;
    private _SafeStr_3894: number = -1;

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROFCAE_SOUND_MACHINE_START", "ROFCAE_SOUND_MACHINE_STOP", "ROFCAE_SOUND_MACHINE_DISPOSE", "ROFCAE_SOUND_MACHINE_INIT"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override dispose(): void {
        this.requestDispose();
        super.dispose();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc3_: RoomObjectDataUpdateMessage = null;
        let _loc2_: number = 0;
        super.processUpdateMessage(param1);
        if (this.object == null) {
            return;
        }
        if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
            if (!this._isInitialized) {
                this.requestInitialize();
            }
            _loc3_ = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
            if (_loc3_ == null) {
                return;
            }
            _loc2_ = this.object.getState(0);
            if (_loc2_ != this._SafeStr_3894) {
                this._SafeStr_3894 = _loc2_;
                if (_loc2_ == 1) {
                    this.requestPlayList();
                } else if (_loc2_ == 0) {
                    this.requestStopPlaying();
                }
            }
        }
    }

    private requestInitialize(): void {
        if (this.object == null || this.eventDispatcher == null) {
            return;
        }
        this._SafeStr_4876 = true;
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_SOUND_MACHINE_INIT", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
        this._isInitialized = true;
    }

    private requestPlayList(): void {
        if (this.object == null || this.eventDispatcher == null) {
            return;
        }
        this._SafeStr_4876 = true;
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_SOUND_MACHINE_START", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
    }

    private requestStopPlaying(): void {
        if (this.object == null || this.eventDispatcher == null) {
            return;
        }
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_SOUND_MACHINE_STOP", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
    }

    private requestDispose(): void {
        if (!this._SafeStr_4876) {
            return;
        }
        let _loc1_: RoomObjectFurnitureActionEvent = new RoomObjectFurnitureActionEvent("ROFCAE_SOUND_MACHINE_DISPOSE", this.object);
        this.eventDispatcher.dispatchEvent(_loc1_);
    }
}
