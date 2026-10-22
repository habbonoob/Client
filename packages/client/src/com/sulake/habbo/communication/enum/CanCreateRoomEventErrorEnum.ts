import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class CanCreateRoomEventErrorEnum {
    static { registerClassName(this, 'com.sulake.habbo.communication.enum::CanCreateRoomEventErrorEnum'); }

    public static readonly ALLOWED: number = 0;
    public static readonly REQUIRED_PERK_MISSING: number = 1;
    public static readonly REQUIRED_BADGE_MISSING: number = 2;
}
