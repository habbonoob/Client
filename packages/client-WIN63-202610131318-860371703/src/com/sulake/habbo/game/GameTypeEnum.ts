import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class GameTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.game::GameTypeEnum'); }

    public static readonly GAME_NAME_SNOWWAR: string = "snowwar";
    public static readonly GAME_NAME_BASEJUMP: string = "basejump";
    public static readonly SNOWWAR: number = 0;

    constructor() {
    }
}
