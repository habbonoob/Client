import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { RoomSpriteMouseEvent } from '@/com/sulake/room/events/RoomSpriteMouseEvent';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { RoomObjectWidgetRequestEvent } from '@/com/sulake/habbo/room/events/RoomObjectWidgetRequestEvent';
import { FurnitureLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureLogic';

export class FurnitureEditableInternalLinkLogic extends FurnitureLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureEditableInternalLinkLogic'); }

    constructor() {
        super();
    }

    private _SafeStr_4737: boolean = false;
    private _SafeStr_5707: number = 0;

    public override initialize(param1: XML): void {
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc2_: XMLList = param1.child("action");
        if (_loc2_.length() != 0) {
            if (_loc2_.attribute("startState")?.toString() == "1") {
                this._SafeStr_4737 = true;
            }
        }
    }

    public override update(param1: number): void {
        super.update(param1);
        if (!this._SafeStr_4737) {
            return;
        }
        this._SafeStr_5707 = this._SafeStr_5707 + 1;
        if (this._SafeStr_4737 && this._SafeStr_5707 > 20) {
            this.setAnimationState(1);
            this._SafeStr_4737 = false;
        }
    }

    public override mouseEvent(param1: RoomSpriteMouseEvent, param2: IRoomGeometry): void {
        if (param1 == null) {
            return;
        }
        if (param1.type == "doubleClick") {
            this.setAnimationState(0);
        }
        super.mouseEvent(param1, param2);
    }

    public override getEventTypes(): any[] {
        return this.getAllEventTypes(super.getEventTypes(), ["ROWRE_INTERNAL_LINK"]);
    }

    public override useObject(): void {
        if (this.eventDispatcher != null && this.object != null) {
            this.eventDispatcher.dispatchEvent(new RoomObjectWidgetRequestEvent("ROWRE_INTERNAL_LINK", this.object));
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
}
