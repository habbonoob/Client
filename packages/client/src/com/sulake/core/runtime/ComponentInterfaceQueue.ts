import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class ComponentInterfaceQueue implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.runtime::ComponentInterfaceQueue'); }

    constructor(param1: IID) {
        this._identifier = param1;
        this._receivers = [];
        this._disposed = false;
    }

    declare private _identifier: IID;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _receivers: ((...args: any[]) => any)[];

    public get receivers(): ((...args: any[]) => any)[] {
        return this._receivers;
    }

    public get identifier(): IID {
        return this._identifier;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        if (!this._disposed) {
            this._disposed = true;
            this._identifier = null;
            while (this._receivers.length > 0) {
                this._receivers.pop();
            }
            this._receivers = null;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
