import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';

export class NextQuestTimer implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::NextQuestTimer'); }

    public static readonly REFRESH_PERIOD_IN_MSECS: number = 1000;
    private static readonly TOOLBAR_EXTENSION_ID: string = "next_quest";

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
    }

    declare private _questEngine: HabboQuestEngine;

    declare private _quest: QuestMessageData;

    declare private _window: IWindowContainer;

    private _expanded: boolean = false;

    declare private _msecsToRefresh: number;
    static { (this.prototype as any)._msecsToRefresh = 0; }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public dispose(): void {
        if (this._questEngine) {
            this._questEngine.toolbar.extensionView.detachExtension("next_quest");
        }
        this._questEngine = null;
        this._quest = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
    }

    public onQuestCancelled(): void {
        this._quest = null;
        this.close();
    }

    public onRoomExit(): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this._window.findChildByName("more_info_region").visible = false;
            this._window.findChildByName("more_info_txt").visible = false;
        }
    }

    public onQuest(param1: QuestMessageData): void {
        if (param1.waitPeriodSeconds < 1) {
            this.close();
            return;
        }
        this._quest = param1;
        this.prepareWindow();
        this.refreshVisibility();
        this._window.visible = true;
        this._questEngine.toolbar.extensionView.attachExtension("next_quest", this._window);
    }

    public update(param1: number): void {
        if (this._window == null || !this._window.visible) {
            return;
        }
        this._msecsToRefresh -= param1;
        if (this._msecsToRefresh > 0) {
            return;
        }
        this._msecsToRefresh = 1000;
        this.refresh();
    }

    public isVisible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public close(): void {
        if (this._window != null && Boolean(this._window.visible)) {
            this._window.visible = false;
            this._questEngine.toolbar.extensionView.detachExtension("next_quest");
        }
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._questEngine.getXmlWindow("NextQuestTimer"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._window.x = 0;
        this._window.y = 0;
        this._window.findChildByName("more_info_region").procedure = this.onMoreInfo;
        this._window.findChildByName("quest_timer_expanded").procedure = this.onToggleExpanded;
        this._window.findChildByName("quest_timer_contracted").procedure = this.onToggleExpanded;
        this.refreshVisibility();
    }

    private refresh(): void {
        let _loc1_: number = this._quest.waitPeriodSeconds;
        if (_loc1_ < 1) {
            this.close();
            this._quest.waitPeriodSeconds = 0;
            this._questEngine.questController.onQuest(this._quest);
        }
        let _loc3_: string = FriendlyTime.getFriendlyTime(this._questEngine.localization, _loc1_);
        let _loc2_: string = this._quest.getCampaignLocalizationKey() + ".delayedmsg";
        this._questEngine.localization.registerParameter("quests.nextquesttimer.caption.contracted", "time", _loc3_);
        this._questEngine.localization.registerParameter(_loc2_, "time", _loc3_);
        this._window.findChildByName("quest_header_txt").caption = this._questEngine.localization.getLocalization("quests.nextquesttimer.caption." + (this._expanded ? "expanded" : "contracted"));
        this._window.findChildByName("desc_txt").caption = this._questEngine.localization.getLocalization(_loc2_, _loc2_);
    }

    private refreshVisibility(): void {
        this._window.findChildByName("quest_timer_expanded").visible = this._expanded;
        this._window.findChildByName("quest_timer_contracted").visible = !this._expanded;
        this._window.findChildByName("more_info_txt").visible = this._expanded && this._questEngine.currentlyInRoom;
        this._window.findChildByName("more_info_region").visible = this._expanded && this._questEngine.currentlyInRoom;
        this._window.findChildByName("quest_pic_bitmap").visible = this._expanded;
        this._window.findChildByName("desc_txt").visible = this._expanded;
        this.refresh();
    }

    private onMoreInfo = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.questController.questDetails.showDetails(this._quest);
        }
    };

    private onToggleExpanded = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._expanded = !this._expanded;
            this.refreshVisibility();
        }
    };

    private getDefaultLocationX(): number {
        return 0;
    }

    private setQuestImageVisible(param1: boolean): void {
        this._window.findChildByName("quest_pic_bitmap").visible = param1;
    }

    get [IDisposable](): true {
        return true;
    }
}
