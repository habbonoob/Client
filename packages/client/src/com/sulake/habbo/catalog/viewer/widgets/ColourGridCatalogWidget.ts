import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { CatalogWidgetColoursEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColoursEvent';
import type { CatalogWidgetMultiColoursEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetMultiColoursEvent';
import type { ICatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/ICatalogWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { ColorTransform } from '@habbo-pixi/runtime/geom/ColorTransform';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { XmlAsset } from '@/com/sulake/core/assets/XmlAsset';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isIWindow } from '@/com/sulake/core/window/IWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { CatalogWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/CatalogWidget';
import { CatalogWidgetColourIndexEvent } from '@/com/sulake/habbo/catalog/viewer/widgets/events/CatalogWidgetColourIndexEvent';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class ColourGridCatalogWidget extends CatalogWidget implements ICatalogWidget {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets::ColourGridCatalogWidget'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        ColourGridCatalogWidget.#initStatics();
        return ColourGridCatalogWidget._log;
    }

    constructor(param1: IWindowContainer) {
        super(param1);
    }

    declare private _colours: any[];

    declare private _colourGrid: IItemGridWindow;

    declare private _colourChooserLayout: XML;

    declare private _SafeStr_3165: BitmapData;

    declare private _SafeStr_3684: BitmapData;

    declare private _colourChosen: BitmapData;

    declare private _SafeStr_2555: IWindowContainer;

    private _SafeStr_6330: string = "";
    private _colourGridCache: Map<any, any> = new Dictionary();

    public override dispose(): void {
        if (!this._colourGrid.disposed) {
            this._colourGrid.destroyGridItems();
            this._colourGrid.dispose();
        }
        this._colourGrid = null;
        this._colourChooserLayout = null;
        this._SafeStr_2555 = null;
        this.events.removeEventListener("COLOUR_ARRAY", this.onAvailableColours);
        this.events.removeEventListener("MULTI_COLOUR_ARRAY", this.onAvailableMultiColours);
        super.dispose();
    }

    public override init(): boolean {
        if (!super.init()) {
            return false;
        }
        this.attachWidgetView("colourGridWidget");
        let _loc2_: any = this._window.tags.indexOf("FIXED") > -1;
        if (!_loc2_) {
            this._window.getChildAt(0).width = this._window.width;
            this._window.getChildAt(0).height = this._window.height;
        }
        this._colourGrid = asGuarded(this._window.findChildByName("colourGrid"), isIItemGridWindow);
        this._colourGrid.width = this.window.width - 6;
        this._colourGrid.height = this.window.height - 6;
        let _loc1_: XmlAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName("color_chooser_cell"), XmlAsset);
        this._colourChooserLayout = asInstanceOf(_loc1_.content, XML);
        this.events.addEventListener("COLOUR_ARRAY", this.onAvailableColours);
        this.events.addEventListener("MULTI_COLOUR_ARRAY", this.onAvailableMultiColours);
        return true;
    }

    private select(param1: IWindowContainer): void {
        let _loc2_: IWindow = null;
        ColourGridCatalogWidget._log.info("Select: " + param1);
        if (this._SafeStr_2555 != null) {
            _loc2_ = this._SafeStr_2555.getChildByName("chosen");
            if (_loc2_ != null) {
                _loc2_.visible = false;
            }
        }
        this._SafeStr_2555 = param1;
        if (this._SafeStr_2555 != null) {
            _loc2_ = this._SafeStr_2555.getChildByName("chosen");
        }
        if (_loc2_ != null) {
            _loc2_.visible = true;
        }
    }

    private populateColourGrid(): void {
        let _loc2_: number = 0;
        let _loc4_: any[] = null;
        let _loc3_: IWindowContainer = null;
        let _loc1_: IBitmapWrapperWindow = null;
        ColourGridCatalogWidget._log.info("Display colors: " + [this._colours.length, this._colourGrid.numGridItems]);
        this._colourGrid.removeGridItems();
        this._SafeStr_2555 = null;
        _loc2_ = 0;
        while (_loc2_ < this._colours.length) {
            _loc4_ = this._colours[_loc2_];
            if (_loc4_.length > 0) {
                _loc3_ = this.createColorContainer(_loc4_, _loc2_);
                this._colourGrid.addGridItem(_loc3_);
                _loc1_ = asGuarded(_loc3_.findChildByTag("COLOR_CHOSEN"), isIBitmapWrapperWindow);
                if (_loc1_ != null) {
                    _loc1_.bitmap = new BitmapData(this._colourChosen.width, this._colourChosen.height, true, 16777215);
                    _loc1_.bitmap.copyPixels(this._colourChosen, this._colourChosen.rect, new Point(0, 0), null, null, true);
                    _loc1_.visible = false;
                }
            }
            _loc2_++;
        }
    }

    private createColorContainer(param1: any[], param2: number): IWindowContainer {
        let _loc10_: any = 0;
        let _loc4_: any = 0;
        let _loc3_: any = 0;
        let _loc7_: BitmapData = null;
        let _loc5_: BitmapData = null;
        let _loc11_: number = 0;
        let _loc8_: number = 0;
        let _loc13_: number = 0;
        let _loc12_: string = this.coloursCacheKey(param1, param2);
        let _loc6_: IWindowContainer = this._colourGridCache.get(_loc12_);
        if (_loc6_ != null) {
            return _loc6_;
        }
        _loc6_ = asGuarded(this.page.viewer.catalog.windowManager.buildFromXML(this._colourChooserLayout), isIWindowContainer);
        _loc6_.addEventListener("WME_CLICK", this.onClick);
        _loc6_.background = true;
        _loc6_.color = 4294967295;
        _loc6_.width = this._SafeStr_3165.width;
        _loc6_.height = this._SafeStr_3165.height;
        let _loc9_: IBitmapWrapperWindow = asGuarded(_loc6_.findChildByTag("BG_BORDER"), isIBitmapWrapperWindow);
        if (_loc9_ != null) {
            _loc9_.bitmap = new BitmapData(this._SafeStr_3165.width, this._SafeStr_3165.height, true, 0);
            _loc9_.bitmap.copyPixels(this._SafeStr_3165, this._SafeStr_3165.rect, new Point(0, 0));
        }
        let _loc14_: IBitmapWrapperWindow = asGuarded(_loc6_.findChildByTag("COLOR_IMAGE"), isIBitmapWrapperWindow);
        if (_loc14_ != null) {
            _loc14_.bitmap = new BitmapData(this._SafeStr_3684.width, this._SafeStr_3684.height, true, 0);
            _loc10_ = 255;
            _loc4_ = 255;
            _loc3_ = 255;
            _loc7_ = null;
            _loc5_ = null;
            _loc11_ = param1[0] | 0;
            if (_loc11_ >= 0) {
                _loc10_ = (_loc11_ >> 16 & 0xFF) >>> 0;
                _loc4_ = (_loc11_ >> 8 & 0xFF) >>> 0;
                _loc3_ = (_loc11_ >> 0 & 0xFF) >>> 0;
            }
            _loc7_ = this._SafeStr_3684.clone();
            _loc7_.colorTransform(_loc7_.rect, new ColorTransform(_loc10_ / 255, _loc4_ / 255, _loc3_ / 255));
            if (param1.length > 1) {
                _loc8_ = param1[1] | 0;
                if (_loc8_ >= 0) {
                    _loc10_ = (_loc8_ >> 16 & 0xFF) >>> 0;
                    _loc4_ = (_loc8_ >> 8 & 0xFF) >>> 0;
                    _loc3_ = (_loc8_ >> 0 & 0xFF) >>> 0;
                }
                _loc5_ = this._SafeStr_3684.clone();
                _loc5_.colorTransform(_loc5_.rect, new ColorTransform(_loc10_ / 255, _loc4_ / 255, _loc3_ / 255));
            }
            _loc14_.bitmap.copyPixels(_loc7_, _loc7_.rect, new Point(0, 0));
            _loc7_.dispose();
            if (_loc5_ != null) {
                _loc13_ = _loc5_.width / 2 | 0;
                _loc14_.bitmap.copyPixels(_loc5_, new Rectangle(_loc13_, 0, _loc5_.width - _loc13_, _loc5_.height), new Point(_loc5_.width / 2, 0));
                _loc5_.dispose();
            }
        }
        this._colourGridCache.set(_loc12_, _loc6_);
        return _loc6_;
    }

    private coloursCacheKey(param1: any[], param2: number): string {
        let _loc4_: string = this._SafeStr_6330;
        _loc4_ = _loc4_ + "\t";
        _loc4_ = _loc4_ + param2;
        for (const _loc3_ of param1 ?? []) {
            _loc4_ += "\t";
            _loc4_ = _loc4_ + _loc3_;
        }
        return _loc4_;
    }

    private onClick = (param1: WindowMouseEvent): void => {
        this.select(asGuarded(param1.target, isIWindowContainer));
        let _loc2_: number = this._colourGrid.getGridItemIndex(asGuarded(param1.target, isIWindow));
        this.events.dispatchEvent(new CatalogWidgetColourIndexEvent(_loc2_));
    };

    private onAvailableColours = (param1: CatalogWidgetColoursEvent): void => {
        this._colours = [];
        for (const _loc4_ of param1.colours ?? []) {
            this._colours.push([_loc4_]);
        }
        let _loc5_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1.backgroundAssetName), BitmapDataAsset);
        this._SafeStr_3165 = asInstanceOf(_loc5_.content, BitmapData);
        let _loc3_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1.colourAssetName), BitmapDataAsset);
        this._SafeStr_3684 = asInstanceOf(_loc3_.content, BitmapData);
        this._SafeStr_6330 = param1.backgroundAssetName + "\t" + param1.colourAssetName;
        let _loc2_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1.chosenColourAssetName), BitmapDataAsset);
        this._colourChosen = asInstanceOf(_loc2_.content, BitmapData);
        this.populateColourGrid();
        this.select(asGuarded(this._colourGrid.getGridItemAt(param1.index >>> 0), isIWindowContainer));
    };

    private onAvailableMultiColours = (param1: CatalogWidgetMultiColoursEvent): void => {
        this._colours = [];
        for (const _loc4_ of param1.colours ?? []) {
            this._colours.push(_loc4_.slice());
        }
        let _loc5_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1.backgroundAssetName), BitmapDataAsset);
        this._SafeStr_3165 = asInstanceOf(_loc5_.content, BitmapData);
        let _loc3_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1.colourAssetName), BitmapDataAsset);
        this._SafeStr_3684 = asInstanceOf(_loc3_.content, BitmapData);
        let _loc2_: BitmapDataAsset = asInstanceOf(this.page.viewer.catalog.assets.getAssetByName(param1.chosenColourAssetName), BitmapDataAsset);
        this._colourChosen = asInstanceOf(_loc2_.content, BitmapData);
        this.populateColourGrid();
        this.select(asGuarded(this._colourGrid.getGridItemAt(0), isIWindowContainer));
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ColourGridCatalogWidget.#staticsReady) return;
        ColourGridCatalogWidget.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ColourGridCatalogWidget, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.catalog.viewer.widgets.ColourGridCatalogWidget"));
    }
}
