import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IHabboTransitionalNavigator } from '@/com/sulake/habbo/navigator/IHabboTransitionalNavigator';
import type { IBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GetHabboGroupDetailsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetHabboGroupDetailsMessageComposer';
import { isIBadgeImageWidget } from '@/com/sulake/habbo/window/widgets/IBadgeImageWidget';

export class GuildInfoCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.navigator::GuildInfoCtrl'); }

    private static readonly GUILD_INFO_NAME: string = "guild_info";

    constructor(param1: IHabboTransitionalNavigator) {
        this._navigator = param1;
    }

    declare private _navigator: IHabboTransitionalNavigator;

    declare private _groupId: number;
    static { (this.prototype as any)._groupId = 0; }

    public get disposed(): boolean {
        return this._navigator == null;
    }

    public dispose(): void {
        this._navigator = null;
    }

    public refresh(param1: IWindowContainer, param2: GuestRoomData, param3: boolean = false): void {
        let _loc5_: IWindowContainer = castGuarded(param1.findChildByName("guild_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        if (_loc5_ == null) {
            _loc5_ = castGuarded(this._navigator.getXmlWindow("guild_info"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
            _loc5_.name = "guild_info";
            param1.addChild(_loc5_);
            _loc5_.addEventListener("WME_CLICK", this.onGuildInfo);
        }
        if (param2 == null || param2.habboGroupId < 1) {
            _loc5_.visible = false;
            return;
        }
        _loc5_.visible = true;
        this._navigator.registerParameter("navigator.guildbase", "groupName", param2.groupName);
        _loc5_.findChildByName("guild_base_txt").caption = this._navigator.getText("navigator.guildbase");
        let _loc4_: IBadgeImageWidget = asGuarded(castGuarded(param1.findChildByName("guild_badge"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow").widget, isIBadgeImageWidget);
        _loc4_.badgeId = param2.groupBadgeCode;
        _loc4_.groupId = param2.habboGroupId;
        this._groupId = param2.habboGroupId;
    }

    private onGuildInfo = (param1: WindowEvent): void => {
        this._navigator.send(new GetHabboGroupDetailsMessageComposer(this._groupId, true));
    };

    get [IDisposable](): true {
        return true;
    }
}
