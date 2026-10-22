import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IID } from '@/com/sulake/core/runtime/IID';
import type { IUnknown } from '@/com/sulake/core/runtime/IUnknown';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboLandingView } from '@/com/sulake/habbo/friendbar/IHabboLandingView';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { RoomObjectTileMouseEvent } from '@/com/sulake/habbo/room/events/RoomObjectTileMouseEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { isIAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import { isIHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import { isIHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import { GetSnowWarGameTokensOfferComposer } from '@/com/sulake/habbo/communication/messages/outgoing/catalog/GetSnowWarGameTokensOfferComposer';
import { Game2CheckGameDirectoryStatusMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2CheckGameDirectoryStatusMessageComposer';
import { Game2QuickJoinGameMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2QuickJoinGameMessageComposer';
import { Game2StartSnowWarMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/game/directory/Game2StartSnowWarMessageComposer';
import { isIHabboLandingView } from '@/com/sulake/habbo/friendbar/IHabboLandingView';
import { HabboGamesCom, SnowWarEngine, WindowUtils__com_sulake_habbo_game_snowwar_utils as WindowUtils } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { IncomingMessages } from '@/com/sulake/habbo/game/IncomingMessages';
import { isIHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import { isIHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import { isIHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import { isIHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import { isIRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import { isIRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import { isISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import { isIHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import { isIHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLandingView } from '@/com/sulake/iid/IIDHabboLandingView';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboGameManager extends Component implements IHabboGameManager {
    static { registerClassName(this, 'com.sulake.habbo.game::HabboGameManager'); }

    declare private _communication: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _toolbar: IHabboToolbar;

    declare private _avatarManager: IAvatarRenderManager;

    declare private _catalog: IHabboCatalog;

    declare private _roomEngine: IRoomEngine;

    declare private _habboHelp: IHabboHelp;

    declare private _inventory: IHabboInventory;

    declare private _navigator: IHabboNavigator;

    declare private _SafeStr_2123: SnowWarEngine;

    declare private _incomingMessages: IncomingMessages;

    private _SafeStr_6754: boolean = false;
    private _SafeStr_6131: boolean = false;
    private _SafeStr_6199: boolean = false;

    declare private _landingView: IHabboLandingView;

    private _activeGame: number = -1;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this.queueInterface(new IIDHabboWindowManager(), this.onWindowManagerReady);
        this.queueInterface(new IIDHabboCommunicationManager(), this.onHabboCommunicationReady);
        this.queueInterface(new IIDHabboConfigurationManager(), this.onConfigurationReady);
        this.queueInterface(new IIDHabboLocalizationManager(), this.onLocalizationReady);
        this.queueInterface(new IIDSessionDataManager(), this.onSessionDataManagerReady);
        this.queueInterface(new IIDHabboRoomSessionManager(), this.onRoomSessionManagerReady);
        this.queueInterface(new IIDAvatarRenderManager(), this.onAvatarRenderedReady);
        this.queueInterface(new IIDHabboToolbar(), this.onToolbarReady);
        this.queueInterface(new IIDHabboCatalog(), this.onCatalogReady);
        this.queueInterface(new IIDHabboLandingView(), this.onLandingViewReady);
        this.queueInterface(new IIDRoomEngine(), this.onRoomEngineReady);
        this.queueInterface(new IIDHabboHelp(), this.onHabboHelpReady);
        this.queueInterface(new IIDHabboInventory(), this.onHabboInventory);
        this.queueInterface(new IIDHabboNavigator(), this.onHabboNavigator);
        this._SafeStr_2123 = new SnowWarEngine(this, param1, 0, param3);
        HabboGamesCom.log("HabboGameManager initialized: " + param3);
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get communication(): IHabboCommunicationManager {
        return this._communication;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get avatarManager(): IAvatarRenderManager {
        return this._avatarManager;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get inventory(): IHabboInventory {
        return this._inventory;
    }

    public get navigator(): IHabboNavigator {
        return this._navigator;
    }

    public get gameCenterEnabled(): boolean {
        return this._SafeStr_6754 || this._SafeStr_6131 && this.sessionDataManager.hasSecurity(4);
    }

    public get isHotelClosed(): boolean {
        return this._SafeStr_6199;
    }

    public set hotelClosed(param1: boolean) {
        this._SafeStr_6199 = param1;
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
        if (this._localization) {
            this._localization.release(new IIDHabboLocalizationManager());
            this._localization = null;
        }
        if (this._sessionDataManager != null) {
            this._sessionDataManager.release(new IIDSessionDataManager());
            this._sessionDataManager = null;
        }
        if (this._habboHelp != null) {
            this._habboHelp.release(new IIDHabboHelp());
            this._habboHelp = null;
        }
        if (this._toolbar) {
            if (this._toolbar.events) {
                this._toolbar.events.removeEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
            }
            this._toolbar.release(new IIDHabboToolbar());
            this._toolbar = null;
        }
        if (this._avatarManager != null) {
            this._avatarManager.release(new IIDAvatarRenderManager());
            this._avatarManager = null;
        }
        if (this._catalog != null) {
            this._catalog.release(new IIDHabboCatalog());
            this._catalog = null;
        }
        if (this._incomingMessages) {
            this._incomingMessages.dispose();
            this._incomingMessages = null;
        }
        if (this._landingView) {
            this._landingView.release(new IIDHabboLandingView());
            this._landingView = null;
        }
        if (this._roomEngine) {
            this._roomEngine.release(new IIDRoomEngine());
            this._roomEngine = null;
        }
        if (this._inventory) {
            this._inventory.release(new IIDHabboInventory());
            this._inventory = null;
        }
        if (this._navigator) {
            this._navigator.release(new IIDHabboNavigator());
            this._navigator = null;
        }
        this._activeGame = -1;
        super.dispose();
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
        this._SafeStr_6754 = this.getBoolean("game.center.enabled");
        this._SafeStr_6131 = this.getBoolean("game.center.enabled.forStaff");
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
    };

    private onToolbarReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._toolbar = isIHabboToolbar(param2) ? param2 : null;
        this._toolbar.events.addEventListener("HTE_TOOLBAR_CLICK", this.onToolbarClick);
    };

    private onCatalogReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._catalog = isIHabboCatalog(param2) ? param2 : null;
    };

    private onLandingViewReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._landingView = isIHabboLandingView(param2) ? param2 : null;
    };

    private onRoomEngineReady = (param1: IID = null, param2: IUnknown = null): void => {
        this._roomEngine = isIRoomEngine(param2) ? param2 : null;
    };

    private onHabboHelpReady = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._habboHelp = isIHabboHelp(param2) ? param2 : null;
    };

    private onHabboInventory = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._inventory = isIHabboInventory(param2) ? param2 : null;
    };

    private onHabboNavigator = (param1: IID = null, param2: IUnknown = null): void => {
        if (this.disposed) {
            return;
        }
        this._navigator = isIHabboNavigator(param2) ? param2 : null;
    };

    public initGameDirectoryConnection(): void {
        this.send(new Game2CheckGameDirectoryStatusMessageComposer());
    }

    public startSnowWarGame(param1: string): void {
        this.initGameDirectoryConnection();
        this.send(new Game2StartSnowWarMessageComposer(param1));
    }

    public startQuickSnowWarGame(): void {
        this.send(new Game2QuickJoinGameMessageComposer());
    }

    public onSnowWarArenaSessionEnded(): void {
        if (!this._SafeStr_2123.isGameStarting) {
            this._SafeStr_2123.resetSession();
            if (this._landingView != null) {
                this._landingView.activate();
            }
        }
    }

    public generateChecksumMismatch(): void {
        if (this._SafeStr_2123) {
            this._SafeStr_2123.generateChecksumMismatch();
        }
    }

    public handleClickOnTile(param1: RoomObjectTileMouseEvent): void {
        if (this._SafeStr_2123) {
            this._SafeStr_2123.handleClickOnTile(param1);
        }
    }

    public handleClickOnHuman(param1: number, param2: boolean, param3: boolean): void {
        if (this._SafeStr_2123) {
            this._SafeStr_2123.handleClickOnHuman(param1, param2, param3);
        }
    }

    public handleMouseOverOnHuman(param1: number, param2: boolean, param3: boolean): void {
        if (this._SafeStr_2123) {
            this._SafeStr_2123.handleMouseOverOnHuman(param1, param2, param3);
        }
    }

    public send(param1: IMessageComposer): void {
        if (this._communication) {
            this._communication.connection.send(param1);
        }
    }

    private onToolbarClick = (param1: HabboToolbarEvent): void => {
        switch (param1.iconId) {
            case "HTIE_ICON_GAMES":
                this.initGameDirectoryConnection();
                this.send(new GetSnowWarGameTokensOfferComposer());
                break;
            case "HTIE_ICON_RECEPTION":
        }
    };
}
