import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GuideTicketType {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum.help::GuideTicketType'); }

    public static readonly NEW_USER_TOUR: number = 0;
    public static readonly INSTRUCTIONS: number = 1;
    public static readonly USER_TOUR: number = 2;
    public static readonly _SafeStr_8620: number = 3;
    public static readonly PHOTO_REPORT: number = 4;

    constructor() {
    }
}
