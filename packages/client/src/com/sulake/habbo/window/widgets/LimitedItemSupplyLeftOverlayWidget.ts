import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { IIterator } from '@/com/sulake/core/window/utils/IIterator';
import type { HabboWindowManagerComponent } from '@/com/sulake/habbo/window/HabboWindowManagerComponent';
import { XML } from '@habbo-pixi/runtime/xml/XML';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { EmptyIterator } from '@/com/sulake/core/window/iterators/EmptyIterator';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IIterable } from '@/com/sulake/core/window/utils/IIterable';
import { ILimitedItemSupplyLeftOverlayWidget } from '@/com/sulake/habbo/window/widgets/ILimitedItemSupplyLeftOverlayWidget';

export class LimitedItemSupplyLeftOverlayWidget implements ILimitedItemSupplyLeftOverlayWidget {
    static { registerClassName(this, 'com.sulake.habbo.window.widgets::LimitedItemSupplyLeftOverlayWidget'); }

    public static readonly TYPE: string = "limited_item_overlay_supply";

    constructor(param1: IWidgetWindow, param2: HabboWindowManagerComponent) {
        this._SafeStr_2293 = param1;
        this._windowManager = param2;
        this._root = castGuarded(this._windowManager.buildFromXML(XML.from(this._windowManager.assets.getAssetByName("unique_item_overlay_supply_xml").content)), isIWindowContainer, "com.sulake.core.window.IWindowContainer");
        this._SafeStr_2293.rootWindow = this._root;
    }

    declare private _SafeStr_2293: IWidgetWindow;

    declare private _windowManager: HabboWindowManagerComponent;

    declare private _root: IWindowContainer;

    declare private _supplyLeft: number;
    static { (this.prototype as any)._supplyLeft = 0; }

    declare private _seriesSize: number;
    static { (this.prototype as any)._seriesSize = 0; }

    public get supplyLeft(): number {
        return this._supplyLeft;
    }

    public set supplyLeft(param1: number) {
        this._supplyLeft = param1;
        let _loc3_: ITextWindow = asGuarded(this._root.findChildByName("items_left_count"), isITextWindow);
        _loc3_.text = param1.toString();
        let _loc2_: boolean = false;
        this._root.findChildByName("unique_item_sold_out_bitmap").visible = _loc2_;
    }

    public get serialNumber(): number {
        return 0;
    }

    public set serialNumber(param1: number) {
    }

    public get seriesSize(): number {
        return this._seriesSize;
    }

    public set seriesSize(param1: number) {
        this._seriesSize = param1;
        let _loc2_: ITextWindow = asGuarded(this._root.findChildByName("items_total_count"), isITextWindow);
        _loc2_.text = param1.toString();
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

    get [ILimitedItemSupplyLeftOverlayWidget](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }

    get [IIterable](): true {
        return true;
    }
}
