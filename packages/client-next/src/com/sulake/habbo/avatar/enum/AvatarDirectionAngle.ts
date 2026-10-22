import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarDirectionAngle {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarDirectionAngle'); }

    public static readonly _SafeStr_8467: number = 0;
    public static readonly MAX_DIRECTION: number = 7;
    public static readonly _SafeStr_7298: any[] = [45, 90, 135, 180, 225, 270, 315, 0];
    public static readonly _SafeStr_7019: any[] = [false, false, false, false, true, true, true, false];

    constructor() {
    }
}
