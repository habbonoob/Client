import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { Motion } from '@/com/sulake/core/window/motion/Motion';
import type { RoomToolsWidget } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsWidget';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { System } from '@habbo-pixi/runtime/system/System';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { Callback } from '@/com/sulake/core/window/motion/Callback';
import { EaseOut } from '@/com/sulake/core/window/motion/EaseOut';
import { Motions } from '@/com/sulake/core/window/motion/Motions';
import { MoveTo } from '@/com/sulake/core/window/motion/MoveTo';
import { Queue } from '@/com/sulake/core/window/motion/Queue';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { HabboToolbarEvent } from '@/com/sulake/habbo/toolbar/events/HabboToolbarEvent';
import { HabboTracking } from '@/com/sulake/habbo/tracking/HabboTracking';
import { RoomWidgetZoomToggleMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetZoomToggleMessage';
import { RoomToolsCtrlBase } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsCtrlBase';
import { RoomToolsHistory } from '@/com/sulake/habbo/ui/widget/roomtools/RoomToolsHistory';

export class RoomToolsToolbarCtrl extends RoomToolsCtrlBase {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomtools::RoomToolsToolbarCtrl'); }

    private static readonly TOOLBAR_EXPAND_TARGET_X: number = 1;
    private static readonly TOOLBAR_COLLAPSE_TARGET_X: number = -130;

    constructor(param1: RoomToolsWidget, param2: IHabboWindowManager, param3: IAssetLibrary) {
        super(param1, param2, param3);
        this._window = asGuarded(param2.buildFromXML(asInstanceOf(param3.getAssetByName("room_tools_toolbar_xml").content, XML)), isIWindowContainer);
        this._window.procedure = this.onWindowEvent;
        this._window.addEventListener("WME_OVER", this.onWindowEvent);
        this._window.addEventListener("WME_OUT", this.onWindowEvent);
        this.updateVisuals();
    }

    declare private _SafeStr_2547: RoomToolsHistory;

    public get right(): number {
        let _loc1_: IWindow = null;
        if (!this._window) {
            return 0;
        }
        if (this._isCollapsed) {
            _loc1_ = this._window.findChildByName("side_bar_expand");
            return _loc1_ ? _loc1_.width + -5 : 0;
        }
        return this._window.width + -5;
    }

    public override dispose(): void {
        if (this._SafeStr_2547) {
            this._SafeStr_2547.dispose();
            this._SafeStr_2547 = null;
        }
        let _loc1_: IWindowContainer = asGuarded(this._widget.windowManager.getWindowByName("share_room_link"), isIWindowContainer);
        if (_loc1_) {
            _loc1_.dispose();
        }
        super.dispose();
    }

    public override setElementVisible(param1: string, param2: boolean): void {
        if (!this._window) {
            return;
        }
        this._window.visible = true;
        super.setElementVisible(param1, param2);
        this.updatePosition();
    }

    public override setCollapsed(param1: boolean): void {
        let _loc3_: Motion = null;
        if (this._isCollapsed == param1 || !this._window) {
            return;
        }
        this._isCollapsed = param1;
        let _loc2_: IWindow = this._window.findChildByName("window_bg");
        if (!_loc2_) {
            return;
        }
        if (this._isCollapsed) {
            _loc3_ = new Queue(new EaseOut(new MoveTo(_loc2_, 100, -130, _loc2_.y), 1), new Callback(this.motionComplete));
        } else {
            _loc2_.x = -130;
            this.updateVisuals();
            _loc3_ = new EaseOut(new MoveTo(_loc2_, 100, 1, _loc2_.y), 1);
        }
        Motions.runMotion(_loc3_);
    }

    public updateRoomHistoryButtons(): void {
        if (this._widget.currentRoomIndex >= this._widget.visitedRooms.length - 1) {
            this._window.findChildByName("button_history_forward").disable();
        } else {
            this._window.findChildByName("button_history_forward").enable();
        }
        if (this._widget.currentRoomIndex == 0) {
            this._window.findChildByName("button_history_back").disable();
        } else {
            this._window.findChildByName("button_history_back").enable();
        }
        if (this._widget.visitedRooms.length <= 1) {
            this._window.findChildByName("button_history").disable();
        } else {
            this._window.findChildByName("button_history").enable();
        }
    }

    public disableRoomHistoryButtons(): void {
        this._window.findChildByName("button_history_forward").disable();
        this._window.findChildByName("button_history_back").disable();
    }

    public release(): void {
        if (this._SafeStr_2547) {
            this.toggleHistory();
        }
    }

    public setChatHistoryButton(param1: boolean): void {
        this.setElementVisible("button_chat_history", param1);
    }

    public setCameraButton(param1: boolean): void {
        this.setElementVisible("button_camera", param1);
    }

    public setLikeButton(param1: boolean): void {
        this.setElementVisible("button_like", param1);
    }

    public updatePosition(): void {
        let _loc3_: IWindow = null;
        let _loc5_: IWindow = null;
        let _loc7_: IItemListWindow = null;
        let _loc4_: IWindow = null;
        let _loc1_: number = 0;
        let _loc6_: number = 0;
        let _loc2_: IWindow = null;
        if (this._isCollapsed) {
            _loc3_ = this._window.findChildByName("side_bar_expand");
            _loc3_.y = this._window.height - _loc3_.height;
        } else {
            _loc5_ = this._window.findChildByName("arrow_collapse");
            _loc7_ = asGuarded(this._window.findChildByName("itemlist_buttons"), isIItemListWindow);
            _loc4_ = this._window.findChildByName("side_bar_collapse");
            _loc1_ = 0;
            _loc6_ = 0;
            while (_loc6_ < _loc7_.numListItems) {
                _loc2_ = _loc7_.getListItemAt(_loc6_ >>> 0);
                if (_loc2_.visible) {
                    _loc1_ += _loc2_.height;
                }
                _loc6_++;
            }
            _loc4_.height = _loc1_;
            this._window.height = _loc7_.height = this._window.findChildByName("window_bg").height = _loc1_;
            _loc5_.y = _loc1_ * 0.5 - _loc5_.height * 0.5 | 0;
        }
        this._window.position = new Point(-5, this._window.desktop.height - 55 - this._window.height);
        if (this._SafeStr_2547) {
            this._SafeStr_2547.window.position = new Point(this.right - this._SafeStr_2547.window.width, this._window.position.y - this._SafeStr_2547.window.height);
        }
    }

    private toggleHistory(): void {
        if (this._SafeStr_2547) {
            this._SafeStr_2547.dispose();
            this._SafeStr_2547 = null;
        } else {
            this._SafeStr_2547 = new RoomToolsHistory(this._windowManager, this._assets, this.handler);
            this._SafeStr_2547.populate(this._widget.visitedRooms);
            this.updatePosition();
        }
    }

    private motionComplete = (param1: Motion): void => {
        this.updateVisuals();
    };

    private updateVisuals(): void {
        if (!this._window || !this._window.findChildByName("window_bg")) {
            return;
        }
        this._window.findChildByName("window_bg").visible = !this._isCollapsed;
        this._window.findChildByName("side_bar_collapse").visible = !this._isCollapsed;
        this._window.findChildByName("side_bar_expand").visible = this._isCollapsed;
        this.updatePosition();
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
        let _loc6_: any = event.type;
        if ("WME_CLICK" === _loc6_) {
            this.clearCollapseTimer();
            switch (target.name) {
                case "button_settings":
                    this.handler.toggleRoomInfoWindow();
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
                case "button_like":
                    this.handler.rateRoom();
                    this._window.findChildByName("button_like").disable();
                    break;
                case "button_share":
                    link = this.getEmbedData();
                    window = asGuarded(this._widget.windowManager.getWindowByName("share_room_link"), isIWindowContainer);
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
                        break;
                    } catch (error) {
                        break;
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
            param2 = param2.replace("${url.prefix}", this._widget.handler.container.config.getProperty(HabboProperty.URL_PREFIX));
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
}
