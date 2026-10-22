import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetShowWarningTextEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetShowWarningTextEvent'); }

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("CWE_SHOW_WARNING_TEXT", param2, param3);
        this._text = param1;
    }

    declare private _text: string;

    public get text(): string {
        return this._text;
    }
}
