import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { Component } from '@/com/sulake/core/runtime/Component';
import type { ICoreConfiguration } from '@/com/sulake/core/runtime/ICoreConfiguration';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IHabboLocalizationManager } from '@/com/sulake/habbo/localization/IHabboLocalizationManager';
import type { IRoomDesktop } from '@/com/sulake/habbo/ui/IRoomDesktop';
import type { IRoomWidgetHandler } from '@/com/sulake/habbo/ui/IRoomWidgetHandler';
import type { RoomWidgetChatUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetChatUpdateEvent';
import type { RoomWidgetRoomViewUpdateEvent } from '@/com/sulake/habbo/ui/widget/events/RoomWidgetRoomViewUpdateEvent';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import type { IEventDispatcher } from '@habbo-pixi/runtime/events/IEventDispatcher';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabboProperty } from '@/com/sulake/habbo/configuration/enum/HabboProperty';
import { ChatWidgetHandler } from '@/com/sulake/habbo/ui/handler/ChatWidgetHandler';
import { RoomWidgetChatSelectAvatarMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetChatSelectAvatarMessage';
import { RoomWidgetRoomObjectMessage } from '@/com/sulake/habbo/ui/widget/messages/RoomWidgetRoomObjectMessage';
import { RoomChatHistoryViewer } from '@/com/sulake/habbo/ui/widget/roomchat/RoomChatHistoryViewer';
import { RoomChatItem } from '@/com/sulake/habbo/ui/widget/roomchat/RoomChatItem.group';
import { ChatBubbleFactory } from '@/com/sulake/habbo/ui/widget/roomchat/style/ChatBubbleFactory';
import { RoomWidgetBase } from '@/com/sulake/habbo/ui/widget/RoomWidgetBase';
import { RoomEnterEffect } from '@/com/sulake/room/utils/RoomEnterEffect';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class RoomChatWidget extends RoomWidgetBase implements IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.roomchat::RoomChatWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        RoomChatWidget.#initStatics();
        return RoomChatWidget._log;
    }

    private static readonly CHAT_ITEM_LEVEL_HEIGHT: number = 19;
    private static readonly CHAT_ITEM_LEVEL_HEIGHT_SMALL: number = 10;
    private static readonly CHAT_ITEM_NONVISIBLE_MARGIN: number = 20;
    private static readonly CHAT_ITEM_REAL_HEIGHT: number = 32;
    private static readonly ANIMATION_STEP_INTERVAL_MS: number = 25;
    private static readonly ANIMATION_TIMEOUT_MS: number = 4000;
    private static readonly ANIMATION_TIMEOUT_SLOW_MS: number = 6000;
    private static readonly ANIMATION_STEP_PIXELS: number = 3;
    private static readonly MAX_BUFFER_SIZE: number = 1;
    private static readonly MAX_FAST_LEVELS_LORES: number = 8;
    private static readonly MAX_FAST_LEVELS_MIDRES: number = 10;
    private static readonly MAX_FAST_LEVELS_HIRES: number = 12;
    private static readonly MAX_SLOW_LEVELS: number = 0;
    private static readonly CHAT_AREA_HEIGHT_LORES: number = 171;
    private static readonly CHAT_AREA_HEIGHT_MIDRES: number = 209;
    private static readonly CHAT_AREA_HEIGHT_HIRES: number = 247;
    private static readonly CHAT_AREA_MARGIN_BOTTOM: number = 23;
    private static readonly FRIEND_BAR_MARGIN: number = 40;
    private static readonly DESKTOP_WINDOW_LAYER: number = 1;
    private static readonly _SafeStr_8532: number = 750;
    private static readonly _SafeStr_7619: number = 1000;
    private static _chatBubbleFactory: ChatBubbleFactory = null;

    public static get chatBubbleFactory(): ChatBubbleFactory {
        return RoomChatWidget._chatBubbleFactory;
    }

    constructor(param1: IRoomWidgetHandler, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IHabboLocalizationManager, param5: ICoreConfiguration, param6: number, param7: Component) {
        super(param1, param2, param3, param4);
        (param1 instanceof ChatWidgetHandler ? param1 : null).widget = this;
        this._config = param5;
        this._widgetId = param6;
        let _loc9_: IDesktopWindow = param2.getDesktop(1);
        if (_loc9_.height >= 1000) {
            this._SafeStr_3411 = 247;
            this._maxFastLevels = 12;
            RoomChatWidget._log.info("Hi-res chat desktop selected");
        } else if (_loc9_.height >= 750) {
            this._SafeStr_3411 = 209;
            this._maxFastLevels = 10;
            RoomChatWidget._log.info("Mid-res chat desktop selected");
        } else {
            this._SafeStr_3411 = 171;
            this._maxFastLevels = 12;
            RoomChatWidget._log.info("Lo-res chat desktop selected");
        }
        this._SafeStr_2437 = this._SafeStr_3411 + 23;
        this._SafeStr_2175 = asGuarded(param2.createWindow("chat_container", "", 4, 0, 0, new Rectangle(0, 0, 200, this._SafeStr_2437 + 39), null, 0), isIWindowContainer);
        this._SafeStr_2175.background = true;
        this._SafeStr_2175.color = 33554431;
        this._SafeStr_2175.tags.push("room_widget_chat");
        this._SafeStr_2660 = asGuarded(param2.createWindow("chat_contentlist", "", 50, 0, (0x10 | 0x0880) >>> 0, new Rectangle(0, 0, 200, this._SafeStr_2437), null, 0), isIItemListWindow);
        this._SafeStr_2660.disableAutodrag = true;
        this._SafeStr_2175.addChild(this._SafeStr_2660);
        this._SafeStr_2355 = asGuarded(param2.createWindow("chat_active_content", "", 4, 0, 16, new Rectangle(0, 0, 200, this._SafeStr_2437), null, 0), isIWindowContainer);
        this._SafeStr_2355.clipping = false;
        this._SafeStr_2660.addListItem(this._SafeStr_2355);
        this._historyViewer = new RoomChatHistoryViewer(this, param2, this._SafeStr_2175, param3);
        this._baseUrl = param5.getProperty(HabboProperty.SITE_URL);
        this._SafeStr_6439 = param5.getInteger("chat.history.item.max.count", 150);
        let _loc8_: boolean = param5.getBoolean("chat.history.disabled") || this.isGameSession;
        if (this._historyViewer != null) {
            this._historyViewer.disabled = _loc8_;
        }
        if (param7 != null) {
            this._component = param7;
            this._component.registerUpdateReceiver(this, 1);
        }
        if (!RoomChatWidget._chatBubbleFactory) {
            RoomChatWidget._chatBubbleFactory = new ChatBubbleFactory(param3, param2, XML.from(this._assets.getAssetByName("roomchat_styles_chatstyles_xml").content));
        }
    }

    private _timeoutTime: number = 0;
    private _SafeStr_3817: number = 0;

    declare private _SafeStr_2175: IWindowContainer;

    declare private _SafeStr_2660: IItemListWindow;

    declare private _SafeStr_2355: IWindowContainer;

    private _itemList: any[] = [];
    private _SafeStr_2251: any[] = [];
    private _movingItems: any[] = [];

    declare private _widgetId: number;
    static { (this.prototype as any)._widgetId = 0; }

    private _SafeStr_6922: number = 0;
    private _SafeStr_3199: number = 1;

    declare private _baseUrl: string;

    private _SafeStr_4209: number = 1;
    private _SafeStr_5752: number = 0;
    private _cameraOffset: Point = new Point();

    declare private _historyViewer: RoomChatHistoryViewer;

    private _SafeStr_2729: boolean = false;
    private _SafeStr_5039: boolean = false;
    private _component: Component = null;
    private _SafeStr_6439: number = 150;

    declare private _SafeStr_2437: number;
    static { (this.prototype as any)._SafeStr_2437 = 0; }

    private _SafeStr_3511: number = 19;
    private _SafeStr_7436: number = 100;
    private _SafeStr_7510: number = 205;

    declare private _SafeStr_3411: number;
    static { (this.prototype as any)._SafeStr_3411 = 0; }

    declare private _maxFastLevels: number;
    static { (this.prototype as any)._maxFastLevels = 0; }

    public override get mainWindow(): IWindow {
        return this._SafeStr_2175;
    }

    declare private _config: ICoreConfiguration;

    public get config(): ICoreConfiguration {
        return this._config;
    }

    public get handler(): ChatWidgetHandler {
        return this._SafeStr_2143 instanceof ChatWidgetHandler ? this._SafeStr_2143 : null;
    }

    public get isGameSession(): boolean {
        return this.handler.container.roomSession.isGameSession;
    }

    public override reuse(param1: IRoomDesktop): void {
        super.reuse(param1);
        this._SafeStr_2175.background = true;
        this._SafeStr_2175.color = 33554431;
    }

    public override release(): void {
        this.clearChatItems();
        super.release();
    }

    public override dispose(): void {
        let _loc1_: any = null;
        if (this.disposed) {
            return;
        }
        this.clearChatItems();
        this._historyViewer.dispose();
        this._historyViewer = null;
        this._SafeStr_2175.dispose();
        if (this._component != null) {
            this._component.removeUpdateReceiver(this);
            this._component = null;
        }
        super.dispose();
    }

    public override registerUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.addEventListener("RWCUE_EVENT_CHAT", this.onChatMessage);
        param1.addEventListener("RWRVUE_ROOM_VIEW_SIZE_CHANGED", this.onRoomViewUpdate);
        param1.addEventListener("RWRVUE_ROOM_VIEW_POSITION_CHANGED", this.onRoomViewUpdate);
        param1.addEventListener("RWRVUE_ROOM_VIEW_SCALE_CHANGED", this.onRoomViewUpdate);
        super.registerUpdateEvents(param1);
    }

    public override unregisterUpdateEvents(param1: IEventDispatcher): void {
        if (param1 == null) {
            return;
        }
        param1.removeEventListener("RWCUE_EVENT_CHAT", this.onChatMessage);
        param1.removeEventListener("RWRVUE_ROOM_VIEW_SIZE_CHANGED", this.onRoomViewUpdate);
        param1.removeEventListener("RWRVUE_ROOM_VIEW_POSITION_CHANGED", this.onRoomViewUpdate);
        param1.removeEventListener("RWRVUE_ROOM_VIEW_SCALE_CHANGED", this.onRoomViewUpdate);
    }

    public update(param1: number): void {
        let _loc2_: number = 0;
        if (getTimer() > this._timeoutTime && this._timeoutTime > 0) {
            this._timeoutTime = -1;
            this.animationStart();
        }
        if (this._SafeStr_2729) {
            _loc2_ = param1 / 25 * 3 | 0;
            if (_loc2_ + this._SafeStr_3817 > this._SafeStr_3511) {
                _loc2_ = this._SafeStr_3511 - this._SafeStr_3817;
            }
            if (_loc2_ > 0) {
                this.moveItemsUp(_loc2_);
                this._SafeStr_3817 += _loc2_;
            }
            if (this._SafeStr_3817 >= this._SafeStr_3511) {
                this._SafeStr_3511 = 19;
                this._SafeStr_3817 = 0;
                this.animationStop();
                this.processBuffer();
                this._timeoutTime = getTimer() + 4000;
            }
        }
        if (this._historyViewer != null) {
            this._historyViewer.update(param1);
        }
    }

    public addChatMessage(param1: string, param2: string, param3: number, param4: BitmapData, param5: number, param6: boolean): void {
        let _loc7_: RoomChatItem = new RoomChatItem(this, this.windowManager, this.assets, this.getFreeItemId(), this.localizations, this._baseUrl);
        _loc7_.message = param1;
        _loc7_.senderName = param2;
        _loc7_.senderX = param3;
        _loc7_.senderImage = param4;
        _loc7_.senderColor = param5;
        if (param6) {
            _loc7_.chatType = 5;
        }
        _loc7_.renderView();
        this.addChatItem(_loc7_);
    }

    public alignItems(): void {
        let _loc3_: number = 0;
        let _loc1_: RoomChatItem = null;
        let _loc2_: any = null;
        if (this._historyViewer == null) {
            return;
        }
        _loc3_ = this._itemList.length - 1;
        while (_loc3_ >= 0) {
            _loc1_ = this._itemList[_loc3_];
            if (_loc1_ != null) {
                this.setChatItemLocHorizontal(_loc1_);
                this.setChatItemLocVertical(_loc1_);
            }
            _loc3_--;
        }
        _loc3_ = 0;
        while (_loc3_ < this._itemList.length) {
            _loc1_ = this._itemList[_loc3_];
            if (_loc1_ != null) {
                this.setChatItemRenderable(_loc1_);
            }
            _loc3_++;
        }
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_2251.length) {
            _loc1_ = this._SafeStr_2251[_loc3_];
            if (_loc1_ != null) {
                this.setChatItemLocHorizontal(_loc1_);
            }
            _loc3_++;
        }
    }

    public getTotalContentHeight(): number {
        let _loc1_: RoomChatItem = null;
        let _loc3_: number = 0;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._itemList.length) {
            _loc1_ = this._itemList[_loc3_];
            if (_loc1_ != null) {
                if (_loc3_ == 0) {
                    _loc2_ += 19;
                } else {
                    _loc2_ = _loc2_ + this.getItemSpacing(this._itemList[_loc3_ - 1], _loc1_) | 0;
                }
                _loc2_ += (_loc1_.aboveLevels - 1) * 19;
            }
            _loc3_++;
        }
        return _loc2_;
    }

    public onItemMouseClick(param1: number, param2: string, param3: number, param4: number, param5: WindowMouseEvent): void {
        if (param5.shiftKey) {
            if (this._historyViewer != null) {
                this._historyViewer.toggleHistoryViewer();
            }
            return;
        }
        let _loc7_: RoomWidgetRoomObjectMessage = new RoomWidgetRoomObjectMessage("RWROM_GET_OBJECT_INFO", param1, param3);
        this.messageListener.processWidgetMessage(_loc7_);
        let _loc6_: RoomWidgetChatSelectAvatarMessage = new RoomWidgetChatSelectAvatarMessage("RWCSAM_MESSAGE_SELECT_AVATAR", param1, param2, param4);
        this.messageListener.processWidgetMessage(_loc6_);
    }

    public onItemMouseDown(param1: number, param2: number, param3: number, param4: WindowMouseEvent): void {
        if (this.historyViewerVisible()) {
            return;
        }
        if (this._historyViewer != null) {
            this._historyViewer.beginDrag(param4.stageY, true);
        }
    }

    public onItemMouseOver(param1: number, param2: number, param3: number, param4: WindowMouseEvent): void {
    }

    public onItemMouseOut(param1: number, param2: number, param3: number, param4: WindowMouseEvent): void {
    }

    public onPulldownMouseDown(param1: WindowMouseEvent): void {
        if (this._historyViewer != null) {
            this._historyViewer.beginDrag(param1.stageY, true);
        }
    }

    public onPulldownCloseButtonClicked(param1: WindowMouseEvent): void {
        if (this._historyViewer != null) {
            this._historyViewer.hideHistoryViewer();
        }
    }

    public stretchAreaBottomBy(param1: number): void {
        let _loc2_: number = this._SafeStr_2175.bottom + param1 - 39;
        this.stretchAreaBottomTo(_loc2_);
    }

    public stretchAreaBottomTo(param1: number): void {
        let _loc2_: number = this._SafeStr_2175.context.getDesktopWindow().height - 39 - 40;
        param1 = Math.min(param1, _loc2_);
        this._SafeStr_2437 = param1 - this._SafeStr_2175.y | 0;
        this._SafeStr_2175.height = this._SafeStr_2437 + 39;
        if (this._historyViewer != null) {
            this._historyViewer.containerResized(this._SafeStr_2175.rectangle);
        }
    }

    public resetArea(param1: boolean = true): void {
        if (this._historyViewer == null) {
            return;
        }
        this.animationStop();
        this._SafeStr_2437 = this._SafeStr_3411 + 23;
        this._SafeStr_2175.height = this._SafeStr_2437 + this._historyViewer.pulldownBarHeight | 0;
        this._SafeStr_2660.width = this._SafeStr_2175.width - this._historyViewer.scrollbarWidth | 0;
        this._SafeStr_2660.height = this._SafeStr_2437;
        this._SafeStr_2355.width = this._SafeStr_2175.width - this._historyViewer.scrollbarWidth | 0;
        if (this.historyViewerActive()) {
            this._SafeStr_2355.height = this.getTotalContentHeight() + 23;
        } else {
            this._SafeStr_2355.height = this._SafeStr_2437;
        }
        this._SafeStr_2660.scrollV = 1;
        if (!this.historyViewerActive()) {
            this._historyViewer.containerResized(this._SafeStr_2175.rectangle);
        }
        this.purgeItems();
        if (this.historyViewerActive() || param1) {
            this.alignItems();
        }
    }

    public hideHistoryViewer(): void {
        if (this._historyViewer != null) {
            this._historyViewer.hideHistoryViewer();
        }
    }

    public resizeContainerToLowestItem(): void {
        let _loc3_: number = 0;
        let _loc1_: RoomChatItem = null;
        let _loc4_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._itemList.length) {
            _loc1_ = this._itemList[_loc3_];
            if (_loc1_.y > _loc4_) {
                _loc4_ = _loc1_.y | 0;
            }
            _loc3_++;
        }
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_2251.length) {
            _loc1_ = this._SafeStr_2251[_loc3_];
            if (_loc1_.y > _loc4_) {
                _loc4_ = _loc1_.y | 0;
            }
            _loc3_++;
        }
        _loc4_ += 32;
        _loc4_ = _loc4_ < 0 ? 0 : _loc4_;
        let _loc2_: number = this._SafeStr_2175.bottom;
        this.stretchAreaBottomTo(this._SafeStr_2175.top + _loc4_);
        _loc2_ -= this._SafeStr_2175.bottom;
        if (Math.abs(_loc2_) < 3) {
            this.resetArea();
            return;
        }
        _loc3_ = 0;
        while (_loc3_ < this._itemList.length) {
            _loc1_ = this._itemList[_loc3_];
            _loc1_.y += _loc2_;
            _loc3_++;
        }
        _loc3_ = 0;
        while (_loc3_ < this._SafeStr_2251.length) {
            _loc1_ = this._SafeStr_2251[_loc3_];
            _loc1_.y += _loc2_;
            _loc3_++;
        }
        this._SafeStr_5039 = true;
    }

    public mouseUp(): void {
        this._SafeStr_2660.stopDragging();
        let _loc1_: number = this._SafeStr_2175.bottom - 39;
        if (_loc1_ < this._SafeStr_3411) {
            if (_loc1_ <= this._SafeStr_2437 + this._SafeStr_2175.y) {
                if (this.historyViewerActive()) {
                    this.hideHistoryViewer();
                }
                this.resetArea();
                return;
            }
        }
        if (this._SafeStr_5039 && !this.historyViewerActive()) {
            this.resetArea();
            this._SafeStr_5039 = false;
        }
    }

    public reAlignItemsToHistoryContent(): void {
        if (this.historyViewerActive()) {
            this._SafeStr_2355.height = this.getTotalContentHeight() + 23;
            this.alignItems();
        }
    }

    public enableDragTooltips(): void {
        let _loc2_: number = 0;
        let _loc1_: RoomChatItem = null;
        _loc2_ = 0;
        while (_loc2_ < this._itemList.length) {
            _loc1_ = this._itemList[_loc2_];
            _loc1_.enableDragTooltip();
            _loc2_++;
        }
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2251.length) {
            _loc1_ = this._SafeStr_2251[_loc2_];
            _loc1_.enableDragTooltip();
            _loc2_++;
        }
    }

    public disableDragTooltips(): void {
        let _loc2_: number = 0;
        let _loc1_: RoomChatItem = null;
        _loc2_ = 0;
        while (_loc2_ < this._itemList.length) {
            _loc1_ = this._itemList[_loc2_];
            _loc1_.disableDragTooltip();
            _loc2_++;
        }
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_2251.length) {
            _loc1_ = this._SafeStr_2251[_loc2_];
            _loc1_.disableDragTooltip();
            _loc2_++;
        }
    }

    private clearChatItems(): void {
        let _loc1_: RoomChatItem = null;
        while (this._movingItems.length > 0) {
            _loc1_ = this._movingItems.shift();
        }
        while (this._itemList.length > 0) {
            _loc1_ = this._itemList.shift();
            _loc1_.dispose();
        }
        while (this._SafeStr_2251.length > 0) {
            _loc1_ = this._SafeStr_2251.shift();
            _loc1_.dispose();
        }
    }

    private addChatItem(param1: RoomChatItem): void {
        if (this._SafeStr_4209 != 1) {
            param1.senderX /= this._SafeStr_4209;
        }
        param1.senderX -= this._cameraOffset.x;
        this.setChatItemLocHorizontal(param1);
        this._SafeStr_2251.push(param1);
        this.processBuffer();
    }

    private processBuffer(): void {
        if (this._SafeStr_2729) {
            return;
        }
        if (this._SafeStr_2251.length == 0) {
            return;
        }
        while (this._SafeStr_2251.length > 1 || this.historyViewerActive() && this._SafeStr_2251.length > 0) {
            this.activateItemFromBuffer();
        }
        let _loc1_: boolean = false;
        if (this._itemList.length == 0) {
            _loc1_ = true;
        } else {
            _loc1_ = this.checkLastItemAllowsAdding(this._SafeStr_2251[0]);
        }
        if (_loc1_) {
            this.activateItemFromBuffer();
            this._timeoutTime = getTimer() + 4000;
        } else {
            if (this._itemList.length > 0 && this._SafeStr_2251.length > 0) {
                this._SafeStr_3511 = this.getItemSpacing(this._itemList[this._itemList.length - 1], this._SafeStr_2251[0]) | 0;
            } else {
                this._SafeStr_3511 = 19;
            }
            this.animationStart();
        }
    }

    private activateItemFromBuffer(): void {
        let _loc2_: RoomChatItem = null;
        let _loc3_: IWindowContainer = null;
        let _loc1_: number = 0;
        if (this._SafeStr_2251.length == 0) {
            return;
        }
        if (this.historyViewerMinimized()) {
            this.resetArea();
            this.hideHistoryViewer();
        }
        if (!this.checkLastItemAllowsAdding(this._SafeStr_2251[0])) {
            this.selectItemsToMove();
            this.moveItemsUp(this.getItemSpacing(this._itemList[this._itemList.length - 1], this._SafeStr_2251[0]) | 0);
            if (!this.checkLastItemAllowsAdding(this._SafeStr_2251[0])) {
                this._SafeStr_2355.height += 19;
                if (this._historyViewer != null) {
                    this._historyViewer.containerResized(this._SafeStr_2175.rectangle);
                }
            }
        }
        _loc2_ = this._SafeStr_2251.shift();
        if (_loc2_ != null) {
            _loc2_.renderView();
            _loc3_ = _loc2_.view;
            if (_loc3_ != null) {
                this._SafeStr_2355.addChild(_loc3_);
                _loc2_.timeStamp = new Date().getTime() | 0;
                this._itemList.push(_loc2_);
                _loc1_ = 0;
                if (this._itemList.length > 1) {
                    _loc1_ = this._itemList[this._itemList.length - 2].screenLevel | 0;
                    if (this.historyViewerActive()) {
                        _loc2_.screenLevel = _loc1_ + 1;
                    } else {
                        _loc2_.screenLevel = _loc1_ + Math.max(this._SafeStr_3199, 1) | 0;
                    }
                } else {
                    _loc2_.screenLevel = 100;
                }
                _loc2_.aboveLevels = this._SafeStr_3199 | 0;
                if (_loc2_.aboveLevels > this._maxFastLevels + 0 + 2) {
                    _loc2_.aboveLevels = this._maxFastLevels + 0 + 2;
                }
                this._SafeStr_3199 = 0;
                this.setChatItemLocHorizontal(_loc2_);
                this.setChatItemLocVertical(_loc2_);
                this.setChatItemRenderable(_loc2_);
            }
        }
    }

    private checkLastItemAllowsAdding(param1: RoomChatItem): boolean {
        if (this._itemList.length == 0) {
            return true;
        }
        let _loc2_: RoomChatItem = this._itemList[this._itemList.length - 1];
        if (param1 == null || _loc2_ == null) {
            return false;
        }
        if (_loc2_.view == null) {
            return true;
        }
        if (this._SafeStr_2355.bottom - (this._SafeStr_2355.y + _loc2_.y + _loc2_.height) - 23 <= this.getItemSpacing(_loc2_, param1)) {
            return false;
        }
        return true;
    }

    private animationStart(): void {
        if (this._SafeStr_2729) {
            return;
        }
        this.selectItemsToMove();
        this._SafeStr_2729 = true;
    }

    private animationStop(): void {
        this._SafeStr_2729 = false;
    }

    private selectItemsToMove(): void {
        let _loc3_: number = 0;
        let _loc1_: RoomChatItem = null;
        if (this._SafeStr_2729) {
            return;
        }
        this.purgeItems();
        this._movingItems = [];
        let _loc2_: number = new Date().getTime() | 0;
        let _loc4_: number = 0;
        if (this._itemList.length == 0) {
            this._SafeStr_3199 = 1;
            return;
        }
        if (this.historyViewerActive()) {
            return;
        }
        this._SafeStr_3199 = this._SafeStr_3199 + 1;
        _loc3_ = this._itemList.length - 1;
        while (_loc3_ >= 0) {
            _loc1_ = this._itemList[_loc3_];
            if (_loc1_.view != null) {
                if (_loc1_.screenLevel > 0 || _loc1_.screenLevel == _loc4_ - 1 || _loc2_ - _loc1_.timeStamp >= 6000) {
                    _loc1_.timeStamp = _loc2_;
                    _loc4_ = _loc1_.screenLevel;
                    _loc1_.screenLevel--;
                    this._movingItems.push(_loc1_);
                }
            }
            _loc3_--;
        }
    }

    private moveItemsUp(param1: number): void {
        let _loc2_: boolean = false;
        let _loc5_: number = 0;
        if (this._movingItems == null) {
            return;
        }
        if (this._movingItems.length == 0) {
            return;
        }
        let _loc3_: RoomChatItem = null;
        let _loc4_: number = -1;
        _loc5_ = this._movingItems.length - 1;
        while (_loc5_ >= 0) {
            _loc3_ = this._movingItems[_loc5_];
            if (_loc3_ != null) {
                if (_loc4_ == -1) {
                    _loc4_ = this._itemList.indexOf(_loc3_);
                } else {
                    _loc4_++;
                }
                _loc2_ = true;
                if (this.historyViewerActive()) {
                    if (_loc3_.y - param1 + _loc3_.height < 0) {
                        _loc2_ = false;
                    }
                }
                if (_loc4_ > 0) {
                    if (this._itemList[_loc4_ - 1].view != null) {
                        if (_loc3_.y - param1 - this._itemList[_loc4_ - 1].y < this.getItemSpacing(this._itemList[_loc4_ - 1], _loc3_)) {
                            _loc2_ = false;
                        }
                    }
                }
                if (_loc2_) {
                    _loc3_.y -= param1;
                }
            }
            _loc5_--;
        }
    }

    private setChatItemLocHorizontal(param1: RoomChatItem): void {
        let _loc4_: any = NaN;
        let _loc5_: any = NaN;
        if (param1 == null || this._historyViewer == null) {
            return;
        }
        let _loc2_: number = (param1.senderX + this._cameraOffset.x) * this._SafeStr_4209;
        let _loc3_: number = _loc2_ - param1.width / 2;
        let _loc8_: number = _loc3_ + param1.width;
        let _loc7_: number = -this._SafeStr_2175.width / 2 - 20 + this._SafeStr_7436;
        let _loc6_: number = this._SafeStr_2175.width / 2 + 20 - this._historyViewer.scrollbarWidth - this._SafeStr_7510;
        let _loc9_: boolean = _loc3_ >= _loc7_ && _loc3_ <= _loc6_;
        let _loc10_: boolean = _loc8_ >= _loc7_ && _loc8_ <= _loc6_;
        if (_loc9_ && _loc10_) {
            _loc5_ = _loc4_ = _loc3_;
        } else if (_loc2_ >= 0) {
            _loc4_ = _loc6_ - param1.width;
        } else {
            _loc4_ = _loc7_;
        }
        param1.x = Number(_loc4_ + this._SafeStr_2175.width / 2 + this._SafeStr_2175.x);
        if (_loc2_ < _loc7_ || _loc2_ > _loc6_) {
            param1.hidePointer();
        } else {
            param1.setPointerOffset(_loc3_ - _loc4_);
        }
    }

    private setChatItemLocVertical(param1: RoomChatItem): void {
        let _loc2_: number = 0;
        let _loc4_: number = NaN;
        let _loc3_: number = NaN;
        if (param1 != null) {
            _loc2_ = this._itemList.indexOf(param1);
            _loc4_ = this.historyViewerActive() ? 0 : this._SafeStr_3199;
            if (_loc2_ == this._itemList.length - 1) {
                param1.y = this.getAreaBottom() - (_loc4_ + 1) * 19 - 23;
            } else {
                _loc3_ = Number(this._itemList[_loc2_ + 1].aboveLevels);
                if (_loc3_ < 2) {
                    param1.y = this._itemList[_loc2_ + 1].y - this.getItemSpacing(param1, this._itemList[_loc2_ + 1]);
                } else {
                    param1.y = this._itemList[_loc2_ + 1].y - _loc3_ * 19;
                }
            }
        }
    }

    private setChatItemRenderable(param1: RoomChatItem): void {
        if (param1 != null) {
            if (param1.y < -32) {
                if (param1.view != null) {
                    this._SafeStr_2355.removeChild(param1.view);
                    param1.hideView();
                }
            } else if (param1.view == null) {
                param1.renderView();
                if (param1.view != null) {
                    this._SafeStr_2355.addChild(param1.view);
                }
            }
        }
    }

    private getAreaBottom(): number {
        if (this.historyViewerActive()) {
            return this._SafeStr_2355.height;
        }
        return this._SafeStr_2437 + this._SafeStr_2175.y;
    }

    private getItemSpacing(param1: RoomChatItem, param2: RoomChatItem): number {
        let _loc3_: number = RoomChatWidget.chatBubbleFactory.getActualBubbleHeight(param1.chatStyle);
        if (param1.checkOverlap(_loc3_, param2.x, param1.y, param2.width, param2.height)) {
            return 19;
        }
        return 10;
    }

    private purgeItems(): void {
        let _loc1_: RoomChatItem = null;
        if (this.historyViewerActive()) {
            return;
        }
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        while (this._itemList.length > this._SafeStr_6439) {
            _loc1_ = this._itemList.shift();
            _loc4_ = this._movingItems.indexOf(_loc1_);
            if (_loc4_ > -1) {
                this._movingItems.splice(_loc4_, 1);
            }
            if (_loc1_.view != null) {
                this._SafeStr_2355.removeChild(_loc1_.view);
                _loc1_.hideView();
            }
            _loc1_.dispose();
            _loc1_ = null;
        }
        let _loc2_: boolean = false;
        _loc3_ = 0;
        while (_loc3_ < this._itemList.length) {
            _loc1_ = this._itemList[_loc3_];
            if (_loc1_ != null) {
                if (_loc1_.y > -32) {
                    _loc2_ = true;
                    break;
                }
                _loc1_.aboveLevels = 1;
                if (_loc1_.view != null) {
                    _loc4_ = this._movingItems.indexOf(_loc1_);
                    if (_loc4_ > -1) {
                        this._movingItems.splice(_loc4_, 1);
                    }
                    this._SafeStr_2355.removeChild(_loc1_.view);
                    _loc1_.hideView();
                }
            }
            _loc3_++;
        }
        if (this._SafeStr_2251.length > 0) {
            _loc2_ = true;
        }
        if (this.getTotalContentHeight() > 19 && !_loc2_ && !this.historyViewerActive()) {
            if (this._historyViewer != null) {
                this.stretchAreaBottomTo(this._SafeStr_2175.y);
                this.alignItems();
                if (!this.historyViewerActive()) {
                    this._historyViewer.showHistoryViewer();
                }
                if (!this.historyViewerVisible()) {
                    this._historyViewer.visible = true;
                }
            }
        } else if (this.historyViewerVisible()) {
            this._historyViewer.visible = false;
        }
    }

    private getFreeItemId(): string {
        return "chat_" + this._widgetId.toString() + "_item_" + (this._SafeStr_6922++).toString();
    }

    private historyViewerActive(): boolean {
        return this._historyViewer != null ? this._historyViewer.active : false;
    }

    private historyViewerVisible(): boolean {
        return this._historyViewer != null ? this._historyViewer.visible : false;
    }

    private historyViewerMinimized(): boolean {
        return this._SafeStr_2660.height <= 1;
    }

    private onChatMessage = (param1: RoomWidgetChatUpdateEvent): void => {
        if (RoomEnterEffect.isRunning() && param1.chatType != 1) {
            return;
        }
        let _loc2_: RoomChatItem = new RoomChatItem(this, this.windowManager, this.assets, this.getFreeItemId(), this.localizations, this._baseUrl);
        _loc2_.define(param1);
        this.addChatItem(_loc2_);
    };

    private onRoomViewUpdate = (param1: RoomWidgetRoomViewUpdateEvent): void => {
        let _loc2_: Rectangle = param1.rect;
        if (param1.scale > 0) {
            if (this._SafeStr_5752 == 0) {
                this._SafeStr_5752 = param1.scale;
            } else {
                this._SafeStr_4209 = param1.scale / this._SafeStr_5752;
            }
        }
        if (param1.positionDelta != null) {
            this._cameraOffset.x += param1.positionDelta.x / this._SafeStr_4209;
            this._cameraOffset.y += param1.positionDelta.y / this._SafeStr_4209;
        }
        if (param1.rect != null) {
            if (this._historyViewer == null) {
                return;
            }
            this._SafeStr_2175.width = _loc2_.width | 0;
            this._SafeStr_2175.height = this._SafeStr_2437 + this._historyViewer.pulldownBarHeight | 0;
            this._SafeStr_2660.width = this._SafeStr_2175.width - this._historyViewer.scrollbarWidth | 0;
            this._SafeStr_2660.height = this._SafeStr_2437;
            this._SafeStr_2660.x = this._SafeStr_2175.x;
            this._SafeStr_2660.y = this._SafeStr_2175.y;
            this._SafeStr_2355.width = this._SafeStr_2175.width - this._historyViewer.scrollbarWidth | 0;
            this._SafeStr_2355.height = this._SafeStr_2437;
            if (this.historyViewerActive()) {
                this.reAlignItemsToHistoryContent();
            }
            this._historyViewer.containerResized(this._SafeStr_2175.rectangle, true);
        }
        this.alignItems();
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (RoomChatWidget.#staticsReady) return;
        RoomChatWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(RoomChatWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.ui.widget.roomchat.RoomChatWidget"));
    }

    get [IUpdateReceiver](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
