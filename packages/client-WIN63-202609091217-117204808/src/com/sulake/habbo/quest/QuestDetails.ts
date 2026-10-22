import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { IHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { isIHTMLTextWindow } from '@/com/sulake/core/window/components/IHTMLTextWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { WindowLinkEvent } from '@/com/sulake/core/window/events/WindowLinkEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AcceptQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/AcceptQuestMessageComposer';
import { ActivateQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/ActivateQuestMessageComposer';
import { RejectQuestMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/quest/RejectQuestMessageComposer';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';

export class QuestDetails implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest::QuestDetails'); }

    private static readonly _SafeStr_7724: number = 56;
    private static readonly SPACING: number = 5;
    private static readonly TEXT_HEIGHT_SPACING: number = 5;
    private static readonly _SafeStr_5666: Point = new Point(8, 8);
    private static readonly _SafeStr_6873: any[] = ["PLACE_ITEM", "PLACE_FLOOR", "PLACE_WALLPAPER", "PET_DRINK", "PET_EAT"];

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IFrameWindow;

    declare private _openForNextQuest: boolean;
    static { (this.prototype as any)._openForNextQuest = false; }

    declare private _quest: QuestMessageData;

    declare private _msecsToRefresh: number;
    static { (this.prototype as any)._msecsToRefresh = 0; }

    private _SafeStr_5753: boolean = false;

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
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public onQuest(param1: QuestMessageData): void {
        if (this._openForNextQuest) {
            this._openForNextQuest = false;
            this.openDetails(param1);
        } else if (this._quest == null) {
            this.close();
        }
    }

    public onQuestCompleted(param1: QuestMessageData): void {
        if (this._quest == null || this._quest.id == param1.id) {
            this.close();
        }
    }

    public onQuestCancelled(param1: string): void {
        if (this._quest == null || this._quest.campaignChainCode == param1) {
            this.close();
        }
    }

    public onRoomExit(): void {
        this.close();
    }

    private close(): void {
        if (this._window) {
            this._window.visible = false;
        }
    }

    public showDetails(param1: QuestMessageData): void {
        if (this._window && this._window.visible && (this._quest != null && param1.id == this._quest.id)) {
            this._window.visible = false;
            return;
        }
        this.openDetails(param1);
    }

    public openDetails(param1: QuestMessageData, param2: boolean = false): void {
        let _loc5_: IWindowContainer = null;
        this._quest = param1;
        if (param1 == null) {
            return;
        }
        this._SafeStr_5753 = param2;
        if (this._window == null) {
            this._window = castGuarded(this._questEngine.getXmlWindow("QuestDetails"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
            this._window.findChildByTag("close").procedure = this.onDetailsWindowClose;
            this._window.center();
            _loc5_ = this._questEngine.questController.questsList.createListEntry(this.onAcceptQuest, this.onCancelQuest);
            _loc5_.x = QuestDetails._SafeStr_5666.x | 0;
            _loc5_.y = QuestDetails._SafeStr_5666.y | 0;
            this._window.content.addChild(_loc5_);
            this._window.findChildByName("link_region").procedure = this.onLinkProc;
        }
        _loc5_ = castGuarded(this._window.findChildByName("entry_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._questEngine.questController.questsList.refreshEntryDetails(_loc5_, param1);
        let _loc8_: boolean = this._quest.waitPeriodSeconds > 0;
        let _loc3_: IHTMLTextWindow = castGuarded(_loc5_.findChildByName("hint_txt"), isIHTMLTextWindow, "com.sulake.core.window.components.IHTMLTextWindow");
        let _loc9_: number = this.getTextHeight(_loc3_);
        if (!_loc8_) {
            _loc3_.caption = this._questEngine.getQuestHint(param1);
            _loc3_.height = _loc3_.textHeight + 5 | 0;
            _loc3_.initializeLinkStyle();
            _loc3_.addEventListener("WE_LINK", this.onClickHtmlLink);
        }
        _loc3_.visible = !_loc8_;
        let _loc4_: number = this.getTextHeight(_loc3_) - _loc9_;
        let _loc7_: number = this.setupLink("link_region", _loc3_.y + _loc3_.height + 5);
        let _loc6_: IWindowContainer = castGuarded(_loc5_.findChildByName("quest_container"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        _loc6_.height = _loc6_.height + (_loc4_ + _loc7_);
        this._questEngine.questController.questsList.setEntryHeight(_loc5_);
        this._window.height = _loc5_.height + 56;
        this._window.visible = true;
        this._window.activate();
    }

    private onClickHtmlLink = (param1: WindowEvent): void => {
        let _loc2_: WindowLinkEvent = param1 instanceof WindowLinkEvent ? param1 : null;
        if (_loc2_ != null) {
            HabboWebTools.openWebPageAndMinimizeClient(_loc2_.link);
        }
    };

    private setupLink(param1: string, param2: number): number {
        let _loc3_: boolean = this.hasCatalogLink();
        let _loc8_: boolean = !_loc3_ && this.hasNavigatorLink();
        let _loc5_: boolean = !_loc3_ && !_loc8_ && this.hasRoomLink();
        let _loc6_: boolean = _loc3_ || _loc8_ || _loc5_;
        let _loc7_: IRegionWindow = castGuarded(this._window.findChildByName(param1), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        _loc7_.y = param2;
        let _loc4_: number = 0;
        if (_loc6_ && !_loc7_.visible) {
            _loc4_ = 5 + _loc7_.height;
        }
        if (!_loc6_ && Boolean(_loc7_.visible)) {
            _loc4_ = -5 - _loc7_.height;
        }
        _loc7_.visible = _loc6_;
        _loc7_.findChildByName("link_catalog").visible = _loc3_;
        _loc7_.findChildByName("link_navigator").visible = _loc8_;
        _loc7_.findChildByName("link_room").visible = _loc5_;
        return _loc4_;
    }

    private hasCatalogLink(): boolean {
        return this._quest.waitPeriodSeconds < 1 && QuestDetails._SafeStr_6873.indexOf(this._quest.type) > -1;
    }

    private hasNavigatorLink(): boolean {
        let _loc2_: boolean = this._questEngine.hasLocalizedValue(this._quest.getCampaignLocalizationKey() + ".searchtag");
        let _loc1_: boolean = this._questEngine.hasLocalizedValue(this._quest.getCampaignLocalizationKey() + ".searchtag");
        return this._quest.waitPeriodSeconds < 1 && (_loc2_ || _loc1_);
    }

    private hasRoomLink(): boolean {
        return this._quest.waitPeriodSeconds < 1 && this._questEngine.isSeasonalQuest(this._quest) && this._questEngine.hasQuestRoomsIds();
    }

    private getTextHeight(param1: ITextWindow): number {
        return param1.visible ? param1.height : 0;
    }

    private onDetailsWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this._window.visible = false;
        }
    };

    public set openForNextQuest(param1: boolean) {
        this._openForNextQuest = param1;
    }

    private onLinkProc = (param1: WindowEvent, param2: IWindow = null): void => {
        if (param1.type == "WME_CLICK") {
            if (this.hasCatalogLink()) {
                this._questEngine.openCatalog(this._quest);
            } else if (this.hasNavigatorLink()) {
                this._questEngine.openNavigator(this._quest);
            } else {
                this._questEngine.goToQuestRooms();
            }
        }
    };

    public update(param1: number): void {
        if (this._window == null || !this._window.visible) {
            return;
        }
        this._msecsToRefresh -= param1;
        if (this._msecsToRefresh > 0) {
            return;
        }
        this._msecsToRefresh = 1000;
        let _loc2_: boolean = this._questEngine.questController.questsList.refreshDelay(this._window, this._quest);
        if (_loc2_) {
            this.openDetails(this._quest, this._SafeStr_5753);
        }
    }

    private onAcceptQuest = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (this._questEngine.currentlyInRoom) {
                this._questEngine.send(new AcceptQuestMessageComposer(this._quest.id));
            } else {
                this._questEngine.send(new ActivateQuestMessageComposer(this._quest.id));
            }
            this._window.visible = false;
            this._questEngine.questController.seasonalCalendarWindow.close();
            if (this._SafeStr_5753 && this._questEngine.isSeasonalQuest(this._quest)) {
                this._questEngine.goToQuestRooms();
            }
        }
    };

    private onCancelQuest = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            if (this._quest == null) {
                return;
            }
            this._questEngine.send(new RejectQuestMessageComposer(this._quest.id));
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
