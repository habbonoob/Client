import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class IIDProfiler implements IID {
    static { registerClassName(this, 'com.sulake.core.runtime::IIDProfiler'); }

    constructor() {
    }
}
