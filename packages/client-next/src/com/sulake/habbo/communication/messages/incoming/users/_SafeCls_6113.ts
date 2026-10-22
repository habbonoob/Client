import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6113 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::_SafeCls_6113'); }

    declare private _SafeStr_14797: number;
    static { (this.prototype as any)._SafeStr_14797 = 0; }

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    constructor(param1: number, param2: number) {
        this._SafeStr_14797 = param1;
        this._count = param2;
    }

    public get rarityId(): number {
        return this._SafeStr_14797;
    }

    public get count(): number {
        return this._count;
    }
}
