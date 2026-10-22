import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';

export class RoomObjectUserTypes {
    static { registerClassName(this, 'com.sulake.habbo.room.object::RoomObjectUserTypes'); }

    static #staticsReady = false;

    public static get USER(): string {
        RoomObjectUserTypes.#initStatics();
        return RoomObjectUserTypes.USER;
    }

    public static get PET(): string {
        RoomObjectUserTypes.#initStatics();
        return RoomObjectUserTypes.PET;
    }

    public static get BOT(): string {
        RoomObjectUserTypes.#initStatics();
        return RoomObjectUserTypes.BOT;
    }

    public static get RENTABLE_BOT(): string {
        RoomObjectUserTypes.#initStatics();
        return RoomObjectUserTypes.RENTABLE_BOT;
    }

    public static get MONSTERPLANT(): string {
        RoomObjectUserTypes.#initStatics();
        return RoomObjectUserTypes.MONSTERPLANT;
    }

    private static get _SafeStr_3446(): Map<any, any> {
        RoomObjectUserTypes.#initStatics();
        return RoomObjectUserTypes._SafeStr_3446;
    }

    public static getTypeId(param1: string): number {
        return RoomObjectUserTypes._SafeStr_3446.get(param1) | 0;
    }

    public static getName(param1: number): string {
        for (const _loc2_ of RoomObjectUserTypes._SafeStr_3446?.keys() ?? []) {
            if (RoomObjectUserTypes._SafeStr_3446.get(_loc2_) == param1) {
                return stringOrNull(_loc2_);
            }
        }
        return null;
    }

    public static getVisualizationType(param1: string): string {
        switch (param1) {
            case "bot":
            case "rentable_bot":
                break;
            default:
                return param1;
        }
        return "user";
    }

    constructor() {
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomObjectUserTypes.#staticsReady) return;
        RoomObjectUserTypes.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomObjectUserTypes, name, { value, writable: true, configurable: true, enumerable: true });
        set("USER", null);
        set("PET", null);
        set("BOT", null);
        set("RENTABLE_BOT", null);
        set("MONSTERPLANT", null);
        set("_SafeStr_3446", null);
        set("USER", "user");
        set("PET", "pet");
        set("BOT", "bot");
        set("RENTABLE_BOT", "rentable_bot");
        set("MONSTERPLANT", "monsterplant");
        set("_SafeStr_3446", new Dictionary());
        RoomObjectUserTypes._SafeStr_3446.set("user", 1);
        RoomObjectUserTypes._SafeStr_3446.set("pet", 2);
        RoomObjectUserTypes._SafeStr_3446.set("bot", 3);
        RoomObjectUserTypes._SafeStr_3446.set("rentable_bot", 4);
    }
}
