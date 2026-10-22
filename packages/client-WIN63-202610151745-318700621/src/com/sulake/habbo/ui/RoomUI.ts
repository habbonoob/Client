import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IDisplayObjectWrapper } from '@/com/sulake/core/window/components/IDisplayObjectWrapper';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { AdEvent } from '@/com/sulake/habbo/advertisement/events/AdEvent';
import type { InterstitialEvent } from '@/com/sulake/habbo/advertisement/events/InterstitialEvent';
import type { IAdManager } from '@/com/sulake/habbo/advertisement/IAdManager';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboAvatarEditor } from '@/com/sulake/habbo/avatar/IHabboAvatarEditor';
import type { _SafeCls_6080 } from '@/com/sulake/habbo/catalog/habbicons/_SafeCls_6080';
import type { HabbiconControllerEvent } from '@/com/sulake/habbo/catalog/habbicons/HabbiconControllerEvent';
import type { IHabboCatalog } from '@/com/sulake/habbo/catalog/IHabboCatalog';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IChatStyleLibrary } from '@/com/sulake/habbo/freeflowchat/style/IChatStyleLibrary';
import type { IHabboFriendBar } from '@/com/sulake/habbo/friendbar/IHabboFriendBar';
import type { IHabboLandingView } from '@/com/sulake/habbo/friendbar/IHabboLandingView';
import type { IHabboFriendBarView } from '@/com/sulake/habbo/friendbar/view/IHabboFriendBarView';
import type { IHabboFriendList } from '@/com/sulake/habbo/friendlist/IHabboFriendList';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IHabboGroupsManager } from '@/com/sulake/habbo/groups/IHabboGroupsManager';
import type { IHabboHelp } from '@/com/sulake/habbo/help/IHabboHelp';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboMessenger } from '@/com/sulake/habbo/messenger/IHabboMessenger';
import type { IHabboModeration } from '@/com/sulake/habbo/moderation/IHabboModeration';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IHabboNewNavigator } from '@/com/sulake/habbo/navigator/IHabboNewNavigator';
import type { IHabboQuestEngine } from '@/com/sulake/habbo/quest/IHabboQuestEngine';
import type { RoomEngineEvent } from '@/com/sulake/habbo/room/events/RoomEngineEvent';
import type { RoomEngineFurnitureLabelEvent } from '@/com/sulake/habbo/room/events/RoomEngineFurnitureLabelEvent';
import type { RoomEngineObjectEvent } from '@/com/sulake/habbo/room/events/RoomEngineObjectEvent';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/IHabboUserDefinedRoomEvents';
import type { _SafeCls_6112 } from '@/com/sulake/habbo/roomevents/wired_menu/_SafeCls_6112';
import type { RoomSessionEvent } from '@/com/sulake/habbo/session/events/RoomSessionEvent';
import type { SessionDataEvent } from '@/com/sulake/habbo/session/events/SessionDataEvent';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IHabboSoundManager } from '@/com/sulake/habbo/sound/IHabboSoundManager';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IHabboTracking } from '@/com/sulake/habbo/tracking/IHabboTracking';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetFactory } from '@/com/sulake/habbo/ui/IRoomWidgetFactory';
import type { IRoomWidget } from '@/com/sulake/habbo/ui/widget/IRoomWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { PerkAllowancesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/perk/PerkAllowancesMessageEvent';
import { InterstitialShownMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/advertisement/InterstitialShownMessageComposer';
import { FriendBarResizeEvent } from '@/com/sulake/habbo/friendbar/events/FriendBarResizeEvent';
import { RoomEngineHSLColorEnableEvent } from '@/com/sulake/habbo/room/events/RoomEngineHSLColorEnableEvent';
import { RoomEngineRoomColorEvent } from '@/com/sulake/habbo/room/events/RoomEngineRoomColorEvent';
import { RoomEngineZoomEvent } from '@/com/sulake/habbo/room/events/RoomEngineZoomEvent';
import { IRoomUI } from '@/com/sulake/habbo/ui/IRoomUI';
import { RoomDesktop } from '@/com/sulake/habbo/ui/RoomDesktop';
import { AvatarExpressionEnum } from '@/com/sulake/habbo/ui/widget/enums/AvatarExpressionEnum';
import { HideRoomWidgetEvent } from '@/com/sulake/habbo/ui/widget/events/HideRoomWidgetEvent';
import { RoomDesktopMouseZoomEnableEvent } from '@/com/sulake/habbo/ui/widget/events/RoomDesktopMouseZoomEnableEvent';
import { RoomWidgetFactory } from '@/com/sulake/habbo/ui/widget/RoomWidgetFactory';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabbiconController } from '@/com/sulake/iid/IIDHabbiconController';
import { IIDHabboAdManager } from '@/com/sulake/iid/IIDHabboAdManager';
import { IIDHabboAvatarEditor } from '@/com/sulake/iid/IIDHabboAvatarEditor';
import { IIDHabboCatalog } from '@/com/sulake/iid/IIDHabboCatalog';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboFreeFlowChat } from '@/com/sulake/iid/IIDHabboFreeFlowChat';
import { IIDHabboFriendBar } from '@/com/sulake/iid/IIDHabboFriendBar';
import { IIDHabboFriendBarView } from '@/com/sulake/iid/IIDHabboFriendBarView';
import { IIDHabboFriendList } from '@/com/sulake/iid/IIDHabboFriendList';
import { IIDHabboGameManager } from '@/com/sulake/iid/IIDHabboGameManager';
import { IIDHabboGroupsManager } from '@/com/sulake/iid/IIDHabboGroupsManager';
import { IIDHabboHelp } from '@/com/sulake/iid/IIDHabboHelp';
import { IIDHabboInventory } from '@/com/sulake/iid/IIDHabboInventory';
import { IIDHabboLandingView } from '@/com/sulake/iid/IIDHabboLandingView';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboMessenger } from '@/com/sulake/iid/IIDHabboMessenger';
import { IIDHabboModeration } from '@/com/sulake/iid/IIDHabboModeration';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboNewNavigator } from '@/com/sulake/iid/IIDHabboNewNavigator';
import { IIDHabboQuestEngine } from '@/com/sulake/iid/IIDHabboQuestEngine';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboSoundManager } from '@/com/sulake/iid/IIDHabboSoundManager';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboTracking } from '@/com/sulake/iid/IIDHabboTracking';
import { IIDHabboUserDefinedRoomEvents } from '@/com/sulake/iid/IIDHabboUserDefinedRoomEvents';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';
import { IIDWiredMenuController } from '@/com/sulake/iid/IIDWiredMenuController';
import { RoomId } from '@/com/sulake/room/utils/RoomId';

export class RoomUI extends Component implements IRoomUI, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.ui::RoomUI'); }

    private static _reuseRoomDesktopWidgetTypes: any[] = ["RWE_INFOSTAND", "RWE_CHAT_INPUT_WIDGET", "RWE_ME_MENU", "RWE_EXTERNAL_IMAGE", "RWE_CAMERA", "RWE_ROOM_TOOLS", "RWE_FURNITURE_CONTEXT_MENU"];

    declare private _windowManager: IHabboWindowManager;

    declare private _roomEngine: IRoomEngine;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _roomWidgetFactory: IRoomWidgetFactory;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _friendList: IHabboFriendList;

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _inventory: IHabboInventory;

    declare private _toolbar: IHabboToolbar;

    declare private _navigator: IHabboNavigator;

    declare private _newNavigator: IHabboNewNavigator;

    declare private _habboGroupsManager: IHabboGroupsManager;

    declare private _avatarEditor: IHabboAvatarEditor;

    declare private _catalog: IHabboCatalog;

    declare private _adManager: IAdManager;

    declare private _localization: IHabboLocalizationManager;

    declare private _habboHelp: IHabboHelp;

    declare private _messenger: IHabboMessenger;

    declare private _moderation: IHabboModeration;

    declare private _soundManager: IHabboSoundManager;

    declare private _gameManager: IHabboGameManager;

    declare private _friendBar: IHabboFriendBar;

    declare private _friendBarView: IHabboFriendBarView;

    declare private _landingView: IHabboLandingView;

    declare private _questEngine: IHabboQuestEngine;

    declare private _freeFlowChat: IHabboFreeFlowChat;

    declare private _communication: IHabboCommunicationManager;

    declare private _habbiconController: _SafeCls_6080;

    declare private _desktop: RoomDesktop;

    declare private _SafeStr_3319: Map<any, any>;

    declare private _SafeStr_6441: number;

    declare private _SafeStr_2579: boolean;

    declare private _SafeStr_5684: number;

    declare private _habboTracking: IHabboTracking;

    declare private _userDefinedRoomEvents: IHabboUserDefinedRoomEvents;

    declare private _wiredMenu: _SafeCls_6112;

    declare private _SafeStr_5117: boolean;

    declare private _isInRoom: boolean;

    declare private _perkAllowancesMessageEvent: IMessageEvent;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this._roomWidgetFactory = new RoomWidgetFactory(this);
        this._SafeStr_3319 = new Dictionary();
        this.registerUpdateReceiver(this, 0);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, true, [{ "type": "REE_ENGINE_INITIALIZED", "callback": this.roomEngineEventHandler }, { "type": "REE_INITIALIZED", "callback": this.roomEventHandler }, { "type": "REE_OBJECTS_INITIALIZED", "callback": this.roomEngineEventHandler }, { "type": "REE_DISPOSED", "callback": this.roomEventHandler }, { "type": "REE_NORMAL_MODE", "callback": this.roomEngineEventHandler }, { "type": "REE_GAME_MODE", "callback": this.roomEngineEventHandler }, { "type": "REE_ENTRANCE_AFTER_SPECTATE", "callback": this.roomEventHandler }, { "type": "REDSE_ROOM_COLOR", "callback": this.roomEventHandler }, { "type": "REE_ROOM_COLOR", "callback": this.roomEventHandler }, { "type": "REE_ROOM_ZOOM", "callback": this.roomEventHandler }, { "type": "ROHSLCEE_ROOM_BACKGROUND_COLOR", "callback": this.roomEventHandler }, { "type": "REOE_SELECTED", "callback": this.roomObjectEventHandler }, { "type": "REOE_DESELECTED", "callback": this.roomObjectEventHandler }, { "type": "REOE_ADDED", "callback": this.roomObjectEventHandler }, { "type": "REOE_REMOVED", "callback": this.roomObjectEventHandler }, { "type": "REOE_PLACED", "callback": this.roomObjectEventHandler }, { "type": "REOE_REQUEST_MOVE", "callback": this.roomObjectEventHandler }, { "type": "REOE_REQUEST_ROTATE", "callback": this.roomObjectEventHandler }, { "type": "REOE_REQUEST_PICKUP", "callback": this.roomObjectEventHandler }, { "type": "REOE_MOUSE_ENTER", "callback": this.roomObjectEventHandler }, { "type": "REOE_MOUSE_LEAVE", "callback": this.roomObjectEventHandler }, { "type": "REFLE_FURNITURE_LABEL_UPDATED", "callback": this.furnitureLabelEventHandler }, { "type": "RETWE_OPEN_WIDGET", "callback": this.roomObjectEventHandler }, { "type": "RETWE_CLOSE_WIDGET", "callback": this.roomObjectEventHandler }, { "type": "RETWE_OPEN_FURNI_CONTEXT_MENU", "callback": this.roomObjectEventHandler }, { "type": "RETWE_CLOSE_FURNI_CONTEXT_MENU", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_CREDITFURNI", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_STICKIE", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_PRESENT", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_TROPHY", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_TEASER", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_ECOTRONBOX", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_PLACEHOLDER", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_DIMMER", "callback": this.roomObjectEventHandler }, { "type": "RERAE_FURNI_CLICK", "callback": this.roomObjectEventHandler }, { "type": "RERAE_FURNI_DOUBLE_CLICK", "callback": this.roomObjectEventHandler }, { "type": "RERAE_TOOLTIP_SHOW", "callback": this.roomObjectEventHandler }, { "type": "RERAE_TOOLTIP_HIDE", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REMOVE_DIMMER", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_CLOTHING_CHANGE", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_PLAYLIST_EDITOR", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_MANNEQUIN", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_BACKGROUND_COLOR", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_AREA_HIDE", "callback": this.roomObjectEventHandler }, { "type": "RETWE_UPDATE_STATE_AREA_HIDE", "callback": this.roomObjectEventHandler }, { "type": "ROSM_USE_PRODUCT_FROM_INVENTORY", "callback": this.roomObjectEventHandler }, { "type": "ROSM_USE_PRODUCT_FROM_ROOM", "callback": this.roomObjectEventHandler }, { "type": "ROSM_JUKEBOX_DISPOSE", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_ENGRAVING", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_BADGE_DISPLAY_ENGRAVING", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_ACHIEVEMENT_RESOLUTION_FAILED", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_FRIEND_FURNITURE_ENGRAVING", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_HIGH_SCORE_DISPLAY", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_HIDE_HIGH_SCORE_DISPLAY", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_INTERNAL_LINK", "callback": this.roomObjectEventHandler }, { "type": "RETWE_REQUEST_ROOM_LINK", "callback": this.roomObjectEventHandler }]), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }, true, [{ "type": "RSE_CREATED", "callback": this.roomSessionStateEventHandler }, { "type": "RSE_STARTED", "callback": this.roomSessionStateEventHandler }, { "type": "RSE_ENDED", "callback": this.roomSessionStateEventHandler }, { "type": "RSE_ROOM_DATA", "callback": this.roomSessionStateEventHandler }, { "type": "RSCE_CHAT_EVENT", "callback": this.roomSessionEventHandler }, { "type": "RSCE_FLOOD_EVENT", "callback": this.roomSessionEventHandler }, { "type": "RSUBE_BADGES", "callback": this.roomSessionEventHandler }, { "type": "RSDE_DOORBELL", "callback": this.roomSessionEventHandler }, { "type": "RSDE_REJECTED", "callback": this.roomSessionEventHandler }, { "type": "RSDE_ACCEPTED", "callback": this.roomSessionEventHandler }, { "type": "RSPE_PRESENT_OPENED", "callback": this.roomSessionEventHandler }, { "type": "RSOPPE_OPEN_PET_PACKAGE_REQUESTED", "callback": this.roomSessionEventHandler }, { "type": "RSOPPE_OPEN_PET_PACKAGE_RESULT", "callback": this.roomSessionEventHandler }, { "type": "RSEME_KICKED", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_PETS_FORBIDDEN_IN_HOTEL", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_PETS_FORBIDDEN_IN_FLAT", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_MAX_PETS", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_MAX_NUMBER_OF_OWN_PETS", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_NO_FREE_TILES_FOR_PET", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_SELECTED_TILE_NOT_FREE_FOR_PET", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_BOTS_FORBIDDEN_IN_HOTEL", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_BOTS_FORBIDDEN_IN_FLAT", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_BOT_LIMIT_REACHED", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_SELECTED_TILE_NOT_FREE_FOR_BOT", "callback": this.roomSessionDialogEventHandler }, { "type": "RSEME_BOT_NAME_NOT_ACCEPTED", "callback": this.roomSessionDialogEventHandler }, { "type": "RSQE_QUEUE_STATUS", "callback": this.roomSessionEventHandler }, { "type": "RSPE_POLL_CONTENT", "callback": this.roomSessionEventHandler }, { "type": "RSPE_POLL_ERROR", "callback": this.roomSessionEventHandler }, { "type": "RSPE_POLL_OFFER", "callback": this.roomSessionEventHandler }, { "type": "RWPUW_QUESTION_ANSWERED", "callback": this.roomSessionEventHandler }, { "type": "RWPUW_QUESION_FINSIHED", "callback": this.roomSessionEventHandler }, { "type": "RWPUW_NEW_QUESTION", "callback": this.roomSessionEventHandler }, { "type": "RSDPE_PRESETS", "callback": this.roomSessionEventHandler }, { "type": "RSFRE_FRIEND_REQUEST", "callback": this.roomSessionEventHandler }, { "type": "rsudue_user_data_updated", "callback": this.roomSessionEventHandler }, { "type": "RSDE_DANCE", "callback": this.roomSessionEventHandler }]), new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }, true, [{ "type": "SDTWE_PURCHASABLE_STYLES_UPDATED", "callback": this.sessionDataEventHandler }]), new ComponentDependency(new IIDHabboFriendList(), (param1: IHabboFriendList): void => {
             this._friendList = param1;
         }), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }), new ComponentDependency(new IIDHabboInventory(), (param1: IHabboInventory): void => {
             this._inventory = param1;
         }), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }), new ComponentDependency(new IIDHabboNewNavigator(), (param1: IHabboNewNavigator): void => {
             this._newNavigator = param1;
         }), new ComponentDependency(new IIDHabboGroupsManager(), (param1: IHabboGroupsManager): void => {
             this._habboGroupsManager = param1;
         }), new ComponentDependency(new IIDHabboAvatarEditor(), (param1: IHabboAvatarEditor): void => {
             this._avatarEditor = param1;
         }), new ComponentDependency(new IIDHabboCatalog(), (param1: IHabboCatalog): void => {
             this._catalog = param1;
         }), new ComponentDependency(new IIDHabbiconController(), (param1: _SafeCls_6080): void => {
             if (this._habbiconController != null) {
                 this._habbiconController.removeEventListener("hce_room_use_habbicon", this.onRoomUseHabbicon);
             }
             this._habbiconController = param1;
             if (this._habbiconController != null && this.getBoolean("habbicons.enabled")) {
                 this._habbiconController.addEventListener("hce_room_use_habbicon", this.onRoomUseHabbicon);
             }
         }), new ComponentDependency(new IIDHabboAdManager(), (param1: IAdManager): void => {
             this._adManager = param1;
         }, true, [{ "type": "AE_INTERSTITIAL_NOT_SHOWN", "callback": this.interstitialNotAvailableEventHandler }, { "type": "AE_INTERSTITIAL_COMPLETE", "callback": this.interstitialCompleteEventHandler }, { "type": "AE_INTERSTITIAL_SHOW", "callback": this.interstitialShowEventHandler }, { "type": "AE_ROOM_AD_SHOW", "callback": this.adEventHandler }]), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localization = param1;
         }), new ComponentDependency(new IIDHabboHelp(), (param1: IHabboHelp): void => {
             this._habboHelp = param1;
         }), new ComponentDependency(new IIDHabboModeration(), (param1: IHabboModeration): void => {
             this._moderation = param1;
         }), new ComponentDependency(new IIDHabboSoundManager(), (param1: IHabboSoundManager): void => {
             this._soundManager = param1;
         }), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboUserDefinedRoomEvents(), (param1: IHabboUserDefinedRoomEvents): void => {
             this._userDefinedRoomEvents = param1;
         }), new ComponentDependency(new IIDWiredMenuController(), (param1: _SafeCls_6112): void => {
             this._wiredMenu = param1;
             if (this._desktop != null) {
                 this._desktop.wiredMenu = param1;
             }
         }), new ComponentDependency(new IIDHabboTracking(), (param1: IHabboTracking): void => {
             this._habboTracking = param1;
         }), new ComponentDependency(new IIDHabboGameManager(), (param1: IHabboGameManager): void => {
             this._gameManager = param1;
         }, true, [{ "type": "gce_game_chat", "callback": this.gameEventHandler }]), new ComponentDependency(new IIDHabboFriendBar(), (param1: IHabboFriendBar): void => {
             this._friendBar = param1;
         }), new ComponentDependency(new IIDHabboFriendBarView(), (param1: IHabboFriendBarView): void => {
             this._friendBarView = param1;
         }, true, [{ "type": "FBE_BAR_RESIZE_EVENT", "callback": this.bottomBarResizeHandler }]), new ComponentDependency(new IIDHabboLandingView(), (param1: IHabboLandingView): void => {
             this._landingView = param1;
         }), new ComponentDependency(new IIDHabboQuestEngine(), (param1: IHabboQuestEngine): void => {
             this._questEngine = param1;
         }), new ComponentDependency(new IIDHabboMessenger(), (param1: IHabboMessenger): void => {
             this._messenger = param1;
         }), new ComponentDependency(new IIDHabboFreeFlowChat(), (param1: IHabboFreeFlowChat): void => {
             this._freeFlowChat = param1;
         })]);
    }

    protected override initComponent(): void {
        this._perkAllowancesMessageEvent = this._communication.addHabboConnectionMessageEvent(new PerkAllowancesMessageEvent(this.onPerkAllowances));
    }

    public override dispose(): void {
        let _loc1_: IRoomWidget = null;
        if (this.disposed) {
            return;
        }
        if (this._roomWidgetFactory != null) {
            this._roomWidgetFactory.dispose();
            this._roomWidgetFactory = null;
        }
        if (this._communication != null) {
            this._communication.removeHabboConnectionMessageEvent(this._perkAllowancesMessageEvent);
            this._perkAllowancesMessageEvent = null;
        }
        if (this._habbiconController != null) {
            this._habbiconController.removeEventListener("hce_room_use_habbicon", this.onRoomUseHabbicon);
            this._habbiconController = null;
        }
        this.disposeDesktop();
        if (this._SafeStr_3319 != null) {
            for (const _loc2_ of this._SafeStr_3319?.keys() ?? []) {
                _loc1_ = this._SafeStr_3319.get(_loc2_);
                _loc1_.dispose();
            }
            this._SafeStr_3319 = null;
        }
        this.removeUpdateReceiver(this);
        super.dispose();
    }

    private roomSessionStateEventHandler(param1: RoomSessionEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        switch (param1.type) {
            case "RSE_CREATED":
                this.createDesktop(param1.session);
                if (param1.session.isGameSession) {
                    if (this._toolbar) {
                        this._toolbar.setToolbarState("HTE_STATE_HIDDEN");
                    }
                    if (this._friendBar) {
                        this._friendBar.visible = false;
                    }
                    if (this._landingView) {
                        this._landingView.disable();
                    }
                }
                break;
            case "RSE_STARTED":
                if (this._toolbar) {
                    this.defineToolbarState(param1.session);
                }
                if (this._landingView) {
                    this._landingView.disable();
                }
                break;
            case "RSE_ROOM_DATA":
                this.defineToolbarState(param1.session);
                break;
            case "RSE_ENDED":
                if (param1.session != null) {
                    this.disposeDesktop();
                    if (param1.session.isGameSession) {
                        this._friendBar.visible = true;
                        if (this._gameManager) {
                            this._gameManager.onSnowWarArenaSessionEnded();
                        }
                    } else if (param1.openLandingPage) {
                        if (this.getBoolean("nux.lobbies.enabled") && this._sessionDataManager.isRealNoob) {
                            if (this._navigator.enteredGuestRoomData && this._navigator.enteredGuestRoomData.doorMode == 4) {
                                this._navigator.goToHomeRoom();
                            } else {
                                this.context.createLinkEvent("navigator/goto/predefined_noob_lobby");
                            }
                        } else if (this._landingView) {
                            this._landingView.activate();
                        }
                    }
                }
        }
    }

    private defineToolbarState(param1: IRoomSession): void {
        if (this.getBoolean("nux.lobbies.enabled") && this._sessionDataManager.isRealNoob) {
            if (param1 && param1.isNoobRoom) {
                this._toolbar.setToolbarState("HTE_STATE_NOOB_NOT_HOME");
            } else {
                this._toolbar.setToolbarState("HETE_STATE_NOOB_HOME");
            }
        } else {
            this._toolbar.setToolbarState("HTE_STATE_ROOM_VIEW");
        }
    }

    private roomSessionEventHandler(param1: RoomSessionEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        if (param1.session != null) {
            if (this._desktop != null) {
                this._desktop.processEvent(param1);
            }
        }
    }

    private sessionDataEventHandler(param1: SessionDataEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        if (this.desktop != null) {
            this.desktop.processEvent(param1);
        }
    }

    private roomSessionDialogEventHandler(param1: RoomSessionEvent): void {
        let errorMessage: string;
        let event: RoomSessionEvent = param1;
        let errorTitle: string = "${error.title}";
        switch (event.type) {
            case "RSEME_MAX_PETS":
                errorMessage = "${room.error.max_pets}";
                break;
            case "RSEME_MAX_NUMBER_OF_OWN_PETS":
                errorMessage = "${room.error.max_own_pets}";
                break;
            case "RSEME_KICKED":
                errorMessage = "${room.error.kicked}";
                errorTitle = "${generic.alert.title}";
                break;
            case "RSEME_PETS_FORBIDDEN_IN_HOTEL":
                errorMessage = "${room.error.pets.forbidden_in_hotel}";
                break;
            case "RSEME_PETS_FORBIDDEN_IN_FLAT":
                errorMessage = "${room.error.pets.forbidden_in_flat}";
                break;
            case "RSEME_NO_FREE_TILES_FOR_PET":
                errorMessage = "${room.error.pets.no_free_tiles}";
                break;
            case "RSEME_SELECTED_TILE_NOT_FREE_FOR_PET":
                errorMessage = "${room.error.pets.selected_tile_not_free}";
                break;
            case "RSEME_BOTS_FORBIDDEN_IN_HOTEL":
                errorMessage = "${room.error.bots.forbidden_in_hotel}";
                break;
            case "RSEME_BOTS_FORBIDDEN_IN_FLAT":
                errorMessage = "${room.error.bots.forbidden_in_flat}";
                break;
            case "RSEME_BOT_LIMIT_REACHED":
                errorMessage = "${room.error.max_bots}";
                break;
            case "RSEME_SELECTED_TILE_NOT_FREE_FOR_BOT":
                errorMessage = "${room.error.bots.selected_tile_not_free}";
                break;
            case "RSEME_BOT_NAME_NOT_ACCEPTED":
                errorMessage = "${room.error.bots.name.not.accepted}";
                break;
            default:
                return;
        }
        this._windowManager.alert(errorTitle, errorMessage, 0, (param1: IAlertDialog, param2: WindowEvent): void => {
             param1.dispose();
         });
    }

    private interstitialShowEventHandler(param1: InterstitialEvent): void {
        if (this._desktop != null) {
            this._desktop.processEvent(param1);
        }
        this._SafeStr_2579 = true;
    }

    public triggerbottomBarResize(): void {
        this.bottomBarResizeHandler(new FriendBarResizeEvent());
    }

    private bottomBarResizeHandler(param1: FriendBarResizeEvent): void {
        if (this._desktop != null) {
            this._desktop.processEvent(param1);
        }
    }

    private interstitialNotAvailableEventHandler(param1: InterstitialEvent): void {
        this._SafeStr_2579 = false;
    }

    private interstitialCompleteEventHandler(param1: InterstitialEvent): void {
        let _loc2_: IRoomSession = null;
        this._SafeStr_2579 = false;
        if (param1.status == "complete") {
            this._communication.connection.send(new InterstitialShownMessageComposer());
        }
        if (this._desktop != null) {
            this._desktop.processEvent(param1);
            _loc2_ = this._roomSessionManager.getSession(this._roomEngine.activeRoomId);
            if (_loc2_ != null) {
                _loc2_.sendChangePostureMessage(0);
            }
        }
    }

    private adEventHandler(param1: AdEvent): void {
        if (this._desktop != null) {
            this._desktop.processEvent(param1);
        }
    }

    private onPerkAllowances(param1: PerkAllowancesMessageEvent): void {
        let _loc2_: Timer = null;
        if (this._freeFlowChat && this._isInRoom && !this._SafeStr_5117) {
            _loc2_ = new Timer(250, 1);
            _loc2_.addEventListener("timerComplete", this.delayedAddToStageFreeFlowChat);
            _loc2_.start();
        }
        if (this._isInRoom) {
            if (this._desktop != null) {
                this._desktop.processEvent(new RoomDesktopMouseZoomEnableEvent(param1.getParser().isPerkAllowed("MOUSE_ZOOM")));
            }
        }
    }

    private delayedAddToStageFreeFlowChat(param1: TimerEvent): void {
        if (this._desktop && this._freeFlowChat.displayObject) {
            this._desktop.layoutManager.getChatContainer().setDisplayObject(this._freeFlowChat.displayObject);
            this._SafeStr_5117 = true;
        }
    }

    private roomEngineEventHandler(param1: RoomEngineEvent): void {
        let _loc2_: IRoomSession = null;
        if (param1.type == "REE_GAME_MODE" || param1.type == "REE_NORMAL_MODE") {
            if (this._desktop != null) {
                this._desktop.roomEngineEventHandler(param1);
            }
        }
        if (param1.roomId == this._SafeStr_5684) {
            if (param1.type == "REE_OBJECTS_INITIALIZED") {
                if (this._SafeStr_2579) {
                    _loc2_ = this._roomSessionManager.getSession(this._SafeStr_5684);
                    if (_loc2_ != null) {
                        _loc2_.sendAvatarExpressionMessage(AvatarExpressionEnum._SafeStr_4392.ordinal);
                    }
                }
                this._SafeStr_2579 = false;
            } else if (param1.type == "REE_DISPOSED") {
                this._SafeStr_2579 = false;
            }
        }
    }

    private roomEventHandler(param1: RoomEngineEvent): void {
        let _loc4_: IRoomSession = null;
        let _loc2_: number = 0;
        let _loc5_: RoomEngineRoomColorEvent = null;
        let _loc3_: RoomEngineZoomEvent = null;
        let _loc6_: number = NaN;
        let _loc7_: RoomEngineHSLColorEnableEvent = null;
        if (this._roomEngine == null) {
            return;
        }
        if (this._desktop == null) {
            if (this._roomSessionManager == null) {
                return;
            }
            _loc4_ = this._roomSessionManager.getSession(param1.roomId);
            if (_loc4_ != null) {
                this.createDesktop(_loc4_);
            }
        }
        if (this._desktop == null) {
            return;
        }
        switch (param1.type) {
            case "REE_INITIALIZED":
                _loc2_ = this.getActiveCanvasId(param1.roomId);
                this._desktop.createRoomView(_loc2_);
                if (this._roomEngine != null && !RoomId.isRoomPreviewerId(param1.roomId)) {
                    this._roomEngine.setActiveRoom(param1.roomId);
                    this._desktop.initCameraLocation(_loc2_);
                }
                if (this._freeFlowChat) {
                    this._SafeStr_5117 = true;
                    if (this._freeFlowChat.displayObject != null) {
                        this._desktop.layoutManager.getChatContainer().setDisplayObject(this._freeFlowChat.displayObject);
                    }
                }
                this.createDesktopWidget("RWE_INFOSTAND");
                this.createDesktopWidget("RWE_LOCATION_WIDGET");
                this.createDesktopWidget("RWE_ROOM_TOOLS");
                if (!this._desktop.session.isSpectatorMode) {
                    this.createDesktopWidget("RWE_ME_MENU");
                    this.createDesktopWidget("RWE_CHAT_INPUT_WIDGET");
                    this.createDesktopWidget("RWE_FRIEND_REQUEST");
                    if (this.getBoolean("avatar.widget.enabled")) {
                        this.createDesktopWidget("RWE_AVATAR_INFO");
                    }
                }
                this.createDesktopWidget("RWE_FURNI_PLACEHOLDER");
                this.createDesktopWidget("RWE_FURNI_CREDIT_WIDGET");
                this.createDesktopWidget("RWE_FURNI_STICKIE_WIDGET");
                this.createDesktopWidget("RWE_FURNI_PRESENT_WIDGET");
                this.createDesktopWidget("RWE_FURNI_TROPHY_WIDGET");
                this.createDesktopWidget("RWE_FURNI_ECOTRONBOX_WIDGET");
                this.createDesktopWidget("RWE_FURNITURE_LABEL");
                this.createDesktopWidget("RWE_FURNI_PET_PACKAGE_WIDGET");
                this.createDesktopWidget("RWE_DOORBELL");
                this.createDesktopWidget("RWE_ROOM_POLL");
                this.createDesktopWidget("RWE_ROOM_DIMMER");
                this.createDesktopWidget("RWE_CLOTHING_CHANGE");
                this.createDesktopWidget("RWE_CONVERSION_TRACKING");
                if (!this.getBoolean("memenu.effects.widget.disabled")) {
                    this.createDesktopWidget("RWE_EFFECTS");
                }
                this.createDesktopWidget("RWE_MANNEQUIN");
                this.createDesktopWidget("RWE_ROOM_BACKGROUND_COLOR");
                this.createDesktopWidget("RWE_AREA_HIDE");
                this.createDesktopWidget("RWE_CUSTOM_USER_NOTIFICATION");
                this.createDesktopWidget("RWE_FURNI_CHOOSER");
                this.createDesktopWidget("RWE_USER_CHOOSER", this._SafeStr_6441);
                this.createDesktopWidget("RWE_PLAYLIST_EDITOR_WIDGET");
                this.createDesktopWidget("RWE_SPAMWALL_POSTIT_WIDGET");
                this.createDesktopWidget("RWE_FURNITURE_CONTEXT_MENU");
                this.createDesktopWidget("RWE_CAMERA");
                this.createDesktopWidget("RWE_FURNI_ACHIEVEMENT_RESOLUTION_ENGRAVING");
                this.createDesktopWidget("RWE_FRIEND_FURNI_CONFIRM");
                this.createDesktopWidget("RWE_FRIEND_FURNI_ENGRAVING");
                this.createDesktopWidget("RWE_HIGH_SCORE_DISPLAY");
                this.createDesktopWidget("RWE_INTERNAL_LINK");
                this.createDesktopWidget("RWE_CUSTOM_STACK_HEIGHT");
                this.createDesktopWidget("RWE_YOUTUBE");
                this.createDesktopWidget("RWE_RENTABLESPACE");
                this.createDesktopWidget("RWE_VIMEO");
                this.createDesktopWidget("RWE_EXTERNAL_IMAGE");
                this.createDesktopWidget("RWE_UI_HELP_BUBBLE");
                this.createDesktopWidget("RWE_WORD_QUIZZ");
                this.createDesktopWidget("RWE_ROOM_THUMBNAIL_CAMERA");
                this.createDesktopWidget("RWE_ROOM_LINK");
                this.createDesktopWidget("RWE_CRAFTING");
                this._isInRoom = true;
                break;
            case "REE_ENTRANCE_AFTER_SPECTATE":
                this.desktop.enterAfterSpectate();
                this.desktop.disposeWidget("RWE_ROOM_QUEUE");
                this.desktop.createWidget("RWE_ME_MENU");
                this.desktop.createWidget("RWE_CHAT_INPUT_WIDGET");
                this.desktop.createWidget("RWE_FRIEND_REQUEST");
                if (this.getBoolean("avatar.widget.enabled")) {
                    this.desktop.createWidget("RWE_AVATAR_INFO");
                }
                break;
            case "REE_DISPOSED":
                this.disposeDesktop();
                this._isInRoom = false;
                break;
            case "REE_ROOM_COLOR":
                _loc5_ = param1 instanceof RoomEngineRoomColorEvent ? param1 : null;
                if (_loc5_ != null) {
                    if (_loc5_.bgOnly) {
                        this._desktop.setRoomViewColor(16777215, 255);
                    } else {
                        this._desktop.setRoomViewColor(_loc5_.color, _loc5_.brightness | 0);
                    }
                }
                break;
            case "REE_ROOM_ZOOM":
                _loc3_ = param1 instanceof RoomEngineZoomEvent ? param1 : null;
                if (_loc3_ != null) {
                    _loc6_ = Number(_loc3_.level < 1 ? 0.5 : 1 << Math.min(5, Math.floor(_loc3_.level)) - 1);
                    if (this._desktop != null && !_loc3_.isFlipForced) {
                        this._desktop.animateRoomCanvasScale(_loc6_);
                    } else {
                        this._roomEngine.setRoomCanvasScale(this._roomEngine.activeRoomId, this.getActiveCanvasId(this._roomEngine.activeRoomId), _loc6_, null, null, _loc3_.isFlipForced);
                    }
                }
                break;
            case "REDSE_ROOM_COLOR":
                this._desktop.processEvent(param1);
                break;
            case "ROHSLCEE_ROOM_BACKGROUND_COLOR":
                _loc7_ = castTo(param1, RoomEngineHSLColorEnableEvent);
                if (!_loc7_.enable) {
                    this._desktop.setRoomBackgroundColor(0, 0, 0);
                } else {
                    this._desktop.setRoomBackgroundColor(_loc7_.hue, _loc7_.saturation, _loc7_.lightness);
                }
        }
    }

    private createDesktopWidget(param1: string, param2: number = 0): void {
        if (this._desktop == null) {
            return;
        }
        let _loc5_: boolean = false;
        let _loc4_: IRoomWidget = null;
        if (RoomUI._reuseRoomDesktopWidgetTypes.indexOf(param1) != -1) {
            _loc5_ = true;
            _loc4_ = this._SafeStr_3319.get(param1);
        }
        let _loc3_: IRoomWidget = this._desktop.createWidget(param1, _loc5_, _loc4_);
        if (_loc5_ && _loc4_ == null && _loc3_ != null) {
            this._SafeStr_3319.set(param1, _loc3_);
        }
        if (_loc3_ != null) {
            _loc3_.initialize(param2);
        }
    }

    private roomObjectEventHandler(param1: RoomEngineObjectEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        if (this._desktop != null) {
            this._desktop.roomObjectEventHandler(param1);
        }
    }

    private furnitureLabelEventHandler(param1: RoomEngineFurnitureLabelEvent): void {
        if (this._roomEngine == null) {
            return;
        }
        if (this._desktop != null) {
            this._desktop.furnitureLabelEventHandler(param1);
        }
    }

    private gameEventHandler(param1: Event): void {
        if (this._desktop) {
            this._desktop.processEvent(param1);
        }
    }

    public createDesktop(param1: IRoomSession): IRoomDesktop {
        if (this.disposed || param1 == null) {
            return null;
        }
        if (this._roomEngine == null) {
            return null;
        }
        if (this._desktop != null) {
            return this._desktop;
        }
        this._desktop = new RoomDesktop(param1, this.assets, this._communication.connection);
        this._desktop.roomEngine = this._roomEngine;
        this._desktop.windowManager = this._windowManager;
        this._desktop.roomWidgetFactory = this._roomWidgetFactory;
        this._desktop.sessionDataManager = this._sessionDataManager;
        this._desktop.roomSessionManager = this._roomSessionManager;
        this._desktop.communicationManager = this._communication;
        this._desktop.friendList = this._friendList;
        this._desktop.avatarRenderManager = this._avatarRenderManager;
        this._desktop.inventory = this._inventory;
        this._desktop.messenger = this._messenger;
        this._desktop.toolbar = this._toolbar;
        this._desktop.navigator = this._newNavigator.legacyNavigator;
        this._desktop.habboGroupsManager = this._habboGroupsManager;
        this._desktop.avatarEditor = this._avatarEditor;
        this._desktop.catalog = this._catalog;
        this._desktop.adManager = this._adManager;
        this._desktop.localization = this._localization;
        this._desktop.habboHelp = this._habboHelp;
        this._desktop.moderation = this._moderation;
        this._desktop.config = this;
        this._desktop.soundManager = this._soundManager;
        this._desktop.habboTracking = this._habboTracking;
        this._desktop.userDefinedRoomEvents = this._userDefinedRoomEvents;
        this._desktop.wiredMenu = this._wiredMenu;
        this._desktop.gameManager = this._gameManager;
        this._desktop.questEngine = this._questEngine;
        this._desktop.freeFlowChat = this._freeFlowChat;
        let _loc2_: XmlAsset = asInstanceOf(this.assets.getAssetByName("room_desktop_layout_xml"), XmlAsset);
        if (_loc2_ != null) {
            this._desktop.layout = asInstanceOf(_loc2_.content, XML);
        }
        this.createDesktopWidget("RWE_LOADINGBAR");
        this.createDesktopWidget("RWE_ROOM_QUEUE");
        this._desktop.init();
        this._desktop.requestInterstitial();
        this._SafeStr_2579 = false;
        this._SafeStr_5684 = param1.roomId;
        return this._desktop;
    }

    public get chatContainer(): IDisplayObjectWrapper {
        if (!this._desktop || !this._desktop.layoutManager) {
            return null;
        }
        return this._desktop.layoutManager.getChatContainer();
    }

    public disposeDesktop(): void {
        let _loc1_: number = 0;
        if (this._desktop != null) {
            _loc1_ = this._desktop.getWidgetState("RWE_USER_CHOOSER");
            if (_loc1_ != -1) {
                this._SafeStr_6441 = _loc1_;
            }
            this._desktop.dispose();
            this._desktop = null;
            this._SafeStr_2579 = false;
        }
    }

    public getActiveCanvasId(param1: number): number {
        return 1;
    }

    public update(param1: number): void {
        if (this._desktop != null) {
            this._desktop.update(param1);
        }
    }

    private onRoomUseHabbicon(param1: HabbiconControllerEvent): void {
        let _loc2_: number = 0;
        if (!this.getBoolean("habbicons.enabled") || param1 == null || param1.roomIndex < 0 || param1.habbiconId <= 0 || this._desktop == null || this._desktop.roomSession == null || this._roomEngine == null) {
            return;
        }
        _loc2_ = this._desktop.roomSession.roomId;
        this._roomEngine.updateObjectUserAction(_loc2_, param1.roomIndex, "figure_habbicon", param1.habbiconId);
    }

    public set visible(param1: boolean) {
        if (this._desktop != null) {
            this._desktop.visible = param1;
        }
    }

    public hideWidget(param1: string): void {
        if (this._desktop != null) {
            this._desktop.processEvent(new HideRoomWidgetEvent(param1));
        }
    }

    public showGamePlayerName(param1: number, param2: string, param3: number, param4: number): void {
        if (this._desktop != null) {
            this._desktop.showGamePlayerName(param1, param2, param3, param4);
        }
    }

    public mouseEventPositionHasContextMenu(param1: MouseEvent): boolean {
        if (this._desktop != null) {
            return this._desktop.mouseEventPositionHasInputEventWindow(param1, 0);
        }
        return false;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get localization(): IHabboLocalizationManager {
        return this._localization;
    }

    public get catalog(): IHabboCatalog {
        return this._catalog;
    }

    public get habbiconController(): _SafeCls_6080 {
        return this._habbiconController;
    }

    public get userDefinedRoomEvents(): IHabboUserDefinedRoomEvents {
        return this._userDefinedRoomEvents;
    }

    public get inventory(): IHabboInventory {
        return this._inventory;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get soundManager(): IHabboSoundManager {
        return this._soundManager;
    }

    public get habboTracking(): IHabboTracking {
        return this._habboTracking;
    }

    public get habboGroupsManager(): IHabboGroupsManager {
        return this._habboGroupsManager;
    }

    public get friendBarView(): IHabboFriendBarView {
        return this._friendBarView;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public get chatStyleLibrary(): IChatStyleLibrary {
        if (this._freeFlowChat) {
            return this._freeFlowChat.chatStyleLibrary;
        }
        return null;
    }

    public createChatMessagePreviewBitmap(param1: string, param2: string, param3: number, param4: number, param5: number): BitmapData {
        return this._freeFlowChat == null ? null : this._freeFlowChat.createChatMessagePreviewBitmap(param1, param2, param3, param4, param5);
    }

    public get freeFlowChat(): IHabboFreeFlowChat {
        return this._freeFlowChat;
    }

    public get habboHelp(): IHabboHelp {
        return this._habboHelp;
    }

    public get desktop(): IRoomDesktop {
        return this._desktop;
    }

    protected override initInstanceFields(): void {
        this.roomSessionStateEventHandler = this.roomSessionStateEventHandler.bind(this);
        this.roomSessionEventHandler = this.roomSessionEventHandler.bind(this);
        this.sessionDataEventHandler = this.sessionDataEventHandler.bind(this);
        this.roomSessionDialogEventHandler = this.roomSessionDialogEventHandler.bind(this);
        this.interstitialShowEventHandler = this.interstitialShowEventHandler.bind(this);
        this.bottomBarResizeHandler = this.bottomBarResizeHandler.bind(this);
        this.interstitialNotAvailableEventHandler = this.interstitialNotAvailableEventHandler.bind(this);
        this.interstitialCompleteEventHandler = this.interstitialCompleteEventHandler.bind(this);
        this.adEventHandler = this.adEventHandler.bind(this);
        this.onPerkAllowances = this.onPerkAllowances.bind(this);
        this.delayedAddToStageFreeFlowChat = this.delayedAddToStageFreeFlowChat.bind(this);
        this.roomEngineEventHandler = this.roomEngineEventHandler.bind(this);
        this.roomEventHandler = this.roomEventHandler.bind(this);
        this.roomObjectEventHandler = this.roomObjectEventHandler.bind(this);
        this.furnitureLabelEventHandler = this.furnitureLabelEventHandler.bind(this);
        this.gameEventHandler = this.gameEventHandler.bind(this);
        this.onRoomUseHabbicon = this.onRoomUseHabbicon.bind(this);
        this._SafeStr_6441 = -1;
        this._SafeStr_2579 = false;
        this._SafeStr_5684 = 0;
        this._SafeStr_5117 = false;
        this._isInRoom = false;
        super.initInstanceFields();
    }

    get [IRoomUI](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
