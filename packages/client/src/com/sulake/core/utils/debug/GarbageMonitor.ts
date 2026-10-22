import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class GarbageMonitor implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.utils.debug::GarbageMonitor'); }

    constructor() {
        this._SafeStr_3737 = new Dictionary();
    }

    declare private _SafeStr_3737: Map<any, any>;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get list(): any[] {
        let _loc1_: any[] = [];
        for (const _loc2_ of this._SafeStr_3737?.values() ?? []) {
            _loc1_.push(_loc2_);
        }
        return _loc1_;
    }

    public dispose(): void {
        if (!this._disposed) {
            for (const _loc1_ of this._SafeStr_3737?.values() ?? []) {
                this._SafeStr_3737.delete(_loc1_);
            }
            this._SafeStr_3737 = null;
            this._disposed = true;
        }
    }

    public insert(param1: any, param2: string = null): void {
        this._SafeStr_3737.set(param1, param2 == null ? param1.toString() : param2);
    }

    get [IDisposable](): true {
        return true;
    }
}
