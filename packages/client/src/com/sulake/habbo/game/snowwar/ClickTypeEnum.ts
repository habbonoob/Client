import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ClickTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar::ClickTypeEnum'); }

    public static readonly _SafeStr_7590: number = 0;
    public static readonly THROW_FAST_BALL: number = 1;
    public static readonly THROW_LONG_LOB_BALL: number = 2;
    public static readonly THROW_SHORT_LOB_BALL: number = 3;
    public static readonly THROW_DEFAULT: number = 4;

    public static getClickTypeOnTile(param1: boolean, param2: boolean): number {
        if (param1) {
            if (param2) {
                return 3;
            }
            return 2;
        }
        if (param2) {
            return 1;
        }
        return 0;
    }

    public static getClickTypeOnOpponent(param1: boolean, param2: boolean): number {
        if (param1) {
            if (param2) {
                return 3;
            }
            return 2;
        }
        if (param2) {
            return 1;
        }
        return 4;
    }
}
