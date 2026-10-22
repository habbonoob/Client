import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectSamplePlaybackEvent } from '@/com/sulake/habbo/room/events/RoomObjectSamplePlaybackEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureSoundBlockLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureSoundBlockLogic'); }

    private static readonly _SafeStr_8137: number = 12;
    private static readonly _SafeStr_8055: number = -12;
    private static readonly STATE_UNINITIALIZED: number = -1;
    private _state: number = -1;
    private _sampleId: number = -1;
    private _SafeStr_6204: boolean = false;
    private _SafeStr_5092: number = 0;

    constructor() {
        super();
    }

    public override dispose(): void {
        if (this._state != -1) {
            this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent("ROPSPE_ROOM_OBJECT_DISPOSED", this.object, this._sampleId));
        }
        super.dispose();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROPSPE_PLAY_SAMPLE", "ROPSPE_ROOM_OBJECT_DISPOSED", "ROPSPE_ROOM_OBJECT_INITIALIZED"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("sound");
        if (_loc2_.length() == 0) {
            return;
        }
        let _loc3_: XMLList = param1.child("sound").child("sample");
        if (_loc3_.length() == 0) {
            return;
        }
        this._sampleId = Number(_loc3_.attribute("id")) | 0;
        this._SafeStr_6204 = _loc3_.attribute("nopitch")?.toString() == "true";
        this.object.getModelController().setNumber("furniture_soundblock_relative_animation_speed", 1);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        let _loc2_: IVector3d = this.object.getLocation();
        let _loc3_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            if (this._state == -1 && this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
                this._SafeStr_5092 = _loc2_.z;
                this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent("ROPSPE_ROOM_OBJECT_INITIALIZED", this.object, this._sampleId, this.getPitchForHeight(_loc2_.z)));
            }
            if (this._state != -1 && _loc2_ != null) {
                if (this._SafeStr_5092 != _loc2_.z) {
                    this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent("ROPSPE_CHANGE_PITCH", this.object, this._sampleId, this.getPitchForHeight(_loc2_.z)));
                    this._SafeStr_5092 = _loc2_.z;
                }
            }
            if (this._state != -1 && _loc3_.state != this._state && _loc2_ != null) {
                this.playSoundAt(_loc2_.z);
            }
            this._state = _loc3_.state;
        }
    }

    private playSoundAt(param1: number): void {
        let _loc2_: number = this.getPitchForHeight(param1);
        this.object.getModelController().setNumber("furniture_soundblock_relative_animation_speed", _loc2_);
        this.eventDispatcher.dispatchEvent(new RoomObjectSamplePlaybackEvent("ROPSPE_PLAY_SAMPLE", this.object, this._sampleId, _loc2_));
    }

    private getPitchForHeight(param1: number): number {
        let _loc2_: number = param1 * 2 | 0;
        if (_loc2_ > 12) {
            _loc2_ = Math.min(0, -12 + (_loc2_ - 12 - 1)) | 0;
        }
        return this._SafeStr_6204 ? 1 : Number(Math.pow(2, _loc2_ / 12));
    }
}
