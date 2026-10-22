import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class VideoOfferTypeEnum {
    static { registerClassName(this, 'com.sulake.habbo.catalog.enum::VideoOfferTypeEnum'); }

    static #staticsReady = false;

    public static get CREDIT(): VideoOfferTypeEnum {
        VideoOfferTypeEnum.#initStatics();
        return VideoOfferTypeEnum.CREDIT;
    }

    public static get SNOWWAR(): VideoOfferTypeEnum {
        VideoOfferTypeEnum.#initStatics();
        return VideoOfferTypeEnum.SNOWWAR;
    }

    private _value: number = 0;

    constructor(param1: number) {
        this._value = param1;
    }

    public get value(): number {
        return this._value;
    }

    public equals(param1: VideoOfferTypeEnum): boolean {
        return !!(param1 && param1._value == this._value);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (VideoOfferTypeEnum.#staticsReady) return;
        VideoOfferTypeEnum.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(VideoOfferTypeEnum, name, { value, writable: true, configurable: true, enumerable: true });
        set("CREDIT", null);
        set("SNOWWAR", null);
        set("CREDIT", new VideoOfferTypeEnum(0));
        set("SNOWWAR", new VideoOfferTypeEnum(1));
    }
}
