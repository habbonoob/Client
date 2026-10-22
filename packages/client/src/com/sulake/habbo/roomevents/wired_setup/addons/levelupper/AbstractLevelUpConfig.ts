import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::AbstractLevelUpConfig'); }

    constructor() {
    }

    public get maxLevel(): number {
        return 0;
    }

    public xpForLevel(param1: number): number {
        return 0;
    }
}
