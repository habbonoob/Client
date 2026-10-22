import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarGuideStatus {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarGuideStatus'); }

    public static readonly NONE: number = 0;
    public static readonly GUIDE: number = 1;
    public static readonly REQUESTER: number = 2;

    constructor() {
    }
}
