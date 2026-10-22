import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { GuildSelectorCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/GuildSelectorCatalogWidget';
import type { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import { GetGuildMembershipsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildMembershipsMessageComposer';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class GuildMembershipsController {
    static { registerClassName(this, 'com.sulake.habbo.catalog.guilds::GuildMembershipsController'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        GuildMembershipsController.#initStatics();
        return GuildMembershipsController._log;
    }

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
    }

    declare private _SafeStr_2885: GuildSelectorCatalogWidget;

    declare private _catalog: HabboCatalog;

    public get catalog(): HabboCatalog {
        return this._catalog;
    }

    public dispose(): void {
        this._catalog = null;
        this._SafeStr_2885 = null;
    }

    public registerGuildSelectorWidget(param1: GuildSelectorCatalogWidget): void {
        this._SafeStr_2885 = param1;
        this._catalog.connection.send(new GetGuildMembershipsMessageComposer());
    }

    public unregisterGuildSelectorWidget(param1: GuildSelectorCatalogWidget): void {
        if (this._SafeStr_2885 == param1) {
            this._SafeStr_2885 = null;
        } else {
            GuildMembershipsController._log.error("ERROR: Tried to unregister a nonregistered group selector catalog widget");
        }
    }

    public onGuildMembershipsMessageEvent(param1: GuildMembershipsMessageEvent): void {
        let _loc2_: any[] = param1.guilds.slice(0, param1.guilds.length);
        if (this._SafeStr_2885 && !this._SafeStr_2885.disposed) {
            this._SafeStr_2885.populateAndSelectFavorite(_loc2_);
            this._SafeStr_2885.selectFirstOffer();
        }
    }

    public onGuildVisualSettingsChanged(param1: number): void {
        if (this._SafeStr_2885 != null) {
            this._catalog.connection.send(new GetGuildMembershipsMessageComposer());
        }
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (GuildMembershipsController.#staticsReady) return;
        GuildMembershipsController.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(GuildMembershipsController, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.guilds.GuildMembershipsController"));
    }
}
