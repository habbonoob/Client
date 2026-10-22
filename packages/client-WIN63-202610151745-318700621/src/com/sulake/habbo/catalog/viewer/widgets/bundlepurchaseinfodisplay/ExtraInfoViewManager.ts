import { castTo } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboCatalog } from '@/com/sulake/habbo/catalog/HabboCatalog';
import type { BundlePurchaseExtraInfoWidget } from '@/com/sulake/habbo/catalog/viewer/widgets/BundlePurchaseExtraInfoWidget';
import type { ExtraInfoItemData } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoItemData';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { IUpdateReceiver } from '@/com/sulake/core/runtime/IUpdateReceiver';
import { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import { ExtraInfoListItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/ExtraInfoListItem';
import { ExtraInfoBonusAchievementItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/listitem/ExtraInfoBonusAchievementItem';
import { ExtraInfoBonusBadgeItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/listitem/ExtraInfoBonusBadgeItem';
import { ExtraInfoBundlesInfoItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/listitem/ExtraInfoBundlesInfoItem';
import { ExtraInfoDiscountValueItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/listitem/ExtraInfoDiscountValueItem';
import { ExtraInfoPromoItem } from '@/com/sulake/habbo/catalog/viewer/widgets/bundlepurchaseinfodisplay/listitem/ExtraInfoPromoItem';

export class ExtraInfoViewManager implements IDisposable, IUpdateReceiver {
    static { registerClassName(this, 'com.sulake.habbo.catalog.viewer.widgets.bundlepurchaseinfodisplay::ExtraInfoViewManager'); }

    private static readonly SLIDE_ANIMATION_LENGTH: number = 0.5;
    private static readonly MAX_ANIM_Y_OFFSET: number = 28;

    declare private _widget: BundlePurchaseExtraInfoWidget;

    declare private _catalog: HabboCatalog;

    declare private _items: UtilsMap;

    private _SafeStr_7192: number = 0;
    private _disposed: boolean = false;
    private _SafeStr_3468: number = 0;

    constructor(param1: BundlePurchaseExtraInfoWidget, param2: HabboCatalog) {
        this._widget = param1;
        this._catalog = param2;
        this._items = new UtilsMap();
        this._catalog.registerUpdateReceiver(this, 10);
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public set disposed(param1: boolean) {
        this._disposed = param1;
    }

    public dispose(): void {
        if (!this.disposed) {
            this._catalog.removeUpdateReceiver(this);
            this._widget = null;
            this._catalog = null;
            for (const _loc1_ of valuesOf(this._items)) {
                _loc1_.dispose();
            }
            this._items = null;
            this.disposed = true;
        }
    }

    public clear(): void {
        while (this._widget.window.numChildren > 0) {
            this._widget.window.removeChildAt(0);
        }
        for (const _loc1_ of valuesOf(this._items)) {
            _loc1_.dispose();
        }
        this._items = new UtilsMap();
        this.render();
    }

    public addItem(param1: ExtraInfoItemData): number {
        let _loc2_: ExtraInfoListItem = null;
        let _loc3_: number = this._SafeStr_7192++;
        switch (param1.type) {
            case 0:
                _loc2_ = new ExtraInfoPromoItem(this._widget, _loc3_, param1, this._catalog);
                break;
            case 1:
                _loc2_ = new ExtraInfoBundlesInfoItem(this._widget, _loc3_, param1, this._catalog);
                break;
            case 2:
                _loc2_ = new ExtraInfoDiscountValueItem(_loc3_, param1, this._catalog);
                break;
            case 3:
                _loc2_ = new ExtraInfoBonusBadgeItem(_loc3_, param1, this._catalog);
                break;
            case 4:
                _loc2_ = new ExtraInfoBonusAchievementItem(_loc3_, param1);
        }
        _loc2_.creationSeconds = this._SafeStr_3468;
        this._items.add(_loc3_, _loc2_);
        let _loc4_: IWindow = _loc2_.getRenderedWindow();
        _loc4_.width = this._widget.window.width;
        this._widget.window.addChild(_loc4_);
        this.sortWindows();
        this.render();
        return _loc2_.id;
    }

    public removeItem(param1: number): void {
        let _loc2_: ExtraInfoListItem = this.getItem(param1);
        if (_loc2_) {
            _loc2_.removalSeconds = this._SafeStr_3468;
            if (_loc2_.alignment == 2) {
                this.reallyRemoveItem(_loc2_.id);
            }
            this.render();
        }
    }

    public getItem(param1: number): ExtraInfoListItem {
        return castTo(this._items.getValue(param1), ExtraInfoListItem);
    }

    private reallyRemoveItem(param1: number): void {
        let _loc2_: ExtraInfoListItem = this.getItem(param1);
        this._widget.window.removeChild(_loc2_.getRenderedWindow());
        this._items.remove(param1);
    }

    private calculateBounce(param1: number, param2: boolean = false): number {
        if (param2) {
            return 1 - Math.abs(Math.cos((this._SafeStr_3468 - param1) / 0.5 * (3.141592653589793 / 2)));
        }
        return 1 - Math.abs(Math.sin((this._SafeStr_3468 - param1) / 0.5 * (3.141592653589793 / 2)));
    }

    private render(): void {
        let _loc5_: IWindow = null;
        let _loc4_: number = NaN;
        let _loc1_: number = 0;
        let _loc3_: number = this._widget.window.height;
        let _loc6_: any[] = this._items.getValues();
        for (const _loc2_ of _loc6_ ?? []) {
            _loc5_ = _loc2_.getRenderedWindow();
            _loc4_ = 0;
            if (this._SafeStr_3468 - 0.5 <= _loc2_.creationSeconds) {
                _loc4_ = this.calculateBounce(Number(_loc2_.creationSeconds));
            }
            if (_loc2_.isItemRemoved) {
                _loc4_ = this.calculateBounce(Number(_loc2_.removalSeconds), true);
                if (this._SafeStr_3468 > _loc2_.removalSeconds + 0.5) {
                    this.reallyRemoveItem(_loc2_.id | 0);
                    break;
                }
            }
            if (_loc2_.alignment == 0) {
                _loc5_.y = _loc1_;
                _loc5_.y -= _loc4_ * Math.min(_loc5_.height, 28);
                _loc1_ += _loc5_.height;
            } else if (_loc2_.alignment == 1) {
                _loc5_.y = _loc3_ - _loc5_.height;
                _loc5_.y += _loc4_ * Math.min(_loc5_.height, 28);
                _loc3_ -= _loc5_.height;
            } else if (_loc2_.alignment == 2) {
                _loc5_.y = 0;
            }
        }
    }

    private sortWindows(): void {
        let _loc2_: number = this._widget.window.numChildren - 1;
        for (const _loc1_ of valuesOf(this._items)) {
            if (_loc1_.alwaysOnTop) {
                this._widget.window.setChildIndex(_loc1_.getRenderedWindow(), _loc2_);
            }
        }
    }

    private get isAnimationInProgress(): boolean {
        return true;
    }

    public update(param1: number): void {
        this._SafeStr_3468 += param1 / 1000;
        if (this.isAnimationInProgress) {
            this.render();
        }
    }

    get [IDisposable](): true {
        return true;
    }

    get [IUpdateReceiver](): true {
        return true;
    }
}
