import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class _SafeCls_6028 {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::_SafeCls_6028'); }

    declare private _SafeStr_14053: number;
    static { (this.prototype as any)._SafeStr_14053 = 0; }

    declare private _count: number;
    static { (this.prototype as any)._count = 0; }

    constructor(param1: number, param2: number) {
        this._SafeStr_14053 = param1;
        this._count = param2;
    }

    public get rarityId(): number {
        return this._SafeStr_14053;
    }

    public get count(): number {
        return this._count;
    }
}
