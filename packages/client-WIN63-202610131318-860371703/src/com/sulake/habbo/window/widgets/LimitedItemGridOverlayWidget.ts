import { castGuarded, castTo } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { BitmapData } from '@habbo-pixi/runtime/display/BitmapData';
import { Point } from '@habbo-pixi/runtime/geom/Point';
import { Rectangle } from '@habbo-pixi/runtime/geom/Rectangle';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { LimitedItemOverlayNumberBitmapGenerator } from '@/com/sulake/habbo/window/utils/LimitedItemOverlayNumberBitmapGenerator';
import { ILimitedItemGridOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemGridOverlayWidget';

export class LimitedItemGridOverlayWidget implements ILimitedItemGridOverlayWidget, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::LimitedItemGridOverlayWidget'); }

    public static readonly TYPE: string = "limited_item_overlay_grid";
    private readonly SHINE_INTERVAL_MS: number = 10000;
    private readonly SHINE_LENGTH_MS: number = 250;
    private _disposed: boolean = false;

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _SafeStr_4679: BitmapData;

    declare private _SafeStr_3246: IBitmapWrapperWindow;

    declare private _serialNumber: number;
    static { (this.prototype as any)._serialNumber = 0; }

    private _timerValue: number = getTimer() >>> 0;
    private _SafeStr_4364: number = this._timerValue;
    private _animated: boolean = false;

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._SafeStr_4679 = castTo(this._windowManager.assets.getAssetByName("unique_item_label_plaque_metal").content, BitmapData).clone();
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("unique_item_overlay_griditem_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_3246 = castGuarded(this._root.findChildByName("unique_item_overlay_plaque_background_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        this._SafeStr_3246.bitmap = this._SafeStr_4679;
        this._SafeStr_2293.rootWindow = this._root;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._animated) {
                this._windowManager.removeUpdateReceiver(this);
            }
            if (this._SafeStr_2293 != null) {
                this._SafeStr_2293.rootWindow = null;
                this._SafeStr_2293 = null;
            }
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
            this._windowManager = null;
            this._disposed = true;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set serialNumber(param1: number) {
        this._serialNumber = param1;
        let _loc2_: IBitmapWrapperWindow = castGuarded(this._root.findChildByName("unique_item_overlay_plaque_number_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = LimitedItemOverlayNumberBitmapGenerator.createBitmap(this._windowManager.assets, this.serialNumber, _loc2_.width, _loc2_.height);
    }

    public set seriesSize(param1: number) {
    }

    public get serialNumber(): number {
        return this._serialNumber;
    }

    public get seriesSize(): number {
        return 0;
    }

    public get properties(): any[] {
        return [];
    }

    public set properties(param1: any[]) {
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public get animated(): boolean {
        return this._animated;
    }

    public set animated(param1: boolean) {
        this._animated = param1;
        if (this._animated) {
            this._windowManager.registerUpdateReceiver(this, 5);
        } else {
            this._windowManager.removeUpdateReceiver(this);
        }
    }

    public update(param1: number): void {
        let _loc2_: BitmapData = null;
        let _loc3_: number = NaN;
        let _loc4_: number = 0;
        if (!this.disposed) {
            this._timerValue += param1;
            if (this._timerValue - this._SafeStr_4364 > 10000) {
                _loc2_ = new BitmapData(this._SafeStr_3246.width, this._SafeStr_3246.height, false);
                _loc3_ = (this._timerValue - this._SafeStr_4364 - 10000) / 250;
                if (_loc3_ < 1) {
                    _loc4_ = (this._SafeStr_4679.height - this._SafeStr_3246.height) * _loc3_ | 0;
                    _loc2_.copyPixels(this._SafeStr_4679, new Rectangle(0, _loc4_, this._SafeStr_3246.width, this._SafeStr_3246.height), new Point(0, 0));
                    this._SafeStr_3246.bitmap = _loc2_;
                } else {
                    this._SafeStr_3246.bitmap = this._SafeStr_4679;
                    this._SafeStr_4364 = this._timerValue;
                }
            }
        }
    }

    get [ILimitedItemGridOverlayWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
