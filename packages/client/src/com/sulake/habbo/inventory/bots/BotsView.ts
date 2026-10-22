import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IAvatarImage } from '@/com/sulake/habbo/avatar/IAvatarImage';
import type { IAvatarImageListener } from '@/com/sulake/habbo/avatar/IAvatarImageListener';
import type { IAvatarRenderManager } from '@/com/sulake/habbo/avatar/IAvatarRenderManager';
import type { BotData } from '@/com/sulake/habbo/communication/messages/parser/inventory/bots/BotData';
import type { BotsModel } from '@/com/sulake/habbo/inventory/bots/BotsModel';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { BotGridItem } from '@/com/sulake/habbo/inventory/bots/BotGridItem';

export class BotsView implements IInventoryView, IAvatarImageListener {
    static { registerClassName(this, 'com.sulake.habbo.inventory.bots::BotsView'); }

    private readonly STATE_NULL: number = 0;
    private readonly STATE_INITIALIZING: number = 1;
    private readonly STATE_EMPTY: number = 2;
    private readonly STATE_CONTENT: number = 3;

    constructor(param1: BotsModel, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IRoomEngine, param5: IAvatarRenderManager) {
        this._SafeStr_2134 = param1;
        this._SafeStr_3052 = param3;
        this._windowManager = param2;
        this._roomEngine = param4;
        this._avatarRenderer = param5;
        this._gridItems = new UtilsMap();
    }

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2134: BotsModel;

    declare private _grid: IItemGridWindow;

    declare private _roomEngine: IRoomEngine;

    declare private _avatarRenderer: IAvatarRenderManager;

    declare private _gridItems: UtilsMap;

    declare private _SafeStr_2555: BotGridItem;

    private _SafeStr_3894: number = 0;

    declare private _SafeStr_4888: number;
    static { (this.prototype as any)._SafeStr_4888 = 0; }

    private _isInitialized: boolean = false;
    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isVisible(): boolean {
        return !!(this._view && this._view.parent != null && this._view.visible);
    }

    public dispose(): void {
        this._windowManager = null;
        this._avatarRenderer = null;
        this._roomEngine = null;
        this._SafeStr_3052 = null;
        this._SafeStr_2134 = null;
        this._view = null;
        this._disposed = true;
    }

    public update(): void {
        if (!this._isInitialized) {
            return;
        }
        this.updateGrid();
        this.updatePreview(this._SafeStr_2555);
        this.updateContainerVisibility();
    }

    public removeItem(param1: number): void {
        if (!this._isInitialized) {
            return;
        }
        let _loc2_: BotGridItem = asInstanceOf(this._gridItems.remove(param1), BotGridItem);
        if (_loc2_ == null) {
            return;
        }
        this._grid.removeGridItem(_loc2_.window);
        if (this._SafeStr_2555 == _loc2_) {
            this._SafeStr_2555 = null;
            this.selectFirst();
        }
    }

    public addItem(param1: BotData): void {
        if (!this._isInitialized) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (this._gridItems.getValue(param1.id) != null) {
            return;
        }
        let _loc2_: BotGridItem = new BotGridItem(this, param1, this._windowManager, this._SafeStr_3052, this._SafeStr_2134.isUnseen(param1.id));
        if (_loc2_ != null) {
            this._grid.addGridItem(_loc2_.window);
            this._gridItems.add(param1.id, _loc2_);
            if (this._SafeStr_2555 == null) {
                this.selectFirst();
            }
        }
    }

    public placeItemToRoom(param1: number, param2: boolean = false): void {
        this._SafeStr_2134.placeItemToRoom(param1, param2);
    }

    public getWindowContainer(): IWindowContainer {
        if (!this._isInitialized) {
            this.init();
        }
        if (this._view == null) {
            return null;
        }
        if (this._view.disposed) {
            return null;
        }
        return this._view;
    }

    public setSelectedGridItem(param1: BotGridItem): void {
        if (!this._isInitialized) {
            return;
        }
        if (this._SafeStr_2555 != null) {
            this._SafeStr_2555.setSelected(false);
        }
        this._SafeStr_2555 = param1;
        if (this._SafeStr_2555 != null) {
            this._SafeStr_2555.setSelected(true);
        }
        this.updatePreview(param1);
    }

    public updateState(): void {
        let _loc1_: number = 0;
        if (!this._isInitialized) {
            return;
        }
        let _loc2_: UtilsMap = this._SafeStr_2134.items;
        if (!this._SafeStr_2134.isListInitialized()) {
            _loc1_ = 1;
        } else if (!_loc2_ || _loc2_.length == 0) {
            _loc1_ = 2;
        } else {
            _loc1_ = 3;
        }
        if (this._SafeStr_3894 == _loc1_) {
            return;
        }
        this._SafeStr_3894 = _loc1_;
        this.updateContainerVisibility();
        if (this._SafeStr_3894 == 3) {
            this.updateGrid();
            this.updatePreview();
        }
    }

    public getGridItemImage(param1: BotData): BitmapData {
        let _loc2_: number = 3;
        return this.getItemImage(param1, _loc2_, false, "h");
    }

    public getItemImage(param1: BotData, param2: number, param3: boolean, param4: string): BitmapData {
        let _loc5_: BitmapData = null;
        let _loc6_: IAvatarImage = this._avatarRenderer.createAvatarImage(param1.figure, param4, param1.gender, this);
        _loc6_.setDirection("full", param2);
        if (param3) {
            _loc5_ = _loc6_.getCroppedImage("full");
        } else {
            _loc5_ = _loc6_.getCroppedImage("head");
        }
        _loc6_.dispose();
        return _loc5_;
    }

    public avatarImageReady(param1: string): void {
        if (this.disposed) {
            return;
        }
        for (const _loc2_ of valuesOf(this._gridItems)) {
            if (_loc2_.data.figure == param1) {
                _loc2_.setImage(this.getGridItemImage(_loc2_.data));
            }
        }
    }

    public selectById(param1: number): void {
        this.setSelectedGridItem(this._gridItems.getValue(param1));
    }

    private selectFirst(): void {
        if (this._gridItems == null || this._gridItems.length == 0) {
            this.updatePreview();
            return;
        }
        this.setSelectedGridItem(this._gridItems.getWithIndex(0));
    }

    private updateGrid(): void {
        let _loc4_: number = 0;
        let _loc3_: BotGridItem = null;
        if (this._view == null) {
            return;
        }
        let _loc1_: any[] = this._gridItems.getKeys();
        let _loc2_: any[] = this._SafeStr_2134.items ? this._SafeStr_2134.items.getKeys() : [];
        this._grid.lock();
        for (_loc4_ of _loc1_ ?? []) {
            if (_loc2_.indexOf(_loc4_) == -1) {
                this.removeItem(_loc4_);
            }
        }
        for (_loc4_ of _loc2_ ?? []) {
            if (_loc1_.indexOf(_loc4_) == -1) {
                this.addItem(this._SafeStr_2134.items.getValue(_loc4_));
            }
            _loc3_ = this._gridItems.getValue(_loc4_);
            _loc3_.setUnseen(this._SafeStr_2134.isUnseen(_loc4_));
        }
        this._grid.unlock();
    }

    private startPlacingHandler = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2555 == null) {
            return;
        }
        let _loc2_: BotData = this._SafeStr_2555.data;
        if (_loc2_ == null) {
            return;
        }
        this.placeItemToRoom(_loc2_.id);
    };

    private windowEventHandler = (param1: WindowEvent, param2: IWindow): void => {
    };

    private updateContainerVisibility(): void {
        if (this._SafeStr_2134.controller.currentCategoryId != "bots") {
            return;
        }
        let _loc1_: IWindowContainer = this._SafeStr_2134.controller.view.loadingContainer;
        let _loc3_: IWindowContainer = this._SafeStr_2134.controller.view.emptyContainer;
        let _loc4_: IWindow = this._view.findChildByName("grid");
        let _loc2_: IWindow = this._view.findChildByName("preview_container");
        switch (this._SafeStr_3894 - 1) {
            case 0:
                if (_loc1_) {
                    _loc1_.visible = true;
                }
                if (_loc3_) {
                    _loc3_.visible = false;
                }
                _loc4_.visible = false;
                _loc2_.visible = false;
                break;
            case 1:
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                if (_loc3_) {
                    _loc3_.visible = true;
                }
                _loc4_.visible = false;
                _loc2_.visible = false;
                break;
            case 2:
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                if (_loc3_) {
                    _loc3_.visible = false;
                }
                _loc4_.visible = true;
                _loc2_.visible = true;
        }
    }

    private updatePreview(param1: BotGridItem = null): void {
        let _loc3_: BitmapData = null;
        let _loc11_: string = null;
        let _loc13_: string = null;
        let _loc10_: boolean = false;
        let _loc4_: BotData = null;
        let _loc5_: BitmapData = null;
        if (this._view == null) {
            return;
        }
        this._SafeStr_4888 = -1;
        if (param1 == null || param1.data == null) {
            _loc3_ = new BitmapData(1, 1);
            _loc11_ = "";
            _loc13_ = "";
            _loc10_ = false;
        } else {
            _loc4_ = param1.data;
            _loc11_ = _loc4_.name;
            _loc13_ = _loc4_.motto;
            _loc3_ = this.getItemImage(_loc4_, 4, true, "h");
            _loc10_ = true;
        }
        let _loc9_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("preview_image"), isIBitmapWrapperWindow);
        if (_loc9_ != null) {
            _loc5_ = new BitmapData(_loc9_.width, _loc9_.height);
            _loc5_.fillRect(_loc5_.rect, 0);
            _loc5_.copyPixels(_loc3_, _loc3_.rect, new Point(_loc5_.width / 2 - _loc3_.width / 2, _loc5_.height / 2 - _loc3_.height / 2));
            _loc9_.bitmap = _loc5_;
        }
        _loc3_.dispose();
        let _loc6_: ITextWindow = asGuarded(this._view.findChildByName("bot_name"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.caption = _loc11_;
        }
        _loc6_ = asGuarded(this._view.findChildByName("bot_description"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.caption = _loc13_;
        }
        let _loc8_: boolean = false;
        let _loc12_: boolean = false;
        if (this._SafeStr_2134.roomSession != null) {
            _loc8_ = this._SafeStr_2134.roomSession.areBotsAllowed;
            _loc12_ = this._SafeStr_2134.roomSession.isRoomOwner;
        }
        let _loc2_: string = "";
        if (!_loc12_) {
            if (_loc8_) {
                _loc2_ = "${inventory.bots.allowed}";
            } else {
                _loc2_ = "${inventory.bots.forbidden}";
            }
        }
        _loc6_ = asGuarded(this._view.findChildByName("preview_info"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.caption = _loc2_;
        }
        let _loc7_: IButtonWindow = asGuarded(this._view.findChildByName("place_button"), isIButtonWindow);
        if (_loc7_ != null) {
            if (_loc10_ && (_loc12_ || _loc8_)) {
                _loc7_.enable();
            } else {
                _loc7_.disable();
            }
        }
    }

    private addUnseenItemSymbols(): void {
    }

    private init(): void {
        let _loc1_: IButtonWindow = null;
        this._view = this._SafeStr_2134.controller.view.getView("bots");
        this._view.visible = false;
        this._view.procedure = this.windowEventHandler;
        this.addUnseenItemSymbols();
        this._grid = asGuarded(this._view.findChildByName("grid"), isIItemGridWindow);
        _loc1_ = asGuarded(this._view.findChildByName("place_button"), isIButtonWindow);
        if (_loc1_ != null) {
            _loc1_.addEventListener("WME_CLICK", this.startPlacingHandler);
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("preview_image"), isIBitmapWrapperWindow);
        if (_loc2_ != null) {
            _loc2_.addEventListener("WME_DOWN", this.startPlacingHandler);
        }
        this.updatePreview();
        this.updateState();
        this.selectFirst();
        this._isInitialized = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
