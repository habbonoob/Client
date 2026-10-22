import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class ChestType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests::ChestType'); }

    public static TYPE_FURNI: number = 0;
    public static TYPE_COIN: number = 1;

    constructor() {
    }
}
