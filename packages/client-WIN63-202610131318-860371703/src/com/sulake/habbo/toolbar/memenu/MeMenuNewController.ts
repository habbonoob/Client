import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { BottomBarLeft } from '@/com/sulake/habbo/toolbar/BottomBarLeft';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import type { MeMenuSettingsMenuView } from '@/com/sulake/habbo/toolbar/memenu/MeMenuSettingsMenuView';
import { GetTalentTrackMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/talent/GetTalentTrackMessageComposer';
import { GetExtendedProfileMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetExtendedProfileMessageComposer';
import { AbstractSubMenuController } from '@/com/sulake/habbo/toolbar/abstractsubmenu/AbstractSubMenuController';
import { MeMenuNewIconLoader } from '@/com/sulake/habbo/toolbar/memenu/MeMenuNewIconLoader';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class MeMenuNewController extends AbstractSubMenuController {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.memenu::MeMenuNewController'); }

    public static readonly USE_GUIDE_TOOL: string = "USE_GUIDE_TOOL";

    declare private _SafeStr_5086: MeMenuNewIconLoader;

    declare private _SafeStr_2606: MeMenuSettingsMenuView;

    constructor(param1: HabboToolbar, param2: BottomBarLeft) {
        super(param1, param2, "me_menu_new_view_xml", "HTIE_ICON_MEMENU");
        if (!param1.getBoolean("guides.enabled")) {
            this.setGuideToolVisibility(false);
        }
        if (!param1.getBoolean("classic.collectibles.hub.enabled") || !param1.getBoolean("collectibles.hub.enabled")) {
            this.setCollectiblesVisibility(false);
        }
        this.setMinimailVisibility(false);
        this._SafeStr_5086 = new MeMenuNewIconLoader(param1);
    }

    protected override onSubMenuItemClick(param1: string): void {
        let _loc2_: IHabboNavigator = null;
        let _loc3_: string = null;
        switch (param1) {
            case "profile":
                this.toolbar.connection.send(new GetExtendedProfileMessageComposer(this.toolbar.sessionDataManager.userId));
                break;
            case "minimail":
                HabboWebTools.openMinimail("#mail/inbox/");
                break;
            case "rooms":
                _loc2_ = this.toolbar.navigator;
                if (_loc2_ != null) {
                    _loc2_.showOwnRooms();
                }
                break;
            case "talents":
                _loc3_ = this.toolbar.sessionDataManager.currentTalentTrack;
                this.toolbar.connection.send(new GetTalentTrackMessageComposer(_loc3_));
                break;
            case "settings":
                break;
            case "achievements":
                this.toolbar.questEngine.showAchievements();
                break;
            case "guide":
                this.toolbar.toggleWindowVisibility("GUIDE");
                break;
            case "clothes":
                this.toolbar.context.createLinkEvent("avatareditor/open");
                break;
            case "forums":
                this.toolbar.context.createLinkEvent("groupforum/list/my");
                break;
            case "collectibles":
                this.toolbar.context.createLinkEvent("collectibles/open");
        }
    }

    protected override onToolbarClick(param1: HabboToolbarEvent): void {
        super.onToolbarClick(param1);
        if (param1.iconId != "HTIE_ICON_MEMENU") {
            if (this._SafeStr_2606 != null) {
                this._SafeStr_2606.dispose();
                this._SafeStr_2606 = null;
            }
        }
    }

    private setGuideToolVisibility(param1: boolean): void {
        let _loc2_: IWindow = this.window.findChildByName("guide");
        _loc2_.visible = param1;
        this.window.height = param1 ? _loc2_.bottom + 5 : this.window.findChildByName("profile").bottom + 5;
    }

    private setCollectiblesVisibility(param1: boolean): void {
        this.window.findChildByName("collectibles").visible = param1;
    }

    private setMinimailVisibility(param1: boolean): void {
        this.window.findChildByName("minimail").visible = param1;
    }

    public override toggleVisibility(): void {
        let _loc1_: boolean = false;
        super.toggleVisibility();
        if (this._SafeStr_2606 != null) {
            this._SafeStr_2606.dispose();
            this._SafeStr_2606 = null;
        }
        if (this.window.visible) {
            if (!this.toolbar.getBoolean("talent.track.enabled")) {
                this.window.findChildByName("talents").visible = false;
            }
            if (this.toolbar.getBoolean("guides.enabled")) {
                _loc1_ = this.toolbar.sessionDataManager.isPerkAllowed("USE_GUIDE_TOOL");
                this.setGuideToolVisibility(_loc1_);
            }
        }
        this.reposition();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2606 != null) {
            this._SafeStr_2606.dispose();
            this._SafeStr_2606 = null;
        }
        this._SafeStr_5086.dispose();
        this._SafeStr_5086 = null;
        super.dispose();
    }

    public set unseenMinimailsCount(param1: number) {
        this.setUnseenItemCount("minimail", param1);
    }

    public set unseenForumsCount(param1: number) {
        this.setUnseenItemCount("forums", param1);
    }
}
