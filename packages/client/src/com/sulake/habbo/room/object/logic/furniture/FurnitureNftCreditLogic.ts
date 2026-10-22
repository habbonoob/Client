import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureNftCreditLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureNftCreditLogic'); }

    private static readonly EMERALD_HAND_TYPE: string = "nft_emerald_emerhand";
    private static readonly EMERALD_EGG_TYPE: string = "nft_emerald_eggmerald";

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE__CREDITFURNI"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override dispose(): void {
        super.dispose();
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (param1 == null || this.object == null) {
            return;
        }
        let _loc5_: string = this.object.getType();
        let _loc2_: any[] = _loc5_.match(/\d+$/);
        let _loc4_: number = (_loc2_ ? _loc2_[0] | 0 : NaN) | 0;
        if (isNaN(_loc4_)) {
            if (_loc5_ == "nft_emerald_emerhand") {
                _loc4_ = 15000;
            } else if (_loc5_ == "nft_emerald_eggmerald") {
                _loc4_ = 2000;
            }
        }
        let _loc3_: IRoomObjectModelController = this.object.getModelController();
        if (_loc3_ != null) {
            _loc3_.setNumber("furniture_credit_value", _loc4_);
            _loc3_.setString("furniture_nft_credit", "true");
        }
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
        } else {
            this.useObject();
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE__CREDITFURNI", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
        super.useObject();
    }
}
