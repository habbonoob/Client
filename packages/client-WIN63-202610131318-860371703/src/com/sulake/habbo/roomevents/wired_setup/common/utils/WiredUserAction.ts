import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class WiredUserAction {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.common.utils::WiredUserAction'); }

    static #staticsReady = false;

    public static get allWiredUserActions(): WiredUserAction[] {
        WiredUserAction.#initStatics();
        return WiredUserAction.allWiredUserActions;
    }

    declare private _name: string;

    declare private _code: number;
    static { (this.prototype as any)._code = 0; }

    declare private _hasExtra: boolean;
    static { (this.prototype as any)._hasExtra = false; }

    declare private _extraIdToString: (...args: any[]) => any;

    declare private _SafeStr_6749: (...args: any[]) => any;

    constructor(param1: string, param2: number, param3: boolean = false, param4: (...args: any[]) => any = null, param5: (...args: any[]) => any = null) {
        this._name = param1;
        this._code = param2;
        this._hasExtra = param3;
        this._extraIdToString = param4;
        this._SafeStr_6749 = param5;
    }

    public get name(): string {
        return this._name;
    }

    public get code(): number {
        return this._code;
    }

    public get hasExtra(): boolean {
        return this._hasExtra;
    }

    public convertCodeToExtraString(param1: number): string {
        return stringOrNull(this._extraIdToString(param1));
    }

    public convertExtraStringToCode(param1: string): number {
        return this._SafeStr_6749(param1) | 0;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (WiredUserAction.#staticsReady) return;
        WiredUserAction.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(WiredUserAction, name, { value, writable: true, configurable: true, enumerable: true });
        set("allWiredUserActions", null);
        set("allWiredUserActions", [new WiredUserAction("wave", 0), new WiredUserAction("blow", 1), new WiredUserAction("laugh", 2), new WiredUserAction("respect", 3), new WiredUserAction("awake", 4), new WiredUserAction("sleep", 5), new WiredUserAction("sit", 6), new WiredUserAction("stand", 7), new WiredUserAction("lay", 8), new WiredUserAction("sign", 10, true, (param1: number): string => {
          return param1.toString();
      }, (param1: string): number => {
          return Number(param1) | 0;
      }), new WiredUserAction("dance", 11, true, (param1: number): string => {
          return "dance " + param1;
      }, (param1: string): number => {
          return Number(param1.split(" ")[1]) | 0;
      }), new WiredUserAction("67", 67)]);
    }
}
