import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { System } from '@habbo-pixi/runtime/system/System';

export class Memory {
    static { registerClassName(this, 'com.hurlant.util::Memory'); }

    constructor() {
    }

    public static gc(): void {
        System.pauseForGCIfCollectionImminent();
    }

    public static get used(): number {
        return System.totalMemory;
    }
}
