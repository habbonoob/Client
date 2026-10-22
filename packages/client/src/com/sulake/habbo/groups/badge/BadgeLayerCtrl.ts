import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { BadgeEditorCtrl } from '@/com/sulake/habbo/groups/badge/BadgeEditorCtrl';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { BadgeLayerOptions } from '@/com/sulake/habbo/groups/badge/BadgeLayerOptions';
import { ColorGridCtrl } from '@/com/sulake/habbo/groups/ColorGridCtrl';

export class BadgeLayerCtrl {
    static { registerClassName(this, 'com.sulake.habbo.groups.badge::BadgeLayerCtrl'); }

    public static BASE_LAYER_INDEX: number = 0;
    public static PARENT_CONTAINER_NAME: string = "part_edit_list";

    constructor(param1: HabboGroupsManager, param2: BadgeEditorCtrl, param3: number) {
        this._manager = param1;
        this._SafeStr_2408 = param2;
        this._layerIndex = param3;
        this._layerOptions = new BadgeLayerOptions();
        this._layerOptions.layerIndex = param3;
        this._SafeStr_6957 = this._manager.getButtonImage("badge_part_add");
    }

    declare private _manager: HabboGroupsManager;

    declare private _SafeStr_2408: BadgeEditorCtrl;

    private _layerIndex: number = 0;

    declare private _layerOptions: BadgeLayerOptions;

    declare private _SafeStr_2920: IWindowContainer;

    declare private _SafeStr_3412: ColorGridCtrl;

    private _disposed: boolean = false;

    declare private _SafeStr_6957: BitmapData;

    declare private _SafeStr_3578: IBitmapWrapperWindow;

    declare private _SafeStr_5056: IButtonWindow;

    declare private _SafeStr_4379: IWindowContainer;

    declare private _SafeStr_3455: IBitmapWrapperWindow;

    declare private _SafeStr_4189: IBitmapWrapperWindow;

    public get layerOptions(): BadgeLayerOptions {
        return this._layerOptions;
    }

    public createWindow(): void {
        if (this._SafeStr_2920 != null) {
            return;
        }
        let _loc1_: IItemListWindow = asGuarded(this._SafeStr_2408.partEditContainer.findChildByName(BadgeLayerCtrl.PARENT_CONTAINER_NAME), isIItemListWindow);
        this._SafeStr_2920 = asGuarded(this._manager.getXmlWindow("badge_layer"), isIWindowContainer);
        let _loc2_: IWindowContainer = asGuarded(this._SafeStr_2920.findChildByName("preview_container"), isIWindowContainer);
        this._SafeStr_3578 = asGuarded(_loc2_.findChildByName("part_preview"), isIBitmapWrapperWindow);
        this._SafeStr_3578.bitmap = this._manager.getButtonImage("badge_part_add");
        this._SafeStr_5056 = asGuarded(_loc2_.findChildByName("part_button"), isIButtonWindow);
        this._SafeStr_5056.procedure = this.onPartPreviewButtonClick;
        this._SafeStr_4379 = asGuarded(this._SafeStr_2920.findChildByName("position_container"), isIWindowContainer);
        this._SafeStr_3455 = asGuarded(this._SafeStr_4379.findChildByName("position_picker"), isIBitmapWrapperWindow);
        this._SafeStr_3455.bitmap = this._manager.getButtonImage("position_picker");
        this._SafeStr_4189 = asGuarded(this._SafeStr_4379.findChildByName("position_grid"), isIBitmapWrapperWindow);
        this._SafeStr_4189.bitmap = this._manager.getButtonImage("position_grid");
        if (this._layerIndex == 0) {
            this._SafeStr_4189.visible = false;
            this._SafeStr_3455.visible = false;
        } else {
            this._SafeStr_4189.procedure = this.onPositionGridClick;
        }
        this._SafeStr_3412 = new ColorGridCtrl(this._manager, this.onColorSelected);
        this._SafeStr_3412.createAndAttach(this._SafeStr_2920, "color_selector", this._manager.guildEditorData.badgeColors);
        if (this._layerOptions.layerIndex == BadgeLayerCtrl.BASE_LAYER_INDEX) {
            _loc1_.addListItem(this._SafeStr_2920);
        } else {
            _loc1_.addListItemAt(this._SafeStr_2920, 0);
        }
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_3412) {
                this._SafeStr_3412.dispose();
                this._SafeStr_3412 = null;
            }
            if (this._SafeStr_2920) {
                this._SafeStr_2920.dispose();
                this._SafeStr_2920 = null;
            }
            this._SafeStr_3578 = null;
            this._SafeStr_5056 = null;
            this._SafeStr_4379 = null;
            this._SafeStr_3455 = null;
            this._SafeStr_4189 = null;
            this._manager = null;
            this._disposed = true;
        }
    }

    public setLayerOptions(param1: BadgeLayerOptions): void {
        if (param1.layerIndex != this._layerOptions.layerIndex) {
            throw new Error("Tried to set layer option with invalid layerIndex value");
        }
        let _loc2_: boolean = false;
        let _loc3_: BadgeLayerOptions = this._layerOptions;
        this._layerOptions = param1.clone();
        if (!this._layerOptions.isGridEqual(_loc3_)) {
            this.updatePositionPicker(false);
            _loc2_ = true;
        }
        if (_loc3_.colorIndex != this._layerOptions.colorIndex) {
            this._SafeStr_3412.setSelectedColorIndex(this._layerOptions.colorIndex, false);
            this._layerOptions.colorIndex = this._SafeStr_3412.selectedColorIndex;
            _loc2_ = true;
        }
        if (_loc2_ || _loc3_.partIndex != this._layerOptions.partIndex) {
            this.updateSelectedPart();
        }
    }

    public updateSelectedPart(): void {
        let _loc1_: BitmapData = null;
        if (this._SafeStr_2408.badgeSelectPartCtrl) {
            _loc1_ = this._SafeStr_2408.badgeSelectPartCtrl.getPartItemImage(this.layerOptions);
        }
        if (_loc1_ == null) {
            _loc1_ = this._SafeStr_6957;
        }
        this._SafeStr_3578.bitmap.dispose();
        this._SafeStr_3578.bitmap = new BitmapData(_loc1_.width, _loc1_.height);
        this._SafeStr_3578.bitmap.copyPixels(_loc1_, _loc1_.rect, new Point());
        this._SafeStr_2408.onPartChanged(this);
    }

    public onColorSelected = (param1: ColorGridCtrl): void => {
        if (this._layerOptions.colorIndex != param1.selectedColorIndex) {
            this._layerOptions.colorIndex = param1.selectedColorIndex;
            this.updateSelectedPart();
        }
    };

    private updatePositionPicker(param1: boolean = true): void {
        this._SafeStr_3455.x = this._layerOptions.gridX * 14 + 1;
        this._SafeStr_3455.y = this._layerOptions.gridY * 14 + 1;
        if (param1) {
            this.updateSelectedPart();
        }
    }

    private onPositionGridClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK" || !this._SafeStr_3455) {
            return;
        }
        let _loc3_: WindowMouseEvent = param1 instanceof WindowMouseEvent ? param1 : null;
        this._layerOptions.gridX = Math.min(2, Math.max(0, Math.floor(_loc3_.localX / 14))) | 0;
        this._layerOptions.gridY = Math.min(2, Math.max(0, Math.floor(_loc3_.localY / 14))) | 0;
        this.updatePositionPicker();
    };

    private onPartPreviewButtonClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this._SafeStr_2408.onShowSelectPart(this);
    };
}
