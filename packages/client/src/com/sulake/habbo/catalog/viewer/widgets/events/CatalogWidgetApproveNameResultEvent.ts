import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetApproveNameResultEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetApproveNameResultEvent'); }

    constructor(param1: number, param2: string, param3: boolean = false, param4: boolean = false) {
        super("CWE_APPROVE_RESULT", param3, param4);
        this._result = param1;
        this._nameValidationInfo = param2;
    }

    declare private _result: number;
    static { (this.prototype as any)._result = 0; }

    declare private _nameValidationInfo: string;

    public get nameValidationInfo(): string {
        return this._nameValidationInfo;
    }

    public get result(): number {
        return this._result;
    }
}
