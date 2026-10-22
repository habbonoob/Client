import { asGuarded, asInstanceOf, castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { ICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import type { ISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import type { ITabButtonWindow } from '@/com/sulake/core/window/components/ITabButtonWindow';
import type { ITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { DimmerFurniWidget } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerFurniWidget';
import type { DimmerFurniWidgetPresetItem } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerFurniWidgetPresetItem';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isICheckBoxWindow } from '@/com/sulake/core/window/components/ICheckBoxWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isISelectableWindow } from '@/com/sulake/core/window/components/ISelectableWindow';
import { isITabContextWindow } from '@/com/sulake/core/window/components/ITabContextWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { DimmerViewAlphaSlider } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerViewAlphaSlider';
import { DimmerViewColorGrid } from '@/com/sulake/habbo/ui/widget/furniture/dimmer/DimmerViewColorGrid';

export class DimmerView {
    static { registerClassName(this, 'com.sulake.habbo.ui.widget.furniture.dimmer::DimmerView'); }

    private static readonly _SafeStr_7717: number = 100;
    private static readonly _SafeStr_8215: number = 100;

    declare private _window: IWindowContainer;

    declare private _tabContext: ITabContextWindow;

    declare private _windowXML: XML;

    declare private _widget: DimmerFurniWidget;

    declare private _SafeStr_2735: DimmerViewColorGrid;

    declare private _SafeStr_2852: DimmerViewAlphaSlider;

    declare private _selectedBrightness: number;
    static { (this.prototype as any)._selectedBrightness = 0; }

    declare private _selectedColorIndex: number;
    static { (this.prototype as any)._selectedColorIndex = 0; }

    declare private _selectedType: number;
    static { (this.prototype as any)._selectedType = 0; }

    constructor(param1: DimmerFurniWidget) {
        this._widget = param1;
    }

    public get selectedBrightness(): number {
        return this._selectedBrightness;
    }

    public get selectedColorIndex(): number {
        return this._selectedColorIndex;
    }

    public get selectedType(): number {
        return this._selectedType;
    }

    public dispose(): void {
        this.hideInterface();
        this._widget = null;
    }

    public showInterface(): void {
        if (this._window == null) {
            this.createWindow();
        }
        this.selectPreset(this._widget.selectedPresetIndex);
        this.update();
    }

    public update(): void {
        let _loc2_: string = null;
        if (this._window == null || this._widget == null) {
            return;
        }
        let _loc1_: boolean = this._widget.isOn;
        let _loc3_: IWindow = this._window.findChildByName("on_off_button");
        if (_loc3_ != null) {
            _loc2_ = _loc1_ ? "${widget.dimmer.button.off}" : "${widget.dimmer.button.on}";
            _loc3_.caption = _loc2_;
        }
        _loc3_ = this._window.findChildByName("tabbedview");
        if (_loc3_ != null) {
            _loc3_.visible = _loc1_;
        }
        _loc3_ = this._window.findChildByName("apply_button");
        if (_loc3_ != null) {
            _loc1_ ? _loc3_.enable() : _loc3_.disable();
        }
        _loc3_ = this._window.findChildByName("off_border");
        if (_loc3_) {
            _loc3_.visible = !_loc1_;
        }
    }

    public hideInterface(): void {
        if (this._widget != null) {
            this._widget.removePreview();
        }
        if (this._SafeStr_2735 != null) {
            this._SafeStr_2735.dispose();
            this._SafeStr_2735 = null;
        }
        if (this._SafeStr_2852 != null) {
            this._SafeStr_2852.dispose();
            this._SafeStr_2852 = null;
        }
        this._tabContext = null;
        if (this._window != null) {
            this._window.dispose();
            this._window = null;
        }
    }

    private createWindow(): void {
        let _loc4_: IWindow = null;
        let _loc5_: IWindow = null;
        let _loc6_: number = 0;
        let _loc1_: ITabButtonWindow = null;
        let _loc3_: BitmapData = null;
        if (this._widget == null || this._widget.windowManager == null || this.windowXML == null) {
            return;
        }
        this._window = asGuarded(this._widget.windowManager.createWindow("dimmerui_container", "", 4, 0, (0x020000 | 1) >>> 0, new Rectangle(100, 100, 2, 2), null, 0), isIWindowContainer);
        this._window.buildFromXML(this.windowXML);
        _loc4_ = this._window.findChildByTag("close");
        if (_loc4_ != null) {
            _loc4_.procedure = this.onWindowClose;
        }
        _loc4_ = this._window.findChildByName("color_grid_container");
        if (_loc4_ != null) {
            _loc5_ = (isIWindowContainer(_loc4_) ? _loc4_ : null).findChildByName("color_grid");
            if (_loc5_ != null) {
                this._SafeStr_2735 = new DimmerViewColorGrid(this, isIItemGridWindow(_loc5_) ? _loc5_ : null, this._widget.windowManager, this._widget.assets);
            }
        }
        _loc4_ = this._window.findChildByName("brightness_container");
        if (_loc4_ != null) {
            this._SafeStr_2852 = new DimmerViewAlphaSlider(this, isIWindowContainer(_loc4_) ? _loc4_ : null, this._widget.assets);
        }
        this._tabContext = castGuarded(this._window.findChildByName("tab_context"), isITabContextWindow, "com.sulake.core.window.components.ITabContextWindow");
        this.selectTab(this._widget.selectedPresetIndex);
        _loc6_ = 0;
        while (_loc6_ < this._tabContext.numTabItems) {
            _loc1_ = this._tabContext.getTabItemAt(_loc6_ >>> 0);
            _loc1_.setParamFlag(1, true);
            _loc1_.procedure = this.onTabClick;
            _loc6_++;
        }
        _loc4_ = this._window.findChildByName("type_checkbox");
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc4_ = this._window.findChildByName("apply_button");
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        _loc4_ = this._window.findChildByName("on_off_button");
        if (_loc4_ != null) {
            _loc4_.addEventListener("WME_CLICK", this.onMouseEvent);
        }
        let _loc2_: IBitmapWrapperWindow = asGuarded(this._window.findChildByName("off_image"), isIBitmapWrapperWindow);
        let _loc7_: BitmapDataAsset = asInstanceOf(this._widget.assets.getAssetByName("dimmer_info"), BitmapDataAsset);
        if (_loc2_ != null && _loc7_ != null) {
            _loc2_.bitmap = new BitmapData(_loc2_.width, _loc2_.height);
            _loc3_ = asInstanceOf(_loc7_.content, BitmapData);
            if (_loc3_ != null) {
                _loc2_.bitmap.copyPixels(_loc3_, _loc3_.rect, new Point(0, 0));
            }
        }
    }

    private onMouseEvent = (param1: WindowMouseEvent): void => {
        let _loc3_: ICheckBoxWindow = null;
        let _loc2_: IWindow = asGuarded(param1.target, isIWindow);
        let _loc4_: string;
        switch (_loc4_ = _loc2_.name) {
            case "type_checkbox":
                _loc3_ = asGuarded(param1.target, isICheckBoxWindow);
                if (_loc3_ == null) {
                    return;
                }
                if (_loc3_.isSelected) {
                    this.selectedType = 2;
                } else {
                    this.selectedType = 1;
                }
                this._widget.previewCurrentSetting();
                break;
            case "apply_button":
                this._widget.storeCurrentSetting(true);
                break;
            case "cancel":
            case "close":
                this.hideInterface();
                break;
            case "on_off_button":
                this._widget.changeRoomDimmerState();
        }
    };

    private onTabClick = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WE_SELECTED") {
            return;
        }
        this._widget.storeCurrentSetting(false);
        let _loc3_: number = param2.id;
        this.selectPreset(_loc3_);
    };

    private onWindowClose = (param1: WindowEvent, param2: IWindow): void => {
        if (param1.type != "WME_CLICK") {
            return;
        }
        this.hideInterface();
    };

    private selectPreset(param1: number): void {
        if (this._widget == null || this._widget.presets == null || param1 < 0 || param1 >= this._widget.presets.length) {
            return;
        }
        this._widget.selectedPresetIndex = param1;
        let _loc2_: DimmerFurniWidgetPresetItem = this._widget.presets[param1];
        if (_loc2_ == null) {
            return;
        }
        this.selectTab(param1);
        this._selectedBrightness = _loc2_.light | 0;
        if (this._SafeStr_2852 != null) {
            this._SafeStr_2852.setValue(this._selectedBrightness);
        }
        this._selectedColorIndex = this.colors.indexOf(_loc2_.color);
        if (this._SafeStr_2735 != null) {
            this._SafeStr_2735.setSelectedColorIndex(this._selectedColorIndex);
        }
        this.selectedType = _loc2_.type;
        this._widget.previewCurrentSetting();
    }

    private selectTab(param1: number): void {
        if (this._tabContext == null) {
            return;
        }
        let _loc2_: IWindow = this._tabContext.getTabItemAt(param1 >>> 0);
        if (_loc2_ != null) {
            this._tabContext.selector.setSelected(isISelectableWindow(_loc2_) ? _loc2_ : null);
        }
    }

    private getSelectedTabIndex(): number {
        if (this._tabContext == null) {
            return -1;
        }
        let _loc1_: ISelectableWindow = this._tabContext.selector.getSelected();
        return this._tabContext.selector.getSelectableIndex(_loc1_);
    }

    private get windowXML(): XML {
        if (this._windowXML != null) {
            return this._windowXML;
        }
        if (this._widget == null || this._widget.assets == null || this._widget.assets.getAssetByName("dimmer_ui") == null) {
            return null;
        }
        let _loc1_: XmlAsset = castTo(this._widget.assets.getAssetByName("dimmer_ui"), XmlAsset);
        this._windowXML = XML.from(_loc1_.content);
        return this._windowXML;
    }

    public get colors(): any[] {
        if (this._widget == null) {
            return null;
        }
        return this._widget.colors;
    }

    public set selectedType(param1: number) {
        if (param1 != 1 && param1 != 2) {
            return;
        }
        this._selectedType = param1;
        let _loc2_: ICheckBoxWindow = asGuarded(this._window.findChildByName("type_checkbox"), isICheckBoxWindow);
        if (_loc2_ != null) {
            if (param1 == 2) {
                _loc2_.select();
            } else {
                _loc2_.unselect();
            }
        }
        if (this._SafeStr_2852 != null) {
            this._SafeStr_2852.min = Number(this._widget.minLights[param1 - 1]);
        }
    }

    public set selectedColorIndex(param1: number) {
        this._selectedColorIndex = param1;
        if (this._SafeStr_2735 != null) {
            this._SafeStr_2735.setSelectedColorIndex(param1);
        }
        this._widget.previewCurrentSetting();
    }

    public set selectedBrightness(param1: number) {
        this._selectedBrightness = param1;
        if (this._SafeStr_2852 != null) {
            this._SafeStr_2852.setValue(param1);
        }
        this._widget.previewCurrentSetting();
    }
}
