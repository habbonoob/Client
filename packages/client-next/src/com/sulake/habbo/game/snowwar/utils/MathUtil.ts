import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class MathUtil {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::MathUtil'); }

    constructor() {
    }

    public static javaDiv(param1: number): number {
        if (param1 >= 0) {
            return Math.floor(param1) | 0;
        }
        return Math.ceil(param1) | 0;
    }
}
