import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';

export class HabbiconPopupMode {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconPopupMode'); }

    public static readonly CLAIM: string = "claim";
    public static readonly PURCHASE: string = "purchase";
    public static readonly ADD_FAVORITE: string = "add_favorite";
    public static readonly REMOVE_FAVORITE: string = "remove_favorite";
    public static readonly INFO: string = "info";

    constructor() {
    }

    public static resolve(param1: HabbiconEntryModel): string {
        if (!param1) {
            return "purchase";
        }
        if (param1.favorite) {
            return "remove_favorite";
        }
        if (param1.owned) {
            return param1.favorite ? "remove_favorite" : "add_favorite";
        }
        if (param1.claimable) {
            return "claim";
        }
        if (param1.isReward || !param1.purchasable) {
            return "info";
        }
        return "purchase";
    }
}
