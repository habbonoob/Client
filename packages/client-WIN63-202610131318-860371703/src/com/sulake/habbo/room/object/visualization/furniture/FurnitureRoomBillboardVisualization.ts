import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { FurnitureRoomBrandingVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/FurnitureRoomBrandingVisualization';

export class FurnitureRoomBillboardVisualization extends FurnitureRoomBrandingVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureRoomBillboardVisualization'); }

    constructor() {
        super();
    }

    protected override getAdClickUrl(param1: IRoomObjectModel): string {
        return param1.getString("furniture_branding_url");
    }

    protected override getSpriteXOffset(param1: number, param2: number, param3: number): number {
        return super.getSpriteXOffset(param1, param2, param3) + this._SafeStr_5088;
    }

    protected override getSpriteYOffset(param1: number, param2: number, param3: number): number {
        return super.getSpriteYOffset(param1, param2, param3) + this._SafeStr_5066;
    }

    protected override getSpriteZOffset(param1: number, param2: number, param3: number): number {
        return super.getSpriteZOffset(param1, param2, param3) + this._SafeStr_5761 * -1;
    }
}
