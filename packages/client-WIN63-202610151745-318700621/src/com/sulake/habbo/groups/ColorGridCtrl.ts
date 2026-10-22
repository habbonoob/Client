import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { GuildColorData } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildColorData';
import type { HabboGroupsManager } from '@/com/sulake/habbo/groups/HabboGroupsManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { Exception } from '@/com/sulake/core/runtime/exceptions/Exception';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class ColorGridCtrl {
    static { registerClassName(this, 'com.sulake.habbo.groups::ColorGridCtrl'); }

    declare private _manager: HabboGroupsManager;

    declare private _SafeStr_4771: IWindowContainer;

    declare private _parentCallback: (...args: any[]) => any;

    declare private _SafeStr_3388: GuildColorData[];

    declare private _SafeStr_2735: IItemGridWindow;

    private _selectedColorIndex: number = -1;

    declare private _SafeStr_4131: BitmapData;

    declare private _SafeStr_2731: BitmapData;

    declare private _SafeStr_3994: BitmapData;

    private _disposed: boolean = false;

    constructor(param1: HabboGroupsManager, param2: (...args: any[]) => any) {
        this._manager = param1;
        this._parentCallback = param2;
    }

    public get selectedColorIndex(): number {
        return this._selectedColorIndex;
    }

    public get isInitialized(): boolean {
        return this._SafeStr_3388 != null && this._SafeStr_2735 != null;
    }

    public dispose(): void {
        if (!this._disposed) {
            if (this._SafeStr_2735) {
                this._SafeStr_2735.destroyGridItems();
                this._SafeStr_2735 = null;
            }
            if (this._SafeStr_2731) {
                this._SafeStr_2731.dispose();
                this._SafeStr_2731 = null;
            }
            if (this._SafeStr_3994) {
                this._SafeStr_3994.dispose();
                this._SafeStr_3994 = null;
            }
            if (this._SafeStr_2731) {
                this._SafeStr_2731.dispose();
                this._SafeStr_2731 = null;
            }
            if (this._SafeStr_4131) {
                this._SafeStr_4131.dispose();
                this._SafeStr_4131 = null;
            }
            this._manager = null;
            this._SafeStr_4771 = null;
            this._disposed = true;
        }
    }

    public createAndAttach(param1: IWindowContainer, param2: string, param3: GuildColorData[]): void {
        let _loc4_: IWindowContainer = null;
        if (this._SafeStr_2735 != null || param1 == null || param2 == null || param3 == null) {
            return;
        }
        this._SafeStr_4771 = param1;
        this._SafeStr_3388 = param3;
        this._SafeStr_2735 = asGuarded(this._SafeStr_4771.findChildByName(param2), isIItemGridWindow);
        this._SafeStr_2731 = this.getBitmap("color_chooser_bg");
        this._SafeStr_3994 = this.getBitmap("color_chooser_fg");
        this._SafeStr_4131 = this.getBitmap("color_chooser_selected");
        for (const _loc5_ of this._SafeStr_3388 ?? []) {
            _loc4_ = asGuarded(this._manager.getXmlWindow("badge_color_item"), isIWindowContainer);
            _loc4_.procedure = this.onClick;
            _loc4_.background = true;
            _loc4_.color = 4290689957;
            _loc4_.width = this._SafeStr_2731.width;
            _loc4_.height = this._SafeStr_2731.height;
            this.setGridItemBitmap(_loc4_, "background", this._SafeStr_2731, true, null);
            this.setGridItemBitmap(_loc4_, "foreground", this._SafeStr_3994, true, _loc5_);
            this.setGridItemBitmap(_loc4_, "selected", this._SafeStr_4131, false, null);
            this._SafeStr_2735.addGridItem(_loc4_);
        }
    }

    private setGridItemBitmap(param1: IWindowContainer, param2: string, param3: BitmapData, param4: boolean, param5: GuildColorData = null): void {
        let _loc7_: BitmapData = null;
        let _loc6_: IBitmapWrapperWindow = asGuarded(param1.findChildByName(param2), isIBitmapWrapperWindow);
        if (_loc6_ != null) {
            _loc7_ = param3.clone();
            if (param5 != null) {
                _loc7_.colorTransform(_loc7_.rect, new ColorTransform(param5.red / 255, param5.green / 255, param5.blue / 255));
            }
            _loc6_.bitmap = _loc7_;
            _loc6_.visible = param4;
        }
    }

    public setSelectedColorIndex(param1: number, param2: boolean = true): void {
        if (param1 < 0) {
            param1 = 0;
        }
        if (this._selectedColorIndex != param1 && param1 < this._SafeStr_2735.numGridItems) {
            this.setSelectedItemVisibility(this._selectedColorIndex, false);
            this._selectedColorIndex = param1;
            this.setSelectedItemVisibility(this._selectedColorIndex, true);
        }
        if (param2 && this._parentCallback != null) {
            this._parentCallback(this);
        }
    }

    public setSelectedColorById(param1: number): void {
        let _loc2_: number = 0;
        if (!this.isInitialized) {
            return;
        }
        _loc2_ = 0;
        while (_loc2_ < this._SafeStr_3388.length) {
            if (this._SafeStr_3388[_loc2_].id == param1) {
                this.setSelectedColorIndex(_loc2_);
                return;
            }
            _loc2_++;
        }
        this.setSelectedColorIndex(0);
    }

    public getSelectedColorId(): number {
        let _loc1_: GuildColorData = this.getSelectedColorData();
        if (_loc1_ != null) {
            return _loc1_.id;
        }
        return 0;
    }

    public getSelectedColorData(): GuildColorData {
        if (this._SafeStr_3388 != null && this._selectedColorIndex >= 0 && this._selectedColorIndex < this._SafeStr_3388.length) {
            return this._SafeStr_3388[this._selectedColorIndex];
        }
        return null;
    }

    private getBitmap(param1: string): BitmapData {
        let _loc3_: BitmapData = null;
        let _loc2_: BitmapDataAsset = asInstanceOf(this._manager.assets.getAssetByName(param1), BitmapDataAsset);
        if (_loc2_) {
            _loc3_ = asInstanceOf(_loc2_.content, BitmapData);
            if (_loc3_ != null) {
                return _loc3_;
            }
        }
        throw new Exception("Failed to load bitmap asset " + param1 + " in ColorGridWidget");
    }

    private setSelectedItemVisibility(param1: number, param2: boolean): void {
        let _loc3_: IWindow = null;
        if (param1 < 0 || param1 >= this._SafeStr_2735.numGridItems) {
            return;
        }
        let _loc4_: IWindowContainer = asGuarded(this._SafeStr_2735.getGridItemAt(param1 >>> 0), isIWindowContainer);
        if (_loc4_ != null) {
            _loc3_ = asGuarded(_loc4_.findChildByName("selected"), isIWindow);
            if (_loc3_ != null) {
                _loc3_.visible = param2;
            }
        }
    }

    private onClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.setSelectedColorIndex(this._SafeStr_2735.getGridItemIndex(param2));
    };
}
