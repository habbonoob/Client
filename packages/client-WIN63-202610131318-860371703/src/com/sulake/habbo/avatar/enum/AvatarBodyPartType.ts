import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarBodyPartType {
    static { registerClassName(this, 'com.sulake.habbo.avatar.enum::AvatarBodyPartType'); }

    public static readonly TORSO: string = "torso";
    public static readonly _SafeStr_8427: string = "leftitem";
    public static readonly _SafeStr_8336: string = "rightitem";
    public static readonly HEAD: string = "head";
    public static readonly _SafeStr_8259: string = "leftarm";
    public static readonly _SafeStr_8170: string = "rightarm";

    constructor() {
    }
}
