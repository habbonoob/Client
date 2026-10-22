import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class Set implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils::Set'); }

    declare private _length: number;
    static { (this.prototype as any)._length = 0; }

    declare private _SafeStr_2393: Map<any, any>;

    constructor() {
        this._length = 0;
        this._SafeStr_2393 = new Dictionary();
    }

    public get length(): number {
        return this._length;
    }

    public get disposed(): boolean {
        return this._SafeStr_2393 == null;
    }

    public dispose(): void {
        this._SafeStr_2393 = null;
        this._length = 0;
    }

    public reset(): void {
        this._SafeStr_2393 = new Dictionary();
        this._length = 0;
    }

    public isEmpty(): boolean {
        return this._length == 0;
    }

    public add(param1: any): boolean {
        if (this._SafeStr_2393.has(param1)) {
            return false;
        }
        this._SafeStr_2393.set(param1, true);
        this._length = this._length + 1 >>> 0;
        return true;
    }

    public remove(param1: any): boolean {
        if (!(this._SafeStr_2393.has(param1))) {
            return false;
        }
        this._SafeStr_2393.delete(param1);
        this._length = this._length - 1 >>> 0;
        return true;
    }

    public contains(param1: any): boolean {
        return this._SafeStr_2393.has(param1);
    }

    public toArray(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._SafeStr_2393?.keys() ?? []) {
            _loc1_.push(_loc2_);
        }
        return _loc1_;
    }

    get [IDisposable](): true {
        return true;
    }
}
