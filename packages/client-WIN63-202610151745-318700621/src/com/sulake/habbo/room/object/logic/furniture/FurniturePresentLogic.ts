import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomObjectEvent } from '@/com/sulake/room/events/RoomObjectEvent';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { RoomObjectUpdateMessage } from '@/com/sulake/room/messages/RoomObjectUpdateMessage';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectFurnitureActionEvent } from '@/com/sulake/habbo/room/events/RoomObjectFurnitureActionEvent';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { RoomObjectDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectDataUpdateMessage';
import { RoomObjectModelDataUpdateMessage } from '@/com/sulake/habbo/room/messages/RoomObjectModelDataUpdateMessage';
import { MapStuffData } from '@/com/sulake/habbo/room/object/data/MapStuffData';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurniturePresentLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurniturePresentLogic'); }

    private static readonly MESSAGE: string = "MESSAGE";
    private static readonly PRODUCT_CODE: string = "PRODUCT_CODE";
    private static readonly EXTRA_PARAM: string = "EXTRA_PARAM";
    private static readonly PURCHASER_NAME: string = "PURCHASER_NAME";
    private static readonly PURCHASER_FIGURE: string = "PURCHASER_FIGURE";
    private static readonly TRUSTED_SENDER: string = "TRUSTED_SENDER";

    constructor() {
        super();
    }

    public override getEventTypes(): any[] {
        let _loc1_: any[] = ["ROWRE_PRESENT"];
        return this.getAllEventTypes(super.getEventTypes(), _loc1_);
    }

    public override processUpdateMessage(param1: RoomObjectUpdateMessage): void {
        super.processUpdateMessage(param1);
        let _loc2_: RoomObjectDataUpdateMessage = param1 instanceof RoomObjectDataUpdateMessage ? param1 : null;
        if (_loc2_ != null && _loc2_.data != null) {
            _loc2_.data.writeRoomObjectModel(this.object.getModelController());
            this.setObjectVariables();
        }
        let _loc3_: RoomObjectModelDataUpdateMessage = param1 instanceof RoomObjectModelDataUpdateMessage ? param1 : null;
        if (_loc3_ != null) {
            if (_loc3_.numberKey == "furniture_disable_picking_animation") {
                this.object.getModelController().setNumber("furniture_disable_picking_animation", _loc3_.numberValue);
            }
        }
    }

    private setObjectVariables(): void {
        if (this.object == null || this.object.getModelController() == null) {
            return;
        }
        let _loc2_: MapStuffData = new MapStuffData();
        _loc2_.initializeFromRoomObjectModel(this.object.getModel());
        let _loc1_: string = _loc2_.getValue("MESSAGE");
        let _loc3_: string = this.object.getModel().getString("furniture_data");
        if (_loc1_ == null && _loc3_ != null) {
            this.object.getModelController().setString("furniture_data", _loc3_.substr(1));
        } else {
            this.object.getModelController().setString("furniture_data", _loc2_.getValue("MESSAGE"));
        }
        this.setObjectVariable("furniture_type_id", _loc2_.getValue("PRODUCT_CODE"));
        this.setObjectVariable("furniture_purchaser_name", _loc2_.getValue("PURCHASER_NAME"));
        this.setObjectVariable("furniture_purchaser_figure", _loc2_.getValue("PURCHASER_FIGURE"));
        this.object.getModelController().setNumber("furniture_trusted_sender", _loc2_.getValue("TRUSTED_SENDER") == "true" ? 1 : 0);
    }

    private setObjectVariable(param1: string, param2: string): void {
        if (param2 != null) {
            this.object.getModelController().setString(param1, param2);
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null || param2 == null) {
            return;
        }
        if (this.object == null) {
            return;
        }
        switch (param1.type) {
            case "rollOver":
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent("ROFCAE_MOUSE_BUTTON", this.object));
                super.mouseEvent(param1, param2);
                break;
            case "rollOut":
                this.eventDispatcher.dispatchEvent(new RoomObjectFurnitureActionEvent("ROFCAE_MOUSE_ARROW", this.object));
                super.mouseEvent(param1, param2);
                break;
            case "doubleClick":
                this.useObject();
                break;
            default:
                super.mouseEvent(param1, param2);
        }
    }

    public override useObject(): void {
        let _loc1_: RoomObjectEvent = null;
        if (this.eventDispatcher != null && this.object != null) {
            _loc1_ = new RoomObjectWidgetRequestEvent("ROWRE_PRESENT", this.object);
            this.eventDispatcher.dispatchEvent(_loc1_);
        }
    }

    public override initialize(param1: XML): void {
        let _loc3_: IRoomObjectModelController = null;
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("particlesystems");
        if (_loc2_ == null || _loc2_.length() == 0) {
            return;
        }
        if (this.object != null) {
            _loc3_ = this.object.getModelController();
            if (_loc3_ != null) {
                _loc3_.setString("furniture_fireworks_data", String(_loc2_));
            }
        }
    }
}
