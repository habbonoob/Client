import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetBundleDisplayExtraInfoEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetBundleDisplayExtraInfoEvent'); }

    public static readonly RESET: string = "CWPPEIE_RESET";
    public static readonly HIDE: string = "CWPPEIE_HIDE";
    public static readonly ITEM_CLICKED: string = "CWPPEIE_ITEM_CLICKED";

    constructor(param1: string, param2: ExtraInfoItemData = null, param3: number = -1) {
        super(param1);
        this._id = param3;
        this._data = param2;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _data: ExtraInfoItemData;

    public get id(): number {
        return this._id;
    }

    public get data(): ExtraInfoItemData {
        return this._data;
    }
}
