import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PromotedRoomCategoryData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/PromotedRoomCategoryData';
import type { HabboNavigator } from '@/com/sulake/habbo/navigator/HabboNavigator';
import { RoomSessionTags } from '@/com/sulake/habbo/navigator/domain/RoomSessionTags';
import { GuestRoomListCtrl } from '@/com/sulake/habbo/navigator/HabboNavigator.group';

export class PromotedRoomsGuestRoomListCtrl extends GuestRoomListCtrl {
    static { registerClassName(this, 'com.sulake.habbo.navigator.mainview::PromotedRoomsGuestRoomListCtrl'); }

    declare private _category: PromotedRoomCategoryData;

    constructor(param1: HabboNavigator) {
        super(param1, -6, false);
    }

    public set category(param1: PromotedRoomCategoryData) {
        this._category = param1;
    }

    public override getRooms(): any[] {
        return this._category.rooms;
    }

    public override beforeEnterRoom(param1: number): void {
        this.navigator.data.roomSessionTags = new RoomSessionTags(this._category.code, "" + (param1 + 2));
    }
}
