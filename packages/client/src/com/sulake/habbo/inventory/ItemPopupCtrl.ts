import { asGuarded, asInstanceOf, castGuarded, castTo, stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IAssetLibrary } from '@/com/sulake/core/assets/IAssetLibrary';
import type { AssetLoaderEvent } from '@/com/sulake/core/assets/loaders/AssetLoaderEvent';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboInventory } from '@/com/sulake/habbo/inventory/HabboInventory';
import type { IStuffData } from '@/com/sulake/habbo/room/IStuffData';
import type { IHabboWindowManager } from '@/com/sulake/habbo/window/IHabboWindowManager';
import type { ILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import type { IProductDisplayInfo } from '@/com/sulake/habbo/window/widgets/IProductDisplayInfo';
import type { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { DisplayObject } from '@habbo-pixi/runtime/display/DisplayObject';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import type { TimerEvent } from '@habbo-pixi/runtime/events/TimerEvent';
import { Matrix } from '@habbo-pixi/runtime/geom/Matrix';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { JSONDecoder } from '@habbo-pixi/runtime/json/JSONDecoder';
import { URLLoader } from '@habbo-pixi/runtime/net/URLLoader';
import { URLRequest } from '@habbo-pixi/runtime/net/URLRequest';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { BitmapDataAsset } from '@/com/sulake/core/assets/BitmapDataAsset';
import { BitmapFileLoader } from '@/com/sulake/core/runtime/Component.group';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { StringUtil } from '@/com/sulake/habbo/utils/StringUtil';
import { isILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';

export class ItemPopupCtrl {
    static { registerClassName(this, 'com.sulake.habbo.inventory::ItemPopupCtrl'); }

    public static readonly _SafeStr_7703: number = 1;
    public static readonly LOCATION_RIGHT: number = 2;
    private static readonly BOUNDS_MARGIN: number = -5;
    private static readonly OPEN_DELAY_MS: number = 250;
    private static readonly CLOSE_DELAY_MS: number = 100;
    private static readonly IMAGE_MAX_WIDTH: number = 180;
    private static readonly IMAGE_MAX_HEIGHT: number = 200;

    constructor(param1: IWindowContainer, param2: IAssetLibrary, param3: IHabboWindowManager, param4: HabboInventory) {
        if (param1 == null || param2 == null) {
            throw new Error("Null pointers passed as argument!");
        }
        this._SafeStr_2197 = param1;
        this._SafeStr_2197.visible = false;
        this._assets = param2;
        this._windowManager = param3;
        this._SafeStr_2805.addEventListener("timer", this.onDisplayTimer);
        this._hideDelayTimer.addEventListener("timer", this.onHideTimer);
        this._inventory = param4;
        let _loc5_: BitmapDataAsset = asInstanceOf(this._assets.getAssetByName("popup_arrow_right_png"), BitmapDataAsset);
        if (_loc5_ != null && _loc5_.content != null) {
            this._SafeStr_3704 = asInstanceOf(_loc5_.content, BitmapData);
        }
        _loc5_ = asInstanceOf(this._assets.getAssetByName("popup_arrow_left_png"), BitmapDataAsset);
        if (_loc5_ != null && _loc5_.content != null) {
            this._SafeStr_3328 = asInstanceOf(_loc5_.content, BitmapData);
        }
    }

    private _SafeStr_2805: Timer = new Timer(250, 1);
    private _hideDelayTimer: Timer = new Timer(100, 1);

    declare private _assets: IAssetLibrary;

    declare private _SafeStr_2197: IWindowContainer;

    declare private _parent: IWindowContainer;

    private _SafeStr_5664: number = 2;

    declare private _SafeStr_3328: BitmapData;

    declare private _SafeStr_3704: BitmapData;

    declare private _inventory: HabboInventory;

    declare private _windowManager: IHabboWindowManager;

    private _SafeStr_4546: boolean = false;

    public dispose(): void {
        if (this._SafeStr_2805 != null) {
            this._SafeStr_2805.removeEventListener("timer", this.onDisplayTimer);
            this._SafeStr_2805.stop();
            this._SafeStr_2805 = null;
        }
        if (this._hideDelayTimer != null) {
            this._hideDelayTimer.removeEventListener("timer", this.onHideTimer);
            this._hideDelayTimer.stop();
            this._hideDelayTimer = null;
        }
        this._assets = null;
        this._SafeStr_2197 = null;
        this._parent = null;
        this._SafeStr_3328 = null;
        this._SafeStr_3704 = null;
    }

    public updateContent(param1: IWindowContainer, param2: string, param3: BitmapData = null, param4: IProductDisplayInfo = null, param5: IStuffData = null, param6: number = 2, param7: boolean = false): void {
        let _loc16_: string = null;
        let _loc13_: string = null;
        let _loc11_: string = null;
        let _loc12_: ILimitedItemPreviewOverlayWidget = null;
        if (this._SafeStr_2197 == null) {
            return;
        }
        if (param1 == null) {
            return;
        }
        if (param3 == null) {
            param3 = new BitmapData(1, 1, true, 16777215);
        }
        if (this._parent != null) {
            this._parent.removeChild(this._SafeStr_2197);
        }
        this._parent = param1;
        this._SafeStr_5664 = param6;
        this._SafeStr_4546 = false;
        let _loc14_: ITextWindow = castGuarded(this._SafeStr_2197.findChildByName("item_name_text"), isITextWindow, "com.sulake.core.window.components.ITextWindow");
        if (_loc14_) {
            _loc14_.text = param2;
        }
        let _loc17_: IWidgetWindow = castGuarded(this._SafeStr_2197.findChildByName("nft_image"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc15_: IStaticBitmapWrapperWindow = castGuarded(this._SafeStr_2197.findChildByName("nft_overlay_icon"), isIStaticBitmapWrapperWindow, "com.sulake.core.window.components.IStaticBitmapWrapperWindow");
        let _loc10_: IWidgetWindow = castGuarded(this._SafeStr_2197.findChildByName("unique_item_overlay_widget"), isIWidgetWindow, "com.sulake.core.window.components.IWidgetWindow");
        let _loc9_: IBitmapWrapperWindow = asGuarded(this._SafeStr_2197.findChildByName("item_image"), isIBitmapWrapperWindow);
        let _loc18_: IProductImageWidget = asGuarded(_loc17_.widget, isIProductImageWidget);
        if (param4 != null) {
            _loc17_.visible = true;
            _loc15_.visible = true;
            _loc10_.visible = false;
            _loc9_.visible = false;
            _loc18_.productInfo = param4;
            this._SafeStr_2197.height = _loc17_.bottom + 28;
            return;
        }
        _loc17_.visible = false;
        _loc18_.clearPreviewer();
        _loc15_.visible = false;
        _loc9_.visible = true;
        if (param7 && this._inventory) {
            _loc10_.visible = false;
            _loc9_.bitmap = new BitmapData(1, 1, true, 16777215);
            if (param5 != null) {
                this._SafeStr_4546 = true;
                _loc16_ = param5.getJSONValue("id");
                if (!StringUtil.isBlank(_loc16_)) {
                    this.loadExtraData(_loc16_);
                } else {
                    _loc13_ = param5.getJSONValue("w");
                    if (!StringUtil.isBlank(_loc13_)) {
                        _loc11_ = this._inventory.getProperty("stories.image_url_base") + _loc13_;
                        this.loadImage(_loc11_);
                    }
                }
            }
            return;
        }
        let _loc8_: BitmapData = new BitmapData(Math.min(180, param3.width) | 0, Math.min(200, param3.height) | 0, true, 16777215);
        _loc8_.copyPixels(param3, new Rectangle(0, 0, _loc8_.width, _loc8_.height), new Point(0, 0), null, null, true);
        _loc9_.bitmap = _loc8_;
        _loc9_.width = _loc9_.bitmap.width;
        _loc9_.height = _loc9_.bitmap.height;
        _loc9_.x = (this._SafeStr_2197.width - _loc9_.width) / 2 | 0;
        this._SafeStr_2197.height = _loc9_.bottom + 10;
        if (param5 != null && param5.uniqueSerialNumber > 0) {
            _loc12_ = castGuarded(_loc10_.widget, isILimitedItemPreviewOverlayWidget, "com.sulake.habbo.window.widgets.ILimitedItemPreviewOverlayWidget");
            _loc12_.serialNumber = param5.uniqueSerialNumber;
            _loc12_.seriesSize = param5.uniqueSeriesSize;
        } else {
            _loc10_.visible = false;
        }
    }

    public show(): void {
        this._hideDelayTimer.reset();
        this._SafeStr_2805.reset();
        if (this._parent == null) {
            return;
        }
        this._SafeStr_2197.visible = true;
        this._parent.addChild(this._SafeStr_2197);
        this.refreshArrow(this._SafeStr_5664);
        switch (this._SafeStr_5664 - 1) {
            case 0:
                this._SafeStr_2197.x = -1 * this._SafeStr_2197.width - -5;
                break;
            case 1:
                this._SafeStr_2197.x = this._parent.width + -5;
        }
        this._SafeStr_2197.y = (this._parent.height - this._SafeStr_2197.height) / 2 | 0;
    }

    public hide(): void {
        this._SafeStr_2197.visible = false;
        this._hideDelayTimer.reset();
        this._SafeStr_2805.reset();
        if (this._parent != null) {
            this._parent.removeChild(this._SafeStr_2197);
        }
    }

    public showDelayed(): void {
        this._hideDelayTimer.reset();
        this._SafeStr_2805.reset();
        this._SafeStr_2805.start();
    }

    public hideDelayed(): void {
        this._hideDelayTimer.reset();
        this._SafeStr_2805.reset();
        this._hideDelayTimer.start();
    }

    private loadExtraData(param1: string): void {
        let _loc3_: string = this._inventory.getProperty("extra_data_service_url") + param1;
        let _loc2_: URLLoader = new URLLoader(new URLRequest(_loc3_));
        _loc2_.addEventListener("complete", this.onExtraDataLoaded);
    }

    private loadImage(param1: string): void {
        let _loc2_: BitmapFileLoader = null;
        if (!StringUtil.isBlank(param1)) {
            _loc2_ = new BitmapFileLoader("image/png", new URLRequest(param1));
            _loc2_.addEventListener("AssetLoaderEventComplete", this.onExtImageLoaded);
        }
    }

    private refreshArrow(param1: number = 2): void {
        if (this._SafeStr_2197 == null || Boolean(this._SafeStr_2197.disposed)) {
            return;
        }
        let _loc2_: IBitmapWrapperWindow = castGuarded(this._SafeStr_2197.findChildByName("arrow_pointer"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        if (!_loc2_) {
            return;
        }
        switch (param1 - 1) {
            case 0:
                _loc2_.bitmap = this._SafeStr_3704.clone();
                _loc2_.width = this._SafeStr_3704.width;
                _loc2_.height = this._SafeStr_3704.height;
                _loc2_.y = (this._SafeStr_2197.height - this._SafeStr_3704.height) / 2 | 0;
                _loc2_.x = this._SafeStr_2197.width - 1;
                break;
            case 1:
                _loc2_.bitmap = this._SafeStr_3328.clone();
                _loc2_.width = this._SafeStr_3328.width;
                _loc2_.height = this._SafeStr_3328.height;
                _loc2_.y = (this._SafeStr_2197.height - this._SafeStr_3328.height) / 2 | 0;
                _loc2_.x = -1 * this._SafeStr_3328.width + 1;
        }
        _loc2_.invalidate();
    }

    private onExtraDataLoaded = (param1: Event): void => {
        let _loc2_: any = null;
        let _loc3_: string = stringOrNull(castTo(param1.target, URLLoader).data);
        if (this._SafeStr_4546 && !StringUtil.isBlank(_loc3_)) {
            try {
                _loc2_ = new JSONDecoder(_loc3_, false).getValue();
                this.loadImage(stringOrNull(_loc2_.url));
            } catch (error) {
            }
        }
    };

    private onExtImageLoaded = (param1: AssetLoaderEvent): void => {
        if (!this._SafeStr_2197 || !this._SafeStr_4546) {
            return;
        }
        let _loc4_: IBitmapWrapperWindow = asGuarded(this._SafeStr_2197.findChildByName("item_image"), isIBitmapWrapperWindow);
        if (!_loc4_ || this._assets == null) {
            return;
        }
        let _loc6_: DisplayObject = asInstanceOf(castTo(param1.target, BitmapFileLoader).content, DisplayObject);
        let _loc2_: BitmapData = new BitmapData(Math.min(180, _loc6_.width) | 0, Math.min(200, _loc6_.height) | 0, true, 16777215);
        let _loc3_: number = 180 / _loc6_.width;
        let _loc5_: Matrix = new Matrix();
        _loc5_.scale(_loc3_, _loc3_);
        _loc2_.draw(_loc6_, _loc5_);
        _loc4_.bitmap = _loc2_;
        _loc4_.width = _loc4_.bitmap.width;
        _loc4_.height = _loc4_.bitmap.height;
        _loc4_.x = (this._SafeStr_2197.width - _loc4_.width) / 2 | 0;
        this._SafeStr_2197.height = _loc4_.bottom + 10;
    };

    private onDisplayTimer = (param1: TimerEvent): void => {
        this.show();
    };

    private onHideTimer = (param1: TimerEvent): void => {
        this.hide();
    };
}
