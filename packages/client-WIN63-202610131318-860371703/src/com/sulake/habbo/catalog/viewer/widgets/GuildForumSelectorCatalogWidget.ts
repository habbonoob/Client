import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuildMembershipsController } from '@/com/sulake/habbo/catalog/guilds/GuildMembershipsController';
import type { HabboGroupEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupEntryData';
import { CatalogWidgetShowWarningTextEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetShowWarningTextEvent';
import { GuildSelectorCatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/GuildSelectorCatalogWidget';

export class GuildForumSelectorCatalogWidget extends GuildSelectorCatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::GuildForumSelectorCatalogWidget'); }

    constructor(param1: IWindowContainer, param2: GuildMembershipsController) {
        super(param1, param2);
    }

    protected override filterGroupMemberships(param1: any[]): any[] {
        let _loc2_: any[] = [];
        let _loc4_: number = this._SafeStr_3389.catalog.sessionDataManager.userId;
        let _loc3_: boolean = this._SafeStr_3389.catalog.sessionDataManager.hasSecurity(4);
        for (const _loc5_ of param1 ?? []) {
            if (!(!_loc5_.hasForum && _loc5_.ownerId != _loc4_ && !_loc3_)) {
                _loc2_.push(_loc5_);
            }
        }
        return _loc2_;
    }

    protected override selectGroup(param1: HabboGroupEntryData): void {
        super.selectGroup(param1);
        this.events.dispatchEvent(new CatalogWidgetShowWarningTextEvent(param1.hasForum ? "${catalog.alert.group_has_forum}" : ""));
    }
}
