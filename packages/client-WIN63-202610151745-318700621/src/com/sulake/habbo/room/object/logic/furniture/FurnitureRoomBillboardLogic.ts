import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModelController } from '@/com/sulake/room/object/IRoomObjectModelController';
import { RoomObjectRoomAdEvent } from '@/com/sulake/habbo/room/events/RoomObjectRoomAdEvent';
import { FurnitureRoomBrandingLogic } from '@/com/sulake/habbo/room/object/logic/furniture/FurnitureRoomBrandingLogic';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class FurnitureRoomBillboardLogic extends FurnitureRoomBrandingLogic {
    static { registerClassName(this, 'com.sulake.habbo.room.object.logic.furniture::FurnitureRoomBillboardLogic'); }

    constructor() {
        super();
        this._SafeStr_5085 = true;
    }

    protected override getAdClickUrl(param1: IRoomObjectModelController): string {
        return param1.getString("furniture_branding_url");
    }

    protected override handleAdClick(param1: number, param2: string, param3: string): void {
        if (param3.indexOf("http") == 0) {
            HabboWebTools.openWebPage(param3);
        } else if (this.eventDispatcher != null) {
            this.eventDispatcher.dispatchEvent(new RoomObjectRoomAdEvent("RORAE_ROOM_AD_FURNI_CLICK", this.object, "", param3));
        }
    }
}
