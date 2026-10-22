import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { LeaderboardEntry } from '@/com/sulake/habbo/communication/messages/parser/game/score/LeaderboardEntry';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextLinkWindow } from '@/com/sulake/core/window/components/ITextLinkWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboGamesCom, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { LeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/LeaderboardTable';
import { TotalGroupLeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/TotalGroupLeaderboardTable';
import { TotalLeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/TotalLeaderboardTable';
import { WeeklyFriendLeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/WeeklyFriendLeaderboardTable';
import { WeeklyGroupLeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/WeeklyGroupLeaderboardTable';
import { WeeklyTotalLeaderboardTable } from '@/com/sulake/habbo/game/snowwar/leaderboard/WeeklyTotalLeaderboardTable';

export class LeaderboardViewController implements IDisposable, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.leaderboard::LeaderboardViewController'); }

    private static readonly STATE_FRIENDS_ALLTIME: number = 0;
    private static readonly STATE_ALLTIME: number = 1;
    private static readonly STATE_WEEKLY: number = 2;
    private static readonly STATE_FRIENDS_WEEKLY: number = 3;
    private static readonly STATE_GROUP_WEEKLY: number = 4;
    private static readonly STATE_GROUP_ALLTIME: number = 5;

    constructor(param1: SnowWarEngine) {
        this._gameEngine = param1;
        this._localization = param1.localization;
        this._avatarPlaceholders = new UtilsMap();
        this._SafeStr_6837 = this._gameEngine.config.getBoolean("games.highscores.scrolling.enabled");
        this._SafeStr_2877 = new LeaderboardTable(this._gameEngine);
        this._SafeStr_3176 = new TotalLeaderboardTable(this._gameEngine);
        this._SafeStr_2976 = new TotalGroupLeaderboardTable(this._gameEngine);
        this._SafeStr_2453 = new WeeklyTotalLeaderboardTable(this._gameEngine);
        this._SafeStr_2406 = new WeeklyGroupLeaderboardTable(this._gameEngine);
        this._SafeStr_2422 = new WeeklyFriendLeaderboardTable(this._gameEngine);
        this.sendGetFriendsAllTimeData();
    }

    declare private _gameEngine: SnowWarEngine;

    declare private _localization: IHabboLocalizationManager;

    declare private _window: IWindowContainer;

    declare private _state: number;
    static { (this.prototype as any)._state = 0; }

    declare private _SafeStr_2221: IItemListWindow;

    declare private _listBorder: IWindow;

    declare private _SafeStr_4783: ITextLinkWindow;

    declare private _SafeStr_4810: ITextLinkWindow;

    declare private _SafeStr_4822: ITextLinkWindow;

    declare private _SafeStr_4385: IBitmapWrapperWindow;

    declare private _SafeStr_3808: ITextWindow;

    declare private _SafeStr_4507: IBitmapWrapperWindow;

    declare private _SafeStr_4717: ITextWindow;

    declare private _SafeStr_3349: IRegionWindow;

    declare private _SafeStr_3877: IRegionWindow;

    declare private _nextWeek: IRegionWindow;

    declare private _previousWeek: IRegionWindow;

    declare private _SafeStr_3333: string;

    declare private _minutesUntilWeeklyReset: number;
    static { (this.prototype as any)._minutesUntilWeeklyReset = 0; }

    declare private _SafeStr_3289: Timer;

    declare private _avatarPlaceholders: UtilsMap;

    declare private _SafeStr_2877: LeaderboardTable;

    declare private _SafeStr_3176: TotalLeaderboardTable;

    declare private _SafeStr_2976: TotalGroupLeaderboardTable;

    declare private _SafeStr_2453: WeeklyTotalLeaderboardTable;

    declare private _SafeStr_2406: WeeklyGroupLeaderboardTable;

    declare private _SafeStr_2422: WeeklyFriendLeaderboardTable;

    declare private _SafeStr_6837: boolean;
    static { (this.prototype as any)._SafeStr_6837 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private _selectedGame: number = 0;

    public set selectedGame(param1: number) {
        this._selectedGame = param1;
    }

    private get visible(): boolean {
        return !!(this._window && this._window.visible);
    }

    private set visible(param1: boolean) {
        if (param1 && !this._window) {
            this.createMainWindow();
        }
        if (param1) {
            this._window.visible = true;
            this._window.activate();
        } else if (this._window) {
            this._window.visible = false;
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._gameEngine = null;
        this._SafeStr_2221 = null;
        this._listBorder = null;
        this._SafeStr_4783 = null;
        this._SafeStr_4810 = null;
        this._SafeStr_4822 = null;
        this._SafeStr_4385 = null;
        this._SafeStr_3808 = null;
        this._SafeStr_4507 = null;
        this._SafeStr_4717 = null;
        this._SafeStr_3349 = null;
        this._SafeStr_3877 = null;
        this._nextWeek = null;
        this._previousWeek = null;
        this._SafeStr_3333 = null;
        this._avatarPlaceholders.dispose();
        if (this._window) {
            this._window.dispose();
            this._window = null;
        }
        if (this._SafeStr_2877) {
            this._SafeStr_2877.dispose();
            this._SafeStr_2877 = null;
        }
        if (this._SafeStr_3176) {
            this._SafeStr_3176.dispose();
            this._SafeStr_3176 = null;
        }
        if (this._SafeStr_2976) {
            this._SafeStr_2976.dispose();
            this._SafeStr_2976 = null;
        }
        if (this._SafeStr_2453) {
            this._SafeStr_2453.dispose();
            this._SafeStr_2453 = null;
        }
        if (this._SafeStr_2406) {
            this._SafeStr_2406.dispose();
            this._SafeStr_2406 = null;
        }
        if (this._SafeStr_2422) {
            this._SafeStr_2422.dispose();
            this._SafeStr_2422 = null;
        }
        this.disposeWeeklyResetTimer();
        this._disposed = true;
    }

    public showFriendsAllTime(): void {
        this._state = 0;
        this.sendGetFriendsAllTimeData();
        this.visible = true;
        this._window.caption = "${snowwar.leaderboard.friends}";
        this.enableAllTimeButton();
        this.updateWeekSelection();
        this.populateList();
    }

    public showAllTime(): void {
        this._state = 1;
        this.sendGetAllTimeData();
        this.visible = true;
        this._window.caption = "${snowwar.leaderboard.all}";
        this.enableAllTimeButton();
        this.updateWeekSelection();
        this.populateList();
    }

    public showGroupAllTime(): void {
        this._state = 5;
        this.sendGetAllTimeGroupData();
        this.visible = true;
        this._window.caption = "${snowwar.leaderboard.all}";
        this.enableAllTimeButton();
        this.updateWeekSelection();
        this.populateList();
    }

    public showWeekly(): void {
        this._state = 2;
        this._SafeStr_2453.offset = 0;
        this.sendGetWeeklyData(0);
        this.visible = true;
        this._window.caption = "${snowwar.leaderboard.all}";
        this.enableThisWeekButton();
        this.updateWeekSelection();
        this.populateList();
    }

    public showGroupWeekly(): void {
        this._state = 4;
        this._SafeStr_2406.offset = 0;
        this.sendGetGroupWeeklyData(0);
        this.visible = true;
        this._window.caption = "${snowwar.leaderboard.all}";
        this.enableThisWeekButton();
        this.updateWeekSelection();
        this.populateList();
    }

    public showFriendsWeekly(): void {
        this._state = 3;
        this._SafeStr_2422.offset = 0;
        this.sendGetFriendsWeeklyData(0);
        this.visible = true;
        this._window.caption = "${snowwar.leaderboard.friends}";
        this.enableThisWeekButton();
        this.updateWeekSelection();
        this.populateList();
    }

    public addAllTimeData(param1: any[], param2: number): void {
        this._SafeStr_3176.addEntries(param1, param2);
        if (this._state == 1 && this.visible) {
            this.populateList();
        }
        this.updateWeekSelection();
    }

    public addAllTimeGroupData(param1: any[], param2: number, param3: number): void {
        this._SafeStr_2976.addGroupEntries(param1, param2, param3);
        if (this._state == 5 && this.visible) {
            this.populateList();
        }
        this.updateWeekSelection();
    }

    public addWeeklyData(param1: number, param2: number, param3: any[], param4: number, param5: number, param6: number): void {
        this.disposeWeeklyResetTimer();
        this._minutesUntilWeeklyReset = param6;
        this._SafeStr_3333 = param1 + "/" + param2;
        this._SafeStr_2453.maxOffset = param5;
        this._SafeStr_2453.addEntries(param3, param4);
        if (this._state == 2 && this.visible) {
            this.populateList();
        }
        this.updateWeekSelection();
    }

    public addWeeklyGroupData(param1: number, param2: number, param3: any[], param4: number, param5: number, param6: number, param7: number): void {
        this.disposeWeeklyResetTimer();
        this._minutesUntilWeeklyReset = param6;
        this._SafeStr_3333 = param1 + "/" + param2;
        this._SafeStr_2406.maxOffset = param5;
        this._SafeStr_2406.addGroupEntries(param3, param4, param7);
        if (this._state == 4 && this.visible) {
            this.populateList();
        }
        this.updateWeekSelection();
    }

    public addFriendAllTimeData(param1: any[], param2: number): void {
        this._SafeStr_2877.addEntries(param1, param2);
        if (this._state == 0 && this.visible) {
            this.populateList();
        }
        this.updateWeekSelection();
    }

    public addFriendWeeklyData(param1: number, param2: number, param3: any[], param4: number, param5: number, param6: number): void {
        this.disposeWeeklyResetTimer();
        this._minutesUntilWeeklyReset = param6;
        this._SafeStr_3333 = param1 + "/" + param2;
        this._SafeStr_2422.maxOffset = param5;
        this._SafeStr_2422.addEntries(param3, param4);
        if (this._state == 3 && this.visible) {
            this.populateList();
        }
        this.updateWeekSelection();
    }

    public hide(): void {
        this.visible = false;
    }

    public avatarImageReady(param1: string): void {
        if (this._disposed) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = this._avatarPlaceholders.remove(param1);
        if (_loc2_ && !_loc2_.disposed) {
            this.setAvatarImage(_loc2_, param1);
        }
    }

    private disposeWeeklyResetTimer(): void {
        if (this._SafeStr_3289 != null) {
            this._SafeStr_3289.removeEventListener("timer", this.onTick);
            this._SafeStr_3289.stop();
            this._SafeStr_3289 = null;
        }
    }

    private startWeeklyResetTimer(param1: number): void {
        this._SafeStr_3289 = new Timer(60000, param1);
        this._SafeStr_3289.addEventListener("timer", this.onTick);
        this._SafeStr_3289.start();
    }

    private enableAllTimeButton(): void {
        this._SafeStr_3808.textColor = 0;
        this._SafeStr_4717.textColor = 16777215;
        WindowUtils.setElementImage(this._SafeStr_4385, this.getBitmap("left_blue"));
        WindowUtils.setElementImage(this._SafeStr_4507, this.getBitmap("right_black"));
    }

    private enableThisWeekButton(): void {
        this._SafeStr_3808.textColor = 16777215;
        this._SafeStr_4717.textColor = 0;
        WindowUtils.setElementImage(this._SafeStr_4385, this.getBitmap("left_black"));
        WindowUtils.setElementImage(this._SafeStr_4507, this.getBitmap("right_blue"));
    }

    private sendGetFriendsAllTimeData(): void {
        this._SafeStr_2877.revertToDefaultView(this._selectedGame);
    }

    private sendGetAllTimeData(): void {
        this._SafeStr_3176.revertToDefaultView(this._selectedGame);
    }

    private sendGetAllTimeGroupData(): void {
        this._SafeStr_2976.revertToDefaultView(this._selectedGame);
    }

    private sendGetWeeklyData(param1: number): void {
        this._SafeStr_2453.offset = param1;
        this._SafeStr_2453.revertToDefaultView(this._selectedGame);
    }

    private sendGetGroupWeeklyData(param1: number): void {
        this._SafeStr_2406.offset = param1;
        this._SafeStr_2406.revertToDefaultView(this._selectedGame);
    }

    private sendGetFriendsWeeklyData(param1: number): void {
        this._SafeStr_2422.offset = param1;
        this._SafeStr_2422.revertToDefaultView(this._selectedGame);
    }

    private createMainWindow(): void {
        let _loc2_: IWindow = null;
        let _loc1_: IWindow = null;
        if (!this._window) {
            this._window = asGuarded(WindowUtils.createWindow("snowwar_leaderboard", 1), isIWindowContainer);
            this._window.center();
            this._window.findChildByTag("close").addEventListener("WME_CLICK", this.onClose);
            this._SafeStr_2221 = asGuarded(this._window.findChildByName("list"), isIItemListWindow);
            this._listBorder = this._window.findChildByName("listBorder");
            this._SafeStr_4783 = asGuarded(this._window.findChildByName("changeView"), isITextLinkWindow);
            this._SafeStr_4783.addEventListener("WME_CLICK", this.onChangeView);
            this._SafeStr_4810 = asGuarded(this._window.findChildByName("changeGroupView"), isITextLinkWindow);
            this._SafeStr_4810.addEventListener("WME_CLICK", this.onChangeGroupView);
            this._SafeStr_4822 = asGuarded(this._window.findChildByName("changeFriendsView"), isITextLinkWindow);
            this._SafeStr_4822.addEventListener("WME_CLICK", this.onChangeFriendsView);
            _loc2_ = this._window.findChildByName("all_time_region");
            _loc2_.addEventListener("WME_DOWN", this.onAllTimeButtonDown);
            _loc1_ = this._window.findChildByName("this_week_region");
            _loc1_.addEventListener("WME_DOWN", this.onThisWeekButtonDown);
            this._SafeStr_4507 = asGuarded(this._window.findChildByName("all_time_image"), isIBitmapWrapperWindow);
            this._SafeStr_4385 = asGuarded(this._window.findChildByName("this_week_image"), isIBitmapWrapperWindow);
            this._SafeStr_4717 = asGuarded(this._window.findChildByName("all_time_text"), isITextWindow);
            this._SafeStr_3808 = asGuarded(this._window.findChildByName("this_week_text"), isITextWindow);
            this._SafeStr_3349 = asGuarded(this._window.findChildByName("scrollUp"), isIRegionWindow);
            this.addScrollButtonEventListeners(this._SafeStr_3349);
            WindowUtils.setElementImage(this._SafeStr_3349.getChildAt(0), this.getBitmap("scroll_up_normal"));
            this._SafeStr_3877 = asGuarded(this._window.findChildByName("scrollDown"), isIRegionWindow);
            this.addScrollButtonEventListeners(this._SafeStr_3877);
            WindowUtils.setElementImage(this._SafeStr_3877.getChildAt(0), this.getBitmap("scroll_down_normal"));
            this._nextWeek = asGuarded(this._window.findChildByName("nextWeek"), isIRegionWindow);
            this._nextWeek.addEventListener("WME_CLICK", this.onNextWeekButton);
            this._nextWeek.visible = false;
            this._previousWeek = asGuarded(this._window.findChildByName("previousWeek"), isIRegionWindow);
            this._previousWeek.addEventListener("WME_CLICK", this.onPreviousWeekButton);
            this._previousWeek.visible = false;
            this.updateScrollButtons();
            this.updateWeekSelection();
        }
    }

    private addScrollButtonEventListeners(param1: IWindow): void {
        param1.addEventListener("WME_CLICK", this.onScrollButton);
        param1.addEventListener("WME_OVER", this.onScrollButton);
        param1.addEventListener("WME_OUT", this.onScrollButton);
        param1.addEventListener("WME_DOWN", this.onScrollButton);
        param1.addEventListener("WME_UP", this.onScrollButton);
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.hide();
    };

    private onChangeView = (param1: WindowMouseEvent): void => {
        switch (this._state - 1) {
            case 0:
                this.showAllTime();
                break;
            case 1:
                this.showWeekly();
                break;
            default:
                this._state = 2;
                this.showWeekly();
        }
    };

    private onChangeFriendsView = (param1: WindowMouseEvent): void => {
        switch (this._state) {
            case 0:
                this.showFriendsAllTime();
                break;
            case 3:
                this.showFriendsWeekly();
                break;
            default:
                this._state = 3;
                this.showFriendsWeekly();
        }
    };

    private onChangeGroupView = (param1: WindowMouseEvent): void => {
        switch (this._state - 4) {
            case 0:
                this.showGroupWeekly();
                break;
            case 1:
                this.showGroupAllTime();
                break;
            default:
                this._state = 4;
                this.showGroupWeekly();
        }
    };

    private onAllTimeButtonDown = (param1: WindowMouseEvent): void => {
        switch (this._state - 2) {
            case 0:
                this.showAllTime();
                break;
            case 1:
                this.showFriendsAllTime();
                break;
            case 2:
                this.showGroupAllTime();
        }
    };

    private onThisWeekButtonDown = (param1: WindowMouseEvent): void => {
        switch (this._state) {
            case 0:
                this.showFriendsWeekly();
                break;
            case 1:
                this.showWeekly();
                break;
            case 5:
                this.showGroupWeekly();
        }
    };

    private getCurrentLeaderboard(): LeaderboardTable {
        let _loc1_: LeaderboardTable = null;
        switch (this._state) {
            case 0:
                _loc1_ = this._SafeStr_2877;
                break;
            case 1:
                _loc1_ = this._SafeStr_3176;
                break;
            case 2:
                _loc1_ = this._SafeStr_2453;
                break;
            case 3:
                _loc1_ = this._SafeStr_2422;
                break;
            case 4:
                _loc1_ = this._SafeStr_2406;
                break;
            case 5:
                _loc1_ = this._SafeStr_2976;
                break;
            default:
                HabboGamesCom.log("Invalid state " + this._state);
        }
        return _loc1_;
    }

    private onScrollUp(): void {
        let _loc1_: LeaderboardTable = this.getCurrentLeaderboard();
        if (_loc1_ && _loc1_.scrollUp()) {
            this.populateList();
        }
    }

    private onScrollDown(): void {
        let _loc1_: LeaderboardTable = this.getCurrentLeaderboard();
        if (_loc1_ && _loc1_.scrollDown()) {
            this.populateList();
        }
    }

    private onScrollButton = (param1: WindowMouseEvent): void => {
        let _loc4_: string = null;
        let _loc5_: string = param1.window == this._SafeStr_3349 ? "up" : "down";
        switch (param1.type) {
            case "WME_CLICK":
                param1.window == this._SafeStr_3349 ? this.onScrollUp() : this.onScrollDown();
                return;
            case "WME_OUT":
                _loc4_ = "normal";
                break;
            case "WME_OVER":
                _loc4_ = "hilite";
                break;
            case "WME_DOWN":
                _loc4_ = "click";
                break;
            case "WME_UP":
                _loc4_ = "normal";
        }
        let _loc3_: string = "scroll_" + _loc5_ + "_" + _loc4_;
        let _loc2_: IWindowContainer = asGuarded(param1.window, isIWindowContainer);
        WindowUtils.setElementImage(_loc2_.getChildAt(0), this.getBitmap(_loc3_));
    };

    private onNextWeekButton = (param1: WindowMouseEvent): void => {
        if (this._nextWeek.visible) {
            switch (this._state - 2) {
                case 0:
                    this.sendGetWeeklyData(this._SafeStr_2453.offset - 1);
                    break;
                case 1:
                    this.sendGetFriendsWeeklyData(this._SafeStr_2422.offset - 1);
                    break;
                case 2:
                    this.sendGetGroupWeeklyData(this._SafeStr_2406.offset - 1);
            }
        }
    };

    private onPreviousWeekButton = (param1: WindowMouseEvent): void => {
        if (this._previousWeek.visible) {
            switch (this._state - 2) {
                case 0:
                    this.sendGetWeeklyData(this._SafeStr_2453.offset + 1);
                    break;
                case 1:
                    this.sendGetFriendsWeeklyData(this._SafeStr_2422.offset + 1);
                    break;
                case 2:
                    this.sendGetGroupWeeklyData((this._SafeStr_2406 as unknown as number) + 1 | 0);
            }
        }
    };

    private updateWeekSelection(): void {
        let _loc1_: any = null;
        switch (this._state - 2) {
            case 0:
                this._nextWeek.visible = this._SafeStr_2453.offset > 0;
                this._previousWeek.visible = this._SafeStr_2453.offset < this._SafeStr_2453.maxOffset;
                break;
            case 1:
                this._nextWeek.visible = this._SafeStr_2422.offset > 0;
                this._previousWeek.visible = this._SafeStr_2422.offset < this._SafeStr_2422.maxOffset;
                break;
            case 2:
                this._nextWeek.visible = this._SafeStr_2406.offset > 0;
                this._previousWeek.visible = this._SafeStr_2406.offset < this._SafeStr_2406.maxOffset;
                break;
            default:
                this._nextWeek.visible = false;
                this._previousWeek.visible = false;
        }
        if (this._nextWeek.visible) {
            this._SafeStr_3808.caption = this._SafeStr_3333;
        } else {
            this._SafeStr_3808.caption = "${snowwar.leaderboard.this_week}";
        }
        switch (this._state - 2) {
            case 0:
            case 1:
            case 2:
                if (!this._nextWeek.visible) {
                    this.showTimeUntilWeeklyReset();
                    if (this._SafeStr_3289 == null) {
                        this.startWeeklyResetTimer(this._minutesUntilWeeklyReset);
                    }
                    break;
                }
            default:
                WindowUtils.hideElement(this._window, "reset_text");
                this.disposeWeeklyResetTimer();
        }
    }

    private showTimeUntilWeeklyReset(): void {
        WindowUtils.showElement(this._window, "reset_text");
        let _loc4_: string = "snowwar.leaderboard.weekly_reset";
        let _loc3_: number = this.convertToDays(this._minutesUntilWeeklyReset);
        let _loc1_: number = this.convertToHours(this._minutesUntilWeeklyReset);
        let _loc2_: number = this.convertToMinutes(this._minutesUntilWeeklyReset);
        this._localization.registerParameter(_loc4_, "days", "" + this.convertToDays(this._minutesUntilWeeklyReset));
        this._localization.registerParameter(_loc4_, "hours", "" + this.convertToHours(this._minutesUntilWeeklyReset));
        this._localization.registerParameter(_loc4_, "minutes", "" + this.convertToMinutes(this._minutesUntilWeeklyReset));
        WindowUtils.setCaption(this._window.findChildByName("reset_text"), "${" + _loc4_ + "}");
    }

    private convertToDays(param1: number): number {
        return Math.floor(param1 / 60 / 24) | 0;
    }

    private convertToHours(param1: number): number {
        let _loc2_: number = this.convertToDays(param1);
        return Math.floor((param1 - _loc2_ * 24 * 60) / 60) | 0;
    }

    private convertToMinutes(param1: number): number {
        let _loc3_: number = this.convertToDays(param1);
        let _loc2_: number = this.convertToHours(param1);
        return param1 - _loc3_ * 24 * 60 - _loc2_ * 60;
    }

    private getData(): any[] {
        switch (this._state) {
            case 0:
                return this._SafeStr_2877.getVisibleEntries();
            case 1:
                return this._SafeStr_3176.getVisibleEntries();
            case 2:
                return this._SafeStr_2453.getVisibleEntries();
            case 3:
                return this._SafeStr_2422.getVisibleEntries();
            case 4:
                return this._SafeStr_2406.getVisibleEntries();
            case 5:
                return this._SafeStr_2976.getVisibleEntries();
            default:
                return null;
        }
    }

    private getFavouriteGroupId(): number {
        switch (this._state - 4) {
            case 0:
                return this._SafeStr_2406.favouriteGroupId;
            case 1:
                return this._SafeStr_2976.favouriteGroupId;
            default:
                return -1;
        }
    }

    private populateList(): void {
        let _loc8_: LeaderboardEntry = null;
        let _loc15_: IWindowContainer = null;
        let _loc11_: any = false;
        let _loc13_: boolean = false;
        let _loc1_: boolean = false;
        let _loc2_: IWindowContainer = null;
        let _loc6_: IWindow = null;
        let _loc7_: number = 0;
        let _loc14_: IWindowContainer = null;
        let _loc3_: IWindowContainer = null;
        let _loc4_: any[] = this.getData();
        let _loc10_: number = this.getFavouriteGroupId();
        let _loc9_: number = this._gameEngine.sessionDataManager.userId;
        if (!_loc4_ || _loc4_.length == 0) {
            this._SafeStr_2221.visible = false;
            this._listBorder.visible = false;
            return;
        }
        let _loc5_: number = 0;
        this._SafeStr_2221.destroyListItems();
        let _loc12_: IWindowContainer = asGuarded(WindowUtils.createWindow("snowwar_leaderboard_entry"), isIWindowContainer);
        while (_loc5_ < _loc4_.length) {
            _loc8_ = _loc4_[_loc5_];
            if (_loc8_) {
                _loc15_ = asGuarded(_loc12_.clone(), isIWindowContainer);
                _loc15_.findChildByName("rank").caption = _loc8_.rank.toString();
                _loc15_.findChildByName("score").caption = _loc8_.score.toString();
                _loc15_.findChildByName("name").caption = _loc8_.name;
                _loc11_ = _loc8_.gender == "g";
                if (_loc11_) {
                    this.setGroupBadgeImage(asGuarded(_loc15_.findChildByName("avatarImage"), isIBitmapWrapperWindow), _loc8_.figure);
                } else {
                    this.setAvatarImage(asGuarded(_loc15_.findChildByName("avatarImage"), isIBitmapWrapperWindow), _loc8_.figure, _loc8_.gender);
                }
                _loc13_ = this._state == 1 || this._state == 5;
                _loc1_ = !!(_loc13_ && (_loc8_.userId == _loc9_ || _loc11_ && _loc8_.userId == _loc10_));
                if (!_loc11_ && _loc8_.userId != this._gameEngine.sessionDataManager.userId || _loc11_ && _loc8_.userId != _loc10_ || _loc1_ && _loc5_ < _loc4_.length - 1) {
                    _loc15_.findChildByName("highlight").visible = false;
                    _loc15_.findChildByName("divider").visible = false;
                    _loc2_ = asGuarded(this._SafeStr_2221.getListItemAt(this._SafeStr_2221.numListItems - 1 >>> 0), isIWindowContainer);
                    if (_loc2_) {
                        _loc2_.findChildByName("divider").visible = false;
                    }
                }
                _loc15_.findChildByName("imageRegion").id = _loc8_.userId;
                if (_loc8_.gender == "g") {
                    _loc15_.findChildByName("imageRegion").addEventListener("WME_CLICK", this.onGroupImageRegion);
                } else {
                    _loc15_.findChildByName("imageRegion").addEventListener("WME_CLICK", this.onImageRegion);
                }
                this._SafeStr_2221.addListItem(_loc15_);
            }
            _loc5_++;
        }
        if (this._state == 1 || this._state == 5 || this._state == 2 || this._state == 4) {
            if (_loc5_ % this._SafeStr_2877.viewSize != 0) {
                _loc6_ = this._SafeStr_2221.getListItemAt(this._SafeStr_2221.numListItems - 1 >>> 0);
                _loc7_ = 0;
                while (_loc7_ < _loc5_ % this._SafeStr_2877.viewSize - 1) {
                    _loc14_ = asGuarded(_loc12_.clone(), isIWindowContainer);
                    _loc14_.findChildByName("rank").caption = "";
                    _loc14_.findChildByName("score").caption = "";
                    _loc14_.findChildByName("name").caption = "";
                    _loc14_.findChildByName("highlight").visible = false;
                    _loc14_.findChildByName("divider").visible = false;
                    _loc3_ = asGuarded(this._SafeStr_2221.getListItemAt(this._SafeStr_2221.numListItems - 1 >>> 0), isIWindowContainer);
                    if (_loc3_) {
                        _loc3_.findChildByName("divider").visible = false;
                    }
                    _loc14_.removeChild(_loc14_.findChildByName("imageRegion"));
                    this._SafeStr_2221.addListItem(_loc14_);
                    _loc7_++;
                }
                this._SafeStr_2221.addListItem(_loc6_);
            }
        }
        _loc12_.dispose();
        _loc12_ = asGuarded(this._SafeStr_2221.getListItemAt(this._SafeStr_2221.numListItems - 1 >>> 0), isIWindowContainer);
        if (_loc12_) {
            _loc12_.findChildByName("divider").visible = false;
        }
        this._SafeStr_2221.visible = true;
        this._listBorder.visible = true;
        this.updateScrollButtons();
        this._window.invalidate();
    }

    private setGroupBadgeImage(param1: IBitmapWrapperWindow, param2: string): any {
        let _loc3_: BitmapData = this._gameEngine.sessionDataManager.getGroupBadgeImage(param2);
        if (_loc3_) {
            this._avatarPlaceholders.remove(param2);
            this._avatarPlaceholders.add(param2, param1);
            WindowUtils.setElementImage(param1, _loc3_);
            _loc3_.dispose();
        }
    }

    private setAvatarImage(param1: IBitmapWrapperWindow, param2: string, param3: string = null): void {
        let _loc4_: BitmapData = null;
        let _loc5_: IAvatarImage = this._gameEngine.avatarManager.createAvatarImage(param2, "h", param3, this);
        if (_loc5_) {
            _loc5_.setDirection("full", 2);
            _loc4_ = _loc5_.getCroppedImage("head");
            if (_loc5_.isPlaceholder()) {
                this._avatarPlaceholders.remove(param2);
                this._avatarPlaceholders.add(param2, param1);
            }
            _loc5_.dispose();
        }
        WindowUtils.setElementImage(param1, _loc4_);
        _loc4_.dispose();
    }

    private onImageRegion = (param1: WindowMouseEvent): void => {
        this._gameEngine.groupsManager.showExtendedProfile(param1.window.id);
    };

    private onGroupImageRegion = (param1: WindowMouseEvent): void => {
        this._gameEngine.groupsManager.showGroupBadgeInfo(false, param1.window.id);
    };

    private updateScrollButtons(): void {
        let _loc1_: LeaderboardTable = this.getCurrentLeaderboard();
        if (_loc1_ && this._SafeStr_6837) {
            this._SafeStr_3349.visible = _loc1_.canScrollUp();
            this._SafeStr_3877.visible = _loc1_.canScrollDown();
        }
    }

    private getBitmap(param1: string): BitmapData {
        let _loc2_: IAsset = this._gameEngine.assets.getAssetByName(param1);
        if (_loc2_) {
            return asInstanceOf(_loc2_.content, BitmapData);
        }
        return null;
    }

    private onTick = (param1: TimerEvent): void => {
        if (!this._nextWeek.visible && (this._state == 2 || this._state == 3)) {
            if (this._minutesUntilWeeklyReset > 0) {
                this._minutesUntilWeeklyReset = this._minutesUntilWeeklyReset - 1;
            }
            this.showTimeUntilWeeklyReset();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
