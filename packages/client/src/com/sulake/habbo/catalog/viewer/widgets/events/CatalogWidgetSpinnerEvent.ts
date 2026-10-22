import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetSpinnerEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetSpinnerEvent'); }

    public static readonly VALUE_CHANGED: string = "CWSE_VALUE_CHANGED";
    public static readonly RESET: string = "CWSE_RESET";
    public static readonly SHOW: string = "CWSE_SHOW";
    public static readonly HIDE: string = "CWSE_HIDE";
    public static readonly _SafeStr_8197: string = "CWSE_SET_MAX";
    public static readonly SET_MIN: string = "CWSE_SET_MIN";

    constructor(param1: string, param2: number = 1, param3: any[] = null) {
        super(param1);
        this._value = param2;
        this._skipSteps = param3;
    }

    declare private _value: number;
    static { (this.prototype as any)._value = 0; }

    declare private _skipSteps: any[];

    public get value(): number {
        return this._value;
    }

    public get skipSteps(): any[] {
        return this._skipSteps;
    }
}
