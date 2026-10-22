import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { AvatarEditorGridColorItem } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridColorItem';
import type { AvatarEditorGridPartItem } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridPartItem';
import type { CategoryData } from '@/com/sulake/habbo/avatar/common/CategoryData';
import type { IAvatarEditorCategoryView } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryView';
import type { HabboAvatarEditor } from '@/com/sulake/habbo/avatar/HabboAvatarEditor';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { IAvatarEditorCategoryModel } from '@/com/sulake/habbo/avatar/common/IAvatarEditorCategoryModel';

export class CategoryBaseModel implements IAvatarEditorCategoryModel {
    static { registerClassName(this, 'com.sulake.habbo.avatar.common::CategoryBaseModel'); }

    constructor(param1: HabboAvatarEditor) {
        this._controller = param1;
    }

    declare protected _categories: UtilsMap;

    declare protected _controller: HabboAvatarEditor;

    protected _isInitialized: boolean = false;

    declare protected _view: IAvatarEditorCategoryView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get controller(): HabboAvatarEditor {
        return this._controller;
    }

    public dispose(): void {
        if (this._view != null) {
            this._view.dispose();
        }
        this._view = null;
        this._categories = null;
        this._controller = null;
        this._disposed = true;
    }

    public reset(): void {
        this._isInitialized = false;
        for (const _loc1_ of valuesOf(this._categories)) {
            if (_loc1_) {
                _loc1_.dispose();
            }
        }
        this._categories = new UtilsMap();
        if (this._view) {
            this._view.reset();
        }
    }

    public switchCategory(param1: string = ""): void {
        if (!this._isInitialized) {
            this.init();
        }
        if (this._view) {
            this._view.switchCategory(param1);
        }
    }

    public hasClubItemsOverLevel(param1: number): boolean {
        let _loc2_: boolean = false;
        if (!this._categories) {
            return false;
        }
        for (const _loc3_ of this._categories.getValues() ?? []) {
            if (_loc3_ != null) {
                _loc2_ = _loc3_.hasClubSelectionsOverLevel(param1);
                if (_loc2_) {
                    return true;
                }
            }
        }
        return false;
    }

    public hasInvalidSellableItems(param1: IHabboInventory): boolean {
        let _loc2_: boolean = false;
        if (!this._categories) {
            return false;
        }
        for (const _loc3_ of this._categories.getValues() ?? []) {
            if (_loc3_ != null) {
                _loc2_ = _loc3_.hasInvalidSellableItems(param1);
                if (_loc2_) {
                    return true;
                }
            }
        }
        return false;
    }

    public stripClubItemsOverLevel(param1: number): boolean {
        let _loc6_: number = 0;
        let _loc2_: string = null;
        let _loc7_: CategoryData = null;
        let _loc5_: boolean = false;
        let _loc3_: AvatarEditorGridPartItem = null;
        if (!this._categories) {
            return false;
        }
        let _loc8_: any[] = this._categories.getKeys();
        let _loc4_: boolean = false;
        _loc6_ = 0;
        while (_loc6_ < _loc8_.length) {
            _loc2_ = stringOrNull(_loc8_[_loc6_]);
            _loc7_ = this._categories[_loc2_];
            _loc5_ = false;
            if (_loc7_.stripClubItemsOverLevel(param1)) {
                _loc5_ = true;
            }
            if (_loc7_.stripClubColorsOverLevel(param1)) {
                _loc5_ = true;
            }
            if (_loc5_) {
                _loc3_ = _loc7_.getCurrentPart();
                if (_loc3_ && this._controller && this._controller.figureData && _loc7_) {
                    this._controller.figureData.savePartData(_loc2_, _loc3_.id, _loc7_.getSelectedColorIds(), true);
                }
                _loc4_ = true;
            }
            _loc6_++;
        }
        return _loc4_;
    }

    public stripInvalidSellableItems(): boolean {
        let _loc5_: number = 0;
        let _loc1_: string = null;
        let _loc6_: CategoryData = null;
        let _loc4_: boolean = false;
        let _loc2_: AvatarEditorGridPartItem = null;
        if (!this._categories) {
            return false;
        }
        let _loc7_: any[] = this._categories.getKeys();
        let _loc3_: boolean = false;
        _loc5_ = 0;
        while (_loc5_ < _loc7_.length) {
            _loc1_ = stringOrNull(_loc7_[_loc5_]);
            _loc6_ = this._categories[_loc1_];
            _loc4_ = false;
            if (_loc6_.stripInvalidSellableItems(this._controller.manager.inventory)) {
                _loc4_ = true;
            }
            if (_loc4_) {
                _loc2_ = _loc6_.getCurrentPart();
                if (_loc2_ && this._controller && this._controller.figureData && _loc6_) {
                    this._controller.figureData.savePartData(_loc1_, _loc2_.id, _loc6_.getSelectedColorIds(), true);
                }
                _loc3_ = true;
            }
            _loc5_++;
        }
        return _loc3_;
    }

    public selectPart(param1: string, param2: number): void {
        let _loc3_: CategoryData = this._categories[param1];
        if (_loc3_ == null) {
            return;
        }
        let _loc5_: number = _loc3_.selectedPartIndex;
        _loc3_.selectPartIndex(param2);
        let _loc4_: AvatarEditorGridPartItem = _loc3_.getCurrentPart();
        if (!_loc4_) {
            return;
        }
        if (_loc4_.isDisabledForWearing) {
            _loc3_.selectPartIndex(_loc5_);
            this._controller.openHabboClubAdWindow();
            return;
        }
        if (this._view) {
            this._view.showPalettes(param1, _loc4_.colorLayerCount);
        }
        if (this._controller && this._controller.figureData) {
            this._controller.figureData.savePartData(param1, _loc4_.id, _loc3_.getSelectedColorIds(), true);
        }
    }

    public selectColor(param1: string, param2: number, param3: number): void {
        let _loc6_: AvatarEditorGridColorItem = null;
        let _loc5_: CategoryData = this._categories[param1];
        if (_loc5_ == null) {
            return;
        }
        let _loc4_: number = _loc5_.getCurrentColorIndex(param3);
        _loc5_.selectColorIndex(param2, param3);
        if (this._controller && this._controller.figureData) {
            _loc6_ = _loc5_.getSelectedColor(param3);
            if (!_loc6_) {
                return;
            }
            if (_loc6_.isDisabledForWearing) {
                _loc5_.selectColorIndex(_loc4_, param3);
                this._controller.openHabboClubAdWindow();
                return;
            }
            this._controller.figureData.savePartSetColourId(param1, _loc5_.getSelectedColorIds(), true);
        }
    }

    public getWindowContainer(): IWindow {
        if (!this._isInitialized) {
            this.init();
        }
        if (!this._view) {
            return null;
        }
        return this._view.getWindowContainer();
    }

    public getCategoryData(param1: string): CategoryData {
        if (!this._isInitialized) {
            this.init();
        }
        if (!this._categories) {
            return null;
        }
        return this._categories[param1];
    }

    protected init(): void {
        if (!this._categories) {
            this._categories = new UtilsMap();
        }
    }

    protected initCategory(param1: string): void {
        let _loc3_: CategoryData = null;
        let _loc2_: CategoryData = this._categories[param1];
        if (_loc2_ == null) {
            _loc3_ = this._controller.generateDataContent(this, param1);
            if (_loc3_) {
                this._categories[param1] = _loc3_;
                this.updateSelectionsFromFigure(param1);
            }
        }
    }

    protected updateSelectionsFromFigure(param1: string): void {
        if (!this._categories || !this._controller || !this._controller.figureData) {
            return;
        }
        let _loc2_: CategoryData = this._categories[param1];
        if (_loc2_ == null) {
            return;
        }
        let _loc4_: number = this._controller.figureData.getPartSetId(param1);
        let _loc3_: any[] = this._controller.figureData.getColourIds(param1);
        if (!_loc3_) {
            _loc3_ = [];
        }
        _loc2_.selectPartId(_loc4_);
        _loc2_.selectColorIds(_loc3_);
        if (this._view) {
            this._view.showPalettes(param1, _loc3_.length | 0);
        }
    }

    get [IAvatarEditorCategoryModel](): true {
        return true;
    }
}
