import { asGuarded, asInstanceOf, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { FurniModel } from '@/com/sulake/habbo/inventory/furni/FurniModel';
import type { IFurnitureItem } from '@/com/sulake/habbo/inventory/items/IFurnitureItem';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IFurnitureData } from '@/com/sulake/habbo/session/furniture/IFurnitureData';
import type { SongInfoReceivedEvent } from '@/com/sulake/habbo/sound/events/SongInfoReceivedEvent';
import type { ISongInfo } from '@/com/sulake/habbo/sound/ISongInfo';
import type { IChestItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IChestItemGridOverlayWidget';
import type { ILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import type { IRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';
import type { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { FurnitureItem } from '@/com/sulake/habbo/inventory/items/FurnitureItem';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { isIChestItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IChestItemGridOverlayWidget';
import { isILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';
import { isIRarityItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/IRarityItemGridOverlayWidget';

export class GroupItem implements IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.inventory.items::GroupItem'); }

    private static readonly THUMB_WINDOW_LAYOUT: string = "inventory_thumb_xml";
    private static readonly THUMB_COLOR_NORMAL: number = 13421772;
    private static readonly THUMB_COLOR_UNSEEN: number = 10275685;
    public static readonly THUMB_BLEND_ITEMS_AVAILABLE: number = 1;
    public static readonly THUMB_BLEND_ITEMS_NOT_AVAILABLE: number = 0.2;

    constructor(param1: FurniModel, param2: number, param3: number, param4: IRoomEngine, param5: boolean, param6: IStuffData, param7: number, param8: BitmapData, param9: boolean, param10: string) {
        this._SafeStr_2134 = param1;
        this._type = param2;
        this._roomEngine = param4;
        this._SafeStr_4761 = param5;
        this._items = new UtilsMap();
        this._category = param3;
        this._stuffData = param6;
        this._extra = param7;
        this._alignment = param10;
        this._icon = param8;
        this._holdImageInit = param9;
        switch (this._category - 2) {
            case 0:
                this._name = this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.item.wallpaper.name");
                this._description = this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.item.wallpaper.desc");
                break;
            case 1:
                this._name = this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.item.floor.name");
                this._description = this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.item.floor.desc");
                break;
            case 2:
                this._name = this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.item.landscape.name");
                this._description = this._SafeStr_2134.controller.localization.getLocalization("inventory.furni.item.landscape.desc");
        }
        this._SafeStr_2134.soundManager.events.addEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
    }

    declare protected _items: UtilsMap;

    declare protected _SafeStr_2134: FurniModel;

    declare private _type: number;
    static { (this.prototype as any)._type = 0; }

    declare private _roomEngine: IRoomEngine;

    declare private _SafeStr_3562: boolean;
    static { (this.prototype as any)._SafeStr_3562 = false; }

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    declare private _category: number;
    static { (this.prototype as any)._category = 0; }

    declare private _stuffData: IStuffData;

    declare private _extra: number;
    static { (this.prototype as any)._extra = NaN; }

    private _iconCallbackId: number = 0;

    declare private _iconImage: BitmapData;

    declare private _previewCallbackId: number;
    static { (this.prototype as any)._previewCallbackId = 0; }

    declare private _SafeStr_3722: boolean;
    static { (this.prototype as any)._SafeStr_3722 = false; }

    declare private _SafeStr_4761: boolean;
    static { (this.prototype as any)._SafeStr_4761 = false; }

    declare private _holdImageInit: boolean;
    static { (this.prototype as any)._holdImageInit = false; }

    declare private _icon: BitmapData;

    declare private _SafeStr_3024: IWindow;

    declare private _SafeStr_3010: boolean;
    static { (this.prototype as any)._SafeStr_3010 = false; }

    private _alignment: string = "center";
    private _isInitialized: boolean = false;
    private _description: string = "";
    private _SafeStr_4013: number = -1;
    private _selectedItemIndex: number = -1;
    private _classNameCache: string = null;

    declare protected _window: IWindowContainer;

    public get window(): IWindowContainer {
        if (!this._isInitialized) {
            this.initWindow();
        }
        if (this._window == null) {
            return null;
        }
        if (this._window.disposed) {
            return null;
        }
        return this._window;
    }

    declare private _hasUnseenItems: boolean;
    static { (this.prototype as any)._hasUnseenItems = false; }

    public get hasUnseenItems(): boolean {
        return this._hasUnseenItems;
    }

    public set hasUnseenItems(param1: boolean) {
        if (this._hasUnseenItems != param1) {
            this._hasUnseenItems = param1;
            this.updateBackgroundVisual();
        }
    }

    private _name: string = "";

    public get name(): string {
        return this._name;
    }

    public get isImageInited(): boolean {
        return this._isInitialized && this._SafeStr_3722;
    }

    public get isImageFinished(): boolean {
        return this._iconCallbackId == -1;
    }

    public get isLocked(): boolean {
        return this._SafeStr_3562;
    }

    public set isLocked(param1: boolean) {
        this._SafeStr_3562 = param1;
    }

    public get isSelected(): boolean {
        return this._selected;
    }

    public set isSelected(param1: boolean) {
        if (this._selected != param1) {
            this._selected = param1;
            this.updateSelectionVisual();
        }
    }

    public get type(): number {
        return this._type;
    }

    public get iconImage(): BitmapData {
        return this._iconImage;
    }

    public set iconImage(param1: BitmapData) {
        this._iconImage = param1;
    }

    public get iconCallbackId(): number {
        return this._iconCallbackId;
    }

    public set iconCallbackId(param1: number) {
        this._iconCallbackId = param1;
    }

    public get previewCallbackId(): number {
        return this._previewCallbackId;
    }

    public set previewCallbackId(param1: number) {
        this._previewCallbackId = param1;
    }

    public get category(): number {
        return this._category;
    }

    public get stuffData(): IStuffData {
        return this._stuffData;
    }

    public get extra(): number {
        return this._extra;
    }

    public set showRecyclable(param1: boolean) {
        if (this._SafeStr_4761 != param1) {
            this._SafeStr_4761 = param1;
            this.updateRecycleStatusVisual();
        }
    }

    public get alignment(): string {
        return this._alignment;
    }

    public get isWallItem(): boolean {
        let _loc1_: FurnitureItem = this.getAt(0);
        return _loc1_ ? _loc1_.isWallItem : false;
    }

    public get flatId(): number {
        let _loc1_: FurnitureItem = this.getAt(0);
        return _loc1_ ? _loc1_.flatId : -1;
    }

    public get isGroupable(): boolean {
        let _loc1_: FurnitureItem = this.getAt(0);
        return _loc1_ ? _loc1_.groupable : true;
    }

    public get isRented(): boolean {
        let _loc1_: FurnitureItem = this.getAt(0);
        return _loc1_ ? _loc1_.isRented : false;
    }

    public get description(): string {
        return this._description;
    }

    public get className(): string {
        if (this._classNameCache != null) {
            return this._classNameCache;
        }
        let _loc1_: FurnitureItem = this.peek();
        if (_loc1_ == null) {
            this._classNameCache = "";
            return this._classNameCache;
        }
        let _loc3_: string = this.isWallItem ? "i" : "s";
        let _loc2_: IFurnitureData = this._SafeStr_2134.controller.getFurnitureData(_loc1_.type, _loc3_);
        if (_loc2_ == null) {
            this._classNameCache = "";
            return this._classNameCache;
        }
        this._classNameCache = _loc2_.className;
        return this._classNameCache;
    }

    public get selectedItemIndex(): number {
        if (this._selectedItemIndex >= this._items.length) {
            this._selectedItemIndex = Math.max(0, this._items.length - 1) | 0;
        }
        return this._selectedItemIndex;
    }

    public set selectedItemIndex(param1: number) {
        if (param1 >= this._items.length) {
            param1 = 0;
        }
        this._selectedItemIndex = param1;
    }

    public dispose(): void {
        if (this._SafeStr_2134.soundManager) {
            if (this._SafeStr_2134.soundManager.events != null) {
                this._SafeStr_2134.soundManager.events.removeEventListener("SIR_TRAX_SONG_INFO_RECEIVED", this.onSongInfoReceivedEvent);
            }
        }
        this._SafeStr_2134 = null;
        this._SafeStr_3024 = null;
        this._roomEngine = null;
        if (this._items) {
            this._items.dispose();
            this._items = null;
        }
        this._stuffData = null;
        if (this._window) {
            this._window.dispose();
        }
    }

    public removeIntervalProcedure(): void {
        if (this._window) {
            this._window.procedure = null;
        }
    }

    public initImage(param1: boolean = true): boolean {
        let _loc2_: ImageResult = null;
        if (this._iconImage != null) {
            return false;
        }
        if (this._SafeStr_3722) {
            return false;
        }
        if (this.isWallItem) {
            _loc2_ = this._roomEngine.getWallItemIcon(this._type, this, this._stuffData.getLegacyString());
        } else {
            _loc2_ = this._roomEngine.getFurnitureIcon(this._type, this, String(this._extra), this._stuffData);
        }
        if (_loc2_.id > 0) {
            if (param1) {
                this.setLoadingImage(_loc2_.data);
            }
            this._iconCallbackId = _loc2_.id;
        } else {
            this.setFinalImage(_loc2_.data);
            this._iconCallbackId = -1;
        }
        this._SafeStr_3722 = true;
        return _loc2_.id > 0;
    }

    public push(param1: FurnitureItem, param2: boolean = false): void {
        let _loc3_: FurnitureItem = this._items.getValue(param1.id);
        if (_loc3_ == null) {
            this._items.add(param1.id, param1);
        } else {
            _loc3_.locked = false;
        }
        this.updateItemCountVisual();
        this.updateSelectionVisual();
        this.updateRentStateVisual();
        if (this._name == null || this._name.length == 0) {
            this._name = this.getFurniItemName();
        }
        if (this._description == null || this._description.length == 0) {
            this._description = this.getFurniItemDesc();
        }
        if (param2 != this._hasUnseenItems) {
            this._hasUnseenItems = param2;
            this.updateBackgroundVisual();
        }
    }

    public unshift(param1: FurnitureItem): void {
        let _loc2_: FurnitureItem = this._items.getValue(param1.id);
        if (_loc2_ == null) {
            this._items.unshift(param1.id, param1);
        } else {
            _loc2_.locked = false;
        }
        this.updateAllThumbDataVisuals();
    }

    public pop(): FurnitureItem {
        let _loc1_: FurnitureItem = null;
        if (this._items.length > 0) {
            _loc1_ = asInstanceOf(this._items.getWithIndex(this._items.length - 1), FurnitureItem);
            this._items.remove(_loc1_.id);
        }
        this.updateAllThumbDataVisuals();
        return _loc1_;
    }

    public peek(): FurnitureItem {
        let _loc1_: FurnitureItem = null;
        if (this._items.length > 0) {
            _loc1_ = asInstanceOf(this._items.getWithIndex(this._items.length - 1), FurnitureItem);
        }
        return _loc1_;
    }

    public getAt(param1: number): FurnitureItem {
        return this._items.getWithIndex(param1);
    }

    public getItemsForTrade(param1: number): IFurnitureItem[] {
        let _loc5_: number = 0;
        let _loc2_: FurnitureItem = null;
        let _loc3_: IFurnitureItem[] = [];
        let _loc6_: IFurnitureItem = this.getOneForTrade();
        if (_loc6_ == null) {
            return _loc3_;
        }
        let _loc4_: number = 0;
        _loc5_ = 0;
        while (_loc5_ < this._items.length) {
            if (_loc4_ >= param1) {
                break;
            }
            _loc2_ = this._items.getWithIndex(_loc5_);
            if (!_loc2_.locked && _loc2_.tradeable && _loc2_.type == _loc6_.type) {
                _loc4_++;
                _loc3_.push(_loc2_);
            }
            _loc5_++;
        }
        return _loc3_;
    }

    public getOneForTrade(): FurnitureItem {
        let _loc2_: FurnitureItem = null;
        let _loc3_: number = 0;
        let _loc1_: FurnitureItem = null;
        if (this._selectedItemIndex >= 0 && this._selectedItemIndex < this._items.length) {
            _loc2_ = this._items.getWithIndex(this._selectedItemIndex);
            if (!_loc2_.locked && _loc2_.tradeable) {
                return _loc2_;
            }
        }
        _loc3_ = 0;
        while (_loc3_ < this._items.length) {
            _loc1_ = this._items.getWithIndex(_loc3_);
            if (!_loc1_.locked && _loc1_.tradeable) {
                return _loc1_;
            }
            _loc3_++;
        }
        return null;
    }

    public getOneForRecycle(): FurnitureItem {
        let _loc2_: number = 0;
        let _loc1_: FurnitureItem = null;
        _loc2_ = 0;
        while (_loc2_ < this._items.length) {
            _loc1_ = this._items.getWithIndex(_loc2_);
            if (!_loc1_.locked && _loc1_.recyclable) {
                this.addLockTo(_loc1_.id);
                return _loc1_;
            }
            _loc2_++;
        }
        return null;
    }

    public getOneForSelling(): FurnitureItem {
        let _loc2_: number = 0;
        let _loc1_: FurnitureItem = null;
        _loc2_ = 0;
        while (_loc2_ < this._items.length) {
            _loc1_ = this._items.getWithIndex(_loc2_);
            if (!_loc1_.locked && _loc1_.sellable) {
                return _loc1_;
            }
            _loc2_++;
        }
        return null;
    }

    public getFurniIds(): any[] {
        let _loc2_: any[] = [];
        for (const _loc1_ of valuesOf(this._items)) {
            _loc2_.push(_loc1_.id);
        }
        return _loc2_;
    }

    public getNonRentedFurnitureIds(): any[] {
        let _loc2_: any[] = [];
        for (const _loc1_ of valuesOf(this._items)) {
            if (!_loc1_.isRented) {
                _loc2_.push(_loc1_.id);
            }
        }
        return _loc2_;
    }

    public addLockTo(param1: number): boolean {
        let _loc3_: number = 0;
        let _loc2_: FurnitureItem = null;
        _loc3_ = 0;
        while (_loc3_ < this._items.length) {
            _loc2_ = this._items.getWithIndex(_loc3_);
            if (_loc2_.id == param1) {
                _loc2_.locked = true;
                this.updateItemCountVisual();
                return true;
            }
            _loc3_++;
        }
        return false;
    }

    public updateLocks(param1: any[]): void {
        let _loc5_: boolean = false;
        let _loc2_: FurnitureItem = null;
        let _loc4_: any = false;
        let _loc3_: number = this._items.length - 1;
        while (_loc3_ >= 0) {
            _loc2_ = this._items.getWithIndex(_loc3_);
            _loc4_ = param1.indexOf(_loc2_.ref) >= 0;
            if (_loc2_.locked != _loc4_) {
                _loc2_.locked = _loc4_;
                _loc5_ = true;
            }
            _loc3_--;
        }
        if (_loc5_) {
            this.updateItemCountVisual();
        }
    }

    public removeLockFrom(param1: number): boolean {
        let _loc3_: number = 0;
        let _loc2_: FurnitureItem = null;
        _loc3_ = 0;
        while (_loc3_ < this._items.length) {
            _loc2_ = this._items.getWithIndex(_loc3_);
            if (_loc2_.id == param1) {
                _loc2_.locked = false;
                this.updateItemCountVisual();
                this.updateRecycleStatusVisual();
                return true;
            }
            _loc3_++;
        }
        return false;
    }

    public removeAllLocks(): void {
        let _loc3_: boolean = false;
        let _loc2_: number = 0;
        let _loc1_: FurnitureItem = null;
        _loc2_ = this._items.length - 1;
        while (_loc2_ >= 0) {
            _loc1_ = this._items.getWithIndex(_loc2_);
            if (_loc1_.locked) {
                _loc1_.locked = false;
                _loc3_ = true;
            }
            _loc2_--;
        }
        if (_loc3_) {
            this.updateItemCountVisual();
        }
    }

    public getTotalCount(): number {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: FurnitureItem = null;
        if (this.category == 5) {
            _loc2_ = 0;
            _loc3_ = 0;
            while (_loc3_ < this._items.length) {
                _loc1_ = asInstanceOf(this._items.getWithIndex(_loc3_), FurnitureItem);
                _loc2_ += Number(_loc1_.stuffData.getLegacyString()) | 0;
                _loc3_++;
            }
            return _loc2_;
        }
        return this._items.length | 0;
    }

    public getRecyclableCount(): number {
        let _loc3_: number = 0;
        let _loc1_: FurnitureItem = null;
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._items.length) {
            _loc1_ = asInstanceOf(this._items.getWithIndex(_loc3_), FurnitureItem);
            if (_loc1_.recyclable && !_loc1_.locked) {
                _loc2_++;
            }
            _loc3_++;
        }
        return _loc2_;
    }

    public getTradeableCount(param1: boolean = true): number {
        let _loc4_: number = 0;
        let _loc2_: FurnitureItem = null;
        let _loc3_: number = 0;
        _loc4_ = 0;
        while (_loc4_ < this._items.length) {
            _loc2_ = asInstanceOf(this._items.getWithIndex(_loc4_), FurnitureItem);
            if (_loc2_.tradeable && (!param1 || !_loc2_.locked)) {
                _loc3_++;
            }
            _loc4_++;
        }
        return _loc3_;
    }

    public remove(param1: number): FurnitureItem {
        let _loc2_: FurnitureItem = this._items.getValue(param1);
        if (_loc2_) {
            this._items.remove(param1);
            this.updateAllThumbDataVisuals();
            return _loc2_;
        }
        return null;
    }

    public getItem(param1: number): FurnitureItem {
        return this._items.getValue(param1);
    }

    public replaceItem(param1: number, param2: FurnitureItem): void {
        this._items.add(param1, param2);
        this.updateAllThumbDataVisuals();
    }

    public getMinimumItemsToShowCounter(): number {
        return 2;
    }

    public getUnlockedCount(): number {
        let _loc1_: FurnitureItem = null;
        let _loc3_: number = 0;
        if (this.category == 5) {
            return this.getTotalCount();
        }
        let _loc2_: number = 0;
        _loc3_ = 0;
        while (_loc3_ < this._items.length) {
            _loc1_ = this._items.getWithIndex(_loc3_);
            if (!_loc1_.locked) {
                _loc2_++;
            }
            _loc3_++;
        }
        return _loc2_;
    }

    public updateAllThumbDataVisuals(): void {
        if (this._window == null) {
            return;
        }
        if (this._window.disposed) {
            return;
        }
        this.updateItemImageVisual();
        this.updateBackgroundVisual();
        this.updateItemCountVisual();
        this.updateRecycleStatusVisual();
        this.updateSelectionVisual();
        this.updateRentStateVisual();
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (this._window == null) {
            return;
        }
        if (this._window.disposed) {
            return;
        }
        if (this._iconCallbackId != param1) {
            return;
        }
        this._iconImage = param2;
        this.updateItemImageVisual();
    }

    public imageFailed(param1: number): void {
    }

    public isNft(): boolean {
        return this.className.indexOf("nft_") == 0;
    }

    protected createWindow(): void {
        this._window = this._SafeStr_2134.createItemWindow("inventory_thumb_xml");
    }

    private setFinalImage(param1: BitmapData): void {
        this._iconImage = param1;
        this._SafeStr_3722 = true;
        this._iconCallbackId = -1;
        this.updateItemImageVisual();
    }

    private setLoadingImage(param1: BitmapData): void {
        this._iconImage = param1;
        this._SafeStr_3722 = true;
        this.updateItemImageVisual();
    }

    private updateRentStateVisual(): void {
        if (this._window == null || Boolean(this._window.disposed)) {
            return;
        }
        let _loc2_: FurnitureItem = this.getAt(0);
        let _loc1_: IStaticBitmapWrapperWindow = asGuarded(this._window.findChildByName("rent_state"), isIStaticBitmapWrapperWindow);
        if (!_loc2_ || !this.isRented) {
            _loc1_.visible = false;
            return;
        }
        _loc1_.visible = this.isRented;
        let _loc3_: number = this._SafeStr_2134.controller.getInteger("purchase.rent.warning_duration_seconds", 172800);
        _loc1_.assetUri = !_loc2_.hasRentPeriodStarted ? "inventory_thumb_rent_not_started" : (_loc2_.secondsToExpiration < _loc3_ ? "inventory_thumb_rent_ending" : "inventory_thumb_rent_started");
    }

    private updateItemCountVisual(): void {
        let _loc4_: ITextWindow = null;
        if (!this._window) {
            return;
        }
        let _loc5_: number = this.getUnlockedCount();
        let _loc1_: any = _loc5_ >= this.getMinimumItemsToShowCounter();
        let _loc3_: IWindow = this._window.findChildByName("number_container");
        _loc3_.visible = _loc1_;
        if (_loc1_) {
            _loc4_ = asGuarded(this._window.findChildByName("number"), isITextWindow);
            _loc4_.text = String(_loc5_);
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow);
        if (_loc5_ <= 0) {
            _loc2_.blend = 0.2;
        } else {
            _loc2_.blend = 1;
        }
    }

    private updateBackgroundVisual(): void {
        if (!this._window) {
            return;
        }
        if (!this._SafeStr_3024) {
            this._SafeStr_3024 = this._window.findChildByTag("BG_COLOR");
        }
        this._SafeStr_3024.color = (this._hasUnseenItems ? 10275685 : 13421772) >>> 0;
    }

    private updateSelectionVisual(): void {
        if (!this._window) {
            return;
        }
        this._window.findChildByName("outline").visible = this.isSelected;
    }

    private updateRecycleStatusVisual(): void {
        if (!this._window) {
            return;
        }
        let _loc1_: IWindow = this._window.findChildByName("recyclable_container");
        if (_loc1_) {
            _loc1_.visible = this._SafeStr_4761 && this.getRecyclableCount() > 0;
        }
    }

    private updateItemImageVisual(): void {
        let _loc7_: IWidgetWindow = null;
        let _loc2_: ILimitedItemGridOverlayWidget = null;
        let _loc8_: IWidgetWindow = null;
        let _loc1_: IRarityItemGridOverlayWidget = null;
        let _loc5_: IChestItemGridOverlayWidget = null;
        let _loc6_: IStaticBitmapWrapperWindow = null;
        let _loc3_: string = null;
        if (!this._window) {
            return;
        }
        if (this.stuffData.uniqueSerialNumber > 0) {
            _loc7_ = castGuarded(this._window.findChildByName("unique_item_overlay_container"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc2_ = castGuarded(_loc7_.widget, isILimitedItemGridOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemGridOverlayWidget");
            _loc7_.visible = true;
            _loc2_.serialNumber = this.stuffData.uniqueSerialNumber;
            _loc2_.animated = true;
            this._window.findChildByName("unique_item_background_bitmap").visible = true;
        } else if (this.stuffData.rarityLevel >= 0) {
            _loc8_ = castGuarded(this._window.findChildByName("rarity_item_overlay_container"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc1_ = castGuarded(_loc8_.widget, isIRarityItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IRarityItemGridOverlayWidget");
            _loc1_.rarityLevel = this.stuffData.rarityLevel;
            _loc8_.visible = true;
        } else if (this._category == 25 || this._category == 24) {
            _loc7_ = castGuarded(this._window.findChildByName("chest_overlay_container"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
            _loc5_ = castGuarded(_loc7_.widget, isIChestItemGridOverlayWidget, "com.sulake.habbo.window.widgets.IChestItemGridOverlayWidget");
            _loc5_.contentsCount = this.stuffData.contentsCount;
            _loc7_.visible = true;
            _loc6_ = castGuarded(this._window.findChildByName("chest_background_bitmap"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
            _loc3_ = this._category == 25 ? "gold" : "brown";
            _loc5_.color = _loc3_;
            _loc6_.assetUri = "chest_overlay_" + _loc3_ + "_background";
            _loc6_.visible = true;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("bitmap"), isIBitmapWrapperWindow);
        if (_loc4_) {
            _loc4_.bitmap = this._iconImage;
        }
    }

    private itemEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: boolean = false;
        switch (param1.type) {
            case "WME_UP":
                this._SafeStr_3010 = false;
                this._SafeStr_2134.cancelFurniInMover();
                break;
            case "WME_DOWN":
                this._SafeStr_2134.removeSelections();
                this.isSelected = true;
                this._SafeStr_3010 = true;
                this._SafeStr_2134.updateActionView();
                this._SafeStr_2134.categorySelection = this;
                break;
            case "WME_OUT":
                if (!this._SafeStr_3010 || this._SafeStr_2134.isTradingOpen) {
                    return;
                }
                _loc3_ = this._SafeStr_2134.requestSelectedFurniPlacement(true);
                if (_loc3_) {
                    this._SafeStr_3010 = false;
                }
                break;
            case "WME_CLICK":
                this._SafeStr_3010 = false;
                break;
            case "WME_DOUBLE_CLICK":
                this._SafeStr_2134.requestCurrentActionOnSelection();
                this._SafeStr_3010 = false;
        }
    };

    private initWindow(): void {
        this.createWindow();
        if (this._icon != null) {
            this.setFinalImage(this._icon);
        } else if (!this._holdImageInit) {
            this.initImage();
        }
        this._window.procedure = this.itemEventProc;
        this._window.name = this._roomEngine.getFurnitureType(this.type) + "." + this.category;
        if (this.stuffData && this.stuffData.getLegacyString() != "") {
            this._window.name += ".s" + this.stuffData;
        }
        if (!isNaN(this.extra)) {
            this._window.name += ".e" + this.extra;
        }
        this.updateBackgroundVisual();
        this.updateItemCountVisual();
        this.updateItemImageVisual();
        this.updateRecycleStatusVisual();
        this.updateSelectionVisual();
        this.updateRentStateVisual();
        this._isInitialized = true;
    }

    private getFurniItemName(): string {
        let _loc2_: string = null;
        let _loc3_: ISongInfo = null;
        let _loc1_: FurnitureItem = this.peek();
        if (_loc1_ == null) {
            return "";
        }
        switch (this._category - 6) {
            case 0:
                _loc2_ = "poster_" + _loc1_.stuffData.getLegacyString() + "_name";
                break;
            case 2:
                _loc3_ = this._SafeStr_2134.soundManager.musicController.getSongInfo(_loc1_.extra | 0);
                if (_loc3_ != null) {
                    return _loc3_.name;
                }
                this.getSongInfo(_loc1_);
                return "";
                break;
            default:
                if (this.isWallItem) {
                    _loc2_ = "wallItem.name." + _loc1_.type;
                    break;
                }
                _loc2_ = "roomItem.name." + _loc1_.type;
        }
        return this._SafeStr_2134.controller.localization.getLocalization(_loc2_);
    }

    private getFurniItemDesc(): string {
        let _loc2_: string = null;
        let _loc3_: ISongInfo = null;
        let _loc1_: FurnitureItem = this.peek();
        if (_loc1_ == null) {
            return "";
        }
        switch (this._category - 6) {
            case 0:
                _loc2_ = "poster_" + _loc1_.stuffData.getLegacyString() + "_desc";
                break;
            case 2:
                _loc3_ = this._SafeStr_2134.soundManager.musicController.getSongInfo(_loc1_.extra | 0);
                if (_loc3_ != null) {
                    return _loc3_.creator;
                }
                this.getSongInfo(_loc1_);
                return "";
                break;
            default:
                if (this.isWallItem) {
                    _loc2_ = "wallItem.desc." + _loc1_.type;
                    break;
                }
                _loc2_ = "roomItem.desc." + _loc1_.type;
        }
        return this._SafeStr_2134.controller.localization.getLocalization(_loc2_);
    }

    private getSongInfo(param1: FurnitureItem): void {
        let _loc2_: number = 0;
        let _loc3_: ISongInfo = null;
        if (param1 == null) {
            return;
        }
        this._SafeStr_4013 = -1;
        if (param1 != null) {
            if (param1.category == 8) {
                _loc2_ = param1.extra | 0;
                _loc3_ = this._SafeStr_2134.soundManager.musicController.getSongInfo(_loc2_);
                if (_loc3_ == null) {
                    this._SafeStr_2134.soundManager.musicController.requestSongInfoWithoutSamples(_loc2_);
                    this._SafeStr_4013 = _loc2_;
                }
            }
        }
    }

    private onSongInfoReceivedEvent = (param1: SongInfoReceivedEvent): void => {
        if (param1.id == this._SafeStr_4013) {
            this._SafeStr_4013 = -1;
            this._name = this.getFurniItemName();
            this._description = this.getFurniItemDesc();
            if (this._SafeStr_2134.getSelectedItem() == this) {
                this._SafeStr_2134.updateActionView();
            }
        }
    };

    get [IGetImageListener](): true {
        return true;
    }
}
