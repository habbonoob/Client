import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class CatalogWidgetColourIndexEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::CatalogWidgetColourIndexEvent'); }

    constructor(param1: number, param2: boolean = false, param3: boolean = false) {
        super("COLOUR_INDEX", param2, param3);
        this._index = param1;
    }

    private _index: number = 0;

    public get index(): number {
        return this._index;
    }
}
