import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class HabboActivityState {
    static { registerClassName(this, 'com.sulake.habbo.discord.habbo_activity::HabboActivityState'); }

    static #staticsReady = false;

    public static get CHILLING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.CHILLING;
    }

    public static get GAMING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.GAMING;
    }

    public static get WORKING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.WORKING;
    }

    public static get RPG(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.RPG;
    }

    public static get PARTYING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.PARTYING;
    }

    public static get TRADING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.TRADING;
    }

    public static get DANCING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.DANCING;
    }

    public static get BUILDING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.BUILDING;
    }

    public static get CREATING_WIRED(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.CREATING_WIRED;
    }

    public static get CHATTING(): HabboActivityState {
        HabboActivityState.#initStatics();
        return HabboActivityState.CHATTING;
    }

    constructor(param1: string, param2: number) {
        this._name = param1;
        this._rank = param2;
    }

    declare private _rank: number;
    static { (this.prototype as any)._rank = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get rank(): number {
        return this._rank;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HabboActivityState.#staticsReady) return;
        HabboActivityState.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HabboActivityState, name, { value, writable: true, configurable: true, enumerable: true });
        set("CHILLING", null);
        set("GAMING", null);
        set("WORKING", null);
        set("RPG", null);
        set("PARTYING", null);
        set("TRADING", null);
        set("DANCING", null);
        set("BUILDING", null);
        set("CREATING_WIRED", null);
        set("CHATTING", null);
        set("CHILLING", new HabboActivityState("chilling", 0));
        set("GAMING", new HabboActivityState("gaming", 104));
        set("WORKING", new HabboActivityState("working", 103));
        set("RPG", new HabboActivityState("rpg", 102));
        set("PARTYING", new HabboActivityState("partying", 100));
        set("TRADING", new HabboActivityState("trading", 202));
        set("DANCING", new HabboActivityState("dancing", 201));
        set("BUILDING", new HabboActivityState("building", 300));
        set("CREATING_WIRED", new HabboActivityState("creating_wired", 301));
        set("CHATTING", new HabboActivityState("chatting", 101));
    }
}
