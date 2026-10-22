import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectGroupBadgeUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectGroupBadgeUpdateMessage';
import { RoomObjectSelectedMessage } from '@/com/sulake/habbo/room/messages/RoomObjectSelectedMessage';
import { FurnitureBadgeDisplayLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureBadgeDisplayLogic';

export class FurnitureAchievementResolutionLogic extends FurnitureBadgeDisplayLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureAchievementResolutionLogic'); }

    public static readonly STATE_RESOLUTION_NOT_STARTED: number = 0;
    public static readonly STATE_RESOLUTION_IN_PROGRESS: number = 1;
    public static readonly STATE_RESOLUTION_ACHIEVED: number = 2;
    public static readonly STATE_RESOLUTION_FAILED: number = 3;
    private static readonly ACH_NOT_SET: string = "ACH_0";
    private static readonly BADGE_VISIBLE_IN_STATE: number = 2;

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE_ACHIEVEMENT_RESOLUTION_OPEN", "ROWRE_ACHIEVEMENT_RESOLUTION_ENGRAVING", "ROWRE_ACHIEVEMENT_RESOLUTION_FAILED", "ROGBE_LOAD_BADGE"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc4_: RoomObjectEvent = null;
        super.processUpdateMessage(param1);
        let _loc3_: RoomObjectGroupBadgeUpdateMessage = param1 instanceof RoomObjectGroupBadgeUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            if (_loc3_.assetName != "loading_icon") {
                this.object.getModelController().setNumber("furniture_badge_visible_in_state", 2);
            }
        }
        let _loc2_: RoomObjectSelectedMessage = param1 instanceof RoomObjectSelectedMessage ? param1 : null;
        if (_loc2_) {
            if (this.eventDispatcher != null && this.object != null) {
                if (!_loc2_.selected) {
                    _loc4_ = new RoomObjectWidgetRequestEvent("ROWRE_CLOSE_FURNI_CONTEXT_MENU", this.object);
                    this.eventDispatcher.dispatchEvent(_loc4_);
                }
            }
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = null;
            switch (this.object.getState(0)) {
                case 0:
                case 1:
                    _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_ACHIEVEMENT_RESOLUTION_OPEN", this.object);
                    break;
                case 2:
                    _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_ACHIEVEMENT_RESOLUTION_ENGRAVING", this.object);
                    break;
                case 3:
                    _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_ACHIEVEMENT_RESOLUTION_FAILED", this.object);
            }
            if (_loc1_) {
                this.eventDispatcher.dispatchEvent(_loc1_);
            }
        }
    }

    protected override updateBadge(param1: string): void {
        if (param1 != "ACH_0") {
            super.updateBadge(param1);
        }
    }
}
