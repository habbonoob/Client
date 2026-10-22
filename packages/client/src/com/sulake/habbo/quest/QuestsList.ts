import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { QuestsListEvent } from '@/com/sulake/habbo/quest/events/QuestsListEvent';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIScrollbarWindow } from '@/com/sulake/core/window/components/IScrollbarWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AcceptQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/AcceptQuestMessageComposer';
import { RejectQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/RejectQuestMessageComposer';
import { FriendlyTime } from '@/com/sulake/habbo/utils/FriendlyTime';
import { WindowToggle } from '@/com/sulake/habbo/utils/WindowToggle';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class QuestsList implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::QuestsList'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        QuestsList.#initStatics();
        return QuestsList._log;
    }

    private static readonly COL_SPACING: number = 5;
    private static readonly QUEST_LIST_SPACING: number = 10;
    private static readonly CANCEL_LINK_OFFSET_FROM_RIGHT: number = 10;
    private static readonly COMPLETION_TEXT_OFFSET_FROM_BOTTOM: number = 30;

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
        this._questEngine.events.addEventListener("qu_quests", this.onQuestsEvent);
    }

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2221: IItemListWindow;

    declare private _SafeStr_4368: ITextWindow;

    declare private _SafeStr_4394: IButtonWindow;

    declare private _SafeStr_2928: IScrollbarWindow;

    private _SafeStr_5153: boolean = true;

    declare private _SafeStr_4927: boolean;
    static { (this.prototype as any)._SafeStr_4927 = false; }

    declare private _SafeStr_2776: WindowToggle;

    private _quests: any[] = [];
    private _msecsToRefresh: number = 1000;
    private _SafeStr_5375: boolean = false;

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public dispose(): void {
        if (this._questEngine) {
            this._questEngine.events.removeEventListener("qu_quests", this.onQuestsEvent);
            this._questEngine = null;
        }
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2776) {
            this._SafeStr_2776.dispose();
            this._SafeStr_2776 = null;
        }
        this._SafeStr_2221 = null;
        this._SafeStr_2928 = null;
        this._quests = null;
        this._SafeStr_4368 = null;
        this._SafeStr_4394 = null;
    }

    public isVisible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public close = (): void => {
        if (this._window) {
            this._window.visible = false;
        }
    };

    public onRoomExit(): void {
        this.close();
    }

    public setOpenOnQuestsEvent(): void {
        this._SafeStr_5375 = true;
    }

    public onToolbarClick(): void {
        this.setOpenOnQuestsEvent();
        if (!this._window) {
            this._questEngine.requestQuests();
            return;
        }
        if (!this._SafeStr_2776 || this._SafeStr_2776.disposed) {
            this._SafeStr_2776 = new WindowToggle(this._window, this._window.desktop, this._questEngine.requestQuests, this.close);
        }
        this._SafeStr_2776.toggle();
        this._SafeStr_5153 = false;
    }

    public createListEntry(param1: (...args: any[]) => any, param2: (...args: any[]) => any): IWindowContainer {
        let _loc3_: IWindowContainer = castGuarded(this._questEngine.getXmlWindow("QuestEntry"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc6_: IWindowContainer = castGuarded(this._questEngine.getXmlWindow("Campaign"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc9_: IWindowContainer = castGuarded(this._questEngine.getXmlWindow("Quest"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc5_: IWindowContainer = castGuarded(this._questEngine.getXmlWindow("EntryArrows"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc8_: IWindowContainer = castGuarded(this._questEngine.getXmlWindow("CampaignCompleted"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc3_.addChild(_loc6_);
        _loc3_.addChild(_loc9_);
        _loc3_.addChild(_loc8_);
        _loc3_.addChild(_loc5_);
        _loc9_.findChildByName("accept_button").procedure = param1;
        _loc9_.findChildByName("cancel_region").procedure = param2;
        _loc3_.findChildByName("hint_txt").visible = false;
        _loc3_.findChildByName("link_region").visible = false;
        let _loc7_: IWindow = _loc3_.findChildByName("cancel_region");
        let _loc4_: IWindow = _loc3_.findChildByName("cancel_txt");
        _loc7_.width = _loc4_.width;
        _loc7_.x = _loc9_.width - _loc7_.width - 10;
        _loc9_.x = _loc6_.x + _loc6_.width + 5;
        _loc3_.width = _loc9_.x + _loc9_.width;
        _loc8_.x = _loc9_.x;
        this.setEntryHeight(_loc3_);
        return _loc3_;
    }

    public setEntryHeight(param1: IWindowContainer): void {
        let _loc5_: IWindowContainer = castGuarded(param1.findChildByName("campaign_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc6_: IWindowContainer = castGuarded(param1.findChildByName("quest_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc4_: IWindowContainer = castGuarded(param1.findChildByName("entry_arrows_cont"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc5_.height = _loc6_.height;
        param1.height = _loc6_.height;
        _loc4_.x = _loc5_.x + _loc5_.width - 2;
        _loc4_.y = Math.floor((_loc5_.height - _loc4_.height) / 2) + 1 | 0;
        _loc5_.findChildByName("completion_txt").y = _loc5_.height - 30;
        let _loc2_: number = 2;
        let _loc3_: IWindow = _loc5_.findChildByName("bg_bottom");
        _loc3_.height = Math.floor((_loc5_.height - 2 * _loc2_) / 2) | 0;
        _loc3_.y = _loc2_ + _loc3_.height;
    }

    public refreshEntryDetails(param1: IWindowContainer, param2: QuestMessageData): void {
        let _loc3_: IWindow = param1.findChildByName("campaign_header_txt");
        _loc3_.caption = this._questEngine.getCampaignName(param2);
        _loc3_.y = _loc3_.height <= 17 ? 12 : 2;
        param1.findChildByName("completion_txt").caption = param2.completedQuestsInCampaign + "/" + param2.questCountInCampaign;
        this._questEngine.setupCampaignImage(param1, param2, true);
        this.setColor(param1, "bg", param2.accepted, 4290944315, 4284769380);
        this.setColor(param1, "bg_top", param2.accepted, 4294956936, 4290427578);
        this.setColor(param1, "bg_bottom", param2.accepted, 4294952792, 4289440683);
        param1.findChildByName("completion_bg_red_bitmap").visible = !param2.completedCampaign && param2.completedQuestsInCampaign < 1;
        param1.findChildByName("completion_bg_blue_bitmap").visible = !param2.completedCampaign && param2.completedQuestsInCampaign > 0;
        param1.findChildByName("completion_bg_green_bitmap").visible = param2.completedCampaign;
        param1.findChildByName("arrow_0").visible = !param2.accepted;
        param1.findChildByName("arrow_1").visible = param2.accepted;
        param1.findChildByName("quest_container").visible = !param2.completedCampaign;
        param1.findChildByName("campaign_completed_container").visible = param2.completedCampaign;
        if (!param2.completedCampaign) {
            this.refreshEntryQuestDetails(castGuarded(param1.findChildByName("quest_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), param2);
            this.refreshDelay(param1, param2);
        }
    }

    public refreshDelay(param1: IWindowContainer, param2: QuestMessageData): boolean {
        let _loc3_: number = 0;
        let _loc4_: string = null;
        if (param1.findChildByName("delay_desc_txt").visible) {
            _loc3_ = param2.waitPeriodSeconds;
            if (_loc3_ <= 0) {
                this.refreshEntryQuestDetails(param1, param2);
                return true;
            }
            _loc4_ = FriendlyTime.getFriendlyTime(this._questEngine.localization, _loc3_);
            param1.findChildByName("delay_txt").caption = _loc4_;
        }
        return false;
    }

    public refreshTimeLeft(param1: IWindowContainer, param2: QuestMessageData): boolean {
        let _loc3_: number = 0;
        if (param1.findChildByName("timeleft_txt").visible) {
            _loc3_ = param2.secondsLeft;
            if (_loc3_ < 0) {
                return false;
            }
            param1.findChildByName("timeleft_txt").caption = FriendlyTime.getFriendlyTime(this._questEngine.localization, _loc3_, ".short", 3);
        }
        return true;
    }

    public onAlert(param1: IAlertDialog, param2: WindowEvent): void {
        if (param2.type == "WE_OK" || param2.type == "WE_CANCEL") {
            param1.dispose();
        }
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
        this.refresh(true);
    }

    private onQuests(param1: any[], param2: boolean): void {
        this._quests = [];
        let _loc3_: QuestMessageData = null;
        for (_loc3_ of param1 ?? []) {
            if (!this._questEngine.isSeasonalQuest(_loc3_)) {
                this._quests.push(_loc3_);
            }
        }
        if (!this.isVisible() && !param2) {
            return;
        }
        this.refresh(false);
        this._window.visible = true;
        this._window.activate();
        this._SafeStr_4927 = false;
        for (_loc3_ of param1 ?? []) {
            if (_loc3_.accepted) {
                this._SafeStr_4927 = true;
            }
        }
    }

    private refresh(param1: boolean): void {
        let _loc3_: number = 0;
        let _loc2_: boolean = false;
        this.prepareWindow();
        this._SafeStr_2221.autoArrangeItems = false;
        _loc3_ = 0;
        while (true) {
            if (_loc3_ < this._quests.length) {
                this.refreshEntry(true, _loc3_, this._quests[_loc3_], param1);
            } else {
                _loc2_ = this.refreshEntry(false, _loc3_, null, param1);
                if (_loc2_) {
                    break;
                }
            }
            _loc3_++;
        }
        this._SafeStr_2221.autoArrangeItems = true;
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._questEngine.getXmlWindow("Quests"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        this._window.findChildByTag("close").procedure = this.onWindowClose;
        this._SafeStr_2221 = castGuarded(this._window.findChildByName("quest_list"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow");
        this._SafeStr_2928 = castGuarded(this._window.findChildByName("scroller"), isIScrollbarWindow, "com.sulake.core.window.components.IScrollbarWindow");
        this._SafeStr_4368 = castGuarded(this._window.findChildByName("hc_info_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        this._SafeStr_4394 = castGuarded(this._window.findChildByName("get_hc_btn"), isIButtonWindow, "com.sulake.core.window.components.IButtonWindow");
        this._window.center();
        this._SafeStr_2221.spacing = 10;
        this.setupHcDoubleDucketsInfo();
    }

    private setupHcDoubleDucketsInfo(): void {
        let _loc1_: boolean = this._questEngine.sessionDataManager.hasClub;
        if (_loc1_) {
            this._SafeStr_4368.text = this._questEngine.localization.getLocalization("hc.has.double_duckets.info", "You get double duckets as you are an HC member!");
        } else {
            this._SafeStr_4368.text = this._questEngine.localization.getLocalization("hc.get.double_duckets.info", "Get HC membership to gain double duckets!");
        }
        this._SafeStr_4394.visible = !_loc1_;
        this._SafeStr_4394.addEventListener("WME_CLICK", this.onClickGetHc);
    }

    private refreshEntry(param1: boolean, param2: number, param3: QuestMessageData, param4: boolean): boolean {
        let _loc5_: boolean = false;
        let _loc6_: IWindowContainer = castGuarded(this._SafeStr_2221.getListItemAt(param2 >>> 0), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc7_: boolean = false;
        if (_loc6_ == null) {
            if (!param1) {
                return true;
            }
            _loc6_ = this.createListEntry(this.onAcceptQuest, this.onCancelQuest);
            this._SafeStr_2221.addListItem(_loc6_);
        }
        if (param1) {
            if (param4) {
                this.refreshDelay(_loc6_, param3);
            } else {
                this.refreshEntryDetails(_loc6_, param3);
            }
            if (param3.isSeasonal) {
                _loc5_ = this.refreshTimeLeft(_loc6_, param3);
                if (!_loc5_ && param3.accepted) {
                    this._questEngine.send(new RejectQuestMessageComposer(param3.id));
                }
                _loc6_.visible = _loc5_;
            } else {
                _loc6_.visible = true;
            }
        } else {
            _loc6_.visible = false;
        }
        return false;
    }

    private refreshEntryQuestDetails(param1: IWindowContainer, param2: QuestMessageData): void {
        param1.findChildByName("quest_header_txt").caption = this._questEngine.getQuestRowTitle(param2);
        param1.findChildByName("desc_txt").caption = this._questEngine.getQuestDesc(param2);
        param1.findChildByName("timeleft_txt").visible = param2.isSeasonal;
        param1.findChildByName("hourglass_icon").visible = param2.isSeasonal;
        if (param2.isSeasonal) {
            param1.findChildByName("timeleft_txt").caption = FriendlyTime.getFriendlyTime(this._questEngine.localization, param2.secondsLeft, ".short", 3);
            this.initHourglassIcon(param1);
        }
        param1.findChildByName("cancel_txt").visible = param2.accepted;
        param1.findChildByName("cancel_region").visible = param2.accepted;
        param1.findChildByName("cancel_region").id = param2.id;
        param1.findChildByName("accept_button").visible = !param2.accepted;
        param1.findChildByName("accept_button").id = param2.id;
        this.setColor(param1, null, param2.accepted, 15982264, 13158600);
        this.setColor(param1, "quest_header", param2.accepted, 15577658, 9276813);
        castGuarded(param1.findChildByName("quest_header_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = param2.accepted ? 4294967295 : 4281808695;
        castGuarded(param1.findChildByName("timeleft_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow").textColor = param2.accepted ? 4294967295 : 4281808695;
        this._questEngine.setupQuestImage(param1, param2);
        this._questEngine.refreshReward(param2.waitPeriodSeconds < 1, param1, param2.activityPointType, param2.rewardCurrencyAmount);
        param1.findChildByName("delay_desc_txt").visible = param2.waitPeriodSeconds > 0;
        param1.findChildByName("delay_txt").visible = param2.waitPeriodSeconds > 0;
        param1.findChildByName("desc_txt").visible = param2.waitPeriodSeconds < 1;
    }

    private initHourglassIcon(param1: IWindowContainer): void {
        let _loc3_: IBitmapWrapperWindow = asGuarded(param1.findChildByName("hourglass_icon"), isIBitmapWrapperWindow);
        if (_loc3_.bitmap != null) {
            return;
        }
        let _loc5_: IAsset = this._questEngine.assets.getAssetByName("icon_hourglass_png");
        let _loc4_: BitmapDataAsset = castTo(_loc5_, BitmapDataAsset);
        let _loc2_: BitmapData = castTo(_loc4_.content, BitmapData);
        _loc3_.bitmap = _loc2_.clone();
        _loc3_.width = _loc3_.bitmap.width;
        _loc3_.height = _loc3_.bitmap.height;
    }

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: any = false;
        if (param1.type == "WME_CLICK") {
            this.close();
            _loc3_ = this._questEngine.getInteger("new.identity", 0) > 0;
            if (_loc3_ && this._SafeStr_5153 && !this._SafeStr_4927) {
                this._SafeStr_5153 = false;
                this._questEngine.habboHelp.showWelcomeScreen("HTIE_ICON_PROGRESSION", "quests.rejectnotification", 0);
            }
        }
    };

    private onAcceptQuest = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: number = param2.id;
        QuestsList._log.info("Accept quest: " + _loc3_);
        this._questEngine.send(new AcceptQuestMessageComposer(_loc3_));
    };

    private onCancelQuest = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        let _loc3_: number = param2.id;
        QuestsList._log.info("Reject quest: " + _loc3_);
        this._questEngine.send(new RejectQuestMessageComposer(_loc3_));
    };

    private onClickGetHc = (param1: WindowMouseEvent): void => {
        if (this._questEngine.catalog) {
            this._questEngine.catalog.openCatalogPage("hc_membership", "NORMAL");
        }
    };

    private setColor(param1: IWindowContainer, param2: string, param3: boolean, param4: number, param5: number): void {
        (param2 == null ? param1 : param1.findChildByName(param2)).color = param3 ? param4 : param5;
    }

    private onQuestsEvent = (param1: QuestsListEvent): void => {
        let _loc2_: boolean = this._SafeStr_5375;
        this._SafeStr_5375 = false;
        this.onQuests(param1.quests, _loc2_);
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (QuestsList.#staticsReady) return;
        QuestsList.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(QuestsList, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.quest.QuestsList"));
    }

    get [IDisposable](): true {
        return true;
    }
}
