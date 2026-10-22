import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { EventDispatcher } from '@habbo-pixi/runtime/events/EventDispatcher';
import type { StatusEvent } from '@habbo-pixi/runtime/events/StatusEvent';
import { ExtensionContext } from '@habbo-pixi/runtime/external/ExtensionContext';
import { ArgumentError } from '@habbo-pixi/runtime/lang/ArgumentError';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { DiscordRichPresenceEvent } from '@/com/sulake/discord/events/DiscordRichPresenceEvent';

export class DiscordRichPresence extends EventDispatcher {
    static { registerClassName(this, 'com.sulake.discord::DiscordRichPresence'); }

    static #staticsReady = false;

    private static readonly _SafeStr_7913: string = "com.sulake.discord.richpresence";
    private static _instance: DiscordRichPresence;
    public static readonly _SafeStr_8459: string = "DISCORD_CONNECTED";
    public static readonly _SafeStr_8560: string = "DISCORD_ERROR";
    public static readonly _SafeStr_8175: string = "DISCORD_SHUTDOWN";
    public static readonly EVENT_ACTIVITY_JOIN: string = "DISCORD_ACTIVITY_JOIN";
    public static readonly EVENT_ACTIVITY_JOIN_REQUEST: string = "DISCORD_ACTIVITY_JOIN_REQUEST";
    public static readonly _SafeStr_8321: string = "DISCORD_ACTIVITY_SPECTATE";

    private static get IS_SUPPORTED(): boolean {
        DiscordRichPresence.#initStatics();
        return DiscordRichPresence.IS_SUPPORTED;
    }

    declare private _context: ExtensionContext;

    declare private _SafeStr_4580: boolean;
    static { (this.prototype as any)._SafeStr_4580 = false; }

    constructor() {
        super();
        if (DiscordRichPresence._instance) {
            throw new Error("DiscordRichPresence is a singleton. Use DiscordRichPresence.instance instead.");
        }
        this._SafeStr_4580 = DiscordRichPresence.IS_SUPPORTED;
        if (this._SafeStr_4580) {
            this._context = ExtensionContext.createExtensionContext("com.sulake.discord.richpresence", null);
            if (this._context) {
                this._context.addEventListener("status", this.forwardStatusEvent);
            } else {
                this._SafeStr_4580 = false;
            }
        }
        DiscordRichPresence._instance = this;
    }

    public static get instance(): DiscordRichPresence {
        if (!DiscordRichPresence._instance) {
            DiscordRichPresence._instance = new DiscordRichPresence();
        }
        return DiscordRichPresence._instance;
    }

    public static get isSupported(): boolean {
        return DiscordRichPresence.IS_SUPPORTED;
    }

    private static isDesktopSupported(): boolean {
        let _loc1_: string = Capabilities.version;
        return _loc1_.indexOf("WIN") == 0 || _loc1_.indexOf("MAC") == 0;
    }

    public dispose(): void {
        if (this._context) {
            this._context.removeEventListener("status", this.forwardStatusEvent);
            this._context.dispose();
            this._context = null;
        }
        DiscordRichPresence._instance = null;
    }

    public initialize(param1: string): boolean {
        if (!param1 || param1.length == 0) {
            throw new ArgumentError("clientId must be a non-empty string.");
        }
        return Boolean(this.callContext("initialize", param1));
    }

    public updatePresence(param1: any): boolean {
        let _loc2_: string = param1 ? JSON.stringify(param1) : "{}";
        return Boolean(this.callContext("updatePresence", _loc2_));
    }

    public clearPresence(): boolean {
        return Boolean(this.callContext("clearPresence"));
    }

    public shutdown(): boolean {
        return Boolean(this.callContext("shutdown"));
    }

    public respondToJoinRequest(param1: string, param2: boolean): boolean {
        if (!param1 || param1.length == 0) {
            throw new ArgumentError("userId must be a non-empty string.");
        }
        return Boolean(this.callContext("respondJoinRequest", param1, param2));
    }

    public addStatusListener(param1: (...args: any[]) => any, param2: boolean = false): void {
        this.addEventListener("status", param1, false, 0, param2);
    }

    public removeStatusListener(param1: (...args: any[]) => any): void {
        this.removeEventListener("status", param1);
    }

    public addJoinListener(param1: (...args: any[]) => any, param2: boolean = false): void {
        this.addEventListener("discordActivityJoin", param1, false, 0, param2);
    }

    public removeJoinListener(param1: (...args: any[]) => any): void {
        this.removeEventListener("discordActivityJoin", param1);
    }

    public addJoinRequestListener(param1: (...args: any[]) => any, param2: boolean = false): void {
        this.addEventListener("discordActivityJoinRequest", param1, false, 0, param2);
    }

    public removeJoinRequestListener(param1: (...args: any[]) => any): void {
        this.removeEventListener("discordActivityJoinRequest", param1);
    }

    public addSpectateListener(param1: (...args: any[]) => any, param2: boolean = false): void {
        this.addEventListener("discordActivitySpectate", param1, false, 0, param2);
    }

    public removeSpectateListener(param1: (...args: any[]) => any): void {
        this.removeEventListener("discordActivitySpectate", param1);
    }

    private callContext(param1: string, ...rest: any[]): any {
        if (!this._SafeStr_4580) {
            return false;
        }
        if (!this._context) {
            throw new Error("Extension context has been disposed.");
        }
        return Reflect.apply(this._context.call, this._context, [param1].concat(rest));
    }

    private forwardStatusEvent = (param1: StatusEvent): void => {
        this.dispatchEvent(param1);
        switch (param1.code) {
            case "DISCORD_ACTIVITY_JOIN":
                this.dispatchJoinEvent(param1.level);
                break;
            case "DISCORD_ACTIVITY_JOIN_REQUEST":
                this.dispatchJoinRequestEvent(param1.level);
                break;
            case "DISCORD_ACTIVITY_SPECTATE":
                this.dispatchSpectateEvent(param1.level);
        }
    };

    private dispatchJoinEvent(param1: string): void {
        let _loc2_: any = this.extractPayloadData(param1);
        if (!_loc2_ || !_loc2_.secret) {
            return;
        }
        let _loc3_: DiscordRichPresenceEvent = new DiscordRichPresenceEvent("discordActivityJoin", stringOrNull(_loc2_.secret), null, _loc2_);
        this.dispatchEvent(_loc3_);
    }

    private dispatchJoinRequestEvent(param1: string): void {
        let _loc3_: any = this.extractPayloadData(param1);
        if (!_loc3_ || !_loc3_.user) {
            return;
        }
        let _loc2_: DiscordRichPresenceEvent = new DiscordRichPresenceEvent("discordActivityJoinRequest", stringOrNull(_loc3_.secret ? _loc3_.secret : ""), _loc3_.user, _loc3_);
        this.dispatchEvent(_loc2_);
    }

    private dispatchSpectateEvent(param1: string): void {
        let _loc2_: any = this.extractPayloadData(param1);
        if (!_loc2_ || !_loc2_.secret) {
            return;
        }
        let _loc3_: DiscordRichPresenceEvent = new DiscordRichPresenceEvent("discordActivitySpectate", stringOrNull(_loc2_.secret), null, _loc2_);
        this.dispatchEvent(_loc3_);
    }

    private extractPayloadData(param1: string): any {
        if (!param1 || param1.length == 0) {
            return null;
        }
        let _loc2_: any = this.safeParse(param1);
        if (!_loc2_ || !_loc2_.data) {
            return null;
        }
        return _loc2_.data;
    }

    private safeParse(param1: string): any {
        let _loc4_: any;
        try {
            return JSON.parse(param1);
        } catch (error) {
            _loc4_ = null;
        }
        return _loc4_;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (DiscordRichPresence.#staticsReady) return;
        DiscordRichPresence.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(DiscordRichPresence, name, { value, writable: true, configurable: true, enumerable: true });
        set("IS_SUPPORTED", false);
        set("IS_SUPPORTED", DiscordRichPresence.isDesktopSupported());
    }
}
