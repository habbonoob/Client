import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AbstractLevelUpConfig {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.levelupper::AbstractLevelUpConfig'); }

    constructor() {
    }

    public get maxLevel(): number {
        this.abstractMethod("maxLevel");
        return 0;
    }

    public get maxXp(): number {
        this.abstractMethod("maxXp");
        return 0;
    }

    public xpForLevel(param1: number): number {
        this.abstractMethod("xpForLevel");
        return 0;
    }

    public currentLevel(param1: number): number {
        this.abstractMethod("currentLevel");
        return 0;
    }

    public totalXpRequired(param1: number): number {
        this.abstractMethod("totalXpRequired");
        return 0;
    }

    public progress(param1: number): number {
        this.abstractMethod("progress");
        return 0;
    }

    public progressPercentage(param1: number): number {
        this.abstractMethod("progressPercentage");
        return 0;
    }

    public xpRemaining(param1: number): number {
        this.abstractMethod("xpRemaining");
        return 0;
    }

    public isMaxed(param1: number): boolean {
        this.abstractMethod("isMaxed");
        return false;
    }

    public boundedValue(param1: number): number {
        if (param1 < 0) {
            return 0;
        }
        return Math.min(param1, this.maxXp);
    }

    private abstractMethod(param1: string): void {
        throw new Error("AbstractLevelUpConfig." + param1 + " must be implemented by a subclass.");
    }
}
