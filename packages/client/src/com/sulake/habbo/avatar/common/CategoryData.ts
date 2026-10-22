import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IFigurePartSet } from '@/com/sulake/habbo/avatar/structure/figure/IFigurePartSet';
import type { IPartColor } from '@/com/sulake/habbo/avatar/structure/figure/IPartColor';
import type { IHabboInventory } from '@/com/sulake/habbo/inventory/IHabboInventory';
import { AvatarEditorGridColorItem } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridColorItem';
import { AvatarEditorGridPartItem } from '@/com/sulake/habbo/avatar/common/AvatarEditorGridPartItem';

export class CategoryData {
    static { registerClassName(this, 'com.sulake.habbo.avatar.common::CategoryData'); }

    private readonly MAX_PALETTES: number = 2;

    private static defaultColorId(param1: any[], param2: number): number {
        let _loc3_: number = 0;
        let _loc4_: AvatarEditorGridColorItem = null;
        if (!param1 || param1.length == 0) {
            return -1;
        }
        _loc3_ = 0;
        while (_loc3_ < param1.length) {
            _loc4_ = param1[_loc3_];
            if (_loc4_.partColor && _loc4_.partColor.clubLevel <= param2) {
                return _loc4_.partColor.id;
            }
            _loc3_++;
        }
        return -1;
    }

    constructor(param1: any[], param2: any[]) {
        this._parts = param1;
        this._palettes = param2;
        this._paletteIndexes = [];
    }

    declare private _parts: any[];

    declare private _palettes: any[];

    private _selectedPartIndex: number = -1;

    declare private _paletteIndexes: any[];

    public get parts(): any[] {
        return this._parts;
    }

    public get selectedPartIndex(): number {
        return this._selectedPartIndex;
    }

    public dispose(): void {
        let _loc1_: any;
        if (this._parts) {
            for (const _loc2_ of this._parts ?? []) {
                _loc2_.dispose();
            }
            this._parts = null;
        }
        if (this._palettes) {
            for (const _loc3_ of (Array.isArray(this._palettes) ? this._palettes : null) ?? []) {
                if (_loc3_) {
                    for (_loc1_ of valuesOf(_loc3_)) {
                        _loc1_.dispose();
                    }
                }
            }
            this._palettes = null;
        }
        this._selectedPartIndex = -1;
        this._paletteIndexes = null;
    }

    public selectPartId(param1: number): void {
        let _loc3_: number = 0;
        let _loc2_: AvatarEditorGridPartItem = null;
        if (!this._parts) {
            return;
        }
        _loc3_ = 0;
        while (_loc3_ < this._parts.length) {
            _loc2_ = this._parts[_loc3_];
            if (_loc2_.id == param1) {
                this.selectPartIndex(_loc3_);
                return;
            }
            _loc3_++;
        }
    }

    public selectColorIds(param1: any[]): void {
        let _loc6_: AvatarEditorGridColorItem = null;
        let _loc7_: number = 0;
        let _loc5_: any[] = null;
        let _loc3_: number = 0;
        let _loc2_: AvatarEditorGridColorItem = null;
        let _loc4_: number = 0;
        if (!this._palettes) {
            return;
        }
        if (!param1) {
            return;
        }
        this._paletteIndexes = new Array(param1.length);
        _loc7_ = 0;
        while (_loc7_ < this._palettes.length) {
            _loc5_ = this.getPalette(_loc7_);
            if (_loc5_) {
                if (param1.length > _loc7_) {
                    _loc3_ = param1[_loc7_] | 0;
                } else {
                    _loc2_ = asInstanceOf(_loc5_[0], AvatarEditorGridColorItem);
                    if (_loc2_ && _loc2_.partColor) {
                        _loc3_ = _loc2_.partColor.id;
                    }
                }
                _loc4_ = 0;
                while (_loc4_ < _loc5_.length) {
                    _loc6_ = asInstanceOf(_loc5_[_loc4_], AvatarEditorGridColorItem);
                    if (_loc6_.partColor.id == _loc3_) {
                        this._paletteIndexes[_loc7_] = _loc4_;
                        _loc6_.isSelected = true;
                    } else {
                        _loc6_.isSelected = false;
                    }
                    _loc4_++;
                }
            }
            _loc7_++;
        }
        this.updatePartColors();
    }

    public selectPartIndex(param1: number): AvatarEditorGridPartItem {
        let _loc2_: AvatarEditorGridPartItem = null;
        let _loc3_: AvatarEditorGridPartItem = null;
        if (!this._parts) {
            return null;
        }
        if (this._selectedPartIndex >= 0 && this._parts.length > this._selectedPartIndex) {
            _loc2_ = this._parts[this._selectedPartIndex];
            if (_loc2_) {
                _loc2_.isSelected = false;
            }
        }
        if (this._parts.length > param1) {
            _loc3_ = asInstanceOf(this._parts[param1], AvatarEditorGridPartItem);
            if (_loc3_) {
                _loc3_.isSelected = true;
                this._selectedPartIndex = param1;
                return _loc3_;
            }
        }
        return null;
    }

    public selectColorIndex(param1: number, param2: number): AvatarEditorGridColorItem {
        let _loc4_: any[] = this.getPalette(param2);
        if (!_loc4_) {
            return null;
        }
        if (_loc4_.length <= param1) {
            return null;
        }
        this.deselectColorIndex(this._paletteIndexes[param2] | 0, param2);
        this._paletteIndexes[param2] = param1;
        let _loc3_: AvatarEditorGridColorItem = asInstanceOf(_loc4_[param1], AvatarEditorGridColorItem);
        if (!_loc3_) {
            return null;
        }
        _loc3_.isSelected = true;
        this.updatePartColors();
        return _loc3_;
    }

    public getCurrentColorIndex(param1: number): number {
        if (this._paletteIndexes.length <= param1) {
            return 0;
        }
        return this._paletteIndexes[param1] | 0;
    }

    public getSelectedColorIds(): any[] {
        let _loc8_: number = 0;
        let _loc7_: any[] = null;
        let _loc5_: AvatarEditorGridColorItem = null;
        if (!this._paletteIndexes || this._paletteIndexes.length == 0) {
            return null;
        }
        if (!this._palettes || this._palettes.length == 0) {
            return null;
        }
        let _loc4_: any[] = asGuarded(this._palettes[0], Array.isArray);
        if (!_loc4_ || _loc4_.length == 0) {
            return null;
        }
        let _loc3_: AvatarEditorGridColorItem = asInstanceOf(_loc4_[0], AvatarEditorGridColorItem);
        if (!_loc3_ || !_loc3_.partColor) {
            return null;
        }
        let _loc1_: number = _loc3_.partColor.id;
        let _loc2_: any[] = [];
        _loc8_ = 0;
        while (_loc8_ < this._paletteIndexes.length) {
            _loc7_ = this._palettes[_loc8_];
            if (!(!_loc7_ || _loc7_.length <= _loc8_)) {
                if (_loc7_.length > this._paletteIndexes[_loc8_]) {
                    _loc5_ = asInstanceOf(_loc7_[this._paletteIndexes[_loc8_]], AvatarEditorGridColorItem);
                    if (_loc5_ && _loc5_.partColor) {
                        _loc2_.push(_loc5_.partColor.id);
                    } else {
                        _loc2_.push(_loc1_);
                    }
                } else {
                    _loc2_.push(_loc1_);
                }
            }
            _loc8_++;
        }
        let _loc6_: AvatarEditorGridPartItem = this.getCurrentPart();
        if (!_loc6_) {
            return null;
        }
        return _loc2_.slice(0, Math.max(_loc6_.colorLayerCount, 1));
    }

    public getSelectedColor(param1: number): AvatarEditorGridColorItem {
        let _loc2_: any[] = this.getPalette(param1);
        if (!_loc2_ || _loc2_.length <= this._paletteIndexes[param1]) {
            return null;
        }
        return asInstanceOf(_loc2_[this._paletteIndexes[param1]], AvatarEditorGridColorItem);
    }

    public getCurrentColorId(param1: number): number {
        let _loc2_: AvatarEditorGridColorItem = this.getSelectedColor(param1);
        if (_loc2_ && _loc2_.partColor) {
            return _loc2_.partColor.id;
        }
        return 0;
    }

    public getPalette(param1: number): any[] {
        if (!this._paletteIndexes) {
            return null;
        }
        if (!this._palettes) {
            return null;
        }
        if (this._palettes.length <= param1) {
            return null;
        }
        return asGuarded(this._palettes[param1], Array.isArray);
    }

    public getCurrentPart(): AvatarEditorGridPartItem {
        return asInstanceOf(this._parts[this._selectedPartIndex], AvatarEditorGridPartItem);
    }

    public hasClubSelectionsOverLevel(param1: number): boolean {
        let _loc6_: number = 0;
        let _loc8_: IPartColor = null;
        let _loc2_: IFigurePartSet = null;
        let _loc5_: boolean = false;
        let _loc7_: any[] = this.getSelectedColors();
        if (_loc7_) {
            _loc6_ = 0;
            while (_loc6_ < _loc7_.length) {
                _loc8_ = _loc7_[_loc6_];
                if (_loc8_ != null && _loc8_.clubLevel > param1) {
                    _loc5_ = true;
                }
                _loc6_++;
            }
        }
        let _loc3_: boolean = false;
        let _loc4_: AvatarEditorGridPartItem = this.getCurrentPart();
        if (_loc4_ != null && _loc4_.partSet) {
            _loc2_ = _loc4_.partSet;
            if (_loc2_ != null && _loc2_.clubLevel > param1) {
                _loc3_ = true;
            }
        }
        return _loc5_ || _loc3_;
    }

    public hasInvalidSellableItems(param1: IHabboInventory): boolean {
        let _loc2_: IFigurePartSet = null;
        let _loc3_: boolean = false;
        let _loc4_: AvatarEditorGridPartItem = this.getCurrentPart();
        if (_loc4_ != null && _loc4_.partSet) {
            _loc2_ = _loc4_.partSet;
            if (_loc2_ != null && _loc2_.isSellable && !param1.hasFigureSetIdInInventory(_loc2_.id)) {
                _loc3_ = true;
            }
        }
        return _loc3_;
    }

    public stripClubItemsOverLevel(param1: number): boolean {
        let _loc3_: IFigurePartSet = null;
        let _loc2_: AvatarEditorGridPartItem = null;
        let _loc4_: AvatarEditorGridPartItem = this.getCurrentPart();
        if (_loc4_ && _loc4_.partSet) {
            _loc3_ = _loc4_.partSet;
            if (_loc3_.clubLevel > param1) {
                _loc2_ = this.selectPartIndex(0);
                if (_loc2_ != null && _loc2_.partSet == null) {
                    this.selectPartIndex(1);
                }
                return true;
            }
        }
        return false;
    }

    public stripClubColorsOverLevel(param1: number): boolean {
        let _loc5_: number = 0;
        let _loc8_: IPartColor = null;
        let _loc4_: any[] = [];
        let _loc7_: any[] = this.getSelectedColors();
        let _loc2_: boolean = false;
        let _loc6_: any[] = this.getPalette(0);
        let _loc3_: number = CategoryData.defaultColorId(_loc6_, param1);
        if (_loc3_ == -1) {
            return false;
        }
        _loc5_ = 0;
        while (_loc5_ < _loc7_.length) {
            _loc8_ = _loc7_[_loc5_];
            if (_loc8_ == null) {
                _loc4_.push(_loc3_);
                _loc2_ = true;
            } else if (_loc8_.clubLevel > param1) {
                _loc4_.push(_loc3_);
                _loc2_ = true;
            } else {
                _loc4_.push(_loc8_.id);
            }
            _loc5_++;
        }
        if (_loc2_) {
            this.selectColorIds(_loc4_);
        }
        return _loc2_;
    }

    public stripInvalidSellableItems(param1: IHabboInventory): boolean {
        let _loc3_: IFigurePartSet = null;
        let _loc2_: AvatarEditorGridPartItem = null;
        let _loc4_: AvatarEditorGridPartItem = this.getCurrentPart();
        if (_loc4_ && _loc4_.partSet) {
            _loc3_ = _loc4_.partSet;
            if (_loc3_.isSellable && !param1.hasFigureSetIdInInventory(_loc3_.id)) {
                _loc2_ = this.selectPartIndex(0);
                if (_loc2_ != null && _loc2_.partSet == null) {
                    this.selectPartIndex(1);
                }
                return true;
            }
        }
        return false;
    }

    private deselectColorIndex(param1: number, param2: number): void {
        let _loc4_: any[] = this.getPalette(param2);
        if (!_loc4_) {
            return;
        }
        if (_loc4_.length <= param1) {
            return;
        }
        let _loc3_: AvatarEditorGridColorItem = asInstanceOf(_loc4_[param1], AvatarEditorGridColorItem);
        if (!_loc3_) {
            return;
        }
        _loc3_.isSelected = false;
    }

    private getSelectedColors(): any[] {
        let _loc3_: AvatarEditorGridColorItem = null;
        let _loc2_: number = 0;
        let _loc1_: any[] = [];
        _loc2_ = 0;
        while (_loc2_ < this._paletteIndexes.length) {
            _loc3_ = this.getSelectedColor(_loc2_);
            if (_loc3_) {
                _loc1_.push(_loc3_.partColor);
            } else {
                _loc1_.push(null);
            }
            _loc2_++;
        }
        return _loc1_;
    }

    private updatePartColors(): void {
        let _loc2_: any[] = this.getSelectedColors();
        for (const _loc1_ of this._parts ?? []) {
            if (_loc1_) {
                _loc1_.colors = _loc2_;
            }
        }
    }
}
