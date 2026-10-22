import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class IIDSessionDataManager implements IID {
    static { registerClassName(this, 'com.sulake.iid::IIDSessionDataManager'); }

    constructor() {
    }
}
