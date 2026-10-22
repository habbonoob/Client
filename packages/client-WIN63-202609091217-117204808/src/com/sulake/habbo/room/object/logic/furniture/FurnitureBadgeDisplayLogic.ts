import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { RoomObjectBadgeAssetEvent } from '@/com/sulake/habbo/room/events/RoomObjectBadgeAssetEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectGroupBadgeUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectGroupBadgeUpdateMessage';
import { StringArrayStuffData } from '@/com/sulake/habbo/room/object/data/StringArrayStuffData';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureBadgeDisplayLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureBadgeDisplayLogic'); }

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROGBE_LOAD_BADGE", "ROWRE_BADGE_DISPLAY_ENGRAVING"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        let _loc2_: StringArrayStuffData = null;
        super.processUpdateMessage(param1);
        let _loc4_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc4_ != null) {
            _loc2_ = asInstanceOf(_loc4_.data, StringArrayStuffData);
            if (_loc2_ != null) {
                this.updateBadge(_loc2_.getValue(1));
            }
        }
        let _loc3_: RoomObjectGroupBadgeUpdateMessage = param1 instanceof RoomObjectGroupBadgeUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            if (_loc3_.assetName != "loading_icon") {
                this.object.getModelController().setString("furniture_badge_asset_name", _loc3_.assetName);
                this.object.getModelController().setNumber("furniture_badge_image_status", 1);
                this.update(getTimer());
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
        if (this.eventDispatcher != null && this.object != null) {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_BADGE_DISPLAY_ENGRAVING", this.object));
        }
    }

    protected updateBadge(param1: string): void {
        if (param1 != "") {
            this.eventDispatcher.dispatchEvent(new RoomObjectBadgeAssetEvent("ROGBE_LOAD_BADGE", this.object, param1, false));
        }
    }
}
