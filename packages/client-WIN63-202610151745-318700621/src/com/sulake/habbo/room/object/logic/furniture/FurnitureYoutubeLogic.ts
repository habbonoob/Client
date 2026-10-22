import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { RoomObjectDataRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectDataRequestEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureYoutubeLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureYoutubeLogic'); }

    constructor() {
        super();
    }

    public override get widget(): string {
        return "RWE_YOUTUBE";
    }

    public override getEventTypes(): any[] {
        return this.getAllEventTypes(super.getEventTypes(), ["RODRE_URL_PREFIX"]);
    }

    public override update(param1: number): void {
        super.update(param1);
        if (!this.object.getModel().hasString("session_url_prefix")) {
            this.eventDispatcher.dispatchEvent(new RoomObjectDataRequestEvent("RODRE_URL_PREFIX", this.object));
        }
    }
}
