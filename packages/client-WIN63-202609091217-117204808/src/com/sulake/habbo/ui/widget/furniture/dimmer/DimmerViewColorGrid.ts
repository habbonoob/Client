import { asGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { DimmerView } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerView';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class DimmerViewColorGrid {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.dimmer::DimmerViewColorGrid'); }

    declare private _SafeStr_3030: IItemGridWindow;

    declare private _view: DimmerView;

    declare private _colorCellXML: XML;

    declare private _colorCellFrame: BitmapData;

    declare private _SafeStr_3861: BitmapData;

    declare private _SafeStr_3752: BitmapData;

    declare private _SafeStr_2555: IWindowContainer;

    constructor(param1: DimmerView, param2: IItemGridWindow, param3: IHabboWindowManager, param4: IAssetLibrary) {
        this._view = param1;
        this._SafeStr_3030 = param2;
        this.storeAssets(param4);
        this.populate(param3);
    }

    public dispose(): void {
        this._view = null;
        this._SafeStr_3030 = null;
        this._colorCellXML = null;
        this._colorCellFrame = null;
        this._SafeStr_3861 = null;
        this._SafeStr_3752 = null;
    }

    public setSelectedColorIndex(param1: number): void {
        if (this._SafeStr_3030 == null) {
            return;
        }
        if (param1 < 0 || param1 >= this._SafeStr_3030.numGridItems) {
            return;
        }
        this.select(asGuarded(this._SafeStr_3030.getGridItemAt(param1 >>> 0), isIWindowContainer));
    }

    private populate(param1: IHabboWindowManager): void {
        if (this._view == null || this._SafeStr_3030 == null) {
            return;
        }
        this.populateColourGrid(param1);
    }

    private select(param1: IWindowContainer): void {
        let _loc2_: IWindow = null;
        if (this._SafeStr_2555 != null) {
            _loc2_ = this._SafeStr_2555.getChildByName("chosen");
            if (_loc2_ != null) {
                _loc2_.visible = false;
            }
        }
        this._SafeStr_2555 = param1;
        _loc2_ = this._SafeStr_2555.getChildByName("chosen");
        if (_loc2_ != null) {
            _loc2_.visible = true;
        }
    }

    private populateColourGrid(param1: IHabboWindowManager): void {
        let _loc4_: IWindowContainer = null;
        let _loc8_: IBitmapWrapperWindow = null;
        let _loc14_: IBitmapWrapperWindow = null;
        let _loc11_: any = 0;
        let _loc3_: any = 0;
        let _loc2_: any = 0;
        let _loc7_: number = NaN;
        let _loc12_: number = NaN;
        let _loc5_: number = NaN;
        let _loc13_: ColorTransform = null;
        let _loc6_: BitmapData = null;
        let _loc9_: IBitmapWrapperWindow = null;
        this._SafeStr_3030.destroyGridItems();
        this._SafeStr_2555 = null;
        for (const _loc10_ of this.colors ?? []) {
            _loc4_ = asGuarded(param1.buildFromXML(this._colorCellXML), isIWindowContainer);
            _loc4_.addEventListener("WME_CLICK", this.onClick);
            _loc4_.background = true;
            _loc4_.color = 4294967295;
            _loc4_.width = this._colorCellFrame.width;
            _loc4_.height = this._colorCellFrame.height;
            this._SafeStr_3030.addGridItem(_loc4_);
            _loc8_ = asGuarded(_loc4_.findChildByTag("BG_BORDER"), isIBitmapWrapperWindow);
            if (_loc8_ != null) {
                _loc8_.bitmap = new BitmapData(this._colorCellFrame.width, this._colorCellFrame.height, true, 0);
                _loc8_.bitmap.copyPixels(this._colorCellFrame, this._colorCellFrame.rect, new Point(0, 0));
            }
            _loc14_ = asGuarded(_loc4_.findChildByTag("COLOR_IMAGE"), isIBitmapWrapperWindow);
            if (_loc14_ != null) {
                _loc14_.bitmap = new BitmapData(this._SafeStr_3861.width, this._SafeStr_3861.height, true, 0);
                _loc11_ = (_loc10_ >> 16 & 0xFF) >>> 0;
                _loc3_ = (_loc10_ >> 8 & 0xFF) >>> 0;
                _loc2_ = (_loc10_ >> 0 & 0xFF) >>> 0;
                _loc7_ = _loc11_ / 255 * 1;
                _loc12_ = _loc3_ / 255 * 1;
                _loc5_ = _loc2_ / 255 * 1;
                _loc13_ = new ColorTransform(_loc7_, _loc12_, _loc5_);
                _loc6_ = this._SafeStr_3861.clone();
                _loc6_.colorTransform(_loc6_.rect, _loc13_);
                _loc14_.bitmap.copyPixels(_loc6_, _loc6_.rect, new Point(0, 0));
            }
            _loc9_ = asGuarded(_loc4_.findChildByTag("COLOR_CHOSEN"), isIBitmapWrapperWindow);
            if (_loc9_ != null) {
                _loc9_.bitmap = new BitmapData(this._SafeStr_3752.width, this._SafeStr_3752.height, true, 16777215);
                _loc9_.bitmap.copyPixels(this._SafeStr_3752, this._SafeStr_3752.rect, new Point(0, 0), null, null, true);
                _loc9_.visible = false;
            }
        }
    }

    private onClick = (param1: WindowMouseEvent): void => {
        let _loc2_: number = this._SafeStr_3030.getGridItemIndex(asGuarded(param1.target, isIWindow));
        this.setSelectedColorIndex(_loc2_);
        this._view.selectedColorIndex = _loc2_;
    };

    private storeAssets(param1: IAssetLibrary): void {
        let _loc2_: XmlAsset = null;
        let _loc3_: BitmapDataAsset = null;
        if (param1 == null) {
            return;
        }
        _loc2_ = castTo(param1.getAssetByName("dimmer_color_chooser_cell"), XmlAsset);
        this._colorCellXML = XML.from(_loc2_.content);
        _loc3_ = castTo(param1.getAssetByName("dimmer_color_frame"), BitmapDataAsset);
        this._colorCellFrame = castTo(_loc3_.content, BitmapData);
        _loc3_ = castTo(param1.getAssetByName("dimmer_color_button"), BitmapDataAsset);
        this._SafeStr_3861 = castTo(_loc3_.content, BitmapData);
        _loc3_ = castTo(param1.getAssetByName("dimmer_color_selected"), BitmapDataAsset);
        this._SafeStr_3752 = castTo(_loc3_.content, BitmapData);
    }

    private get colors(): any[] {
        if (this._view == null) {
            return [];
        }
        return this._view.colors;
    }
}
