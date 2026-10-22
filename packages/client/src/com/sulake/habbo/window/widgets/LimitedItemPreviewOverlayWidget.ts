import { castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIBitmapWrapperWindow } from '@/com/sulake/core/window/components/IBitmapWrapperWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { LimitedItemOverlayNumberBitmapGenerator } from '@/com/sulake/habbo/window/utils/LimitedItemOverlayNumberBitmapGenerator';
import { ILimitedItemPreviewOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemPreviewOverlayWidget';

export class LimitedItemPreviewOverlayWidget implements ILimitedItemPreviewOverlayWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::LimitedItemPreviewOverlayWidget'); }

    public static readonly TYPE: string = "limited_item_overlay_preview";

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("unique_item_overlay_preview_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2293.rootWindow = this._root;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _seriesSize: number;
    static { (this.prototype as any)._seriesSize = 0; }

    declare private _serialNumber: number;
    static { (this.prototype as any)._serialNumber = 0; }

    public get serialNumber(): number {
        return this._serialNumber;
    }

    public set serialNumber(param1: number) {
        this._serialNumber = param1;
        let _loc2_: IBitmapWrapperWindow = castGuarded(this._root.findChildByName("unique_item_serial_number_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = LimitedItemOverlayNumberBitmapGenerator.createBitmap(this._windowManager.assets, this.serialNumber, _loc2_.width, _loc2_.height);
    }

    public get seriesSize(): number {
        return this._seriesSize;
    }

    public set seriesSize(param1: number) {
        this._seriesSize = param1;
        let _loc2_: IBitmapWrapperWindow = castGuarded(this._root.findChildByName("unique_item_edition_size_bitmap"), isIBitmapWrapperWindow, "com.sulake.core.window.components.IBitmapWrapperWindow");
        _loc2_.bitmap = LimitedItemOverlayNumberBitmapGenerator.createBitmap(this._windowManager.assets, param1, _loc2_.width, _loc2_.height);
    }

    public get properties(): any[] {
        return [];
    }

    public set properties(param1: any[]) {
    }

    public get disposed(): boolean {
        return this._root == null;
    }

    public get iterator(): IIterator {
        return EmptyIterator.INSTANCE;
    }

    public dispose(): void {
        if (!this.disposed) {
            if (this._root != null) {
                this._root.dispose();
                this._root = null;
            }
        }
    }

    get [ILimitedItemPreviewOverlayWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
