import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { BottomBarLeft } from '@/com/sulake/habbo/toolbar/BottomBarLeft';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { _SafeCls_6046 } from '@/com/sulake/habbo/groups/_SafeCls_6046';
import { AbstractSubMenuController } from '@/com/sulake/habbo/toolbar/abstractsubmenu/AbstractSubMenuController';

export class ProgMenuController extends AbstractSubMenuController {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.progmenu::ProgMenuController'); }

    constructor(param1: HabboToolbar, param2: BottomBarLeft) {
        super(param1, param2, "prog_menu_view_xml", "HTIE_ICON_PROGRESSION");
        if (param1.getBoolean("toolbar.hide.quests")) {
            this.setQuestsVisibility(false);
        }
        if (!param1.getBoolean("dailytasks.enabled")) {
            this.setDailyTasksVisibility(false);
        }
    }

    protected override onSubMenuItemClick(param1: string): void {
        switch (param1) {
            case "achievements":
                this.toolbar.questEngine.showAchievements();
                break;
            case "dailytasks":
                this.toolbar.context.createLinkEvent("dailytasks/open");
                break;
            case "leaderboards":
                this.toolbar.context.createLinkEvent(_SafeCls_6046.getLink(0, -1, 0));
                break;
            case "introduction":
                this.toolbar.context.createLinkEvent("reward_track/open/introduction");
                break;
            case "quests":
                this.toolbar.questEngine.showQuests();
        }
    }

    private setQuestsVisibility(param1: boolean): void {
        this.window.findChildByName("quests").visible = param1;
    }

    private setDailyTasksVisibility(param1: boolean): void {
        this.window.findChildByName("dailytasks").visible = param1;
    }

    public set unseenAchievementsCount(param1: number) {
        this.setUnseenItemCount("achievements", param1);
    }

    public set unseenDailyTaskCount(param1: number) {
        this.setUnseenItemCount("dailytasks", param1);
    }

    public set unseenRewardTrackRewardsCount(param1: number) {
        this.setUnseenItemCount("introduction", param1);
    }
}
