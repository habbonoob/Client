import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IConnection } from '@/com/sulake/core/communication/connection/IConnection';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { IToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAdManager } from '@/com/sulake/habbo/advertisement/IAdManager';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboAvatarEditor } from '@/com/sulake/habbo/avatar/IHabboAvatarEditor';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { BotForceOpenContextMenuParser } from '@/com/sulake/habbo/communication/messages/parser/room/bots/BotForceOpenContextMenuParser';
import type { BotSkillListUpdateParser } from '@/com/sulake/habbo/communication/messages/parser/room/bots/BotSkillListUpdateParser';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { IHabboModeration } from '@/com/sulake/habbo/moderation/IHabboModeration';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { ISelectedRoomObjectData } from '@/com/sulake/habbo/room/ISelectedRoomObjectData';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetFactory } from '@/com/sulake/habbo/ui/IRoomWidgetFactory';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { IRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';
import type { IRoomWidgetMessageListener } from '@/com/sulake/habbo/ui/widget/IRoomWidgetMessageListener';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { RoomContentLoadedEvent } from '@/com/sulake/room/events/RoomContentLoadedEvent';
import type { IRoomObject } from '@/com/sulake/room/object/IRoomObject';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import type { BitmapFilter } from '@habbo-pixi/runtime/filters/BitmapFilter';
import { BlurFilter } from '@habbo-pixi/runtime/filters/BlurFilter';
import { DisplacementMapFilter } from '@habbo-pixi/runtime/filters/DisplacementMapFilter';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component, EventDispatcherWrapper } from '@/com/sulake/core/runtime/Component.group';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import { isIToolTipWindow } from '@/com/sulake/core/window/components/IToolTipWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BotForceOpenContextMenuEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/bots/BotForceOpenContextMenuEvent';
import { BotSkillListUpdateEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/bots/BotSkillListUpdateEvent';
import { Logger } from '@/com/sulake/habbo/Logger';
import { RoomEngineObjectPlacedEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectPlacedEvent';
import { RoomEngineToWidgetEvent } from '@/com/sulake/habbo/room/events/RoomEngineToWidgetEvent';
import { DesktopLayoutManager } from '@/com/sulake/habbo/ui/DesktopLayoutManager';
import { AvatarInfoWidgetHandler } from '@/com/sulake/habbo/ui/handler/AvatarInfoWidgetHandler';
import { CameraWidgetHandler } from '@/com/sulake/habbo/ui/handler/CameraWidgetHandler';
import { ChatInputWidgetHandler } from '@/com/sulake/habbo/ui/handler/ChatInputWidgetHandler';
import { ConversionPointWidgetHandler } from '@/com/sulake/habbo/ui/handler/ConversionPointWidgetHandler';
import { CraftingWidgetHandler } from '@/com/sulake/habbo/ui/handler/CraftingWidgetHandler';
import { CustomUserNotificationWidgetHandler } from '@/com/sulake/habbo/ui/handler/CustomUserNotificationWidgetHandler';
import { DoorbellWidgetHandler } from '@/com/sulake/habbo/ui/handler/DoorbellWidgetHandler';
import { EffectsWidgetHandler } from '@/com/sulake/habbo/ui/handler/EffectsWidgetHandler';
import { ExternalImageWidgetHandler } from '@/com/sulake/habbo/ui/handler/ExternalImageWidgetHandler';
import { FriendFurniConfirmWidgetHandler } from '@/com/sulake/habbo/ui/handler/FriendFurniConfirmWidgetHandler';
import { FriendFurniEngravingWidgetHandler } from '@/com/sulake/habbo/ui/handler/FriendFurniEngravingWidgetHandler';
import { FriendRequestWidgetHandler } from '@/com/sulake/habbo/ui/handler/FriendRequestWidgetHandler';
import { FurniChooserWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurniChooserWidgetHandler';
import { FurnitureAreaHideWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureAreaHideWidgetHandler';
import { FurnitureBackgroundColorWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureBackgroundColorWidgetHandler';
import { FurnitureBadgeDisplayWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureBadgeDisplayWidgetHandler';
import { FurnitureClothingChangeWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureClothingChangeWidgetHandler';
import { FurnitureContextMenuWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureContextMenuWidgetHandler';
import { FurnitureCreditWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureCreditWidgetHandler';
import { FurnitureCustomStackHeightWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureCustomStackHeightWidgetHandler';
import { FurnitureDimmerWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureDimmerWidgetHandler';
import { FurnitureEcotronBoxWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureEcotronBoxWidgetHandler';
import { FurnitureInternalLinkHandler } from '@/com/sulake/habbo/ui/handler/FurnitureInternalLinkHandler';
import { FurniturePresentWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurniturePresentWidgetHandler';
import { FurnitureRentableSpaceWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureRentableSpaceWidgetHandler';
import { FurnitureRoomLinkHandler } from '@/com/sulake/habbo/ui/handler/FurnitureRoomLinkHandler';
import { FurnitureStickieWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureStickieWidgetHandler';
import { FurnitureTrophyWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureTrophyWidgetHandler';
import { FurnitureVimeoDisplayWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureVimeoDisplayWidgetHandler';
import { FurnitureYoutubeDisplayWidgetHandler } from '@/com/sulake/habbo/ui/handler/FurnitureYoutubeDisplayWidgetHandler';
import { HighScoreFurniWidgetHandler } from '@/com/sulake/habbo/ui/handler/HighScoreFurniWidgetHandler';
import { InfoStandWidgetHandler } from '@/com/sulake/habbo/ui/handler/InfoStandWidgetHandler';
import { LoadingBarWidgetHandler } from '@/com/sulake/habbo/ui/handler/LoadingBarWidgetHandler';
import { MannequinWidgetHandler } from '@/com/sulake/habbo/ui/handler/MannequinWidgetHandler';
import { MeMenuWidgetHandler } from '@/com/sulake/habbo/ui/handler/MeMenuWidgetHandler';
import { ObjectLocationRequestHandler } from '@/com/sulake/habbo/ui/handler/ObjectLocationRequestHandler';
import { PetPackageFurniWidgetHandler } from '@/com/sulake/habbo/ui/handler/PetPackageFurniWidgetHandler';
import { PlaceholderWidgetHandler } from '@/com/sulake/habbo/ui/handler/PlaceholderWidgetHandler';
import { PlayListEditorWidgetHandler } from '@/com/sulake/habbo/ui/handler/PlayListEditorWidgetHandler';
import { PollWidgetHandler } from '@/com/sulake/habbo/ui/handler/PollWidgetHandler';
import { RoomQueueWidgetHandler } from '@/com/sulake/habbo/ui/handler/RoomQueueWidgetHandler';
import { RoomThumbnailCameraWidgetHandler } from '@/com/sulake/habbo/ui/handler/RoomThumbnailCameraWidgetHandler';
import { RoomToolsWidgetHandler } from '@/com/sulake/habbo/ui/handler/RoomToolsWidgetHandler';
import { SpamWallPostItWidgetHandler } from '@/com/sulake/habbo/ui/handler/SpamWallPostItWidgetHandler';
import { UiHelpBubbleWidgetHandler } from '@/com/sulake/habbo/ui/handler/UiHelpBubbleWidgetHandler';
import { UserChooserWidgetHandler } from '@/com/sulake/habbo/ui/handler/UserChooserWidgetHandler';
import { WordQuizWidgetHandler } from '@/com/sulake/habbo/ui/handler/WordQuizWidgetHandler';
import { isIRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { AvatarInfoWidget } from '@/com/sulake/habbo/ui/widget/avatarinfo/AvatarContextInfoView.group';
import { RoomChatInputWidget } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputWidget.group';
import { RoomWidgetLoadingBarUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetLoadingBarUpdateEvent';
import { RoomWidgetRentableBotForceOpenContextMenuEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotForceOpenContextMenuEvent';
import { RoomWidgetRentableBotSkillListUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRentableBotSkillListUpdateEvent';
import { RoomWidgetRoomEngineUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomEngineUpdateEvent';
import { RoomWidgetRoomObjectPlaceEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectPlaceEvent';
import { RoomWidgetRoomObjectUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomObjectUpdateEvent';
import { RoomWidgetRoomViewUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomViewUpdateEvent';
import { isIRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';
import { RoomWidgetFurniToWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetFurniToWidgetMessage';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isIRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { ColorConverter } from '@/com/sulake/room/utils/ColorConverter';
import { ColorTransitioner } from '@/com/sulake/room/utils/ColorTransitioner';
import { RoomGeometry } from '@/com/sulake/room/utils/RoomGeometry';
import { RoomId } from '@/com/sulake/room/utils/RoomId';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class RoomDesktop implements IRoomDesktop, IRoomWidgetMessageListener, IRoomWidgetHandlerContainer {
    static { registerClassName(this, 'com.sulake.habbo.ui::RoomDesktop'); }

    public static readonly STATE_UNDEFINED: number = -1;
    private static readonly RESIZE_UPDATE_TIMEOUT_MS: number = 1000;
    private static readonly SCALE_UPDATE_TIMEOUT_MS: number = 1000;
    private static readonly ZOOM_ANIMATION_BASE_FRAME_MS: number = 16.666666666666668;
    private static readonly ROOM_ZOOM_EPSILON: number = 0.001;
    private static readonly ROOM_ZOOM_SCROLL_COOLDOWN_MS: number = 400;
    private static readonly ROOM_ZOOM_SCROLL_MOUSE_DELTA_BYPASS_THRESHOLD: number = 2;
    private static readonly ROOM_ZOOM_SCALES: any[] = [0.5, 1, 2, 4, 8, 16];

    declare private _events: EventDispatcherWrapper;

    private _windowManager: IHabboWindowManager = null;
    private _roomEngine: IRoomEngine = null;
    private _roomWidgetFactory: IRoomWidgetFactory = null;
    private _sessionDataManager: ISessionDataManager = null;
    private _roomSessionManager: IRoomSessionManager = null;
    private _communicationManager: IHabboCommunicationManager = null;
    private _avatarRenderManager: IAvatarRenderManager = null;
    private _friendList: IHabboFriendList = null;
    private _inventory: IHabboInventory = null;
    private _toolbar: IHabboToolbar = null;
    private _navigator: IHabboNavigator = null;
    private _messenger: IHabboMessenger = null;
    private _habboGroupsManager: IHabboGroupsManager = null;
    private _avatarEditor: IHabboAvatarEditor = null;
    private _catalog: IHabboCatalog = null;
    private _adManager: IAdManager = null;
    private _localization: IHabboLocalizationManager = null;
    private _habboHelp: IHabboHelp = null;
    private _connection: IConnection = null;

    declare private _moderation: IHabboModeration;

    declare private _config: ICoreConfiguration;

    declare private _soundManager: IHabboSoundManager;

    declare private _habboTracking: IHabboTracking;

    declare private _userDefinedRoomEvents: IHabboUserDefinedRoomEvents;

    declare private _gameManager: IHabboGameManager;

    declare private _questEngine: IHabboQuestEngine;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    private _assets: IAssetLibrary = null;
    private _SafeStr_2171: IRoomSession = null;
    private _SafeStr_2581: any[] = [];

    declare private _SafeStr_2139: UtilsMap;

    declare private _SafeStr_3376: UtilsMap;

    declare private _SafeStr_3172: UtilsMap;

    declare private _updateListeners: any[];

    declare private _layoutManager: DesktopLayoutManager;

    declare private _SafeStr_2272: IDisplayObjectWrapper;

    private _SafeStr_5248: boolean = true;

    declare private _pendingResources: any[];

    declare private _SafeStr_2479: IToolTipWindow;

    private _SafeStr_3516: ColorTransitioner = null;
    private _roomColor: number = 16777215;
    private _SafeStr_7566: boolean = false;
    private _zoomChangedMillis: number = 0;
    private _SafeStr_3542: ColorTransitioner = null;
    private _roomBackgroundColor: number = 0;

    declare private _SafeStr_2990: Timer;

    declare private _SafeStr_5243: Rectangle;

    declare private _SafeStr_3685: IMessageEvent;

    declare private _SafeStr_3780: IMessageEvent;

    declare private _SafeStr_3717: Point;

    private _SafeStr_14714: number = NaN;
    private _lastZoomScrollMillis: number = 0;

    constructor(param1: IRoomSession, param2: IAssetLibrary, param3: IConnection) {
        this._events = new EventDispatcherWrapper();
        this._SafeStr_2171 = param1;
        this._assets = param2;
        this._connection = param3;
        this._SafeStr_3685 = new BotSkillListUpdateEvent(this.onBotSkillListUpdateEvent);
        this._connection.addMessageEvent(this._SafeStr_3685);
        this._SafeStr_3780 = new BotForceOpenContextMenuEvent(this.onBotForceOpenContextMenuEvent);
        this._connection.addMessageEvent(this._SafeStr_3780);
        this._SafeStr_2139 = new UtilsMap();
        this._SafeStr_3376 = new UtilsMap();
        this._SafeStr_3172 = new UtilsMap();
        this._layoutManager = new DesktopLayoutManager();
        this.checkInterrupts();
        this._SafeStr_3516 = new ColorTransitioner();
        this._SafeStr_3542 = new ColorTransitioner(0, 0);
    }

    public set visible(param1: boolean) {
        if (this._SafeStr_2272) {
            this._SafeStr_2272.visible = param1;
        }
    }

    public get roomSession(): IRoomSession {
        return this._SafeStr_2171;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public get events(): IEventDispatcher {
        return this._events;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get friendList(): IHabboFriendList {
        return this._friendList;
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    public get inventory(): IHabboInventory {
        return this._inventory && !this._inventory.disposed ? this._inventory : null;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get roomWidgetFactory(): IRoomWidgetFactory {
        return this._roomWidgetFactory;
    }

    public get navigator(): IHabboNavigator {
        return this._navigator;
    }

    public get habboGroupsManager(): IHabboGroupsManager {
        return this._habboGroupsManager;
    }

    public get communicationManager(): IHabboCommunicationManager {
        return this._communicationManager;
    }

    public get avatarEditor(): IHabboAvatarEditor {
        return this._avatarEditor;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    public get config(): ICoreConfiguration {
        return this._config;
    }

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    public get messenger(): IHabboMessenger {
        return this._messenger;
    }

    public get moderation(): IHabboModeration {
        return this._moderation;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get habboTracking(): IHabboTracking {
        return this._habboTracking;
    }

    public get session(): IRoomSession {
        return this._SafeStr_2171;
    }

    public get gameManager(): IHabboGameManager {
        return this._gameManager;
    }

    public get questEngine(): IHabboQuestEngine {
        return this._questEngine;
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._freeFlowChat;
    }

    public get roomBackgroundColor(): number {
        return this._roomBackgroundColor;
    }

    public set catalog(param1: IHabboCatalog) {
        this._catalog = param1;
    }

    public set avatarEditor(param1: IHabboAvatarEditor) {
        this._avatarEditor = param1;
    }

    public set roomWidgetFactory(param1: IRoomWidgetFactory) {
        this._roomWidgetFactory = param1;
    }

    public set sessionDataManager(param1: ISessionDataManager) {
        this._sessionDataManager = param1;
    }

    public set roomSessionManager(param1: IRoomSessionManager) {
        this._roomSessionManager = param1;
        this.checkInterrupts();
    }

    public set communicationManager(param1: IHabboCommunicationManager) {
        this._communicationManager = param1;
    }

    public get userDefinedRoomEvents(): IHabboUserDefinedRoomEvents {
        return this._userDefinedRoomEvents;
    }

    public get connection(): IConnection {
        return this._connection;
    }

    public set friendList(param1: IHabboFriendList) {
        this._friendList = param1;
        if (this._friendList) {
            this._friendList.events.addEventListener("FRE_ACCEPTED", this.processEvent);
            this._friendList.events.addEventListener("FRE_DECLINED", this.processEvent);
        }
    }

    public set avatarRenderManager(param1: IAvatarRenderManager) {
        this._avatarRenderManager = param1;
    }

    public set windowManager(param1: IHabboWindowManager) {
        this._windowManager = param1;
    }

    public set inventory(param1: IHabboInventory) {
        this._inventory = param1;
    }

    public set navigator(param1: IHabboNavigator) {
        this._navigator = param1;
    }

    public set adManager(param1: IAdManager) {
        this._adManager = param1;
    }

    public set localization(param1: IHabboLocalizationManager) {
        this._localization = param1;
    }

    public set habboHelp(param1: IHabboHelp) {
        this._habboHelp = param1;
    }

    public set moderation(param1: IHabboModeration) {
        this._moderation = param1;
    }

    public set config(param1: ICoreConfiguration) {
        this._config = param1;
    }

    public set soundManager(param1: IHabboSoundManager) {
        this._soundManager = param1;
    }

    public set habboTracking(param1: IHabboTracking) {
        this._habboTracking = param1;
    }

    public set userDefinedRoomEvents(param1: IHabboUserDefinedRoomEvents) {
        this._userDefinedRoomEvents = param1;
    }

    public set gameManager(param1: IHabboGameManager) {
        this._gameManager = param1;
    }

    public set questEngine(param1: IHabboQuestEngine) {
        this._questEngine = param1;
    }

    public set freeFlowChat(param1: IHabboFreeFlowChat) {
        this._freeFlowChat = param1;
    }

    public set habboGroupsManager(param1: IHabboGroupsManager) {
        this._habboGroupsManager = param1;
    }

    public set roomEngine(param1: IRoomEngine) {
        this._roomEngine = param1;
        if (this._roomEngine != null && this._roomEngine.events != null) {
            this._roomEngine.events.addEventListener("RCLE_SUCCESS", this.onRoomContentLoaded);
            this._roomEngine.events.addEventListener("RCLE_FAILURE", this.onRoomContentLoaded);
            this._roomEngine.events.addEventListener("RCLE_CANCEL", this.onRoomContentLoaded);
        }
    }

    public set messenger(param1: IHabboMessenger) {
        this._messenger = param1;
    }

    public set toolbar(param1: IHabboToolbar) {
        this._toolbar = param1;
        this._toolbar.events.addEventListener("HTIE_ICON_ZOOM", this.onToolbarEvent);
    }

    public set layout(param1: XML) {
        this._layoutManager.setLayout(param1, this._windowManager, this._config);
    }

    public dispose(): void {
        let _loc5_: IRoomGeometry = null;
        let _loc4_: number = 0;
        let _loc3_: string = null;
        let _loc1_: IRoomWidget = null;
        if (this._roomEngine != null && this._SafeStr_2171 != null) {
            _loc5_ = this._roomEngine.getRoomCanvasGeometry(this._SafeStr_2171.roomId, this.getFirstCanvasId());
            if (_loc5_ != null) {
                this.trackZooming(_loc5_.isZoomedIn(), false);
            }
        }
        let _loc2_: number = 0;
        if (this._SafeStr_2581 != null) {
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2581.length) {
                _loc4_ = this._SafeStr_2581[_loc2_] | 0;
                _loc3_ = this.getWindowName(_loc4_);
                if (this._windowManager) {
                    this._windowManager.removeWindow(_loc3_);
                }
                _loc2_++;
            }
        }
        this._updateListeners = null;
        if (this._SafeStr_2139 != null) {
            _loc2_ = 0;
            while (_loc2_ < this._SafeStr_2139.length) {
                _loc1_ = asGuarded(this._SafeStr_2139.getWithIndex(_loc2_), isIRoomWidget);
                if (_loc1_ != null) {
                    if (_loc1_.reusable) {
                        if (this._layoutManager != null) {
                            this._layoutManager.removeWidgetWindow(_loc1_.widgetType, _loc1_.mainWindow);
                        }
                        _loc1_.release();
                    } else {
                        _loc1_.dispose();
                    }
                }
                _loc2_++;
            }
            this._SafeStr_2139.dispose();
            this._SafeStr_2139 = null;
        }
        if (this._SafeStr_3376 != null) {
            this._SafeStr_3376.dispose();
            this._SafeStr_3376 = null;
        }
        if (this._SafeStr_3172 != null) {
            this._SafeStr_3172.dispose();
            this._SafeStr_3172 = null;
        }
        if (this._connection) {
            if (this._SafeStr_3685 != null) {
                this._connection.removeMessageEvent(this._SafeStr_3685);
                this._SafeStr_3685.dispose();
                this._SafeStr_3685 = null;
            }
            if (this._SafeStr_3780 != null) {
                this._connection.removeMessageEvent(this._SafeStr_3780);
                this._SafeStr_3780.dispose();
                this._SafeStr_3780 = null;
            }
            this._connection = null;
        }
        this._assets = null;
        this._avatarRenderManager = null;
        this._SafeStr_2581 = null;
        this._events = null;
        if (this._friendList && this._friendList.events) {
            this._friendList.events.removeEventListener("FRE_ACCEPTED", this.processEvent);
            this._friendList.events.removeEventListener("FRE_DECLINED", this.processEvent);
        }
        this._friendList = null;
        this._layoutManager.dispose();
        this._layoutManager = null;
        if (this._roomEngine != null && this._roomEngine.events != null) {
            this._roomEngine.events.removeEventListener("RCLE_SUCCESS", this.onRoomContentLoaded);
            this._roomEngine.events.removeEventListener("RCLE_FAILURE", this.onRoomContentLoaded);
            this._roomEngine.events.removeEventListener("RCLE_CANCEL", this.onRoomContentLoaded);
        }
        this._roomEngine = null;
        this._roomSessionManager = null;
        this._roomWidgetFactory = null;
        this._SafeStr_2171 = null;
        this._sessionDataManager = null;
        this._windowManager = null;
        this._inventory = null;
        this._localization = null;
        this._config = null;
        this._soundManager = null;
        this._habboGroupsManager = null;
        if (this._toolbar && this.toolbar.events) {
            this._toolbar.events.removeEventListener("HTIE_ICON_ZOOM", this.onToolbarEvent);
            this._toolbar = null;
        }
        this._navigator = null;
        if (this._SafeStr_2479 != null) {
            this._SafeStr_2479.dispose();
            this._SafeStr_2479 = null;
        }
        if (this._SafeStr_2990 != null) {
            this._SafeStr_2990.reset();
            this._SafeStr_2990.removeEventListener("timer", this.onResizeTimerEvent);
            this._SafeStr_2990 = null;
        }
        this._SafeStr_5243 = null;
        this._SafeStr_3516 = null;
        this._SafeStr_3542 = null;
    }

    private onBotSkillListUpdateEvent = (param1: BotSkillListUpdateEvent): void => {
        let _loc2_: IUserData = null;
        let _loc3_: BotSkillListUpdateParser = param1.getParser();
        if (this._SafeStr_2171 != null) {
            _loc2_ = this._SafeStr_2171.userDataManager.getRentableBotUserData(_loc3_.botId);
            _loc2_.botSkillData = param1.getParser().skillList.concat();
        }
        this.events.dispatchEvent(new RoomWidgetRentableBotSkillListUpdateEvent(_loc3_.botId, _loc3_.skillList));
    };

    private onBotForceOpenContextMenuEvent = (param1: BotForceOpenContextMenuEvent): void => {
        let _loc2_: BotForceOpenContextMenuParser = param1.getParser();
        this.events.dispatchEvent(new RoomWidgetRentableBotForceOpenContextMenuEvent(_loc2_.botId));
    };

    public init(): void {
        if (this._roomEngine != null && this._SafeStr_2171 != null) {
            this._pendingResources = [];
            if (this._pendingResources.length > 0) {
                this._SafeStr_5248 = false;
                this.processEvent(new RoomWidgetLoadingBarUpdateEvent("RWLBUE_SHOW_LOADING_BAR"));
            }
        }
    }

    public requestInterstitial(): void {
        if (this._adManager != null) {
            this._adManager.showInterstitial();
        }
    }

    private onRoomContentLoaded = (param1: RoomContentLoadedEvent): void => {
        if (this._pendingResources == null || this._pendingResources.length == 0) {
            return;
        }
        let _loc2_: number = this._pendingResources.indexOf(param1.contentType);
        if (_loc2_ != -1) {
            this._pendingResources.splice(_loc2_, 1);
        }
        if (this._pendingResources.length == 0) {
            this._SafeStr_5248 = true;
            this.checkInterrupts();
        }
    };

    public createWidget(param1: string, param2: boolean = false, param3: IRoomWidget = null): IRoomWidget {
        let _loc4_: IRoomWidgetHandler = null;
        let _loc19_: PlayListEditorWidgetHandler = null;
        let _loc5_: SpamWallPostItWidgetHandler = null;
        let _loc8_: FurnitureContextMenuWidgetHandler = null;
        let _loc14_: FurnitureRoomLinkHandler = null;
        let _loc9_: RoomToolsWidgetHandler = null;
        let _loc20_: RoomWidgetBase = null;
        let _loc6_: FurnitureRoomLinkHandler = null;
        let _loc13_: FurnitureContextMenuWidgetHandler = null;
        let _loc11_: RoomToolsWidgetHandler = null;
        let _loc16_: any[] = null;
        let _loc17_: any[] = null;
        let _loc21_: any[] = null;
        let _loc15_: RoomWidgetRoomViewUpdateEvent = null;
        if (this._roomWidgetFactory == null) {
            return null;
        }
        let _loc7_: IRoomWidget = asGuarded(this._SafeStr_2139.getValue(param1), isIRoomWidget);
        if (_loc7_ != null) {
            return null;
        }
        if (this._SafeStr_2171.isGameSession && !this.isGameWidget(param1)) {
            return null;
        }
        let _loc10_: boolean = param1 == "RWE_CHAT_INPUT_WIDGET";
        if (param3 == null) {
            switch (param1) {
                case "RWE_INFOSTAND":
                    _loc4_ = new InfoStandWidgetHandler(this._soundManager.musicController);
                    break;
                case "RWE_CHAT_INPUT_WIDGET":
                    _loc4_ = new ChatInputWidgetHandler();
                    break;
                case "RWE_ME_MENU":
                    _loc4_ = new MeMenuWidgetHandler();
                    break;
                case "RWE_FURNI_PLACEHOLDER":
                    _loc4_ = new PlaceholderWidgetHandler();
                    break;
                case "RWE_FURNI_CREDIT_WIDGET":
                    _loc4_ = new FurnitureCreditWidgetHandler();
                    break;
                case "RWE_FURNI_STICKIE_WIDGET":
                    _loc4_ = new FurnitureStickieWidgetHandler();
                    break;
                case "RWE_FURNI_PRESENT_WIDGET":
                    _loc4_ = new FurniturePresentWidgetHandler();
                    break;
                case "RWE_FURNI_TROPHY_WIDGET":
                    _loc4_ = new FurnitureTrophyWidgetHandler();
                    break;
                case "RWE_FURNI_ECOTRONBOX_WIDGET":
                    _loc4_ = new FurnitureEcotronBoxWidgetHandler();
                    break;
                case "RWE_FURNI_PET_PACKAGE_WIDGET":
                    _loc4_ = new PetPackageFurniWidgetHandler();
                    break;
                case "RWE_DOORBELL":
                    _loc4_ = new DoorbellWidgetHandler();
                    break;
                case "RWE_ROOM_QUEUE":
                    _loc4_ = new RoomQueueWidgetHandler();
                    break;
                case "RWE_LOADINGBAR":
                    _loc4_ = new LoadingBarWidgetHandler();
                    break;
                case "RWE_ROOM_POLL":
                    _loc4_ = new PollWidgetHandler();
                    break;
                case "RWE_WORD_QUIZZ":
                    _loc4_ = new WordQuizWidgetHandler();
                    break;
                case "RWE_FURNI_CHOOSER":
                    _loc4_ = new FurniChooserWidgetHandler();
                    break;
                case "RWE_USER_CHOOSER":
                    _loc4_ = new UserChooserWidgetHandler();
                    break;
                case "RWE_ROOM_DIMMER":
                    _loc4_ = new FurnitureDimmerWidgetHandler();
                    break;
                case "RWE_FRIEND_REQUEST":
                    _loc4_ = new FriendRequestWidgetHandler();
                    break;
                case "RWE_CLOTHING_CHANGE":
                    _loc4_ = new FurnitureClothingChangeWidgetHandler();
                    break;
                case "RWE_CONVERSION_TRACKING":
                    _loc4_ = new ConversionPointWidgetHandler();
                    break;
                case "RWE_AVATAR_INFO":
                    _loc4_ = new AvatarInfoWidgetHandler();
                    break;
                case "RWE_PLAYLIST_EDITOR_WIDGET":
                    _loc19_ = new PlayListEditorWidgetHandler();
                    _loc19_.connection = this._connection;
                    _loc4_ = isIRoomWidgetHandler(_loc19_) ? _loc19_ : null;
                    break;
                case "RWE_SPAMWALL_POSTIT_WIDGET":
                    _loc5_ = new SpamWallPostItWidgetHandler();
                    _loc5_.connection = this._connection;
                    _loc4_ = isIRoomWidgetHandler(_loc5_) ? _loc5_ : null;
                    break;
                case "RWE_EFFECTS":
                    _loc4_ = new EffectsWidgetHandler();
                    break;
                case "RWE_MANNEQUIN":
                    _loc4_ = new MannequinWidgetHandler();
                    break;
                case "RWE_FURNITURE_CONTEXT_MENU":
                    _loc8_ = new FurnitureContextMenuWidgetHandler();
                    _loc8_.connection = this._connection;
                    _loc4_ = isIRoomWidgetHandler(_loc8_) ? _loc8_ : null;
                    break;
                case "RWE_LOCATION_WIDGET":
                    _loc4_ = new ObjectLocationRequestHandler();
                    break;
                case "RWE_CAMERA":
                    _loc4_ = new CameraWidgetHandler(this);
                    break;
                case "RWE_ROOM_BACKGROUND_COLOR":
                    _loc4_ = new FurnitureBackgroundColorWidgetHandler();
                    break;
                case "RWE_AREA_HIDE":
                    _loc4_ = new FurnitureAreaHideWidgetHandler();
                    break;
                case "RWE_CUSTOM_USER_NOTIFICATION":
                    _loc4_ = new CustomUserNotificationWidgetHandler();
                    break;
                case "RWE_FURNI_ACHIEVEMENT_RESOLUTION_ENGRAVING":
                    _loc4_ = new FurnitureBadgeDisplayWidgetHandler();
                    break;
                case "RWE_FRIEND_FURNI_CONFIRM":
                    _loc4_ = new FriendFurniConfirmWidgetHandler();
                    castTo(_loc4_, FriendFurniConfirmWidgetHandler).connection = this.connection;
                    break;
                case "RWE_FRIEND_FURNI_ENGRAVING":
                    _loc4_ = new FriendFurniEngravingWidgetHandler();
                    break;
                case "RWE_HIGH_SCORE_DISPLAY":
                    _loc4_ = new HighScoreFurniWidgetHandler();
                    break;
                case "RWE_INTERNAL_LINK":
                    _loc4_ = new FurnitureInternalLinkHandler();
                    break;
                case "RWE_ROOM_LINK":
                    _loc14_ = new FurnitureRoomLinkHandler();
                    _loc14_.communicationManager = this._communicationManager;
                    _loc4_ = _loc14_;
                    break;
                case "RWE_CUSTOM_STACK_HEIGHT":
                    _loc4_ = new FurnitureCustomStackHeightWidgetHandler();
                    break;
                case "RWE_YOUTUBE":
                    _loc4_ = new FurnitureYoutubeDisplayWidgetHandler();
                    break;
                case "RWE_RENTABLESPACE":
                    _loc4_ = new FurnitureRentableSpaceWidgetHandler();
                    break;
                case "RWE_VIMEO":
                    _loc4_ = new FurnitureVimeoDisplayWidgetHandler();
                    break;
                case "RWE_ROOM_TOOLS":
                    _loc9_ = new RoomToolsWidgetHandler();
                    _loc9_.communicationManager = this._communicationManager;
                    _loc9_.navigator = this._navigator;
                    _loc4_ = _loc9_;
                    break;
                case "RWE_EXTERNAL_IMAGE":
                    _loc4_ = new ExternalImageWidgetHandler();
                    break;
                case "RWE_UI_HELP_BUBBLE":
                    _loc4_ = new UiHelpBubbleWidgetHandler();
                    break;
                case "RWE_ROOM_THUMBNAIL_CAMERA":
                    _loc4_ = new RoomThumbnailCameraWidgetHandler(this);
                    break;
                case "RWE_CRAFTING":
                    _loc4_ = new CraftingWidgetHandler(this);
            }
        } else {
            _loc20_ = param3 instanceof RoomWidgetBase ? param3 : null;
            if (_loc20_ != null) {
                _loc4_ = _loc20_.widgetHandler;
                _loc6_ = _loc4_ instanceof FurnitureRoomLinkHandler ? _loc4_ : null;
                if (_loc6_ != null) {
                    _loc13_.connection = this._connection;
                }
                _loc13_ = _loc4_ instanceof FurnitureContextMenuWidgetHandler ? _loc4_ : null;
                if (_loc13_ != null) {
                    _loc13_.connection = this._connection;
                }
                _loc11_ = _loc4_ instanceof RoomToolsWidgetHandler ? _loc4_ : null;
                if (_loc11_ != null) {
                    _loc11_.communicationManager = this._communicationManager;
                    _loc11_.navigator = this._navigator;
                }
            }
        }
        if (_loc4_ != null) {
            _loc4_.container = this;
            _loc16_ = null;
            _loc17_ = _loc4_.getWidgetMessages();
            if (_loc17_ != null) {
                for (const _loc12_ of _loc17_ ?? []) {
                    _loc16_ = this._SafeStr_3376.getValue(_loc12_);
                    if (_loc16_ == null) {
                        _loc16_ = [];
                        this._SafeStr_3376.add(_loc12_, _loc16_);
                    }
                    _loc16_.push(_loc4_);
                }
            }
            _loc21_ = _loc4_.getProcessedEvents();
            if (_loc21_ != null) {
                _loc21_.push("RETWE_OPEN_WIDGET");
                _loc21_.push("RETWE_CLOSE_WIDGET");
                for (const _loc18_ of _loc21_ ?? []) {
                    _loc16_ = this._SafeStr_3172.getValue(_loc18_);
                    if (_loc16_ == null) {
                        _loc16_ = [];
                        this._SafeStr_3172.add(_loc18_, _loc16_);
                    }
                    _loc16_.push(_loc4_);
                }
            }
        }
        _loc7_ = param3 == null ? this._roomWidgetFactory.createWidget(param1, _loc4_) : param3;
        if (_loc7_ == null) {
            return null;
        }
        _loc7_.messageListener = this;
        _loc7_.registerUpdateEvents(this._events);
        _loc7_.reusable = param2;
        _loc7_.widgetType = param1;
        if (!this._SafeStr_2139.add(param1, _loc7_)) {
            if (param3 == null) {
                _loc7_.dispose();
            } else {
                param3.release();
            }
        } else {
            if (param3 != null) {
                param3.reuse(this);
            }
            this._layoutManager.addWidgetWindow(param1, _loc7_.mainWindow);
        }
        if (_loc10_) {
            param1 = "RWRVUE_ROOM_VIEW_SIZE_CHANGED";
            _loc15_ = new RoomWidgetRoomViewUpdateEvent(param1, this._layoutManager.roomViewRect);
            this.events.dispatchEvent(_loc15_);
        }
        return _loc7_;
    }

    private isGameWidget(param1: string): boolean {
        switch (param1) {
            case "RWE_CHAT_INPUT_WIDGET":
            case "RWE_AVATAR_INFO":
            case "RWE_LOCATION_WIDGET":
                break;
            default:
                return false;
        }
        return true;
    }

    public disposeWidget(param1: string): void {
        let _loc2_: IRoomWidget = null;
        if (this._SafeStr_2139 != null) {
            _loc2_ = this._SafeStr_2139.remove(param1);
            if (_loc2_ != null) {
                if (this._layoutManager != null) {
                    this._layoutManager.removeWidgetWindow(param1, _loc2_.mainWindow);
                }
                _loc2_.dispose();
            }
        }
    }

    public getWidget(param1: string): IRoomWidget {
        let _loc2_: IRoomWidget = null;
        if (this._SafeStr_2139 != null) {
            _loc2_ = this._SafeStr_2139[param1];
        }
        return _loc2_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc4_: RoomWidgetUpdateEvent = null;
        if (param1 == null) {
            return null;
        }
        if (param1.type == "RWZTM_ZOOM_TOGGLE") {
            this.toggleZoom();
        }
        let _loc3_: any[] = this._SafeStr_3376.getValue(param1.type);
        if (_loc3_ != null) {
            for (const _loc2_ of _loc3_ ?? []) {
                _loc4_ = _loc2_.processWidgetMessage(param1);
                if (_loc4_ != null) {
                    return _loc4_;
                }
            }
        }
        return null;
    }

    public processEvent = (param1: Event): void => {
        let _loc3_: boolean = false;
        let _loc5_: RoomEngineToWidgetEvent = null;
        if (!param1 || !this._SafeStr_3172) {
            return;
        }
        if (this._SafeStr_2272 && param1.type == "RDMZEE_ENABLED") {
            this.checkAndEnableMouseZoomEvent(this._SafeStr_2272.getDisplayObject());
        }
        let _loc4_: any[] = this._SafeStr_3172.getValue(param1.type);
        if (_loc4_ != null) {
            for (const _loc2_ of _loc4_ ?? []) {
                _loc3_ = true;
                if (param1.type == "RETWE_OPEN_WIDGET" || param1.type == "RETWE_CLOSE_WIDGET") {
                    _loc5_ = param1 instanceof RoomEngineToWidgetEvent ? param1 : null;
                    _loc3_ = _loc5_ != null && _loc2_.type == _loc5_.widget;
                }
                if (param1.type == "RWZTM_ZOOM_TOGGLE") {
                    this.toggleZoom();
                }
                if (_loc3_) {
                    _loc2_.processEvent(param1);
                }
            }
        }
    };

    private isFurnitureSelectionDisabled(param1: RoomEngineObjectEvent): boolean {
        let _loc4_: IRoomObjectModel = null;
        let _loc3_: boolean = false;
        let _loc2_: IRoomObject = this.roomEngine.getRoomObject(param1.roomId, param1.objectId, param1.category);
        if (_loc2_ != null) {
            _loc4_ = _loc2_.getModel();
            if (_loc4_ != null) {
                if (_loc4_.getNumber("furniture_selection_disable") == 1) {
                    _loc3_ = true;
                    if (this._sessionDataManager.isAnyRoomController) {
                        _loc3_ = false;
                    }
                }
            }
        }
        return _loc3_;
    }

    public roomObjectEventHandler(param1: RoomEngineObjectEvent): void {
        let _loc4_: string = null;
        let _loc12_: IUserData = null;
        let _loc3_: RoomEngineObjectPlacedEvent = null;
        let _loc13_: IRoomObject = null;
        let _loc5_: number = 0;
        let _loc9_: number = 0;
        let _loc2_: boolean = false;
        let _loc7_: number = 0;
        if (param1 == null) {
            return;
        }
        let _loc10_: number = param1.objectId;
        let _loc11_: number = param1.category;
        let _loc8_: RoomWidgetRoomObjectUpdateEvent = null;
        let _loc6_: RoomWidgetFurniToWidgetMessage = null;
        switch (param1.type) {
            case "REOE_SELECTED":
                if (!this.isFurnitureSelectionDisabled(param1)) {
                    _loc8_ = new RoomWidgetRoomObjectUpdateEvent("RWROUE_OBJECT_SELECTED", _loc10_, _loc11_, param1.roomId);
                }
                if (this._moderation != null && _loc11_ == 100) {
                    _loc12_ = this._SafeStr_2171.userDataManager.getUserDataByIndex(_loc10_);
                    if (_loc12_ != null && _loc12_.type == 1) {
                        this._moderation.userSelected(_loc12_.webID, _loc12_.name);
                    }
                }
                break;
            case "REOE_PLACED":
                _loc3_ = param1 instanceof RoomEngineObjectPlacedEvent ? param1 : null;
                _loc8_ = new RoomWidgetRoomObjectPlaceEvent("RWROUE_OBJECT_PLACED", _loc10_, _loc11_, param1.roomId, _loc3_.wallLocation, _loc3_.x, _loc3_.y, _loc3_.z, _loc3_.direction, _loc3_.placedInRoom, _loc3_.placedOnFloor, _loc3_.placedOnWall, _loc3_.instanceData, _loc3_.placementSource);
                break;
            case "REOE_ADDED":
                switch (_loc11_) {
                    case 10:
                    case 20:
                        _loc4_ = "RWROUE_FURNI_ADDED";
                        break;
                    case 100:
                        _loc4_ = "RWROUE_USER_ADDED";
                }
                if (_loc4_ != null) {
                    _loc8_ = new RoomWidgetRoomObjectUpdateEvent(_loc4_, _loc10_, _loc11_, param1.roomId);
                }
                break;
            case "REOE_REMOVED":
                switch (_loc11_) {
                    case 10:
                    case 20:
                        _loc4_ = "RWROUE_FURNI_REMOVED";
                        break;
                    case 100:
                        _loc4_ = "RWROUE_USER_REMOVED";
                }
                if (_loc4_ != null) {
                    _loc8_ = new RoomWidgetRoomObjectUpdateEvent(_loc4_, _loc10_, _loc11_, param1.roomId);
                }
                break;
            case "REOE_DESELECTED":
                _loc8_ = new RoomWidgetRoomObjectUpdateEvent("RWROUE_OBJECT_DESELECTED", _loc10_, _loc11_, param1.roomId);
                break;
            case "REOE_MOUSE_ENTER":
                _loc8_ = new RoomWidgetRoomObjectUpdateEvent("RWROUE_OBJECT_ROLL_OVER", _loc10_, _loc11_, param1.roomId);
                break;
            case "REOE_MOUSE_LEAVE":
                _loc8_ = new RoomWidgetRoomObjectUpdateEvent("RWROUE_OBJECT_ROLL_OUT", _loc10_, _loc11_, param1.roomId);
                break;
            case "REOE_REQUEST_MOVE":
                if (this.checkFurniManipulationRights(param1.roomId, param1.objectId, param1.category)) {
                    this._roomEngine.modifyRoomObject(param1.objectId, param1.category, "OBJECT_MOVE");
                }
                break;
            case "REOE_REQUEST_ROTATE":
                if (this.checkFurniManipulationRights(param1.roomId, param1.objectId, param1.category)) {
                    this._roomEngine.modifyRoomObject(param1.objectId, param1.category, "OBJECT_ROTATE_POSITIVE");
                }
                break;
            case "REOE_REQUEST_PICKUP":
                this._roomEngine.modifyRoomObject(param1.objectId, param1.category, "OBJECT_PICKUP");
                break;
            case "RETWE_REQUEST_CREDITFURNI":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_CREDITFURNI", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_STICKIE":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_STICKIE", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_PRESENT":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_PRESENT", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_TROPHY":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_TROPHY", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_TEASER":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_TEASER", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_ECOTRONBOX":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_ECOTRONBOX", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_DIMMER":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_DIMMER", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_PLACEHOLDER":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_PLACEHOLDER", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RERAE_FURNI_CLICK":
            case "RERAE_FURNI_DOUBLE_CLICK":
                this.handleRoomAdClick(param1);
                break;
            case "RERAE_TOOLTIP_SHOW":
            case "RERAE_TOOLTIP_HIDE":
                this.handleRoomAdTooltip(param1);
                break;
            case "RETWE_REQUEST_CLOTHING_CHANGE":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_CLOTHING_CHANGE", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_PLAYLIST_EDITOR":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_MESSAGE_REQUEST_PLAYLIST_EDITOR", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_BADGE_DISPLAY_ENGRAVING":
                _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_WIDGET_MESSAGE_REQUEST_BADGE_DISPLAY_ENGRAVING", _loc10_, _loc11_, param1.roomId);
                this.processWidgetMessage(_loc6_);
                break;
            case "RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED":
                _loc13_ = this._roomEngine.getRoomObject(param1.roomId, param1.objectId, param1.category);
                if (_loc13_ != null) {
                    _loc5_ = _loc13_.getModel().getNumber("furniture_owner_id") | 0;
                    _loc9_ = this._sessionDataManager.userId;
                    if (_loc5_ == _loc9_) {
                        _loc6_ = new RoomWidgetFurniToWidgetMessage("RWFWM_WIDGET_MESSAGE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED", _loc10_, _loc11_, param1.roomId);
                        this.processWidgetMessage(_loc6_);
                    }
                }
                break;
            case "RETWE_OPEN_WIDGET":
            case "RETWE_CLOSE_WIDGET":
            case "RETWE_OPEN_FURNI_CONTEXT_MENU":
            case "RETWE_CLOSE_FURNI_CONTEXT_MENU":
            case "RETWE_REMOVE_DIMMER":
            case "ROSM_JUKEBOX_DISPOSE":
            case "RETWE_REQUEST_MANNEQUIN":
            case "ROSM_USE_PRODUCT_FROM_INVENTORY":
            case "ROSM_USE_PRODUCT_FROM_ROOM":
            case "RETWE_REQUEST_BACKGROUND_COLOR":
            case "RETWE_REQUEST_AREA_HIDE":
            case "RETWE_UPDATE_STATE_AREA_HIDE":
            case "RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING":
            case "RETWE_REQUEST_HIGH_SCORE_DISPLAY":
            case "RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY":
            case "RETWE_REQUEST_INTERNAL_LINK":
            case "RETWE_REQUEST_ROOM_LINK":
                this.processEvent(param1);
        }
        if (_loc8_ != null) {
            _loc2_ = true;
            if (_loc8_ instanceof RoomWidgetRoomObjectUpdateEvent) {
                _loc7_ = (_loc8_ instanceof RoomWidgetRoomObjectUpdateEvent ? _loc8_ : null).roomId;
                _loc2_ = !RoomId.isRoomPreviewerId(_loc7_);
            } else if ((_loc8_ as unknown) instanceof RoomWidgetRoomEngineUpdateEvent) {
                // (TypeScript sees the two event classes as the same shape; they are different classes)
                _loc7_ = ((_loc8_ as unknown) instanceof RoomWidgetRoomEngineUpdateEvent ? _loc8_ as unknown as RoomWidgetRoomEngineUpdateEvent : null).roomId;
                _loc2_ = !RoomId.isRoomPreviewerId(_loc7_);
            }
            if (_loc2_) {
                this.events.dispatchEvent(_loc8_);
            }
        }
    }

    private checkFurniManipulationRights(param1: number, param2: number, param3: number): boolean {
        return this._SafeStr_2171.roomControllerLevel >= 1 || this._sessionDataManager.isAnyRoomController || this.isOwnerOfFurniture(this._roomEngine.getRoomObject(param1, param2, param3)) || this._roomEngine.activeRoomHasFreeFurniMovementsMode;
    }

    public roomEngineEventHandler(param1: RoomEngineEvent): void {
        let _loc2_: RoomWidgetUpdateEvent = null;
        switch (param1.type) {
            case "REE_NORMAL_MODE":
                _loc2_ = new RoomWidgetRoomEngineUpdateEvent("RWREUE_NORMAL_MODE", param1.roomId);
                break;
            case "REE_GAME_MODE":
                _loc2_ = new RoomWidgetRoomEngineUpdateEvent("RWREUE_GAME_MODE", param1.roomId);
        }
        if (_loc2_ != null) {
            this.events.dispatchEvent(_loc2_);
        }
    }

    public createRoomView(param1: number): void {
        let _loc15_: number = NaN;
        let _loc5_: number = NaN;
        let _loc14_: number = NaN;
        let _loc4_: number = NaN;
        let _loc13_: number = NaN;
        let _loc10_: number = NaN;
        let _loc8_: number = NaN;
        let _loc11_: number = NaN;
        let _loc6_: IWindow = null;
        let _loc3_: Rectangle = this._layoutManager.roomViewRect;
        let _loc16_: number = _loc3_.width | 0;
        let _loc22_: number = _loc3_.height | 0;
        let _loc7_: number = this._SafeStr_2171.isGameSession ? 32 : 64;
        if (this._SafeStr_2581.indexOf(param1) >= 0) {
            return;
        }
        if (this._SafeStr_2171 == null || this._windowManager == null || this._roomEngine == null) {
            return;
        }
        let _loc17_: DisplayObject = this._roomEngine.createRoomCanvas(this._SafeStr_2171.roomId, param1, _loc16_, _loc22_, _loc7_);
        if (_loc17_ == null) {
            return;
        }
        let _loc18_: RoomGeometry = asInstanceOf(this._roomEngine.getRoomCanvasGeometry(this._SafeStr_2171.roomId, param1), RoomGeometry);
        if (_loc18_ != null) {
            _loc15_ = this._roomEngine.getRoomNumberValue(this._SafeStr_2171.roomId, "room_min_x");
            _loc5_ = this._roomEngine.getRoomNumberValue(this._SafeStr_2171.roomId, "room_max_x");
            _loc14_ = this._roomEngine.getRoomNumberValue(this._SafeStr_2171.roomId, "room_min_y");
            _loc4_ = this._roomEngine.getRoomNumberValue(this._SafeStr_2171.roomId, "room_max_y");
            _loc13_ = (_loc15_ + _loc5_) / 2;
            _loc10_ = (_loc14_ + _loc4_) / 2;
            _loc8_ = 20;
            _loc13_ += _loc8_ - 1;
            _loc10_ += _loc8_ - 1;
            _loc11_ = Math.sqrt(_loc8_ * _loc8_ + _loc8_ * _loc8_) * Math.tan(0.16666666666666666 * 3.141592653589793);
            _loc18_.location = new Vector3d(_loc13_, _loc10_, _loc11_);
        }
        let _loc20_: XmlAsset = asInstanceOf(this._assets.getAssetByName("room_view_container_xml"), XmlAsset);
        if (_loc20_ == null) {
            return;
        }
        let _loc9_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc20_.content, XML)), isIWindowContainer);
        if (_loc9_ == null) {
            return;
        }
        _loc9_.width = _loc16_;
        _loc9_.height = _loc22_;
        this._SafeStr_2272 = asGuarded(_loc9_.findChildByName("room_canvas_wrapper"), isIDisplayObjectWrapper);
        if (this._SafeStr_2272 == null) {
            return;
        }
        this._SafeStr_2272.setDisplayObject(_loc17_);
        if (this._SafeStr_2171.isGameSession) {
            _loc17_.addEventListener("click", this.mouseEventHandler);
        }
        this.checkAndEnableMouseZoomEvent(_loc17_);
        this._SafeStr_2272.addEventListener("WME_CLICK", this.canvasMouseHandler);
        this._SafeStr_2272.addEventListener("WME_DOUBLE_CLICK", this.canvasMouseHandler);
        this._SafeStr_2272.addEventListener("WME_MOVE", this.canvasMouseHandler);
        this._SafeStr_2272.addEventListener("WME_DOWN", this.canvasMouseHandler);
        this._SafeStr_2272.addEventListener("WME_UP", this.canvasMouseHandler);
        this._SafeStr_2272.addEventListener("WME_UP_OUTSIDE", this.canvasMouseHandler);
        this._SafeStr_2272.addEventListener("WE_RESIZED", this.onRoomViewResized);
        let _loc19_: Sprite = new Sprite();
        _loc19_.mouseEnabled = false;
        _loc19_.blendMode = "multiply";
        let _loc21_: IDisplayObjectWrapper = asGuarded(_loc9_.findChildByName("colorizer_wrapper"), isIDisplayObjectWrapper);
        if (_loc21_ == null) {
            return;
        }
        _loc21_.setDisplayObject(_loc19_);
        _loc21_.addEventListener("WE_RESIZED", this.resizeColorizer);
        let _loc2_: Sprite = new Sprite();
        _loc2_.mouseEnabled = false;
        let _loc12_: IDisplayObjectWrapper = asGuarded(_loc9_.findChildByName("background_wrapper"), isIDisplayObjectWrapper);
        if (_loc12_ == null) {
            return;
        }
        _loc12_.setDisplayObject(_loc2_);
        _loc12_.addEventListener("WE_RESIZED", this.resizeBackgroundColorizer);
        if (this._SafeStr_2171.isSpectatorMode) {
            _loc6_ = this.getSpectatorModeVisualization();
            if (_loc6_ != null) {
                _loc6_.width = _loc9_.width;
                _loc6_.height = _loc9_.height;
                _loc9_.addChild(_loc6_);
            }
        }
        this._layoutManager.addRoomView(_loc9_);
        this._SafeStr_2581.push(param1);
    }

    public initCameraLocation(param1: number): void {
        let _loc5_: Vector3d = null;
        let _loc2_: number = this._roomEngine.getRoomNumberValue(this._SafeStr_2171.roomId, "camera_init_x");
        let _loc4_: number = this._roomEngine.getRoomNumberValue(this._SafeStr_2171.roomId, "camera_init_y");
        let _loc3_: number = this._roomEngine.getRoomNumberValue(this._SafeStr_2171.roomId, "camera_init_z");
        if (!isNaN(_loc2_) && !isNaN(_loc4_) && !isNaN(_loc3_)) {
            _loc5_ = new Vector3d(_loc2_, _loc4_, _loc3_);
            this._roomEngine.runUpdate();
            this._roomEngine.updateRoomCamera(this._SafeStr_2171.roomId, param1, _loc5_, 1);
        }
    }

    public enterAfterSpectate(): void {
        let _loc2_: IWindowContainer = asGuarded(this._layoutManager.getRoomView(), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc1_: IWindow = _loc2_.findChildByName("spectator_mode_container");
        if (_loc1_ == null) {
            return;
        }
        _loc2_.removeChild(_loc1_);
        _loc1_.dispose();
    }

    private checkAndEnableMouseZoomEvent(param1: DisplayObject): void {
        param1.removeEventListener("mouseWheel", this.mouseWheelHandler);
        if (this._SafeStr_2272 == null) {
            return;
        }
        this._SafeStr_2272.removeEventListener("WME_WHEEL", this.mouseWheelHandler);
        this._SafeStr_2272.addEventListener("WME_WHEEL", this.mouseWheelHandler);
    }

    private mouseWheelHandler = (param1: WindowMouseEvent): void => {
        let _loc4_: number = 0;
        let _loc8_: number = 0;
        let _loc3_: Point = null;
        let _loc2_: number = 0;
        let _loc5_: number = 0;
        let _loc7_: number = NaN;
        let _loc6_: number = NaN;
        if (this.shouldRotateActiveFurnitureWithScroll(param1)) {
            this._roomEngine.rotateActiveObjectPreview(param1.delta > 0);
            param1.preventDefault();
            return;
        }
        if (param1.ctrlKey && !param1.altKey && !param1.shiftKey) {
            if (param1.delta == 0) {
                return;
            }
            _loc4_ = getTimer();
            _loc8_ = param1.delta < 0 ? -1 : 1;
            if (!this.shouldProcessZoomScroll(param1.delta, _loc4_)) {
                param1.preventDefault();
                return;
            }
            _loc3_ = new Point();
            this._SafeStr_2272.getGlobalPosition(_loc3_);
            _loc2_ = param1.stageX - _loc3_.x | 0;
            _loc5_ = param1.stageY - _loc3_.y | 0;
            _loc7_ = this.getCurrentRoomCanvasZoomScale();
            _loc6_ = this.getNextZoomScale(_loc7_, _loc8_);
            if (Math.abs(_loc6_ - _loc7_) <= 0.001) {
                param1.preventDefault();
                return;
            }
            this._SafeStr_3717 = new Point(_loc2_, _loc5_);
            this.animateRoomCanvasScale(_loc6_, this._SafeStr_3717);
            this.markZoomScroll(_loc4_);
            param1.preventDefault();
        }
    };

    private shouldProcessZoomScroll(param1: number, param2: number): boolean {
        if (Math.abs(param1) >= 2) {
            return true;
        }
        return this._lastZoomScrollMillis <= 0 || param2 - this._lastZoomScrollMillis > 400;
    }

    private markZoomScroll(param1: number): void {
        this._lastZoomScrollMillis = param1;
    }

    private shouldRotateActiveFurnitureWithScroll(param1: WindowMouseEvent): boolean {
        if (this._roomEngine == null || this._SafeStr_2171 == null || param1 == null) {
            return false;
        }
        if (param1.delta == 0 || param1.ctrlKey || param1.altKey || param1.shiftKey) {
            return false;
        }
        let _loc2_: ISelectedRoomObjectData = this._roomEngine.getSelectedObjectData(this._SafeStr_2171.roomId);
        if (_loc2_ == null || _loc2_.category != 10) {
            return false;
        }
        return _loc2_.operation == "OBJECT_MOVE" || _loc2_.operation == "OBJECT_PLACE";
    }

    private resizeColorizer = (param1: WindowEvent): void => {
        let _loc2_: IDisplayObjectWrapper = asGuarded(param1.target, isIDisplayObjectWrapper);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: Sprite = asInstanceOf(_loc2_.getDisplayObject(), Sprite);
        if (_loc3_ == null) {
            return;
        }
        _loc3_.graphics.clear();
        _loc3_.graphics.beginFill(this._roomColor);
        _loc3_.graphics.drawRect(0, 0, _loc2_.width, _loc2_.height);
        _loc3_.graphics.endFill();
    };

    private resizeBackgroundColorizer = (param1: WindowEvent): void => {
        let _loc2_: IDisplayObjectWrapper = asGuarded(param1.target, isIDisplayObjectWrapper);
        if (_loc2_ == null) {
            return;
        }
        this.fillBackgroundColorizer(_loc2_);
    };

    private fillBackgroundColorizer(param1: IDisplayObjectWrapper): void {
        let _loc2_: Sprite = asInstanceOf(param1.getDisplayObject(), Sprite);
        if (_loc2_ == null) {
            return;
        }
        _loc2_.graphics.clear();
        _loc2_.graphics.beginFill(this._roomBackgroundColor);
        _loc2_.graphics.drawRect(0, 0, param1.width, param1.height);
        _loc2_.graphics.endFill();
    }

    public setRoomViewColor(param1: number, param2: number): void {
        if (this._SafeStr_3516) {
            this._SafeStr_3516.startTransition(param1 | 0, param2, getTimer());
        }
    }

    private updateColor(): void {
        if (this._SafeStr_3516 && this._SafeStr_3516.updateColor(getTimer())) {
            this._roomColor = this._SafeStr_3516.color >>> 0;
            this.drawRoomColor();
        }
        if (this._SafeStr_3542 && this._SafeStr_3542.updateColor(getTimer())) {
            this._roomBackgroundColor = this._SafeStr_3542.color >>> 0;
            this.drawRoomBackgroundColor();
        }
    }

    private drawRoomColor(): void {
        let _loc2_: IWindowContainer = asGuarded(this._layoutManager.getRoomView(), isIWindowContainer);
        if (_loc2_ == null) {
            return;
        }
        let _loc3_: IDisplayObjectWrapper = asGuarded(_loc2_.getChildByName("colorizer_wrapper"), isIDisplayObjectWrapper);
        if (_loc3_ == null) {
            return;
        }
        let _loc1_: Sprite = asInstanceOf(_loc3_.getDisplayObject(), Sprite);
        if (_loc1_ == null) {
            return;
        }
        _loc1_.graphics.clear();
        _loc1_.graphics.beginFill(this._roomColor);
        _loc1_.graphics.drawRect(0, 0, _loc3_.width, _loc3_.height);
        _loc1_.graphics.endFill();
    }

    public setRoomBackgroundColor(param1: number, param2: number, param3: number): void {
        if (this._SafeStr_3542) {
            this._SafeStr_3542.startTransition(ColorConverter.hslToRGB(((param1 & 0xFF) << 16) + ((param2 & 0xFF) << 8) + (param3 & 0xFF) >>> 0) | 0, param3, getTimer());
        }
    }

    private drawRoomBackgroundColor(): void {
        let _loc1_: IWindowContainer = asGuarded(this._layoutManager.getRoomView(), isIWindowContainer);
        if (_loc1_ == null) {
            return;
        }
        let _loc2_: IDisplayObjectWrapper = asGuarded(_loc1_.getChildByName("background_wrapper"), isIDisplayObjectWrapper);
        if (_loc2_ == null) {
            return;
        }
        if (this.roomBackgroundColor == 0) {
            _loc2_.visible = false;
        } else {
            _loc2_.visible = true;
            this.fillBackgroundColorizer(_loc2_);
        }
    }

    public getFirstCanvasId(): number {
        if (this._SafeStr_2581 != null) {
            if (this._SafeStr_2581.length > 0) {
                return this._SafeStr_2581[0] | 0;
            }
        }
        return 0;
    }

    public getRoomViewRect(): Rectangle {
        if (!this._layoutManager) {
            return null;
        }
        return this._layoutManager.roomViewRect;
    }

    public addListenerToStage(param1: string, param2: (...args: any[]) => any): void {
        if (!this._SafeStr_2272 || !this._SafeStr_2272.getDisplayObject() || !this._SafeStr_2272.getDisplayObject().stage) {
            return;
        }
        this._SafeStr_2272.getDisplayObject().stage.addEventListener(param1, param2, false, 0, true);
    }

    public removeListenerFromStage(param1: string, param2: (...args: any[]) => any): void {
        if (!this._SafeStr_2272 || !this._SafeStr_2272.getDisplayObject() || !this._SafeStr_2272.getDisplayObject().stage) {
            return;
        }
        this._SafeStr_2272.getDisplayObject().stage.removeEventListener(param1, param2);
    }

    public canvasMouseHandler = (param1: WindowEvent): void => {
        let _loc5_: Point = null;
        let _loc3_: number = 0;
        let _loc7_: number = 0;
        let _loc6_: Point = null;
        if (this._roomEngine == null || this._SafeStr_2171 == null) {
            return;
        }
        let _loc4_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        if (_loc4_ == null) {
            return;
        }
        if (_loc4_.type == "WME_DOWN") {
            this.hideTransientSelectors();
        }
        let _loc8_: string = "";
        switch (_loc4_.type) {
            case "WME_CLICK":
                _loc8_ = "click";
                break;
            case "WME_DOUBLE_CLICK":
                _loc8_ = "doubleClick";
                break;
            case "WME_DOWN":
                _loc8_ = "mouseDown";
                break;
            case "WME_UP":
            case "WME_UP_OUTSIDE":
                _loc8_ = "mouseUp";
                break;
            case "WME_MOVE":
                _loc8_ = "mouseMove";
                break;
            default:
                return;
        }
        let _loc2_: IDisplayObjectWrapper = asGuarded(_loc4_.target, isIDisplayObjectWrapper);
        if (_loc2_ == _loc4_.target) {
            _loc5_ = new Point();
            _loc2_.getGlobalPosition(_loc5_);
            _loc3_ = _loc4_.stageX - _loc5_.x | 0;
            _loc7_ = _loc4_.stageY - _loc5_.y | 0;
            this._roomEngine.setActiveRoom(this._SafeStr_2171.roomId);
            this._roomEngine.handleRoomCanvasMouseEvent(this._SafeStr_2581[0] | 0, _loc3_, _loc7_, _loc8_, _loc4_.altKey, _loc4_.ctrlKey, _loc4_.shiftKey, _loc4_.buttonDown);
        }
        if (_loc8_ == "mouseMove" && this._SafeStr_2479 != null) {
            _loc6_ = new Point(_loc4_.stageX, _loc4_.stageY);
            _loc6_.offset(-this._SafeStr_2479.width / 2, 15);
            this._SafeStr_2479.setGlobalPosition(_loc6_);
        }
    };

    private hideTransientSelectors(): void {
        let _loc1_: RoomChatInputWidget = asInstanceOf(this.getWidget("RWE_CHAT_INPUT_WIDGET"), RoomChatInputWidget);
        if (_loc1_ != null) {
            _loc1_.hideTransientSelectors();
        }
        if (this._messenger != null) {
            this._messenger.hideTransientSelectors();
        }
    }

    private mouseEventHandler = (param1: MouseEvent): void => {
        this.hideTransientSelectors();
        let _loc3_: Point = new Point();
        this._SafeStr_2272.getGlobalPosition(_loc3_);
        let _loc2_: number = param1.stageX - _loc3_.x | 0;
        let _loc4_: number = param1.stageY - _loc3_.y | 0;
        this._roomEngine.setActiveRoom(this._SafeStr_2171.roomId);
        param1.stopImmediatePropagation();
        this._roomEngine.handleRoomCanvasMouseEvent(this._SafeStr_2581[0] | 0, _loc2_, _loc4_, param1.type, param1.altKey, param1.ctrlKey, param1.shiftKey, param1.buttonDown);
    };

    private onRoomViewResized = (param1: WindowEvent): void => {
        let _loc2_: IWindow = param1.window;
        this._SafeStr_5243 = _loc2_.rectangle;
        this._roomEngine.modifyRoomCanvas(this._SafeStr_2171.roomId, this._SafeStr_2581[0] | 0, _loc2_.width, _loc2_.height);
        if (this._SafeStr_2990 == null) {
            this._SafeStr_2990 = new Timer(1000, 1);
            this._SafeStr_2990.addEventListener("timer", this.onResizeTimerEvent);
        } else {
            this._SafeStr_2990.reset();
        }
        this._SafeStr_2990.start();
    };

    private onResizeTimerEvent = (param1: TimerEvent): void => {
        let _loc2_: string = "RWRVUE_ROOM_VIEW_SIZE_CHANGED";
        this.events.dispatchEvent(new RoomWidgetRoomViewUpdateEvent(_loc2_, this._SafeStr_5243));
    };

    private trackZooming(param1: boolean, param2: boolean): void {
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (this._SafeStr_7566) {
            _loc3_ = getTimer();
            _loc4_ = Math.round((_loc3_ - this._zoomChangedMillis) / 1000) | 0;
            if (this._habboTracking != null) {
                if (param1) {
                    if (param2) {
                        this._habboTracking.trackGoogle("zoomEvent", "out");
                    }
                    this._habboTracking.trackGoogle("zoomEnded", "in", _loc4_);
                } else {
                    if (param2) {
                        this._habboTracking.trackGoogle("zoomEvent", "in");
                    }
                    this._habboTracking.trackGoogle("zoomEnded", "out", _loc4_);
                }
            }
            this._zoomChangedMillis = _loc3_;
        }
    }

    private onToolbarEvent = (param1: HabboToolbarEvent): void => {
        if (param1.type == "HTIE_ICON_ZOOM") {
            this.toggleZoom();
        }
    };

    private toggleZoom(): void {
        let _loc1_: number = NaN;
        let _loc2_: number = NaN;
        let _loc3_: IRoomGeometry = null;
        if (this._SafeStr_2171 != null) {
            if ((this._roomEngine instanceof Component ? this._roomEngine : null).getBoolean("zoom.enabled")) {
                _loc1_ = this.getCurrentRoomCanvasZoomScale();
                _loc2_ = _loc1_ == 1 ? 0.5 : 1;
                this.animateRoomCanvasScale(_loc2_);
            } else {
                _loc3_ = this._roomEngine.getRoomCanvasGeometry(this._SafeStr_2171.roomId, this.getFirstCanvasId());
                if (_loc3_ != null) {
                    this.trackZooming(_loc3_.isZoomedIn(), true);
                    _loc3_.performZoom();
                }
            }
        }
    }

    public update(param1: number = 0): void {
        let _loc10_: number = NaN;
        let _loc8_: number = NaN;
        let _loc11_: number = NaN;
        let _loc9_: number = NaN;
        let _loc7_: number = NaN;
        let _loc2_: number = NaN;
        let _loc5_: number = NaN;
        let _loc4_: number = 0;
        let _loc6_: number = 0;
        let _loc3_: IRoomWidgetHandler = null;
        if (!isNaN(this._SafeStr_14714)) {
            _loc10_ = this._roomEngine.getRoomCanvasScale(this._SafeStr_2171.roomId, this.getFirstCanvasId());
            _loc8_ = this.scaleToZoomAnimationValue(_loc10_);
            _loc11_ = this.scaleToZoomAnimationValue(this._SafeStr_14714);
            _loc9_ = _loc11_ - _loc8_;
            if (Math.abs(_loc9_) <= 0.01) {
                this._roomEngine.setRoomCanvasScale(this._SafeStr_2171.roomId, this.getFirstCanvasId(), this._SafeStr_14714, this._SafeStr_3717, null, false, true);
                this._SafeStr_14714 = NaN;
            } else {
                _loc7_ = this.getZoomAnimationStep(_loc8_, _loc11_, param1);
                _loc2_ = _loc8_ + (_loc9_ < 0 ? -Math.min(_loc7_, -_loc9_) : Math.min(_loc7_, _loc9_));
                _loc5_ = this.zoomLevelToScale(_loc2_);
                this._roomEngine.setRoomCanvasScale(this._SafeStr_2171.roomId, this.getFirstCanvasId(), _loc5_, this._SafeStr_3717, null, false, true);
            }
        }
        if (this._updateListeners != null) {
            _loc4_ = this._updateListeners.length | 0;
            _loc6_ = 0;
            while (_loc6_ < _loc4_) {
                _loc3_ = asGuarded(this._updateListeners[_loc6_], isIRoomWidgetHandler);
                if (_loc3_ != null) {
                    _loc3_.update();
                }
                _loc6_++;
            }
        }
        this.updateColor();
    }

    public animateRoomCanvasScale(param1: number, param2: Point = null): void {
        if (this._SafeStr_2171 == null || this._roomEngine == null || isNaN(param1) || !(this._roomEngine instanceof Component ? this._roomEngine : null).getBoolean("zoom.enabled")) {
            return;
        }
        this._SafeStr_14714 = this.clampRoomCanvasZoomScale(param1);
        this._SafeStr_3717 = param2;
    }

    public getCurrentRoomCanvasZoomScale(): number {
        let _loc1_: number = this.getCurrentControllableRoomCanvasScale();
        return isNaN(_loc1_) ? 1 : this.getNearestZoomScale(_loc1_);
    }

    public canZoomRoomCanvas(param1: number): boolean {
        if (!this.canUseAnimatedRoomZoom() || param1 == 0) {
            return false;
        }
        let _loc2_: number = this.getCurrentRoomCanvasZoomScale();
        return Math.abs(this.getNextZoomScale(_loc2_, param1) - _loc2_) > 0.001;
    }

    public zoomRoomCanvas(param1: number): void {
        if (!this.canUseAnimatedRoomZoom() || param1 == 0) {
            return;
        }
        let _loc3_: number = this.getCurrentRoomCanvasZoomScale();
        let _loc2_: number = this.getNextZoomScale(_loc3_, param1);
        if (Math.abs(_loc2_ - _loc3_) <= 0.001) {
            return;
        }
        this.animateRoomCanvasScale(_loc2_);
    }

    private getNextZoomScale(param1: number, param2: number): number {
        let _loc3_: number = 0;
        if (isNaN(param1) || param2 == 0) {
            return param1;
        }
        if (param2 > 0) {
            if (param1 >= RoomDesktop.ROOM_ZOOM_SCALES[RoomDesktop.ROOM_ZOOM_SCALES.length - 1] - 0.001) {
                return param1;
            }
            _loc3_ = 0;
            while (_loc3_ < RoomDesktop.ROOM_ZOOM_SCALES.length) {
                if (RoomDesktop.ROOM_ZOOM_SCALES[_loc3_] > param1 + 0.001) {
                    return Number(RoomDesktop.ROOM_ZOOM_SCALES[_loc3_]);
                }
                _loc3_++;
            }
            return Number(RoomDesktop.ROOM_ZOOM_SCALES[RoomDesktop.ROOM_ZOOM_SCALES.length - 1]);
        }
        if (param1 <= RoomDesktop.ROOM_ZOOM_SCALES[0] + 0.001) {
            return param1;
        }
        _loc3_ = RoomDesktop.ROOM_ZOOM_SCALES.length - 1;
        while (_loc3_ >= 0) {
            if (RoomDesktop.ROOM_ZOOM_SCALES[_loc3_] < param1 - 0.001) {
                return Number(RoomDesktop.ROOM_ZOOM_SCALES[_loc3_]);
            }
            _loc3_--;
        }
        return Number(RoomDesktop.ROOM_ZOOM_SCALES[0]);
    }

    private canUseAnimatedRoomZoom(): boolean {
        return this._SafeStr_2171 != null && this._roomEngine != null && (this._roomEngine instanceof Component ? this._roomEngine : null) != null && (this._roomEngine instanceof Component ? this._roomEngine : null).getBoolean("zoom.enabled");
    }

    private getCurrentControllableRoomCanvasScale(): number {
        if (!this.canUseAnimatedRoomZoom()) {
            return NaN;
        }
        return !isNaN(this._SafeStr_14714) ? this._SafeStr_14714 : this._roomEngine.getRoomCanvasScale(this._SafeStr_2171.roomId, this.getFirstCanvasId());
    }

    private clampRoomCanvasZoomScale(param1: number): number {
        return Math.max(Number(RoomDesktop.ROOM_ZOOM_SCALES[0]), Math.min(Number(RoomDesktop.ROOM_ZOOM_SCALES[RoomDesktop.ROOM_ZOOM_SCALES.length - 1]), param1));
    }

    private getNearestZoomScale(param1: number): number {
        let _loc4_: number = NaN;
        let _loc5_: number = Number(RoomDesktop.ROOM_ZOOM_SCALES[0]);
        let _loc2_: number = Math.abs(param1 - _loc5_);
        for (const _loc3_ of RoomDesktop.ROOM_ZOOM_SCALES ?? []) {
            _loc4_ = Math.abs(param1 - _loc3_);
            if (_loc4_ < _loc2_) {
                _loc5_ = Number(_loc3_);
                _loc2_ = _loc4_;
            }
        }
        return _loc5_;
    }

    private getZoomAnimationStep(param1: number, param2: number, param3: number): number {
        let _loc4_: number = Math.abs(param2 - param1);
        let _loc5_: number = param3 > 0 ? Math.min(param3, 50) : 16.666666666666668;
        return Math.min(_loc4_, 0.14 * _loc5_ / 16.666666666666668);
    }

    private scaleToZoomAnimationValue(param1: number): number {
        return Math.log(param1) / 0.6931471805599453;
    }

    private zoomLevelToScale(param1: number): number {
        return Math.pow(2, param1);
    }

    private getWindowName(param1: number): string {
        return "Room_Engine_Window_" + param1;
    }

    private createFilter(param1: number, param2: number): any[] {
        let _loc3_: BlurFilter = new BlurFilter(2, 2);
        return [];
    }

    private getBitmapFilter(param1: number, param2: number): BitmapFilter {
        let _loc9_: BitmapData = new BitmapData(param1, param2);
        _loc9_.perlinNoise(param1, param2, 5, Math.random() * 2000000000 | 0, true, false);
        let _loc6_: Point = new Point(0, 0);
        let _loc12_: number = 0;
        let _loc11_: number = _loc12_ = 1;
        let _loc3_: number = param1 / 20;
        let _loc5_: number = -param1 / 25;
        let _loc4_: string = "color";
        let _loc8_: number = 0;
        let _loc10_: number = 0;
        return new DisplacementMapFilter(_loc9_, _loc6_, _loc12_, _loc11_, _loc3_, _loc5_, _loc4_, _loc8_, _loc10_);
    }

    private checkInterrupts(): boolean {
        if (this._roomSessionManager != null && this._SafeStr_2171 != null && this._SafeStr_5248) {
            this._roomSessionManager.startSession(this._SafeStr_2171);
            this.processEvent(new RoomWidgetLoadingBarUpdateEvent("RWLBUW_HIDE_LOADING_BAR"));
            return true;
        }
        return false;
    }

    private handleRoomAdClick(param1: RoomEngineObjectEvent): void {
        if (param1 == null) {
            return;
        }
        let _loc4_: IRoomObject = this._roomEngine.getRoomObject(param1.roomId, param1.objectId, param1.category);
        if (_loc4_ == null) {
            return;
        }
        let _loc3_: IRoomObjectModel = asGuarded(_loc4_.getModel(), isIRoomObjectModel);
        let _loc2_: string = _loc3_.getString("furniture_ad_url");
        if (_loc2_ == null || _loc2_.indexOf("http") != 0) {
            return;
        }
        switch (param1.type) {
            case "RERAE_FURNI_CLICK":
                if (this._SafeStr_2171.roomControllerLevel >= 1 || this._sessionDataManager.isAnyRoomController) {
                    return;
                }
                HabboWebTools.openWebPage(_loc2_);
                break;
            case "RERAE_FURNI_DOUBLE_CLICK":
                if (Number(!this._SafeStr_2171.roomControllerLevel) >= 1 && !this._sessionDataManager.isAnyRoomController) {
                    return;
                }
                HabboWebTools.openWebPage(_loc2_);
        }
    }

    private handleRoomAdTooltip(param1: RoomEngineObjectEvent): void {
        let _loc3_: IRoomObject = null;
        let _loc4_: string = null;
        let _loc5_: IRoomObjectModel = null;
        let _loc2_: string = null;
        if (param1 == null) {
            return;
        }
        switch (param1.type) {
            case "RERAE_TOOLTIP_SHOW":
                if (this._SafeStr_2479 != null) {
                    return;
                }
                _loc3_ = this._roomEngine.getRoomObject(param1.roomId, param1.objectId, param1.category);
                if (_loc3_ == null) {
                    return;
                }
                _loc4_ = this._localization.getLocalization(_loc3_.getType() + ".tooltip", "${ads.roomad.tooltip}");
                if (_loc4_ == null) {
                    _loc5_ = asGuarded(_loc3_.getModel(), isIRoomObjectModel);
                    _loc2_ = _loc5_.getString("furniture_ad_url");
                    if (_loc2_ != null && _loc2_.indexOf("http") == 0) {
                        _loc4_ = _loc2_;
                    }
                }
                if (_loc4_ == null) {
                    return;
                }
                this._SafeStr_2479 = asGuarded(this._windowManager.createWindow("room_ad_tooltip", _loc4_, 8, 0, 32), isIToolTipWindow);
                this._SafeStr_2479.setParamFlag(1, false);
                this._SafeStr_2479.visible = true;
                this._SafeStr_2479.center();
                break;
            case "RERAE_TOOLTIP_HIDE":
                if (this._SafeStr_2479 == null) {
                    return;
                }
                this._SafeStr_2479.dispose();
                this._SafeStr_2479 = null;
        }
    }

    private getSpectatorModeVisualization(): IWindow {
        let _loc2_: XmlAsset = asInstanceOf(this._assets.getAssetByName("spectator_mode_xml"), XmlAsset);
        if (_loc2_ == null) {
            return null;
        }
        let _loc1_: IWindowContainer = asGuarded(this._windowManager.buildFromXML(asInstanceOf(_loc2_.content, XML)), isIWindowContainer);
        if (_loc1_ == null) {
            return null;
        }
        this.setBitmap(_loc1_.findChildByName("top_left"), "spec_top_left_png");
        this.setBitmap(_loc1_.findChildByName("top_middle"), "spec_top_middle_png");
        this.setBitmap(_loc1_.findChildByName("top_right"), "spec_top_right_png");
        this.setBitmap(_loc1_.findChildByName("middle_left"), "spec_middle_left_png");
        this.setBitmap(_loc1_.findChildByName("middle_right"), "spec_middle_right_png");
        this.setBitmap(_loc1_.findChildByName("bottom_left"), "spec_bottom_left_png");
        this.setBitmap(_loc1_.findChildByName("bottom_middle"), "spec_bottom_middle_png");
        this.setBitmap(_loc1_.findChildByName("bottom_right"), "spec_bottom_right_png");
        return _loc1_;
    }

    private setBitmap(param1: IWindow, param2: string): void {
        let _loc4_: IBitmapWrapperWindow = isIBitmapWrapperWindow(param1) ? param1 : null;
        if (_loc4_ == null || this._assets == null) {
            return;
        }
        let _loc5_: BitmapDataAsset = asInstanceOf(this._assets.getAssetByName(param2), BitmapDataAsset);
        if (_loc5_ == null) {
            return;
        }
        let _loc3_: BitmapData = asInstanceOf(_loc5_.content, BitmapData);
        if (_loc3_ == null) {
            return;
        }
        _loc4_.bitmap = _loc3_.clone();
    }

    public getWidgetState(param1: string): number {
        let _loc2_: IRoomWidget = this._SafeStr_2139[param1];
        if (_loc2_ == null) {
            Logger.log("Requested the state of an unknown widget " + param1);
            return -1;
        }
        return _loc2_.state;
    }

    public addUpdateListener(param1: IRoomWidgetHandler): void {
        if (this._updateListeners == null) {
            this._updateListeners = [];
        }
        if (this._updateListeners.indexOf(param1) == -1) {
            this._updateListeners.push(param1);
        }
    }

    public removeUpdateListener(param1: IRoomWidgetHandler): void {
        if (this._updateListeners == null) {
            return;
        }
        let _loc2_: number = this._updateListeners.indexOf(param1);
        if (_loc2_ != -1) {
            this._updateListeners.splice(_loc2_, 1);
        }
    }

    public isOwnerOfFurniture(param1: IRoomObject): boolean {
        let _loc4_: number = this.sessionDataManager.userId;
        let _loc3_: IRoomObjectModel = param1.getModel();
        if (_loc3_ == null) {
            return false;
        }
        let _loc2_: number = _loc3_.getNumber("furniture_owner_id");
        return _loc2_ == _loc4_;
    }

    public getFurnitureOwnerId(param1: IRoomObject): number {
        let _loc2_: number = NaN;
        let _loc3_: IRoomObjectModel = param1.getModel();
        if (_loc3_ != null) {
            _loc2_ = _loc3_.getNumber("furniture_owner_id");
            if (!isNaN(_loc2_)) {
                return _loc2_ | 0;
            }
        }
        return -1;
    }

    public isOwnerOfPet(param1: IUserData): boolean {
        if (param1 == null) {
            return false;
        }
        let _loc2_: number = this.sessionDataManager.userId;
        return _loc2_ == param1.ownerId;
    }

    public showGamePlayerName(param1: number, param2: string, param3: number, param4: number): void {
        let _loc5_: AvatarInfoWidget = asInstanceOf(this._SafeStr_2139["RWE_AVATAR_INFO"], AvatarInfoWidget);
        if (!_loc5_) {
            return;
        }
        _loc5_.showGamePlayerName(param1, param2, param3, param4);
    }

    public get layoutManager(): DesktopLayoutManager {
        return this._layoutManager;
    }

    public mouseEventPositionHasInputEventWindow(param1: MouseEvent, param2: number): boolean {
        let _loc3_: any[] = new Array(0);
        let _loc4_: Point = new Point(param1.stageX, param1.stageY);
        this._windowManager.getDesktop(param2 >>> 0).groupParameterFilteredChildrenUnderPoint(_loc4_, _loc3_, 1);
        return _loc3_.length > 1;
    }
}
