import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CatalogWidgetEventEnum {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetEventEnum'); }

    public static readonly WIDGETS_INITIALIZED: string = "WIDGETS_INITIALIZED";
    public static readonly SELECT_PRODUCT: string = "SELECT_PRODUCT";
    public static readonly SET_EXTRA_PARAMETER: string = "CWE_SET_EXTRA_PARM";
    public static readonly PURCHASE: string = "PURCHASE";
    public static readonly COLOUR_ARRAY: string = "COLOUR_ARRAY";
    public static readonly MULTI_COLOUR_ARRAY: string = "MULTI_COLOUR_ARRAY";
    public static readonly COLOUR_INDEX: string = "COLOUR_INDEX";
    public static readonly TEXT_INPUT: string = "TEXT_INPUT";
    public static readonly _SafeStr_7740: string = "CWE_DROPMENU_SELECT";
    public static readonly APPROVE_NAME_RESULT: string = "CWE_APPROVE_RESULT";
    public static readonly PURCHASE_OVERRIDE: string = "PURCHASE_OVERRIDE";
    public static readonly SELLABLE_PET_PALETTES: string = "SELLABLE_PET_PALETTES";
    public static readonly INIT_PURCHASE: string = "INIT_PURCHASE";
    public static readonly UPDATE_ROOM_PREVIEW: string = "UPDATE_ROOM_PREVIEW";
    public static readonly GUILD_SELECTED: string = "GUILD_SELECTED";
    public static readonly TOTAL_PRICE_WIDGET_INITIALIZED: string = "TOTAL_PRICE_WIDGET_INITIALIZED";
    public static readonly _SafeStr_8424: string = "CWE_PRODUCT_OFFER_UPDATED";
    public static readonly SET_PREVIEWER_STUFFDATA: string = "CWE_SET_PREVIEWER_STUFFDATA";
    public static readonly EXTRA_PARAM_REQUIRED_FOR_BUY: string = "CWE_EXTRA_PARAM_REQUIRED_FOR_BUY";
    public static readonly TOGGLE: string = "CWE_TOGGLE";
    public static readonly _SafeStr_8757: string = "CWE_BUILDER_SUBSCRIPTION_UPDATED";
    public static readonly ROOM_CHANGED: string = "CWE_ROOM_CHANGED";
    public static readonly SHOW_WARNING_TEXT: string = "CWE_SHOW_WARNING_TEXT";

    constructor() {
    }
}
