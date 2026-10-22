import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { QuestCompletedEvent } from '@/com/sulake/habbo/quest/events/QuestCompletedEvent';
import type { QuestsListEvent } from '@/com/sulake/habbo/quest/events/QuestsListEvent';
import type { HabboQuestEngine } from '@/com/sulake/habbo/quest/HabboQuestEngine';
import type { QuestTracker } from '@/com/sulake/habbo/quest/QuestTracker';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIFrameWindow } from '@/com/sulake/core/window/components/IFrameWindow';
import { Calendar } from '@/com/sulake/habbo/quest/seasonalcalendar/Calendar';
import { CatalogPromo } from '@/com/sulake/habbo/quest/seasonalcalendar/CatalogPromo';
import { RareTeaser } from '@/com/sulake/habbo/quest/seasonalcalendar/RareTeaser';
import { WindowToggle } from '@/com/sulake/habbo/utils/WindowToggle';

export class MainWindow implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.seasonalcalendar::MainWindow'); }

    declare private _questEngine: HabboQuestEngine;

    declare private _window: IFrameWindow;

    declare private _SafeStr_2776: WindowToggle;

    declare private _calendar: Calendar;

    declare private _catalogPromo: CatalogPromo;

    declare private _SafeStr_3820: RareTeaser;

    private _SafeStr_6363: boolean = false;

    declare private _currentDay: number;
    static { (this.prototype as any)._currentDay = 0; }

    constructor(param1: HabboQuestEngine) {
        this._questEngine = param1;
        this._calendar = new Calendar(this._questEngine, this);
        this._catalogPromo = new CatalogPromo(this._questEngine, this);
        this._SafeStr_3820 = new RareTeaser(this._questEngine);
        this._questEngine.events.addEventListener("qe_quests_seasonal", this.onSeasonalQuests);
        this._questEngine.events.addEventListener("qce_seasonal", this.onSeasonalQuestCompleted);
    }

    public dispose(): void {
        if (this._questEngine) {
            this._questEngine.events.removeEventListener("qe_quests_seasonal", this.onSeasonalQuests);
            this._questEngine.events.removeEventListener("qce_seasonal", this.onSeasonalQuestCompleted);
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
        if (this._calendar) {
            this._calendar.close();
            this._calendar.dispose();
            this._calendar = null;
        }
        if (this._catalogPromo) {
            this._catalogPromo.dispose();
            this._catalogPromo = null;
        }
        if (this._SafeStr_3820) {
            this._SafeStr_3820.dispose();
            this._SafeStr_3820 = null;
        }
    }

    public get disposed(): boolean {
        return this._questEngine == null;
    }

    public isVisible(): boolean {
        return !!(this._window && this._window.visible);
    }

    public close = (): void => {
        if (this._calendar) {
            this._calendar.close();
        }
        if (this._window) {
            this._window.visible = false;
        }
    };

    public onRoomExit(): void {
        this.close();
    }

    public onToolbarClick(): void {
        if (!this._window) {
            this._questEngine.requestSeasonalQuests();
            return;
        }
        if (!this._SafeStr_2776 || this._SafeStr_2776.disposed) {
            this._SafeStr_2776 = new WindowToggle(this._window, this._window.desktop, this._questEngine.requestSeasonalQuests, this.close);
        }
        this._SafeStr_2776.toggle();
    }

    public getCalendarImageGalleryHost(): string {
        let _loc1_: string = this._questEngine.getSeasonalCampaignCodePrefix();
        return this._questEngine.configuration.getProperty("image.library.url") + _loc1_ + "_quest_calendar/";
    }

    public onQuests(param1: any[], param2: boolean): void {
        if (!this.isVisible() && !param2) {
            return;
        }
        this._currentDay = this.resolveCurrentDay(param1);
        this._calendar.onQuests(param1);
        this.refresh();
        if (param2) {
            this._window.visible = true;
            this._window.activate();
        }
    }

    private onSeasonalQuests = (param1: QuestsListEvent): void => {
        this.onQuests(param1.quests, true);
    };

    private onSeasonalQuestCompleted = (param1: QuestCompletedEvent): void => {
        let _loc2_: QuestTracker = this._questEngine.questController.getTracker(param1.questData.campaignChainCode);
        if (_loc2_ != null) {
            _loc2_.forceWindowCloseAfterAnimationsFinished();
        }
        this._questEngine.requestSeasonalQuests();
    };

    public onActivityPoints(param1: number, param2: number): void {
        this._catalogPromo.onActivityPoints(param1, param2);
    }

    private resolveCurrentDay(param1: any[]): number {
        let _loc2_: number = 0;
        for (const _loc3_ of param1 ?? []) {
            if (this._questEngine.isSeasonalQuest(_loc3_)) {
                _loc2_ = Math.max(_loc2_, Number(_loc3_.sortOrder)) | 0;
            }
        }
        return _loc2_;
    }

    private refresh(): void {
        this.prepareWindow();
        this._calendar.refresh();
        this._catalogPromo.refresh();
        this._SafeStr_3820.refresh();
    }

    private prepareWindow(): void {
        if (this._window != null) {
            return;
        }
        this._window = castGuarded(this._questEngine.getXmlWindow("SeasonalCalendar"), isIFrameWindow, "com.sulake.core.window.components.IFrameWindow");
        let _loc1_: string = "quests." + this._questEngine.getSeasonalCampaignCodePrefix() + ".title";
        this._window.caption = this._questEngine.localization.getLocalizationWithParams(_loc1_, _loc1_);
        this._window.findChildByTag("close").procedure = this.onWindowClose;
        this._calendar.prepare(this._window);
        this._catalogPromo.prepare(this._window);
        this._SafeStr_3820.prepare(this._window);
        this._window.center();
    }

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.close();
        }
    };

    public get currentDay(): number {
        return this._currentDay;
    }

    public get catalogPromo(): CatalogPromo {
        return this._catalogPromo;
    }

    public update(param1: number): void {
        if (this._questEngine.configuration != null && this._questEngine.isFirstLoginOfDay && !this._SafeStr_6363 && this._questEngine.isSeasonalCalendarEnabled()) {
            this._questEngine.requestSeasonalQuests();
            this._SafeStr_6363 = true;
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
