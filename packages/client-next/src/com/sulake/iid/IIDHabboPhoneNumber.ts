import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class IIDHabboPhoneNumber implements IID {
    static { registerClassName(this, 'com.sulake.iid::IIDHabboPhoneNumber'); }

    constructor() {
    }
}
