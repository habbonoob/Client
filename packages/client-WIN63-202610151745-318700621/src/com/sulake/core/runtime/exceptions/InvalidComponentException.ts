import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';

export class InvalidComponentException extends Exception {
    static { registerClassName(this, 'com.sulake.core.runtime.exceptions::InvalidComponentException'); }

    constructor(param1: string) {
        super(param1);
    }
}
