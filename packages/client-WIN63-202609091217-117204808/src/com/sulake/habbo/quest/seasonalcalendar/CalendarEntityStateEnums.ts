import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CalendarEntityStateEnums {
    static { registerClassName(this, 'com.sulake.habbo.quest.seasonalcalendar::CalendarEntityStateEnums'); }

    public static readonly ACTIVE: number = 0;
    public static readonly INACTIVE: number = 1;
    public static readonly COMPLETED: number = 2;
    public static readonly _SafeStr_7896: number = 3;
    public static readonly INDICATOR_COLOR: any[] = [2134301, 12439506, 10066329, 10066329];

    constructor() {
    }
}
