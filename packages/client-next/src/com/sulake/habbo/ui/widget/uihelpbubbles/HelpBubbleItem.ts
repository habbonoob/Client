import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HelpBubbleItem {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.uihelpbubbles::HelpBubbleItem'); }

    declare private _name: string;

    declare private _text: string;

    declare private _icon: string;

    declare private _modal: boolean;
    static { (this.prototype as any)._modal = false; }

    constructor() {
    }

    public get text(): string {
        return this._text;
    }

    public set text(param1: string) {
        this._text = param1;
    }

    public get name(): string {
        return this._name;
    }

    public set name(param1: string) {
        this._name = param1;
    }

    public get icon(): string {
        return this._icon;
    }

    public set icon(param1: string) {
        this._icon = param1;
    }

    public get modal(): boolean {
        return this._modal;
    }

    public set modal(param1: boolean) {
        this._modal = param1;
    }
}
