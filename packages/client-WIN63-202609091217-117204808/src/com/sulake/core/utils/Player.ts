import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';

export class Player {
    static { registerClassName(this, 'com.sulake.core.utils::Player'); }

    static #staticsReady = false;

    private static get _majorVersion(): number {
        Player.#initStatics();
        return Player._majorVersion;
    }
    private static set _majorVersion(value: number) {
        Player.#initStatics();
        Player._majorVersion = value;
    }

    private static get _majorRevision(): number {
        Player.#initStatics();
        return Player._majorRevision;
    }
    private static set _majorRevision(value: number) {
        Player.#initStatics();
        Player._majorRevision = value;
    }

    private static get _operatingSystem(): string {
        Player.#initStatics();
        return Player._operatingSystem;
    }
    private static set _operatingSystem(value: string) {
        Player.#initStatics();
        Player._operatingSystem = value;
    }

    constructor() {
    }

    public static get majorVersion(): number {
        return Player._majorVersion;
    }

    public static get majorRevision(): number {
        return Player._majorRevision;
    }

    public static get operatingSystem(): string {
        return Player._operatingSystem;
    }

    private static init(): void {
        let _loc1_: string = Capabilities.version;
        let _loc3_: any[] = _loc1_.split(" ");
        let _loc2_: any[] = _loc3_[1].split(",");
        Player._operatingSystem = stringOrNull(_loc3_[0]);
        Player._majorVersion = parseInt(stringOrNull(_loc2_[0])) | 0;
        Player._majorRevision = parseInt(stringOrNull(_loc2_[1])) | 0;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (Player.#staticsReady) return;
        Player.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(Player, name, { value, writable: true, configurable: true, enumerable: true });
        set("_majorVersion", 0);
        set("_majorRevision", 0);
        set("_operatingSystem", null);
        set("_majorVersion", 0);
        set("_majorRevision", 0);
        set("_operatingSystem", null);
        Player.init();
    }
}
