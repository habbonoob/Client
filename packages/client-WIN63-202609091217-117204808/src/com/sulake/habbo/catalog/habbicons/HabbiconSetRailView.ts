import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconSetRailRowView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetRailRowView';

export class HabbiconSetRailView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconSetRailView'); }

    declare private _window: IWindowContainer;

    declare private _SafeStr_14129: IWindowContainer;

    declare private _SafeStr_2959: HabbiconSetRailRowView[];

    declare private _SafeStr_14130: HabbiconSetModel;

    declare private _SafeStr_14127: (...args: any[]) => any;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: (...args: any[]) => any) {
        this._window = param1;
        this._SafeStr_14127 = param2;
        this._SafeStr_2959 = new Array<HabbiconSetRailRowView>(0).fill(null);
        this._SafeStr_14129 = asGuarded(this.setRailList.removeListItem(this.setRailList.getListItemByName("set_row_template")), isIWindowContainer);
    }

    public setSets(param1: HabbiconSetModel[]): void {
        let _loc3_: HabbiconSetRailRowView = null;
        this.clearRows();
        for (const _loc2_ of param1 ?? []) {
            _loc3_ = new HabbiconSetRailRowView(this._SafeStr_14129, this._SafeStr_14127);
            _loc3_.initialize(_loc2_);
            _loc3_.setActive(_loc3_._SafeStr_14128 == this._SafeStr_14130);
            this.setRailList.addListItem(_loc3_.window);
            this._SafeStr_2959.push(_loc3_);
        }
    }

    public setActiveSet(param1: HabbiconSetModel): void {
        this._SafeStr_14130 = param1;
        for (const _loc2_ of this._SafeStr_2959 ?? []) {
            _loc2_.setActive(_loc2_._SafeStr_14128 == param1);
        }
    }

    public refreshSet(param1: HabbiconSetModel, param2: boolean): void {
        for (const _loc3_ of this._SafeStr_2959 ?? []) {
            if (_loc3_._SafeStr_14128 == param1 || _loc3_._SafeStr_14128.collectionId == param1.collectionId) {
                _loc3_.refreshProgress(param2);
                return;
            }
        }
    }

    public update(param1: number): void {
        for (const _loc2_ of this._SafeStr_2959 ?? []) {
            _loc2_.update(param1);
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.clearRows();
        this._SafeStr_14129.dispose();
        this._SafeStr_14129 = null;
        this._window = null;
        this._SafeStr_14130 = null;
        this._SafeStr_14127 = null;
        this._SafeStr_2959 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private clearRows(): void {
        for (const _loc1_ of this._SafeStr_2959 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_2959.length = 0;
    }

    private get setRailList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("set_rail_list"), isIItemListWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
