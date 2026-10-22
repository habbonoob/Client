import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ILazyAsset } from '@/com/sulake/core/assets/ILazyAsset';
import { Core } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';

export class LazyAssetProcessor implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.core.assets::LazyAssetProcessor'); }

    private _SafeStr_2906: ILazyAsset[] = [];
    private _running: boolean = false;
    private _disposed: boolean = false;

    constructor() {
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            Core.instance.removeUpdateReceiver(this);
            this._SafeStr_2906 = null;
            this._running = false;
            this._disposed = true;
        }
    }

    public push(param1: ILazyAsset): void {
        if (param1) {
            this._SafeStr_2906.push(param1);
            if (!this._running) {
                Core.instance.registerUpdateReceiver(this, 2);
                this._running = true;
            }
        }
    }

    public flush(): void {
        for (const _loc1_ of this._SafeStr_2906 ?? []) {
            if (!_loc1_.disposed) {
                _loc1_.prepareLazyContent();
            }
        }
        this._SafeStr_2906 = [];
        if (this._running) {
            Core.instance.removeUpdateReceiver(this);
            this._running = false;
        }
    }

    public update(param1: number): void {
        let _loc2_: ILazyAsset = this._SafeStr_2906.shift();
        if (!_loc2_) {
            if (this._running) {
                Core.instance.removeUpdateReceiver(this);
                this._running = false;
            }
        } else if (!_loc2_.disposed) {
            _loc2_.prepareLazyContent();
        }
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
