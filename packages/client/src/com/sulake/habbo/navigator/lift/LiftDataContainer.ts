import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { LiftedRoomData } from '@/com/sulake/habbo/communication/messages/incoming/newnavigator/LiftedRoomData';
import type { HabboNewNavigator } from '@/com/sulake/habbo/navigator/HabboNewNavigator';

export class LiftDataContainer {
    static { registerClassName(this, 'com.sulake.habbo.navigator.lift::LiftDataContainer'); }

    private static readonly DEFAULT_IMAGE: string = "${image.library.url}officialrooms_hq/nav_teaser_wl.png";

    constructor(param1: HabboNewNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: HabboNewNavigator;

    private _liftedRooms: LiftedRoomData[] = new Array<LiftedRoomData>(0).fill(null);

    public get liftedRooms(): LiftedRoomData[] {
        return this._liftedRooms;
    }

    public setLiftedRooms(param1: LiftedRoomData[]): void {
        this._liftedRooms = param1;
    }

    public getUrlForLiftImageAtIndex(param1: number): string {
        if (param1 < 0 || param1 > this._liftedRooms.length - 1) {
            return "";
        }
        if (this._liftedRooms[param1].image == "") {
            return "${image.library.url}officialrooms_hq/nav_teaser_wl.png";
        }
        return this._navigator.imageLibraryBaseUrl + this._liftedRooms[param1].image;
    }
}
