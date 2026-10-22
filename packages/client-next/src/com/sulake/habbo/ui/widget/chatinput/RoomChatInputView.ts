import { asGuarded, asInstanceOf, castGuarded, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ICloseButtonWindow } from '@/com/sulake/core/window/components/ICloseButtonWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { _SafeCls_6006 } from '@/com/sulake/habbo/catalog/habbicons/_SafeCls_6006';
import type { _SafeCls_6004 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6004';
import type { _SafeCls_6005 } from '@/com/sulake/habbo/communication/messages/incoming/habbicons/_SafeCls_6005';
import type { IHabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/IHabboFreeFlowChat';
import type { IChatStyle } from '@/com/sulake/habbo/freeflowchat/style/IChatStyle';
import type { HabboUnseenItemsUpdatedEvent } from '@/com/sulake/habbo/inventory/events/HabboUnseenItemsUpdatedEvent';
import type { ISessionDataManager } from '@/com/sulake/habbo/session/ISessionDataManager';
import type { RoomChatInputWidget } from '@/com/sulake/habbo/ui/widget/chatinput/RoomChatInputWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { InteractiveObject } from '@habbo-pixi/runtime/display/InteractiveObject';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { KeyboardEvent } from '@habbo-pixi/runtime/events/KeyboardEvent';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { TextField } from '@habbo-pixi/runtime/text/TextField';
import { TextFormat } from '@habbo-pixi/runtime/text/TextFormat';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isICloseButtonWindow } from '@/com/sulake/core/window/components/ICloseButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextFieldWindow } from '@/com/sulake/core/window/components/ITextFieldWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconAssetManager } from '@/com/sulake/habbo/habbicons/assets/HabbiconAssetManager';
import { HabbiconSelector } from '@/com/sulake/habbo/ui/widget/chatinput/habbiconselector/HabbiconSelector';
import { ChatStyleSelector } from '@/com/sulake/habbo/ui/widget/chatinput/styleselector/ChatStyleSelector';
import { RoomWidgetChatTypingMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChatTypingMessage';
import { MathUtils } from '@/com/sulake/habbo/utils/MathUtils';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';

export class RoomChatInputView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.chatinput::RoomChatInputView'); }

    private static readonly MARGIN_H: number = 12;
    private static readonly TOOLBAR_EXTRA_H: number = 100;
    private static readonly CHAT_HELP_INTERNAL_CLIENT_LINK: string = "habbopages/chat/commands";
    private static readonly _SafeStr_14723: string = "habbicons/open";

    declare private _widget: RoomChatInputWidget;

    declare private _window: IWindowContainer;

    declare private _SafeStr_2135: ITextFieldWindow;

    declare private _SafeStr_5590: IWindow;

    declare private _SafeStr_4113: IWindow;

    declare private _SafeStr_2504: ICloseButtonWindow;

    declare private _SafeStr_3327: IRegionWindow;

    private _SafeStr_4276: boolean = false;

    declare private _SafeStr_2213: IWindowContainer;

    declare private _SafeStr_14724: IWindowContainer;

    declare private _SafeStr_14725: IWindowContainer;

    declare private _SafeStr_14726: IWindow;

    declare private _SafeStr_14727: IBitmapWrapperWindow;

    declare private _SafeStr_14728: BitmapData;

    declare private _SafeStr_14729: number;
    static { (this.prototype as any)._SafeStr_14729 = 0; }

    declare private _SafeStr_14730: _SafeCls_6006;

    declare private _SafeStr_14731: boolean;
    static { (this.prototype as any)._SafeStr_14731 = false; }

    declare private _chatStyleMenuContainer: IWindowContainer;

    declare private _chatModeIdShout: string;

    declare private _SafeStr_4648: string;

    declare private _SafeStr_6009: string;

    private _SafeStr_4467: boolean = false;

    declare private _SafeStr_6701: TextFormat;

    private _isTyping: boolean = false;
    private _SafeStr_3430: boolean = false;

    declare private _SafeStr_2618: Timer;

    declare private _SafeStr_2696: Timer;

    declare private _SafeStr_2434: Timer;

    private _SafeStr_2567: string = "";

    declare private _SafeStr_2745: Timer;

    private _SafeStr_5769: boolean = false;

    declare private _SafeStr_2568: Timer;

    private _SafeStr_5245: number = 0;

    declare private _SafeStr_3258: Timer;

    declare private _SafeStr_3057: ChatStyleSelector;

    declare private _SafeStr_14732: HabbiconSelector;

    constructor(param1: RoomChatInputWidget) {
        let _loc3_: ICoreConfiguration = null;
        let _loc2_: number = 0;
        this._widget = param1;
        this._SafeStr_4648 = param1.localizations.getLocalization("widgets.chatinput.mode.whisper", ":tell");
        this._chatModeIdShout = param1.localizations.getLocalization("widgets.chatinput.mode.shout", ":shout");
        this._SafeStr_6009 = param1.localizations.getLocalization("widgets.chatinput.mode.speak", ":speak");
        this._SafeStr_2618 = new Timer(1000, 1);
        this._SafeStr_2618.addEventListener("timerComplete", this.onTypingTimerComplete);
        this._SafeStr_2696 = new Timer(10000, 1);
        this._SafeStr_2696.addEventListener("timerComplete", this.onIdleTimerComplete);
        this._SafeStr_5769 = this.sessionDataManager.isNoob || this.sessionDataManager.isRealNoob;
        if (this._SafeStr_5769) {
            _loc3_ = param1.handler.container.config;
            if (_loc3_.getProperty("nux.chat.reminder.shown") != "1") {
                _loc2_ = _loc3_.getInteger("nux.noob.chat.reminder.delay", 240);
                this._SafeStr_2434 = new Timer(_loc2_ * 1000, 1);
                this._SafeStr_2434.addEventListener("timerComplete", this.onNuxIdleTimerComplete);
                this._SafeStr_2434.start();
            }
        }
        this._SafeStr_6701 = new TextFormat(null, null, 10066329, null, true, false);
        this.createWindow();
    }

    private static isWindowInTree(param1: IWindow, param2: IWindow): boolean {
        while (param1 != null) {
            if (param1 == param2) {
                return true;
            }
            param1 = param1.parent;
        }
        return false;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._SafeStr_5769) {
            this.widget.windowManager.hideHint();
            this.widget.windowManager.unregisterHintWindow("nux_chat_reminder");
        }
        if (this._widget && this._widget.roomUi && this._widget.roomUi.inventory && this._widget.roomUi.inventory.events) {
            this._widget.roomUi.inventory.events.removeEventListener("HUIUE_UNSEEN_ITEMS_CHANGED", this.onUnseenItemsUpdated);
        }
        this.unregisterHabbiconButtonListeners();
        this.unregisterHabbiconAssetsListener();
        this.clearHabbiconButtonSetIcon();
        this._widget = null;
        if (this._SafeStr_2135) {
            this._SafeStr_2135.removeEventListener("WME_DOWN", this.windowMouseEventProcessor);
            this._SafeStr_2135.removeEventListener("WKE_KEY_DOWN", this.windowKeyEventProcessor);
            this._SafeStr_2135.removeEventListener("WKE_KEY_UP", this.keyUpHandler);
            this._SafeStr_2135.removeEventListener("WE_CHANGE", this.onInputChanged);
            this._SafeStr_2135.removeEventListener("WME_OVER", this.onInputHoverRegionMouseEvent);
            this._SafeStr_2135.removeEventListener("WME_OUT", this.onInputHoverRegionMouseEvent);
            this._SafeStr_2135 = null;
        }
        this._SafeStr_5590 = null;
        this._SafeStr_4113 = null;
        if (this._SafeStr_2504) {
            this._SafeStr_2504.removeEventListener("WME_CLICK", this.onHelpButtonMouseEvent);
            this._SafeStr_2504.removeEventListener("WME_OVER", this.onHelpButtonMouseEvent);
            this._SafeStr_2504.removeEventListener("WME_OUT", this.onHelpButtonMouseEvent);
            this._SafeStr_2504 = null;
        }
        if (this._SafeStr_3327) {
            this._SafeStr_3327.removeEventListener("WME_OVER", this.onInputHoverRegionMouseEvent);
            this._SafeStr_3327.removeEventListener("WME_OUT", this.onInputHoverRegionMouseEvent);
            this._SafeStr_3327 = null;
        }
        if (this._SafeStr_14726) {
            this._SafeStr_14726.removeEventListener("WME_CLICK", this.onHabbiconButtonMouseEvent);
            this._SafeStr_14726 = null;
        }
        this._SafeStr_14727 = null;
        this._chatStyleMenuContainer = null;
        if (this._SafeStr_14732) {
            this._SafeStr_14732.dispose();
            this._SafeStr_14732 = null;
        }
        if (this._SafeStr_2213 != null) {
            this._SafeStr_2213.dispose();
            this._SafeStr_2213 = null;
        }
        if (this._SafeStr_3057 != null) {
            this._SafeStr_3057.dispose();
            this._SafeStr_3057 = null;
        }
        if (this._SafeStr_2618 != null) {
            this._SafeStr_2618.reset();
            this._SafeStr_2618.removeEventListener("timerComplete", this.onTypingTimerComplete);
            this._SafeStr_2618 = null;
        }
        if (this._SafeStr_2696 != null) {
            this._SafeStr_2696.reset();
            this._SafeStr_2696.removeEventListener("timerComplete", this.onIdleTimerComplete);
            this._SafeStr_2696 = null;
        }
        if (this._SafeStr_2434 != null) {
            this._SafeStr_2434.reset();
            this._SafeStr_2434.removeEventListener("timerComplete", this.onNuxIdleTimerComplete);
            this._SafeStr_2434 = null;
        }
        if (this._SafeStr_2568 != null) {
            this._SafeStr_2568.reset();
            this._SafeStr_2568.removeEventListener("timerComplete", this.onChatReminderTimer);
            this._SafeStr_2568 = null;
        }
        if (this._SafeStr_2745) {
            this._SafeStr_2745.reset();
            this._SafeStr_2745.removeEventListener("timerComplete", this.onRemoveDimmer);
            this._SafeStr_2745 = null;
        }
        if (this._window) {
            this._window.procedure = null;
        }
        if (this._window && this._window.desktop) {
            this._window.desktop.removeChild(this._window);
        }
    }

    public release(): void {
        if (this._SafeStr_2618 != null) {
            this._SafeStr_2618.reset();
        }
        if (this._SafeStr_2696 != null) {
            this._SafeStr_2696.reset();
        }
        this._isTyping = false;
        this._SafeStr_3430 = false;
        this.stopHelpButtonHideTimer();
    }

    private createWindow(): void {
        if (this._SafeStr_2213 != null) {
            return;
        }
        let _loc2_: string = "chatinput_window_new";
        let _loc1_: XmlAsset = asInstanceOf(this._widget.assets.getAssetByName(_loc2_), XmlAsset);
        if (_loc1_ == null || _loc1_.content == null) {
            return;
        }
        this._window = asGuarded(this._widget.windowManager.buildFromXML(asInstanceOf(_loc1_.content, XML)), isIWindowContainer);
        this._window.width = this._window.desktop.width;
        this._window.height = this._window.desktop.height;
        this._window.invalidate();
        this._window.procedure = this.chatInputWindowProcedure;
        this._SafeStr_14724 = castGuarded(this._window.findChildByName("chatstyles_menu"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_14725 = castGuarded(this._window.findChildByName("habbicon_menu"), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2213 = asGuarded(this._window.findChildByName("bubblecont"), isIWindowContainer);
        this._SafeStr_2213.tags.push("room_widget_chatinput");
        this._SafeStr_2135 = asGuarded(this._SafeStr_2213.findChildByName("chat_input"), isITextFieldWindow);
        this._SafeStr_5590 = this._SafeStr_2213.findChildByName("input_border");
        this._SafeStr_14726 = this._SafeStr_2213.findChildByName("chat_extra_button");
        this._SafeStr_14727 = asGuarded(this._SafeStr_2213.findChildByName("chat_extra_set_icon"), isIBitmapWrapperWindow);
        if (this._SafeStr_14727) {
            this._SafeStr_14727.visible = false;
        }
        if (this._SafeStr_14726) {
            this._SafeStr_14726.visible = this.habbiconsEnabled();
            this._SafeStr_14726.addEventListener("WME_CLICK", this.onHabbiconButtonMouseEvent);
        }
        if (this._widget.roomUi && this._widget.roomUi.inventory && this._widget.roomUi.inventory.events) {
            this._widget.roomUi.inventory.events.addEventListener("HUIUE_UNSEEN_ITEMS_CHANGED", this.onUnseenItemsUpdated);
        }
        this._SafeStr_4113 = this._SafeStr_2213.findChildByName("block_text");
        this._SafeStr_3327 = castGuarded(this._SafeStr_2213.findChildByName("helpbutton_show_hover_region"), isIRegionWindow, "com.sulake.core.window.components.IRegionWindow");
        this._SafeStr_3327.addEventListener("WME_OVER", this.onInputHoverRegionMouseEvent);
        this._SafeStr_3327.addEventListener("WME_OUT", this.onInputHoverRegionMouseEvent);
        this.updatePosition();
        this._SafeStr_2135.setParamFlag(1, true);
        this._SafeStr_2135.addEventListener("WME_DOWN", this.windowMouseEventProcessor);
        this._SafeStr_2135.addEventListener("WKE_KEY_DOWN", this.windowKeyEventProcessor);
        this._SafeStr_2135.addEventListener("WKE_KEY_UP", this.keyUpHandler);
        this._SafeStr_2135.addEventListener("WE_CHANGE", this.onInputChanged);
        this._SafeStr_2135.addEventListener("WME_OVER", this.onInputHoverRegionMouseEvent);
        this._SafeStr_2135.addEventListener("WME_OUT", this.onInputHoverRegionMouseEvent);
        this._SafeStr_2135.toolTipDelay = 0;
        this._SafeStr_2135.toolTipIsDynamic = true;
        this._SafeStr_4467 = true;
        this._SafeStr_2135.setTextFormat(this._SafeStr_6701);
        this._SafeStr_2567 = "";
        this._window.addEventListener("WE_PARENT_RESIZED", this.updatePosition);
        this._window.addEventListener("WE_PARENT_ADDED", this.updatePosition);
        this.createOrUpdateChatStylesView();
        this.createOrUpdateHabbiconSelector();
        this.updateHabbiconUnseenCounter();
        this.createAndAttachDimmerWindow();
        this._SafeStr_2504 = castGuarded(this._window.findChildByName("helpbutton"), isICloseButtonWindow, "com.sulake.core.window.components.ICloseButtonWindow");
        this._SafeStr_2504.addEventListener("WME_CLICK", this.onHelpButtonMouseEvent);
        this._SafeStr_2504.addEventListener("WME_OVER", this.onHelpButtonMouseEvent);
        this._SafeStr_2504.addEventListener("WME_OUT", this.onHelpButtonMouseEvent);
        this._SafeStr_2504.visible = false;
    }

    public createOrUpdateChatStylesView(): void {
        let _loc5_: ISessionDataManager = null;
        let _loc6_: IHabboFreeFlowChat = null;
        let _loc1_: any[] = null;
        let _loc2_: any[] = null;
        let _loc3_: boolean = false;
        let _loc7_: IChatStyle = null;
        if (this.customChatStylesEnabled() && !this._widget.handler.container.roomSession.isGameSession && this._widget.handler.container.freeFlowChat != null && this._widget.handler.container.freeFlowChat.chatStyleLibrary != null) {
            _loc5_ = this._widget.handler.container.sessionDataManager;
            _loc6_ = this._widget.handler.container.freeFlowChat;
            _loc1_ = [];
            _loc2_ = this._widget.roomUi.getProperty("disabled.custom.chat.styles").split(",");
            _loc3_ = _loc5_.hasSecurity(4);
            for (const _loc4_ of _loc6_.chatStyleLibrary.getStyleIds() ?? []) {
                _loc7_ = _loc6_.chatStyleLibrary.getStyle(_loc4_ | 0);
                if (!_loc7_.isSystemStyle) {
                    if (this.isNftChatStyle(_loc4_ | 0)) {
                        if (_loc5_.hasNftChatStyle(_loc4_ | 0)) {
                            _loc1_.push(_loc4_);
                        }
                    } else {
                        if (this.isStaticStyle(_loc4_ | 0) && !_loc7_.purchasable) {
                            if (_loc7_.isStaffOverrideable && _loc3_) {
                                _loc1_.push(_loc4_);
                                continue;
                            }
                            if (_loc7_.isAmbassadorOnly && (_loc3_ || _loc5_.isAmbassador)) {
                                _loc1_.push(_loc4_);
                                continue;
                            }
                            if (_loc2_.indexOf(_loc4_.toString()) != -1) {
                                continue;
                            }
                            if (_loc7_.isHcOnly && _loc5_.hasClub) {
                                _loc1_.push(_loc4_);
                                continue;
                            }
                            if (!_loc7_.isHcOnly && !_loc7_.isAmbassadorOnly) {
                                _loc1_.push(_loc4_);
                                continue;
                            }
                        }
                        if (_loc5_.hasPurchasableChatStyle(_loc4_ | 0)) {
                            _loc1_.push(_loc4_);
                        }
                    }
                }
            }
            this.createChatStyleSelectorMenuItems(_loc1_);
        } else if (isIItemListWindow(this._SafeStr_2213.findChildByName("chat_input_container"))) {
            castGuarded(this._SafeStr_2213.findChildByName("chat_input_container"), isIItemListWindow, "com.sulake.core.window.components.IItemListWindow").removeListItemAt(0);
        }
    }

    private isNftChatStyle(param1: number): boolean {
        return param1 >= 1000 && param1 <= 9999;
    }

    private isPurchasableStyle(param1: number): boolean {
        return param1 >= 10000 && param1 <= 99999;
    }

    private isStaticStyle(param1: number): boolean {
        return param1 < 1000;
    }

    private customChatStylesEnabled(): boolean {
        return this._widget.roomUi.getBoolean("custom.chat.styles.enabled");
    }

    private createAndAttachDimmerWindow(): void {
        let _loc1_: IWindow = null;
        if (RoomEnterEffect.isRunning()) {
            _loc1_ = this._widget.windowManager.createWindow("chat_dimmer", "", 30, 1, (0x80 | 0x0800 | 1) >>> 0, new Rectangle(0, 0, this._SafeStr_2213.width, this._SafeStr_2213.height), null, 0);
            _loc1_.color = 0;
            _loc1_.blend = 0.3;
            this._SafeStr_2213.addChild(_loc1_);
            this._SafeStr_2213.invalidate();
            if (this._SafeStr_2745 == null) {
                this._SafeStr_2745 = new Timer(RoomEnterEffect.totalRunningTime, 1);
                this._SafeStr_2745.addEventListener("timerComplete", this.onRemoveDimmer);
                this._SafeStr_2745.start();
            }
        }
    }

    private onRemoveDimmer = (param1: TimerEvent): void => {
        this._SafeStr_2745.removeEventListener("timerComplete", this.onRemoveDimmer);
        this._SafeStr_2745 = null;
        let _loc2_: IWindow = this._SafeStr_2213.findChildByName("chat_dimmer");
        if (_loc2_ != null) {
            this._SafeStr_2213.removeChild(_loc2_);
            this._widget.windowManager.destroy(_loc2_);
        }
    };

    public updatePosition = (param1: WindowEvent = null, param2: number = 10000, param3: number = 10000): void => {
        this._window.width = this._window.desktop.width;
        this._window.height = this._window.desktop.height;
        let _loc11_: Point = new Point();
        if (!this._SafeStr_2213) {
            return;
        }
        let _loc6_: number = this.widget.getToolBarWidth();
        let _loc8_: number = this.widget.getFriendBarWidth();
        let _loc7_: number = this._window.desktop.width / 2 - this._SafeStr_2213.width / 2 | 0;
        let _loc9_: number = 0;
        let _loc10_: number = this._SafeStr_2213.width + 12;
        let _loc5_: boolean = this._window.desktop.width - _loc6_ - _loc8_ > _loc10_;
        let _loc4_: boolean = _loc5_ && _loc7_ >= _loc6_ + 12 + 100 && _loc7_ + this._SafeStr_2213.width <= this._window.desktop.width - _loc8_;
        if (_loc4_) {
            _loc9_ = _loc7_;
            this._SafeStr_2213.y = this._window.desktop.height - 104;
        } else {
            _loc9_ = this.widget.getRoomToolsWidth() + 12;
            this._SafeStr_2213.y = this._window.desktop.height - 160;
        }
        this._SafeStr_2213.x = Math.max(_loc7_, _loc9_) | 0;
        if (this._SafeStr_3057) {
            this._SafeStr_3057.alignMenuToSelector();
        }
        if (this._SafeStr_14732) {
            this._SafeStr_14732.alignToAnchor();
        }
    };

    private onSend(param1: WindowMouseEvent): void {
        if (!this._SafeStr_4467) {
            this.sendChatFromInputField();
        }
    }

    public hideFloodBlocking(): void {
        this._SafeStr_2135.visible = true;
        this._SafeStr_4113.visible = false;
    }

    public showFloodBlocking(): void {
        this._SafeStr_2135.visible = false;
        this._SafeStr_4113.visible = true;
    }

    public updateBlockText(param1: number): void {
        this._SafeStr_4113.caption = this._widget.localizations.registerParameter("chat.input.alert.flood", "time", param1.toString());
    }

    public displaySpecialChatMessage(param1: string, param2: string = ""): void {
        if (this._SafeStr_2213 == null || this._SafeStr_2135 == null) {
            return;
        }
        this._SafeStr_2135.enable();
        this._SafeStr_2135.selectable = true;
        this._SafeStr_2135.text = "";
        this.setInputFieldFocus();
        this._SafeStr_2135.text += param1 + " ";
        if (param2.length > 0) {
            this._SafeStr_2135.text += param2 + " ";
        }
        this._SafeStr_2135.setSelection(this._SafeStr_2135.text.length, this._SafeStr_2135.text.length);
        this._SafeStr_2567 = this._SafeStr_2135.text;
    }

    private windowMouseEventProcessor = (param1: WindowEvent = null, param2: IWindow = null): void => {
        this.setInputFieldFocus();
    };

    private chatInputWindowProcedure = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type == "WME_CLICK") {
            this.hideSelectorsIfClickOutside(param2);
        } else if (param1.type == "WME_CLICK_AWAY") {
            this.hideSelectorsIfClickOutside(param1.related);
        }
    };

    private hideSelectorsIfClickOutside(param1: IWindow): void {
        if (this._SafeStr_14732 != null && this._SafeStr_14732.visible && !RoomChatInputView.isWindowInTree(param1, this._SafeStr_14726) && !this._SafeStr_14732.containsWindow(param1)) {
            this._SafeStr_14732.hide();
            this.updateHabbiconUnseenCounter();
        }
        if (this._SafeStr_3057 != null && this._SafeStr_3057.visible && !this._SafeStr_3057.containsWindow(param1)) {
            this._SafeStr_3057.hide();
        }
    }

    private windowKeyEventProcessor = (param1: WindowEvent = null, param2: IWindow = null): void => {
        let _loc7_: any = 0;
        let _loc3_: boolean = false;
        let _loc6_: WindowKeyboardEvent = null;
        let _loc4_: KeyboardEvent = null;
        let _loc8_: string = null;
        let _loc5_: any[] = null;
        if (this._SafeStr_2213 == null || this._widget == null || this._widget.floodBlocked) {
            return;
        }
        if (this.anotherFieldHasFocus()) {
            return;
        }
        this.setInputFieldFocus();
        if (param1 instanceof WindowKeyboardEvent) {
            _loc6_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
            _loc7_ = _loc6_.charCode;
            _loc3_ = _loc6_.shiftKey;
        }
        if (param1 instanceof KeyboardEvent) {
            _loc4_ = param1 instanceof KeyboardEvent ? param1 : null;
            _loc7_ = _loc4_.charCode;
            _loc3_ = _loc4_.shiftKey;
        }
        if (_loc4_ == null && _loc6_ == null) {
            return;
        }
        if (_loc7_ == 32) {
            this.checkSpecialKeywordForInput();
        }
        if (_loc7_ == 13) {
            this.sendChatFromInputField(_loc3_);
            this.setButtonPressedState(true);
        }
        if (_loc7_ == 8) {
            if (this._SafeStr_2135 != null) {
                _loc8_ = this._SafeStr_2135.text;
                _loc5_ = _loc8_.split(" ");
                if (_loc5_[0] == this._SafeStr_4648 && _loc5_.length == 3 && _loc5_[2] == "") {
                    this._SafeStr_2135.text = "";
                    this._SafeStr_2567 = "";
                }
            }
        }
    };

    private keyUpHandler = (param1: WindowKeyboardEvent): void => {
        if (param1.keyCode == 13) {
            this.setButtonPressedState(false);
        }
    };

    private setButtonPressedState(param1: boolean): void {
    }

    private onInputChanged = (param1: WindowEvent): void => {
        let _loc2_: ITextFieldWindow = asGuarded(param1.window, isITextFieldWindow);
        if (_loc2_ == null) {
            return;
        }
        this._SafeStr_2696.reset();
        let _loc3_: boolean = _loc2_.text.length == 0;
        if (_loc3_) {
            this._isTyping = false;
            this._SafeStr_2618.start();
        } else {
            if (_loc2_.text.length > this._SafeStr_2567.length + 1) {
                if (this._widget.allowPaste) {
                    this._widget.setLastPasteTime();
                } else {
                    _loc2_.text = "";
                }
            }
            this._SafeStr_2567 = _loc2_.text;
            if (!this._isTyping) {
                this._isTyping = true;
                this._SafeStr_2618.reset();
                this._SafeStr_2618.start();
            }
            this._SafeStr_2696.start();
            if (this._SafeStr_2434 != null) {
                this._SafeStr_2434.reset();
                this._SafeStr_2434 = null;
            }
        }
    };

    private checkSpecialKeywordForInput(): void {
        if (this._SafeStr_2135 == null || this._SafeStr_2135.text == "") {
            return;
        }
        let _loc2_: string = this._SafeStr_2135.text;
        let _loc1_: string = this._widget.selectedUserName;
        if (_loc2_ == this._SafeStr_4648) {
            if (_loc1_.length > 0) {
                this._SafeStr_2135.text += " " + this._widget.selectedUserName;
                this._SafeStr_2135.setSelection(this._SafeStr_2135.text.length, this._SafeStr_2135.text.length);
                this._SafeStr_2567 = this._SafeStr_2135.text;
            }
        }
    }

    private onIdleTimerComplete = (param1: TimerEvent): void => {
        if (this._isTyping) {
            this._SafeStr_3430 = false;
        }
        this._isTyping = false;
        this.sendTypingMessage();
    };

    private onNuxIdleTimerComplete = (param1: TimerEvent): void => {
        if (this._SafeStr_2434 != null) {
            this._SafeStr_2434.reset();
            this._SafeStr_2434.removeEventListener("timerComplete", this.onNuxIdleTimerComplete);
            this._SafeStr_2434 = null;
        }
        this.highlightChatInput();
    };

    private onTypingTimerComplete = (param1: TimerEvent): void => {
        if (this._isTyping) {
            this._SafeStr_3430 = true;
        }
        this.sendTypingMessage();
    };

    private sendTypingMessage(): void {
        if (this._widget == null) {
            return;
        }
        if (this._widget.messageListener == null) {
            return;
        }
        if (this._widget.handler == null || this._widget.handler.container == null || this._widget.handler.container.roomSession == null) {
            return;
        }
        if (this._widget.floodBlocked) {
            return;
        }
        let _loc1_: RoomWidgetChatTypingMessage = new RoomWidgetChatTypingMessage(this._isTyping);
        this._widget.messageListener.processWidgetMessage(_loc1_);
    }

    private highlightChatInput(): void {
        this._SafeStr_2135.text = this.widget.localizations.getLocalization("widgets.chatinput.mode.remind.noobie");
        this._SafeStr_2568 = new Timer(500);
        this._SafeStr_2568.addEventListener("timer", this.onChatReminderTimer);
        this._SafeStr_2568.start();
        this.widget.windowManager.registerHintWindow("nux_chat_reminder", this._SafeStr_2135);
        this.widget.windowManager.showHint("nux_chat_reminder");
    }

    private onChatReminderTimer = (param1: TimerEvent): void => {
        this._SafeStr_5245 = this._SafeStr_5245 + 1;
        if (this._SafeStr_5245 % 2 != 0) {
            this._widget.mainWindow.y -= 1;
        } else {
            this._widget.mainWindow.y += 1;
        }
        if (this._SafeStr_5245 >= 10) {
            this._SafeStr_2568.reset();
            this._SafeStr_2568 = null;
            this._widget.mainWindow.y = 0;
            this.chatBarReminderShown();
        }
    };

    private chatBarReminderShown(): void {
        this.widget.handler.container.config.setProperty("nux.chat.reminder.shown", "1");
        if (this._SafeStr_2568 != null) {
            this._SafeStr_2568.reset();
        }
        this.widget.windowManager.hideHint();
        this.widget.windowManager.unregisterHintWindow("nux_chat_reminder");
    }

    private setInputFieldFocus(): void {
        if (this._SafeStr_2135 == null) {
            return;
        }
        if (this._SafeStr_2568 != null) {
            this.chatBarReminderShown();
        }
        if (this._SafeStr_4467) {
            this._SafeStr_2135.text = "";
            this._SafeStr_2135.textColor = 0;
            this._SafeStr_2135.italic = false;
            this._SafeStr_4467 = false;
            this._SafeStr_2567 = "";
        }
        this._SafeStr_2135.focus();
    }

    public setInputFieldColor(param1: number): void {
        if (this._SafeStr_2135 == null) {
            return;
        }
        this._SafeStr_2135.textColor = param1;
        this._SafeStr_2135.defaultTextFormat.color = param1;
    }

    private sendChatFromInputField(param1: boolean = false): void {
        if (this._SafeStr_2135 == null || this._SafeStr_2135.text == "") {
            return;
        }
        let _loc7_: number = param1 ? 2 : 0;
        let _loc6_: string = this._SafeStr_2135.text;
        let _loc4_: any[] = _loc6_.split(" ");
        let _loc2_: string = "";
        let _loc5_: string = "";
        switch (_loc4_[0]) {
            case this._SafeStr_4648:
                _loc7_ = 1;
                _loc2_ = stringOrNull(_loc4_[1]);
                _loc5_ = this._SafeStr_4648 + " " + _loc2_ + " ";
                _loc4_.shift();
                _loc4_.shift();
                break;
            case this._chatModeIdShout:
                _loc7_ = 2;
                _loc4_.shift();
                break;
            case this._SafeStr_6009:
                _loc7_ = 0;
                _loc4_.shift();
        }
        _loc6_ = _loc4_.join(" ");
        let _loc3_: number = 0;
        if (this.customChatStylesEnabled() && this._SafeStr_3057 != null) {
            _loc3_ = this._SafeStr_3057.selectedStyleId;
        }
        if (this._widget != null) {
            if (this._SafeStr_2618.running) {
                this._SafeStr_2618.reset();
            }
            if (this._SafeStr_2696.running) {
                this._SafeStr_2696.reset();
            }
            this._widget.sendChat(_loc6_, _loc7_, _loc2_, _loc3_);
            this._isTyping = false;
            if (this._SafeStr_3430) {
                this.sendTypingMessage();
            }
            this._SafeStr_3430 = false;
        }
        if (this._SafeStr_2135 != null) {
            this._SafeStr_2135.text = _loc5_;
        }
        this._SafeStr_2567 = _loc5_;
    }

    private anotherFieldHasFocus(): boolean {
        let _loc3_: Stage = null;
        let _loc2_: InteractiveObject = null;
        if (this._SafeStr_2135 != null) {
            if (this._SafeStr_2135.focused) {
                return false;
            }
        }
        let _loc1_: DisplayObject = this._SafeStr_2213.context.getDesktopWindow().getDisplayObject();
        if (_loc1_ != null) {
            _loc3_ = _loc1_.stage;
            if (_loc3_ != null) {
                _loc2_ = _loc3_.focus;
                if (_loc2_ == null) {
                    return false;
                }
                if (_loc2_ instanceof TextField) {
                    return true;
                }
            }
        }
        return false;
    }

    public get sessionDataManager(): ISessionDataManager {
        return this._widget.handler.container.sessionDataManager;
    }

    private createChatStyleSelectorMenuItems(param1: any[]): void {
        let _loc4_: number = 0;
        let _loc2_: number = 0;
        if (!this._SafeStr_3057) {
            this._SafeStr_3057 = new ChatStyleSelector(this, castGuarded(this._SafeStr_2213.findChildByName("styles"), isIWindowContainer, "com.sulake.core.window.IWindowContainer"), this.sessionDataManager);
            this._SafeStr_3057.gridColumns = MathUtils.clamp(param1.length / 6 + 1, 4, 6) | 0;
        } else {
            this._SafeStr_3057.clear();
        }
        _loc4_ = param1.length - 1;
        while (_loc4_ >= 0) {
            _loc2_ = param1[_loc4_] | 0;
            this._SafeStr_3057.addItem(_loc2_, this._widget.handler.container.freeFlowChat.chatStyleLibrary.getStyle(_loc2_).selectorPreview);
            _loc4_--;
        }
        this._SafeStr_3057.initSelection();
        let _loc3_: number = this._widget.handler.container.freeFlowChat.chatFontSizeMode;
        this._SafeStr_3057.initFontSizeSelection(_loc3_);
    }

    public get widget(): RoomChatInputWidget {
        return this._widget;
    }

    public get chatStyleMenuContainer(): IWindowContainer {
        return this._SafeStr_14724;
    }

    public getChatInputY(): number {
        if (!this._window || !this._window.findChildByName("chat_input_container")) {
            return 0;
        }
        let _loc1_: Point = new Point();
        this._window.findChildByName("chat_input_container").getGlobalPosition(_loc1_);
        return _loc1_.y | 0;
    }

    public getChatWindowElements(): any[] {
        return [this._SafeStr_2213, this._SafeStr_2135];
    }

    private onHelpButtonMouseEvent = (param1: WindowMouseEvent): void => {
        if (param1.type == "WME_CLICK") {
            this._widget.roomUi.context.createLinkEvent("habbopages/chat/commands");
        }
        if (param1.type == "WME_OVER") {
            this._SafeStr_2504.visible = true;
            this._SafeStr_4276 = true;
            this.stopHelpButtonHideTimer();
        } else if (param1.type == "WME_OUT") {
            this._SafeStr_4276 = false;
            this.startHelpButtonHideTimer();
        }
    };

    private onHabbiconButtonMouseEvent = (param1: WindowMouseEvent): void => {
        if (!this.habbiconsEnabled()) {
            return;
        }
        if (param1.type == "WME_CLICK") {
            if (this._SafeStr_14732) {
                this.hideChatStyleSelector();
                this._SafeStr_14732.toggle();
                this.updateHabbiconUnseenCounter();
            } else {
                this.openHabbiconHub();
            }
        }
    };

    private createOrUpdateHabbiconSelector(): void {
        if (!this.habbiconsEnabled()) {
            if (this._SafeStr_14732) {
                this._SafeStr_14732.dispose();
                this._SafeStr_14732 = null;
            }
            if (this._SafeStr_14725) {
                this._SafeStr_14725.visible = false;
            }
            this.unregisterHabbiconButtonListeners();
            this.unregisterHabbiconAssetsListener();
            this.clearHabbiconButtonSetIcon();
            return;
        }
        this.registerHabbiconButtonListeners();
        this.registerHabbiconAssetsListener();
        if (this._SafeStr_14732 == null && this._SafeStr_14726 && this._SafeStr_14725) {
            this._SafeStr_14732 = new HabbiconSelector(this, this._SafeStr_14726, this._SafeStr_14725);
        }
        this.updateHabbiconUnseenCounter();
        this.updateHabbiconButtonSetIcon();
    }

    public openHabbiconHub(): void {
        if (!this.habbiconsEnabled()) {
            return;
        }
        if (this.habbiconController != null) {
            this.habbiconController.resetUnseenHabbicons();
        }
        this.updateHabbiconUnseenCounter();
        this._widget.roomUi.context.createLinkEvent("habbicons/open");
    }

    public hideHabbiconSelector(): void {
        if (this._SafeStr_14732) {
            this._SafeStr_14732.hide();
        }
    }

    public hideChatStyleSelector(): void {
        if (this._SafeStr_3057 != null) {
            this._SafeStr_3057.hide();
        } else if (this._SafeStr_14724 != null) {
            this._SafeStr_14724.visible = false;
        }
    }

    public hideTransientSelectors(): void {
        this.hideHabbiconSelector();
        this.hideChatStyleSelector();
    }

    public insertHabbiconToken(param1: string): void {
        if (!this.habbiconsEnabled() || this._SafeStr_2135 == null || param1 == null || param1.length == 0) {
            return;
        }
        this.setInputFieldFocus();
        this._SafeStr_2135.text += param1;
        this._SafeStr_2135.setSelection(this._SafeStr_2135.text.length, this._SafeStr_2135.text.length);
        this._SafeStr_2567 = this._SafeStr_2135.text;
    }

    private habbiconsEnabled(): boolean {
        return this._widget != null && this._widget.roomUi != null && this._widget.roomUi.getBoolean("habbicons.enabled");
    }

    private onUnseenItemsUpdated = (param1: HabboUnseenItemsUpdatedEvent): void => {
        this.updateHabbiconUnseenCounter();
    };

    private registerHabbiconButtonListeners(): void {
        let _loc1_: _SafeCls_6006 = this.habbiconController;
        if (this._SafeStr_14730 == _loc1_) {
            return;
        }
        this.unregisterHabbiconButtonListeners();
        this._SafeStr_14730 = _loc1_;
        if (this._SafeStr_14730 != null) {
            this._SafeStr_14730.addEventListener("hce_owned_habbicons_updated", this.onHabbiconButtonDataUpdated);
            this._SafeStr_14730.addEventListener("hce_recent_habbicons_updated", this.onHabbiconButtonDataUpdated);
        }
    }

    private unregisterHabbiconButtonListeners(): void {
        if (this._SafeStr_14730 == null) {
            return;
        }
        this._SafeStr_14730.removeEventListener("hce_owned_habbicons_updated", this.onHabbiconButtonDataUpdated);
        this._SafeStr_14730.removeEventListener("hce_recent_habbicons_updated", this.onHabbiconButtonDataUpdated);
        this._SafeStr_14730 = null;
    }

    private registerHabbiconAssetsListener(): void {
        if (this._SafeStr_14731) {
            return;
        }
        HabbiconAssetManager.addEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        this._SafeStr_14731 = true;
    }

    private unregisterHabbiconAssetsListener(): void {
        if (!this._SafeStr_14731) {
            return;
        }
        HabbiconAssetManager.removeEventListener("habbicon_assets_loaded", this.onHabbiconAssetsLoaded);
        this._SafeStr_14731 = false;
    }

    private onHabbiconButtonDataUpdated = (param1: Event): void => {
        this.updateHabbiconButtonSetIcon();
    };

    private onHabbiconAssetsLoaded = (param1: Event): void => {
        this.updateHabbiconButtonSetIcon();
    };

    private updateHabbiconButtonSetIcon(): void {
        let _loc2_: number = 0;
        let _loc1_: BitmapData = null;
        if (this._SafeStr_14727 == null || !this.habbiconsEnabled()) {
            this.clearHabbiconButtonSetIcon();
            return;
        }
        _loc2_ = this.resolveHabbiconButtonSetIconCollectionId();
        if (_loc2_ <= 0) {
            this.clearHabbiconButtonSetIcon();
            return;
        }
        if (this._SafeStr_14729 == _loc2_ && this._SafeStr_14728 != null) {
            this._SafeStr_14727.visible = true;
            return;
        }
        _loc1_ = HabbiconAssetManager.getOutlinedCollectionIconBitmap(_loc2_);
        if (_loc1_ == null) {
            this.clearHabbiconButtonSetIcon();
            return;
        }
        this.setHabbiconButtonSetIconBitmap(_loc2_, _loc1_);
    }

    private setHabbiconButtonSetIconBitmap(param1: number, param2: BitmapData): void {
        let _loc3_: BitmapData = new BitmapData(param2.width, param2.height, true, 0);
        _loc3_.copyPixels(param2, param2.rect, new Point(0, 0), null, null, true);
        this.clearHabbiconButtonSetIcon();
        this._SafeStr_14729 = param1;
        this._SafeStr_14728 = _loc3_;
        this._SafeStr_14727.bitmap = this._SafeStr_14728;
        this._SafeStr_14727.visible = true;
        this._SafeStr_14727.invalidate();
    }

    private clearHabbiconButtonSetIcon(): void {
        let _loc1_: BitmapData = this._SafeStr_14728;
        this._SafeStr_14729 = 0;
        this._SafeStr_14728 = null;
        if (this._SafeStr_14727 != null) {
            this._SafeStr_14727.bitmap = null;
            this._SafeStr_14727.visible = false;
            this._SafeStr_14727.invalidate();
        }
        if (_loc1_ != null) {
            _loc1_.dispose();
        }
    }

    private resolveHabbiconButtonSetIconCollectionId(): number {
        let _loc2_: any[] = null;
        let _loc3_: number = 0;
        let _loc1_: _SafeCls_6006 = this.habbiconController;
        if (_loc1_ == null || !_loc1_.hasLoadedShopData) {
            return 0;
        }
        _loc2_ = _loc1_.recentHabbiconIds;
        if (_loc2_ != null && _loc2_.length > 0) {
            _loc3_ = this.resolveCollectionIdForHabbicon(_loc1_, _loc2_[0] | 0);
            if (_loc3_ > 0) {
                return _loc3_;
            }
        }
        return this.resolveDefaultHabbiconButtonCollectionId(_loc1_);
    }

    private resolveCollectionIdForHabbicon(param1: _SafeCls_6006, param2: number): number {
        let _loc3_: _SafeCls_6005 = null;
        let _loc4_: any = undefined;
        let _loc5_: any = null;
        if (param2 <= 0) {
            return 0;
        }
        _loc3_ = param1.tryGetShopItem(param2);
        if (_loc3_ != null && _loc3_.collectionId > 0) {
            return _loc3_.collectionId;
        }
        _loc4_ = param1.shopCollections;
        if (_loc4_ == null) {
            return 0;
        }
        for (_loc5_ of valuesOf(_loc4_)) {
            if (_loc5_ != null && _loc5_._SafeStr_14096 == param2) {
                return _loc5_.collectionId | 0;
            }
        }
        return 0;
    }

    private resolveDefaultHabbiconButtonCollectionId(param1: _SafeCls_6006): number {
        let _loc2_: _SafeCls_6004[] = param1.shopCollections;
        if (_loc2_ == null || _loc2_.length == 0) {
            return 0;
        }
        return _loc2_[0].collectionId;
    }

    private updateHabbiconUnseenCounter(): void {
        let _loc2_: number = 0;
        let _loc1_: _SafeCls_6006 = null;
        let _loc3_: IWindowContainer = null;
        let _loc4_: ITextWindow = null;
        if (this._SafeStr_14726 == null || !this.habbiconsEnabled()) {
            if (this._chatStyleMenuContainer != null) {
                this._chatStyleMenuContainer.visible = false;
            }
            return;
        }
        if (this._SafeStr_14732 != null && this._SafeStr_14732.visible) {
            if (this._chatStyleMenuContainer != null) {
                this._chatStyleMenuContainer.visible = false;
            }
            return;
        }
        _loc1_ = this.habbiconController;
        if (_loc1_ != null) {
            _loc2_ = _loc1_.unseenHabbiconCount;
        }
        if (this._chatStyleMenuContainer == null) {
            _loc3_ = isIWindowContainer(this._SafeStr_14726) ? this._SafeStr_14726 : null;
            if (_loc3_ == null) {
                return;
            }
            this._chatStyleMenuContainer = this._widget.windowManager.createUnseenItemCounter();
            _loc3_.addChild(this._chatStyleMenuContainer);
            this._chatStyleMenuContainer.x = _loc3_.width - this._chatStyleMenuContainer.width - 2;
            this._chatStyleMenuContainer.y = 2;
        }
        _loc4_ = asGuarded(this._chatStyleMenuContainer.findChildByName("count"), isITextWindow);
        if (_loc4_ != null) {
            _loc4_.caption = _loc2_.toString();
        }
        this._chatStyleMenuContainer.visible = _loc2_ > 0;
    }

    private get habbiconController(): _SafeCls_6006 {
        return this._widget != null && this._widget.roomUi != null ? this._widget.roomUi.habbiconController : null;
    }

    private onInputHoverRegionMouseEvent = (param1: WindowMouseEvent): void => {
        if (param1.type == "WME_OVER") {
            this._SafeStr_2504.visible = true;
            this.stopHelpButtonHideTimer();
        } else if (param1.type == "WME_OUT" && !this._SafeStr_4276) {
            this.startHelpButtonHideTimer();
        }
    };

    private startHelpButtonHideTimer(): void {
        if (this._SafeStr_3258 != null) {
            this.stopHelpButtonHideTimer();
        }
        this._SafeStr_3258 = new Timer(400);
        this._SafeStr_3258.addEventListener("timer", this.onHelpButtonHideTimer);
        this._SafeStr_3258.start();
    }

    private onHelpButtonHideTimer = (param1: TimerEvent): void => {
        if (!this._SafeStr_4276 && this._SafeStr_2504) {
            this._SafeStr_2504.visible = false;
        }
        this.stopHelpButtonHideTimer();
    };

    private stopHelpButtonHideTimer(): void {
        if (!this._SafeStr_3258) {
            return;
        }
        this._SafeStr_3258.stop();
        this._SafeStr_3258.removeEventListener("timer", this.onHelpButtonHideTimer);
        this._SafeStr_3258 = null;
    }
}
