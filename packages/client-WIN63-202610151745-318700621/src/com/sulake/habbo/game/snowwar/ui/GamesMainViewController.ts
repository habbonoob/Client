import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GameLobbyWindowCtrl, HabboGamesCom, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarAnimatedWindowElement } from '@/com/sulake/habbo/game/snowwar/utils/SnowWarAnimatedWindowElement';

export class GamesMainViewController implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.ui::GamesMainViewController'); }

    private static readonly INSTRUCTION_FRAME_LENGTH: number = 1000;
    private static readonly INSTRUCTION_ASSETS: any[] = ["move_", "throw_1_", "throw_2_", "throw_3_", "balls_"];
    private static readonly INSTRUCTION_FRAME_COUNTS: any[] = [4, 4, 5, 5, 5];

    declare private _gameEngine: SnowWarEngine;

    declare private _rootWindow: IWindowContainer;

    declare private _SafeStr_2133: IWindowContainer;

    declare private _lobbyView: GameLobbyWindowCtrl;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    declare private _SafeStr_3249: SnowWarAnimatedWindowElement;

    declare private _SafeStr_3271: Timer;

    private _SafeStr_2521: number = 0;
    private _SafeStr_2452: number = 0;

    constructor(param1: SnowWarEngine) {
        this._gameEngine = param1;
    }

    public get gameEngine(): SnowWarEngine {
        return this._gameEngine;
    }

    public get rootWindow(): IWindowContainer {
        return this._rootWindow;
    }

    public get lobbyView(): GameLobbyWindowCtrl {
        return this._lobbyView;
    }

    public toggleVisibility(): void {
        if (this._rootWindow) {
            this._rootWindow.visible = !this.rootWindow.visible;
        } else {
            this.openMainWindow(true);
        }
    }

    private createWindow(): void {
        let _loc1_: number = 0;
        this._rootWindow = asGuarded(WindowUtils.createWindow("games_main", 1), isIWindowContainer);
        this._rootWindow.findChildByTag("close").addEventListener("WME_CLICK", this.onClose);
        this._rootWindow.visible = true;
        this._rootWindow.center();
        this._SafeStr_2133 = asGuarded(this._rootWindow.findChildByName("quick_play_container"), isIWindowContainer);
        this._SafeStr_2133.findChildByName("play.button").addEventListener("WME_CLICK", this.onPlay);
        this._SafeStr_2133.visible = false;
        this._SafeStr_2133.findChildByName("instructions_link").addEventListener("WME_CLICK", this.onInstructions);
        this._SafeStr_2133.findChildByName("leaderboard_link").addEventListener("WME_CLICK", this.onLeaderboard);
        this._SafeStr_2133.findChildByName("instructions_back").addEventListener("WME_CLICK", this.onBack);
        this._SafeStr_2133.findChildByName("instructions_next").addEventListener("WME_CLICK", this.onNext);
        this._SafeStr_2133.findChildByName("instructions_prev").addEventListener("WME_CLICK", this.onPrevious);
        this._SafeStr_2133.findChildByName("games_vip_region").addEventListener("WME_CLICK", this.onOpenClubCenter);
        this._SafeStr_2133.procedure = this.windowEventProc;
        this._SafeStr_2133.findChildByName("leaderboard_link").visible = this._gameEngine.config.getBoolean("games.highscores.enabled");
        let _loc2_: IItemListWindow = asGuarded(this._SafeStr_2133.findChildByName("page_list"), isIItemListWindow);
        _loc1_ = 0;
        while (_loc1_ < _loc2_.numListItems) {
            _loc2_.getListItemAt(_loc1_ >>> 0).addEventListener("WME_CLICK", this.onSelectPage);
            _loc1_++;
        }
        this._disposed = false;
        this.updateGameStartingStatus();
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_OVER" || param1.type == "WME_OUT") {
            switch (param2.name) {
                case "btn_more_games_10":
                    WindowUtils.setElementImage(param2, this.getBitmap("btn_more_games_10" + (param1.type == "WME_OVER" ? "_hi" : "")));
                    break;
                case "btn_more_games_100":
                    WindowUtils.setElementImage(param2, this.getBitmap("btn_more_games_100" + (param1.type == "WME_OVER" ? "_hi" : "")));
                    break;
                case "btn_more_games_300":
                    WindowUtils.setElementImage(param2, this.getBitmap("btn_more_games_300" + (param1.type == "WME_OVER" ? "_hi" : "")));
            }
        }
        if (param1.type == "WME_CLICK") {
            switch (param2.name) {
                case "btn_more_games_10":
                    this._gameEngine.catalog.buySnowWarTokensOffer("GET_SNOWWAR_TOKENS");
                    this._gameEngine.logGameEvent("gameFramework.buyTokens.clicked.frontView");
                    break;
                case "btn_more_games_100":
                    this._gameEngine.catalog.buySnowWarTokensOffer("GET_SNOWWAR_TOKENS2");
                    this._gameEngine.logGameEvent("gameFramework.buyTokens.clicked.frontView");
                    break;
                case "btn_more_games_300":
                    this._gameEngine.catalog.buySnowWarTokensOffer("GET_SNOWWAR_TOKENS3");
                    this._gameEngine.logGameEvent("gameFramework.buyTokens.clicked.frontView");
            }
        }
    };

    public close(param1: boolean): void {
        if (this._lobbyView && this._lobbyView.visible) {
            this._lobbyView.onClose(param1);
        }
        this.disposeViews();
    }

    private onClose = (param1: WindowMouseEvent): void => {
        this.close(true);
    };

    private onPlay = (param1: WindowMouseEvent): void => {
        if (this._gameEngine.freeGamesLeft != 0) {
            this._gameEngine.startQuickServerGame();
        } else {
            this._gameEngine.openGetMoreGames("gameFramework.onPlay.clicked.frontView");
        }
    };

    private updateGettingMoreGamesOption(): void {
        let _loc1_: IWindow = this._SafeStr_2133.findChildByName("play.button");
        if (this._gameEngine.freeGamesLeft == 0) {
            _loc1_.visible = false;
        } else {
            _loc1_.visible = true;
        }
    }

    private onInstructions = (param1: WindowMouseEvent): void => {
        this.showInstructions(true);
    };

    private onLeaderboard = (param1: WindowMouseEvent): void => {
        this._gameEngine.showLeaderboard();
    };

    private onBack = (param1: WindowMouseEvent): void => {
        this.showInstructions(false);
    };

    private onNext = (param1: WindowMouseEvent): void => {
        this._SafeStr_2452 = this._SafeStr_2452 + 1;
        this._SafeStr_2452 %= GamesMainViewController.INSTRUCTION_ASSETS.length;
        this.showInstructions(true);
    };

    private onPrevious = (param1: WindowMouseEvent): void => {
        this._SafeStr_2452 = this._SafeStr_2452 - 1 + GamesMainViewController.INSTRUCTION_ASSETS.length;
        this._SafeStr_2452 %= GamesMainViewController.INSTRUCTION_ASSETS.length;
        this.showInstructions(true);
    };

    private onSelectPage = (param1: WindowMouseEvent): void => {
        this._SafeStr_2452 = parseInt(param1.window.name.replace("page_", "")) | 0;
        this.showInstructions(true);
    };

    private showInstructions(param1: boolean): void {
        let _loc3_: number = 0;
        let _loc7_: IWindowContainer = null;
        this._SafeStr_2133.findChildByName("teaser_container").visible = !param1;
        this._SafeStr_2133.findChildByName("instructions_container").visible = param1;
        if (this._SafeStr_3249) {
            this._SafeStr_3249.dispose();
            this._SafeStr_3249 = null;
        }
        if (!param1) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._SafeStr_2133.findChildByName("instructions_image"), isIBitmapWrapperWindow);
        let _loc6_: string = stringOrNull(GamesMainViewController.INSTRUCTION_ASSETS[this._SafeStr_2452]);
        let _loc2_: number = GamesMainViewController.INSTRUCTION_FRAME_COUNTS[this._SafeStr_2452] | 0;
        this._SafeStr_3249 = new SnowWarAnimatedWindowElement(this._gameEngine.assets, _loc4_, _loc6_, _loc2_, 1000);
        this._SafeStr_2133.findChildByName("instruction_text").caption = "${snowwar.instructions." + (this._SafeStr_2452 + 1) + "}";
        let _loc5_: IItemListWindow = asGuarded(this._SafeStr_2133.findChildByName("page_list"), isIItemListWindow);
        _loc3_ = 0;
        while (_loc3_ < _loc5_.numListItems) {
            _loc7_ = asGuarded(_loc5_.getListItemAt(_loc3_ >>> 0), isIWindowContainer);
            _loc6_ = _loc3_ <= this._SafeStr_2452 ? "pagination_ball_hilite" : "pagination_ball";
            WindowUtils.setElementImage(_loc7_.getChildAt(0), this.getBitmap(_loc6_));
            _loc3_++;
        }
    }

    private getBitmap(param1: string): BitmapData {
        let _loc2_: IAsset = this._gameEngine.assets.getAssetByName(param1);
        if (_loc2_) {
            return asInstanceOf(_loc2_.content, BitmapData);
        }
        return null;
    }

    private onOpenClubCenter = (param1: WindowMouseEvent): void => {
        this._gameEngine.openClubCenter("gameFramework.getVip.clicked.frontView");
    };

    public openMainWindow(param1: boolean): void {
        if (!this._rootWindow && param1) {
            this.createWindow();
        } else if (!this.rootWindow && !param1) {
            return;
        }
        if (this._lobbyView) {
            this._lobbyView.visible = false;
        }
        this._SafeStr_2133.visible = true;
    }

    public openGameLobbyWindow(param1: string, param2: number, param3: number): void {
        if (!this._rootWindow) {
            this.createWindow();
        }
        if (!this._lobbyView) {
            this._lobbyView = new GameLobbyWindowCtrl(this, param1, param2, param3);
        } else {
            this._lobbyView.levelName = param1;
            this._lobbyView.numberOfTeams = param2;
            this._lobbyView.maxNumberOfPlayers = param3;
            this._lobbyView.clearPlayerList();
        }
        this._SafeStr_2133.visible = false;
        this._lobbyView.visible = true;
    }

    public dispose(): void {
        if (!this._disposed) {
            this.disposeViews();
            this._disposed = true;
            this.disposeCounter();
        }
    }

    private disposeViews(): void {
        if (this._SafeStr_3249) {
            this._SafeStr_3249.dispose();
            this._SafeStr_3249 = null;
        }
        if (this._lobbyView) {
            this._lobbyView.dispose();
            this._lobbyView = null;
        }
        if (this._SafeStr_2133) {
            this._SafeStr_2133.dispose();
            this._SafeStr_2133 = null;
        }
        if (this._rootWindow) {
            this._rootWindow.dispose();
            this._rootWindow = null;
        }
    }

    private disposeCounter(): void {
        if (this._SafeStr_3271) {
            this._SafeStr_3271.removeEventListener("timer", this.onTick);
            this._SafeStr_3271.stop();
            this._SafeStr_3271 = null;
        }
        this._SafeStr_2521 = NaN | 0;
    }

    public get gameLobbyWindowActive(): boolean {
        return !!(this._lobbyView && this._lobbyView.visible);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public updateGameStartingStatus(): void {
        let _loc1_: IWindowContainer = null;
        let _loc3_: ITextWindow = null;
        let _loc2_: IWindow = null;
        if (this._SafeStr_2133 && this._SafeStr_2133.visible) {
            WindowUtils.setCaption(this._SafeStr_2133.findChildByName("games_left"), this._gameEngine.freeGamesLeft.toString());
            _loc1_ = asGuarded(this._SafeStr_2133.findChildByName("games_left_region"), isIWindowContainer);
            _loc3_ = asGuarded(this._SafeStr_2133.findChildByName("games_left_stroke"), isITextWindow);
            _loc2_ = this._SafeStr_2133.findChildByName("play.button");
            _loc2_.visible = true;
            this.updateGettingMoreGamesOption();
            if (this.checkGameAmountStatus(_loc1_, _loc3_, _loc2_)) {
                this.checkBlockStatus(_loc2_);
            }
        }
    }

    private checkGameAmountStatus(param1: IWindowContainer, param2: ITextWindow, param3: IWindow): boolean {
        if (this._gameEngine.hasUnlimitedGames) {
            param1.visible = false;
            return true;
        }
        param1.visible = true;
        let _loc4_: IWindow = castGuarded(this._SafeStr_2133.findChildByName("play_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        param3.color = 5622784;
        switch (this._gameEngine.freeGamesLeft - -1) {
            case 0:
                param1.visible = false;
                WindowUtils.setCaption(_loc4_, "${snowwar.play}");
                return true;
            case 1:
                param1.visible = true;
                param2.textColor = 16711680;
                WindowUtils.setCaption(_loc4_, "${catalog.vip.buy.title}");
                return false;
            default:
                param1.visible = true;
                param2.textColor = 1079212;
                WindowUtils.setCaption(_loc4_, "${snowwar.play}");
                return true;
        }
    }

    private checkBlockStatus(param1: IWindow): void {
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        let _loc4_: IWindow = castGuarded(this._SafeStr_2133.findChildByName("play_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (this._SafeStr_2521 > 0) {
            param1.disable();
            param1.color = 13421772;
            _loc3_ = Math.floor(this._SafeStr_2521 / 60) | 0;
            _loc2_ = this._SafeStr_2521 % 60;
            _loc4_.caption = _loc3_ + ":" + (_loc2_ < 10 ? "0" + _loc2_ : _loc2_);
        } else if (this._SafeStr_2521 <= 0) {
            param1.enable();
            param1.color = 5622784;
            WindowUtils.setCaption(_loc4_, "${snowwar.play}");
        }
    }

    private onTick = (param1: TimerEvent): void => {
        if (this._SafeStr_2521 && this._SafeStr_2521 > 0) {
            this._SafeStr_2521 = this._SafeStr_2521 - 1;
            HabboGamesCom.log("on block tick " + this._SafeStr_2521);
            this.updateGameStartingStatus();
        }
        if (this._SafeStr_2521 <= 0) {
            this.updateGameStartingStatus();
            this.disposeCounter();
        }
    };

    public changeBlockStatus(param1: number): void {
        if (param1 > 0) {
            this._SafeStr_2521 = param1;
            if (!this._SafeStr_3271) {
                this._SafeStr_3271 = new Timer(1000, this._SafeStr_2521);
                this._SafeStr_3271.addEventListener("timer", this.onTick);
                this._SafeStr_3271.start();
            }
        }
        this.updateGameStartingStatus();
    }

    get [IDisposable](): true {
        return true;
    }
}
