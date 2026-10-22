import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { WarningEvent } from '@/com/sulake/core/runtime/events/WarningEvent';

export class ErrorEvent extends WarningEvent {
    static { registerClassName(this, 'com.sulake.core.runtime.events::ErrorEvent'); }

    constructor(param1: string, param2: string, param3: boolean, param4: number, param5: Error = null) {
        super(param1, param2);
        this._critical = param3;
        this._category = param4;
        this._error = param5;
    }

    declare protected _category: number;
    static { (this.prototype as any)._category = 0; }

    declare protected _critical: boolean;
    static { (this.prototype as any)._critical = false; }

    declare protected _error: Error;

    public get category(): number {
        return this._category;
    }

    public get critical(): boolean {
        return this._critical;
    }

    public get error(): Error {
        return this._error;
    }
}
