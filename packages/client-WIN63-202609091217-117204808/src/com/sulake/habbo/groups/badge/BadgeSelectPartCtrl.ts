import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BadgeEditorCtrl } from '@/com/sulake/habbo/groups/badge/BadgeEditorCtrl';
import type { BadgeLayerOptions } from '@/com/sulake/habbo/groups/badge/BadgeLayerOptions';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIBorderWindow } from '@/com/sulake/core/window/components/IBorderWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BadgeEditorPartItem } from '@/com/sulake/habbo/groups/badge/BadgeEditorPartItem';
import { BadgeLayerCtrl } from '@/com/sulake/habbo/groups/badge/BadgeLayerCtrl';

export class BadgeSelectPartCtrl implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge::BadgeSelectPartCtrl'); }

    declare private _manager: HabboGroupsManager;

    declare private _SafeStr_2408: BadgeEditorCtrl;

    declare private _SafeStr_2644: BadgeEditorPartItem[];

    declare private _SafeStr_2754: BadgeEditorPartItem[];

    declare private _layerOptions: BadgeLayerOptions;

    declare private _selectedItem: IWindowContainer;

    declare private _SafeStr_3044: IBitmapWrapperWindow;

    private _disposed: boolean = false;

    constructor(param1: HabboGroupsManager, param2: BadgeEditorCtrl) {
        this._manager = param1;
        this._SafeStr_2408 = param2;
    }

    public get layerOptions(): BadgeLayerOptions {
        return this._layerOptions;
    }

    public set layerOptions(param1: BadgeLayerOptions) {
        this._layerOptions = param1;
    }

    public dispose(): void {
        let _loc1_: any = null;
        if (!this._disposed) {
            if (this._SafeStr_2408.partSelectGrid != null && this._SafeStr_2408.partSelectGrid.numGridItems > 0) {
                this._SafeStr_2408.partSelectGrid.destroyGridItems();
            }
            if (this._SafeStr_2754) {
                for (_loc1_ of this._SafeStr_2754 ?? []) {
                    _loc1_.dispose();
                }
                this._SafeStr_2754 = null;
            }
            if (this._SafeStr_2644) {
                for (_loc1_ of this._SafeStr_2644 ?? []) {
                    _loc1_.dispose();
                }
                this._SafeStr_2644 = null;
            }
            this._layerOptions = null;
            this._SafeStr_3044 = null;
            this._selectedItem = null;
            this._SafeStr_2408 = null;
            this._manager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public getSelectedPartIndex(): number {
        let _loc1_: number = -1;
        if (this._layerOptions != null && this._SafeStr_2408.partSelectGrid != null && this._selectedItem != null) {
            _loc1_ = this._SafeStr_2408.partSelectGrid.getGridItemIndex(this._selectedItem);
            if (_loc1_ != -1 && this._layerOptions.layerIndex != BadgeLayerCtrl.BASE_LAYER_INDEX) {
                _loc1_ -= 1;
            }
        }
        return _loc1_;
    }

    public loadData(): void {
        let _loc1_: any = null;
        if (this._SafeStr_2754 != null || this._SafeStr_2644 != null) {
            return;
        }
        this._SafeStr_2754 = [];
        for (_loc1_ of this._manager.guildEditorData.baseParts ?? []) {
            this._SafeStr_2754.push(new BadgeEditorPartItem(this._manager, this, this._SafeStr_2754.length | 0, BadgeEditorPartItem.BASE_PART, _loc1_));
        }
        this._SafeStr_2644 = [];
        this._SafeStr_2644.push(new BadgeEditorPartItem(this._manager, this, -1, BadgeEditorPartItem.LAYER_PART));
        for (_loc1_ of this._manager.guildEditorData.layerParts ?? []) {
            this._SafeStr_2644.push(new BadgeEditorPartItem(this._manager, this, this._SafeStr_2644.length - 1, BadgeEditorPartItem.LAYER_PART, _loc1_));
        }
    }

    public updateGrid(): void {
        let _loc1_: any = null;
        this._selectedItem = null;
        this._SafeStr_3044 = null;
        this._layerOptions = this._SafeStr_2408.currentLayerOptions.clone();
        this._SafeStr_2408.partSelectGrid.destroyGridItems();
        if (this._layerOptions.layerIndex == BadgeLayerCtrl.BASE_LAYER_INDEX) {
            for (_loc1_ of this._SafeStr_2754 ?? []) {
                this._SafeStr_2408.partSelectGrid.addGridItem(this.createGridItem(_loc1_));
            }
        } else {
            for (_loc1_ of this._SafeStr_2644 ?? []) {
                this._SafeStr_2408.partSelectGrid.addGridItem(this.createGridItem(_loc1_));
            }
        }
    }

    private createGridItem(param1: BadgeEditorPartItem): IWindowContainer {
        let _loc2_: IWindowContainer = asGuarded(this._manager.getXmlWindow("badge_part_item"), isIWindowContainer);
        _loc2_.procedure = this.onPartMouseEvent;
        this.setGridItemImage(_loc2_, param1);
        return _loc2_;
    }

    public onBaseImageLoaded(param1: BadgeEditorPartItem): void {
        let _loc2_: IWindowContainer = null;
        if (this._layerOptions != null && this._layerOptions.layerIndex == BadgeLayerCtrl.BASE_LAYER_INDEX && Boolean(this._SafeStr_2408.partSelectContainer.visible)) {
            _loc2_ = asGuarded(this._SafeStr_2408.partSelectGrid.getGridItemAt(param1.partIndex >>> 0), isIWindowContainer);
            this.setGridItemImage(_loc2_, param1);
        }
    }

    public onLayerImageLoaded(param1: BadgeEditorPartItem): void {
        let _loc2_: IWindowContainer = null;
        if (this._layerOptions != null && this._layerOptions.layerIndex != BadgeLayerCtrl.BASE_LAYER_INDEX && Boolean(this._SafeStr_2408.partSelectContainer.visible)) {
            _loc2_ = asGuarded(this._SafeStr_2408.partSelectGrid.getGridItemAt(param1.partIndex + 1 >>> 0), isIWindowContainer);
            this.setGridItemImage(_loc2_, param1);
        }
    }

    private setGridItemImage(param1: IWindowContainer, param2: BadgeEditorPartItem): void {
        let _loc5_: IBitmapWrapperWindow = null;
        let _loc4_: BitmapData = param2.getComposite(this._layerOptions);
        if (_loc4_ != null) {
            _loc5_ = asGuarded(param1.findChildByName("part"), isIBitmapWrapperWindow);
            _loc5_.bitmap = new BitmapData(_loc4_.width, _loc4_.height);
            _loc5_.bitmap.copyPixels(_loc4_, _loc4_.rect, new Point());
        }
        let _loc3_: IBitmapWrapperWindow = asGuarded(param1.findChildByName("selected"), isIBitmapWrapperWindow);
        _loc3_.bitmap = this._manager.getButtonImage("badge_part_picker");
        if (param2.partIndex == this._layerOptions.partIndex) {
            _loc3_.visible = true;
            this._SafeStr_3044 = _loc3_;
        } else {
            _loc3_.visible = false;
        }
    }

    private onPartMouseEvent = (param1: WindowEvent, param2: IWindow): void => {
        let _loc3_: IBorderWindow = null;
        let _loc4_: IWindowContainer = null;
        if (param1.type == "WME_OVER") {
            if (this._selectedItem != param2) {
                if (this._selectedItem != null) {
                    _loc3_ = asGuarded(this._selectedItem.findChildByName("background"), isIBorderWindow);
                    if (_loc3_ != null) {
                        _loc3_.color = 15329761;
                    }
                }
                this._selectedItem = isIWindowContainer(param2) ? param2 : null;
                if (this._selectedItem != null) {
                    _loc3_ = asGuarded(this._selectedItem.findChildByName("background"), isIBorderWindow);
                    if (_loc3_ != null) {
                        _loc3_.color = 14210761;
                    }
                    this._layerOptions.partIndex = this.getSelectedPartIndex();
                    this._SafeStr_2408.onPartHover(this);
                }
            }
        }
        if (param1.type == "WME_CLICK") {
            if (this._SafeStr_3044 != null) {
                this._SafeStr_3044.visible = false;
            }
            _loc4_ = isIWindowContainer(param2) ? param2 : null;
            if (_loc4_ != null) {
                this._SafeStr_3044 = asGuarded(_loc4_.findChildByName("selected"), isIBitmapWrapperWindow);
                this._SafeStr_3044.visible = true;
            }
            this._SafeStr_2408.onPartSelected(this);
        }
    };

    public getPartItemImage(param1: BadgeLayerOptions): BitmapData {
        if (param1 == null || param1.partIndex < 0) {
            return null;
        }
        if (param1.layerIndex == BadgeLayerCtrl.BASE_LAYER_INDEX) {
            if (this._SafeStr_2754 != null && param1.partIndex < this._SafeStr_2754.length) {
                return this._SafeStr_2754[param1.partIndex].getComposite(param1);
            }
        } else if (this._SafeStr_2644 != null && param1.partIndex + 1 < this._SafeStr_2644.length) {
            return this._SafeStr_2644[param1.partIndex + 1].getComposite(param1);
        }
        return null;
    }

    get [IDisposable](): true {
        return true;
    }
}
