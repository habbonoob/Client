import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class SetExtraPurchaseParameterEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::SetExtraPurchaseParameterEvent'); }

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("CWE_SET_EXTRA_PARM", param2, param3);
        this._parameter = param1;
    }

    declare private _parameter: string;

    public get parameter(): string {
        return this._parameter;
    }
}
