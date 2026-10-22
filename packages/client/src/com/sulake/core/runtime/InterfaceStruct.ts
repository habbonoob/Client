import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import { getQualifiedClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class InterfaceStruct implements IDisposable {
    static { registerClassName(this, 'com.sulake.core.runtime::InterfaceStruct'); }

    constructor(param1: IID, param2: IUnknown) {
        this._iid = param1;
        this._iis = getQualifiedClassName(this._iid);
        this._unknown = param2;
        this._references = 0;
    }

    declare private _iid: IID;

    declare private _unknown: IUnknown;

    declare private _iis: string;

    public get iis(): string {
        return this._iis;
    }

    declare private _references: number;
    static { (this.prototype as any)._references = 0; }

    public get references(): number {
        return this._references;
    }

    public get iid(): IID {
        return this._iid;
    }

    public get unknown(): IUnknown {
        return this._unknown;
    }

    public get disposed(): boolean {
        return this._unknown == null;
    }

    public dispose(): void {
        this._iid = null;
        this._iis = null;
        this._unknown = null;
        this._references = 0;
    }

    public reserve(): number {
        return ++this._references;
    }

    public release(): number {
        return (this.references > 0 ? --this._references : 0) >>> 0;
    }

    get [IDisposable](): true {
        return true;
    }
}
