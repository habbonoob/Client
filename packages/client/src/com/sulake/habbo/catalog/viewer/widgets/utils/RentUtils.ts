import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IPurchasableOffer } from '@/com/sulake/habbo/catalog/IPurchasableOffer';

export class RentUtils {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.utils::RentUtils'); }

    public static updateBuyCaption(param1: IPurchasableOffer, param2: IWindow): void {
        if (param1 == null || param2 == null) {
            return;
        }
        param2.caption = param1.isRentOffer ? "${catalog.purchase_confirmation.rent}" : "${catalog.purchase_confirmation.buy}";
    }

    constructor() {
    }
}
