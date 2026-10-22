import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class IIDCore implements IID {
    static { registerClassName(this, 'com.sulake.core.runtime::IIDCore'); }

    constructor() {
    }
}
