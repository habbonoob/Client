import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IID } from '@/com/sulake/core/runtime/IID';

export class ComponentDependency {
    static { registerClassName(this, 'com.sulake.core.runtime::ComponentDependency'); }

    constructor(param1: IID, param2: (...args: any[]) => any, param3: boolean = true, param4: any[] = null) {
        this._identifier = param1;
        this._dependencySetter = param2;
        this._isRequired = param3;
        this._eventListeners = param4;
    }

    declare private _identifier: IID;

    declare private _dependencySetter: (...args: any[]) => any;

    declare private _isRequired: boolean;
    static { (this.prototype as any)._isRequired = false; }

    declare private _eventListeners: any[];

    public get eventListeners(): any[] {
        return this._eventListeners;
    }

    public get identifier(): IID {
        return this._identifier;
    }

    public get dependencySetter(): (...args: any[]) => any {
        return this._dependencySetter;
    }

    public get isRequired(): boolean {
        return this._isRequired;
    }
}
