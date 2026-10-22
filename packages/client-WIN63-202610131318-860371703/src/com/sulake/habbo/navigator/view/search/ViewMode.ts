import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ViewMode {
    static { registerClassName(this, 'com.sulake.habbo.navigator.view.search::ViewMode'); }

    public static readonly MYWORLD_VIEW_CODE: string = "myworld_view";
    public static readonly HOTEL_VIEW_CODE: string = "hotel_view";
    public static readonly OFFICIAL_VIEW_CODE: string = "official_view";
    public static readonly ROOM_ADS_VIEW_CODE: string = "roomads_view";
    public static readonly NEW_ADS_VIEW_CODE: string = "new_ads";
    public static readonly ADS_VIEW_CODE_PREFIX: string = "eventcategory__";
    public static readonly _SafeStr_8185: number = 0;
    public static readonly MY_WORLD_VIEW: number = 1;
    public static readonly HOTEL_VIEW: number = 2;
    public static readonly ROOM_AD_VIEW: number = 3;
    public static readonly NEW_AD_VIEW: number = 4;

    constructor() {
    }

    public static getViewMode(param1: string): number {
        if (param1 == "official_view") {
            return 0;
        }
        if (param1 == "myworld_view") {
            return 1;
        }
        if (param1 == "roomads_view") {
            return 3;
        }
        if (param1 == "new_ads") {
            return 4;
        }
        if (param1.indexOf("eventcategory__") == 0) {
            return 4;
        }
        return 2;
    }

    public static isEventViewMode(param1: number): boolean {
        return param1 == 3 || param1 == 4;
    }
}
