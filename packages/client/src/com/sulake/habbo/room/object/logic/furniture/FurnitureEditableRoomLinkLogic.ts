import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureEditableRoomLinkLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureEditableRoomLinkLogic'); }

    constructor() {
        super();
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("action");
        if (_loc2_.length() != 0) {
            this.object.getModelController().setString("furniture_internal_link", _loc2_.attribute("link").toString());
        }
    }

    public override getEventTypes(): any[] {
        return this.getAllEventTypes(super.getEventTypes(), ["ROWRE_ROOM_LINK"]);
    }

    public override useObject(): void {
        this.setAnimationState(1);
        let _loc1_: Timer = new Timer(2500);
        _loc1_.addEventListener("timer", this.onFakeAnimationOver);
        _loc1_.start();
        if (this.eventDispatcher != null && this.object != null) {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_ROOM_LINK", this.object));
        }
    }

    public setAnimationState(param1: number): void {
        if (this.object == null) {
            return;
        }
        let _loc2_: IRoomObjectModelController = this.object.getModelController();
        if (_loc2_ != null) {
            _loc2_.setNumber("furniture_automatic_state_index", param1, false);
        }
    }

    private onFakeAnimationOver = (param1: TimerEvent): void => {
        this.setAnimationState(0);
    };
}
