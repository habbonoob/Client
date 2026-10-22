import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomWidgetFurniInfoUsagePolicyEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::RoomWidgetFurniInfoUsagePolicyEnum'); }

    public static readonly NOBODY: number = 0;
    public static readonly CONTROLLER: number = 1;
    public static readonly _SafeStr_8715: number = 2;

    constructor() {
    }
}
