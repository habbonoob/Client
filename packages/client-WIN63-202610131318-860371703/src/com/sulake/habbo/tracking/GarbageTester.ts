import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';

export class GarbageTester extends EventDispatcherWrapper {
    static { registerClassName(this, 'com.sulake.habbo.tracking::GarbageTester'); }

    constructor(param1: string) {
        super();
    }
}
