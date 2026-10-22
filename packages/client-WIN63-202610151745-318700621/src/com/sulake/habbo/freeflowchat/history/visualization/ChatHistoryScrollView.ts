import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { HabboFreeFlowChat } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat';
import type { ChatHistoryBuffer } from '@/com/sulake/habbo/freeflowchat/history/ChatHistoryBuffer';
import type { IChatHistoryEntryBitmap } from '@/com/sulake/habbo/freeflowchat/history/visualization/entry/IChatHistoryEntryBitmap';
import { Bitmap } from '@habbo-pixi/runtime/display/Bitmap';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { DisplayObjectContainer } from '@habbo-pixi/runtime/display/DisplayObjectContainer';
import { Sprite } from '@habbo-pixi/runtime/display/Sprite';
import type { Stage } from '@habbo-pixi/runtime/display/Stage';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { MouseEvent } from '@habbo-pixi/runtime/events/MouseEvent';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { SmoothScroller } from '@/com/sulake/core/window/utils/SmoothScroller';
import { ChatHistoryScrollBar } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { BitmapSpriteWithUserId } from '@/com/sulake/habbo/freeflowchat/history/visualization/entry/BitmapSpriteWithUserId';

export class ChatHistoryScrollView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization::ChatHistoryScrollView'); }

    private static readonly SPRINGBACK_DURATION_MS: number = 180;
    private static readonly AUTO_SCROLL_TO_LATEST_DURATION_MS: number = 140;
    private static readonly _SafeStr_15059: number = 200;
    private static readonly _SafeStr_15060: number = 200;
    private static readonly MOST_RECENT_HISTORY_BOTTOM_PADDING_THRESHOLD: number = 100;

    declare private _component: HabboFreeFlowChat;

    declare private _historyBuffer: ChatHistoryBuffer;

    declare private _rootDisplayObject: DisplayObjectContainer;

    declare private _SafeStr_2569: Stage;

    declare private _SafeStr_2382: BitmapSpriteWithUserId[];

    private _SafeStr_4509: number = 0;

    declare private _viewPort: Rectangle;

    private _visibleWidth: number = 0;

    declare private _SafeStr_5599: number;
    static { (this.prototype as any)._SafeStr_5599 = 0; }

    declare private _SafeStr_6890: number;
    static { (this.prototype as any)._SafeStr_6890 = 0; }

    declare private _SafeStr_2833: Sprite;

    declare private _SafeStr_15061: Sprite;

    private _isActive: boolean = false;

    declare private _scrollBar: ChatHistoryScrollBar;

    declare private _ignore: Bitmap;

    declare private _SafeStr_2321: BitmapSpriteWithUserId;

    private _SafeStr_15062: number = 200;

    declare private _SafeStr_15063: SmoothScroller;

    private _SafeStr_15064: boolean = false;
    private _SafeStr_15065: boolean = false;
    private _SafeStr_15066: number = 0;
    private _SafeStr_15067: number = 0;
    private _SafeStr_15068: number = 0;
    private _SafeStr_15069: boolean = false;
    private _SafeStr_15070: number = 0;
    private _SafeStr_15071: number = 0;
    private _SafeStr_15072: number = 0;
    private _SafeStr_15073: boolean = false;
    private _SafeStr_15074: number = 300;

    constructor(param1: HabboFreeFlowChat, param2: ChatHistoryBuffer) {
        this._component = param1;
        this._historyBuffer = param2;
        this._rootDisplayObject = new Sprite();
        this._rootDisplayObject.x = 0;
        this._rootDisplayObject.y = 0;
        this._SafeStr_15061 = new Sprite();
        this._rootDisplayObject.addChild(this._SafeStr_15061);
        this._rootDisplayObject.addEventListener("addedToStage", this.onAddedToStage);
        this._scrollBar = new ChatHistoryScrollBar(this, param1);
        this._ignore = new Bitmap();
        this._ignore.bitmapData = castTo(this._component.assets.getAssetByName("close_x").content, BitmapData);
        this._SafeStr_2321 = null;
        this._SafeStr_15063 = new SmoothScroller(this.getScrollTopY, this.setSmoothScrollTopY, this.getWheelScrollAxisSize, this._SafeStr_15062, 60, false, this.onWheelScrollCompleted, NaN, false);
    }

    public dispose(): void {
        this.deactivateScrolling();
        this.deactivateView();
        this.stopScrollWheel();
        this._SafeStr_2833 = null;
        this._ignore = null;
        this._SafeStr_2321 = null;
        if (this._SafeStr_15063) {
            this._SafeStr_15063.dispose();
            this._SafeStr_15063 = null;
        }
        if (this._rootDisplayObject) {
            this._rootDisplayObject.removeEventListener("addedToStage", this.onAddedToStage);
            this._rootDisplayObject = null;
        }
        this._SafeStr_15061 = null;
    }

    public get disposed(): boolean {
        return this._SafeStr_2833 == null && this._rootDisplayObject == null;
    }

    public get rootDisplayObject(): DisplayObjectContainer {
        return this._rootDisplayObject;
    }

    public activateView(): void {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: BitmapSpriteWithUserId = null;
        let _loc1_: IChatHistoryEntryBitmap = null;
        if (!this._historyBuffer) {
            return;
        }
        this.deactivateView();
        this._SafeStr_2382 = new Array<BitmapSpriteWithUserId>(this._historyBuffer.entries.length).fill(null);
        _loc4_ = 0;
        _loc3_ = -this._SafeStr_4509;
        while (_loc4_ < this._historyBuffer.entries.length) {
            _loc2_ = new BitmapSpriteWithUserId();
            _loc1_ = this._historyBuffer.entries[_loc4_];
            _loc2_.roomId = _loc1_.roomId;
            _loc2_.userIndex = _loc1_.userIndex;
            _loc2_.webId = _loc1_.webId;
            _loc2_.bitmapData = _loc1_.bitmap;
            _loc2_.canIgnore = _loc1_.canIgnore;
            _loc2_.userName = _loc1_.userName;
            _loc3_ = _loc3_ - _loc1_.overlap.y | 0;
            _loc2_.y = _loc3_;
            _loc2_.x = 3;
            _loc3_ += _loc2_.bitmapData.height;
            _loc3_ -= 8;
            this._SafeStr_2382[_loc4_] = _loc2_;
            this._rootDisplayObject.addChild(this._SafeStr_2382[_loc4_]);
            _loc4_++;
        }
        this._rootDisplayObject.addChild(this._scrollBar.displayObject);
        this._isActive = true;
        this._scrollBar.updateThumbTrack();
    }

    public deactivateView(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_2382 != null) {
            for (const _loc1_ of this._SafeStr_2382 ?? []) {
                this._rootDisplayObject.removeChild(_loc1_);
                _loc1_.bitmapData = null;
            }
        }
        if (this._SafeStr_2321 != null) {
            this._rootDisplayObject.removeChild(this._ignore);
            this._SafeStr_2321 = null;
        }
        this._SafeStr_2382 = new Array<BitmapSpriteWithUserId>(0).fill(null);
        if (this._scrollBar.displayObject != null && this._scrollBar.displayObject.parent == this._rootDisplayObject) {
            this._rootDisplayObject.removeChild(this._scrollBar.displayObject);
        }
        this._isActive = false;
    }

    public activateScrolling(): void {
        this.deactivateScrolling();
        this._rootDisplayObject.addEventListener("mouseDown", this.mouseDragEventHandler);
        this._rootDisplayObject.addEventListener("mouseWheel", this.mouseWheelEventHandler);
        this._SafeStr_2569 = this._rootDisplayObject.stage;
        if (this._SafeStr_2569 != null) {
            this._SafeStr_2569.addEventListener("resize", this.onStageResized);
        }
    }

    public deactivateScrolling(): void {
        if (this._rootDisplayObject) {
            this._rootDisplayObject.removeEventListener("mouseDown", this.mouseDragEventHandler);
            this._rootDisplayObject.removeEventListener("mouseWheel", this.mouseWheelEventHandler);
        }
        if (this._SafeStr_2569) {
            this._SafeStr_2569.removeEventListener("mouseMove", this.mouseDragEventHandler, true);
            this._SafeStr_2569.removeEventListener("mouseUp", this.mouseDragEventHandler);
            this._SafeStr_2569.removeEventListener("resize", this.onStageResized);
        }
        this._SafeStr_15064 = false;
        this.stopScrollWheel();
    }

    public get topY(): number {
        return this._SafeStr_4509;
    }

    public get bufferHeight(): number {
        return this._historyBuffer.totalHeight;
    }

    public set topY(param1: number) {
        this.setTopY(param1, false);
    }

    private setTopY(param1: number, param2: boolean): void {
        let _loc6_: number = 0;
        let _loc5_: number = 0;
        let _loc3_: IChatHistoryEntryBitmap = null;
        let _loc4_: number = param1 - this._SafeStr_4509;
        this._SafeStr_4509 = param1;
        if (this._SafeStr_2382) {
            _loc6_ = 0;
            _loc5_ = -this._SafeStr_4509;
            while (_loc6_ < this._historyBuffer.entries.length) {
                if (this._SafeStr_2382.length <= _loc6_) {
                    break;
                }
                _loc3_ = this._historyBuffer.entries[_loc6_];
                _loc5_ = _loc5_ - _loc3_.overlap.y | 0;
                this._SafeStr_2382[_loc6_].y = _loc5_;
                _loc5_ += _loc3_.bitmap.height - 8;
                _loc6_++;
            }
        }
        if (this._SafeStr_2321 != null) {
            this._ignore.y = this._SafeStr_2321.y + (this._SafeStr_2321.height - this._ignore.height) / 2;
        }
        this._scrollBar.updateThumbTrack();
        if (!param2 && this._SafeStr_15063 != null && this._SafeStr_15063.isScrolling) {
            this._SafeStr_15063.adjustStartPosition(_loc4_);
        }
    }

    public addHistoryEntry(param1: IChatHistoryEntryBitmap): void {
        let _loc3_: boolean = this._SafeStr_15073;
        let _loc2_: BitmapSpriteWithUserId = new BitmapSpriteWithUserId();
        _loc2_.bitmapData = param1.bitmap;
        _loc2_.y = -this._SafeStr_4509 + this._historyBuffer.totalHeight - param1.bitmap.height + 8;
        _loc2_.x = 3;
        _loc2_.userIndex = param1.userIndex;
        _loc2_.webId = param1.webId;
        _loc2_.roomId = param1.roomId;
        _loc2_.canIgnore = param1.canIgnore;
        _loc2_.userName = param1.userName;
        this._SafeStr_2382.push(_loc2_);
        this._rootDisplayObject.addChild(this._SafeStr_2382[this._SafeStr_2382.length - 1]);
        if (_loc3_) {
            this.startAutoScrollToLatest();
        }
        this._scrollBar.updateThumbTrack();
    }

    public scrollUpAndSpliceTopItem(param1: number): void {
        if (this._SafeStr_2382 && this._SafeStr_2382.length > 0) {
            this._rootDisplayObject.removeChild(this._SafeStr_2382[0]);
            this._SafeStr_2382.splice(0, 1);
            for (const _loc2_ of this._SafeStr_2382 ?? []) {
                _loc2_.y -= param1;
            }
            this._scrollBar.updateThumbTrack();
        }
    }

    public get viewPort(): Rectangle {
        return this._viewPort;
    }

    public set viewPort(param1: Rectangle) {
        this._viewPort = param1;
        this._rootDisplayObject.width = param1.width;
        this._rootDisplayObject.height = param1.height;
        this._rootDisplayObject.scaleX = 1;
        this._rootDisplayObject.scaleY = 1;
        if (!this._SafeStr_2833) {
            this._SafeStr_2833 = new Sprite();
            this._rootDisplayObject.addChild(this._SafeStr_2833);
        }
        this.updateClipMask();
        this.updateInputSurface();
        this.updateScrollBarPosition();
        this.viewBottom = param1.height | 0;
        if (this._SafeStr_15073) {
            this._SafeStr_15074 = this.getCurrentBottomPadding();
        }
    }

    public set viewBottom(param1: number) {
        this._rootDisplayObject.y = param1 - this._viewPort.height;
        this._scrollBar.height = param1;
        this._scrollBar.displayObject.y = this._viewPort.height - param1;
    }

    public set viewWidth(param1: number) {
        this._visibleWidth = param1;
        this.updateClipMask();
        this.updateInputSurface();
        this.updateScrollBarPosition();
    }

    public scrollToBottom(): void {
        this.topY = this._historyBuffer.totalHeight - this.viewPort.height + 300 | 0;
        this._SafeStr_15073 = true;
        this._SafeStr_15074 = 300;
        this.cancelAutoScrollToLatest();
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public get isMostRecentHistoryMode(): boolean {
        return this._SafeStr_15073 || this.isViewingMostRecentChatsWithBuffer();
    }

    public beginUserScrollInteraction(param1: boolean = true): void {
        this._SafeStr_15073 = false;
        this.cancelSpringback();
        this.cancelAutoScrollToLatest();
        if (param1) {
            this.endScrollWheel(false);
        }
    }

    public stopScrollWheel(): void {
        this.endScrollWheel(false);
        this.cancelSpringback();
        this.cancelAutoScrollToLatest();
    }

    public update(param1: number): void {
        let _loc7_: number = NaN;
        let _loc3_: number = NaN;
        let _loc4_: number = NaN;
        if (this._SafeStr_15069) {
            this._SafeStr_15072 += param1;
            _loc7_ = Number(Math.min(1, this._SafeStr_15072 / 140));
            _loc3_ = 1 - Math.pow(1 - _loc7_, 3);
            _loc4_ = this._SafeStr_15070 + (this._SafeStr_15071 - this._SafeStr_15070) * _loc3_;
            this.topY = Math.round(_loc4_) | 0;
            if (_loc7_ >= 1) {
                this.topY = this._SafeStr_15071;
                this.cancelAutoScrollToLatest();
            }
        }
        if (!this._SafeStr_15065) {
            return;
        }
        this._SafeStr_15068 += param1;
        let _loc5_: number = Number(Math.min(1, this._SafeStr_15068 / 180));
        let _loc2_: number = 1 - Math.pow(1 - _loc5_, 3);
        let _loc6_: number = this._SafeStr_15066 + (this._SafeStr_15067 - this._SafeStr_15066) * _loc2_;
        this.topY = Math.round(_loc6_) | 0;
        if (_loc5_ >= 1) {
            this.topY = this._SafeStr_15067;
            this.cancelSpringback();
        }
    }

    public startSpringbackIfNeeded(): void {
        this.syncMostRecentHistoryMode();
        this.cancelAutoScrollToLatest();
        if (this._viewPort == null) {
            this.cancelSpringback();
            return;
        }
        let _loc1_: number = this.getSpringbackTargetTopY();
        if (isNaN(_loc1_) || (Math.round(_loc1_) | 0) == this._SafeStr_4509) {
            this.cancelSpringback();
            return;
        }
        this._SafeStr_15065 = true;
        this._SafeStr_15066 = this._SafeStr_4509;
        this._SafeStr_15067 = Math.round(_loc1_) | 0;
        this._SafeStr_15068 = 0;
    }

    private updateClipMask(): void {
        if (this._SafeStr_2833 == null || this._viewPort == null) {
            return;
        }
        let _loc1_: number = Math.max(0, Math.min(this._viewPort.width, this._visibleWidth)) | 0;
        this._SafeStr_2833.graphics.clear();
        if (_loc1_ <= 0) {
            return;
        }
        this._SafeStr_2833.graphics.beginFill(16777215);
        this._SafeStr_2833.graphics.drawRect(0, 0, _loc1_, this._viewPort.height);
        this._SafeStr_2833.graphics.endFill();
        this._rootDisplayObject.mask = this._SafeStr_2833;
    }

    private updateInputSurface(): void {
        if (this._SafeStr_15061 == null) {
            return;
        }
        this._SafeStr_15061.graphics.clear();
        if (this._viewPort == null || this._visibleWidth <= 0) {
            return;
        }
        this._SafeStr_15061.graphics.beginFill(0, 0);
        this._SafeStr_15061.graphics.drawRect(0, 0, this._visibleWidth, this._viewPort.height);
        this._SafeStr_15061.graphics.endFill();
    }

    private updateScrollBarPosition(): void {
        if (this._scrollBar == null || this._viewPort == null) {
            return;
        }
        let _loc1_: number = (this._visibleWidth > 0 ? this._visibleWidth : this._viewPort.width) | 0;
        this._scrollBar.displayObject.x = Math.max(0, _loc1_ - this._scrollBar.displayObject.width - 0);
    }

    private findSpriteAtY(param1: number): BitmapSpriteWithUserId {
        for (const _loc2_ of this._SafeStr_2382 ?? []) {
            if (param1 >= _loc2_.y && param1 <= _loc2_.y + _loc2_.height) {
                return _loc2_;
            }
        }
        return null;
    }

    private mouseDragEventHandler = (param1: Event): void => {
        let _loc5_: number = 0;
        let _loc4_: number = 0;
        let _loc3_: BitmapSpriteWithUserId = null;
        if (!this._rootDisplayObject || !this._rootDisplayObject.stage) {
            return;
        }
        let _loc2_: MouseEvent = castTo(param1, MouseEvent);
        switch (_loc2_.type) {
            case "mouseDown":
                if (_loc2_.stageY < this._rootDisplayObject.y + this._viewPort.height && _loc2_.stageX < this._scrollBar.displayObject.x) {
                    this.beginUserScrollInteraction();
                    this._scrollBar.cancelScroll();
                    this._SafeStr_5599 = _loc2_.stageY | 0;
                    this._SafeStr_6890 = this.topY;
                    this._SafeStr_15064 = true;
                    this._SafeStr_2569.addEventListener("mouseMove", this.mouseDragEventHandler, true);
                    this._SafeStr_2569.addEventListener("mouseUp", this.mouseDragEventHandler);
                }
                break;
            case "mouseMove":
                _loc5_ = _loc2_.stageY - this._SafeStr_5599 | 0;
                this.topY = this._SafeStr_6890 - _loc5_;
                param1.stopImmediatePropagation();
                break;
            case "mouseUp":
                this._SafeStr_2569.removeEventListener("mouseMove", this.mouseDragEventHandler, true);
                this._SafeStr_2569.removeEventListener("mouseUp", this.mouseDragEventHandler);
                this._SafeStr_15064 = false;
                _loc4_ = _loc2_.stageY - this._SafeStr_5599 | 0;
                if (_loc4_ < 1 && _loc4_ > -1) {
                    if (this.hitIgnore(_loc2_.stageX | 0, _loc2_.stageY | 0)) {
                        this.startSpringbackIfNeeded();
                        break;
                    }
                    _loc3_ = this.findSpriteAtY(_loc2_.stageY | 0);
                    if (_loc3_) {
                        this.onEntrySpriteClicked(_loc3_);
                        this.moveIgnore(_loc3_);
                    }
                }
                this.startSpringbackIfNeeded();
        }
    };

    private mouseWheelEventHandler = (param1: MouseEvent): void => {
        this.beginUserScrollInteraction(false);
        this.scrollWithWheel(param1.delta);
        param1.stopImmediatePropagation();
    };

    private endScrollWheel(param1: boolean = true): void {
        if (!this.isScrollingWithWheel) {
            return;
        }
        this._SafeStr_15063.stop();
        if (param1 && !this._SafeStr_15064) {
            this.startSpringbackIfNeeded();
        }
    }

    private get isScrollingWithWheel(): boolean {
        return this._SafeStr_15063 != null && this._SafeStr_15063.isScrolling;
    }

    public scrollWithWheel(param1: number): void {
        this.cancelSpringback();
        this._SafeStr_15063.scrollWithWheel(param1);
    }

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: Stage = this._rootDisplayObject.stage;
        this.viewPort = new Rectangle(0, 0, _loc2_.stageWidth, _loc2_.stageHeight - 50);
    };

    private onStageResized = (param1: Event): void => {
        if (this._SafeStr_2569) {
            this.viewPort = new Rectangle(0, 0, this._SafeStr_2569.stageWidth, this._SafeStr_2569.stageHeight - 50);
        }
    };

    private getScrollTopY = (): number => {
        return this._SafeStr_4509;
    };

    private setSmoothScrollTopY = (param1: number): void => {
        this.setTopY(Math.round(param1) | 0, true);
    };

    private getWheelScrollAxisSize = (): number => {
        return 1;
    };

    private onWheelScrollCompleted = (): void => {
        if (!this._SafeStr_15064) {
            this.startSpringbackIfNeeded();
        }
    };

    private onEntrySpriteClicked(param1: BitmapSpriteWithUserId): void {
        if (!this._component) {
            return;
        }
        this._component.selectAvatar(param1.roomId, param1.userIndex);
    }

    private moveIgnore(param1: BitmapSpriteWithUserId): void {
        if (!this._component || param1 == this._SafeStr_2321) {
            return;
        }
        if (!param1.canIgnore || param1.webId < 0 || this._component.sessionDataManager.isIgnored(param1.webId)) {
            if (this._SafeStr_2321 != null) {
                this._rootDisplayObject.removeChild(this._ignore);
                this._SafeStr_2321 = null;
            }
            return;
        }
        this._ignore.x = param1.x + param1.width + 5;
        this._ignore.y = param1.y + (param1.height - this._ignore.height) / 2;
        this._rootDisplayObject.addChild(this._ignore);
        this._SafeStr_2321 = param1;
    }

    private hitIgnore(param1: number, param2: number): boolean {
        if (this._SafeStr_2321 == null || param1 < this._ignore.x || param1 > this._ignore.x + this._ignore.width || param2 < this._ignore.y || param2 > this._ignore.y + this._ignore.height) {
            return false;
        }
        this._component.localizations.registerParameter("chat.ignore_user.confirm.info", "username", this._SafeStr_2321.userName);
        let _loc4_: string = this._component.localizations.getLocalization("chat.ignore_user.confirm.title");
        let _loc3_: string = this._component.localizations.getLocalization("chat.ignore_user.confirm.info");
        this._component.windowManager.confirmWithModal(_loc4_, _loc3_, 0, this.ignoreConfirmDialogEventProcessor);
        return true;
    }

    private ignoreConfirmDialogEventProcessor = (param1: IConfirmDialog, param2: WindowEvent): void => {
        param1.dispose();
        if (param2.type == "WE_OK") {
            this._component.sessionDataManager.ignoreUser(this._SafeStr_2321.webId);
        }
        if (this._SafeStr_2321 != null) {
            this._rootDisplayObject.removeChild(this._ignore);
            this._SafeStr_2321 = null;
        }
    };

    private cancelSpringback(): void {
        this._SafeStr_15065 = false;
        this._SafeStr_15068 = 0;
        this._SafeStr_15066 = this._SafeStr_4509;
        this._SafeStr_15067 = this._SafeStr_4509;
    }

    private cancelAutoScrollToLatest(): void {
        this._SafeStr_15069 = false;
        this._SafeStr_15072 = 0;
        this._SafeStr_15070 = this._SafeStr_4509;
        this._SafeStr_15071 = this._SafeStr_4509;
    }

    private startAutoScrollToLatest(): void {
        if (this._viewPort == null) {
            return;
        }
        this.cancelSpringback();
        let _loc1_: number = this.bufferHeight - this._viewPort.height + this._SafeStr_15074 | 0;
        if (_loc1_ == this._SafeStr_4509) {
            this.cancelAutoScrollToLatest();
            return;
        }
        this._SafeStr_15069 = true;
        this._SafeStr_15070 = this._SafeStr_4509;
        this._SafeStr_15071 = _loc1_;
        this._SafeStr_15072 = 0;
    }

    private syncMostRecentHistoryMode(): void {
        if (this.isViewingMostRecentChatsWithBuffer()) {
            this._SafeStr_15073 = true;
            this._SafeStr_15074 = this.getCurrentBottomPadding();
        } else {
            this._SafeStr_15073 = false;
        }
    }

    private getCurrentBottomPadding(): number {
        if (this._viewPort == null) {
            return 0;
        }
        return this._SafeStr_4509 - this.bufferHeight + this._viewPort.height | 0;
    }

    private isViewingMostRecentChatsWithBuffer(): boolean {
        return this._viewPort != null && this.getCurrentBottomPadding() >= 100;
    }

    private getSpringbackTargetTopY(): number {
        let _loc2_: number = 0;
        let _loc4_: number = 0;
        if (this._viewPort == null || this.bufferHeight <= 0) {
            return NaN;
        }
        let _loc3_: number = Math.min(200, this.bufferHeight) | 0;
        let _loc1_: number = Math.min(200, this.bufferHeight) | 0;
        if (_loc3_ <= 0 && _loc1_ <= 0) {
            return NaN;
        }
        if (_loc3_ > 0) {
            _loc2_ = _loc3_ - this._viewPort.height | 0;
            if (this._SafeStr_4509 < _loc2_) {
                return _loc2_;
            }
        }
        if (_loc1_ > 0) {
            _loc4_ = this.bufferHeight - _loc1_;
            if (this._SafeStr_4509 > _loc4_) {
                return _loc4_;
            }
        }
        return NaN;
    }

    get [IDisposable](): true {
        return true;
    }
}
