import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureFriendFurniLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureFriendFurniLogic'); }

    private static readonly STATE_UNINITIALIZED: number = -1;
    private static readonly STATE_UNLOCKED: number = 0;
    private static readonly STATE_LOCKED: number = 1;
    private _state: number = -1;

    constructor() {
        super();
    }

    protected get engravingDialogType(): number {
        return 0;
    }

    public override get contextMenu(): string {
        return this._state == 0 ? "FRIEND_FURNITURE" : "DUMMY";
    }

    public override getEventTypes(): any[] {
        return this.getAllEventTypes(super.getEventTypes(), ["ROWRE_FRIEND_FURNITURE_ENGRAVING"]);
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        this.object.getModelController().setNumber("furniture_friendfurni_engraving_type", this.engravingDialogType);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: StringArrayStuffData = null;
        let _loc3_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            _loc2_ = asInstanceOf(_loc3_.data, StringArrayStuffData);
            if (_loc2_ != null) {
                this._state = _loc2_.state;
            } else {
                this._state = _loc3_.state;
            }
        }
        super.processUpdateMessage(param1);
    }

    public override useObject(): void {
        if (this.eventDispatcher != null && this.object != null) {
            if (this._state == 1) {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_FRIEND_FURNITURE_ENGRAVING", this.object));
            } else {
                super.useObject();
            }
        }
    }
}
