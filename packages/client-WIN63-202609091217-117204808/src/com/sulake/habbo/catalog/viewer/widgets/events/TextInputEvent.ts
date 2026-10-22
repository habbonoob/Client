import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Event } from '@habbo-pixi/runtime/events/Event';

export class TextInputEvent extends Event {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.events::TextInputEvent'); }

    declare private _text: string;

    constructor(param1: string, param2: boolean = false, param3: boolean = false) {
        super("TEXT_INPUT", param2, param3);
        this._text = param1;
    }

    public get text(): string {
        return this._text;
    }
}
