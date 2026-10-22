import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class ComponentDependency {
    static { registerClassName(this, 'com.sulake.core.runtime::ComponentDependency'); }

    declare private _identifier: IID;

    declare private _SafeStr_6642: (...args: any[]) => any;

    declare private _SafeStr_6676: boolean;
    static { (this.prototype as any)._SafeStr_6676 = false; }

    declare private _eventListeners: any[];

    constructor(param1: IID, param2: (...args: any[]) => any, param3: boolean = true, param4: any[] = null) {
        this._identifier = param1;
        this._SafeStr_6642 = param2;
        this._SafeStr_6676 = param3;
        this._eventListeners = param4;
    }

    public get identifier(): IID {
        return this._identifier;
    }

    public get dependencySetter(): (...args: any[]) => any {
        return this._SafeStr_6642;
    }

    public get isRequired(): boolean {
        return this._SafeStr_6676;
    }

    public get eventListeners(): any[] {
        return this._eventListeners;
    }
}
