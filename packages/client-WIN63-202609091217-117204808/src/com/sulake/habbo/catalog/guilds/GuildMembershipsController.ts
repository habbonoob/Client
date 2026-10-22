import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { GuildSelectorCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/GuildSelectorCatalogWidget';
import type { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import { GetGuildMembershipsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildMembershipsMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';

export class GuildMembershipsController {
    static { registerClassName(this, 'com.sulake.habbo.catalog.guilds::GuildMembershipsController'); }

    declare private _catalog: HabboCatalog;

    declare private _SafeStr_2885: GuildSelectorCatalogWidget;

    constructor(param1: HabboCatalog) {
        this._catalog = param1;
    }

    public dispose(): void {
        this._catalog = null;
        this._SafeStr_2885 = null;
    }

    public get catalog(): HabboCatalog {
        return this._catalog;
    }

    public registerGuildSelectorWidget(param1: GuildSelectorCatalogWidget): void {
        this._SafeStr_2885 = param1;
        this._catalog.connection.send(new GetGuildMembershipsMessageComposer());
    }

    public unregisterGuildSelectorWidget(param1: GuildSelectorCatalogWidget): void {
        if (this._SafeStr_2885 == param1) {
            this._SafeStr_2885 = null;
        } else {
            Logger.log("ERROR: Tried to unregister a nonregistered group selector catalog widget");
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
}
