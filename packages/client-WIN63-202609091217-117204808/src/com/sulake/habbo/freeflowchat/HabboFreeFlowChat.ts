import { asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IContext } from '@/com/sulake/core/runtime/IContext';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { IHabboCommunicationManager } from '@/com/sulake/habbo/communication/IHabboCommunicationManager';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IChatStyleLibrary } from '@/com/sulake/habbo/freeflowchat/style/IChatStyleLibrary';
import type { IHabboGameManager } from '@/com/sulake/habbo/game/IHabboGameManager';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IHabboModeration } from '@/com/sulake/habbo/moderation/IHabboModeration';
import type { IHabboNavigator } from '@/com/sulake/habbo/navigator/IHabboNavigator';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IRoomSession } from '@/com/sulake/habbo/session/IRoomSession';
import type { IRoomSessionManager } from '@/com/sulake/habbo/session/IRoomSessionManager';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IHabboToolbar } from '@/com/sulake/habbo/toolbar/IHabboToolbar';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomUI } from '@/com/sulake/habbo/ui/IRoomUI';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { IRoomGeometry } from '@/com/sulake/room/utils/IRoomGeometry';
import type { IVector3d } from '@/com/sulake/room/utils/IVector3d';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import type { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { ComponentDependency } from '@/com/sulake/core/runtime/ComponentDependency';
import { GetGuestRoomResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GetGuestRoomResultEvent';
import { PerkAllowancesMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/perk/PerkAllowancesMessageEvent';
import { AccountPreferencesEvent } from '@/com/sulake/habbo/communication/messages/incoming/preferences/AccountPreferencesEvent';
import { RoomChatSettingsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/chat/RoomChatSettingsMessageEvent';
import { RoomEntryInfoMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/room/engine/RoomEntryInfoMessageEvent';
import { RoomChatSettings } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/RoomChatSettings';
import { SetChatPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetChatPreferencesMessageComposer';
import { SetChatStylePreferenceComposer } from '@/com/sulake/habbo/communication/messages/outgoing/preferences/SetChatStylePreferenceComposer';
import { HabboComponentFlags } from '@/com/sulake/habbo/configuration/enum/HabboComponentFlags';
import { ChatViewController } from '@/com/sulake/habbo/freeflowchat/ChatViewController';
import { ChatEventHandler } from '@/com/sulake/habbo/freeflowchat/data/ChatEventHandler';
import { ChatItem } from '@/com/sulake/habbo/freeflowchat/data/ChatItem';
import { RoomSessionEventHandler } from '@/com/sulake/habbo/freeflowchat/data/RoomSessionEventHandler';
import { ChatBubbleFactory, ChatHistoryScrollView, ChatStyle } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { ChatHistoryBuffer } from '@/com/sulake/habbo/freeflowchat/history/ChatHistoryBuffer';
import { ChatHistoryTray } from '@/com/sulake/habbo/freeflowchat/history/visualization/ChatHistoryTray';
import { ChatFlowViewer } from '@/com/sulake/habbo/freeflowchat/viewer/ChatFlowViewer';
import { ChatMarkup } from '@/com/sulake/habbo/freeflowchat/viewer/enum/ChatMarkup';
import { ChatFlowStage } from '@/com/sulake/habbo/freeflowchat/viewer/simulation/ChatFlowStage';
import { ManualNineSliceSprite } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/ManualNineSliceSprite';
import { PooledChatBubble } from '@/com/sulake/habbo/freeflowchat/viewer/visualization/PooledChatBubble';
import { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';
import { IIDAvatarRenderManager } from '@/com/sulake/iid/IIDAvatarRenderManager';
import { IIDHabboCommunicationManager } from '@/com/sulake/iid/IIDHabboCommunicationManager';
import { IIDHabboGameManager } from '@/com/sulake/iid/IIDHabboGameManager';
import { IIDHabboLocalizationManager } from '@/com/sulake/iid/IIDHabboLocalizationManager';
import { IIDHabboModeration } from '@/com/sulake/iid/IIDHabboModeration';
import { IIDHabboNavigator } from '@/com/sulake/iid/IIDHabboNavigator';
import { IIDHabboRoomSessionManager } from '@/com/sulake/iid/IIDHabboRoomSessionManager';
import { IIDHabboRoomUI } from '@/com/sulake/iid/IIDHabboRoomUI';
import { IIDHabboToolbar } from '@/com/sulake/iid/IIDHabboToolbar';
import { IIDHabboWindowManager } from '@/com/sulake/iid/IIDHabboWindowManager';
import { IIDRoomEngine } from '@/com/sulake/iid/IIDRoomEngine';
import { IIDSessionDataManager } from '@/com/sulake/iid/IIDSessionDataManager';

export class HabboFreeFlowChat extends Component implements IHabboFreeFlowChat {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat::HabboFreeFlowChat'); }

    private static readonly CHAT_FONT_SIZE_MODE_MIN: number = 0;
    private static readonly CHAT_FONT_SIZE_MODE_MAX: number = 4;
    private static readonly ZERO_POINT: Point = new Point(0, 0);

    declare private _avatarRenderManager: IAvatarRenderManager;

    declare private _roomSessionManager: IRoomSessionManager;

    declare private _roomEngine: IRoomEngine;

    declare private _navigator: IHabboNavigator;

    declare private _moderation: IHabboModeration;

    declare private _roomUI: IRoomUI;

    declare private _gameManager: IHabboGameManager;

    declare private _localizationManager: IHabboLocalizationManager;

    declare private _toolbar: IHabboToolbar;

    declare private _communication: IHabboCommunicationManager;

    declare private _windowManager: IHabboWindowManager;

    declare private _sessionDataManager: ISessionDataManager;

    declare private _SafeStr_3921: ChatEventHandler;

    declare private _SafeStr_4128: RoomSessionEventHandler;

    declare private _SafeStr_3019: ChatHistoryBuffer;

    declare private _SafeStr_2608: ChatFlowStage;

    declare private _chatHistoryScrollView: ChatHistoryScrollView;

    declare private _chatHistoryPulldown: ChatHistoryTray;

    declare private _chatFlowViewer: ChatFlowViewer;

    declare private _SafeStr_3596: ChatViewController;

    declare private _chatBubbleFactory: ChatBubbleFactory;

    declare private _SafeStr_3738: boolean;

    declare private _isInRoom: boolean;

    declare private _SafeStr_4243: RoomChatSettings;

    declare private _SafeStr_14199: number;

    declare private _chatFontSizeMode: number;

    declare private _chatMode: number;

    declare private _chatBubbleWidth: number;

    declare private _SafeStr_14200: number;

    declare private _SafeStr_14201: number;

    declare private _SafeStr_5204: boolean;

    constructor(param1: IContext, param2: number = 0, param3: IAssetLibrary = null) {
        super(param1, param2, param3);
        this.refreshEffectiveChatSettings();
    }

    public static getTimeStampNow(): string {
        let _loc1_: Date = new Date();
        let _loc2_: number = _loc1_.getHours();
        let _loc4_: number = _loc1_.getMinutes();
        let _loc3_: number = _loc1_.getSeconds();
        let _loc5_: string = _loc2_ < 10 ? "0" + _loc2_ : _loc2_.toString();
        _loc5_ = _loc5_ + ":" + (_loc4_ < 10 ? "0" + _loc4_ : _loc4_.toString());
        return _loc5_ + ":" + (_loc3_ < 10 ? "0" + _loc3_ : _loc3_.toString());
    }

    public static create9SliceSprite(param1: Rectangle, param2: BitmapData): Sprite {
        let _loc8_: number = 0;
        let _loc5_: number = NaN;
        let _loc9_: number = 0;
        let _loc7_: Sprite = new Sprite();
        let _loc3_: any[] = [param1.left, param1.right, param2.width];
        let _loc4_: any[] = [param1.top, param1.bottom, param2.height];
        _loc7_.graphics.clear();
        let _loc6_: number = 0;
        _loc8_ = 0;
        while (_loc8_ < 3) {
            _loc5_ = 0;
            _loc9_ = 0;
            while (_loc9_ < 3) {
                _loc7_.graphics.beginBitmapFill(param2);
                _loc7_.graphics.drawRect(_loc6_, _loc5_, _loc3_[_loc8_] - _loc6_, _loc4_[_loc9_] - _loc5_);
                _loc7_.graphics.endFill();
                _loc5_ = Number(_loc4_[_loc9_]);
                _loc9_++;
            }
            _loc6_ = Number(_loc3_[_loc8_]);
            _loc8_++;
        }
        _loc7_.scale9Grid = param1;
        return _loc7_;
    }

    public static createPixelPerfect9SliceSprite(param1: Rectangle, param2: BitmapData): Sprite {
        return new ManualNineSliceSprite(param1, param2);
    }

    protected override get dependencies(): ComponentDependency[] {
        return super.dependencies.concat([new ComponentDependency(new IIDSessionDataManager(), (param1: ISessionDataManager): void => {
             this._sessionDataManager = param1;
         }, false), new ComponentDependency(new IIDAvatarRenderManager(), (param1: IAvatarRenderManager): void => {
             this._avatarRenderManager = param1;
         }, false), new ComponentDependency(new IIDHabboRoomSessionManager(), (param1: IRoomSessionManager): void => {
             this._roomSessionManager = param1;
         }), new ComponentDependency(new IIDRoomEngine(), (param1: IRoomEngine): void => {
             this._roomEngine = param1;
         }, false), new ComponentDependency(new IIDHabboCommunicationManager(), (param1: IHabboCommunicationManager): void => {
             this._communication = param1;
         }), new ComponentDependency(new IIDHabboNavigator(), (param1: IHabboNavigator): void => {
             this._navigator = param1;
         }, false), new ComponentDependency(new IIDHabboModeration(), (param1: IHabboModeration): void => {
             this._moderation = param1;
         }, false), new ComponentDependency(new IIDHabboRoomUI(), (param1: IRoomUI): void => {
             this._roomUI = param1;
         }, false), new ComponentDependency(new IIDHabboGameManager(), (param1: IHabboGameManager): void => {
             this._gameManager = param1;
         }, false), new ComponentDependency(new IIDHabboLocalizationManager(), (param1: IHabboLocalizationManager): void => {
             this._localizationManager = param1;
         }, false), new ComponentDependency(new IIDHabboToolbar(), (param1: IHabboToolbar): void => {
             this._toolbar = param1;
         }, false), new ComponentDependency(new IIDHabboWindowManager(), (param1: IHabboWindowManager): void => {
             this._windowManager = param1;
         }, false)]);
    }

    protected override initComponent(): void {
        this._communication.addHabboConnectionMessageEvent(new RoomEntryInfoMessageEvent(this.onRoomEnter));
        this._communication.addHabboConnectionMessageEvent(new AccountPreferencesEvent(this.onAccountPreferences));
        this._communication.addHabboConnectionMessageEvent(new PerkAllowancesMessageEvent(this.onPerkAllowances));
        this._communication.addHabboConnectionMessageEvent(new GetGuestRoomResultEvent(this.onGuestRoomData));
        this._communication.addHabboConnectionMessageEvent(new RoomChatSettingsMessageEvent(this.onRoomChatSettings));
    }

    private onPerkAllowances(param1: PerkAllowancesMessageEvent): void {
        let _loc2_: boolean = this._SafeStr_3738;
        this._SafeStr_3738 = true;
        if (!_loc2_ && this._SafeStr_3738) {
            this._chatBubbleFactory = new ChatBubbleFactory(this);
            this._SafeStr_3921 = new ChatEventHandler(this);
            this._SafeStr_4128 = new RoomSessionEventHandler(this);
            this._SafeStr_3019 = new ChatHistoryBuffer(this);
            if (this._isInRoom) {
                this.roomEntered();
            }
        } else if (_loc2_ && !this._SafeStr_3738) {
            if (this._chatBubbleFactory) {
                this._chatBubbleFactory.dispose();
                this._chatBubbleFactory = null;
            }
            if (this._SafeStr_3921) {
                this._SafeStr_3921.dispose();
                this._SafeStr_3921 = null;
            }
            if (this._SafeStr_4128) {
                this._SafeStr_4128.dispose();
                this._SafeStr_4128 = null;
            }
            if (this._SafeStr_3019) {
                this._SafeStr_3019.dispose();
                this._SafeStr_3019 = null;
            }
            this.roomLeft();
        }
    }

    private onGuestRoomData(param1: GetGuestRoomResultEvent): void {
        if (this._SafeStr_3019 && !this._SafeStr_5204) {
            this._SafeStr_3019.insertRoomChange(param1.getParser().data);
        }
        this._SafeStr_5204 = true;
        if (param1.getParser().chatSettings != null) {
            this._SafeStr_14201 = param1.getParser().chatSettings.floodSensitivity;
            this.refreshEffectiveChatSettings();
        }
        if (this._SafeStr_2608) {
            this._SafeStr_2608.refreshSettings();
        }
    }

    private onRoomEnter(param1: RoomEntryInfoMessageEvent): void {
        this._SafeStr_5204 = false;
        this.clear();
    }

    private onRoomChatSettings(param1: RoomChatSettingsMessageEvent): void {
        this._SafeStr_14201 = param1.getParser().chatSettings != null ? param1.getParser().chatSettings.floodSensitivity : 1;
        this.refreshEffectiveChatSettings();
        if (this._isInRoom && this._SafeStr_2608) {
            this._SafeStr_2608.refreshSettings();
        }
    }

    private onAccountPreferences(param1: AccountPreferencesEvent): void {
        this._SafeStr_14199 = param1.getParser().preferedChatStyle;
        this._chatFontSizeMode = this.clampChatFontSizeMode(param1.getParser().chatSizePreference);
        this._chatMode = this.sanitizeChatMode(param1.getParser().chatMode);
        this._chatBubbleWidth = this.sanitizeChatBubbleWidth(param1.getParser().chatBubbleWidth);
        this._SafeStr_14200 = this.sanitizeChatScrollSpeed(param1.getParser().chatScrollSpeed);
        this.refreshEffectiveChatSettings();
        if (this._isInRoom && this._SafeStr_2608) {
            this._SafeStr_2608.refreshSettings();
        }
    }

    public getRoomChangeBitmap(): BitmapData {
        return castTo(this.assets.getAssetByName("room_change").content, BitmapData);
    }

    public get roomSessionManager(): IRoomSessionManager {
        return this._roomSessionManager;
    }

    public get roomEngine(): IRoomEngine {
        return this._roomEngine;
    }

    public get avatarRenderManager(): IAvatarRenderManager {
        return this._avatarRenderManager;
    }

    public get gameManager(): IHabboGameManager {
        return this._gameManager;
    }

    public get localizations(): IHabboLocalizationManager {
        return this._localizationManager;
    }

    public get windowManager(): IHabboWindowManager {
        return this._windowManager;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._sessionDataManager;
    }

    public roomEntered(): void {
        this._isInRoom = true;
        if (this._SafeStr_3738 && this._chatBubbleFactory && this._SafeStr_3921 && this._SafeStr_4128) {
            this._SafeStr_2608 = new ChatFlowStage(this);
            this._chatFlowViewer = new ChatFlowViewer(this, this._SafeStr_2608);
            this._chatHistoryScrollView = new ChatHistoryScrollView(this, this._SafeStr_3019);
            this._chatHistoryPulldown = new ChatHistoryTray(this, this._chatHistoryScrollView);
            this._SafeStr_3596 = new ChatViewController(this, this._chatFlowViewer, this._chatHistoryPulldown);
        }
    }

    public roomLeft(): void {
        if (this._chatHistoryPulldown) {
            this._chatHistoryPulldown.dispose();
            this._chatHistoryPulldown = null;
        }
        if (this._chatHistoryScrollView) {
            this._chatHistoryScrollView.dispose();
            this._chatHistoryPulldown = null;
        }
        if (this._chatFlowViewer) {
            this._chatFlowViewer.dispose();
            this._chatFlowViewer = null;
        }
        if (this._SafeStr_2608) {
            this._SafeStr_2608.dispose();
            this._SafeStr_2608 = null;
        }
        if (this._SafeStr_3596) {
            this._SafeStr_3596.dispose();
            this._SafeStr_3596 = null;
        }
        this._isInRoom = false;
    }

    private fixHtml(param1: ChatItem, param2: ChatStyle): void {
        if (!param2.allowHTML) {
            param1.text = param1.text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            param1.text = param1.text.replace(/&#[0-9]+;/g, "");
            param1.text = param1.text.replace(/&#x[0-9]+;/g, "");
        }
        let _loc3_: number = (param2.textFormat && param2.textFormat.color != null ? param2.textFormat.color >>> 0 : 0) >>> 0;
        if (param2.isNotification) {
            param1.text = ChatMarkup.applyToElements(param1.text, _loc3_);
        }
        param1.text = ChatMarkup.applyColourToChat(param1.text, _loc3_);
    }

    public insertChat(param1: ChatItem): void {
        let _loc2_: PooledChatBubble = null;
        let _loc4_: Point = null;
        if (!this._SafeStr_3738 || !this._SafeStr_3019 || !this._SafeStr_2608) {
            return;
        }
        let _loc3_: ChatStyle = castTo(this.chatStyleLibrary.getStyle(param1.style), ChatStyle);
        this.fixHtml(param1, _loc3_);
        this._SafeStr_3019.insertChat(param1);
        try {
            _loc2_ = this._chatBubbleFactory.getNewChatBubble(param1);
        } catch (e) {
            if ((e.errorID ?? 0) == 2015) {
                return;
            }
            throw e;
        }
        _loc4_ = this._SafeStr_2608.insertBubble(_loc2_);
        this._chatFlowViewer.insertBubble(_loc2_, _loc4_);
    }

    public getScreenPointFromRoomLocation(param1: number, param2: IVector3d): Point {
        let _loc9_: Point = null;
        let _loc5_: Point = null;
        if (this._roomEngine == null || this._chatFlowViewer == null || this._chatFlowViewer.rootDisplayObject.stage == null) {
            return HabboFreeFlowChat.ZERO_POINT;
        }
        let _loc3_: number = HabboComponentFlags.isRoomViewerMode(this.flags | 0) ? 1 : -1;
        let _loc8_: IRoomGeometry = this.roomEngine.getRoomCanvasGeometry(param1, _loc3_);
        let _loc7_: number = this.roomEngine.getRoomCanvasScale(param1, _loc3_);
        if (this.roomEngine.getRoomCanvasIsFlipped(param1, _loc3_)) {
            _loc7_ = -_loc7_;
        }
        let _loc6_: number = this._chatFlowViewer.rootDisplayObject.stage.stageWidth * _loc7_ / 2;
        let _loc4_: number = this._chatFlowViewer.rootDisplayObject.stage.stageHeight * _loc7_ / 2;
        if (_loc8_ != null && param2 != null) {
            _loc9_ = _loc8_.getScreenPoint(param2);
            if (_loc9_ != null) {
                _loc6_ += _loc9_.x * _loc7_;
                _loc4_ += _loc9_.y * _loc7_;
                _loc5_ = this.roomEngine.getRoomCanvasScreenOffset(param1, _loc3_);
                if (_loc5_ != null) {
                    _loc6_ += _loc5_.x;
                    _loc4_ += _loc5_.y;
                }
            }
        }
        return new Point(_loc6_, _loc4_);
    }

    public get chatFlowViewer(): ChatFlowViewer {
        return this._chatFlowViewer;
    }

    public get chatBubbleFactory(): ChatBubbleFactory {
        return this._chatBubbleFactory;
    }

    public get chatHistoryScrollView(): ChatHistoryScrollView {
        return this._chatHistoryScrollView;
    }

    public get displayObject(): DisplayObject {
        if (this._SafeStr_3596) {
            return this._SafeStr_3596.rootDisplayObject;
        }
        return null;
    }

    public disableRoomMouseEventsLeftOfX(param1: number): void {
        this._roomEngine.mouseEventsDisabledLeftToX = param1;
    }

    public selectAvatarWithChatItem(param1: ChatItem): void {
        this.selectAvatar(param1.roomId, param1.userId);
    }

    public selectAvatar(param1: number, param2: number): void {
        let _loc5_: IUserData = null;
        let _loc4_: IUserData = null;
        if (this._roomUI == null) {
            return;
        }
        let _loc3_: IRoomDesktop = this._roomUI.desktop;
        _loc3_.processWidgetMessage(new RoomWidgetRoomObjectMessage("RWROM_GET_OBJECT_INFO", param2, 100));
        this.roomEngine.selectAvatar(param1, param2);
        let _loc6_: IRoomSession = this._roomSessionManager.getSession(param1);
        if (_loc6_) {
            _loc5_ = _loc6_.userDataManager.getUserDataByIndex(param2);
            if (_loc5_ != null) {
                _loc4_ = this._roomSessionManager.getSession(param1).userDataManager.getUserDataByIndex(param2);
                if (_loc4_ && this._moderation) {
                    this._moderation.userSelected(_loc5_.webID, _loc4_.name);
                }
            }
        }
    }

    public get roomChatSettings(): RoomChatSettings {
        return this._SafeStr_4243;
    }

    public get roomChatBorderLimited(): boolean {
        if (this._SafeStr_4243) {
            return this._SafeStr_4243.mode == 1;
        }
        return false;
    }

    public clickHasToPropagate(param1: MouseEvent): boolean {
        return this._roomUI ? this._roomUI.mouseEventPositionHasContextMenu(param1) : false;
    }

    public get chatStyleLibrary(): IChatStyleLibrary {
        return this._chatBubbleFactory ? this._chatBubbleFactory.chatStyleLibrary : null;
    }

    public get preferedChatStyle(): number {
        return this._SafeStr_14199;
    }

    public set preferedChatStyle(param1: number) {
        this._SafeStr_14199 = param1;
        this._communication.connection.send(new SetChatStylePreferenceComposer(this._SafeStr_14199, this._chatFontSizeMode));
    }

    public get chatFontSizeMode(): number {
        return this._chatFontSizeMode;
    }

    public set chatFontSizeMode(param1: number) {
        param1 = this.clampChatFontSizeMode(param1);
        this._chatFontSizeMode = param1;
        this._communication.connection.send(new SetChatStylePreferenceComposer(this._SafeStr_14199, this._chatFontSizeMode));
    }

    public get chatMode(): number {
        return this._chatMode;
    }

    public set chatMode(param1: number) {
        this.updateChatPreferences(param1, this._chatBubbleWidth, this._SafeStr_14200);
    }

    public get chatBubbleWidth(): number {
        return this._chatBubbleWidth;
    }

    public set chatBubbleWidth(param1: number) {
        this.updateChatPreferences(this._chatMode, param1, this._SafeStr_14200);
    }

    public get chatScrollSpeed(): number {
        return this._SafeStr_14200;
    }

    public set chatScrollSpeed(param1: number) {
        this.updateChatPreferences(this._chatMode, this._chatBubbleWidth, param1);
    }

    public updateChatPreferences(param1: number, param2: number, param3: number): void {
        param1 = this.sanitizeChatMode(param1);
        param2 = this.sanitizeChatBubbleWidth(param2);
        param3 = this.sanitizeChatScrollSpeed(param3);
        if (this._chatMode == param1 && this._chatBubbleWidth == param2 && this._SafeStr_14200 == param3) {
            return;
        }
        this._chatMode = param1;
        this._chatBubbleWidth = param2;
        this._SafeStr_14200 = param3;
        this.refreshEffectiveChatSettings();
        this.refreshChatSettings();
        this.sendChatPreferences();
    }

    public get chatFontSizeScale(): number {
        switch (this._chatFontSizeMode - 1) {
            case 0:
                return 1.15;
            case 1:
                return 1.3;
            case 2:
                return 1.5;
            case 3:
                return 1.75;
            default:
                return 1;
        }
    }

    private clampChatFontSizeMode(param1: number): number {
        if (param1 < 0) {
            return 0;
        }
        if (param1 > 4) {
            return 4;
        }
        return param1;
    }

    private refreshEffectiveChatSettings(): void {
        this._SafeStr_4243 = new RoomChatSettings(this._chatMode, this._chatBubbleWidth, this._SafeStr_14200, this._SafeStr_14201);
    }

    private refreshChatSettings(): void {
        if (this._isInRoom && this._SafeStr_2608) {
            this._SafeStr_2608.refreshSettings();
        }
    }

    private sendChatPreferences(): void {
        this._communication.connection.send(new SetChatPreferencesMessageComposer(this._chatMode, this._chatBubbleWidth, this._SafeStr_14200));
    }

    private sanitizeChatMode(param1: number): number {
        switch (param1) {
            case 0:
            case 1:
                return param1;
            default:
                return 0;
        }
    }

    private sanitizeChatBubbleWidth(param1: number): number {
        switch (param1) {
            case 0:
            case 1:
            case 2:
                return param1;
            default:
                return 1;
        }
    }

    private sanitizeChatScrollSpeed(param1: number): number {
        switch (param1) {
            case 0:
            case 1:
            case 2:
                return param1;
            default:
                return 1;
        }
    }

    public clear(): void {
        if (this._SafeStr_2608) {
            this._SafeStr_2608.clear();
        }
    }

    public toggleVisibility(): void {
        if (!this._SafeStr_3738 || !this._chatHistoryPulldown) {
            return;
        }
        this._chatHistoryPulldown.toggleHistoryVisibility();
    }

    public set visible(param1: boolean) {
        if (this._chatHistoryPulldown != null) {
            this._chatHistoryPulldown.visible = param1;
        }
    }

    public isNotificationStyle(param1: number): boolean {
        let _loc2_: ChatStyle = asInstanceOf(this.chatStyleLibrary.getStyle(param1), ChatStyle);
        return _loc2_ != null && _loc2_.isNotification;
    }

    public get toolbar(): IHabboToolbar {
        return this._toolbar;
    }

    public createPreviewBitmap(param1: string, param2: number): BitmapData {
        let _loc6_: ChatStyle = asInstanceOf(this.chatStyleLibrary.getStyle(param2), ChatStyle);
        if (_loc6_ == null) {
            return null;
        }
        let _loc3_: RoomSessionChatEvent = new RoomSessionChatEvent("RSCE_CHAT_EVENT", null, -1, "", 0);
        let _loc4_: ChatItem = new ChatItem(_loc3_, getTimer(), null, 0, null, null, null, param1);
        let _loc5_: PooledChatBubble = new PooledChatBubble(this);
        _loc5_.chatItem = _loc4_;
        _loc5_.face = null;
        _loc5_.style = _loc6_;
        _loc5_.recreate(param1, 0, false);
        let _loc7_: BitmapData = new BitmapData(_loc5_.width | 0, _loc5_.height | 0, true, 0);
        _loc7_.draw(_loc5_);
        return _loc7_;
    }

    protected override initInstanceFields(): void {
        this.onPerkAllowances = this.onPerkAllowances.bind(this);
        this.onGuestRoomData = this.onGuestRoomData.bind(this);
        this.onRoomEnter = this.onRoomEnter.bind(this);
        this.onRoomChatSettings = this.onRoomChatSettings.bind(this);
        this.onAccountPreferences = this.onAccountPreferences.bind(this);
        this._SafeStr_3738 = false;
        this._isInRoom = false;
        this._SafeStr_14199 = 1;
        this._chatFontSizeMode = 0;
        this._chatMode = 0;
        this._chatBubbleWidth = 1;
        this._SafeStr_14200 = 1;
        this._SafeStr_14201 = 1;
        this._SafeStr_5204 = false;
        super.initInstanceFields();
    }
}
