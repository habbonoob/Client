import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class TradingNameScamDetectionResult {
    static { registerClassName(this, 'com.sulake.habbo.inventory.trading.namescam::TradingNameScamDetectionResult'); }

    static #staticsReady = false;

    public static get NO_MATCHES(): TradingNameScamDetectionResult {
        TradingNameScamDetectionResult.#initStatics();
        return TradingNameScamDetectionResult.NO_MATCHES;
    }

    declare private _similarInRoom: any[];

    declare private _SafeStr_14307: any[];

    constructor(param1: any[], param2: any[]) {
        this._similarInRoom = param1 != null ? param1.slice() : [];
        this._SafeStr_14307 = param2 != null ? param2.slice() : [];
    }

    public get nameScamDetected(): boolean {
        return this._similarInRoom.length > 0 || this._SafeStr_14307.length > 0;
    }

    public get similarInRoom(): any[] {
        return this._similarInRoom.slice();
    }

    public get similarInFriends(): any[] {
        return this._SafeStr_14307.slice();
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (TradingNameScamDetectionResult.#staticsReady) return;
        TradingNameScamDetectionResult.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(TradingNameScamDetectionResult, name, { value, writable: true, configurable: true, enumerable: true });
        set("NO_MATCHES", null);
        set("NO_MATCHES", new TradingNameScamDetectionResult(null, null));
    }
}
