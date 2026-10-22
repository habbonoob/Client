import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboGroupsEditorData } from '@/com/sulake/habbo/groups/events/HabboGroupsEditorData';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { GuildBadgeSettings } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildBadgeSettings';
import { BadgeEditorPartItem } from '@/com/sulake/habbo/groups/badge/BadgeEditorPartItem';
import { BadgeLayerCtrl } from '@/com/sulake/habbo/groups/badge/BadgeLayerCtrl';
import { BadgeLayerOptions } from '@/com/sulake/habbo/groups/badge/BadgeLayerOptions';
import { BadgeSelectPartCtrl } from '@/com/sulake/habbo/groups/badge/BadgeSelectPartCtrl';

export class BadgeEditorCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge::BadgeEditorCtrl'); }

    constructor(param1: HabboGroupsManager) {
        this._manager = param1;
        this._manager.events.addEventListener("HGE_EDIT_INFO", this.onHabboGroupsEditorData);
        this._badgeSelectPartCtrl = new BadgeSelectPartCtrl(this._manager, this);
        this._layers = [];
        this._layers.push(new BadgeLayerCtrl(this._manager, this, 0));
        this._layers.push(new BadgeLayerCtrl(this._manager, this, 1));
        this._layers.push(new BadgeLayerCtrl(this._manager, this, 2));
        this._layers.push(new BadgeLayerCtrl(this._manager, this, 3));
        this._layers.push(new BadgeLayerCtrl(this._manager, this, 4));
    }

    declare private _manager: HabboGroupsManager;

    declare private _window: IWindowContainer;

    declare private _SafeStr_4771: IWindowContainer;

    declare private _SafeStr_3295: any[];

    declare private _badgeSelectPartCtrl: BadgeSelectPartCtrl;

    declare private _layers: BadgeLayerCtrl[];

    declare private _currentLayerOptions: BadgeLayerOptions;

    declare private _partSelectContainer: IWindowContainer;

    declare private _partSelectGrid: IItemGridWindow;

    declare private _partEditContainer: IWindowContainer;

    declare private _badgePreviewImages: IBitmapWrapperWindow[];

    private _disposed: boolean = false;

    public get disposed(): boolean {
        return this._disposed;
    }

    public get partEditContainer(): IWindowContainer {
        return this._partEditContainer;
    }

    public get partSelectContainer(): IWindowContainer {
        return this._partSelectContainer;
    }

    public get partSelectGrid(): IItemGridWindow {
        return this._partSelectGrid;
    }

    public get currentLayerOptions(): BadgeLayerOptions {
        return this._currentLayerOptions;
    }

    public get badgeSelectPartCtrl(): BadgeSelectPartCtrl {
        return this._badgeSelectPartCtrl;
    }

    public get isIntialized(): boolean {
        return this._window != null && this._SafeStr_3295 != null;
    }

    public get primaryColorIndex(): number {
        if (this._layers == null) {
            return 0;
        }
        let _loc1_: number = 0;
        for (const _loc2_ of this._layers ?? []) {
            if (!(this.getLayerPartId(_loc2_.layerOptions) < 0 || this.getLayerColorId(_loc2_.layerOptions) < 0)) {
                _loc1_ = _loc2_.layerOptions.colorIndex;
            }
        }
        return _loc1_;
    }

    public get secondaryColorIndex(): number {
        if (this._layers != null) {
            return this._layers[0].layerOptions.colorIndex;
        }
        return 0;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._layers) {
                for (const _loc1_ of this._layers ?? []) {
                    _loc1_.dispose();
                }
                this._layers = null;
            }
            if (this._badgeSelectPartCtrl) {
                this._badgeSelectPartCtrl.dispose();
                this._badgeSelectPartCtrl = null;
            }
            if (this._partSelectContainer) {
                this._partSelectContainer.dispose();
                this._partSelectContainer = null;
            }
            if (this._partSelectGrid) {
                this._partSelectGrid.dispose();
                this._partSelectGrid = null;
            }
            if (this._partEditContainer) {
                this._partEditContainer.dispose();
                this._partEditContainer = null;
            }
            if (this._badgePreviewImages) {
                for (const _loc2_ of this._badgePreviewImages ?? []) {
                    _loc2_.dispose();
                }
                this._badgePreviewImages = null;
            }
            if (this._window) {
                this._window.dispose();
                this._window = null;
            }
            this._SafeStr_3295 = null;
            this._currentLayerOptions = null;
            this._window = null;
            this._manager = null;
            this._disposed = true;
        }
    }

    public createWindow(param1: IWindowContainer, param2: any[]): void {
        let _loc3_: number = 0;
        if (this._window != null || this._disposed) {
            return;
        }
        if (param1 != null) {
            this._SafeStr_4771 = param1;
        }
        if (param2 != null) {
            this._SafeStr_3295 = param2;
        }
        if (this._SafeStr_4771 == null || this._SafeStr_3295 == null || this._manager == null || this._manager.guildEditorData == null) {
            return;
        }
        this._window = asGuarded(this._manager.getXmlWindow("badge_editor"), isIWindowContainer);
        let _loc4_: IWindowContainer = asGuarded(this._window.findChildByName("guild_badge"), isIWindowContainer);
        this._badgePreviewImages = [];
        this._badgePreviewImages.push(asGuarded(_loc4_.findChildByName("layer_0"), isIBitmapWrapperWindow));
        this._badgePreviewImages.push(asGuarded(_loc4_.findChildByName("layer_1"), isIBitmapWrapperWindow));
        this._badgePreviewImages.push(asGuarded(_loc4_.findChildByName("layer_2"), isIBitmapWrapperWindow));
        this._badgePreviewImages.push(asGuarded(_loc4_.findChildByName("layer_3"), isIBitmapWrapperWindow));
        this._badgePreviewImages.push(asGuarded(_loc4_.findChildByName("layer_4"), isIBitmapWrapperWindow));
        this._partEditContainer = asGuarded(this._window.findChildByName("part_edit"), isIWindowContainer);
        this._partSelectContainer = asGuarded(this._window.findChildByName("part_select"), isIWindowContainer);
        this._partSelectContainer.visible = false;
        this._partSelectGrid = asGuarded(this._partSelectContainer.findChildByName("part_select_grid"), isIItemGridWindow);
        _loc3_ = 0;
        while (_loc3_ < this._layers.length) {
            this._layers[_loc3_].createWindow();
            _loc3_++;
        }
        this.resetLayerOptions(this._SafeStr_3295);
        this._SafeStr_4771.addChild(this._window);
    }

    public resetLayerOptions(param1: any[]): void {
        let _loc2_: number = 0;
        if (!this.isIntialized) {
            return;
        }
        if (this._partSelectContainer.visible) {
            this._partSelectContainer.visible = false;
            this._partEditContainer.visible = true;
        }
        this._SafeStr_3295 = param1;
        this._currentLayerOptions = null;
        this._partEditContainer.visible = true;
        this._partSelectContainer.visible = false;
        this._badgeSelectPartCtrl.loadData();
        _loc2_ = 0;
        while (_loc2_ < this._layers.length) {
            this._layers[_loc2_].setLayerOptions(this.createLayerOption(_loc2_));
            this._layers[_loc2_].updateSelectedPart();
            _loc2_++;
        }
    }

    public onPartSelected(param1: BadgeSelectPartCtrl): void {
        this._currentLayerOptions.partIndex = param1.getSelectedPartIndex();
        this._layers[this._currentLayerOptions.layerIndex].setLayerOptions(this.currentLayerOptions);
        this._partEditContainer.visible = true;
        this._partSelectContainer.visible = false;
    }

    public onPartHover(param1: BadgeSelectPartCtrl): void {
        this.updatePreviewImage(param1.layerOptions);
    }

    public onPartChanged(param1: BadgeLayerCtrl): void {
        this.updatePreviewImage(param1.layerOptions);
    }

    public updatePreviewImage(param1: BadgeLayerOptions): void {
        let _loc2_: BitmapData = this._badgeSelectPartCtrl.getPartItemImage(param1);
        if (_loc2_ != null) {
            this._badgePreviewImages[param1.layerIndex].bitmap = _loc2_.clone();
            this._badgePreviewImages[param1.layerIndex].visible = true;
        } else {
            this._badgePreviewImages[param1.layerIndex].visible = false;
        }
    }

    public onShowSelectPart(param1: BadgeLayerCtrl): void {
        let _loc2_: BadgeLayerOptions = this._currentLayerOptions;
        this._currentLayerOptions = param1.layerOptions.clone();
        if (!param1.layerOptions.equalVisuals(_loc2_)) {
            this._badgeSelectPartCtrl.updateGrid();
        } else {
            this._badgeSelectPartCtrl.layerOptions = this._currentLayerOptions.clone();
        }
        this._partEditContainer.visible = false;
        this._partSelectContainer.visible = true;
    }

    public onViewChange(): void {
        if (this.isIntialized && Boolean(this._partSelectContainer.visible)) {
            this.updatePreviewImage(this._currentLayerOptions);
            this._partEditContainer.visible = true;
            this._partSelectContainer.visible = false;
        }
    }

    public getBadgeSettings(): any[] {
        let _loc2_: number = 0;
        let _loc3_: number = 0;
        let _loc1_: any[] = [];
        for (const _loc4_ of this._layers ?? []) {
            _loc2_ = this.getLayerPartId(_loc4_.layerOptions);
            if (_loc2_ >= 0) {
                _loc3_ = this.getLayerColorId(_loc4_.layerOptions);
                if (_loc3_ >= 0) {
                    _loc1_.push(_loc2_);
                    _loc1_.push(_loc3_);
                    _loc1_.push(_loc4_.layerOptions.position);
                }
            }
        }
        return _loc1_;
    }

    public getBadgeBitmap(): BitmapData {
        let _loc1_: BitmapData = new BitmapData(BadgeEditorPartItem.IMAGE_WIDTH | 0, BadgeEditorPartItem.IMAGE_HEIGHT | 0, true, 15329761);
        for (const _loc2_ of this._badgePreviewImages ?? []) {
            if (_loc2_.visible) {
                _loc1_.copyPixels(_loc2_.bitmap, _loc1_.rect, new Point(), null, null, true);
            }
        }
        return _loc1_;
    }

    private createLayerOption(param1: number): BadgeLayerOptions {
        let _loc3_: number = 0;
        let _loc2_: GuildBadgeSettings = asInstanceOf(this._SafeStr_3295[param1], GuildBadgeSettings);
        let _loc4_: BadgeLayerOptions = new BadgeLayerOptions();
        _loc4_.layerIndex = param1;
        _loc4_.colorIndex = 0;
        _loc4_.setGrid(_loc2_.position);
        _loc3_ = 0;
        while (_loc3_ < this._manager.guildEditorData.badgeColors.length) {
            if (this._manager.guildEditorData.badgeColors[_loc3_].id == _loc2_.colorId) {
                _loc4_.colorIndex = _loc3_;
                break;
            }
            _loc3_++;
        }
        if (param1 == BadgeLayerCtrl.BASE_LAYER_INDEX) {
            _loc3_ = 0;
            while (_loc3_ < this._manager.guildEditorData.baseParts.length) {
                if (this._manager.guildEditorData.baseParts[_loc3_].id == _loc2_.partId) {
                    _loc4_.partIndex = _loc3_;
                    break;
                }
                _loc3_++;
            }
        } else {
            _loc3_ = 0;
            while (_loc3_ < this._manager.guildEditorData.layerParts.length) {
                if (this._manager.guildEditorData.layerParts[_loc3_].id == _loc2_.partId) {
                    _loc4_.partIndex = _loc3_;
                    break;
                }
                _loc3_++;
            }
        }
        return _loc4_;
    }

    private getLayerPartId(param1: BadgeLayerOptions): number {
        if (param1.partIndex < 0) {
            return -1;
        }
        if (param1.layerIndex == BadgeLayerCtrl.BASE_LAYER_INDEX) {
            if (param1.partIndex >= this._manager.guildEditorData.baseParts.length) {
                return -1;
            }
            return this._manager.guildEditorData.baseParts[param1.partIndex].id;
        }
        if (param1.partIndex >= this._manager.guildEditorData.layerParts.length) {
            return -1;
        }
        return this._manager.guildEditorData.layerParts[param1.partIndex].id;
    }

    private getLayerColorId(param1: BadgeLayerOptions): number {
        if (param1.colorIndex < 0 || param1.colorIndex >= this._manager.guildEditorData.badgeColors.length) {
            return -1;
        }
        return this._manager.guildEditorData.badgeColors[param1.colorIndex].id;
    }

    public onHabboGroupsEditorData = (param1: HabboGroupsEditorData): void => {
        this._badgeSelectPartCtrl.loadData();
        this.createWindow(null, null);
    };

    get [IDisposable](): true {
        return true;
    }
}
