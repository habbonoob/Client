import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomWidgetInfostandExtraParamEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::RoomWidgetInfostandExtraParamEnum'); }

    public static readonly INFOSTAND_EXTRAPARAM: string = "RWEIEP_INFOSTAND_EXTRA_PARAM";
    public static readonly INFOSTAND_EXTRAPARAM_JUKEBOX: string = "RWEIEP_JUKEBOX";
    public static readonly INFOSTAND_EXTRAPARAM_PRODUCT: string = "RWEIEP_USABLE_PRODUCT";
    public static readonly INFOSTAND_EXTRAPARAM_SONGDISK: string = "RWEIEP_SONGDISK";
    public static readonly INFOSTAND_EXTRAPARAM_CRACKABLE_FURNI: string = "RWEIEP_CRACKABLE_FURNI";
    public static readonly INFOSTAND_EXTRAPARAM_BRANDING_OPTIONS: string = "RWEIEP_BRANDING_OPTIONS";
    public static readonly INFOSTAND_EXTRAPARAM_USABLE: string = "RWEIEP_USABLE";

    constructor() {
    }
}
