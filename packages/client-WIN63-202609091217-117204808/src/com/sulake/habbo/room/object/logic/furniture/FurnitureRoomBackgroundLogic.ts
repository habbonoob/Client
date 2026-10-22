import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { FurnitureRoomBrandingLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRoomBrandingLogic';

export class FurnitureRoomBackgroundLogic extends FurnitureRoomBrandingLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureRoomBackgroundLogic'); }

    constructor() {
        super();
    }

    protected override getAdClickUrl(param1: IRoomObjectModelController): string {
        return null;
    }
}
