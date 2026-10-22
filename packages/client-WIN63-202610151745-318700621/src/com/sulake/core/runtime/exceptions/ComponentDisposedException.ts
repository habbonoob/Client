import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';

export class ComponentDisposedException extends Exception {
    static { registerClassName(this, 'com.sulake.core.runtime.exceptions::ComponentDisposedException'); }

    constructor(param1: string) {
        super(param1);
    }
}
