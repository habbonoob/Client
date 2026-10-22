import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuildMembershipsController } from '@/com/sulake/habbo/catalog/guilds/GuildMembershipsController';
import type { CatalogWidgetGuildSelectedEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetGuildSelectedEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class GuildBadgeViewCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::GuildBadgeViewCatalogWidget'); }

    declare private _SafeStr_3389: GuildMembershipsController;

    constructor(param1: IWindowContainer, param2: GuildMembershipsController) {
        super(param1);
        this._SafeStr_3389 = param2;
    }

    public override dispose(): void {
        if (!this.disposed) {
            this._SafeStr_3389 = null;
            super.dispose();
        }
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("guildBadgeViewWidget");
        this.events.addEventListener("GUILD_SELECTED", this.onGuildSelected);
        return true;
    }

    private onGuildSelected = (param1: CatalogWidgetGuildSelectedEvent): void => {
        if (this.disposed) {
            return;
        }
        let _loc2_: IBadgeImageWidget = asGuarded(castGuarded(this._window.findChildByName("badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        if (_loc2_ != null) {
            _loc2_.badgeId = param1.badgeCode;
            _loc2_.groupId = param1.guildId;
        }
    };
}
