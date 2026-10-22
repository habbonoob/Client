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
import { ChatHistoryScrollBar } from '@/com/sulake/habbo/freeflowchat/HabboFreeFlowChat.group';
import { BitmapSpriteWithUserId } from '@/com/sulake/habbo/freeflowchat/history/visualization/entry/BitmapSpriteWithUserId';

export class ChatHistoryScrollView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.freeflowchat.history.visualization::ChatHistoryScrollView'); }

    constructor(param1: HabboFreeFlowChat, param2: ChatHistoryBuffer) {
        this._component = param1;
        this._historyBuffer = param2;
        this._rootDisplayObject = new Sprite();
        this._rootDisplayObject.x = 0;
        this._rootDisplayObject.y = 0;
        this._rootDisplayObject.addEventListener("addedToStage", this.onAddedToStage);
        this._scrollBar = new ChatHistoryScrollBar(this, param1);
        this._ignore = new Bitmap();
        this._ignore.bitmapData = castTo(this._component.assets.getAssetByName("close_x").content, BitmapData);
        this._SafeStr_2321 = null;
    }

    declare private _component: HabboFreeFlowChat;

    declare private _historyBuffer: ChatHistoryBuffer;

    declare private _SafeStr_2569: Stage;

    declare private _SafeStr_2382: BitmapSpriteWithUserId[];

    private _topY: number = 0;

    declare private _viewPort: Rectangle;

    private _visibleWidth: number = 0;

    declare private _SafeStr_5599: number;
    static { (this.prototype as any)._SafeStr_5599 = 0; }

    declare private _SafeStr_6890: number;
    static { (this.prototype as any)._SafeStr_6890 = 0; }

    declare private _SafeStr_2833: Sprite;

    private _isActive: boolean = false;

    declare private _scrollBar: ChatHistoryScrollBar;

    declare private _ignore: Bitmap;

    declare private _SafeStr_2321: BitmapSpriteWithUserId;

    declare private _rootDisplayObject: DisplayObjectContainer;

    public get rootDisplayObject(): DisplayObjectContainer {
        return this._rootDisplayObject;
    }

    public get disposed(): boolean {
        return this._SafeStr_2833 == null && this._rootDisplayObject == null;
    }

    public get topY(): number {
        return this._topY;
    }

    public set topY(param1: number) {
        let _loc4_: number = 0;
        let _loc3_: number = 0;
        let _loc2_: IChatHistoryEntryBitmap = null;
        this._topY = param1;
        if (this._SafeStr_2382) {
            _loc4_ = 0;
            _loc3_ = -this._topY;
            while (_loc4_ < this._historyBuffer.entries.length) {
                if (this._SafeStr_2382.length <= _loc4_) {
                    break;
                }
                _loc2_ = this._historyBuffer.entries[_loc4_];
                _loc3_ = _loc3_ - _loc2_.overlap.y | 0;
                this._SafeStr_2382[_loc4_].y = _loc3_;
                _loc3_ += _loc2_.bitmap.height - 8;
                _loc4_++;
            }
        }
        if (this._SafeStr_2321 != null) {
            this._ignore.y = this._SafeStr_2321.y + (this._SafeStr_2321.height - this._ignore.height) / 2;
        }
        this._scrollBar.updateThumbTrack();
    }

    public get bufferHeight(): number {
        return this._historyBuffer.totalHeight;
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
        this._SafeStr_2833.graphics.clear();
        this._SafeStr_2833.graphics.beginFill(16777215);
        this._SafeStr_2833.graphics.drawRect(0, 0, this.viewPort.width, this.viewPort.height);
        this._rootDisplayObject.mask = this._SafeStr_2833;
        this._scrollBar.displayObject.x = this._viewPort.width - 0;
        this.viewBottom = param1.height | 0;
    }

    public set viewBottom(param1: number) {
        this._rootDisplayObject.y = param1 - this._viewPort.height;
        this._scrollBar.height = param1;
        this._scrollBar.displayObject.y = this._viewPort.height - param1;
    }

    public set viewWidth(param1: number) {
        this._visibleWidth = param1;
        this._scrollBar.displayObject.x = this._visibleWidth - 0;
    }

    public get isActive(): boolean {
        return this._isActive;
    }

    public dispose(): void {
        this.deactivateScrolling();
        this.deactivateView();
        this._SafeStr_2833 = null;
        this._ignore = null;
        this._SafeStr_2321 = null;
        if (this._rootDisplayObject) {
            this._rootDisplayObject.removeEventListener("addedToStage", this.onAddedToStage);
            this._rootDisplayObject = null;
        }
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
        _loc3_ = -this._topY;
        while (_loc4_ < this._historyBuffer.entries.length) {
            _loc2_ = new BitmapSpriteWithUserId();
            _loc1_ = this._historyBuffer.entries[_loc4_];
            _loc2_.roomId = _loc1_.roomId;
            _loc2_.userId = _loc1_.userId;
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
    }

    public deactivateView(): void {
        if (this.disposed) {
            return;
        }
        for (const _loc1_ of this._SafeStr_2382 ?? []) {
            this._rootDisplayObject.removeChild(_loc1_);
            _loc1_.bitmapData = null;
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
        this._rootDisplayObject.stage.addEventListener("mouseDown", this.mouseDragEventHandler);
        this._SafeStr_2569 = this._rootDisplayObject.stage;
        this._SafeStr_2569.addEventListener("resize", this.onStageResized);
    }

    public deactivateScrolling(): void {
        if (this._SafeStr_2569) {
            this._SafeStr_2569.removeEventListener("mouseDown", this.mouseDragEventHandler);
            this._SafeStr_2569.removeEventListener("mouseMove", this.mouseDragEventHandler, true);
            this._SafeStr_2569.removeEventListener("mouseUp", this.mouseDragEventHandler);
            this._SafeStr_2569.removeEventListener("resize", this.onStageResized);
        }
    }

    public addHistoryEntry(param1: IChatHistoryEntryBitmap): void {
        let _loc2_: BitmapSpriteWithUserId = new BitmapSpriteWithUserId();
        _loc2_.bitmapData = param1.bitmap;
        _loc2_.y = -this._topY + this._historyBuffer.totalHeight - param1.bitmap.height + 8;
        _loc2_.x = 3;
        _loc2_.userId = param1.userId;
        _loc2_.roomId = param1.roomId;
        _loc2_.canIgnore = param1.canIgnore;
        _loc2_.userName = param1.userName;
        this._SafeStr_2382.push(_loc2_);
        this._rootDisplayObject.addChild(this._SafeStr_2382[this._SafeStr_2382.length - 1]);
    }

    public scrollUpAndSpliceTopItem(param1: number): void {
        if (this._SafeStr_2382 && this._SafeStr_2382.length > 0) {
            this._rootDisplayObject.removeChild(this._SafeStr_2382[0]);
            this._SafeStr_2382.splice(0, 1);
            for (const _loc2_ of this._SafeStr_2382 ?? []) {
                _loc2_.y -= param1;
            }
        }
    }

    public scrollToBottom(): void {
        this.topY = this._historyBuffer.totalHeight - this.viewPort.height + 100 | 0;
    }

    private findSpriteAtY(param1: number): BitmapSpriteWithUserId {
        for (const _loc2_ of this._SafeStr_2382 ?? []) {
            if (param1 >= _loc2_.y && param1 <= _loc2_.y + _loc2_.height) {
                return _loc2_;
            }
        }
        return null;
    }

    private onEntrySpriteClicked(param1: BitmapSpriteWithUserId): void {
        if (!this._component) {
            return;
        }
        this._component.selectAvatar(param1.roomId, param1.userId);
    }

    private moveIgnore(param1: BitmapSpriteWithUserId): void {
        if (!this._component || param1 == this._SafeStr_2321) {
            return;
        }
        if (!param1.canIgnore || this._component.sessionDataManager.isIgnored(param1.userId)) {
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
            this._component.sessionDataManager.ignoreUser(this._SafeStr_2321.userId);
        }
        if (this._SafeStr_2321 != null) {
            this._rootDisplayObject.removeChild(this._ignore);
            this._SafeStr_2321 = null;
        }
    };

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
                    this._scrollBar.endScroll();
                    this._SafeStr_5599 = _loc2_.stageY | 0;
                    this._SafeStr_6890 = this.topY;
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
                _loc4_ = _loc2_.stageY - this._SafeStr_5599 | 0;
                if (_loc4_ < 1 && _loc4_ > -1) {
                    if (!this.hitIgnore(_loc2_.stageX | 0, _loc2_.stageY | 0)) {
                        _loc3_ = this.findSpriteAtY(_loc2_.stageY | 0);
                        if (_loc3_) {
                            this.onEntrySpriteClicked(_loc3_);
                            this.moveIgnore(_loc3_);
                        }
                    }
                }
        }
    };

    private onAddedToStage = (param1: Event): void => {
        let _loc2_: Stage = this._rootDisplayObject.stage;
        this.viewPort = new Rectangle(0, 0, _loc2_.stageWidth, _loc2_.stageHeight - 50);
    };

    private onStageResized = (param1: Event): void => {
        if (this._SafeStr_2569) {
            this.viewPort = new Rectangle(0, 0, this._SafeStr_2569.stageWidth, this._SafeStr_2569.stageHeight - 50);
        }
    };

    get [IDisposable](): true {
        return true;
    }
}
