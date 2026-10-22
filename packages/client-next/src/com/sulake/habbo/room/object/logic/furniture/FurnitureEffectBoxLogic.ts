import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';

export class FurnitureEffectBoxLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureEffectBoxLogic'); }

    constructor() {
        super();
    }

    public override get contextMenu(): string {
        return "EFFECT_BOX";
    }

    public override getEventTypes(): any[] {
        return this.getAllEventTypes(super.getEventTypes(), ["ROWRE_EFFECTBOX_OPEN_DIALOG"]);
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_EFFECTBOX_OPEN_DIALOG", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
    }
}
