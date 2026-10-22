import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { QuestMessageData } from '@/com/sulake/habbo/communication/messages/incoming/quest/QuestMessageData';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { NextQuestTimer } from '@/com/sulake/habbo/quest/NextQuestTimer';
import { QuestCompleted } from '@/com/sulake/habbo/quest/QuestCompleted';
import { QuestDetails } from '@/com/sulake/habbo/quest/QuestDetails';
import { QuestsList } from '@/com/sulake/habbo/quest/QuestsList';
import { QuestTracker } from '@/com/sulake/habbo/quest/QuestTracker';
import { MainWindow } from '@/com/sulake/habbo/quest/seasonalcalendar/MainWindow';

export class QuestController implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.quest::QuestController'); }

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
        this._questTrackers = new UtilsMap();
        this._questsList = new QuestsList(this._questEngine);
        this._questDetails = new QuestDetails(this._questEngine);
        this._SafeStr_3174 = new QuestCompleted(this._questEngine);
        this._SafeStr_3282 = new NextQuestTimer(this._questEngine);
        this._seasonalCalendarWindow = new MainWindow(this._questEngine);
    }

    declare private _questEngine: HabboQuestEngine;

    declare private _questsList: QuestsList;

    declare private _SafeStr_3174: QuestCompleted;

    declare private _SafeStr_3282: NextQuestTimer;

    declare private _seasonalCalendarWindow: MainWindow;

    declare private _questTrackers: UtilsMap;

    declare private _questDetails: QuestDetails;

    public get questDetails(): QuestDetails {
        return this._questDetails;
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public get questsList(): QuestsList {
        return this._questsList;
    }

    public get seasonalCalendarWindow(): MainWindow {
        return this._seasonalCalendarWindow;
    }

    public onToolbarClick(): void {
        if (this._questEngine.isSeasonalCalendarEnabled()) {
            this._seasonalCalendarWindow.onToolbarClick();
            this._questsList.close();
        } else {
            this._questsList.onToolbarClick();
        }
    }

    public getTracker(param1: string): QuestTracker {
        return this.getOrCreateTracker(param1, false);
    }

    public onQuest(param1: QuestMessageData): void {
        let _loc2_: QuestTracker = this.getOrCreateTracker(param1.campaignChainCode);
        _loc2_.onQuest(param1);
        if (_loc2_.campaignChainCode == null) {
            this._questTrackers.remove(param1.campaignChainCode);
        }
        this._questDetails.onQuest(param1);
        this._SafeStr_3174.onQuest(param1);
        this._SafeStr_3282.onQuest(param1);
    }

    public onQuestCompleted(param1: QuestMessageData, param2: boolean): void {
        let _loc3_: QuestTracker = this.getOrCreateTracker(param1.campaignChainCode);
        _loc3_.onQuestCompleted(param1, param2);
        this._questDetails.onQuestCompleted(param1);
        this._SafeStr_3174.onQuestCompleted(param1, param2);
    }

    public onQuestCancelled(param1: string): void {
        let _loc2_: QuestTracker = this.getOrCreateTracker(param1, false);
        if (_loc2_ != null) {
            _loc2_.onQuestCancelled();
        }
        this._questDetails.onQuestCancelled(param1);
        this._SafeStr_3174.onQuestCancelled();
        this._SafeStr_3282.onQuestCancelled();
    }

    public onRoomEnter(): void {
        let _loc1_: string = this.getDefaultCampaign();
        if (_loc1_ == null || _loc1_ == "") {
            return;
        }
        this.getOrCreateTracker(_loc1_).startDefaultCampaign(_loc1_);
    }

    public onRoomExit(): void {
        this._questsList.onRoomExit();
        this._seasonalCalendarWindow.onRoomExit();
        for (const _loc1_ of this._questTrackers.getValues() ?? []) {
            _loc1_.onRoomExit();
        }
        this._questDetails.onRoomExit();
        this._SafeStr_3282.onRoomExit();
    }

    public update(param1: number): void {
        this._SafeStr_3174.update(param1);
        for (const _loc2_ of this._questTrackers.getValues() ?? []) {
            _loc2_.update(param1);
        }
        this._SafeStr_3282.update(param1);
        this._questsList.update(param1);
        this._questDetails.update(param1);
        this._seasonalCalendarWindow.update(param1);
        this.cleanTrackers(false);
    }

    public dispose(): void {
        this._questEngine = null;
        if (this._questsList) {
            this._questsList.dispose();
            this._questsList = null;
        }
        if (this._questTrackers) {
            this.cleanTrackers(true);
            this._questTrackers.dispose();
            this._questTrackers = null;
        }
        if (this._questDetails) {
            this._questDetails.dispose();
            this._questDetails = null;
        }
        if (this._SafeStr_3174) {
            this._SafeStr_3174.dispose();
            this._SafeStr_3174 = null;
        }
        if (this._SafeStr_3282) {
            this._SafeStr_3282.dispose();
            this._SafeStr_3282 = null;
        }
        if (this._seasonalCalendarWindow) {
            this._seasonalCalendarWindow.dispose();
            this._seasonalCalendarWindow = null;
        }
    }

    public onActivityPoints(param1: number, param2: number): void {
        if (this._seasonalCalendarWindow) {
            this._seasonalCalendarWindow.onActivityPoints(param1, param2);
        }
    }

    public getDefaultCampaign(): string {
        let _loc1_: string = this._questEngine.getProperty("questing.defaultCampaign");
        return _loc1_ == null ? "" : _loc1_;
    }

    private getOrCreateTracker(param1: string, param2: boolean = true): QuestTracker {
        let _loc3_: QuestTracker = this._questTrackers.getValue(param1);
        if (_loc3_ == null && param2) {
            _loc3_ = new QuestTracker(this._questEngine);
            this._questTrackers.add(param1, _loc3_);
        }
        return _loc3_;
    }

    private cleanTrackers(param1: boolean): void {
        let _loc2_: any;
        let _loc3_: QuestTracker = null;
        let _loc4_: any[] = [];
        for (_loc2_ of this._questTrackers.getKeys() ?? []) {
            _loc3_ = this._questTrackers.getValue(_loc2_);
            if (_loc3_.canBeDisposed || param1) {
                _loc3_.dispose();
                _loc4_.push(_loc2_);
            }
        }
        for (_loc2_ of _loc4_ ?? []) {
            this._questTrackers.remove(_loc2_);
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
