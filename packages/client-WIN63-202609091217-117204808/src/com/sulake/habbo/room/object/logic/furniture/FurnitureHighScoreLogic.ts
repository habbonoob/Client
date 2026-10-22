import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureHighScoreLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureHighScoreLogic'); }

    private static readonly SHOW_WIDGET_IN_STATE: number = 1;
    private _state: number = -1;

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        return ["ROWRE_HIGH_SCORE_DISPLAY", "ROWRE_HIDE_HIGH_SCORE_DISPLAY"];
    }

    public override tearDown(): void {
        if (this.object.getModelController().getNumber("furniture_real_room_object") == 1) {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_HIDE_HIGH_SCORE_DISPLAY", this.object));
        }
        super.tearDown();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        if (this.object.getModelController().getNumber("furniture_real_room_object") != 1) {
            return;
        }
        let _loc2_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc2_ != null) {
            if (_loc2_.state == 1) {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_HIGH_SCORE_DISPLAY", this.object));
            } else {
                this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_HIDE_HIGH_SCORE_DISPLAY", this.object));
            }
            this._state = _loc2_.state;
            return;
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
}
