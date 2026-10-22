import { asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { Game2GameResult } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2GameResult';
import type { Game2SnowWarGameStats } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/Game2SnowWarGameStats';
import type { GameLobbyData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyData';
import type { GameLobbyPlayerData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/GameLobbyPlayerData';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { HabboGameManager } from '@/com/sulake/habbo/game/HabboGameManager';
import type { ISynchronizedGameEvent } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameEvent';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { GameLobbyWindowCtrl } from '@/com/sulake/habbo/game/snowwar/ui/GameLobbyWindowCtrl';
import type { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomObjectTileMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectTileMouseEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IRoomUI } from '@/com/sulake/habbo/ui/IRoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { AssetLibraryCollection, Component } from '@/com/sulake/core/runtime/Component.group';
import { isICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import { isIHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import { isIHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import { Game2LoadStageReadyMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/arena/Game2LoadStageReadyMessageComposer';
import { Game2PlayAgainMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/arena/Game2PlayAgainMessageComposer';
import { Game2CheckGameDirectoryStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2CheckGameDirectoryStatusMessageComposer';
import { Game2GetAccountGameStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2GetAccountGameStatusMessageComposer';
import { Game2QuickJoinGameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2QuickJoinGameMessageComposer';
import { Game2StartSnowWarMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2StartSnowWarMessageComposer';
import { Game2MakeSnowballMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/ingame/Game2MakeSnowballMessageComposer';
import { Game2RequestFullStatusUpdateMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/ingame/Game2RequestFullStatusUpdateMessageComposer';
import { Game2SetUserMoveTargetMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/ingame/Game2SetUserMoveTargetMessageComposer';
import { Game2ThrowSnowballAtHumanMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/ingame/Game2ThrowSnowballAtHumanMessageComposer';
import { Game2ThrowSnowballAtPositionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/ingame/Game2ThrowSnowballAtPositionMessageComposer';
import { EventLogMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/tracking/EventLogMessageComposer';
import { isIHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import { GameChatEvent } from '@/com/sulake/habbo/game/events/GameChatEvent';
import { GameArenaView, GameEndingViewController, GameLoadingViewController, GamesMainViewController, HabboGamesCom, HumanGameObject, IncomingMessages__com_sulake_habbo_game_snowwar as IncomingMessages, LeaderboardViewController, SnowWarGameArena, SnowWarGameStage, SynchronizedGameArena, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { ClickTypeEnum } from '@/com/sulake/habbo/game/snowwar/ClickTypeEnum';
import { NewMoveTargetEvent } from '@/com/sulake/habbo/game/snowwar/events/NewMoveTargetEvent';
import { isIHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import { isIHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import { isIHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { isIRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { isIRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import { isISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { isIHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import { isIRoomUI } from '@/com/sulake/habbo/ui/IRoomUI';
import { isIHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboGroupsManager } from '@/com/sulake/iid/IIDHabboGroupsManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboRoomUI } from '@/com/sulake/iid/IIDHabboRoomUI';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class SnowWarEngine extends Component implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar::SnowWarEngine'); }

    private static readonly GHOST_CHECKSUM_TURNS_TO_CHECK: number = 3;
    public static readonly GET_SNOWWAR_TOKENS: string = "GET_SNOWWAR_TOKENS";
    public static readonly GET_SNOWWAR_TOKENS2: string = "GET_SNOWWAR_TOKENS2";
    public static readonly GET_SNOWWAR_TOKENS3: string = "GET_SNOWWAR_TOKENS3";
    public static readonly STATE_INACTIVE: number = 0;
    public static readonly STATE_GAME_STARTING: number = 1;
    public static readonly STATE_STAGE_LOADING: number = 2;
    public static readonly STATE_STAGE_STARTING: number = 3;
    public static readonly STATE_STAGE_RUNNING: number = 4;
    public static readonly STATE_STAGE_ENDING: number = 5;
    public static readonly STATE_GAME_OVER: number = 6;
    public static readonly STATE_REJOIN_GAME: number = 7;
    private static _soundManager: IHabboSoundManager;

    public static playSound(param1: string, param2: number = 0): void {
        if (SnowWarEngine._soundManager != null) {
            SnowWarEngine._soundManager.playSound(param1, param2);
        }
    }

    public static stopSound(param1: string): void {
        if (SnowWarEngine._soundManager != null) {
            SnowWarEngine._soundManager.stopSound(param1);
        }
    }

    constructor(param1: HabboGameManager, param2: IContext, param3: number = 0, param4: IAssetLibrary = null) {
        super(param2, param3, param4);
        this._gameManager = param1;
        this.queueInterface(new IIDHabboWindowManager(), this.onWindowManagerReady);
        this.queueInterface(new IIDHabboCommunicationManager(), this.onHabboCommunicationReady);
        this.queueInterface(new IIDHabboConfigurationManager(), this.onConfigurationReady);
        this.queueInterface(new IIDHabboLocalizationManager(), this.onLocalizationReady);
        this.queueInterface(new IIDHabboRoomSessionManager(), this.onRoomSessionManagerReady);
        this.queueInterface(new IIDSessionDataManager(), this.onSessionDataManagerReady);
        this.queueInterface(new IIDAvatarRenderManager(), this.onAvatarRenderedReady);
        this.queueInterface(new IIDRoomEngine(), this.onRoomEngineReady);
        this.queueInterface(new IIDHabboSoundManager(), this.onSoundManagerReady);
        this.queueInterface(new IIDHabboRoomUI(), this.onRoomUIReady);
        this.queueInterface(new IIDHabboCatalog(), this.onCatalogReady);
        this.queueInterface(new IIDHabboHelp(), this.onHabboHelpReady);
        this.queueInterface(new IIDHabboFriendList(), this.onFriendListReady);
        this.queueInterface(new IIDHabboGroupsManager(), this.onGroupsManagerReady);
        HabboGamesCom.log("SnowWarEngine initialized: " + param4);
        this._mainView = new GamesMainViewController(this);
    }

    declare private _gameManager: HabboGameManager;

    declare private _configuration: ICoreConfiguration;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _groupsManager: IHabboGroupsManager;

    declare private _incomingMessages: IncomingMessages;

    declare private _habboHelp: IHabboHelp;

    declare private _gameArena: SynchronizedGameArena;

    declare private _SafeStr_2238: GameArenaView;

    declare private _timeSinceLastUpdate: number;
    static { (this.prototype as any)._timeSinceLastUpdate = 0; }

    private _SafeStr_2172: number = 0;

    declare private _SafeStr_2868: IAlertDialog;

    declare private _ownId: number;
    static { (this.prototype as any)._ownId = 0; }

    declare private _players: UtilsMap;

    private _currentSubTurn: number = 0;
    private _SafeStr_3276: number = 0;
    private _SafeStr_4547: number = 0;

    declare private _serverChecksums: UtilsMap;

    private _SafeStr_5257: boolean = false;

    declare private _SafeStr_3146: GameLoadingViewController;

    declare private _SafeStr_2184: GameEndingViewController;

    declare private _mainView: GamesMainViewController;

    declare private _SafeStr_3558: LeaderboardViewController;

    private _isGhostEnabled: boolean = false;
    private _isGhostVisualizationEnabled: boolean = false;
    private _SafeStr_7066: boolean = false;
    private _SafeStr_5468: boolean = false;
    private _SafeStr_2517: boolean = false;
    private _freeGamesLeft: number = 0;
    private _gamesPlayed: number = -1;
    private _SafeStr_6994: boolean = false;

    declare private _communication: IHabboCommunicationManager;

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    declare private _windowManager: IHabboWindowManager;

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    declare private _localization: IHabboLocalizationManager;

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    declare private _sessionDataManager: ISessionDataManager;

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    declare private _avatarManager: IAvatarRenderManager;

    public get avatarManager(): IAvatarRenderManager {
        return this._avatarManager;
    }

    declare private _roomEngine: IRoomEngine;

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    declare private _roomUI: IRoomUI;

    public get roomUI(): IRoomUI {
        return this._roomUI;
    }

    declare private _catalog: IHabboCatalog;

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    declare private _friendList: IHabboFriendList;

    public get friendList(): IHabboFriendList {
        return this._friendList;
    }

    declare private _stageLength: number;
    static { (this.prototype as any)._stageLength = 0; }

    public get stageLength(): number {
        return this._stageLength;
    }

    private _hasUnlimitedGames: boolean = false;

    public get hasUnlimitedGames(): boolean {
        return this._hasUnlimitedGames;
    }

    private _roomBeforeGame: number = -1;

    public get roomBeforeGame(): number {
        return this._roomBeforeGame;
    }

    public get gameCenterEnabled(): boolean {
        return this._gameManager.gameCenterEnabled;
    }

    public get config(): ICoreConfiguration {
        return this._configuration;
    }

    public get groupsManager(): IHabboGroupsManager {
        return this._groupsManager;
    }

    public get gameArena(): SynchronizedGameArena {
        return this._gameArena;
    }

    public get currentSubTurn(): number {
        return this._currentSubTurn;
    }

    public get isGhostEnabled(): boolean {
        return this._isGhostEnabled;
    }

    public get isGhostVisualizationEnabled(): boolean {
        return this._isGhostVisualizationEnabled;
    }

    public get ownId(): number {
        return this._ownId;
    }

    public set ownId(param1: number) {
        this._ownId = param1;
    }

    public get mainView(): GamesMainViewController {
        return this._mainView;
    }

    public get lobbyView(): GameLobbyWindowCtrl {
        if (this._mainView) {
            return this._mainView.lobbyView;
        }
        return null;
    }

    public get isGameStarting(): boolean {
        return this._SafeStr_2172 == 1 || this._SafeStr_2172 == 7;
    }

    public get freeGamesLeft(): number {
        return this._freeGamesLeft;
    }

    public set gamesPlayed(param1: number) {
        this._gamesPlayed = param1;
    }

    public get leaderboard(): LeaderboardViewController {
        if (!this._SafeStr_3558 && !this.gameCenterEnabled) {
            this._SafeStr_3558 = new LeaderboardViewController(this);
        }
        return this._SafeStr_3558;
    }

    public override dispose(): void {
        if (this._communication) {
            this._communication.release(new IIDHabboCommunicationManager());
            this._communication = null;
        }
        if (this._windowManager) {
            this._windowManager.release(new IIDHabboWindowManager());
            this._windowManager = null;
        }
        if (this._configuration) {
            this._configuration.release(new IIDHabboConfigurationManager());
            this._configuration = null;
        }
        if (this._localization) {
            this._localization.release(new IIDHabboLocalizationManager());
            this._localization = null;
        }
        if (this._roomSessionManager) {
            this._roomSessionManager.release(new IIDHabboRoomSessionManager());
            this._roomSessionManager = null;
        }
        if (this._sessionDataManager != null) {
            this._sessionDataManager.release(new IIDSessionDataManager());
            this._sessionDataManager = null;
        }
        if (this._roomEngine != null) {
            this._roomEngine.events.removeEventListener("REE_OBJECTS_INITIALIZED", this.onRoomObjectsInitialized);
            this._roomEngine.release(new IIDRoomEngine());
            this._roomEngine = null;
        }
        if (SnowWarEngine._soundManager != null) {
            SnowWarEngine._soundManager.release(new IIDHabboSoundManager());
            SnowWarEngine._soundManager = null;
        }
        if (this._habboHelp != null) {
            this._habboHelp.release(new IIDHabboHelp());
            this._habboHelp = null;
        }
        if (this._avatarManager != null) {
            this._avatarManager.release(new IIDAvatarRenderManager());
            this._avatarManager = null;
        }
        if (this._groupsManager != null) {
            this._groupsManager.release(new IIDHabboGroupsManager());
            this._groupsManager = null;
        }
        if (this._roomUI != null) {
            this._roomUI.release(new IIDHabboRoomUI());
            this._roomUI = null;
        }
        if (this._catalog != null) {
            this._catalog.release(new IIDHabboCatalog());
            this._catalog = null;
        }
        if (this._friendList != null) {
            this._friendList.release(new IIDHabboFriendList());
            this._friendList = null;
        }
        if (this._SafeStr_2868 != null) {
            this._SafeStr_2868.dispose();
            this._SafeStr_2868 = null;
        }
        if (this._SafeStr_2184) {
            this._SafeStr_2184.dispose();
            this._SafeStr_2184 = null;
        }
        this.disposeLoadingView();
        if (this._gameArena != null) {
            this._gameArena.dispose();
            this._gameArena = null;
        }
        if (this._SafeStr_2238 != null) {
            this._SafeStr_2238.dispose();
            this._SafeStr_2238 = null;
        }
        if (this._mainView) {
            this._mainView.dispose();
            this._mainView = null;
        }
        if (this._incomingMessages) {
            this._incomingMessages.dispose();
            this._incomingMessages = null;
        }
        if (this._SafeStr_3558) {
            this._SafeStr_3558.dispose();
            this._SafeStr_3558 = null;
        }
        super.dispose();
    }

    public getArenaName(param1: GameLobbyData): string {
        let _loc2_: string = "snowwar.field.name." + param1.fieldType;
        return this.localization.getLocalization(_loc2_, _loc2_);
    }

    public send(param1: IMessageComposer): void {
        if (this._communication) {
            this._communication.connection.send(param1);
        }
    }

    public showGamesMainView(): void {
        this._mainView.toggleVisibility();
    }

    public onGameDirectoryAvailable(param1: boolean): void {
        if (param1) {
            this.showGamesMainView();
        }
    }

    public initArena(param1: number, param2: number, param3: number, param4: any[]): void {
        if (!this._gameArena) {
            this._gameArena = new SynchronizedGameArena();
            this._gameArena.setExtension(new SnowWarGameArena());
            this._gameArena.initialize(this, param3);
            this._SafeStr_2238 = new GameArenaView(this);
            this._roomSessionManager.disposeSession(-1, false);
            this._roomSessionManager.startGameSession();
            this.registerUpdateReceiver(this, 1);
            this._timeSinceLastUpdate = 0;
            this._currentSubTurn = 0;
            this._SafeStr_3276 = 0;
        }
    }

    public startServerGame(param1: string): void {
        this.initGameDirectoryConnection();
        this.send(new Game2StartSnowWarMessageComposer(param1));
    }

    public initGameDirectoryConnection(): void {
        this.send(new Game2CheckGameDirectoryStatusMessageComposer());
    }

    public startQuickServerGame(): void {
        this.send(new Game2QuickJoinGameMessageComposer());
    }

    public getCurrentPlayer(): HumanGameObject {
        return this.getPlayer(this._ownId);
    }

    public getPlayer(param1: number): HumanGameObject {
        let _loc2_: SynchronizedGameStage = this.getCurrentStage();
        if (!_loc2_) {
            return null;
        }
        return asInstanceOf(_loc2_.getGameObject(param1), HumanGameObject);
    }

    public handleClickOnHuman(param1: number, param2: boolean, param3: boolean): void {
        let _loc7_: HumanGameObject = null;
        let _loc4_: HumanGameObject = null;
        let _loc6_: number = 0;
        if (this._SafeStr_2172 != 4) {
            return;
        }
        let _loc5_: HumanGameObject = this.getGhostPlayer();
        if (param1 == this._ownId || this._isGhostEnabled && _loc5_ && param1 == _loc5_.gameObjectId) {
            if (this.makeSnowball() && this._SafeStr_2238) {
                this._SafeStr_2238.startWaitingForSnowball();
            }
        } else {
            _loc7_ = this.getCurrentPlayer();
            _loc4_ = this.getPlayer(param1);
            if (_loc7_ && _loc4_ && _loc7_.team != _loc4_.team) {
                _loc6_ = ClickTypeEnum.getClickTypeOnOpponent(param2, param3);
                this.throwSnowballAtHuman(param1, this.getTrajectoryFromClickType(_loc6_));
            }
        }
    }

    public handleMouseOverOnHuman(param1: number, param2: boolean, param3: boolean): void {
        let _loc4_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: HumanGameObject = this.getPlayer(param1);
        if (!_loc6_) {
            return;
        }
        if (this._configuration.getBoolean("snowstorm.settings.show_user_names")) {
            _loc4_ = (_loc6_.team == 1 ? 4281310921 : 4290988872) | 0;
            _loc5_ = 500;
            this._roomUI.showGamePlayerName(_loc6_.gameObjectId, _loc6_.name, _loc4_ >>> 0, _loc5_);
        }
        if (this._SafeStr_2172 == 4) {
            this._SafeStr_2238.updateTileCursor(_loc6_.team);
        }
    }

    public moveOwnAvatarTo(param1: number, param2: number): void {
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: SnowWarGameStage = null;
        if (this._SafeStr_2172 != 4) {
            return;
        }
        let _loc4_: HumanGameObject = this.getCurrentPlayer();
        if (_loc4_) {
            _loc6_ = param1 * 3200;
            _loc5_ = param2 * 3200;
            _loc3_ = this.getCurrentStage();
            if (_loc3_) {
                this.send(new Game2SetUserMoveTargetMessageComposer(_loc6_, _loc5_, this._gameArena.getTurnNumber(), this._gameArena.subturn));
                this.walkGhost(_loc4_, _loc6_, _loc5_);
            }
        }
    }

    public getGhostPlayer(): HumanGameObject {
        let _loc1_: HumanGameObject = this.getCurrentPlayer();
        if (_loc1_) {
            return this.getPlayer(_loc1_.ghostObjectId);
        }
        return null;
    }

    public makeSnowball(): boolean {
        if (this._SafeStr_2172 != 4) {
            return false;
        }
        let _loc1_: HumanGameObject = this.getCurrentPlayer();
        if (_loc1_ && _loc1_.canMakeSnowballs()) {
            this.send(new Game2MakeSnowballMessageComposer(this._gameArena.getTurnNumber(), this._gameArena.subturn));
            this.stopGhost();
            return true;
        }
        return false;
    }

    public update(param1: number): void {
        let _loc9_: number = 0;
        let _loc5_: number = 0;
        let _loc6_: number = 0;
        let _loc7_: number = 0;
        let _loc3_: any = false;
        let _loc10_: any = false;
        let _loc2_: number = 0;
        let _loc4_: any = 0;
        if (!this._gameArena || Number(!this._SafeStr_2172) == 4 || Number(!this._SafeStr_2172) == 3) {
            return;
        }
        if (this._SafeStr_2238 && this._SafeStr_2172 == 3) {
            this._SafeStr_2238.update(param1, this._gameArena.subturn == 0);
        }
        this._timeSinceLastUpdate += param1;
        let _loc8_: number = (asInstanceOf(this._gameArena.getExtension(), SnowWarGameArena)).getPulseInterval();
        if (!this._SafeStr_5257 && this._timeSinceLastUpdate > _loc8_ && this._currentSubTurn < this._SafeStr_3276) {
            this._gameArena.pulse();
            this._timeSinceLastUpdate -= _loc8_;
            this._currentSubTurn = this._currentSubTurn + 1;
            if (this._timeSinceLastUpdate > _loc8_) {
                this._timeSinceLastUpdate = 0;
            }
            _loc9_ = this._SafeStr_3276 - this.currentSubTurn;
            while (_loc9_-- > 3) {
                this._gameArena.pulse();
                this._currentSubTurn = this._currentSubTurn + 1;
            }
            if (this._SafeStr_2238 && this._SafeStr_2172 == 4) {
                this._SafeStr_2238.update(param1, this._gameArena.subturn == 0);
            }
            if (this._currentSubTurn % this._gameArena.getNumberOfSubTurns() == 0) {
                _loc5_ = this.gameArena.getTurnNumber() - 1;
                _loc6_ = this.gameArena.getCheckSum(_loc5_);
                _loc7_ = this._serverChecksums[_loc5_] | 0;
                this.checkGhostLocation(_loc5_);
                _loc3_ = _loc5_ < this._SafeStr_4547 - 3;
                _loc10_ = _loc7_ != _loc6_;
                if (_loc3_ || _loc10_ || this._SafeStr_5468) {
                    HabboGamesCom.log("Turn: " + [_loc5_, this._SafeStr_4547] + " currentSubTurn:" + this._currentSubTurn + " maxSubTurn:" + this._SafeStr_3276 + " serverChecksum:" + _loc7_ + " clientChecksum:" + _loc6_);
                    if (_loc3_) {
                        _loc2_ = 0;
                        _loc4_ = 16711935;
                        HabboGamesCom.log("CLIENT TOO MUCH BEHIND, requesting full status!");
                    } else if (_loc10_) {
                        _loc2_ = 1;
                        _loc4_ = 16711680;
                        HabboGamesCom.log("CHECKSUM MISMATCH, requesting full status!");
                    } else {
                        _loc2_ = -1;
                        _loc4_ = 255;
                        HabboGamesCom.log("ERROR WAS GENERATED! Requesting full status!");
                    }
                    this._SafeStr_2238.showChecksumError(_loc4_ >>> 0);
                    this.requestFullStatus(_loc2_);
                    this._SafeStr_5468 = false;
                    this._SafeStr_5257 = true;
                }
            }
        }
    }

    public nextTurn(param1: number, param2: number, param3: boolean = false): void {
        this._SafeStr_4547 = param1;
        this._serverChecksums[this._SafeStr_4547] = param2;
        this._SafeStr_3276 = (param1 + 1) * this.gameArena.getNumberOfSubTurns();
        if (param3) {
            this._currentSubTurn = this._SafeStr_3276 - this.gameArena.getNumberOfSubTurns();
            this._timeSinceLastUpdate = (asInstanceOf(this.gameArena.getExtension(), SnowWarGameArena)).getPulseInterval();
            this._SafeStr_5257 = false;
            if (this._isGhostEnabled) {
                this.getGhostPlayer().addGhostLocation(this._SafeStr_4547);
            }
        }
    }

    public requestFullStatus(param1: number): void {
        this.send(new Game2RequestFullStatusUpdateMessageComposer(param1));
    }

    public alert(param1: string): void {
        this.removeOldAlert();
        if (!this._SafeStr_2868) {
            this._SafeStr_2868 = this._windowManager.alert("SnowWar Alert", param1, 0, this.onAlertClose);
        } else {
            this._SafeStr_2868.summary = param1;
        }
        HabboGamesCom.log("[HabboGameManager.alert] " + param1);
    }

    public disposeLoadingView(): void {
        if (this._SafeStr_3146) {
            this._SafeStr_3146.dispose();
            this._SafeStr_3146 = null;
        }
    }

    public removeOldAlert(): void {
        if (this._SafeStr_2868) {
            this._SafeStr_2868.dispose();
            this._SafeStr_2868 = null;
        }
    }

    public generateChecksumMismatch(): void {
        if (this._SafeStr_2172 != 4) {
            return;
        }
        this._SafeStr_5468 = true;
    }

    public initView(): void {
        if (this._SafeStr_2238) {
            this._SafeStr_2238.init();
        }
    }

    public stageLoading(param1: number, param2: any[]): void {
        if (this._SafeStr_3146 != null) {
            this._SafeStr_2172 = 2;
            this._SafeStr_3146.showReadyPlayers(param2);
        }
    }

    public startStage(param1: number): void {
        if (this._SafeStr_2238) {
            this._roomUI.visible = true;
            this.disposeLoadingView();
            SnowWarEngine.playSound("HBSTG_ig_countdown");
            this._SafeStr_2238.initGameUI(param1);
            this._SafeStr_2172 = 3;
        }
    }

    public stageRunning(param1: number): void {
        if (param1 > 0) {
            this._stageLength = param1;
            this._SafeStr_2172 = 4;
        } else {
            this._SafeStr_2172 = 5;
        }
        this._currentSubTurn = 0;
        this._SafeStr_3276 = 0;
    }

    public resetGameSession(): void {
        this._roomEngine.isGameMode = false;
        this._SafeStr_2172 = 5;
        this.removeUpdateReceiver(this);
        if (this._gameArena) {
            this._gameArena.dispose();
            this._gameArena = null;
        }
        SnowWarEngine.stopSound("HBSTG_snowwar_walk");
        this.send(new Game2GetAccountGameStatusMessageComposer(0));
    }

    public resetRoomSession(): void {
        this._roomSessionManager.disposeGameSession();
        if (this._SafeStr_2238) {
            this._SafeStr_2238.dispose();
            this._SafeStr_2238 = null;
        }
    }

    public gameOver(param1: number, param2: any[], param3: Game2SnowWarGameStats, param4: Game2GameResult): void {
        this._SafeStr_2172 = 6;
        this._mainView.close(false);
        if (this._SafeStr_2184) {
            this._SafeStr_2184.dispose();
            this._SafeStr_2184 = null;
        }
        if (this._SafeStr_2238) {
            this._SafeStr_2238.removeGameUI();
        }
        this._SafeStr_2184 = new GameEndingViewController(this, param2, param3, param4, param1);
    }

    public gameStarted(param1: GameLobbyData): void {
        this._SafeStr_2172 = 1;
        this._SafeStr_2517 = false;
        this._players = new UtilsMap();
        this._serverChecksums = new UtilsMap();
        for (const _loc2_ of param1.players ?? []) {
            this._players.add(_loc2_.userId, _loc2_);
        }
        if (this._SafeStr_2184) {
            this._SafeStr_2184.dispose();
            this._SafeStr_2184 = null;
        }
        if (!this._SafeStr_3146) {
            this._SafeStr_3146 = new GameLoadingViewController(this);
        }
        this._SafeStr_3146.show(param1);
    }

    public rejoinGame(param1: number): void {
        this._SafeStr_2172 = this._SafeStr_2517 ? 7 : 6;
        this._roomBeforeGame = param1;
        if (this._SafeStr_2184) {
            this._SafeStr_2184.changeToWaitState(this._SafeStr_2517);
            this._SafeStr_2517 = false;
        }
    }

    public playerRematches(param1: number): void {
        if (this._SafeStr_2184) {
            this._SafeStr_2184.playerRematches(param1);
        }
    }

    public startLobbyCounter(param1: number): void {
        if (this._SafeStr_2172 == 7 && this._SafeStr_2184 != null) {
            this._SafeStr_2184.startLobbyCountDown(param1);
        } else if (this.lobbyView) {
            this.lobbyView.startCountdown(param1);
        }
    }

    public sendRejoinGame(): void {
        this._SafeStr_2517 = true;
        this.send(new Game2PlayAgainMessageComposer());
    }

    public addChatMessage(param1: number, param2: string, param3: boolean = false): void {
        if (this._players == null) {
            return;
        }
        let _loc6_: GameLobbyPlayerData = this._players.getValue(param1);
        if (_loc6_ == null) {
            return;
        }
        let _loc5_: number = _loc6_.teamId == 1 ? -300 : 300;
        let _loc4_: number = (_loc6_.teamId == 1 ? 255 : 16711680) >>> 0;
        this._gameManager.events.dispatchEvent(new GameChatEvent("gce_game_chat", param1, param2, _loc5_, _loc4_, _loc6_.figure, _loc6_.gender, _loc6_.name, _loc6_.teamId, param3));
    }

    public stopLobbyCounter(): void {
        if (this._SafeStr_2172 == 7 && this._SafeStr_2184 != null) {
            this._SafeStr_2517 = true;
            this._SafeStr_2184.changeToWaitState(this._SafeStr_2517);
        } else if (this.lobbyView) {
            this.lobbyView.stopCountdown();
        }
    }

    public createLobby(param1: GameLobbyData): void {
        let _loc2_: any = null;
        if (this._SafeStr_2172 == 6) {
            this._SafeStr_2517 = true;
        }
        if (this._SafeStr_2184 != null && this._SafeStr_2172 != 7) {
            this._SafeStr_2184.changeToWaitState(this._SafeStr_2517);
            this._SafeStr_2172 = 7;
            this._SafeStr_2517 = false;
        }
        if (this._SafeStr_2172 == 7 && this._SafeStr_2184 != null) {
            this._SafeStr_2184.changeToLobbyState(param1);
            for (_loc2_ of param1.players ?? []) {
                this._SafeStr_2184.playerJoined(_loc2_);
            }
        } else {
            this._SafeStr_2172 = 0;
            this.mainView.openGameLobbyWindow(this.getArenaName(param1), param1.numberOfTeams, param1.maximumPlayers);
            for (_loc2_ of param1.players ?? []) {
                this.lobbyView.playerJoined(_loc2_);
            }
        }
    }

    public userJoined(param1: GameLobbyPlayerData): void {
        if (this._SafeStr_2172 == 7 && this._SafeStr_2184 != null) {
            this._SafeStr_2184.playerJoined(param1);
        } else {
            this._SafeStr_2172 = 0;
            if (this.lobbyView) {
                this.lobbyView.playerJoined(param1);
            }
        }
    }

    public userLeft(param1: number): void {
        if (this._SafeStr_2172 == 7 && this._SafeStr_2184 != null) {
            this._SafeStr_2184.playerLeft(param1);
        } else {
            this._SafeStr_2172 = 0;
            if (this.lobbyView) {
                this.lobbyView.playerLeft(param1);
            }
        }
    }

    public gamesLeft(param1: number, param2: boolean, param3: number): void {
        if (param1 == 0) {
            this._hasUnlimitedGames = param2;
            this._freeGamesLeft = param3;
            if (this._SafeStr_2184) {
                this._SafeStr_2184.updateGamesLeft();
            }
            if (this._mainView) {
                this._mainView.updateGameStartingStatus();
            }
        }
    }

    public resetSession(): void {
        this.resetGameSession();
        this.resetRoomSession();
        if (this._SafeStr_2184) {
            this._SafeStr_2184.dispose();
            this._SafeStr_2184 = null;
        }
        if (this._mainView) {
            this._mainView.openMainWindow(false);
        }
    }

    public gameCancelled(param1: boolean): void {
        this.resetSession();
        if (param1) {
            this._gameManager.onSnowWarArenaSessionEnded();
        }
    }

    public stopWaitingForSnowball(param1: number): void {
        if (this._SafeStr_2238 != null && param1 == this._ownId) {
            this._SafeStr_2238.stopWaitingForSnowball();
        }
    }

    public openGetMoreGames(param1: string): void {
        this._catalog.buySnowWarTokensOffer("GET_SNOWWAR_TOKENS");
        this.logGameEvent(param1);
    }

    public openClubCenter(param1: string): void {
        this._catalog.openClubCenter();
        this.logGameEvent(param1);
    }

    public logGameEvent(param1: string): void {
        this.send(new EventLogMessageComposer("GameFramework", "SnowStorm", param1, "", this.freeGamesLeft));
    }

    public registerHit(param1: HumanGameObject, param2: HumanGameObject): void {
        if (this._ownId == param1.gameObjectId) {
            this._SafeStr_2238.flashOwnScore(false);
        } else if (this._ownId == param2.gameObjectId) {
            this._SafeStr_2238.flashOwnScore(true);
        }
    }

    public promoteGame(): void {
        if (this._SafeStr_6994 || this._gamesPlayed != 0) {
            return;
        }
        this._SafeStr_6994 = true;
        let _loc2_: any = this._configuration.getInteger("new.identity", 0) > 0;
        let _loc1_: string = this._configuration.getProperty("new.user.wing");
        if (_loc2_ && _loc1_ != "game") {
            return;
        }
        this._habboHelp.showWelcomeScreen("HTIE_ICON_GAMES", "snowwar.promotion", 0, "GAMES");
    }

    public showLeaderboard(): void {
        this.leaderboard.selectedGame = 0;
        this.leaderboard.showFriendsAllTime();
    }

    private onWindowManagerReady = (param1: IID, param2: IUnknown): void => {
        this._windowManager = isIHabboWindowManager(param2) ? param2 : null;
        WindowUtils.init(this.assets, this._windowManager);
    };

    private onHabboCommunicationReady = (param1: IID, param2: IUnknown): void => {
        this._communication = isIHabboCommunicationManager(param2) ? param2 : null;
        this._incomingMessages = new IncomingMessages(this);
    };

    private onConfigurationReady = (param1: IID, param2: IUnknown): void => {
        this._configuration = isICoreConfiguration(param2) ? param2 : null;
        this._isGhostEnabled = this._configuration.getBoolean("snowwar.ghost.enabled");
        if (this._isGhostEnabled) {
            this._isGhostVisualizationEnabled = this._configuration.getBoolean("snowwar.ghost.visualization.enabled");
            this._SafeStr_7066 = this._configuration.getBoolean("snowwar.ghost.immediate.enabled");
        }
        HabboGamesCom.logEnabled = this._configuration.getBoolean("snowwar.log.enabled");
    };

    private onLocalizationReady = (param1: IID, param2: IUnknown): void => {
        this._localization = isIHabboLocalizationManager(param2) ? param2 : null;
    };

    private onSessionDataManagerReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._sessionDataManager = isISessionDataManager(param2) ? param2 : null;
    };

    private onRoomSessionManagerReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._roomSessionManager = isIRoomSessionManager(param2) ? param2 : null;
    };

    private onAvatarRenderedReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._avatarManager = isIAvatarRenderManager(param2) ? param2 : null;
        this._avatarManager.events.addEventListener("AVATAR_RENDER_READY", this.onAvatarReady);
    };

    private onGroupsManagerReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._groupsManager = isIHabboGroupsManager(param2) ? param2 : null;
    };

    private onRoomEngineReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._roomEngine = isIRoomEngine(param2) ? param2 : null;
        this._roomEngine.events.addEventListener("REE_OBJECTS_INITIALIZED", this.onRoomObjectsInitialized);
    };

    private onSoundManagerReady = (param1: IID = null, param2: IUnknown = null): void => {
        SnowWarEngine._soundManager = castGuarded(param2, isIHabboSoundManager, "com.sulake.habbo.sound.IHabboSoundManager");
    };

    private onRoomUIReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._roomUI = isIRoomUI(param2) ? param2 : null;
    };

    private onCatalogReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._catalog = isIHabboCatalog(param2) ? param2 : null;
    };

    private onHabboHelpReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._habboHelp = isIHabboHelp(param2) ? param2 : null;
    };

    private onFriendListReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._friendList = isIHabboFriendList(param2) ? param2 : null;
    };

    private getCurrentStage(): SnowWarGameStage {
        if (!this._gameArena) {
            return null;
        }
        return asInstanceOf(this._gameArena.getCurrentStage(), SnowWarGameStage);
    }

    private throwSnowballAtHuman(param1: number, param2: number): void {
        let _loc3_: HumanGameObject = this.getCurrentPlayer();
        if (_loc3_ && _loc3_.canThrowSnowballs()) {
            this.send(new Game2ThrowSnowballAtHumanMessageComposer(param1, param2, this._gameArena.getTurnNumber(), this._gameArena.subturn));
            this.stopGhost();
        }
    }

    private throwSnowballAt(param1: number, param2: number, param3: number): void {
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc4_: HumanGameObject = this.getCurrentPlayer();
        if (_loc4_ && _loc4_.canThrowSnowballs()) {
            _loc6_ = param1 * 3200;
            _loc5_ = param2 * 3200;
            this.send(new Game2ThrowSnowballAtPositionMessageComposer(_loc6_, _loc5_, param3, this._gameArena.getTurnNumber(), this._gameArena.subturn));
            this.stopGhost();
        }
    }

    private getTrajectoryFromClickType(param1: number): number {
        let _loc2_: number = 0;
        switch (param1 - 1) {
            case 0:
                _loc2_ = 0;
                break;
            case 1:
                _loc2_ = 2;
                break;
            case 2:
                _loc2_ = 1;
                break;
            default:
                _loc2_ = 3;
        }
        return _loc2_;
    }

    private walkGhost(param1: HumanGameObject, param2: number, param3: number): void {
        let _loc6_: boolean = false;
        let _loc4_: HumanGameObject = null;
        let _loc5_: ISynchronizedGameEvent = null;
        if (this._isGhostEnabled) {
            _loc6_ = !!(param1 && param1.posture != "swdieback" && param1.posture != "swdiefront");
            _loc4_ = this.getGhostPlayer();
            if (_loc4_ && _loc6_) {
                _loc5_ = new NewMoveTargetEvent(_loc4_, param2, param3);
                if (this._SafeStr_7066) {
                    _loc5_.apply(this.gameArena.getCurrentStage());
                } else {
                    this.gameArena.addGameEvent(this.gameArena.getTurnNumber(), this.gameArena.subturn, _loc5_);
                }
            }
        }
    }

    private stopGhost(): void {
        let _loc1_: HumanGameObject = null;
        if (this._isGhostEnabled) {
            _loc1_ = this.getGhostPlayer();
            if (_loc1_) {
                _loc1_.stopMovement();
            }
        }
    }

    private checkGhostLocation(param1: number): void {
        let _loc3_: HumanGameObject = null;
        let _loc6_: Location3D = null;
        let _loc2_: HumanGameObject = null;
        let _loc5_: boolean = false;
        let _loc4_: number = 0;
        if (this._isGhostEnabled) {
            _loc3_ = this.getCurrentPlayer();
            _loc6_ = _loc3_.currentLocation;
            _loc2_ = this.getGhostPlayer();
            _loc5_ = false;
            _loc4_ = -3;
            while (_loc4_ < 3) {
                _loc5_ = _loc2_.isInGhostDistance(param1 + _loc4_, _loc6_);
                if (_loc5_) {
                    break;
                }
                _loc4_++;
            }
            _loc2_.removeGhostLocation(param1 - 3);
            if (!_loc5_ && param1 > 3) {
                HabboGamesCom.log("GHOST CHECKSUM MISMATCH, checksumTurn:" + param1 + " currentLocation:" + _loc6_);
                _loc2_.reinitGhost(_loc3_);
                _loc2_.addGhostLocation(param1);
                this._SafeStr_2238.showChecksumError(65280);
            }
        }
    }

    private onAlertClose = (param1: IAlertDialog, param2: WindowEvent): void => {
        this.removeOldAlert();
    };

    public handleClickOnTile(param1: RoomObjectTileMouseEvent): void {
        if (this._SafeStr_2172 != 4) {
            return;
        }
        let _loc2_: number = ClickTypeEnum.getClickTypeOnTile(param1.altKey, param1.shiftKey);
        if (_loc2_ == 0) {
            this.moveOwnAvatarTo(param1.tileXAsInt, param1.tileYAsInt);
        } else {
            this.throwSnowballAt(param1.tileXAsInt, param1.tileYAsInt, this.getTrajectoryFromClickType(_loc2_));
        }
    }

    private onAvatarReady = (param1: Event): void => {
        let _loc3_: XmlAsset = null;
        let _loc2_: boolean = (asInstanceOf(this.context.assets, AssetLibraryCollection)).hasAssetLibrary(this.assets.name);
        if (!_loc2_) {
            HabboGamesCom.log(this.assets.manifest);
            (asInstanceOf(this.context.assets, AssetLibraryCollection)).addAssetLibrary(this.assets);
            _loc3_ = asInstanceOf(this.assets.getAssetByName("figure"), XmlAsset);
            this._avatarManager.injectFigureData(asInstanceOf(_loc3_.content, XML));
            this._avatarManager.resetAssetManager();
        }
    };

    private onRoomObjectsInitialized = (param1: RoomEngineEvent): void => {
        if (this._gameArena) {
            this.send(new Game2LoadStageReadyMessageComposer(100));
        }
    };

    get [IUpdateReceiver](): true {
        return true;
    }
}
