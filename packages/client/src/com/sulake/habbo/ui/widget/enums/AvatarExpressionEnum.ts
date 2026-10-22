import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class AvatarExpressionEnum {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.enums::AvatarExpressionEnum'); }

    static #staticsReady = false;

    public static get NONE(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum.NONE;
    }

    public static get WAVE(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum.WAVE;
    }

    public static get BLOW(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum.BLOW;
    }

    public static get LAUGH(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum.LAUGH;
    }

    public static get CRY(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum.CRY;
    }

    public static get _SafeStr_4392(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum._SafeStr_4392;
    }

    public static get JUMP(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum.JUMP;
    }

    public static get RESPECT(): AvatarExpressionEnum {
        AvatarExpressionEnum.#initStatics();
        return AvatarExpressionEnum.RESPECT;
    }

    constructor(param1: number) {
        this._ordinal = param1;
    }

    private _ordinal: number = 0;

    public get ordinal(): number {
        return this._ordinal;
    }

    public equals(param1: AvatarExpressionEnum): boolean {
        return !!(param1 && param1._ordinal == this._ordinal);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (AvatarExpressionEnum.#staticsReady) return;
        AvatarExpressionEnum.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(AvatarExpressionEnum, name, { value, writable: true, configurable: true, enumerable: true });
        set("NONE", null);
        set("WAVE", null);
        set("BLOW", null);
        set("LAUGH", null);
        set("CRY", null);
        set("_SafeStr_4392", null);
        set("JUMP", null);
        set("RESPECT", null);
        set("NONE", new AvatarExpressionEnum(0));
        set("WAVE", new AvatarExpressionEnum(1));
        set("BLOW", new AvatarExpressionEnum(2));
        set("LAUGH", new AvatarExpressionEnum(3));
        set("CRY", new AvatarExpressionEnum(4));
        set("_SafeStr_4392", new AvatarExpressionEnum(5));
        set("JUMP", new AvatarExpressionEnum(6));
        set("RESPECT", new AvatarExpressionEnum(7));
    }
}
