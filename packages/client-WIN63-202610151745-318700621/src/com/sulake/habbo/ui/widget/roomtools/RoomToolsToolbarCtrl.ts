import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { System } from '@habbo-pixi/runtime/system/System';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { Component } from '@/com/sulake/core/runtime/Component.group';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WindowUtils } from '@/com/sulake/core/window/utils/WindowUtils';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { RoomWidgetZoomToggleMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetZoomToggleMessage';
import { RoomToolsCtrlBase } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsCtrlBase';
import { RoomToolsHistory } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsHistory';

export class RoomToolsToolbarCtrl extends RoomToolsCtrlBase implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomToolsToolbarCtrl'); }

    private static readonly TOOLBAR_EXPAND_TARGET_X: number = 1;
    private static readonly ANIMATION_DURATION_MS: number = 140;
    private static readonly ROOM_MOUSE_BLOCK_HANDLE_ID: string = "room_tools_toolbar";

    declare private _SafeStr_2547: RoomToolsHistory;

    private _disposed: boolean = false;
    private _SafeStr_2729: boolean = false;
    private _isRegisteredForUpdates: boolean = false;
    private _SafeStr_14595: number = 0;
    private _SafeStr_14596: number = 0;
    private _SafeStr_14597: number = 0;
    private _SafeStr_14240: number = 0;
    private _SafeStr_14598: boolean = false;
    private _lastZoomText: string = "";
    private _SafeStr_14599: boolean = false;
    private _SafeStr_14600: boolean = false;

    constructor(param1: RoomToolsWidget, param2: IHabboWindowManager, param3: IAssetLibrary) {
        super(param1, param2, param3);
        this._window = asGuarded(param2.buildFromXML(asInstanceOf(param3.getAssetByName("room_tools_toolbar_xml").content, XML)), isIWindowContainer);
        this._window.procedure = this.onWindowEvent;
        this._window.addEventListener("WME_OVER", this.onWindowEvent);
        this._window.addEventListener("WME_OUT", this.onWindowEvent);
        this._SafeStr_14595 = this.getCollapsedExpandedOffsetX();
        this.updateVisuals();
        this.ensureUpdateRegistration();
    }

    public override dispose(): void {
        if (this._disposed) {
            return;
        }
        this.removeUpdateRegistration();
        this.removeRoomMouseBlockRect();
        if (this._SafeStr_2547) {
            this._SafeStr_2547.dispose();
            this._SafeStr_2547 = null;
        }
        let _loc1_: IWindowContainer = asGuarded(this._widget.windowManager.getWindowByName("share_room_link"), isIWindowContainer);
        if (_loc1_) {
            _loc1_.dispose();
        }
        super.dispose();
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public updateRoomHistoryButtons(): void {
        if (this._widget.roomHistory.canGoForward()) {
            this._window.findChildByName("button_history_forward").enable();
        } else {
            this._window.findChildByName("button_history_forward").disable();
        }
        if (!this._widget.roomHistory.canGoBack()) {
            this._window.findChildByName("button_history_back").disable();
        } else {
            this._window.findChildByName("button_history_back").enable();
        }
        if (this._widget.roomHistory.length <= 1) {
            this._window.findChildByName("button_history").disable();
        } else {
            this._window.findChildByName("button_history").enable();
        }
        if (this._SafeStr_2547) {
            this._SafeStr_2547.populate(this._widget.roomHistory.getHistoryView());
            this.updatePosition();
        }
    }

    public disableRoomHistoryButtons(): void {
        this._window.findChildByName("button_history_forward").disable();
        this._window.findChildByName("button_history_back").disable();
    }

    private toggleHistory(): void {
        if (this._SafeStr_2547) {
            this._SafeStr_2547.dispose();
            this._SafeStr_2547 = null;
        } else {
            this._SafeStr_2547 = new RoomToolsHistory(this._windowManager, this._assets, this.handler);
            this._SafeStr_2547.populate(this._widget.roomHistory.getHistoryView());
            this.updatePosition();
        }
    }

    public release(): void {
        if (this._SafeStr_2547) {
            this.toggleHistory();
        }
    }

    public setChatHistoryButton(param1: boolean): void {
        this.setElementVisible("button_chat_history", param1);
    }

    public setAchievementsButton(param1: boolean): void {
        this.setElementVisible("button_achievements", param1);
    }

    public setCameraButton(param1: boolean): void {
        this.setElementVisible("button_camera", param1);
    }

    public setLikeButton(param1: boolean): void {
        this.setElementVisible("button_like", param1);
    }

    public override setElementVisible(param1: string, param2: boolean): void {
        if (!this._window) {
            return;
        }
        this._window.visible = true;
        super.setElementVisible(param1, param2);
        this.updatePosition();
    }

    public override set visible(param1: boolean) {
        if (this._window == null) {
            return;
        }
        this._window.visible = param1;
        if (param1) {
            this.updatePosition();
        } else {
            this.removeRoomMouseBlockRect();
        }
    }

    public updatePosition(): void {
        let _loc1_: number = 0;
        let _loc8_: number = 0;
        let _loc3_: IWindow = null;
        if (!this._window) {
            return;
        }
        let _loc9_: IItemListWindow = asGuarded(this._window.findChildByName("itemlist_buttons"), isIItemListWindow);
        let _loc2_: IWindow = this._window.findChildByName("window_bg");
        let _loc7_: IWindow = this._window.findChildByName("side_bar_collapse");
        let _loc4_: IWindow = this._window.findChildByName("side_bar_expand");
        let _loc5_: IWindow = this._window.findChildByName("button_collapse");
        let _loc11_: IWindow = this._window.findChildByName("button_expand");
        let _loc6_: IWindow = this._window.findChildByName("arrow_collapse");
        let _loc10_: IWindow = this._window.findChildByName("arrow_expand");
        if (_loc9_ != null && _loc2_ != null && _loc7_ != null && _loc4_ != null) {
            _loc1_ = 0;
            _loc8_ = 0;
            while (_loc8_ < _loc9_.numListItems) {
                _loc3_ = _loc9_.getListItemAt(_loc8_ >>> 0);
                if (_loc3_.visible) {
                    _loc1_ += _loc3_.height;
                }
                _loc8_++;
            }
            _loc7_.height = _loc1_;
            _loc7_.x = 0;
            _loc4_.height = _loc1_;
            _loc4_.x = 0;
            _loc4_.y = 0;
            this._window.height = _loc9_.height = _loc2_.height = _loc1_;
            if (_loc5_ != null) {
                _loc5_.height = _loc1_;
            }
            if (_loc11_ != null) {
                _loc11_.height = _loc1_;
            }
            if (_loc6_ != null) {
                _loc6_.y = _loc1_ * 0.5 - _loc6_.height * 0.5 | 0;
            }
            if (_loc10_ != null) {
                _loc10_.y = _loc1_ * 0.5 - _loc10_.height * 0.5 | 0;
            }
        }
        this._window.position = new Point(-5, this._window.desktop.height - 55 - this._window.height);
        if (this._SafeStr_2547) {
            this._SafeStr_2547.window.position = new Point(this.right - this._SafeStr_2547.window.width, this._window.position.y - this._SafeStr_2547.window.height);
        }
        this.updateRoomMouseBlockRect();
    }

    public override setCollapsed(param1: boolean): void {
        if (this._isCollapsed == param1 || !this._window) {
            return;
        }
        this._isCollapsed = param1;
        this.beginAnimation(this._isCollapsed ? this.getCollapsedExpandedOffsetX() : 0);
    }

    public update(param1: number): void {
        let _loc3_: number = NaN;
        let _loc2_: number = NaN;
        if (this._SafeStr_2729) {
            this._SafeStr_14240 += param1;
            _loc3_ = Number(Math.min(1, this._SafeStr_14240 / 140));
            _loc2_ = 1 - Math.pow(1 - _loc3_, 3);
            this.applyExpandedBranchOffset(this._SafeStr_14596 + (this._SafeStr_14597 - this._SafeStr_14596) * _loc2_);
            this.updatePosition();
            if (_loc3_ >= 1) {
                this._SafeStr_2729 = false;
                this.applyExpandedBranchOffset(this._SafeStr_14597);
                this.updateVisuals();
            }
        }
        this.updateZoomControls();
    }

    private updateVisuals(): void {
        if (!this._window || !this._window.findChildByName("window_bg")) {
            return;
        }
        this._window.findChildByName("window_bg").visible = !this._isCollapsed || this._SafeStr_2729;
        this._window.findChildByName("side_bar_collapse").visible = !this._isCollapsed;
        this._window.findChildByName("side_bar_expand").visible = this._isCollapsed;
        this.applyExpandedBranchOffset(this._SafeStr_14595);
        this.updatePosition();
        this.updateZoomControls();
    }

    private beginAnimation(param1: number): void {
        this._SafeStr_14596 = this._SafeStr_14595;
        this._SafeStr_14597 = param1;
        this._SafeStr_14240 = 0;
        this._SafeStr_2729 = this._SafeStr_14596 != this._SafeStr_14597;
        this.updateVisuals();
        if (!this._SafeStr_2729) {
            return;
        }
        this.ensureUpdateRegistration();
        if (!this._isRegisteredForUpdates) {
            this._SafeStr_2729 = false;
            this.applyExpandedBranchOffset(param1);
            this.updateVisuals();
        }
    }

    private ensureUpdateRegistration(): void {
        let _loc1_: Component = this.getUpdateComponent();
        if (!this._isRegisteredForUpdates && _loc1_ != null) {
            _loc1_.registerUpdateReceiver(this, 1);
            this._isRegisteredForUpdates = true;
        }
    }

    private removeUpdateRegistration(): void {
        let _loc1_: Component = this.getUpdateComponent();
        if (this._isRegisteredForUpdates && _loc1_ != null) {
            _loc1_.removeUpdateReceiver(this);
        }
        this._isRegisteredForUpdates = false;
    }

    private updateZoomControls(): void {
        if (!this._window) {
            return;
        }
        let _loc2_: ITextWindow = asGuarded(this._window.findChildByName("zoom_text"), isITextWindow);
        let _loc1_: boolean = this._widget.canZoomRoom(1);
        let _loc3_: boolean = this._widget.canZoomRoom(-1);
        let _loc6_: string = this._widget.getCurrentRoomZoomText();
        if (this._SafeStr_14598 && _loc6_ == this._lastZoomText && _loc1_ == this._SafeStr_14599 && _loc3_ == this._SafeStr_14600) {
            return;
        }
        if (_loc2_ != null) {
            _loc2_.caption = this._widget.localizations.registerParameter("room.zoom.text", "zoom_level", _loc6_);
        }
        let _loc5_: IWindow = this._window.findChildByName("zoom_in_btn");
        if (_loc5_ != null) {
            WindowUtils.disableSection(_loc5_, !_loc1_);
        }
        let _loc4_: IWindow = this._window.findChildByName("zoom_out_btn");
        if (_loc4_ != null) {
            WindowUtils.disableSection(_loc4_, !_loc3_);
        }
        this._SafeStr_14598 = true;
        this._lastZoomText = _loc6_;
        this._SafeStr_14599 = _loc1_;
        this._SafeStr_14600 = _loc3_;
    }

    private applyExpandedBranchOffset(param1: number): void {
        if (!this._window) {
            return;
        }
        let _loc2_: IWindow = this._window.findChildByName("window_bg");
        if (_loc2_ == null) {
            return;
        }
        this._SafeStr_14595 = param1;
        _loc2_.x = 1 + param1 | 0;
    }

    private getCollapsedExpandedOffsetX(): number {
        if (!this._window) {
            return 0;
        }
        let _loc1_: IWindow = this._window.findChildByName("window_bg");
        let _loc2_: IWindow = this._window.findChildByName("side_bar_expand");
        if (_loc1_ == null || _loc2_ == null) {
            return 0;
        }
        return _loc2_.width - _loc1_.width - 1;
    }

    private getUpdateComponent(): Component {
        return this.handler && this.handler.container ? asInstanceOf(this.handler.container.roomEngine, Component) : null;
    }

    private onWindowEvent = (param1: WindowEvent, param2: IWindow): void => {
        let message: RoomWidgetZoomToggleMessage;
        let link: string;
        let window: IWindowContainer;
        let asset: XML;
        let openCameraEvent: HabboToolbarEvent;
        let event: WindowEvent = param1;
        let target: IWindow = param2;
        if (event.type == "WE_PARENT_RESIZED" && this._window && this._window.parent && event.target == this._window.parent) {
            return this.updatePosition();
        }
        let _loc6_: string = event.type;
        if ("WME_CLICK" === _loc6_) {
            this.clearCollapseTimer();
            switch (target.name) {
                case "button_settings":
                    this.handler.toggleRoomInfoWindow();
                    break;
                case "zoom_in_btn":
                    this._widget.zoomRoom(1);
                    this.updateZoomControls();
                    break;
                case "zoom_out_btn":
                    this._widget.zoomRoom(-1);
                    this.updateZoomControls();
                    break;
                case "button_zoom":
                    if (this._widget.messageListener) {
                        message = new RoomWidgetZoomToggleMessage();
                        this._widget.messageListener.processWidgetMessage(message);
                    }
                    break;
                case "button_collapse":
                case "button_expand":
                    this._widget.setCollapsed(!this._isCollapsed);
                    this.handler.sessionDataManager.setRoomToolsState(!this._isCollapsed);
                    break;
                case "button_history_back":
                    this._widget.goToPreviousRoom();
                    break;
                case "button_history_forward":
                    this._widget.goToNextRoom();
                    break;
                case "button_history":
                    this.toggleHistory();
                    break;
                case "button_chat_history":
                    if (this._widget.freeFlowChat) {
                        this._widget.freeFlowChat.toggleVisibility();
                    }
                    break;
                case "button_achievements":
                    (asInstanceOf(this._widget.handler.container.roomEngine, Component)).context.createLinkEvent("questengine/achievements/wired_games");
                    break;
                case "button_like":
                    this.handler.rateRoom();
                    this._window.findChildByName("button_like").disable();
                    break;
                case "button_share":
                    link = this.getEmbedData();
                    window = asGuarded(this._widget.windowManager.getWindowByName("share_room_link"), isIWindowContainer);
                    if (window) {
                        window.dispose();
                        break;
                    }
                    if (window == null) {
                        asset = asInstanceOf(this._assets.getAssetByName("share_room_xml").content, XML);
                        if (asset) {
                            window = asGuarded(this._widget.windowManager.buildFromXML(asset), isIWindowContainer);
                        }
                    }
                    if (window) {
                        HabboTracking.getInstance().trackEventLog("RoomLink", "click", "client.room_link.clicked");
                        window.name = "share_room_link";
                        window.center();
                        window.findChildByTag("close").addEventListener("WME_CLICK", (param1: WindowMouseEvent, param2: IWindow = null): void => {
                         window.dispose();
                     });
                        window.findChildByName("embed_src_txt").caption = this.getEmbedData();
                        window.findChildByName("embed_src_direct_txt").caption = this.getEmbedData("embed_src_direct_txt", "${url.prefix}/room/%roomId%");
                        castGuarded(window.findChildByName("thumbnail_image"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow").assetUri = this.getThumbnailUrl();
                    }
                    try {
                        System.setClipboard(this.getEmbedData());
                    } catch (error) {
                    }
                    break;
                case "button_camera":
                    openCameraEvent = new HabboToolbarEvent("HTE_ICON_CAMERA");
                    openCameraEvent.iconName = "roomToolsMenu";
                    this.handler.container.toolbar.events.dispatchEvent(openCameraEvent);
            }
        }
    };

    private getEmbedData(param1: string = "navigator.embed.src", param2: string = ""): string {
        let _loc4_: string = null;
        let _loc5_: string = null;
        if (this._widget.handler.navigator.enteredGuestRoomData != null) {
            _loc4_ = "private";
            _loc5_ = "" + this._widget.handler.navigator.enteredGuestRoomData.flatId;
        }
        let _loc3_: string = this._widget.handler.container.config.getProperty("user.hash");
        if (this._widget.localizations.hasLocalization(param1)) {
            this._widget.localizations.registerParameter(param1, "roomType", _loc4_);
            this._widget.localizations.registerParameter(param1, "embedCode", _loc3_);
            this._widget.localizations.registerParameter(param1, "roomId", _loc5_);
        } else if (param2 != "") {
            param2 = param2.replace("${url.prefix}", this._widget.handler.container.config.getProperty("url.prefix"));
            return param2.replace("%roomId%", _loc5_);
        }
        return this._widget.localizations.getLocalization(param1, param2);
    }

    private getThumbnailUrl(): string {
        let _loc1_: string = null;
        if (this._widget.handler.navigator.enteredGuestRoomData == null) {
            return null;
        }
        let _loc2_: string = "";
        if (this._widget.handler.navigator.enteredGuestRoomData.officialRoomPicRef != null) {
            if (this._widget.handler.container.config.getBoolean("new.navigator.official.room.thumbnails.in.amazon")) {
                _loc1_ = this._widget.handler.container.config.getProperty("navigator.thumbnail.url_base");
                _loc2_ = _loc1_ + this._widget.handler.navigator.enteredGuestRoomData.flatId + ".png";
            } else {
                _loc2_ = this._widget.handler.container.config.getProperty("image.library.url") + this._widget.handler.navigator.enteredGuestRoomData.officialRoomPicRef;
            }
        } else {
            _loc1_ = this._widget.handler.container.config.getProperty("navigator.thumbnail.url_base");
            _loc2_ = _loc1_ + this._widget.handler.navigator.enteredGuestRoomData.flatId + ".png";
        }
        return _loc2_;
    }

    public get right(): number {
        let _loc2_: IWindow = null;
        _loc2_ = null;
        if (!this._window) {
            return 0;
        }
        if (this._isCollapsed && !this._SafeStr_2729) {
            _loc2_ = this._window.findChildByName("side_bar_expand");
            return _loc2_ ? _loc2_.width + -5 : 0;
        }
        let _loc4_: number = 0;
        let _loc1_: IWindow = this._window.findChildByName("window_bg");
        _loc2_ = this._window.findChildByName("side_bar_expand");
        let _loc3_: IWindow = this._window.findChildByName("side_bar_collapse");
        if (_loc1_ != null && _loc1_.visible) {
            _loc4_ = Math.max(_loc4_, Math.round(_loc1_.x + _loc1_.width)) | 0;
        }
        if (_loc2_ != null && _loc2_.visible) {
            _loc4_ = Math.max(_loc4_, Math.round(_loc2_.x + _loc2_.width)) | 0;
        }
        if (_loc3_ != null && _loc3_.visible) {
            _loc4_ = Math.max(_loc4_, Math.round(_loc3_.x + _loc3_.width)) | 0;
        }
        return _loc4_ + -5;
    }

    private updateRoomMouseBlockRect(): void {
        if (this._window == null || !this._window.visible || this.handler == null || this.handler.container == null || this.handler.container.roomEngine == null) {
            this.removeRoomMouseBlockRect();
            return;
        }
        let _loc1_: IWindow = this._window.findChildByName("window_bg");
        if (_loc1_ == null || !_loc1_.visible || _loc1_.width <= 0 || _loc1_.height <= 0) {
            this.removeRoomMouseBlockRect();
            return;
        }
        let _loc2_: Rectangle = new Rectangle();
        _loc1_.getGlobalRectangle(_loc2_);
        if (_loc2_.isEmpty()) {
            this.removeRoomMouseBlockRect();
            return;
        }
        this.handler.container.roomEngine.setMouseEventsDisabledRect("room_tools_toolbar", _loc2_);
    }

    private removeRoomMouseBlockRect(): void {
        if (this.handler != null && this.handler.container != null && this.handler.container.roomEngine != null) {
            this.handler.container.roomEngine.removeMouseEventsDisabledRect("room_tools_toolbar");
        }
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
