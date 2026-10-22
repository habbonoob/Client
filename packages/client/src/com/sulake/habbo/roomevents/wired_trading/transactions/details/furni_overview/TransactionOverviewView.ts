import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { IScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { ChestItemType } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/storage/ChestItemType';
import type { WiredTransactionDetailsController } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/WiredTransactionDetailsController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isIScrollableGridWindow } from '@/com/sulake/core/window/components/IScrollableGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { TransactionItemView } from '@/com/sulake/habbo/roomevents/wired_trading/transactions/details/furni_overview/TransactionItemView';

export class TransactionOverviewView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.transactions.details.furni_overview::TransactionOverviewView'); }

    private static ITEM_POOL_MAX_SIZE: number = 15;

    constructor(param1: WiredTransactionDetailsController, param2: IWindowContainer) {
        this._parentController = param1;
        this._window = param2;
        this._itemTemplate = asGuarded(this.itemGrid.removeGridItemAt(0), isIRegionWindow);
    }

    private _SafeStr_3512: TransactionItemView[] = [];

    declare private _parentController: WiredTransactionDetailsController;

    declare private _window: IWindowContainer;

    declare private _itemTemplate: IRegionWindow;

    declare private _SafeStr_3294: TransactionItemView[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get itemGrid(): IScrollableGridWindow {
        return asGuarded(this._window.findChildByName("item_grid"), isIScrollableGridWindow);
    }

    private get emptyText(): ITextWindow {
        return asGuarded(this._window.findChildByName("empty_text"), isITextWindow);
    }

    public clear(): void {
        this.itemGrid.removeGridItems();
        for (const _loc1_ of this._SafeStr_3294 ?? []) {
            this.recycleView(_loc1_);
        }
        this._SafeStr_3294 = [];
    }

    public itemsInitialize(param1: number, param2: UtilsMap, param3: number, param4: boolean): void {
        let _loc9_: TransactionItemView = null;
        let _loc6_: number = 0;
        let _loc7_: TransactionItemView = null;
        let _loc12_: number = 0;
        let _loc8_: TransactionItemView = null;
        this.clear();
        let _loc10_: TransactionItemView[] = [];
        if (param1 != 0) {
            _loc9_ = this.claimView(param1, 1);
            _loc10_.push(_loc9_);
        }
        let _loc11_: number = 0;
        for (const _loc5_ of param2.getKeys() ?? []) {
            _loc6_ = param2[_loc5_] | 0;
            _loc7_ = this.claimView(param2.getValue(_loc5_) | 0, 0, _loc5_);
            _loc11_ += _loc6_;
            if (_loc7_ != null) {
                _loc10_.push(_loc7_);
            }
        }
        if (param4 && _loc11_ < param3) {
            _loc12_ = param3 - _loc11_;
            _loc8_ = this.claimView(_loc12_, 2);
            _loc10_.push(_loc8_);
        }
        this._SafeStr_3294 = _loc10_;
        this.updateGrid();
    }

    public updateGrid(): void {
        let _loc1_: number = 0;
        this.itemGrid.removeGridItems();
        _loc1_ = 0;
        while (_loc1_ < this._SafeStr_3294.length) {
            this.itemGrid.addGridItem(this._SafeStr_3294[_loc1_].window);
            _loc1_++;
        }
        this.emptyText.visible = this.itemGrid.numGridItems == 0;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._window = null;
        this._itemTemplate.dispose();
        this._itemTemplate = null;
        for (const _loc2_ of this._SafeStr_3294 ?? []) {
            this.recycleView(_loc2_);
        }
        this._SafeStr_3294 = null;
        for (const _loc1_ of this._SafeStr_3512 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_3512 = null;
        this._parentController = null;
        this._disposed = true;
    }

    private claimView(param1: number, param2: number, param3: ChestItemType = null): TransactionItemView {
        let _loc4_: TransactionItemView = null;
        if (this._SafeStr_3512.length > 0) {
            _loc4_ = this._SafeStr_3512.pop();
        } else {
            _loc4_ = new TransactionItemView(this._itemTemplate, this._parentController);
        }
        _loc4_.initialize(param1, param2, param3);
        return _loc4_;
    }

    private recycleView(param1: TransactionItemView): void {
        if (this._SafeStr_3512.length < TransactionOverviewView.ITEM_POOL_MAX_SIZE) {
            param1.recycle();
            this._SafeStr_3512.push(param1);
        } else {
            param1.dispose();
        }
    }

    get [IDisposable](): true {
        return true;
    }
}
