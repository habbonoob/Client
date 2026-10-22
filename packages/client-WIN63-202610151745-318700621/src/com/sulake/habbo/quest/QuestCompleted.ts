import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { Animation } from '@/com/sulake/habbo/quest/Animation';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { GetQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetQuestMessageComposer';
import { GetQuestsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetQuestsMessageComposer';

export class QuestCompleted implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::QuestCompleted'); }

    private static readonly _SafeStr_7992: number = 2000;
    private static readonly TEXT_HEIGHT_SPACING: number = 5;
    private static readonly MIN_DESC_HEIGHT: number = 31;

    declare private _window: IFrameWindow;

    declare private _questEngine: HabboQuestEngine;

    declare private _quest: QuestMessageData;

    declare private _SafeStr_3306: Animation;

    declare private _SafeStr_3940: number;
    static { (this.prototype as any)._SafeStr_3940 = 0; }

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
    }

    public dispose(): void {
        this._questEngine = null;
        this._quest = null;
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_3306) {
            this._SafeStr_3306.dispose();
            this._SafeStr_3306 = null;
        }
    }

    public get disposed(): boolean {
        return this._window == null;
    }

    public onQuest(param1: QuestMessageData): void {
        this.close();
    }

    public onQuestCancelled(): void {
        this.close();
    }

    public onQuestCompleted(param1: QuestMessageData, param2: boolean): void {
        if (param2) {
            this.prepare(param1);
            this._SafeStr_3940 = 2000;
        }
    }

    private close(): void {
        if (this._window) {
            this._window.visible = false;
        }
    }

    private onNextQuest = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._window.visible = false;
        this._questEngine.questController.questDetails.openForNextQuest = this._questEngine.getBoolean("questing.showDetailsForNextQuest");
        this._questEngine.send(new GetQuestMessageComposer());
    };

    private onMoreQuests = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._window.visible = false;
            this._questEngine.questController.questsList.setOpenOnQuestsEvent();
            this._questEngine.send(new GetQuestsMessageComposer());
        }
    };

    public prepare(param1: QuestMessageData): void {
        this._quest = param1;
        if (this._window == null) {
            this._window = castGuarded(this._questEngine.getXmlWindow("QuestCompletedDialog"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
            this._window.findChildByTag("close").procedure = this.onNextQuest;
            this._window.findChildByName("next_quest_button").procedure = this.onNextQuest;
            this._window.findChildByName("more_quests_button").procedure = this.onMoreQuests;
            this._window.findChildByName("catalog_link_region").procedure = this.onCatalogLink;
            this._SafeStr_3306 = this._questEngine.getTwinkleAnimation(this._window);
        }
        this._window.findChildByName("catalog_link_txt").caption = this._questEngine.localization.getLocalizationWithParams("quests.completed.cataloglink", "", "currencyname", this._questEngine.catalog.getActivityPointName(this._quest.activityPointType));
        let _loc2_: string = "quests.completed.reward";
        this._questEngine.localization.registerParameter(_loc2_, "amount", this._quest.rewardCurrencyAmount.toString());
        this._questEngine.localization.registerParameter(_loc2_, "currencyname", this._questEngine.catalog.getActivityPointName(this._quest.activityPointType));
        this._window.findChildByName("reward_txt").caption = this._questEngine.localization.getLocalization(_loc2_, _loc2_);
        this._window.findChildByName("reward_txt").visible = this._quest.activityPointType >= 0 && this._quest.rewardCurrencyAmount > 0;
        this._window.visible = false;
        this._window.findChildByName("congrats_txt").caption = this._questEngine.localization.getLocalization(this._quest.lastQuestInCampaign ? "quests.completed.campaign.caption" : "quests.completed.quest.caption");
        this._window.findChildByName("more_quests_button").visible = this._quest.lastQuestInCampaign;
        this._window.findChildByName("campaign_reward_icon").visible = this._quest.lastQuestInCampaign;
        this._window.findChildByName("catalog_link_region").visible = !this._quest.lastQuestInCampaign && this._quest.rewardCurrencyAmount > 0;
        this._window.findChildByName("next_quest_button").visible = !this._quest.lastQuestInCampaign;
        this._window.findChildByName("reward_icon").visible = !this._quest.lastQuestInCampaign;
        this._window.findChildByName("campaign_reward_icon").visible = this._quest.lastQuestInCampaign;
        this._window.findChildByName("campaign_pic_bitmap").visible = this._quest.lastQuestInCampaign;
        this.setWindowTitle(this._quest.lastQuestInCampaign ? "quests.completed.campaign.title" : "quests.completed.quest.title");
        this._questEngine.setupCampaignImage(this._window, param1, this._quest.lastQuestInCampaign);
        let _loc5_: ITextWindow = castGuarded(this._window.findChildByName("desc_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        let _loc3_: number = _loc5_.height;
        this.setDesc(this._quest.getQuestLocalizationKey() + ".completed");
        _loc5_.height = Math.max(31, _loc5_.textHeight + 5) | 0;
        let _loc4_: number = _loc5_.height - _loc3_;
        this._window.height += _loc4_;
    }

    private setWindowTitle(param1: string): void {
        this._questEngine.localization.registerParameter(param1, "category", this._questEngine.getCampaignName(this._quest));
        this._window.caption = this._questEngine.localization.getLocalization(param1, param1);
    }

    private setDesc(param1: string): void {
        this._window.findChildByName("desc_txt").caption = this._questEngine.localization.getLocalization(param1, param1);
    }

    private onCatalogLink = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            this._questEngine.openCatalog(this._quest);
        }
    };

    public update(param1: number): void {
        if (this._SafeStr_3940 > 0) {
            this._SafeStr_3940 -= param1;
            if (this._SafeStr_3940 < 1) {
                this._window.center();
                this._window.visible = true;
                this._window.activate();
                if (this._quest.lastQuestInCampaign) {
                    this._SafeStr_3306.restart();
                } else {
                    this._SafeStr_3306.stop();
                }
            }
        }
        if (this._SafeStr_3306 != null) {
            this._SafeStr_3306.update(param1);
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
