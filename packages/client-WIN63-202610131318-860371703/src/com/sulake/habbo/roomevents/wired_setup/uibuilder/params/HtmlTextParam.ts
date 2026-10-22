import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class HtmlTextParam extends TextParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::HtmlTextParam'); }

    static #staticsReady = false;

    public static get DEFAULT_HtmlTextParam(): HtmlTextParam {
        HtmlTextParam.#initStatics();
        return HtmlTextParam.DEFAULT_HtmlTextParam;
    }

    declare private _selectable: boolean;
    static { (this.prototype as any)._selectable = false; }

    constructor(param1: number, param2: boolean = false, param3: number = 0) {
        super(param1, false, param3);
        this._selectable = param2;
    }

    public get selectable(): boolean {
        return this._selectable;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HtmlTextParam.#staticsReady) return;
        HtmlTextParam.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HtmlTextParam, name, { value, writable: true, configurable: true, enumerable: true });
        set("DEFAULT_HtmlTextParam", null);
        set("DEFAULT_HtmlTextParam", new HtmlTextParam(1));
    }
}
