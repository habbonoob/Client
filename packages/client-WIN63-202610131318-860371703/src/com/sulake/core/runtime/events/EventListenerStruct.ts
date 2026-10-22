import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class EventListenerStruct {
    static { registerClassName(this, 'com.sulake.core.runtime.events::EventListenerStruct'); }

    declare private _SafeStr_2393: Map<any, any>;

    declare public useCapture: boolean;
    static { (this.prototype as any).useCapture = false; }

    declare public priority: number;
    static { (this.prototype as any).priority = 0; }

    declare public useWeakReference: boolean;
    static { (this.prototype as any).useWeakReference = false; }

    constructor(param1: (...args: any[]) => any, param2: boolean = false, param3: number = 0, param4: boolean = false) {
        this._SafeStr_2393 = new Dictionary();
        this.callback = param1;
        this.useCapture = param2;
        this.priority = param3;
        this.useWeakReference = param4;
    }

    public set callback(param1: (...args: any[]) => any) {
        for (const _loc2_ of this._SafeStr_2393?.keys() ?? []) {
            this._SafeStr_2393.delete(_loc2_);
        }
        this._SafeStr_2393.set(param1, null);
    }

    public get callback(): (...args: any[]) => any {
        let _loc3_: number = 0;
        let _loc2_: Map<any, any> = this._SafeStr_2393;
        for (const _loc1_ of _loc2_?.keys() ?? []) {
            return typeof _loc1_ === "function" ? _loc1_ : null;
        }
        return null;
    }
}
