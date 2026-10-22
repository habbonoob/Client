import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureDiceLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureDiceLogic'); }

    private _SafeStr_4911: boolean = false;
    private _SafeStr_4780: boolean = false;

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROFCAE_DICE_ACTIVATE", "ROFCAE_DICE_OFF"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("allspritesactivate");
        if (_loc2_.length() == 0) {
            this._SafeStr_4911 = false;
        } else {
            this._SafeStr_4911 = true;
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        let _loc3_: RoomObjectEvent = null;
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        let _loc4_: string = param1.type;
        if ("doubleClick" !== _loc4_) {
            super.mouseEvent(param1, param2);
        } else if (this.eventDispatcher != null) {
            if (this._SafeStr_4911) {
                if (!this._SafeStr_4780 || this.object.getState(0) == 0 || this.object.getState(0) == 100) {
                    _loc3_ = new RoomObjectFurnitureActionEvent("ROFCAE_DICE_ACTIVATE", this.object);
                    this._SafeStr_4780 = true;
                } else {
                    _loc3_ = new RoomObjectFurnitureActionEvent("ROFCAE_DICE_OFF", this.object);
                    this._SafeStr_4780 = false;
                }
            } else if (param1.spriteTag == "activate" || this.object.getState(0) == 0 || this.object.getState(0) == 100) {
                _loc3_ = new RoomObjectFurnitureActionEvent("ROFCAE_DICE_ACTIVATE", this.object);
            } else if (param1.spriteTag == "deactivate") {
                _loc3_ = new RoomObjectFurnitureActionEvent("ROFCAE_DICE_OFF", this.object);
            }
            if (_loc3_ != null) {
                this.eventDispatcher.dispatchEvent(_loc3_);
            }
        }
    }
}
