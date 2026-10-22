import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TransactionConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.overview::TransactionConfig'); }

    public static PAGE_SIZE: number = 25;

    constructor() {
    }
}
