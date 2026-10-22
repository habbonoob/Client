import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class IIDWiredMenuController implements IID {
    static { registerClassName(this, 'com.sulake.iid::IIDWiredMenuController'); }

    constructor() {
    }
}
