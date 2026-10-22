import { asGuarded, asInstanceOf, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IAlertDialog } from '@/com/sulake/core/window/utils/IAlertDialog';
import type { GuestRoomData } from '@/com/sulake/habbo/communication/messages/incoming/navigator/GuestRoomData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { IUserData } from '@/com/sulake/habbo/session/IUserData';
import type { IRoomWidgetHandlerContainer } from '@/com/sulake/habbo/ui/IRoomWidgetHandlerContainer';
import type { RoomChatInputWidget } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputWidget';
import type { RoomWidgetUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetUpdateEvent';
import type { RoomWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetMessage';
import type { IRoomObjectSprite } from '@/com/sulake/room/object/visualization/IRoomObjectSprite';
import type { IRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ColorMatrixFilter } from '@habbo-pixi/runtime/filters/ColorMatrixFilter';
import { Mouse } from '@habbo-pixi/runtime/ui/Mouse';
import { isICoreLocalizationManager } from '@/com/sulake/core/localization/ICoreLocalizationManager';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { WiredUpdateRoomComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredmenu/WiredUpdateRoomComposer';
import { FriendBarResizeEvent } from '@/com/sulake/habbo/friendbar/events/FriendBarResizeEvent';
import { RoomEngineZoomEvent } from '@/com/sulake/habbo/room/events/RoomEngineZoomEvent';
import { RoomSessionChatEvent } from '@/com/sulake/habbo/session/events/RoomSessionChatEvent';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import { AvatarExpressionEnum } from '@/com/sulake/habbo/ui/widget/enums/AvatarExpressionEnum';
import { HideRoomWidgetEvent } from '@/com/sulake/habbo/ui/widget/events/HideRoomWidgetEvent';
import { RoomWidgetFloodControlEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetFloodControlEvent';
import { RoomWidgetChatMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChatMessage';
import { RoomWidgetChatSelectAvatarMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChatSelectAvatarMessage';
import { RoomWidgetChatTypingMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChatTypingMessage';
import { RoomWidgetRequestWidgetMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRequestWidgetMessage';
import { HabboWebTools } from '@/com/sulake/habbo/utils/HabboWebTools';
import { isIRoomObjectSpriteVisualization } from '@/com/sulake/room/object/visualization/IRoomObjectSpriteVisualization';
import { RoomShakingEffect } from '@/com/sulake/room/utils/RoomShakingEffect';

export class ChatInputWidgetHandler implements IRoomWidgetHandler {
    static { registerClassName(this, 'com.sulake.habbo.ui.handler::ChatInputWidgetHandler'); }

    constructor() {
    }

    private _disposed: boolean = false;
    private _SafeStr_5393: boolean = true;
    private _demonicTriggers: boolean = false;

    declare private _widget: RoomChatInputWidget;

    private _container: IRoomWidgetHandlerContainer = null;

    public get container(): IRoomWidgetHandlerContainer {
        return this._container;
    }

    public set container(param1: IRoomWidgetHandlerContainer) {
        this._container = param1;
    }

    public set widget(param1: RoomChatInputWidget) {
        this._widget = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get type(): string {
        return "RWE_CHAT_INPUT_WIDGET";
    }

    public dispose(): void {
        this._disposed = true;
        this._container = null;
        this._widget = null;
    }

    public getWidgetMessages(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push("RWCTM_TYPING_STATUS");
        _loc1_.push("RWCM_MESSAGE_CHAT");
        _loc1_.push("RWCSAM_MESSAGE_SELECT_AVATAR");
        return _loc1_;
    }

    public processWidgetMessage(param1: RoomWidgetMessage): RoomWidgetUpdateEvent {
        let _loc3_: any = null;
        let _loc22_: number = 0;
        let _loc25_: number = 0;
        let _loc31_: RoomWidgetChatTypingMessage = null;
        let _loc26_: RoomWidgetChatMessage = null;
        let _loc7_: string = null;
        let _loc27_: RoomWidgetRequestWidgetMessage = null;
        let _loc32_: any[] = null;
        let _loc18_: string = null;
        let _loc33_: string = null;
        let _loc34_: number = 0;
        let _loc6_: IUserData = null;
        let _loc13_: IUserData = null;
        let _loc20_: IUserData = null;
        let _loc12_: IUserData = null;
        let _loc23_: IUserData = null;
        let _loc30_: IUserData = null;
        let _loc16_: HabboToolbarEvent = null;
        let _loc4_: string = null;
        let _loc8_: GuestRoomData = null;
        let _loc2_: Date = null;
        let _loc28_: string = null;
        let _loc11_: any[] = null;
        let _loc29_: any[] = null;
        let _loc19_: any[] = null;
        let _loc15_: IFurnitureData = null;
        let _loc17_: number = 0;
        let _loc5_: IRoomObjectSpriteVisualization = null;
        let _loc24_: number = 0;
        let _loc14_: IRoomObjectSprite = null;
        let _loc21_: number = 0;
        let _loc9_: RoomWidgetChatSelectAvatarMessage = null;
        let _loc10_: IUserData = null;
        switch (param1.type) {
            case "RWCTM_TYPING_STATUS":
                _loc31_ = param1 instanceof RoomWidgetChatTypingMessage ? param1 : null;
                if (_loc31_ != null) {
                    this._container.roomSession.sendChatTypingMessage(_loc31_.isTyping);
                }
                break;
            case "RWCM_MESSAGE_CHAT":
                if (this._container != null && this._container.roomSession != null) {
                    _loc26_ = param1 instanceof RoomWidgetChatMessage ? param1 : null;
                    if (_loc26_ != null) {
                        if (_loc26_.text == "") {
                            return null;
                        }
                        _loc7_ = _loc26_.text;
                        _loc27_ = null;
                        _loc32_ = _loc26_.text.split(" ");
                        if (_loc32_.length > 0) {
                            _loc18_ = stringOrNull(_loc32_[0]);
                            _loc33_ = "";
                            if (_loc32_.length > 1) {
                                _loc33_ = stringOrNull(_loc32_[1]);
                            }
                            if (_loc18_.charAt(0) == ":" && _loc33_ == "x") {
                                _loc34_ = this._container.roomEngine.getSelectedAvatarId();
                                if (_loc34_ > -1) {
                                    _loc6_ = this._container.roomSession.userDataManager.getUserDataByIndex(_loc34_);
                                    if (_loc6_ != null) {
                                        _loc33_ = _loc6_.name;
                                        _loc7_ = _loc26_.text.replace(" x", " " + _loc6_.name);
                                    }
                                }
                            }
                            switch (_loc18_.toLowerCase()) {
                                case ":shake":
                                    RoomShakingEffect.init(250, 5000);
                                    RoomShakingEffect.turnVisualizationOn();
                                    return null;
                                case ":d":
                                case ";d":
                                    if (this._container.sessionDataManager.hasVip) {
                                        this._container.roomSession.sendAvatarExpressionMessage(AvatarExpressionEnum.LAUGH.ordinal);
                                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "chat", "laugh");
                                    }
                                    break;
                                case ":kiss":
                                    if (this._container.sessionDataManager.hasVip) {
                                        this._container.roomSession.sendAvatarExpressionMessage(AvatarExpressionEnum.BLOW.ordinal);
                                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "chat", "blow");
                                        return null;
                                    }
                                    break;
                                case ":jump":
                                    if (this._container.sessionDataManager.hasVip) {
                                        this._container.roomSession.sendAvatarExpressionMessage(AvatarExpressionEnum.JUMP.ordinal);
                                        HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "chat", "jump");
                                        return null;
                                    }
                                    break;
                                case ":news":
                                    if (this._container.config.getBoolean("client.news.embed.enabled")) {
                                        HabboWebTools.openNews();
                                        return null;
                                    }
                                    break;
                                case ":mail":
                                    if (this._container.config.getBoolean("client.minimail.embed.enabled")) {
                                        HabboWebTools.openMinimail("#mail/inbox/");
                                        return null;
                                    }
                                    break;
                                case ":crashme":
                                case ":resethunt":
                                case ":wiredreset":
                                case ":ss":
                                case ":qss":
                                case ":gd":
                                    break;
                                case ":csmm":
                                    if (this._container.sessionDataManager.hasSecurity(4)) {
                                        this._container.gameManager.generateChecksumMismatch();
                                        return null;
                                    }
                                    break;
                                case ":tgl":
                                case ":li":
                                    break;
                                case ":kick":
                                    if (!this.container.sessionDataManager.hasSecurity(4)) {
                                        if (this._container.roomSession.roomControllerLevel >= 1) {
                                            _loc13_ = this._container.roomSession.userDataManager.getUserDataByName(_loc33_);
                                            if (_loc13_) {
                                                this._container.roomSession.kickUser(_loc13_.webID);
                                            }
                                        }
                                        return null;
                                    }
                                    break;
                                case ":shutup":
                                case ":mute":
                                    if (!this._container.sessionDataManager.hasSecurity(4)) {
                                        if (this._container.roomSession.roomControllerLevel >= 1) {
                                            _loc20_ = this._container.roomSession.userDataManager.getUserDataByName(_loc33_);
                                            if (_loc20_) {
                                                this._container.roomSession.muteUser(_loc20_.webID, 2);
                                            }
                                        }
                                        return null;
                                    }
                                    break;
                                case ":link":
                                case ":q":
                                case "o/":
                                case "_o/":
                                    this._container.roomSession.sendAvatarExpressionMessage(AvatarExpressionEnum.WAVE.ordinal);
                                    return null;
                                case ":idle":
                                    this._container.roomSession.sendAvatarExpressionMessage(AvatarExpressionEnum._SafeStr_4392.ordinal);
                                    HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "chat", "idle");
                                    return null;
                                case "_b":
                                    this._container.roomSession.sendAvatarExpressionMessage(AvatarExpressionEnum.RESPECT.ordinal);
                                    HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "chat", "respect");
                                    return null;
                                case ":showfps":
                                    this._container.roomEngine.setFpsCounterEnabled(true);
                                    return null;
                                case ":fps":
                                    (asInstanceOf(this._container.roomEngine, Component)).context.displayObjectContainer.stage.frameRate = Number(_loc33_) | 0;
                                    return null;
                                case ":sign":
                                    this._container.roomSession.sendSignMessage(Number(_loc33_) | 0);
                                    HabboTracking.getInstance().trackEventLog("OwnAvatarMenu", "chat", "sign", null, Number(_loc33_) | 0);
                                    return null;
                                case ":drop":
                                case ":dropitem":
                                    _loc27_ = new RoomWidgetRequestWidgetMessage("RWUAM_DROP_CARRY_ITEM");
                                    this._container.processWidgetMessage(_loc27_);
                                    return null;
                                case ":chooser":
                                    if (!this._container.roomEngine.activeRoomHasChooserDisabled || this._container.roomSession.roomControllerLevel >= 1) {
                                        _loc27_ = new RoomWidgetRequestWidgetMessage("RWRWM_USER_CHOOSER");
                                        this._container.processWidgetMessage(_loc27_);
                                    }
                                    return null;
                                case ":furni":
                                    if (this._container.roomSession.roomControllerLevel >= 1 || this._container.sessionDataManager.hasSecurity(2) || this._container.sessionDataManager.isAmbassador) {
                                        _loc27_ = new RoomWidgetRequestWidgetMessage("RWRWM_FURNI_CHOOSER");
                                        this._container.processWidgetMessage(_loc27_);
                                    }
                                    return null;
                                case ":pickall":
                                    this._container.sessionDataManager.pickAllFurniture(this._container.roomSession.roomId);
                                    return null;
                                case ":pickallbc":
                                    this._container.sessionDataManager.pickAllBuilderFurniture(this._container.roomSession.roomId);
                                    return null;
                                case ":resetscores":
                                    this._container.sessionDataManager.resetScores(this._container.roomSession.roomId);
                                    return null;
                                case ":ejectall":
                                    this._container.sessionDataManager.ejectAllFurniture(this._container.roomSession.roomId, _loc7_);
                                    return null;
                                case ":ejectpets":
                                    this._container.sessionDataManager.ejectPets(this._container.roomSession.roomId);
                                    return null;
                                case ":reload":
                                    if (this._container.roomSession.roomControllerLevel >= 4 || this._container.sessionDataManager.hasSecurity(5)) {
                                        this._container.windowManager.confirm("${wiredmenu.settings.room_state.reload}", "${wiredmenu.settings.room_state.reload.warning}", 0, this.onReloadConfirmed);
                                    }
                                    return null;
                                case ":rollback":
                                    if (this._container.roomSession.roomControllerLevel >= 4 || this._container.sessionDataManager.hasSecurity(5)) {
                                        this._container.windowManager.confirm("${wiredmenu.settings.room_state.roll_back}", "${wiredmenu.settings.room_state.roll_back.warning}", 0, this.onRollbackConfirmed).titleBarColor = 13909337;
                                    }
                                    return null;
                                case ":moonwalk":
                                    this._container.sessionDataManager.sendSpecialCommandMessage(":moonwalk");
                                    return null;
                                case ":habnam":
                                    this._container.sessionDataManager.sendSpecialCommandMessage(":habnam");
                                    return null;
                                case ":yyxxabxa":
                                    this._container.sessionDataManager.sendSpecialCommandMessage(":yyxxabxa");
                                    return null;
                                case ":mutepets":
                                    this._container.sessionDataManager.sendSpecialCommandMessage(":mutepets");
                                    return null;
                                case ":mpgame":
                                    this._container.sessionDataManager.sendSpecialCommandMessage(_loc7_);
                                    return null;
                                case ":ignore":
                                    if (_loc33_) {
                                        _loc12_ = this._container.roomSession.userDataManager.getUserDataByName(_loc33_);
                                        if (_loc12_) {
                                            this._container.sessionDataManager.ignoreUser(_loc12_.webID);
                                        }
                                    }
                                    return null;
                                case ":unignore":
                                    if (_loc33_) {
                                        _loc23_ = this._container.roomSession.userDataManager.getUserDataByName(_loc33_);
                                        if (_loc23_) {
                                            this._container.sessionDataManager.unignoreUser(_loc23_.webID);
                                        }
                                    }
                                    return null;
                                case ":floor":
                                case ":bcfloor":
                                    if (this._container.roomSession.roomControllerLevel >= 3) {
                                        this._container.windowManager.displayFloorPlanEditor();
                                    }
                                    return null;
                                case ":lang":
                                    (asGuarded(this._container.localization, isICoreLocalizationManager)).activateLocalizationDefinition(_loc33_);
                                    return null;
                                case ":uc":
                                    if (this._container.sessionDataManager.hasSecurity(4)) {
                                        if (_loc33_ == "hotel") {
                                            this._container.roomSession.sendPeerUsersClassificationMessage(stringOrNull(_loc32_[2]));
                                        } else {
                                            this._container.roomSession.sendRoomUsersClassificationMessage(_loc33_);
                                        }
                                    }
                                    return null;
                                case ":anew":
                                    if (this._container.sessionDataManager.isAmbassador || this._container.sessionDataManager.hasSecurity(4)) {
                                        this._container.roomSession.sendRoomUsersClassificationMessage("new");
                                    }
                                    return null;
                                case ":avisit":
                                    if (this._container.sessionDataManager.isAmbassador || this._container.sessionDataManager.hasSecurity(4)) {
                                        if ("group" == _loc33_) {
                                            (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("navigator/goto/predefined_group_lobby");
                                        } else {
                                            (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("navigator/goto/predefined_noob_lobby");
                                        }
                                    }
                                    return null;
                                case ":aalert":
                                    if (this._container.sessionDataManager.isAmbassador || this._container.sessionDataManager.hasSecurity(4)) {
                                        _loc30_ = this._container.roomSession.userDataManager.getUserDataByName(_loc33_);
                                        if (_loc30_) {
                                            this._container.roomSession.ambassadorAlert(_loc30_.webID);
                                        }
                                    }
                                    return null;
                                case ":visit":
                                    this._container.roomSession.sendVisitUserMessage(_loc33_);
                                    return null;
                                case ":roomid":
                                    this._container.roomSession.sendVisitFlatMessage(parseInt(_loc33_) | 0);
                                    return null;
                                case ":zoom":
                                    this._container.roomEngine.events.dispatchEvent(new RoomEngineZoomEvent(this._container.roomEngine.activeRoomId, Number(_loc33_)));
                                    return null;
                                case ":cam":
                                case ":camera":
                                    if (this._container.sessionDataManager.isPerkAllowed("CAMERA")) {
                                        _loc16_ = new HabboToolbarEvent("HTE_ICON_CAMERA");
                                        _loc16_.iconName = "chatCameraCommand";
                                        this._container.toolbar.events.dispatchEvent(_loc16_);
                                    }
                                    return null;
                                case ":fs":
                                case ":fullscreen":
                                    this._container.windowManager.toggleFullScreen();
                                    return null;
                                case ":screenshot":
                                    _loc8_ = this._container.navigator.enteredGuestRoomData;
                                    if (_loc8_) {
                                        _loc4_ = _loc8_.roomName;
                                    }
                                    if (_loc4_ == null || _loc4_.length == 0) {
                                        _loc2_ = new Date();
                                        _loc28_ = [_loc2_.getFullYear(), _loc2_.getMonth(), _loc2_.getDate()].join("-") + " " + [_loc2_.getHours(), _loc2_.getMinutes(), _loc2_.getSeconds()].join(".");
                                        _loc4_ = "Habbo " + _loc28_;
                                    }
                                    this._container.roomEngine.createScreenShot(this._container.roomSession.roomId, this._container.getFirstCanvasId(), _loc4_ + ".png");
                                    return null;
                                case ":iddqd":
                                    this._container.roomEngine.events.dispatchEvent(new RoomEngineZoomEvent(this._container.roomEngine.activeRoomId, -1, true));
                                    return null;
                                case ":hidemouse":
                                    if (this._SafeStr_5393) {
                                        Mouse.hide();
                                        this._container.roomEngine.setTileCursorState(this._container.roomEngine.activeRoomId, 0);
                                    } else {
                                        Mouse.show();
                                        this._container.roomEngine.setTileCursorState(this._container.roomEngine.activeRoomId, 1);
                                    }
                                    this._container.roomEngine.toggleTileCursorVisibility(this._container.roomEngine.activeRoomId, !this._SafeStr_5393);
                                    this._SafeStr_5393 = !this._SafeStr_5393;
                                    return null;
                                case ":wf":
                                case ":wired":
                                    (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("wiredmenu/open");
                                    return null;
                                case ":var":
                                case ":variables":
                                    (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("wiredmenu/open/variable_overview");
                                    return null;
                                case ":inspect":
                                case ":inspection":
                                    (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("wiredmenu/open/inspection");
                                    return null;
                                case ":playtest":
                                    this._container.userDefinedRoomEvents.switchPlayTestMode();
                                    return null;
                                case ":donate":
                                    (asInstanceOf(this._container.roomEngine, Component)).context.createLinkEvent("selfdonation/open");
                                    return null;
                                case ":demonictriggers":
                                    _loc11_ = this._container.roomEngine.getObjectsByCategory(10);
                                    this._demonicTriggers = !this._demonicTriggers;
                                    _loc29_ = [];
                                    if (this._demonicTriggers) {
                                        _loc19_ = [-1, 0, 0, 0, 255, 0, -1, 0, 0, 255, 0, 0, -1, 0, 255, 0, 0, 0, 1, 0];
                                        _loc29_ = [new ColorMatrixFilter(_loc19_)];
                                    }
                                    for (const _loc35_ of _loc11_ ?? []) {
                                        _loc17_ = _loc35_.getModel().getNumber("furniture_type_id") | 0;
                                        _loc15_ = this._container.sessionDataManager.getFloorItemData(_loc17_);
                                        if (_loc15_.className.indexOf("wf_trg_") == 0) {
                                            _loc5_ = asGuarded(_loc35_.getVisualization(), isIRoomObjectSpriteVisualization);
                                            _loc24_ = 0;
                                            while (_loc24_ < _loc5_.spriteCount) {
                                                _loc14_ = _loc5_.getSprite(_loc24_);
                                                if (_loc14_.blendMode != "add") {
                                                    _loc14_.filters = _loc29_;
                                                }
                                                _loc24_++;
                                            }
                                        }
                                    }
                                    return null;
                            }
                        }
                        _loc21_ = _loc26_.styleId;
                        if (this._container != null && this._container.roomSession != null) {
                            if (this._container.freeFlowChat != null) {
                                if (this._container.freeFlowChat.preferedChatStyle != _loc26_.styleId && _loc26_.styleId != -1) {
                                    this._container.freeFlowChat.preferedChatStyle = _loc26_.styleId;
                                }
                                _loc21_ = this._container.freeFlowChat.preferedChatStyle;
                            }
                            switch (_loc26_.chatType) {
                                case 0:
                                    this._container.roomSession.sendChatMessage(_loc7_, _loc21_);
                                    break;
                                case 1:
                                    this._container.roomSession.sendWhisperMessage(_loc26_.recipientName, _loc7_, _loc21_);
                                    break;
                                case 2:
                                    this._container.roomSession.sendShoutMessage(_loc7_, _loc21_);
                            }
                            HabboTracking.getInstance().trackEventLogOncePerSession("Tutorial", "interaction", "avatar.chat");
                        }
                    }
                }
                break;
            case "RWCSAM_MESSAGE_SELECT_AVATAR":
                _loc9_ = param1 instanceof RoomWidgetChatSelectAvatarMessage ? param1 : null;
                if (_loc9_ != null) {
                    this._container.roomEngine.selectAvatar(_loc9_.roomId, _loc9_.objectId);
                    _loc10_ = this._container.roomSession.userDataManager.getUserDataByIndex(_loc9_.objectId);
                    if (_loc10_ != null) {
                        this._container.moderation.userSelected(_loc10_.webID, _loc9_.userName);
                    }
                }
        }
        return null;
    }

    public getProcessedEvents(): any[] {
        return ["RSCE_FLOOD_EVENT", "hrwe_hide_room_widget", "FBE_BAR_RESIZE_EVENT", "SDTWE_PURCHASABLE_STYLES_UPDATED"];
    }

    public update(): void {
    }

    private onRollbackConfirmed = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK") {
            this._container.connection.send(new WiredUpdateRoomComposer(true));
        }
        param1.dispose();
    };

    private onReloadConfirmed = (param1: IAlertDialog, param2: WindowEvent): void => {
        if (param2.type == "WE_OK") {
            this._container.connection.send(new WiredUpdateRoomComposer(false));
        }
        param1.dispose();
    };

    public processEvent(param1: Event): void {
        let _loc3_: RoomSessionChatEvent = null;
        let _loc2_: number = 0;
        let _loc4_: FriendBarResizeEvent = null;
        let _loc5_: Event = null;
        if (this._container == null || this._container.events == null) {
            return;
        }
        switch (param1.type) {
            case "RSCE_FLOOD_EVENT":
                _loc3_ = param1 instanceof RoomSessionChatEvent ? param1 : null;
                _loc2_ = parseInt(_loc3_.text) | 0;
                _loc5_ = new RoomWidgetFloodControlEvent(_loc2_);
                break;
            case "FBE_BAR_RESIZE_EVENT":
                _loc4_ = param1 instanceof FriendBarResizeEvent ? param1 : null;
                this._widget.checkChatInputPosition();
                break;
            case "SDTWE_PURCHASABLE_STYLES_UPDATED":
                this._widget.refreshChatStyles();
                break;
            case "hrwe_hide_room_widget":
                this.handleHideWidgetEvent(param1 instanceof HideRoomWidgetEvent ? param1 : null);
                return;
        }
        if (this._container != null && this._container.events != null && _loc5_ != null) {
            this._container.events.dispatchEvent(_loc5_);
        }
    }

    private handleHideWidgetEvent(param1: HideRoomWidgetEvent): void {
        if (param1 && param1.widgetType == this.type) {
            this._widget.hide();
        }
    }

    get [IRoomWidgetHandler](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
