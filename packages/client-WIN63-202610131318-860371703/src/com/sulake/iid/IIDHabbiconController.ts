import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class IIDHabbiconController implements IID {
    static { registerClassName(this, 'com.sulake.iid::IIDHabbiconController'); }

    constructor() {
    }
}
