import { asGuarded, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { ChatHistoryScrollView } from '@/com/sulake/habbo/freeflowchat/history/visualization/ChatHistoryScrollView';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ChatHistoryTray implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization::ChatHistoryTray'); }

    private static readonly ANIMATION_DURATION_MS: number = 140;
    private static readonly ROOM_MOUSE_BLOCK_HANDLE_ID: string = "freeflow_chat_history_handle";

    declare private _rootDisplayObject: DisplayObjectContainer;

    declare private _component: HabboFreeFlowChat;

    declare private _SafeStr_2361: ChatHistoryScrollView;

    declare private _tab: Sprite;

    declare private _SafeStr_2526: Bitmap;

    declare private _SafeStr_2295: Bitmap;

    declare private _tabHandleHitArea: IRegionWindow;

    declare private _bg: Bitmap;

    declare private _openedWidth: number;
    static { (this.prototype as any)._openedWidth = 0; }

    private _currentWidth: number = 0;
    private _isOpen: boolean = false;
    private _SafeStr_2729: boolean = false;
    private _isRegisteredForUpdates: boolean = false;
    private _hasOpenedInRoom: boolean = false;
    private _SafeStr_15052: boolean = false;
    private _animationStartWidth: number = 0;
    private _animationTargetWidth: number = 0;
    private _SafeStr_14218: number = 0;

    constructor(param1: HabboFreeFlowChat, param2: ChatHistoryScrollView) {
        this._component = param1;
        this._SafeStr_2361 = param2;
        this._rootDisplayObject = new Sprite();
        this._SafeStr_2526 = new Bitmap();
        this._SafeStr_2526.bitmapData = castTo(this._component.assets.getAssetByName("tray_bar").content, BitmapData);
        this._SafeStr_2526.width = this._SafeStr_2526.bitmapData.width;
        this._SafeStr_2526.height = 0;
        this._SafeStr_2526.scaleX = 1;
        this._SafeStr_2526.x = -this._SafeStr_2526.bitmapData.width;
        this._SafeStr_2295 = new Bitmap();
        this._SafeStr_2295.bitmapData = castTo(this._component.assets.getAssetByName("tray_handle_open").content, BitmapData);
        this._SafeStr_2295.scaleX = 1;
        this._SafeStr_2295.scaleY = 1;
        this._SafeStr_2295.x = -0;
        this._SafeStr_2295.y = 350;
        this._SafeStr_2295.visible = false;
        this._tabHandleHitArea = asGuarded(this._component.windowManager.createWindow("freeflow_chat_history_handle", "", 5, 0, 0, new Rectangle(), null, 0, 0), isIRegionWindow);
        this._tabHandleHitArea.mouseThreshold = 0;
        this._tabHandleHitArea.visible = false;
        this._tabHandleHitArea.addEventListener("WME_CLICK", this.tabHandleClickedEventHandler);
        this._tab = new Sprite();
        this._tab.scaleX = 1;
        this._tab.scaleY = 1;
        this._tab.visible = true;
        this._tab.addChild(this._SafeStr_2526);
        this._tab.addChild(this._SafeStr_2295);
        this._rootDisplayObject.addChild(this._tab);
        this._bg = new Bitmap();
        this._bg.bitmapData = new BitmapData(1, 1, true, 2720277278);
        this._bg.width = 0;
        this._bg.height = 0;
        this._rootDisplayObject.addChild(this._bg);
        this._rootDisplayObject.addEventListener("addedToStage", this.onAddedToStage);
        this._rootDisplayObject.addEventListener("removedFromStage", this.onRemovedFromStage);
        this._openedWidth = 350 + 62 + 1;
        this.applyTrayWidth(0);
    }

    public dispose(): void {
        this._component.disableRoomMouseEventsLeftOfX(0);
        this.removeRoomMouseBlockRect();
        if (this._rootDisplayObject) {
            this._rootDisplayObject.removeEventListener("addedToStage", this.onAddedToStage);
            this._rootDisplayObject.removeEventListener("removedFromStage", this.onRemovedFromStage);
            this._SafeStr_2361.deactivateScrolling();
            if (!this._tabHandleHitArea.disposed) {
                this._tabHandleHitArea.removeEventListener("WME_CLICK", this.tabHandleClickedEventHandler);
                this._tabHandleHitArea.dispose();
            }
        }
        if (this._isRegisteredForUpdates && this._component) {
            this._component.removeUpdateReceiver(this);
        }
        this._SafeStr_2729 = false;
        this._isRegisteredForUpdates = false;
        this._rootDisplayObject = null;
    }

    public get disposed(): boolean {
        return this._rootDisplayObject == null;
    }

    public get rootDisplayObject(): DisplayObjectContainer {
        return this._rootDisplayObject;
    }

    public resize(param1: number, param2: number): void {
        this._tab.height = param2 - 50;
        this._SafeStr_2526.height = param2 - 50;
        this._bg.height = param2 - 50;
        this._tab.scaleY = 1;
        this._SafeStr_2295.scaleY = 1;
        this._SafeStr_2295.y = param2 - 215;
        this.applyTrayWidth(Math.round(this._currentWidth) | 0);
    }

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: IWindow = this._component.windowManager.getDesktop(0).findChildByTag("room_new_chat");
        if (_loc2_ != null) {
            castGuarded(_loc2_.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").addChild(this._tabHandleHitArea);
        }
        this.resize(this._rootDisplayObject.stage.stageWidth, this._rootDisplayObject.stage.stageHeight);
    };

    private onRemovedFromStage = (param1: Event): void => {
        if (!this._tabHandleHitArea.disposed) {
            this._tabHandleHitArea.visible = false;
        }
        this._component.disableRoomMouseEventsLeftOfX(0);
        this.removeRoomMouseBlockRect();
    };

    public toggleHistoryVisibility(): void {
        if (this._rootDisplayObject == null || this._SafeStr_2361 == null) {
            return;
        }
        if (this._isOpen) {
            this.startClosing();
        } else {
            this.startOpening();
        }
    }

    public set visible(param1: boolean) {
        if (this._isOpen != param1) {
            this.toggleHistoryVisibility();
        }
    }

    public update(param1: number): void {
        let _loc3_: number = NaN;
        let _loc2_: number = NaN;
        let _loc4_: number = NaN;
        if (this._isOpen || this._SafeStr_2729) {
            this._SafeStr_2361.update(param1);
        }
        if (this._SafeStr_2729) {
            this._SafeStr_14218 += param1;
            _loc3_ = Number(Math.min(1, this._SafeStr_14218 / 140));
            _loc2_ = 1 - Math.pow(1 - _loc3_, 3);
            _loc4_ = this._animationStartWidth + (this._animationTargetWidth - this._animationStartWidth) * _loc2_;
            this.applyTrayWidth(Math.round(_loc4_) | 0);
            if (_loc3_ >= 1) {
                this._SafeStr_2729 = false;
                this.applyTrayWidth(this._animationTargetWidth);
                if (this._animationTargetWidth == 0) {
                    this.finishClosing();
                }
            }
        }
        this.refreshUpdateRegistration();
    }

    private tabHandleClickedEventHandler = (param1: WindowMouseEvent): void => {
        if (this._tabHandleHitArea.visible) {
            this.toggleHistoryVisibility();
        }
    };

    private startOpening(): void {
        this._isOpen = true;
        if (this._SafeStr_2361.rootDisplayObject.parent != this._rootDisplayObject) {
            this._rootDisplayObject.addChild(this._SafeStr_2361.rootDisplayObject);
        }
        if (!this._SafeStr_2361.isActive) {
            if (!this._hasOpenedInRoom || this._SafeStr_15052) {
                this._SafeStr_2361.scrollToBottom();
            }
            this._SafeStr_2361.activateView();
            this._hasOpenedInRoom = true;
        }
        this._SafeStr_2361.activateScrolling();
        this._SafeStr_2295.bitmapData = castTo(this._component.assets.getAssetByName("tray_handle_close").content, BitmapData);
        if (this.shouldAnimate()) {
            this.beginWidthAnimation(this._openedWidth);
        } else {
            this._SafeStr_2729 = false;
            this.applyTrayWidth(this._openedWidth);
            this.refreshUpdateRegistration();
        }
    }

    private startClosing(): void {
        this._isOpen = false;
        this._SafeStr_15052 = this._SafeStr_2361.isMostRecentHistoryMode;
        this._SafeStr_2361.deactivateScrolling();
        if (this.shouldAnimate()) {
            this.beginWidthAnimation(0);
        } else {
            this._SafeStr_2729 = false;
            this.applyTrayWidth(0);
            this.finishClosing();
            this.refreshUpdateRegistration();
        }
    }

    private finishClosing(): void {
        if (this._SafeStr_2361.rootDisplayObject.parent == this._rootDisplayObject) {
            this._rootDisplayObject.removeChild(this._SafeStr_2361.rootDisplayObject);
        }
        this._SafeStr_2361.deactivateView();
        this._SafeStr_2295.bitmapData = castTo(this._component.assets.getAssetByName("tray_handle_open").content, BitmapData);
        this._SafeStr_2295.visible = false;
        this.refreshTabHandleHitArea();
    }

    private beginWidthAnimation(param1: number): void {
        this._animationStartWidth = this._currentWidth;
        this._animationTargetWidth = param1;
        this._SafeStr_14218 = 0;
        if (this._animationStartWidth == this._animationTargetWidth) {
            this._SafeStr_2729 = false;
            this.applyTrayWidth(param1);
            if (param1 == 0) {
                this.finishClosing();
            }
            this.refreshUpdateRegistration();
            return;
        }
        this._SafeStr_2729 = true;
        this.refreshUpdateRegistration();
    }

    private applyTrayWidth(param1: number): void {
        let _loc2_: number = Math.max(0, Math.min(this._openedWidth, param1)) | 0;
        this._currentWidth = _loc2_;
        this._bg.width = _loc2_;
        this._SafeStr_2526.x = _loc2_ > 0 ? _loc2_ : -this._SafeStr_2526.bitmapData.width;
        this._SafeStr_2295.x = _loc2_ > 0 ? _loc2_ - 0 + this._SafeStr_2526.bitmapData.width : -0;
        this._SafeStr_2295.visible = _loc2_ > 0;
        this._SafeStr_2361.viewWidth = _loc2_;
        this.refreshTabHandleHitArea();
        this._component.disableRoomMouseEventsLeftOfX(_loc2_ > 0 ? _loc2_ + this._SafeStr_2526.bitmapData.width : 0);
        this.updateRoomMouseBlockRect();
    }

    private refreshUpdateRegistration(): void {
        let _loc1_: boolean = this._component != null && (this._isOpen || this._SafeStr_2729);
        if (_loc1_ == this._isRegisteredForUpdates) {
            return;
        }
        if (_loc1_) {
            this._component.registerUpdateReceiver(this, 1);
        } else {
            this._component.removeUpdateReceiver(this);
        }
        this._isRegisteredForUpdates = _loc1_;
    }

    private shouldAnimate(): boolean {
        return this._rootDisplayObject != null && this._rootDisplayObject.stage != null;
    }

    private refreshTabHandleHitArea(): void {
        if (this._tabHandleHitArea == null || Boolean(this._tabHandleHitArea.disposed) || this._SafeStr_2295 == null || this._SafeStr_2295.bitmapData == null) {
            return;
        }
        this._tabHandleHitArea.visible = this._SafeStr_2295.visible && this._rootDisplayObject.stage != null;
        if (this._tabHandleHitArea.visible) {
            this._tabHandleHitArea.setGlobalRectangle(this._SafeStr_2295.getBounds(this._rootDisplayObject.stage));
        }
    }

    private updateRoomMouseBlockRect(): void {
        if (this._component == null || this._component.roomEngine == null || this._tabHandleHitArea == null || Boolean(this._tabHandleHitArea.disposed) || !this._tabHandleHitArea.visible || this._rootDisplayObject == null || this._rootDisplayObject.stage == null) {
            this.removeRoomMouseBlockRect();
            return;
        }
        let _loc1_: Rectangle = new Rectangle();
        this._tabHandleHitArea.getGlobalRectangle(_loc1_);
        if (_loc1_.isEmpty()) {
            this.removeRoomMouseBlockRect();
            return;
        }
        this._component.roomEngine.setMouseEventsDisabledRect("freeflow_chat_history_handle", _loc1_);
    }

    private removeRoomMouseBlockRect(): void {
        if (this._component != null && this._component.roomEngine != null) {
            this._component.roomEngine.removeMouseEventsDisabledRect("freeflow_chat_history_handle");
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
