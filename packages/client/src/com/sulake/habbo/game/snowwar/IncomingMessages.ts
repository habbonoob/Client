import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { Game2AccountGameStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2AccountGameStatusMessageParser';
import type { Game2GameCreatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameCreatedMessageParser';
import type { Game2GameDirectoryStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameDirectoryStatusMessageParser';
import type { Game2GameLongDataMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameLongDataMessageParser';
import type { Game2GameStartedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2GameStartedMessageParser';
import type { Game2InArenaQueueMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2InArenaQueueMessageParser';
import type { Game2JoiningGameFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2JoiningGameFailedMessageParser';
import type { Game2StartCounterMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2StartCounterMessageParser';
import type { Game2UserBlockedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2UserBlockedMessageParser';
import type { Game2UserJoinedGameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2UserJoinedGameMessageParser';
import type { Game2UserLeftGameMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/directory/Game2UserLeftGameMessageParser';
import type { Game2GroupLeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2GroupLeaderboardParser';
import type { Game2LeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2LeaderboardParser';
import type { Game2WeeklyGroupLeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2WeeklyGroupLeaderboardParser';
import type { Game2WeeklyLeaderboardParser } from '@/com/sulake/habbo/communication/messages/parser/game/score/Game2WeeklyLeaderboardParser';
import type { Game2ArenaEnteredMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2ArenaEnteredMessageParser';
import type { Game2EnterArenaFailedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2EnterArenaFailedMessageParser';
import type { Game2EnterArenaMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2EnterArenaMessageParser';
import type { Game2GameChatFromPlayerMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2GameChatFromPlayerMessageParser';
import type { Game2GameEndingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2GameEndingMessageParser';
import type { Game2GameRejoinMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2GameRejoinMessageParser';
import type { Game2PlayerExitedGameArenaMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2PlayerExitedGameArenaMessageParser';
import type { Game2PlayerRematchesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2PlayerRematchesMessageParser';
import type { Game2StageEndingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageEndingMessageParser';
import type { Game2StageLoadMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageLoadMessageParser';
import type { Game2StageRunningMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageRunningMessageParser';
import type { Game2StageStartingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageStartingMessageParser';
import type { Game2StageStillLoadingMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/arena/Game2StageStillLoadingMessageParser';
import type { FullGameStatusData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/FullGameStatusData';
import type { Game2PlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2PlayerData';
import type { GameLobbyData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyData';
import type { GameObjectsData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameObjectsData';
import type { GameStatusData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameStatusData';
import type { Game2FullGameStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/ingame/Game2FullGameStatusMessageParser';
import type { Game2GameStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/ingame/Game2GameStatusMessageParser';
import type { ISynchronizedGameEvent } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameEvent';
import type { SynchronizedGameArena } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameArena';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowWarEngine } from '@/com/sulake/habbo/game/snowwar/SnowWarEngine';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { Game2AccountGameStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2AccountGameStatusMessageEvent';
import { Game2GameCancelledMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2GameCancelledMessageEvent';
import { Game2GameCreatedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2GameCreatedMessageEvent';
import { Game2GameDirectoryStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2GameDirectoryStatusMessageEvent';
import { Game2GameLongDataMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2GameLongDataMessageEvent';
import { Game2GameStartedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2GameStartedMessageEvent';
import { Game2InArenaQueueMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2InArenaQueueMessageEvent';
import { Game2JoiningGameFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2JoiningGameFailedMessageEvent';
import { Game2StartCounterMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2StartCounterMessageEvent';
import { Game2StartingGameFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2StartingGameFailedMessageEvent';
import { Game2StopCounterMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2StopCounterMessageEvent';
import { Game2UserBlockedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2UserBlockedMessageEvent';
import { Game2UserJoinedGameMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2UserJoinedGameMessageEvent';
import { Game2UserLeftGameMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/directory/Game2UserLeftGameMessageEvent';
import { Game2FriendsLeaderboardEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/score/Game2FriendsLeaderboardEvent';
import { Game2TotalGroupLeaderboardEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/score/Game2TotalGroupLeaderboardEvent';
import { Game2TotalLeaderboardEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/score/Game2TotalLeaderboardEvent';
import { Game2WeeklyFriendsLeaderboardEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/score/Game2WeeklyFriendsLeaderboardEvent';
import { Game2WeeklyGroupLeaderboardEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/score/Game2WeeklyGroupLeaderboardEvent';
import { Game2WeeklyLeaderboardEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/score/Game2WeeklyLeaderboardEvent';
import { Game2ArenaEnteredMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2ArenaEnteredMessageEvent';
import { Game2EnterArenaFailedMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2EnterArenaFailedMessageEvent';
import { Game2EnterArenaMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2EnterArenaMessageEvent';
import { Game2GameChatFromPlayerMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2GameChatFromPlayerMessageEvent';
import { Game2GameEndingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2GameEndingMessageEvent';
import { Game2GameRejoinMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2GameRejoinMessageEvent';
import { Game2PlayerExitedGameArenaMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2PlayerExitedGameArenaMessageEvent';
import { Game2PlayerRematchesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2PlayerRematchesMessageEvent';
import { Game2StageEndingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2StageEndingMessageEvent';
import { Game2StageLoadMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2StageLoadMessageEvent';
import { Game2StageRunningMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2StageRunningMessageEvent';
import { Game2StageStartingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2StageStartingMessageEvent';
import { Game2StageStillLoadingMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/arena/Game2StageStillLoadingMessageEvent';
import { Game2FullGameStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/ingame/Game2FullGameStatusMessageEvent';
import { Game2GameStatusMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/game/snowwar/ingame/Game2GameStatusMessageEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { ScrSendUserInfoEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/ScrSendUserInfoEvent';
import { Game2GetAccountGameStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2GetAccountGameStatusMessageComposer';
import { CreateSnowballEventData, HumanGetsSnowballsFromMachineEventData, HumanLeftGameEventData, HumanStartsToMakeASnowballEventData, HumanThrowsSnowballAtHumanEventData, HumanThrowsSnowballAtPositionEventData, MachineCreatesSnowballEventData, NewMoveTargetEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';
import { HumanGameObjectData, SnowballGameObjectData, SnowballMachineGameObjectData, SnowballPileGameObjectData, TreeGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';
import { CreateSnowballEvent, HabboGamesCom, HumanGameObject, HumanGetsSnowballsFromMachineEvent, HumanThrowsSnowballAtHumanEvent, HumanThrowsSnowballAtPositionEvent, MachineCreatesSnowballEvent, SnowBallGameObject, SnowWarGameStage, SnowballMachineGameObject, SnowballPileGameObject, TreeGameObject } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { HumanLeftGameEvent } from '@/com/sulake/habbo/game/snowwar/events/HumanLeftGameEvent';
import { HumanStartsToMakeASnowballEvent } from '@/com/sulake/habbo/game/snowwar/events/HumanStartsToMakeASnowballEvent';
import { NewMoveTargetEvent } from '@/com/sulake/habbo/game/snowwar/events/NewMoveTargetEvent';
import { SnowballGivingGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowballGivingGameObject';

export class IncomingMessages implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar::IncomingMessages'); }

    constructor(param1: SnowWarEngine) {
        this._SafeStr_2123 = param1;
        let _loc2_: IHabboCommunicationManager = this._SafeStr_2123.communication;
        _loc2_.addHabboConnectionMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        _loc2_.addHabboConnectionMessageEvent(new Game2StageRunningMessageEvent(this.onStageRunning));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameRejoinMessageEvent(this.onRejoinGame));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameLongDataMessageEvent(this.onGameLongData));
        _loc2_.addHabboConnectionMessageEvent(new Game2UserLeftGameMessageEvent(this.onUserLeft));
        _loc2_.addHabboConnectionMessageEvent(new ScrSendUserInfoEvent(this.onSubscriptionStatus));
        _loc2_.addHabboConnectionMessageEvent(new Game2AccountGameStatusMessageEvent(this.onAccountGameStatus));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameChatFromPlayerMessageEvent(this.onGameChat));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameStartedMessageEvent(this.onGameStarted));
        _loc2_.addHabboConnectionMessageEvent(new Game2PlayerRematchesMessageEvent(this.onPlayerRematches));
        _loc2_.addHabboConnectionMessageEvent(new Game2StartCounterMessageEvent(this.onLobbyCounterStart));
        _loc2_.addHabboConnectionMessageEvent(new Game2FriendsLeaderboardEvent(this.onFriendsLeaderboard));
        _loc2_.addHabboConnectionMessageEvent(new Game2WeeklyGroupLeaderboardEvent(this.onWeeklyGroupLeaderboard));
        _loc2_.addHabboConnectionMessageEvent(new Game2StartingGameFailedMessageEvent(this.onStartingGameFailed));
        _loc2_.addHabboConnectionMessageEvent(new Game2JoiningGameFailedMessageEvent(this.onJoiningGameFailed));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameCreatedMessageEvent(this.onGameCreated));
        _loc2_.addHabboConnectionMessageEvent(new Game2WeeklyFriendsLeaderboardEvent(this.onWeeklyFriendsLeaderboard));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameCancelledMessageEvent(this.onGameCancelled));
        _loc2_.addHabboConnectionMessageEvent(new Game2StageStillLoadingMessageEvent(this.onStageStillLoading));
        _loc2_.addHabboConnectionMessageEvent(new Game2UserJoinedGameMessageEvent(this.onUserJoined));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameStatusMessageEvent(this.onGameStatus));
        _loc2_.addHabboConnectionMessageEvent(new Game2UserBlockedMessageEvent(this.onPlayerBlockStatusChange));
        _loc2_.addHabboConnectionMessageEvent(new Game2WeeklyLeaderboardEvent(this.onWeeklyLeaderboard));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameEndingMessageEvent(this.onGameEnding));
        _loc2_.addHabboConnectionMessageEvent(new Game2GameDirectoryStatusMessageEvent(this.onGameDirectoryStatus));
        _loc2_.addHabboConnectionMessageEvent(new Game2EnterArenaMessageEvent(this.onEnterArena));
        _loc2_.addHabboConnectionMessageEvent(new Game2ArenaEnteredMessageEvent(this.onArenaEntered));
        _loc2_.addHabboConnectionMessageEvent(new Game2StageEndingMessageEvent(this.onStageEnding));
        _loc2_.addHabboConnectionMessageEvent(new Game2StageLoadMessageEvent(this.onStageLoad));
        _loc2_.addHabboConnectionMessageEvent(new Game2TotalGroupLeaderboardEvent(this.onTotalGroupLeaderboard));
        _loc2_.addHabboConnectionMessageEvent(new Game2StageStartingMessageEvent(this.onStageStarting));
        _loc2_.addHabboConnectionMessageEvent(new Game2PlayerExitedGameArenaMessageEvent(this.onPlayerExitedArena));
        _loc2_.addHabboConnectionMessageEvent(new Game2TotalLeaderboardEvent(this.onTotalLeaderboard));
        _loc2_.addHabboConnectionMessageEvent(new Game2StopCounterMessageEvent(this.onLobbyCounterStop));
        _loc2_.addHabboConnectionMessageEvent(new Game2EnterArenaFailedMessageEvent(this.onEnterArenaFailed));
        _loc2_.addHabboConnectionMessageEvent(new Game2FullGameStatusMessageEvent(this.onFullGameStatus));
        _loc2_.addHabboConnectionMessageEvent(new Game2InArenaQueueMessageEvent(this.onInArenaQueue));
    }

    declare private _SafeStr_2123: SnowWarEngine;

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public dispose(): void {
        this._SafeStr_2123 = null;
        this._disposed = true;
    }

    private onEnterArena = (param1: Game2EnterArenaMessageEvent): void => {
        let _loc3_: Game2EnterArenaMessageParser = param1.getParser();
        this._SafeStr_2123.initArena(_loc3_.gameType, _loc3_.fieldType, _loc3_.numberOfTeams, _loc3_.players);
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc4_: SynchronizedGameStage = _loc2_.getCurrentStage();
        _loc4_.initialize(this._SafeStr_2123.gameArena, _loc3_.gameLevel);
        this._SafeStr_2123.mainView.close(false);
    };

    private onEnterArenaFailed = (param1: Game2EnterArenaFailedMessageEvent): void => {
        let _loc2_: Game2EnterArenaFailedMessageParser = param1.getParser();
        let _loc3_: string = "snowwar.error.generic";
        switch (_loc2_.reason - 1) {
            case 0:
                _loc3_ = "snowwar.error.game_already_started";
        }
        this._SafeStr_2123.alert("${" + _loc3_ + "}");
    };

    private onArenaEntered = (param1: Game2ArenaEnteredMessageEvent): void => {
        let _loc2_: Game2ArenaEnteredMessageParser = param1.getParser();
        let _loc3_: Game2PlayerData = _loc2_.player;
    };

    private onStageLoad = (param1: Game2StageLoadMessageEvent): void => {
        let _loc2_: Game2StageLoadMessageParser = param1.getParser();
        this._SafeStr_2123.initView();
    };

    private onStageStillLoading = (param1: Game2StageStillLoadingMessageEvent): void => {
        let _loc2_: Game2StageStillLoadingMessageParser = param1.getParser();
        this._SafeStr_2123.stageLoading(_loc2_.percentage, _loc2_.finishedPlayers);
    };

    private onStageStarting = (param1: Game2StageStartingMessageEvent): void => {
        let _loc3_: Game2StageStartingMessageParser = param1.getParser();
        HabboGamesCom.log("[HabbosnowWarEngine] On stage start: " + _loc3_.countDown);
        let _loc2_: GameObjectsData = _loc3_.gameObjects;
        this.initializeGameObjects(_loc2_);
        this._SafeStr_2123.startStage(_loc3_.countDown);
    };

    private onStageRunning = (param1: Game2StageRunningMessageEvent): void => {
        let _loc2_: Game2StageRunningMessageParser = param1.getParser();
        HabboGamesCom.log("[HabbosnowWarEngine] On stage running: " + _loc2_.timeToStageEnd);
        this._SafeStr_2123.stageRunning(_loc2_.timeToStageEnd);
    };

    private onStageEnding = (param1: Game2StageEndingMessageEvent): void => {
        let _loc2_: Game2StageEndingMessageParser = param1.getParser();
        HabboGamesCom.log("[HabbosnowWarEngine] On stage ending: " + _loc2_.timeToNextState);
        if (_loc2_.timeToNextState == 0) {
            this._SafeStr_2123.resetGameSession();
        }
    };

    private onGameEnding = (param1: Game2GameEndingMessageEvent): void => {
        let _loc2_: Game2GameEndingMessageParser = param1.getParser();
        HabboGamesCom.log("[HabbosnowWarEngine] On game ending: " + _loc2_.timeToNextState);
        this._SafeStr_2123.gameOver(_loc2_.timeToNextState, _loc2_.teams, _loc2_.generalStats, _loc2_.gameResult);
    };

    private onPlayerExitedArena = (param1: Game2PlayerExitedGameArenaMessageEvent): void => {
        let _loc2_: Game2PlayerExitedGameArenaMessageParser = param1.getParser();
        HabboGamesCom.log("[HabbosnowWarEngine] On player exited arena. userId:" + _loc2_.userId + " gameObjectId:" + _loc2_.playerGameObjectId);
    };

    private onRejoinGame = (param1: Game2GameRejoinMessageEvent): void => {
        let _loc2_: Game2GameRejoinMessageParser = param1.getParser();
        HabboGamesCom.log("Rejoin game! Room Before game: " + _loc2_.roomBeforeGame);
        this._SafeStr_2123.rejoinGame(_loc2_.roomBeforeGame);
    };

    private onPlayerRematches = (param1: Game2PlayerRematchesMessageEvent): void => {
        let _loc2_: Game2PlayerRematchesMessageParser = param1.getParser();
        HabboGamesCom.log("User " + _loc2_.userId + " rematches");
        this._SafeStr_2123.playerRematches(_loc2_.userId);
    };

    private onGameDirectoryStatus = (param1: Game2GameDirectoryStatusMessageEvent): void => {
        let _loc2_: Game2GameDirectoryStatusMessageParser = param1.getParser();
        if (_loc2_.status == 0) {
            this._SafeStr_2123.mainView.changeBlockStatus(_loc2_.blockLength);
            this._SafeStr_2123.gamesPlayed = _loc2_.gamesPlayed;
            this._SafeStr_2123.onGameDirectoryAvailable(true);
            this._SafeStr_2123.gamesLeft(0, _loc2_.freeGamesLeft == -1, _loc2_.freeGamesLeft);
        } else {
            this._SafeStr_2123.onGameDirectoryAvailable(false);
            HabboGamesCom.log("Game directory not available, status:" + _loc2_.status);
        }
    };

    private onAccountGameStatus = (param1: Game2AccountGameStatusMessageEvent): void => {
        let _loc2_: Game2AccountGameStatusMessageParser = param1.getParser();
        HabboGamesCom.log("FREE GAMES LEFT: " + _loc2_.freeGamesLeft + " OR HAS UNLIMITED GAMES: " + _loc2_.hasUnlimitedGames);
        this._SafeStr_2123.gamesLeft(_loc2_.gameTypeId, _loc2_.hasUnlimitedGames, _loc2_.freeGamesLeft);
    };

    private onGameCreated = (param1: Game2GameCreatedMessageEvent): void => {
        let _loc2_: Game2GameCreatedMessageParser = param1.getParser();
        let _loc3_: GameLobbyData = _loc2_.gameLobbyData;
        this._SafeStr_2123.createLobby(_loc3_);
    };

    private onGameStarted = (param1: Game2GameStartedMessageEvent): void => {
        let _loc2_: Game2GameStartedMessageParser = param1.getParser();
        HabboGamesCom.log("Game started!");
        this._SafeStr_2123.gameStarted(_loc2_.lobbyData);
    };

    private onLobbyCounterStart = (param1: Game2StartCounterMessageEvent): void => {
        let _loc2_: Game2StartCounterMessageParser = param1.getParser();
        HabboGamesCom.log("Start Lobby Counter: " + _loc2_.countDownLength);
        this._SafeStr_2123.startLobbyCounter(_loc2_.countDownLength);
    };

    private onLobbyCounterStop = (param1: Game2StopCounterMessageEvent): void => {
        this._SafeStr_2123.stopLobbyCounter();
    };

    private onGameCancelled = (param1: Game2GameCancelledMessageEvent): void => {
        this._SafeStr_2123.gameCancelled(false);
    };

    private onInArenaQueue = (param1: Game2InArenaQueueMessageEvent): void => {
        let _loc2_: Game2InArenaQueueMessageParser = param1.getParser();
        if (this._SafeStr_2123.lobbyView) {
            this._SafeStr_2123.lobbyView.queuePosition = _loc2_.position;
        }
    };

    private onUserJoined = (param1: Game2UserJoinedGameMessageEvent): void => {
        let _loc2_: Game2UserJoinedGameMessageParser = param1.getParser();
        this._SafeStr_2123.userJoined(_loc2_.user);
    };

    private onUserLeft = (param1: Game2UserLeftGameMessageEvent): void => {
        let _loc2_: Game2UserLeftGameMessageParser = param1.getParser();
        this._SafeStr_2123.userLeft(_loc2_.userId);
    };

    private onGameLongData = (param1: Game2GameLongDataMessageEvent): void => {
        let _loc2_: Game2GameLongDataMessageParser = param1.getParser();
        let _loc3_: GameLobbyData = _loc2_.gameLobbyData;
        HabboGamesCom.log("Long data received: " + [_loc3_.fieldType, _loc3_.numberOfTeams, _loc3_.maximumPlayers]);
        this._SafeStr_2123.createLobby(_loc3_);
    };

    private onJoiningGameFailed = (param1: Game2JoiningGameFailedMessageEvent): void => {
        let _loc2_: Game2JoiningGameFailedMessageParser = param1.getParser();
        let _loc3_: string = "snowwar.error.generic";
        switch (_loc2_.reason - 2) {
            case 0:
                _loc3_ = "snowwar.error.duplicate_machineid";
                break;
            case 4:
            case 5:
                _loc3_ = "snowwar.error.has_active_instance";
                break;
            case 6:
                _loc3_ = "snowwar.error.no_free_games_left";
        }
        this._SafeStr_2123.alert("${" + _loc3_ + "}");
    };

    private onStartingGameFailed = (param1: Game2StartingGameFailedMessageEvent): void => {
        this._SafeStr_2123.alert("${snowwar.error.generic}");
    };

    private onPlayerBlockStatusChange = (param1: Game2UserBlockedMessageEvent): void => {
        let _loc2_: Game2UserBlockedMessageParser = param1.getParser();
        this._SafeStr_2123.mainView.changeBlockStatus(_loc2_.playerBlockLength);
    };

    private onFullGameStatus = (param1: Game2FullGameStatusMessageEvent): void => {
        let _loc4_: GameStatusData = null;
        let _loc3_: Game2FullGameStatusMessageParser = param1.getParser();
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        HabboGamesCom.log("On full game status: ");
        let _loc5_: FullGameStatusData = _loc3_.fullStatus;
        (asInstanceOf(_loc2_.getCurrentStage(), SnowWarGameStage)).resetTiles();
        this.initializeGameObjects(_loc5_.gameObjects);
        if (_loc2_) {
            _loc4_ = _loc5_.gameStatus;
            _loc2_.seekToTurn(_loc4_.turn, _loc4_.checksum);
            this.handleGameStatus(_loc4_, true);
        }
    };

    private onGameStatus = (param1: Game2GameStatusMessageEvent): void => {
        let _loc2_: Game2GameStatusMessageParser = param1.getParser();
        HabboGamesCom.log("[HabbosnowWarEngine] On game status: ");
        this.handleGameStatus(_loc2_.status);
    };

    private initializeGameObjects(param1: GameObjectsData): void {
        let _loc4_: HumanGameObjectData = null;
        let _loc8_: any = false;
        let _loc16_: HumanGameObject = null;
        let _loc12_: HumanGameObject = null;
        let _loc3_: SnowballGameObjectData = null;
        let _loc11_: SnowBallGameObject = null;
        let _loc13_: HumanGameObject = null;
        let _loc7_: SnowballMachineGameObjectData = null;
        let _loc15_: SnowballMachineGameObject = null;
        let _loc9_: SnowballPileGameObjectData = null;
        let _loc5_: SnowballPileGameObject = null;
        let _loc17_: TreeGameObjectData = null;
        let _loc6_: TreeGameObject = null;
        let _loc10_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        if (!_loc10_) {
            return;
        }
        let _loc14_: SnowWarGameStage = asInstanceOf(_loc10_.getCurrentStage(), SnowWarGameStage);
        _loc14_.removeAllGameObjects();
        for (const _loc2_ of param1.gameObjects ?? []) {
            switch (_loc2_.type - 1) {
                case 0:
                    _loc3_ = _loc2_ instanceof SnowballGameObjectData ? _loc2_ : null;
                    _loc11_ = new SnowBallGameObject(_loc3_.id);
                    _loc13_ = asInstanceOf(_loc14_.getGameObject(_loc3_.throwingHuman), HumanGameObject);
                    _loc11_.initializeFromData(_loc3_, _loc13_);
                    _loc14_.addGameObject(_loc11_.gameObjectId, _loc11_);
                    HabboGamesCom.log("snowball x:" + _loc3_.locationX3D + " y:" + _loc3_.locationY3D);
                    break;
                case 1:
                    _loc17_ = _loc2_ instanceof TreeGameObjectData ? _loc2_ : null;
                    _loc6_ = new TreeGameObject(_loc17_, _loc14_);
                    _loc14_.addGameObject(_loc6_.gameObjectId, _loc6_);
                    HabboGamesCom.log("tree id:" + _loc6_.gameObjectId);
                    break;
                case 2:
                    _loc9_ = _loc2_ instanceof SnowballPileGameObjectData ? _loc2_ : null;
                    _loc5_ = new SnowballPileGameObject(_loc9_, _loc14_);
                    _loc14_.addGameObject(_loc9_.id, _loc5_);
                    HabboGamesCom.log("pile id:" + _loc9_.id);
                    break;
                case 3:
                    _loc7_ = _loc2_ instanceof SnowballMachineGameObjectData ? _loc2_ : null;
                    _loc15_ = new SnowballMachineGameObject(_loc7_, _loc14_);
                    _loc14_.addGameObject(_loc7_.id, _loc15_);
                    HabboGamesCom.log("machine id:" + _loc7_.id);
                    break;
                case 4:
                    _loc4_ = _loc2_ instanceof HumanGameObjectData ? _loc2_ : null;
                    _loc8_ = _loc4_.name == this._SafeStr_2123.sessionDataManager.userName;
                    if (_loc8_) {
                        this._SafeStr_2123.ownId = _loc4_.id;
                    }
                    _loc16_ = new HumanGameObject(_loc14_, _loc4_, false, this._SafeStr_2123);
                    _loc14_.addGameObject(_loc16_.gameObjectId, _loc16_);
                    _loc16_.visualizationMode = 0;
                    if (_loc8_ && this._SafeStr_2123.isGhostEnabled) {
                        if (this._SafeStr_2123.isGhostVisualizationEnabled) {
                            _loc16_.visualizationMode = 1;
                        } else {
                            _loc16_.visualizationMode = 2;
                        }
                        if (this._SafeStr_2123.gameArena.getCurrentStage().getGameObject(_loc16_.ghostObjectId) == null) {
                            _loc12_ = new HumanGameObject(_loc14_, _loc4_, true, this._SafeStr_2123);
                            _loc12_.gameObjectId = _loc16_.ghostObjectId;
                            _loc14_.addGameObject(_loc12_.gameObjectId, _loc12_);
                        }
                    }
                    HabboGamesCom.log("human id:" + _loc4_.id + " x:" + _loc4_.currentLocationX + " y:" + _loc4_.currentLocationY);
                    break;
                default:
                    HabboGamesCom.log("Unkonwn game-object:" + _loc2_.type);
            }
        }
    }

    private handleGameStatus(param1: GameStatusData, param2: boolean = false): void {
        let _loc9_: any;
        let _loc11_: any[] = null;
        let _loc7_: ISynchronizedGameEvent = null;
        let _loc6_: ISynchronizedGameEvent = null;
        let _loc3_: UtilsMap = asInstanceOf(param1.events, UtilsMap);
        let _loc4_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        if (!_loc4_) {
            return;
        }
        let _loc10_: number = param1.turn;
        for (const _loc5_ of _loc3_.getKeys() ?? []) {
            _loc11_ = asGuarded(_loc3_.getValue(_loc5_), Array.isArray);
            for (_loc9_ of _loc11_ ?? []) {
                switch (_loc9_.id - 1) {
                    case 0:
                        _loc7_ = this.handleHumanLeftGameEvent(_loc9_ instanceof HumanLeftGameEventData ? _loc9_ : null);
                        break;
                    case 1:
                        _loc7_ = this.handleNewMoveTargetEvent(_loc9_ instanceof NewMoveTargetEventData ? _loc9_ : null);
                        break;
                    case 2:
                        _loc7_ = this.handleThrowSnowballAtHuman(_loc9_ instanceof HumanThrowsSnowballAtHumanEventData ? _loc9_ : null);
                        _loc6_ = this.handleGhostThrowSnowballAtHuman(_loc9_ instanceof HumanThrowsSnowballAtHumanEventData ? _loc9_ : null);
                        break;
                    case 3:
                        _loc7_ = this.handleThrowSnowballAtPosition(_loc9_ instanceof HumanThrowsSnowballAtPositionEventData ? _loc9_ : null);
                        _loc6_ = this.handleGhostThrowSnowballAtPosition(_loc9_ instanceof HumanThrowsSnowballAtPositionEventData ? _loc9_ : null);
                        break;
                    case 6:
                        _loc7_ = this.handleHumanStartsToMakeASnowball(_loc9_ instanceof HumanStartsToMakeASnowballEventData ? _loc9_ : null);
                        _loc6_ = this.handleGhostStartsToMakeASnowball(_loc9_ instanceof HumanStartsToMakeASnowballEventData ? _loc9_ : null);
                        break;
                    case 7:
                        _loc7_ = this.handleCreateSnowballEvent(_loc9_ instanceof CreateSnowballEventData ? _loc9_ : null);
                        break;
                    case 10:
                        _loc7_ = this.handleMachineCreatesSnowballEvent(_loc9_ instanceof MachineCreatesSnowballEventData ? _loc9_ : null);
                        break;
                    case 11:
                        _loc7_ = this.handleHumanGetsSnowballFromMachineEvent(_loc9_ instanceof HumanGetsSnowballsFromMachineEventData ? _loc9_ : null);
                        break;
                    default:
                        HabboGamesCom.log("Unknown event id " + _loc9_.id);
                }
                if (_loc7_) {
                    _loc4_.addGameEvent(_loc10_ + 1, _loc5_ | 0, _loc7_);
                }
                if (_loc6_) {
                    _loc4_.addGameEvent(_loc10_ + 1, _loc5_ | 0, _loc6_);
                }
            }
        }
        let _loc8_: number = param1.checksum;
        this._SafeStr_2123.nextTurn(_loc10_, _loc8_, param2);
    }

    private handleHumanGetsSnowballFromMachineEvent(param1: HumanGetsSnowballsFromMachineEventData): HumanGetsSnowballsFromMachineEvent {
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc3_: SynchronizedGameStage = _loc2_.getCurrentStage();
        let _loc4_: HumanGameObject = asInstanceOf(_loc3_.getGameObject(param1.humanGameObjectId), HumanGameObject);
        let _loc5_: SnowballGivingGameObject = asInstanceOf(_loc3_.getGameObject(param1.snowBallMachineReference), SnowballGivingGameObject);
        return new HumanGetsSnowballsFromMachineEvent(_loc4_, _loc5_);
    }

    private handleMachineCreatesSnowballEvent(param1: MachineCreatesSnowballEventData): MachineCreatesSnowballEvent {
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc3_: SynchronizedGameStage = _loc2_.getCurrentStage();
        let _loc4_: SnowballMachineGameObject = asInstanceOf(_loc3_.getGameObject(param1.snowBallMachineReference), SnowballMachineGameObject);
        return new MachineCreatesSnowballEvent(_loc4_);
    }

    private handleThrowSnowballAtPosition(param1: HumanThrowsSnowballAtPositionEventData): HumanThrowsSnowballAtPositionEvent {
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc3_: SynchronizedGameStage = _loc2_.getCurrentStage();
        let _loc4_: HumanGameObject = asInstanceOf(_loc3_.getGameObject(param1.humanGameObjectId), HumanGameObject);
        return new HumanThrowsSnowballAtPositionEvent(_loc4_, param1.targetX, param1.targetY, param1.trajectory);
    }

    private handleThrowSnowballAtHuman(param1: HumanThrowsSnowballAtHumanEventData): HumanThrowsSnowballAtHumanEvent {
        let _loc3_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc4_: SynchronizedGameStage = _loc3_.getCurrentStage();
        let _loc5_: HumanGameObject = asInstanceOf(_loc4_.getGameObject(param1.humanGameObjectId), HumanGameObject);
        let _loc2_: HumanGameObject = asInstanceOf(_loc4_.getGameObject(param1.targetHumanGameObjectId), HumanGameObject);
        return new HumanThrowsSnowballAtHumanEvent(_loc5_, _loc2_, param1.trajectory);
    }

    private handleHumanStartsToMakeASnowball(param1: HumanStartsToMakeASnowballEventData): HumanStartsToMakeASnowballEvent {
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc3_: SynchronizedGameStage = _loc2_.getCurrentStage();
        let _loc4_: HumanGameObject = asInstanceOf(_loc3_.getGameObject(param1.humanGameObjectId), HumanGameObject);
        return new HumanStartsToMakeASnowballEvent(_loc4_);
    }

    private handleCreateSnowballEvent(param1: CreateSnowballEventData): CreateSnowballEvent {
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc3_: SynchronizedGameStage = _loc2_.getCurrentStage();
        let _loc4_: HumanGameObject = asInstanceOf(_loc3_.getGameObject(param1.humanGameObjectId), HumanGameObject);
        return new CreateSnowballEvent(param1.snowBallGameObjectId, _loc4_, param1.targetX, param1.targetY, param1.trajectory);
    }

    private handleNewMoveTargetEvent(param1: NewMoveTargetEventData): NewMoveTargetEvent {
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc3_: SynchronizedGameStage = _loc2_.getCurrentStage();
        let _loc4_: HumanGameObject = asInstanceOf(_loc3_.getGameObject(param1.humanGameObjectId), HumanGameObject);
        return new NewMoveTargetEvent(_loc4_, param1.x, param1.y);
    }

    private handleHumanLeftGameEvent(param1: HumanLeftGameEventData): HumanLeftGameEvent {
        let _loc2_: SynchronizedGameArena = this._SafeStr_2123.gameArena;
        let _loc3_: SynchronizedGameStage = _loc2_.getCurrentStage();
        let _loc4_: HumanGameObject = asInstanceOf(_loc3_.getGameObject(param1.humanGameObjectId), HumanGameObject);
        return new HumanLeftGameEvent(_loc4_);
    }

    private handleGhostThrowSnowballAtPosition(param1: HumanThrowsSnowballAtPositionEventData): HumanThrowsSnowballAtPositionEvent {
        let _loc2_: SynchronizedGameArena = null;
        let _loc3_: SynchronizedGameStage = null;
        if (this._SafeStr_2123.isGhostEnabled) {
            _loc2_ = this._SafeStr_2123.gameArena;
            _loc3_ = _loc2_.getCurrentStage();
            if (param1.humanGameObjectId == this._SafeStr_2123.ownId) {
                return new HumanThrowsSnowballAtPositionEvent(this._SafeStr_2123.getGhostPlayer(), param1.targetX, param1.targetY, param1.trajectory);
            }
        }
        return null;
    }

    private handleGhostThrowSnowballAtHuman(param1: HumanThrowsSnowballAtHumanEventData): HumanThrowsSnowballAtHumanEvent {
        let _loc3_: SynchronizedGameArena = null;
        let _loc4_: SynchronizedGameStage = null;
        let _loc2_: HumanGameObject = null;
        if (this._SafeStr_2123.isGhostEnabled) {
            _loc3_ = this._SafeStr_2123.gameArena;
            _loc4_ = _loc3_.getCurrentStage();
            _loc2_ = asInstanceOf(_loc4_.getGameObject(param1.targetHumanGameObjectId), HumanGameObject);
            if (param1.humanGameObjectId == this._SafeStr_2123.ownId) {
                return new HumanThrowsSnowballAtHumanEvent(this._SafeStr_2123.getGhostPlayer(), _loc2_, param1.trajectory);
            }
        }
        return null;
    }

    private handleGhostStartsToMakeASnowball(param1: HumanStartsToMakeASnowballEventData): HumanStartsToMakeASnowballEvent {
        let _loc2_: SynchronizedGameArena = null;
        let _loc3_: SynchronizedGameStage = null;
        let _loc4_: HumanGameObject = null;
        if (this._SafeStr_2123.isGhostEnabled) {
            _loc2_ = this._SafeStr_2123.gameArena;
            _loc3_ = _loc2_.getCurrentStage();
            _loc4_ = asInstanceOf(_loc3_.getGameObject(param1.humanGameObjectId), HumanGameObject);
            if (param1.humanGameObjectId == this._SafeStr_2123.ownId) {
                return new HumanStartsToMakeASnowballEvent(this._SafeStr_2123.getGhostPlayer());
            }
        }
        return null;
    }

    private onGameChat = (param1: Game2GameChatFromPlayerMessageEvent): void => {
        let _loc2_: Game2GameChatFromPlayerMessageParser = param1.getParser();
        if (this._SafeStr_2123 != null) {
            this._SafeStr_2123.addChatMessage(_loc2_.userId, _loc2_.chatMessage);
        }
    };

    private onSubscriptionStatus = (param1: ScrSendUserInfoEvent): void => {
        if (this._SafeStr_2123 != null) {
            this._SafeStr_2123.send(new Game2GetAccountGameStatusMessageComposer(0));
            if (this._SafeStr_2123.mainView.gameLobbyWindowActive) {
                return;
            }
            if (!this._SafeStr_2123.gameCenterEnabled) {
                this._SafeStr_2123.mainView.openMainWindow(false);
            }
        }
    };

    private onRoomEnter = (param1: RoomEntryInfoMessageEvent): void => {
        this._SafeStr_2123.promoteGame();
    };

    private onFriendsLeaderboard = (param1: Game2FriendsLeaderboardEvent): void => {
        let _loc2_: Game2LeaderboardParser = param1.getParser();
        if (this._SafeStr_2123.leaderboard) {
            this._SafeStr_2123.leaderboard.addFriendAllTimeData(_loc2_.leaderboard, _loc2_.totalListSize);
        }
    };

    private onTotalLeaderboard = (param1: Game2TotalLeaderboardEvent): void => {
        let _loc2_: Game2LeaderboardParser = param1.getParser();
        if (this._SafeStr_2123.leaderboard) {
            this._SafeStr_2123.leaderboard.addAllTimeData(_loc2_.leaderboard, _loc2_.totalListSize);
        }
    };

    private onTotalGroupLeaderboard = (param1: Game2TotalGroupLeaderboardEvent): void => {
        let _loc2_: Game2GroupLeaderboardParser = param1.getParser();
        if (this._SafeStr_2123.leaderboard) {
            this._SafeStr_2123.leaderboard.addAllTimeGroupData(_loc2_.leaderboard, _loc2_.totalListSize, _loc2_.favouriteGroupId);
        }
    };

    private onWeeklyGroupLeaderboard = (param1: Game2WeeklyGroupLeaderboardEvent): void => {
        let _loc2_: Game2WeeklyGroupLeaderboardParser = param1.getParser();
        if (this._SafeStr_2123.leaderboard) {
            this._SafeStr_2123.leaderboard.addWeeklyGroupData(_loc2_.year, _loc2_.week, _loc2_.leaderboard, _loc2_.totalListSize, _loc2_.maxOffset, _loc2_.minutesUntilReset, _loc2_.favouriteGroupId);
        }
    };

    private onWeeklyLeaderboard = (param1: Game2WeeklyLeaderboardEvent): void => {
        let _loc2_: Game2WeeklyLeaderboardParser = param1.getParser();
        if (this._SafeStr_2123.leaderboard) {
            this._SafeStr_2123.leaderboard.addWeeklyData(_loc2_.year, _loc2_.week, _loc2_.leaderboard, _loc2_.totalListSize, _loc2_.maxOffset, _loc2_.minutesUntilReset);
        }
    };

    private onWeeklyFriendsLeaderboard = (param1: Game2WeeklyFriendsLeaderboardEvent): void => {
        let _loc2_: Game2WeeklyLeaderboardParser = param1.getParser();
        if (this._SafeStr_2123.leaderboard) {
            this._SafeStr_2123.leaderboard.addFriendWeeklyData(_loc2_.year, _loc2_.week, _loc2_.leaderboard, _loc2_.totalListSize, _loc2_.maxOffset, _loc2_.minutesUntilReset);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
