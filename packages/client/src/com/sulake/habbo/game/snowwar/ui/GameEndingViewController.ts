import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAsset } from '@/com/sulake/core/assets/IAsset';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarFigureContainer } from '@/com/sulake/habbo/avatar/IAvatarFigureContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { Game2GameResult } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2GameResult';
import type { Game2SnowWarGameStats } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2SnowWarGameStats';
import type { Game2TeamPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2TeamPlayerData';
import type { Game2TeamScoreData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2TeamScoreData';
import type { GameLobbyData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyData';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Game2ExitGameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/arena/Game2ExitGameMessageComposer';
import { Game2GetAccountGameStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2GetAccountGameStatusMessageComposer';
import { Game2LeaveGameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2LeaveGameMessageComposer';
import { GetGuestRoomMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/navigator/GetGuestRoomMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { GameLobbyPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyPlayerData';
import { BackgroundViewController, HabboGamesCom, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarAnimatedWindowElement } from '@/com/sulake/habbo/game/snowwar/utils/SnowWarAnimatedWindowElement';

export class GameEndingViewController implements IDisposable, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.ui::GameEndingViewController'); }

    private static readonly NUMBER_OF_TEAMS: number = 2;
    private static readonly STATE_RESULTS: number = 0;
    private static readonly STATE_RESULTS_PENDING_REMATCH: number = 1;
    private static readonly STATE_WAITING: number = 2;
    private static readonly STATE_LOBBY: number = 3;
    private static readonly STATE_LOADING: number = 4;
    private static readonly STATE_AFTER_SKI: number = 5;
    private static readonly _SafeStr_8003: number = 1;

    constructor(param1: SnowWarEngine, param2: any[], param3: Game2SnowWarGameStats, param4: Game2GameResult, param5: number) {
        this._teams = param2;
        this._players = new Dictionary();
        this._gameEngine = param1;
        this._gameResult = param4;
        this._SafeStr_2921 = new UtilsMap();
        param1.roomUI.visible = false;
        param1.windowManager.getDesktop(1).visible = false;
        this._SafeStr_3852 = new BackgroundViewController(this._gameEngine);
        this._SafeStr_3852.background.visible = true;
        this.createMainView();
        for (const _loc6_ of param2 ?? []) {
            this.addTeamScores(_loc6_);
        }
        let _loc7_: ITextWindow = asGuarded(this.getElement(this._window, "endingInformation"), isITextWindow);
        if (this._gameResult.resultType == 2) {
            WindowUtils.colorStrokes(_loc7_.parent, this.getNeutralTeamColor());
            WindowUtils.setCaption(_loc7_, "${snowwar.result.tie}");
        } else {
            WindowUtils.colorStrokes(_loc7_.parent, this.getTeamColor(this._gameResult.winnerId));
            WindowUtils.setCaption(_loc7_, "${snowwar.team_" + this._gameResult.winnerId + "_wins}");
        }
        this.showMostHits(param3.playerWithMostHits);
        this.showMostKills(param3.playerWithMostKills);
        this.startResultsCountDown(param5);
        if (this._gameEngine.hasUnlimitedGames) {
            WindowUtils.hideElement(this._window, "statusContainer");
        } else {
            WindowUtils.showElement(this._window, "statusContainer");
            this._gameEngine.communication.connection.send(new Game2GetAccountGameStatusMessageComposer(0));
        }
        this.updateGamesLeft();
    }

    declare private _window: IWindowContainer;

    declare private _gameEngine: SnowWarEngine;

    private _disposed: boolean = false;

    declare private _teams: any[];

    declare private _players: Map<any, any>;

    declare private _SafeStr_3852: BackgroundViewController;

    declare private _gameResult: Game2GameResult;

    declare private _SafeStr_3433: Timer;

    private _counter: number = 0;
    private _state: number = 0;

    declare private _lobbyPlayers: UtilsMap;

    declare private _SafeStr_2921: UtilsMap;

    private _buyButtonMode: number = 1;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._gameEngine.windowManager.getDesktop(1).visible = true;
        this.disposeCountDownTimer();
        if (this._SafeStr_2921) {
            for (const _loc1_ of valuesOf(this._SafeStr_2921)) {
                _loc1_.dispose();
            }
            this._SafeStr_2921.dispose();
            this._SafeStr_2921 = null;
        }
        if (this._SafeStr_3852) {
            this._SafeStr_3852.dispose();
            this._SafeStr_3852 = null;
        }
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
        this._teams = null;
        this._players = null;
        this._gameResult = null;
        this._disposed = true;
    }

    public onClose(param1: boolean): void {
        if (param1) {
            this._gameEngine.gameCancelled(true);
            if (this._state == 3 || this._state == 2) {
                this._gameEngine.communication.connection.send(new Game2LeaveGameMessageComposer());
                if (this._gameEngine.roomBeforeGame > -1) {
                    this._gameEngine.communication.connection.send(new GetGuestRoomMessageComposer(this._gameEngine.roomBeforeGame, false, true));
                }
            } else if (this._state == 5) {
                if (this._gameEngine.roomBeforeGame > -1) {
                    this._gameEngine.communication.connection.send(new GetGuestRoomMessageComposer(this._gameEngine.roomBeforeGame, false, true));
                } else {
                    this._gameEngine.communication.connection.send(new Game2ExitGameMessageComposer());
                }
            } else {
                this._gameEngine.communication.connection.send(new Game2ExitGameMessageComposer());
            }
            this.disposeCountDownTimer();
        }
    }

    public avatarImageReady(param1: string): void {
    }

    public playerRematches(param1: number): void {
        let _loc5_: SnowWarAnimatedWindowElement = null;
        let _loc3_: IItemListWindow = asGuarded(this._window.findChildByName("player" + param1), isIItemListWindow);
        if (_loc3_ == null) {
            return;
        }
        let _loc6_: Game2TeamPlayerData = this._players.get(param1);
        if (_loc6_ == null) {
            return;
        }
        _loc6_.willRejoin = true;
        let _loc2_: IWindowContainer = asGuarded(_loc3_.getListItemByName("playerScoreContainer"), isIWindowContainer);
        let _loc4_: IBitmapWrapperWindow = asGuarded(this.getElement(_loc2_, "playerScoreGlow"), isIBitmapWrapperWindow);
        if (!this._SafeStr_2921.hasKey(_loc4_)) {
            _loc5_ = new SnowWarAnimatedWindowElement(this._gameEngine.assets, _loc4_, "rematch_", 6, 100, true);
            this._SafeStr_2921.add(_loc4_, _loc5_);
        }
    }

    public changeToWaitState(param1: boolean): void {
        let _loc6_: IItemListWindow = null;
        let _loc3_: IItemListWindow = null;
        let _loc4_: IWindowContainer = null;
        let _loc2_: IWindowContainer = null;
        if (!param1) {
            return this.changeToAfterSkiState();
        }
        this._state = 2;
        this.stopResultsCountDown();
        let _loc5_: any[] = [];
        for (const _loc8_ of this._players?.values() ?? []) {
            _loc6_ = asGuarded(this._window.findChildByName("team" + _loc8_.teamId + "PlayersList"), isIItemListWindow);
            _loc3_ = asGuarded(this._window.findChildByName("player" + _loc8_.userId), isIItemListWindow);
            if (_loc3_ == null) {
                return;
            }
            if (!_loc8_.willRejoin) {
                _loc6_.removeListItem(_loc3_);
                _loc5_.push(_loc8_.userId);
            } else {
                _loc4_ = asGuarded(_loc3_.getListItemByName("playerDataContainer"), isIWindowContainer);
                _loc2_ = asGuarded(_loc3_.getListItemByName("playerScoreContainer"), isIWindowContainer);
                _loc4_.findChildByName("playerStats").visible = false;
                WindowUtils.setCaption(this.getElement(_loc4_, "playerName"), stringOrNull(_loc8_.userName));
                WindowUtils.hideElement(_loc2_, "playerScore");
            }
        }
        for (const _loc7_ of _loc5_ ?? []) {
            this._players.delete(_loc7_);
        }
        WindowUtils.hideElement(this._window, "buttonsContainer");
        WindowUtils.hideElement(this._window, "mostKillsContainer");
        WindowUtils.hideElement(this._window, "mostHitsContainer");
        WindowUtils.hideElement(this._window, "team1Score");
        WindowUtils.hideElement(this._window, "team2Score");
        WindowUtils.setCaption(this.getElement(this._window, "endingInformation"), "${snowwar.lobby_waiting_for_more_players}");
    }

    public startLobbyCountDown(param1: number): void {
        this._state = 3;
        this.startCountDownTimer(param1);
        this.updateDialog();
    }

    public stopLobbyCountDown(): void {
        this.disposeCountDownTimer();
        this.updateDialog();
    }

    public changeToLobbyState(param1: GameLobbyData): void {
        let _loc4_: IItemListWindow = null;
        let _loc2_: IItemListWindow = null;
        this._state = 3;
        this._lobbyPlayers = new UtilsMap();
        let _loc3_: any[] = [];
        for (const _loc6_ of this._players?.values() ?? []) {
            _loc4_ = asGuarded(this._window.findChildByName("team" + _loc6_.teamId + "PlayersList"), isIItemListWindow);
            _loc2_ = asGuarded(this._window.findChildByName("player" + _loc6_.userId), isIItemListWindow);
            if (_loc2_ == null) {
                return;
            }
            _loc4_.removeListItem(_loc2_);
            _loc3_.push(_loc6_.userId);
        }
        for (const _loc5_ of _loc3_ ?? []) {
            this._players.delete(_loc5_);
        }
        this._window.findChildByName("loadingContainer").visible = true;
        WindowUtils.hideElement(asGuarded(this._window.findChildByName("loadingContainer"), isIWindowContainer), "loadingText");
        WindowUtils.setCaption(this._window.findChildByName("arenaName"), this._gameEngine.getArenaName(param1));
        WindowUtils.colorStrokes(this.getElement(this._window, "headerContainer"), this.getTeamColor(1));
        WindowUtils.setElementImage(this._window.findChildByName("arenaPreview"), this.getBitmap("arena_" + param1.fieldType + "_preview"));
    }

    public playerJoined(param1: GameLobbyPlayerData): void {
        if (param1) {
            this._lobbyPlayers.add(param1.userId, param1);
            this.renderLobbyPlayers();
        }
    }

    public playerLeft(param1: number): void {
        let _loc2_: GameLobbyPlayerData = this._lobbyPlayers[param1];
        if (_loc2_ != null) {
            this._lobbyPlayers.remove(param1);
        }
        this.renderLobbyPlayers();
    }

    public updateGamesLeft(): void {
        let _loc4_: ITextWindow = null;
        let _loc1_: IWindow = null;
        let _loc3_: IWindowContainer = asGuarded(this._window.findChildByName("buttonsContainer"), isIWindowContainer);
        let _loc2_: IWindowContainer = asGuarded(this._window.findChildByName("statusContainer"), isIWindowContainer);
        if (_loc2_ && _loc3_) {
            _loc3_.visible = true;
            WindowUtils.setCaption(_loc2_.findChildByName("games_left"), this._gameEngine.freeGamesLeft.toString());
            _loc4_ = asGuarded(_loc2_.findChildByName("games_left_stroke"), isITextWindow);
            _loc1_ = this._window.findChildByName("button_rematch");
            this.updateGettingMoreGamesOption();
            if (this._gameEngine.hasUnlimitedGames) {
                _loc1_.enable();
                _loc1_.color = 5622784;
                _loc2_.visible = false;
                return;
            }
            switch (this._gameEngine.freeGamesLeft - -1) {
                case 0:
                    _loc1_.enable();
                    _loc1_.color = 5622784;
                    _loc2_.visible = false;
                    break;
                case 1:
                    _loc4_.textColor = 16711680;
                    _loc1_.enable();
                    _loc1_.color = 5622784;
                    break;
                default:
                    _loc4_.textColor = 1079212;
                    _loc1_.enable();
                    _loc1_.color = 5622784;
            }
        }
    }

    private createMainView(): void {
        this._window = asGuarded(WindowUtils.createWindow("snowwar_ending"), isIWindowContainer);
        this._window.x = (this._window.desktop.width - this._window.width) / 2 | 0;
        this._window.y = this._window.desktop.height > 685 ? 115 : 10;
        this._window.findChildByName("leave_link_region").procedure = this.onCancel;
        this._window.findChildByName("button_rematch").addEventListener("WME_CLICK", this.onJoinRematch);
        this._window.findChildByName("button_play_again").addEventListener("WME_CLICK", this.onPlayAgain);
        this._window.findChildByName("button_buy_games").addEventListener("WME_CLICK", this.onBuyMoreGames);
        this._window.findChildByName("loadingContainer").visible = false;
        this._window.findChildByName("statusContainer").addEventListener("WME_CLICK", this.onGetMore);
    }

    private onJoinRematch = (param1: WindowMouseEvent = null, param2: IWindow = null): void => {
        let _loc3_: IWindow = null;
        if (this._gameEngine.freeGamesLeft == 0) {
            this.onGetMore(param1);
        } else {
            this._state = 1;
            this._gameEngine.sendRejoinGame();
            _loc3_ = this._window.findChildByName("button_rematch");
            _loc3_.color = 13421772;
            _loc3_.disable();
            this._window.findChildByName("statusContainer").visible = false;
        }
    };

    private onPlayAgain = (param1: WindowEvent = null, param2: IWindow = null): void => {
        this._gameEngine.startQuickServerGame();
        this._window.findChildByName("button_play_again").visible = false;
        this._window.findChildByName("statusContainer").visible = false;
    };

    private onBuyMoreGames = (param1: WindowMouseEvent): void => {
        this.onGetMore(param1);
    };

    private updateGettingMoreGamesOption(): void {
        let _loc2_: IWindow = this._window.findChildByName("button_rematch");
        let _loc1_: IWindow = this._window.findChildByName("button_buy_games");
        let _loc3_: IWindow = this._window.findChildByName("status.text_get_vip");
        let _loc4_: IWindow = this._window.findChildByName("status.text_get_more_games");
        _loc2_.visible = false;
        _loc1_.visible = false;
        _loc3_.visible = false;
        _loc4_.visible = false;
        switch (this._buyButtonMode - 1) {
            case 0:
                if (this._gameEngine.freeGamesLeft == 0) {
                    _loc1_.visible = true;
                } else {
                    _loc2_.visible = true;
                }
                _loc4_.visible = true;
                break;
            default:
                _loc2_.visible = true;
                _loc3_.visible = true;
        }
    }

    private onCancel = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.onClose(true);
    };

    private disposeCountDownTimer(): void {
        if (this._SafeStr_3433) {
            this._SafeStr_3433.removeEventListener("timer", this.onTick);
            this._SafeStr_3433.stop();
            this._SafeStr_3433 = null;
            this._counter = 0;
        }
    }

    private addTeamScores(param1: Game2TeamScoreData): void {
        let _loc2_: number = param1.teamReference;
        for (const _loc3_ of param1.players ?? []) {
            this.addPlayerScore(_loc3_);
        }
        WindowUtils.setCaption(this.getElement(this._window, "team" + _loc2_ + "Score"), param1.score.toString());
    }

    private addPlayerScore(param1: Game2TeamPlayerData): void {
        this._players.set(param1.userId, param1);
        let _loc6_: IItemListWindow = asGuarded(this._window.findChildByName("team" + param1.teamId + "PlayersList"), isIItemListWindow);
        let _loc5_: IItemListWindow = asGuarded(WindowUtils.createWindow("snowwar_results_player_team_" + param1.teamId), isIItemListWindow);
        let _loc7_: IWindowContainer = asGuarded(_loc5_.getListItemByName("playerImageContainer"), isIWindowContainer);
        let _loc4_: IWindowContainer = asGuarded(_loc5_.getListItemByName("playerDataContainer"), isIWindowContainer);
        let _loc2_: IWindowContainer = asGuarded(_loc5_.getListItemByName("playerScoreContainer"), isIWindowContainer);
        WindowUtils.setElementImage(this.getElement(_loc7_, "playerImage"), this.getAvatarFigure(param1.teamId, param1.figure, param1.gender), 0, 0, 0);
        WindowUtils.setCaption(this.getElement(_loc4_, "playerName"), param1.userName);
        WindowUtils.hideElement(_loc4_, "playerTotalStats");
        WindowUtils.setCaption(this.getElement(_loc4_, "playerHits"), param1.playerStats.snowballHits.toString());
        WindowUtils.setCaption(this.getElement(_loc4_, "playerKills"), param1.playerStats.kills.toString());
        WindowUtils.setCaption(this.getElement(_loc2_, "playerScore"), param1.score.toString());
        let _loc3_: IWindowContainer = asGuarded(_loc7_.findChildByName("addFriend"), isIWindowContainer);
        if (this._gameEngine.friendList.canBeAskedForAFriend(param1.userId) && param1.userId != this._gameEngine.sessionDataManager.userId) {
            _loc3_.id = param1.userId;
            _loc3_.getChildAt(0).id = param1.teamId;
            _loc3_.addEventListener("WME_CLICK", this.onAddFriendClick);
            _loc3_.addEventListener("WME_OVER", this.onAddFriendOver);
            _loc3_.addEventListener("WME_OUT", this.onAddFriendOut);
            _loc3_.visible = true;
        }
        _loc6_.addListItem(_loc5_);
        _loc5_.name = "player" + param1.userId;
    }

    private onAddFriendClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = param1.window.id;
        let _loc3_: Game2TeamPlayerData = this._players.get(_loc2_);
        if (_loc3_) {
            this._gameEngine.friendList.askForAFriend(_loc2_, _loc3_.userName);
            this._gameEngine.communication.connection.send(new EventLogMessageComposer("GameFramework", "SnowStorm", "gameFramework.sendFriendRequest.rematchView"));
            this._gameEngine.addChatMessage(_loc2_, "${snowwar.friend_request.sent}", true);
        }
        param1.window.visible = false;
    };

    private onAddFriendOver = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = (asGuarded(param1.window, isIWindowContainer)).getChildAt(0);
        WindowUtils.setElementImage(_loc2_, this.getBitmap("add_friend_icon_green"));
    };

    private onAddFriendOut = (param1: WindowMouseEvent): void => {
        let _loc2_: IWindow = (asGuarded(param1.window, isIWindowContainer)).getChildAt(0);
        let _loc3_: string = "add_friend_icon_" + (_loc2_.id == 1 ? "blue" : "red");
        WindowUtils.setElementImage(_loc2_, this.getBitmap(_loc3_));
    };

    private showMostHits(param1: number): void {
        let _loc3_: Game2TeamPlayerData = this._players.get(param1);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._window.findChildByName("mostHitsContainer"), isIWindowContainer);
        if (_loc3_.playerStats.snowballHits == 0) {
            _loc2_.visible = false;
            return;
        }
        WindowUtils.setElementImage(this.getElement(_loc2_, "backgroundImage"), this.getBitmap(this.getPlayerImageBackground(_loc3_.teamId)));
        WindowUtils.setElementImage(this.getElement(_loc2_, "playerImage"), this.getAvatarFigure(_loc3_.teamId, _loc3_.figure, _loc3_.gender), 0, 0, 0);
        WindowUtils.setCaption(this.getElement(_loc2_, "playerName"), _loc3_.userName);
        WindowUtils.colorStrokes(_loc2_, this.getTeamColor(_loc3_.teamId));
    }

    private showMostKills(param1: number): void {
        let _loc3_: Game2TeamPlayerData = this._players.get(param1);
        if (_loc3_ == null) {
            return;
        }
        let _loc2_: IWindowContainer = asGuarded(this._window.findChildByName("mostKillsContainer"), isIWindowContainer);
        if (_loc3_.playerStats.kills == 0) {
            _loc2_.visible = false;
            return;
        }
        WindowUtils.setElementImage(this.getElement(_loc2_, "backgroundImage"), this.getBitmap(this.getPlayerImageBackground(_loc3_.teamId)));
        WindowUtils.setElementImage(this.getElement(_loc2_, "playerImage"), this.getAvatarFigure(_loc3_.teamId, _loc3_.figure, _loc3_.gender), 0, 0, 0);
        WindowUtils.setCaption(this.getElement(_loc2_, "playerName"), _loc3_.userName);
        WindowUtils.colorStrokes(_loc2_, this.getTeamColor(_loc3_.teamId));
    }

    private getPlayerImageBackground(param1: number): string {
        let _loc2_: string = null;
        switch (param1 - 1) {
            case 0:
                _loc2_ = "blue_square";
                break;
            case 1:
                _loc2_ = "red_square";
                break;
            default:
                _loc2_ = "blue_square";
        }
        return _loc2_;
    }

    private getNeutralTeamColor(): number {
        return 8227482;
    }

    private getTeamColor(param1: number): number {
        switch (param1 - 1) {
            case 0:
                return 4279269292;
            case 1:
                return 4294797401;
            default:
                return 4279269292;
        }
    }

    private getTeamPlayerDirection(param1: number): number {
        switch (param1 - 1) {
            case 0:
                return 2;
            case 1:
                return 4;
            default:
                return 2;
        }
    }

    private getAvatarFigure(param1: number, param2: string, param3: string): BitmapData {
        let _loc4_: IAvatarFigureContainer = this._gameEngine.avatarManager.createFigureContainer(param2);
        switch (param1 - 1) {
            case 0:
                _loc4_.updatePart("ch", 20000, [1]);
                break;
            case 1:
                _loc4_.updatePart("ch", 20001, [1]);
                break;
            default:
                _loc4_.updatePart("ch", 20000, [1]);
        }
        _loc4_.removePart("cc");
        let _loc5_: IAvatarImage = this._gameEngine.avatarManager.createAvatarImage(_loc4_.getFigureString(), "h_50", param3, this);
        if (_loc5_) {
            _loc5_.setDirection("full", this.getTeamPlayerDirection(param1) | 0);
            return _loc5_.getCroppedImage("full");
        }
        return null;
    }

    private getElement(param1: IWindowContainer, param2: string): IWindow {
        return param1 != null ? param1.findChildByName(param2) : null;
    }

    private getBitmap(param1: string): BitmapData {
        let _loc2_: IAsset = this._gameEngine.assets.getAssetByName(param1);
        if (_loc2_) {
            return asInstanceOf(_loc2_.content, BitmapData);
        }
        return null;
    }

    private changeToAfterSkiState(): void {
        this._state = 5;
        if (this._SafeStr_2921) {
            for (const _loc2_ of valuesOf(this._SafeStr_2921)) {
                _loc2_.dispose();
            }
            this._SafeStr_2921.reset();
        }
        this.hideChatInput();
        if (this._gameEngine.freeGamesLeft == 0) {
            return;
        }
        this._window.findChildByName("button_rematch").visible = false;
        this._window.findChildByName("button_play_again").visible = true;
        let _loc1_: IWindow = this._window.findChildByName("button_play_again");
        _loc1_.enable();
        _loc1_.color = 5622784;
    }

    private updateDialog(): void {
        if (this._disposed) {
            return;
        }
        let _loc1_: ITextWindow = asGuarded(this._window.findChildByName("endingInformation"), isITextWindow);
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("endingInformation_stroke"), isITextWindow);
        _loc1_.fontSize = 28;
        _loc2_.fontSize = 28;
        if (this._gameEngine.freeGamesLeft == 0) {
            WindowUtils.setCaption(this.getElement(this._window, "button_rematch"), "${catalog.vip.buy.title}");
        } else if (this._state == 0) {
            this._gameEngine.localization.registerParameter("snowwar.rematch", "seconds", this._counter.toString());
            WindowUtils.setCaption(this.getElement(this._window, "button_rematch"), "${snowwar.rematch}");
        } else if (this._state == 1) {
            this._gameEngine.localization.registerParameter("snowwar.please_wait", "seconds", this._counter.toString());
            WindowUtils.setCaption(this.getElement(this._window, "button_rematch"), "${snowwar.please_wait}");
        } else if (this._state == 3) {
            this._gameEngine.localization.registerParameter("snowwar.lobby_game_start_countdown", "seconds", this._counter.toString());
            WindowUtils.setCaption(this.getElement(this._window, "endingInformation"), "${snowwar.lobby_game_start_countdown}");
            _loc1_.fontSize = 22;
            _loc2_.fontSize = 22;
        } else if (this._state == 2) {
            WindowUtils.setCaption(this.getElement(this._window, "endingInformation"), "${snowwar.lobby_waiting_for_more_players}");
            _loc1_.fontSize = 22;
            _loc2_.fontSize = 22;
        }
    }

    private startCountDownTimer(param1: number): void {
        this.disposeCountDownTimer();
        this._SafeStr_3433 = new Timer(1000, param1);
        this._SafeStr_3433.addEventListener("timer", this.onTick);
        this._SafeStr_3433.start();
        this._counter = param1;
    }

    private startResultsCountDown(param1: number): void {
        this.startCountDownTimer(param1);
        this.updateDialog();
    }

    private stopResultsCountDown(): void {
        this.disposeCountDownTimer();
        this.updateDialog();
    }

    private renderLobbyPlayers(): void {
        this.clearPlayers();
        let _loc1_: any[] = this._lobbyPlayers.getValues();
        if (this._state != 0 && this._state != 1) {
            _loc1_.sort(GameLobbyPlayerData._SafeStr_5887);
        }
        for (const _loc2_ of _loc1_ ?? []) {
            this.addLobbyPlayer(_loc2_);
        }
    }

    private clearPlayers(): void {
        let _loc2_: IItemListWindow = null;
        let _loc1_: number = 1;
        while (true) {
            _loc2_ = asGuarded(this._window.findChildByName("team" + _loc1_++ + "PlayersList"), isIItemListWindow);
            if (_loc2_ == null) {
                break;
            }
            _loc2_.destroyListItems();
        }
    }

    private addLobbyPlayer(param1: GameLobbyPlayerData): void {
        HabboGamesCom.log("Add Lobby Player: " + [param1.name, param1.userId, param1.teamId]);
        let _loc4_: number = this._lobbyPlayers.getKeys().indexOf(param1.userId) % 2 + 1;
        let _loc7_: IItemListWindow = asGuarded(this._window.findChildByName("team" + _loc4_ + "PlayersList"), isIItemListWindow);
        if (_loc7_ == null) {
            return;
        }
        let _loc6_: IItemListWindow = asGuarded(WindowUtils.createWindow("snowwar_lobby_player_team_" + _loc4_), isIItemListWindow);
        if (_loc6_ == null) {
            return;
        }
        let _loc8_: IWindowContainer = asGuarded(_loc6_.getListItemByName("playerImageContainer"), isIWindowContainer);
        let _loc5_: IWindowContainer = asGuarded(_loc6_.getListItemByName("playerDataContainer"), isIWindowContainer);
        let _loc2_: IWindowContainer = asGuarded(_loc6_.getListItemByName("playerScoreContainer"), isIWindowContainer);
        WindowUtils.setElementImage(this.getElement(_loc8_, "playerImage"), this.getAvatarFigure(_loc4_, param1.figure, param1.gender));
        WindowUtils.setCaption(this.getElement(_loc5_, "playerName"), param1.name);
        WindowUtils.hideElement(_loc5_, "playerStats");
        WindowUtils.hideElement(_loc2_, "playerScore");
        WindowUtils.hideElement(_loc5_, "playerTotalStats");
        let _loc9_: IBitmapWrapperWindow = asGuarded(_loc5_.findChildByName("skillLevel"), isIBitmapWrapperWindow);
        if (_loc9_.bitmap) {
            _loc9_.bitmap.dispose();
        }
        _loc9_.bitmap = this.getSkillLevelImage(param1.skillLevel, _loc4_);
        let _loc3_: IRegionWindow = asGuarded(_loc5_.findChildByName("scoreTooltip"), isIRegionWindow);
        _loc3_.toolTipCaption = param1.totalScore.toString() + "/" + param1.scoreToNextLevel.toString();
        _loc3_.visible = true;
        _loc7_.addListItem(_loc6_);
    }

    private getSkillLevelImage(param1: number, param2: number): BitmapData {
        let _loc6_: BitmapData = null;
        let _loc8_: number = 0;
        let _loc7_: Point = null;
        param1 = Math.min(param1, 30) | 0;
        let _loc3_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_empty").content, BitmapData);
        let _loc11_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_filled_bronze").content, BitmapData);
        let _loc9_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_filled_silver").content, BitmapData);
        let _loc10_: BitmapData = asInstanceOf(this._gameEngine.assets.getAssetByName("star_filled_gold").content, BitmapData);
        let _loc5_: number = param1 > 0 ? (param1 - 1) % 10 + 1 : 0;
        let _loc4_: BitmapData = new BitmapData(150, 13, true, 0);
        _loc8_ = 0;
        while (_loc8_ < 10) {
            _loc7_ = param2 == 1 ? new Point(_loc8_ * 15, 0) : new Point((9 - _loc8_) * 15, 0);
            _loc6_ = param1 > 20 ? (_loc5_-- > 0 ? _loc10_ : _loc3_) : (param1 > 10 ? (_loc5_-- > 0 ? _loc9_ : _loc3_) : (_loc5_-- > 0 ? _loc11_ : _loc3_));
            _loc4_.copyPixels(_loc6_, _loc6_.rect, _loc7_);
            _loc8_++;
        }
        return _loc4_;
    }

    private onGetMore = (param1: WindowMouseEvent): void => {
        switch (this._buyButtonMode - 1) {
            case 0:
                this._gameEngine.openGetMoreGames("gameFramework.buyTokens.clicked.rematchView");
                break;
            default:
                this.onClose(true);
                this._gameEngine.openClubCenter("gameFramework.getVip.clicked.rematchView");
        }
    };

    private hideChatInput(): void {
        this._gameEngine.roomUI.hideWidget("RWE_CHAT_INPUT_WIDGET");
    }

    private onTick = (param1: TimerEvent): void => {
        if (this._counter && this._counter > 0) {
            this._counter = this._counter - 1;
            HabboGamesCom.log("On results window tick " + this._counter);
            this.updateDialog();
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
