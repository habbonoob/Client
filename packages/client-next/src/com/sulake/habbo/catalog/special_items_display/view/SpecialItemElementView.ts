import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import type { SpecialItem } from '@/com/sulake/habbo/catalog/special_items_display/model/SpecialItem';
import type { SpecialItemsView } from '@/com/sulake/habbo/catalog/special_items_display/SpecialItemsView';
import type { IProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWidgetWindow } from '@/com/sulake/core/window/components/IWidgetWindow';
import { isIProductImageWidget } from '@/com/sulake/habbo/window/widgets/IProductImageWidget';

export class SpecialItemElementView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.special_items_display.view::SpecialItemElementView'); }

    private static readonly BLEND_BUFFERING: number = 0.05;

    declare private _view: SpecialItemsView;

    declare private _window: IWidgetWindow;

    declare private _item: SpecialItem;

    declare private _focusValue: number;
    static { (this.prototype as any)._focusValue = NaN; }

    declare private _point: any;

    private _disposed: any = false;

    constructor(param1: SpecialItemsView, param2: SpecialItem) {
        this._item = param2;
        this._view = param1;
        this._window = asGuarded(param1.productDisplayTemplate.clone(), isIWidgetWindow);
        let _loc3_: IProductImageWidget = asGuarded(this._window.widget, isIProductImageWidget);
        _loc3_.productInfo = param2;
        _loc3_.pivot = 7;
    }

    public updateRotation(param1: number): void {
        this.updatePointAndFocus(param1);
        let _loc5_: number = this._point.x * 216 - 80 + 42 | 0;
        let _loc4_: number = this._point.y * 73 - 113 | 0;
        this._window.x = _loc5_;
        this._window.y = _loc4_;
        let _loc2_: IProductImageWidget = asGuarded(this._window.widget, isIProductImageWidget);
        let _loc3_: number = Number(this._point.y);
        if (this._view.totalElements <= 4) {
            _loc3_ = Math.max(0.25, _loc3_);
        } else if (_loc3_ < 0.05) {
            _loc3_ = 0;
        }
        _loc3_ = Math.min(_loc3_, 1);
        let _loc6_: boolean = Math.abs(_loc2_.blend - _loc3_) > 0.05 || _loc3_ == 0 && _loc2_.blend != 0 || _loc3_ == 1 && _loc2_.blend != 1;
        if (_loc6_) {
            _loc2_.blend = _loc3_;
        }
    }

    private updatePointAndFocus(param1: number): void {
        let _loc4_: number = this._item.index - param1;
        let _loc7_: number = _loc4_ + this._view.totalElements;
        let _loc2_: number = _loc4_ - this._view.totalElements;
        if (Math.abs(_loc7_) < Math.abs(_loc4_)) {
            _loc4_ = _loc7_;
        } else if (Math.abs(_loc2_) < Math.abs(_loc4_)) {
            _loc4_ = _loc2_;
        }
        this._focusValue = 0;
        if (Math.abs(_loc4_) < 0.5) {
            this._focusValue = 1 - Math.abs(_loc4_) * 2;
        }
        let _loc8_: number = 180 + 90 * _loc4_;
        _loc8_ = Math.min(Math.max(_loc8_, 0), 360);
        let _loc6_: number = _loc8_ * 3.141592653589793 / 180;
        let _loc3_: number = 0.5 - 0.5 * Math.sin(_loc6_);
        let _loc5_: number = 0.5 - 0.5 * Math.cos(_loc6_);
        this._point = { "x": _loc3_, "y": _loc5_ };
    }

    public get focusValue(): number {
        return this._focusValue;
    }

    public get item(): SpecialItem {
        return this._item;
    }

    public get window(): IWidgetWindow {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._window.dispose();
        this._window = null;
        this._view = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
