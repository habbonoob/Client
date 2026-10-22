import { asGuarded, asInstanceOf, isString } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomHandlerListener } from '@/com/sulake/habbo/session/IRoomHandlerListener';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { System } from '@habbo-pixi/runtime/system/System';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { isIDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { RoomVisualizationSettingsEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomVisualizationSettingsEvent';
import { RoomNetworkOpenConnectionMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/roomdirectory/RoomNetworkOpenConnectionMessageComposer';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import { AvatarEffectsHandler } from '@/com/sulake/habbo/session/handler/AvatarEffectsHandler';
import { BaseHandler } from '@/com/sulake/habbo/session/handler/BaseHandler';
import { GenericErrorHandler } from '@/com/sulake/habbo/session/handler/GenericErrorHandler';
import { PetPackageHandler } from '@/com/sulake/habbo/session/handler/PetPackageHandler';
import { PollHandler } from '@/com/sulake/habbo/session/handler/PollHandler';
import { PresentHandler } from '@/com/sulake/habbo/session/handler/PresentHandler';
import { RoomChatHandler } from '@/com/sulake/habbo/session/handler/RoomChatHandler';
import { RoomDataHandler } from '@/com/sulake/habbo/session/handler/RoomDataHandler';
import { RoomDimmerPresetsHandler } from '@/com/sulake/habbo/session/handler/RoomDimmerPresetsHandler';
import { RoomPermissionsHandler } from '@/com/sulake/habbo/session/handler/RoomPermissionsHandler';
import { RoomSessionHandler } from '@/com/sulake/habbo/session/handler/RoomSessionHandler';
import { RoomUsersHandler } from '@/com/sulake/habbo/session/handler/RoomUsersHandler';
import { WordQuizHandler } from '@/com/sulake/habbo/session/handler/WordQuizHandler';
import { isIRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import { RoomSession } from '@/com/sulake/habbo/session/RoomSession';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboConfigurationManager } from '@/com/sulake/iid/IIDHabboConfigurationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomSessionManager extends Component implements IRoomSessionManager, IRoomHandlerListener {
    static { registerClassName(this, 'com.sulake.habbo.session::RoomSessionManager'); }

    public static readonly _SafeStr_6118: number = 2;
    public static readonly SETUP_WITHOUT_TRACKING: number = 3;
    public static readonly _SafeStr_7744: number = 4;
    private static readonly _SafeStr_7939: number = 0.26;

    declare private _communication: IHabboCommunicationManager;

    declare private _handlers: any[];

    declare private _SafeStr_5915: boolean;

    declare private _SafeStr_2444: UtilsMap;

    declare private _SafeStr_4503: RoomSession;

    declare private _sessionStarting: boolean;

    declare private _habboTracking: IHabboTracking;

    declare private _roomEngine: IRoomEngine;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _SafeStr_6276: boolean;

    declare private _avatarRenderer: IAvatarRenderManager;

    declare private _roomViewerMode: boolean;

    declare private _pendingResources: any[];

    declare private _SafeStr_7271: RoomSession;

    constructor(param1: IContext, param2: number = 0) {
        super(param1, param2);
        this._roomViewerMode = (param2 & 1) != 0;
        this._handlers = [];
        this._SafeStr_2444 = new UtilsMap();
    }

    public get initialized(): boolean {
        return this.allRequiredDependenciesInjected && this._SafeStr_5915;
    }

    public get sessionStarting(): boolean {
        return this._sessionStarting;
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }, (this.flags & 2) == 0), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._habboTracking = param1;
         }, (this.flags & 3) == 0), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         }, false), new ComponentDependency(new IIDHabboConfigurationManager(), null), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, (this.flags & 4) == 0, [{ "type": "REE_ENGINE_INITIALIZED", "callback": this.onRoomEngineInitialized }]), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderer = param1;
         })]);
    }

    protected override initComponent(): void {
        this.createHandlers();
        if (this._roomViewerMode && this._communication != null) {
            this._communication.addHabboConnectionMessageEvent(new RoomVisualizationSettingsEvent(this.onRoomVisualizationSettings));
        }
        this.executePendingSessionRequest();
    }

    public override dispose(): void {
        let _loc4_: string = null;
        let _loc2_: RoomSession = null;
        let _loc3_: number = 0;
        let _loc1_: IDisposable = null;
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2444) {
            while (this._SafeStr_2444.length > 0) {
                _loc4_ = asGuarded(this._SafeStr_2444.getKey(0), isString);
                _loc2_ = asInstanceOf(this._SafeStr_2444.remove(_loc4_), RoomSession);
                if (_loc2_ != null) {
                    _loc2_.dispose();
                }
            }
            this._SafeStr_2444.dispose();
            this._SafeStr_2444 = null;
        }
        if (this._handlers) {
            _loc3_ = 0;
            while (_loc3_ < this._handlers.length) {
                _loc1_ = asGuarded(this._handlers[_loc3_], isIDisposable);
                if (_loc1_) {
                    _loc1_.dispose();
                }
                _loc3_++;
            }
            this._handlers = null;
        }
        super.dispose();
    }

    private onRoomEngineInitialized(param1: RoomEngineEvent): void {
        this._SafeStr_5915 = true;
        this.executePendingSessionRequest();
    }

    private createHandlers(): void {
        let _loc1_: IConnection = null;
        if (this._communication) {
            _loc1_ = this._communication.connection;
            this._handlers.push(new RoomSessionHandler(_loc1_, this));
            this._handlers.push(new RoomChatHandler(_loc1_, this));
            this._handlers.push(new RoomUsersHandler(_loc1_, this));
            this._handlers.push(new RoomPermissionsHandler(_loc1_, this));
            this._handlers.push(new AvatarEffectsHandler(_loc1_, this));
            this._handlers.push(new RoomDataHandler(_loc1_, this));
            this._handlers.push(new PresentHandler(_loc1_, this));
            this._handlers.push(new GenericErrorHandler(_loc1_, this));
            this._handlers.push(new PollHandler(_loc1_, this));
            this._handlers.push(new WordQuizHandler(_loc1_, this));
            this._handlers.push(new RoomDimmerPresetsHandler(_loc1_, this));
            this._handlers.push(new PetPackageHandler(_loc1_, this));
        }
    }

    private executePendingSessionRequest(): void {
        if (this.initialized && this._SafeStr_4503 != null) {
            this.createSession(this._SafeStr_4503);
            this._SafeStr_4503 = null;
        }
    }

    private onRoomVisualizationSettings(param1: RoomVisualizationSettingsEvent): void {
        let _loc3_: number = 0;
        let _loc8_: number = 0;
        let _loc2_: number = 0;
        let _loc6_: number = 0;
        let _loc9_: number = 0;
        let _loc4_: DisplayObject = null;
        let _loc7_: IRoomGeometry = null;
        if (this._SafeStr_6276 || !this._roomViewerMode) {
            return;
        }
        this._SafeStr_6276 = true;
        let _loc5_: IRoomSession = this.getSession(0);
        if (_loc5_ != null) {
            _loc3_ = 1;
            _loc8_ = 2;
            _loc2_ = 2;
            _loc6_ = 1024;
            _loc9_ = 768;
            _loc4_ = this._roomEngine.createRoomCanvas(_loc5_.roomId, _loc3_, _loc6_, _loc9_, 64);
            if (_loc4_ != null) {
                this.context.displayObjectContainer.addChild(_loc4_);
                this.context.displayObjectContainer.addEventListener("resize", this.onResize);
                this._roomEngine.setRoomCanvasMask(_loc5_.roomId, _loc3_, true);
                _loc7_ = this._roomEngine.getRoomCanvasGeometry(_loc5_.roomId, _loc3_);
                if (_loc7_ != null) {
                    _loc7_.adjustLocation(new Vector3d(_loc8_, _loc2_, 0), 30);
                }
                this._roomEngine.setRoomCanvasScreenOffset(_loc5_.roomId, _loc3_, new Point(0, -400));
            }
            if (this._freeFlowChat != null && this._freeFlowChat.displayObject) {
                this.context.displayObjectContainer.addChild(this._freeFlowChat.displayObject);
            }
        }
    }

    private onResize(param1: Event): void {
        if (!this._roomViewerMode) {
            return;
        }
        let _loc2_: IRoomSession = this.getSession(0);
        if (_loc2_ == null) {
            return;
        }
        this._roomEngine.modifyRoomCanvas(_loc2_.roomId, 1, this.context.displayObjectContainer.width | 0, this.context.displayObjectContainer.height | 0);
    }

    public gotoRoom(param1: number, param2: string = "", param3: string = "", param4: boolean = false): boolean {
        let _loc5_: RoomSession = new RoomSession();
        _loc5_.roomId = param1;
        _loc5_.roomPassword = param2;
        _loc5_.roomResources = param3;
        _loc5_.skipOpc = param4;
        _loc5_.habboTracking = this._habboTracking;
        return this.createSession(_loc5_);
    }

    public gotoRoomNetwork(param1: number, param2: number): boolean {
        let _loc3_: RoomSession = new RoomSession();
        _loc3_.roomId = 1;
        _loc3_.roomPassword = "";
        _loc3_.habboTracking = this._habboTracking;
        _loc3_.openConnectionComposer = new RoomNetworkOpenConnectionMessageComposer(param1, param2);
        return this.createSession(_loc3_);
    }

    private createSession(param1: RoomSession): boolean {
        if (!this.initialized) {
            Logger.log("[RoomSessionManager] Not initialized, crating pending session for room: " + param1.roomId + ". Room Engine Initialized: " + this._SafeStr_5915);
            this._SafeStr_4503 = param1;
            return false;
        }
        let _loc2_: string = this.getRoomIdentifier(param1.roomId);
        this._sessionStarting = true;
        if (this._SafeStr_2444.getValue(_loc2_) != null) {
            this.disposeSession(param1.roomId, false);
        }
        param1.connection = this._communication ? this._communication.connection : null;
        this._SafeStr_2444.add(_loc2_, param1);
        this.events.dispatchEvent(new RoomSessionEvent("RSE_CREATED", param1));
        if (this._roomViewerMode) {
            this._roomEngine.events.addEventListener("RCLE_SUCCESS", this.onRoomContentLoaded);
            this._pendingResources = [];
            this._SafeStr_7271 = param1;
            if (this._pendingResources.length == 0) {
                this.startSession(param1);
            }
        }
        return true;
    }

    private onRoomContentLoaded(param1: Event): void {
        if (this._pendingResources == null || this._pendingResources.length == 0) {
            return;
        }
        let _loc2_: number = this._pendingResources.indexOf(param1["contentType"]);
        if (_loc2_ != -1) {
            this._pendingResources.splice(_loc2_, 1);
        }
        if (this._pendingResources.length == 0) {
            this.startSession(this._SafeStr_7271);
        }
    }

    public startSession(param1: IRoomSession): boolean {
        if (param1.state == "RSE_STARTED") {
            return false;
        }
        if (param1.isGameSession) {
            return true;
        }
        if (param1.start()) {
            this._sessionStarting = false;
            this.events.dispatchEvent(new RoomSessionEvent("RSE_STARTED", param1));
            this.updateHandlers(param1);
            return true;
        }
        this.disposeSession(param1.roomId);
        this._sessionStarting = false;
        return false;
    }

    public startGameSession(): void {
        let _loc1_: RoomSession = new RoomSession();
        _loc1_.roomId = 1;
        _loc1_.habboTracking = this._habboTracking;
        _loc1_.isGameSession = true;
        _loc1_.connection = this._communication.connection;
        this._SafeStr_2444.add(this.getRoomIdentifier(_loc1_.roomId), _loc1_);
        this.events.dispatchEvent(new RoomSessionEvent("RSE_CREATED", _loc1_));
    }

    public disposeGameSession(): void {
        let _loc2_: string = this.getRoomIdentifier(1);
        let _loc1_: RoomSession = this._SafeStr_2444.getValue(_loc2_);
        if (_loc1_ && _loc1_.isGameSession) {
            this.disposeSession(1, false);
        }
    }

    public sessionUpdate(param1: number, param2: string): void {
        let _loc3_: IRoomSession = this.getSession(param1);
        if (_loc3_ != null) {
            switch (param2) {
                case "RS_CONNECTED":
                case "RS_READY":
                    break;
                case "RS_DISCONNECTED":
                    this.disposeSession(param1);
            }
        }
    }

    public sessionReinitialize(param1: number, param2: number): void {
        let _loc5_: string = this.getRoomIdentifier(param1);
        let _loc3_: RoomSession = asInstanceOf(this._SafeStr_2444.remove(_loc5_), RoomSession);
        if (_loc3_ == null) {
            _loc3_ = new RoomSession();
            _loc3_.roomId = param1;
            _loc3_.skipOpc = true;
            _loc3_.habboTracking = this._habboTracking;
            this.createSession(_loc3_);
        }
        _loc3_.reset(param2);
        _loc5_ = this.getRoomIdentifier(param2);
        let _loc4_: RoomSession = this._SafeStr_2444.remove(_loc5_);
        if (_loc4_ != null) {
        }
        this._SafeStr_2444.add(_loc5_, _loc3_);
        this.updateHandlers(_loc3_);
    }

    public getSession(param1: number): IRoomSession {
        let _loc2_: string = this.getRoomIdentifier(param1);
        return asGuarded(this._SafeStr_2444.getValue(_loc2_), isIRoomSession);
    }

    public disposeSession(param1: number, param2: boolean = true): void {
        let _loc4_: string = this.getRoomIdentifier(param1);
        let _loc3_: RoomSession = asInstanceOf(this._SafeStr_2444.remove(_loc4_), RoomSession);
        if (_loc3_ != null) {
            this.events.dispatchEvent(new RoomSessionEvent("RSE_ENDED", _loc3_, param2));
            _loc3_.dispose();
            this._roomEngine.purgeRoomContent();
            if (!this._avatarRenderer) {
            }
            System.pauseForGCIfCollectionImminent(0.26);
        }
    }

    private updateHandlers(param1: IRoomSession): void {
        let _loc3_: number = 0;
        let _loc2_: BaseHandler = null;
        if (param1 != null && this._handlers != null) {
            _loc3_ = 0;
            while (_loc3_ < this._handlers.length) {
                _loc2_ = asInstanceOf(this._handlers[_loc3_], BaseHandler);
                if (_loc2_ != null) {
                    _loc2_._SafeStr_2161 = param1.roomId;
                }
                _loc3_++;
            }
        }
    }

    private getRoomIdentifier(param1: number): string {
        return "hard_coded_room_id";
    }

    protected override initInstanceFields(): void {
        this.onRoomEngineInitialized = this.onRoomEngineInitialized.bind(this);
        this.onRoomVisualizationSettings = this.onRoomVisualizationSettings.bind(this);
        this.onResize = this.onResize.bind(this);
        this.onRoomContentLoaded = this.onRoomContentLoaded.bind(this);
        this._communication = null;
        this._handlers = null;
        this._SafeStr_5915 = false;
        this._SafeStr_2444 = null;
        this._sessionStarting = false;
        this._SafeStr_6276 = false;
        this._roomViewerMode = false;
        super.initInstanceFields();
    }

    get [IRoomSessionManager](): true {
        return true;
    }
}
