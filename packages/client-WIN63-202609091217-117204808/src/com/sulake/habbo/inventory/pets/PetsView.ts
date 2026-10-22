import { asGuarded, asInstanceOf, castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { PetData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetData';
import type { PetFigureData } from '@/com/sulake/habbo/communication/messages/parser/inventory/pets/PetFigureData';
import type { IInventoryView } from '@/com/sulake/habbo/inventory/IInventoryView';
import type { PetsModel } from '@/com/sulake/habbo/inventory/pets/PetsModel';
import type { ImageResult } from '@/com/sulake/habbo/room/ImageResult';
import type { IRoomEngine } from '@/com/sulake/habbo/room/IRoomEngine';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIDropMenuWindow } from '@/com/sulake/core/window/components/IDropMenuWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { WindowKeyboardEvent } from '@/com/sulake/core/window/events/WindowKeyboardEvent';
import { PetCustomPart } from '@/com/sulake/habbo/avatar/pets/PetCustomPart';
import { PetsGridItem } from '@/com/sulake/habbo/inventory/pets/PetsGridItem';
import { IGetImageListener } from '@/com/sulake/habbo/room/IGetImageListener';
import { Vector3d } from '@/com/sulake/room/utils/Vector3d';

export class PetsView implements IInventoryView, IGetImageListener {
    static { registerClassName(this, 'com.sulake.habbo.inventory.pets::PetsView'); }

    private static readonly _SafeStr_14302: number = -1;
    private static readonly _SafeStr_14283: number = -1;
    private static readonly UNSEEN_SYMBOL_MARGIN: number = 4;
    private readonly STATE_NULL: number = 0;
    private readonly STATE_INITIALIZING: number = 1;
    private readonly STATE_EMPTY: number = 2;
    private readonly STATE_CONTENT: number = 3;

    declare private _windowManager: IHabboWindowManager;

    declare private _SafeStr_3052: IAssetLibrary;

    declare private _view: IWindowContainer;

    declare private _SafeStr_2134: PetsModel;

    private _disposed: boolean = false;

    declare private _grid: IItemGridWindow;

    declare private _roomEngine: IRoomEngine;

    declare private _gridItems: UtilsMap;

    declare private _SafeStr_2555: PetsGridItem;

    private _SafeStr_3894: number = 0;

    declare private _SafeStr_4888: number;
    static { (this.prototype as any)._SafeStr_4888 = 0; }

    private _isInitialized: boolean = false;
    private _SafeStr_14291: number = -1;
    private _SafeStr_14303: any[] = [-1];
    private _ignoreTypeFilterEvents: boolean = false;
    private _SafeStr_14304: number = -1;
    private _SafeStr_14305: any[] = [-1];
    private _ignoreRarityFilterEvents: boolean = false;

    constructor(param1: PetsModel, param2: IHabboWindowManager, param3: IAssetLibrary, param4: IRoomEngine) {
        this._SafeStr_2134 = param1;
        this._SafeStr_3052 = param3;
        this._windowManager = param2;
        this._roomEngine = param4;
        this._gridItems = new UtilsMap();
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isVisible(): boolean {
        return !!(this._view && this._view.parent != null && this._view.visible);
    }

    public dispose(): void {
        if (!this._disposed) {
            this._windowManager = null;
            this._SafeStr_2134 = null;
            this._view = null;
            this._disposed = true;
        }
    }

    public update(): void {
        if (!this._isInitialized) {
            return;
        }
        this.updateGrid();
        this.updatePreview(this._SafeStr_2555);
        this.updateContainerVisibility();
    }

    public removePet(param1: number): void {
        if (!this._isInitialized) {
            return;
        }
        let _loc2_: PetsGridItem = asInstanceOf(this._gridItems.remove(param1), PetsGridItem);
        if (_loc2_ == null) {
            return;
        }
        this._grid.removeGridItem(_loc2_.window);
        if (this._SafeStr_2555 == _loc2_) {
            this._SafeStr_2555 = null;
            this.selectFirst();
        }
    }

    public addPet(param1: PetData): void {
        if (!this._isInitialized) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (this._gridItems.getValue(param1.id) != null) {
            return;
        }
        let _loc2_: PetsGridItem = new PetsGridItem(this, param1, this._windowManager, this._SafeStr_3052, this._SafeStr_2134.isUnseen(param1.id));
        if (_loc2_ != null) {
            this._grid.addGridItem(_loc2_.window);
            this._gridItems.add(param1.id, _loc2_);
            if (this._SafeStr_2555 == null) {
                this.selectFirst();
            }
        }
    }

    public placePetToRoom(param1: number, param2: boolean = false): void {
        this._SafeStr_2134.placePetToRoom(param1, param2);
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

    public setSelectedGridItem(param1: PetsGridItem): void {
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
        let _loc2_: number = 0;
        if (!this._isInitialized) {
            return;
        }
        let _loc1_: UtilsMap = this._SafeStr_2134.pets;
        if (!this._SafeStr_2134.isListInitialized()) {
            _loc2_ = 1;
        } else if (!_loc1_ || _loc1_.length == 0) {
            _loc2_ = 2;
        } else {
            _loc2_ = 3;
        }
        if (this._SafeStr_3894 == _loc2_) {
            return;
        }
        this._SafeStr_3894 = _loc2_;
        this.updateContainerVisibility();
        if (this._SafeStr_3894 == 3) {
            this.updateGrid();
            this.updatePreview();
        }
    }

    public getPetImage(param1: PetData, param2: number, param3: boolean, param4: PetsGridItem = null, param5: number = 64, param6: string = null): BitmapData {
        let _loc9_: number = 0;
        let _loc10_: PetFigureData = param1.figureData;
        let _loc7_: BitmapData = null;
        let _loc8_: number = parseInt(_loc10_.color, 16) >>> 0;
        let _loc11_: number = 0;
        let _loc13_: any[] = [];
        _loc9_ = 0;
        while (_loc9_ < _loc10_.customPartCount * 3) {
            _loc13_.push(new PetCustomPart(_loc10_.customParts[_loc9_] | 0, _loc10_.customParts[_loc9_ + 1] | 0, _loc10_.customParts[_loc9_ + 2] | 0));
            _loc9_ += 3;
        }
        let _loc12_: ImageResult = this._roomEngine.getPetImage(_loc10_.typeId, _loc10_.paletteId, _loc8_ | 0, new Vector3d(param2 * 45), param5, this, param3, _loc11_, _loc13_, param6);
        if (_loc12_ != null) {
            _loc7_ = _loc12_.data;
            if (param4 != null) {
                param4.imageDownloadId = _loc12_.id;
            } else if (param3) {
                this._SafeStr_4888 = _loc12_.id;
            }
        }
        if (_loc7_ == null) {
            _loc7_ = new BitmapData(30, 30, false, 4289374890);
        }
        return _loc7_;
    }

    public imageReady(param1: number, param2: BitmapData): void {
        if (param1 == this._SafeStr_4888) {
            this.updatePreview(this._SafeStr_2555);
            return;
        }
        for (const _loc3_ of valuesOf(this._gridItems)) {
            if (_loc3_.imageDownloadId == param1) {
                _loc3_.setPetImage(param2);
                return;
            }
        }
    }

    public imageFailed(param1: number): void {
    }

    private selectFirst(): void {
        let _loc1_: any[] = this.getVisiblePetIds();
        if (_loc1_.length == 0) {
            this.updatePreview();
            return;
        }
        this.setSelectedGridItem(this._gridItems.getValue(_loc1_[0]));
    }

    public selectById(param1: number): void {
        this.setSelectedGridItem(this._gridItems.getValue(param1));
    }

    private updateGrid(): void {
        let _loc6_: number = 0;
        let _loc5_: PetsGridItem = null;
        if (this._view == null) {
            return;
        }
        let _loc1_: any[] = this._gridItems.getKeys();
        let _loc2_: any[] = this._SafeStr_2134.pets ? this._SafeStr_2134.pets.getKeys() : [];
        this._grid.lock();
        for (_loc6_ of _loc1_ ?? []) {
            if (_loc2_.indexOf(_loc6_) == -1) {
                this.removePet(_loc6_);
            }
        }
        for (_loc6_ of _loc2_ ?? []) {
            if (_loc1_.indexOf(_loc6_) == -1) {
                this.addPet(this._SafeStr_2134.pets.getValue(_loc6_));
            }
            _loc5_ = this._gridItems.getValue(_loc6_);
            _loc5_.setUnseen(this._SafeStr_2134.isUnseen(_loc6_));
        }
        this.updateFilterOptions();
        let _loc3_: any[] = this.getVisiblePetIds(_loc2_);
        this._grid.removeGridItems();
        for (_loc6_ of _loc3_ ?? []) {
            this._grid.addGridItem(castTo(this._gridItems.getValue(_loc6_), PetsGridItem).window);
        }
        this._grid.unlock();
        let _loc4_: number = this._SafeStr_2555 != null && this._SafeStr_2555.pet != null ? this._SafeStr_2555.pet.id : -1;
        if (_loc4_ == -1 || _loc3_.indexOf(_loc4_) == -1) {
            if (this._SafeStr_2555 != null) {
                this._SafeStr_2555.setSelected(false);
                this._SafeStr_2555 = null;
            }
            this.selectFirst();
        }
    }

    private startPlacingHandler = (param1: WindowMouseEvent): void => {
        if (this._SafeStr_2555 == null) {
            return;
        }
        let _loc2_: PetData = this._SafeStr_2555.pet;
        if (_loc2_ == null) {
            return;
        }
        this.placePetToRoom(_loc2_.id);
    };

    private updateContainerVisibility(): void {
        if (this._SafeStr_2134.controller.currentCategoryId != "pets") {
            return;
        }
        let _loc2_: IWindowContainer = this._SafeStr_2134.controller.view.loadingContainer;
        let _loc5_: IWindowContainer = this._SafeStr_2134.controller.view.emptyContainer;
        let _loc4_: IWindow = this._view.findChildByName("options_container");
        let _loc1_: IWindow = this._view.findChildByName("filter.rarity");
        let _loc6_: IWindow = this._view.findChildByName("grid");
        let _loc3_: IWindow = this._view.findChildByName("preview_container");
        switch (this._SafeStr_3894 - 1) {
            case 0:
                if (_loc2_) {
                    _loc2_.visible = true;
                }
                if (_loc5_) {
                    _loc5_.visible = false;
                }
                if (_loc4_) {
                    _loc4_.visible = false;
                }
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                _loc6_.visible = false;
                _loc3_.visible = false;
                break;
            case 1:
                if (_loc2_) {
                    _loc2_.visible = false;
                }
                if (_loc5_) {
                    _loc5_.visible = true;
                }
                if (_loc4_) {
                    _loc4_.visible = false;
                }
                if (_loc1_) {
                    _loc1_.visible = false;
                }
                _loc6_.visible = false;
                _loc3_.visible = false;
                break;
            case 2:
                if (_loc2_) {
                    _loc2_.visible = false;
                }
                if (_loc5_) {
                    _loc5_.visible = false;
                }
                if (_loc4_) {
                    _loc4_.visible = true;
                }
                if (_loc1_) {
                    _loc1_.visible = true;
                }
                _loc6_.visible = true;
                _loc3_.visible = true;
        }
    }

    private updatePreview(param1: PetsGridItem = null): void {
        let _loc15_: BitmapData = null;
        let _loc8_: string = null;
        let _loc7_: string = null;
        let _loc11_: boolean = false;
        let _loc16_: PetData = null;
        let _loc3_: BitmapData = null;
        if (this._view == null) {
            return;
        }
        let _loc5_: number = 64;
        let _loc17_: number = 4;
        let _loc14_: boolean = true;
        let _loc4_: string = null;
        this._SafeStr_4888 = -1;
        if (param1 == null || param1.pet == null) {
            _loc15_ = new BitmapData(1, 1);
            _loc8_ = "";
            _loc7_ = "";
            _loc11_ = false;
        } else {
            _loc16_ = param1.pet;
            _loc8_ = _loc16_.name;
            _loc7_ = this.getPetTypeLabel(_loc16_.typeId);
            if (_loc16_.typeId == 16) {
                _loc17_ = 2;
                _loc14_ = true;
                if (_loc16_.level >= 7) {
                    _loc4_ = "std";
                } else {
                    _loc4_ = "grw" + _loc16_.level;
                }
            }
            _loc15_ = this.getPetImage(_loc16_, _loc17_, _loc14_, null, _loc5_, _loc4_);
            _loc11_ = true;
        }
        let _loc10_: IBitmapWrapperWindow = asGuarded(this._view.findChildByName("preview_image"), isIBitmapWrapperWindow);
        if (_loc10_ != null) {
            _loc3_ = new BitmapData(_loc10_.width, _loc10_.height);
            _loc3_.fillRect(_loc3_.rect, 0);
            _loc3_.copyPixels(_loc15_, _loc15_.rect, new Point(_loc3_.width / 2 - _loc15_.width / 2, _loc3_.height / 2 - _loc15_.height / 2));
            _loc10_.bitmap = _loc3_;
        }
        _loc15_.dispose();
        let _loc6_: ITextWindow = asGuarded(this._view.findChildByName("preview_text"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.caption = _loc8_;
        }
        _loc6_ = asGuarded(this._view.findChildByName("preview_description"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.caption = _loc7_;
        }
        let _loc12_: boolean = false;
        let _loc13_: boolean = false;
        if (this._SafeStr_2134.roomSession != null) {
            _loc12_ = this._SafeStr_2134.roomSession.arePetsAllowed;
            _loc13_ = this._SafeStr_2134.roomSession.isRoomOwner;
        }
        let _loc2_: string = "";
        if (!_loc13_) {
            if (_loc12_) {
                _loc2_ = "${inventory.pets.allowed}";
            } else {
                _loc2_ = "${inventory.pets.forbidden}";
            }
        }
        _loc6_ = asGuarded(this._view.findChildByName("preview_info"), isITextWindow);
        if (_loc6_ != null) {
            _loc6_.caption = _loc2_;
        }
        let _loc9_: IButtonWindow = asGuarded(this._view.findChildByName("place_button"), isIButtonWindow);
        if (_loc9_ != null) {
            if (_loc11_ && (_loc13_ || _loc12_)) {
                _loc9_.enable();
            } else {
                _loc9_.disable();
            }
        }
    }

    private init(): void {
        let _loc1_: IButtonWindow = null;
        this._view = this._SafeStr_2134.controller.view.getView("pets");
        this._view.visible = false;
        this._view.procedure = this.windowEventProc;
        this._grid = asGuarded(this._view.findChildByName("grid"), isIItemGridWindow);
        this._view.findChildByName("filter").caption = "";
        this._view.findChildByName("clear_filter_button").visible = false;
        this.updateFilterOptions();
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
        this._isInitialized = true;
    }

    private windowEventProc = (param1: WindowEvent, param2: IWindow): void => {
        let _loc6_: string;
        let _loc5_: WindowKeyboardEvent = null;
        let _loc3_: number = 0;
        let _loc4_: number = 0;
        if (param1.type == "WME_CLICK") {
            _loc6_ = param2.name;
            if ("clear_filter_button" === _loc6_) {
                this._view.findChildByName("filter").caption = "";
                param2.visible = false;
                this.update();
            }
        } else if (param1.type == "WKE_KEY_UP") {
            _loc5_ = param1 instanceof WindowKeyboardEvent ? param1 : null;
            _loc6_ = param2.name;
            if ("filter" === _loc6_) {
                this._view.findChildByName("clear_filter_button").visible = param2.caption.length > 0;
                if (_loc5_.keyCode == 27) {
                    param2.caption = "";
                    this._view.findChildByName("clear_filter_button").visible = false;
                    this.update();
                } else if (_loc5_.keyCode == 13) {
                    this.update();
                }
            }
        } else if (param1.type == "WE_SELECTED") {
            switch (param2.name) {
                case "filter.options":
                    if (!this._ignoreTypeFilterEvents) {
                        _loc3_ = this.getSelectedTypeFilter(isIDropMenuWindow(param2) ? param2 : null);
                        if (_loc3_ != this._SafeStr_14291) {
                            this._SafeStr_14291 = _loc3_;
                            this.update();
                        }
                    }
                    break;
                case "filter.rarity":
                    if (!this._ignoreRarityFilterEvents) {
                        _loc4_ = this.getSelectedRarityFilter(isIDropMenuWindow(param2) ? param2 : null);
                        if (_loc4_ != this._SafeStr_14304) {
                            this._SafeStr_14304 = _loc4_;
                            this.update();
                        }
                    }
            }
        }
    };

    private updateFilterOptions(): void {
        let _loc2_: number = 0;
        let _loc3_: IDropMenuWindow = asGuarded(this._view.findChildByName("filter.options"), isIDropMenuWindow);
        if (_loc3_ == null) {
            return;
        }
        this._SafeStr_14303 = this.getAvailableTypeFilterIds();
        if (this._SafeStr_14303.indexOf(this._SafeStr_14291) == -1) {
            this._SafeStr_14291 = -1;
        }
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_2134.controller.localization.getLocalization("inventory.pets.filter.type.all", "All types"));
        _loc2_ = 1;
        while (_loc2_ < this._SafeStr_14303.length) {
            _loc1_.push(this.getPetTypeLabel(this._SafeStr_14303[_loc2_] | 0));
            _loc2_++;
        }
        this._ignoreTypeFilterEvents = true;
        try {
            _loc3_.populate(_loc1_);
            _loc3_.selection = Math.max(0, this._SafeStr_14303.indexOf(this._SafeStr_14291)) | 0;
        } finally {
            this._ignoreTypeFilterEvents = false;
        }
        this.updateRarityFilterOptions();
    }

    private updateRarityFilterOptions(): void {
        let _loc2_: number = 0;
        let _loc3_: IDropMenuWindow = asGuarded(this._view.findChildByName("filter.rarity"), isIDropMenuWindow);
        if (_loc3_ == null) {
            return;
        }
        this._SafeStr_14305 = this.getAvailableRarityFilterIds();
        if (this._SafeStr_14305.indexOf(this._SafeStr_14304) == -1) {
            this._SafeStr_14304 = -1;
        }
        let _loc1_: any[] = [];
        for (const _loc4_ of this._SafeStr_14305 ?? []) {
            _loc1_.push(this.getRarityFilterLabel(_loc4_ | 0));
        }
        this._ignoreRarityFilterEvents = true;
        try {
            _loc2_ = this.isRarityFilterEnabled() ? this._SafeStr_14304 : -1;
            _loc3_.populate(_loc1_);
            _loc3_.selection = Math.max(0, this._SafeStr_14305.indexOf(_loc2_)) | 0;
        } finally {
            this._ignoreRarityFilterEvents = false;
        }
        if (this.isRarityFilterEnabled()) {
            _loc3_.enable();
        } else {
            _loc3_.disable();
        }
    }

    private getAvailableTypeFilterIds(): any[] {
        let _loc1_: any[] = [];
        let _loc2_: UtilsMap = this._SafeStr_2134.pets;
        if (_loc2_ != null) {
            for (const _loc3_ of valuesOf(_loc2_)) {
                if (_loc1_.indexOf(_loc3_.typeId) == -1) {
                    _loc1_.push(_loc3_.typeId);
                }
            }
        }
        _loc1_.sort((a, b) => a - b);
        _loc1_.unshift(-1);
        return _loc1_;
    }

    private getAvailableRarityFilterIds(): any[] {
        let _loc1_: any[] = [-1];
        let _loc2_: UtilsMap = this._SafeStr_2134.pets;
        if (_loc2_ != null) {
            for (const _loc3_ of valuesOf(_loc2_)) {
                if (!(_loc3_.typeId != 16 || _loc3_.rarityLevel < 0)) {
                    if (_loc1_.indexOf(_loc3_.rarityLevel) == -1) {
                        _loc1_.push(_loc3_.rarityLevel);
                    }
                }
            }
        }
        _loc1_.sort((a, b) => a - b);
        if (_loc1_.indexOf(-1) > 0) {
            _loc1_.splice(_loc1_.indexOf(-1), 1);
            _loc1_.unshift(-1);
        }
        return _loc1_;
    }

    private getVisiblePetIds(param1: any[] = null): any[] {
        let _loc5_: PetData = null;
        let _loc2_: any[] = [];
        let _loc3_: any[] = param1 ?? (this._SafeStr_2134.pets != null ? this._SafeStr_2134.pets.getKeys() : []);
        for (const _loc4_ of _loc3_ ?? []) {
            _loc5_ = this._SafeStr_2134.pets.getValue(_loc4_);
            if (this.passesFilter(_loc5_)) {
                _loc2_.push(_loc4_);
            }
        }
        return _loc2_;
    }

    private passesFilter(param1: PetData): boolean {
        let _loc2_: string = null;
        let _loc4_: string = null;
        if (param1 == null) {
            return false;
        }
        if (this._SafeStr_14291 != -1 && param1.typeId != this._SafeStr_14291) {
            return false;
        }
        if (this.isRarityFilterEnabled() && this._SafeStr_14304 != -1 && param1.rarityLevel != this._SafeStr_14304) {
            return false;
        }
        let _loc3_: string = this.getSearchTerm();
        if (_loc3_.length > 0) {
            _loc2_ = param1.name != null ? param1.name.toLowerCase() : "";
            _loc4_ = this.getPetTypeLabel(param1.typeId).toLowerCase();
            if (_loc2_.indexOf(_loc3_) == -1 && _loc4_.indexOf(_loc3_) == -1) {
                return false;
            }
        }
        return true;
    }

    private getSearchTerm(): string {
        let _loc1_: ITextWindow = asGuarded(this._view.findChildByName("filter"), isITextWindow);
        return _loc1_ != null ? _loc1_.caption.toLowerCase() : "";
    }

    private getSelectedTypeFilter(param1: IDropMenuWindow): number {
        if (param1 == null || this._SafeStr_14303 == null || this._SafeStr_14303.length == 0) {
            return -1;
        }
        let _loc2_: number = param1.selection;
        if (_loc2_ < 0 || _loc2_ >= this._SafeStr_14303.length) {
            _loc2_ = 0;
        }
        return this._SafeStr_14303[_loc2_] | 0;
    }

    private getSelectedRarityFilter(param1: IDropMenuWindow): number {
        if (param1 == null || this._SafeStr_14305 == null || this._SafeStr_14305.length == 0) {
            return -1;
        }
        let _loc2_: number = param1.selection;
        if (_loc2_ < 0 || _loc2_ >= this._SafeStr_14305.length) {
            _loc2_ = 0;
        }
        return this._SafeStr_14305[_loc2_] | 0;
    }

    private isRarityFilterEnabled(): boolean {
        return this._SafeStr_14291 == 16;
    }

    private getRarityFilterLabel(param1: number): string {
        if (param1 == -1) {
            return this._SafeStr_2134.controller.localization.getLocalization("inventory.pets.filter.rarity.all");
        }
        return String(param1);
    }

    private getPetTypeLabel(param1: number): string {
        return this._SafeStr_2134.controller.localization.getLocalization("pet.type." + param1);
    }

    get [IDisposable](): true {
        return true;
    }

    get [IGetImageListener](): true {
        return true;
    }
}
