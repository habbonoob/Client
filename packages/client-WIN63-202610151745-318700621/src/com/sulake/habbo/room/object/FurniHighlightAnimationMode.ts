import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class FurniHighlightAnimationMode {
    static { registerClassName(this, 'com.sulake.habbo.room.object::FurniHighlightAnimationMode'); }

    public static readonly STEADY: number = 0;
    public static readonly _SafeStr_14646: number = 1;

    constructor() {
    }
}
