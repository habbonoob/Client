import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { ILandingViewWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ILandingViewWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { QuestDailyMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestDailyMessageEvent';
import { ActivateQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/ActivateQuestMessageComposer';
import { CancelQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/CancelQuestMessageComposer';
import { GetDailyQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/GetDailyQuestMessageComposer';
import { QuestDailyMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/QuestDailyMessageParser';
import { GenericWidget, HabboLandingView } from '@/com/sulake/habbo/friendbar/landingview/HabboLandingView.group';
import { IConfigurationCodeAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/IConfigurationCodeAwareWidget';
import { ISlotAwareWidget } from '@/com/sulake/habbo/friendbar/landingview/interfaces/ISlotAwareWidget';

export class DailyQuestWidget implements IDisposable, ILandingViewWidget, ISlotAwareWidget, IConfigurationCodeAwareWidget {
    static { registerClassName(this, 'com.sulake.habbo.friendbar.landingview.widget::DailyQuestWidget'); }

    public static moveChildrenToRow(param1: IWindowContainer, param2: number): void {
        let _loc3_: number = 0;
        let _loc5_: IWindow = null;
        let _loc4_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < param1.numChildren) {
            _loc5_ = param1.getChildAt(_loc3_);
            _loc5_.x = _loc4_;
            _loc4_ += _loc5_.width + param2;
            _loc3_++;
        }
    }

    constructor(param1: HabboLandingView) {
        this._landingView = param1;
    }

    declare private _landingView: HabboLandingView;

    declare private _data: QuestMessageData;

    declare private _easyQuestCount: number;
    static { (this.prototype as any)._easyQuestCount = 0; }

    declare private _hardQuestCount: number;
    static { (this.prototype as any)._hardQuestCount = 0; }

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _SafeStr_7057: number;
    static { (this.prototype as any)._SafeStr_7057 = 0; }

    declare private _slot: number;
    static { (this.prototype as any)._slot = 0; }

    declare private _container: IWindowContainer;

    public get container(): IWindow {
        return this._container;
    }

    declare private _configurationCode: string;

    public set configurationCode(param1: string) {
        this._configurationCode = param1;
    }

    public set slot(param1: number) {
        this._slot = param1;
    }

    public get disposed(): boolean {
        return this._landingView == null;
    }

    public dispose(): void {
        this._landingView = null;
        this._container = null;
        this._data = null;
    }

    public initialize(): void {
        this._container = castGuarded(this._landingView.getXmlWindow("daily_quest"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._landingView.communicationManager.addHabboConnectionMessageEvent(new QuestDailyMessageEvent(this.onDailyQuest));
        this._container.findChildByName("accept_button").procedure = this.onAcceptButton;
        this._container.findChildByName("go_button").procedure = this.onGoButton;
        this._container.findChildByName("next_quest_region").procedure = this.onNextQuest;
        this._container.findChildByName("cancel_quest_region").procedure = this.onCancelQuest;
        this._container.findChildByName("easy_region").procedure = this.onEasyRegion;
        this._container.findChildByName("hard_region").procedure = this.onHardRegion;
        let _loc1_: IWindow = this._container.findChildByName("hdr_line");
        this._SafeStr_7057 = _loc1_.x + _loc1_.width;
        GenericWidget.configureLayout(this._landingView, this._slot, this._configurationCode, this._container);
    }

    public refresh(): void {
        this._index = 0;
        this._landingView.send(new GetDailyQuestMessageComposer(true, 0));
    }

    public getQuestName(): string {
        let _loc1_: string = this._data.getQuestLocalizationKey() + ".name";
        return "${" + _loc1_ + "}";
    }

    private onDailyQuest = (param1: IMessageEvent): void => {
        let _loc2_: QuestDailyMessageParser = castTo(param1.parser, QuestDailyMessageParser);
        this._data = _loc2_.quest;
        this._easyQuestCount = _loc2_.easyQuestCount;
        this._hardQuestCount = _loc2_.hardQuestCount;
        this.refreshContent();
    };

    private refreshContent(): void {
        this._container.findChildByName("caption_txt").caption = this._data ? this.getChainSpecificText("chaincaption") : this.getText("landing.view.quest.currenttask.alldone.caption");
        this._container.findChildByName("info_txt").caption = this._data ? this.getChainSpecificText("chaininfo") : this.getText("landing.view.quest.currenttask.alldone.info");
        this._container.findChildByName("accept_button").visible = !!(this._data && !this._data.accepted);
        this._container.findChildByName("next_quest_region").visible = !!(this._data && !this._data.accepted && (this._data.easy ? this._easyQuestCount : this._hardQuestCount) > 1);
        this._container.findChildByName("next_quest_txt").caption = this.getText("landing.view.quest.nextquest." + (this._data && this._data.easy ? "easy" : "hard"));
        this._container.findChildByName("title_txt").caption = this.getText("landing.view.quest.title." + (this._data && this._data.accepted ? "accepted" : "notaccepted"));
        HabboLandingView.positionAfterAndStretch(this._container, "title_txt", "hdr_line");
        this._container.findChildByName("cancel_quest_region").visible = !!(this._data && this._data.accepted);
        this._container.findChildByName("current_quest_border").visible = !!(this._data && this._data.accepted);
        if (this._data) {
            this._landingView.localizationManager.registerParameter("landing.view.quest.currenttask", "task", this.getQuestName());
        }
        let _loc1_: IWindowContainer = castGuarded(this._container.findChildByName("difficulty_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc2_: number = _loc1_.x + _loc1_.width;
        _loc1_.visible = !!(this._data && !this._data.accepted && this._easyQuestCount > 0 && this._hardQuestCount > 0);
        this.setupDifficultyText("easy_region", !!(this._data && !this._data.easy));
        this.setupDifficultyText("hard_region", !!(this._data && this._data.easy));
        DailyQuestWidget.moveChildrenToRow(_loc1_, 5);
        _loc1_.width = _loc1_.findChildByName("hard_region").x + _loc1_.findChildByName("hard_region").width;
        _loc1_.x = _loc2_ - _loc1_.width;
        let _loc4_: IWindow = this._container.findChildByName("hdr_line");
        let _loc3_: number = _loc1_.visible ? _loc1_.x - 5 : this._SafeStr_7057;
        _loc4_.width = _loc3_ - _loc4_.x;
    }

    private setupDifficultyText(param1: string, param2: boolean): void {
        let _loc4_: IWindowContainer = castGuarded(this._container.findChildByName(param1), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        let _loc3_: ITextWindow = castGuarded(_loc4_.findChildByName("label_txt"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        _loc3_.width = _loc3_.textWidth | 0;
        _loc3_.underline = param2;
        _loc4_.width = _loc3_.width;
    }

    private getChainSpecificKey(param1: string): string {
        return "quests." + this._data.campaignCode + "." + this._data.chainCode + "." + param1;
    }

    private getChainSpecificText(param1: string): string {
        let _loc2_: string = this.getChainSpecificKey(param1);
        return "${" + _loc2_ + "}";
    }

    private getText(param1: string): string {
        return "${" + param1 + "}";
    }

    private onGoButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.goToRoom();
        }
    };

    private onEasyRegion = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.sendGetDailyQuest(true);
        }
    };

    private onHardRegion = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.sendGetDailyQuest(false);
        }
    };

    private onAcceptButton = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.send(new ActivateQuestMessageComposer(this._data.id));
        }
    };

    private onNextQuest = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._index = this._index + 1;
            this.sendGetDailyQuest(this._data.easy);
        }
    };

    private onCancelQuest = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._landingView.send(new CancelQuestMessageComposer());
        }
    };

    private sendGetDailyQuest(param1: boolean): void {
        this._landingView.send(new GetDailyQuestMessageComposer(param1, this._index));
    }

    get [IDisposable](): true {
        return true;
    }

    get [ISlotAwareWidget](): true {
        return true;
    }

    get [IConfigurationCodeAwareWidget](): true {
        return true;
    }
}
