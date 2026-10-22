import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';

export class SectionParam {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.params::SectionParam'); }

    static #staticsReady = false;

    public static _SafeStr_7491: number = 0;
    public static _SafeStr_7511: number = 1;
    public static _SafeStr_7507: number = 2;

    public static get DEFAULT(): SectionParam {
        SectionParam.#initStatics();
        return SectionParam.DEFAULT;
    }
    public static set DEFAULT(value: SectionParam) {
        SectionParam.#initStatics();
        SectionParam.DEFAULT = value;
    }

    public static get COLLAPSED(): SectionParam {
        SectionParam.#initStatics();
        return SectionParam.COLLAPSED;
    }
    public static set COLLAPSED(value: SectionParam) {
        SectionParam.#initStatics();
        SectionParam.COLLAPSED = value;
    }

    public static get EXPANDED(): SectionParam {
        SectionParam.#initStatics();
        return SectionParam.EXPANDED;
    }
    public static set EXPANDED(value: SectionParam) {
        SectionParam.#initStatics();
        SectionParam.EXPANDED = value;
    }

    constructor(param1: SourceTypeSelectorParam = null, param2: number = 0, param3: WiredUIPreset = null, param4: number = 0) {
        this._expandMode = param2;
        this._sourceTypeSelectorParam = param1;
        this._headerOptionLeft = param3;
        this._titleYOffset = param4;
    }

    private _miscHeaderOptions: any[] = [];

    declare private _sourceTypeSelectorParam: SourceTypeSelectorParam;

    declare private _expandMode: number;
    static { (this.prototype as any)._expandMode = 0; }

    public get expandMode(): number {
        return this._expandMode;
    }

    public set expandMode(param1: number) {
        this._expandMode = param1;
    }

    declare private _headerOptionLeft: WiredUIPreset;

    public get headerOptionLeft(): WiredUIPreset {
        return this._headerOptionLeft;
    }

    declare private _titleYOffset: number;
    static { (this.prototype as any)._titleYOffset = 0; }

    public get titleYOffset(): number {
        return this._titleYOffset;
    }

    public get sourceTypeSelectorParam(): SourceTypeSelectorParam {
        return this._sourceTypeSelectorParam;
    }

    public set sourceTypeSelectorParam(param1: SourceTypeSelectorParam) {
        this._sourceTypeSelectorParam = param1;
    }

    public get miscHeaderOptions(): any[] {
        return this._miscHeaderOptions;
    }

    public addHeaderOption(param1: WiredUIPreset): void {
        this._miscHeaderOptions.push(param1);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SectionParam.#staticsReady) return;
        SectionParam.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SectionParam, name, { value, writable: true, configurable: true, enumerable: true });
        set("DEFAULT", null);
        set("COLLAPSED", null);
        set("EXPANDED", null);
        set("DEFAULT", new SectionParam(null, 0));
        set("COLLAPSED", new SectionParam(null, 1));
        set("EXPANDED", new SectionParam(null, 2));
    }
}
