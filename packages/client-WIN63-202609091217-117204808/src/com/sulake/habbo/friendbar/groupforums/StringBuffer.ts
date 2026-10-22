import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class StringBuffer {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.groupforums::StringBuffer'); }

    static #staticsReady = false;

    private static get GT_CHAR(): number {
        StringBuffer.#initStatics();
        return StringBuffer.GT_CHAR;
    }

    private static get LT_CHAR(): number {
        StringBuffer.#initStatics();
        return StringBuffer.LT_CHAR;
    }

    private buffer: any[] = [];

    constructor() {
    }

    public addEscaped(param1: string): StringBuffer {
        let _loc3_: number = NaN;
        let _loc2_: number = NaN;
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc2_ = param1.charCodeAt(_loc3_);
            switch (_loc2_) {
                case StringBuffer.LT_CHAR:
                    this.add("&lt;");
                    break;
                case StringBuffer.GT_CHAR:
                    this.add("&gt;");
                    break;
                default:
                    this.buffer.push(_loc2_);
            }
            _loc3_++;
        }
        return this;
    }

    public add(param1: string): StringBuffer {
        let _loc2_: number = NaN;
        _loc2_ = 0;
        while (_loc2_ < param1.length) {
            this.buffer.push(param1.charCodeAt(_loc2_));
            _loc2_++;
        }
        return this;
    }

    public toString(): string {
        return stringOrNull(Reflect.apply(String.fromCharCode, this, this.buffer));
    }

    public get length(): number {
        return this.buffer.length | 0;
    }

    public reset(): void {
        this.buffer = [];
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (StringBuffer.#staticsReady) return;
        StringBuffer.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(StringBuffer, name, { value, writable: true, configurable: true, enumerable: true });
        set("GT_CHAR", NaN);
        set("LT_CHAR", NaN);
        set("GT_CHAR", ">".charCodeAt(0));
        set("LT_CHAR", "<".charCodeAt(0));
    }
}
