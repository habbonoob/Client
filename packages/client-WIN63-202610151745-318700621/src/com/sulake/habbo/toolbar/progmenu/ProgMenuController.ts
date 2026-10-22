import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IBoxSizerWindow } from '@/com/sulake/core/window/components/IBoxSizerWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { RewardTracksMessageParser } from '@/com/sulake/habbo/communication/messages/parser/rewardtrack/RewardTracksMessageParser';
import type { BottomBarLeft } from '@/com/sulake/habbo/toolbar/BottomBarLeft';
import type { HabboToolbar } from '@/com/sulake/habbo/toolbar/HabboToolbar';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBoxSizerWindow } from '@/com/sulake/core/window/components/IBoxSizerWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { RewardTracksMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/rewardtrack/RewardTracksMessageEvent';
import { _SafeCls_6083 } from '@/com/sulake/habbo/groups/_SafeCls_6083';
import { AbstractSubMenuController } from '@/com/sulake/habbo/toolbar/abstractsubmenu/AbstractSubMenuController';

export class ProgMenuController extends AbstractSubMenuController {
    static { registerClassName(this, 'com.sulake.habbo.toolbar.progmenu::ProgMenuController'); }

    private static readonly REWARD_TRACK_ITEM_PREFIX: string = "rewardtrack_";

    declare private _SafeStr_14246: IRegionWindow;

    declare private _rewardTrackItems: IRegionWindow[];

    declare private _SafeStr_14247: UtilsMap;

    declare private _messageEvents: IMessageEvent[];

    constructor(param1: HabboToolbar, param2: BottomBarLeft) {
        super(param1, param2, "prog_menu_view_xml", "HTIE_ICON_PROGRESSION");
        this._SafeStr_14246 = asGuarded(this.window.findChildByName("introduction").clone(), isIRegionWindow);
        this._rewardTrackItems = [];
        this._SafeStr_14247 = new UtilsMap();
        this._messageEvents = Array.from([new RewardTracksMessageEvent(this.onRewardTracks)]);
        for (const _loc3_ of this._messageEvents ?? []) {
            param1.communicationManager.addHabboConnectionMessageEvent(_loc3_);
        }
        if (param1.getBoolean("toolbar.hide.quests")) {
            this.setQuestsVisibility(false);
        }
        if (!param1.getBoolean("dailytasks.enabled")) {
            this.setDailyTasksVisibility(false);
        }
    }

    protected override onSubMenuItemClick(param1: string): void {
        if (param1.indexOf("rewardtrack_") == 0) {
            this.toolbar.context.createLinkEvent("reward_track/open/" + param1.substr("rewardtrack_".length));
            return;
        }
        switch (param1) {
            case "achievements":
                this.toolbar.questEngine.showAchievements();
                break;
            case "dailytasks":
                this.toolbar.context.createLinkEvent("dailytasks/open");
                break;
            case "leaderboards":
                this.toolbar.context.createLinkEvent(_SafeCls_6083.getLink(0, -1, 0));
                break;
            case "introduction":
                this.toolbar.context.createLinkEvent("reward_track/open/introduction");
                break;
            case "quests":
                this.toolbar.questEngine.showQuests();
        }
    }

    private onRewardTracks(param1: RewardTracksMessageEvent): void {
        let _loc2_: IRegionWindow = null;
        let _loc7_: number = 0;
        let _loc3_: string = null;
        let _loc4_: RewardTracksMessageParser = param1.getParser();
        let _loc5_: string[] = [];
        if (!_loc4_.disabled) {
            for (const _loc8_ of _loc4_.tracks ?? []) {
                if (_loc8_.id != "introduction") {
                    _loc5_.push(_loc8_.id);
                }
            }
        }
        _loc7_ = this._rewardTrackItems.length - 1;
        while (_loc7_ >= 0) {
            _loc2_ = this._rewardTrackItems[_loc7_];
            if (_loc5_.indexOf(_loc2_.name.substr("rewardtrack_".length)) == -1) {
                this.unseenItemCounters.remove(_loc2_.name);
                _loc2_.dispose();
                this._rewardTrackItems.splice(_loc7_, 1);
            }
            _loc7_ -= 1;
        }
        for (const _loc6_ of _loc5_ ?? []) {
            _loc3_ = "rewardtrack_" + _loc6_;
            if (this.menuItems.getChildByName(_loc3_) == null) {
                _loc2_ = asGuarded(this._SafeStr_14246.clone(), isIRegionWindow);
                _loc2_.name = _loc3_;
                _loc2_.findChildByName("introduction_icon_color").name = _loc3_ + "_icon_color";
                _loc2_.findChildByName("introduction_icon_grey").name = _loc3_ + "_icon_grey";
                (asGuarded(_loc2_.findChildByName("field_text"), isITextWindow)).text = "${widget.progmenu.rewardtrack." + _loc6_ + "}";
                this.menuItems.addChildAt(_loc2_, this.menuItems.numChildren - 1);
                this._rewardTrackItems.push(_loc2_);
            }
        }
        this.refreshRewardTrackUnseenCounts();
        this.reposition();
    }

    private refreshRewardTrackUnseenCounts(): void {
        let _loc2_: string = null;
        this.setUnseenItemCount("introduction", this._SafeStr_14247.getValue("introduction") | 0);
        for (const _loc1_ of this._rewardTrackItems ?? []) {
            _loc2_ = _loc1_.name.substr("rewardtrack_".length);
            this.setUnseenItemCount(_loc1_.name, this._SafeStr_14247.getValue(_loc2_) | 0);
        }
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        for (const _loc2_ of this._messageEvents ?? []) {
            this.toolbar.communicationManager.removeHabboConnectionMessageEvent(_loc2_);
        }
        this._messageEvents = null;
        for (const _loc1_ of this._rewardTrackItems ?? []) {
            this.unseenItemCounters.remove(_loc1_.name);
            _loc1_.dispose();
        }
        this._rewardTrackItems = null;
        this._SafeStr_14247 = null;
        this._SafeStr_14246.dispose();
        this._SafeStr_14246 = null;
        super.dispose();
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

    public set unseenRewardTrackRewardsCounts(param1: UtilsMap) {
        this._SafeStr_14247 = param1;
        this.refreshRewardTrackUnseenCounts();
    }

    private get menuItems(): IBoxSizerWindow {
        return asGuarded(this.window.findChildByName("menu_items"), isIBoxSizerWindow);
    }

    protected override initInstanceFields(): void {
        this.onRewardTracks = this.onRewardTracks.bind(this);
        super.initInstanceFields();
    }
}
