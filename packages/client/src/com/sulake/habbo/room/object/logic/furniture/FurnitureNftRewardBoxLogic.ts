import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureNftRewardBoxLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureNftRewardBoxLogic'); }

    constructor() {
        super();
    }

    private get hasBeenOpened(): boolean {
        return this.object.getState(0) != 0;
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROFCAE_NFT_REWARD_BOX"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        let _loc3_: any = param1.type;
        if ("doubleClick" !== _loc3_) {
            super.mouseEvent(param1, param2);
        } else if (!this.hasBeenOpened) {
            this.useObject();
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectFurnitureActionEvent("ROFCAE_NFT_REWARD_BOX", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
    }
}
