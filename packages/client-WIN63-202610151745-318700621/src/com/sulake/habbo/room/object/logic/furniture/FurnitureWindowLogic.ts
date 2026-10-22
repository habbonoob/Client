import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { XML } from '@habbo-pixi/runtime/xml/XML';
import type { XMLList } from '@habbo-pixi/runtime/xml/XMLList';
import { FurnitureMultiStateLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureMultiStateLogic';
import { XMLValidator } from '@/com/sulake/room/utils/XMLValidator';

export class FurnitureWindowLogic extends FurnitureMultiStateLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureWindowLogic'); }

    constructor() {
        super();
    }

    public override initialize(param1: XML): void {
        let _loc4_: XML = null;
        let _loc2_: string = null;
        super.initialize(param1);
        if (param1 == null) {
            return;
        }
        let _loc3_: XMLList = param1.child("mask");
        if (_loc3_.length() > 0) {
            _loc4_ = _loc3_.item(0);
            if (XMLValidator.checkRequiredAttributes(_loc4_, ["type"])) {
                _loc2_ = _loc4_.attribute("type").toString();
                this.object.getModelController().setNumber("furniture_uses_plane_mask", 1, true);
                this.object.getModelController().setString("furniture_plane_mask_type", _loc2_, true);
            }
        }
    }
}
