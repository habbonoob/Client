import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetToggleEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetToggleEvent'); }

    declare private _widgetId: string;

    declare private _enabled: boolean;
    static { (this.prototype as any)._enabled = false; }

    constructor(param1: string, param2: boolean, param3: boolean = false, param4: boolean = false) {
        super("CWE_TOGGLE", param3, param4);
        this._widgetId = param1;
        this._enabled = param2;
    }

    public get widgetId(): string {
        return this._widgetId;
    }

    public get enabled(): boolean {
        return this._enabled;
    }
}
