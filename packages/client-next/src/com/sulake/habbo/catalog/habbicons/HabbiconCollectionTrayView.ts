import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { HabbiconCollectionTrayGroupView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconCollectionTrayGroupView';

export class HabbiconCollectionTrayView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconCollectionTrayView'); }

    declare private _controller: HabbiconController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14085: IWindowContainer;

    declare private _SafeStr_14082: IWindowContainer;

    declare private _SafeStr_14083: (...args: any[]) => any;

    declare private _SafeStr_14086: HabbiconCollectionTrayGroupView[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabbiconController, param2: IWindowContainer, param3: IWindowContainer, param4: IWindowContainer, param5: (...args: any[]) => any) {
        this._controller = param1;
        this._window = param2;
        this._SafeStr_14085 = param3;
        this._SafeStr_14082 = param4;
        this._SafeStr_14083 = param5;
        this._SafeStr_14086 = new Array<HabbiconCollectionTrayGroupView>(0).fill(null);
        this.removeTemplatesFromLayout();
    }

    public refresh(param1: string, param2: HabbiconSetModel[]): void {
        let _loc4_: HabbiconCollectionTrayGroupView = null;
        this.clearGroupViews();
        let _loc3_: boolean = param1 == "favourited";
        this.trayTitle.text = _loc3_ ? "${habbicon_book.tab.favourited}" : "${habbicon_book.tab.owned}";
        this.traySummary.text = this.resolveSummaryText(_loc3_, param2);
        if (param2 != null) {
            for (const _loc5_ of param2 ?? []) {
                if (_loc5_ != null) {
                    _loc4_ = new HabbiconCollectionTrayGroupView(this._SafeStr_14085, this._SafeStr_14082, this._controller, this._SafeStr_14083);
                    _loc4_.initialize(_loc5_);
                    this.trayGroupList.addListItem(_loc4_.window);
                    this._SafeStr_14086.push(_loc4_);
                }
            }
        }
        this.trayGroupList.scrollV = 0;
        this._window.visible = true;
    }

    public refreshEntry(param1: HabbiconEntryModel): void {
        if (param1 == null) {
            return;
        }
        for (const _loc2_ of this._SafeStr_14086 ?? []) {
            if (this.matchesEntryGroup(_loc2_.group, param1)) {
                _loc2_.refreshEntry(param1);
                return;
            }
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.clearGroupViews();
        this._controller = null;
        this._window = null;
        this._SafeStr_14085 = null;
        this._SafeStr_14082 = null;
        this._SafeStr_14083 = null;
        this._SafeStr_14086 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private clearGroupViews(): void {
        for (const _loc1_ of this._SafeStr_14086 ?? []) {
            _loc1_.dispose();
        }
        this._SafeStr_14086.length = 0;
    }

    private removeTemplatesFromLayout(): void {
        if (this.trayGroupList.getListItemIndex(this._SafeStr_14085) > -1) {
            this.trayGroupList.removeListItem(this._SafeStr_14085);
        }
    }

    private resolveSummaryText(param1: boolean, param2: HabbiconSetModel[]): string {
        if (param2 == null || param2.length == 0) {
            return param1 ? "${habbicon_book.tray.empty.favourited}" : "${habbicon_book.tray.empty.owned}";
        }
        return this._controller.localizationManager.getLocalizationWithParams(param1 ? "habbicon_book.tray.favourited.summary" : "habbicon_book.tray.owned.summary", "", "count", this.countEntries(param2));
    }

    private countEntries(param1: HabbiconSetModel[]): number {
        let _loc2_: number = 0;
        for (const _loc3_ of param1 ?? []) {
            if (_loc3_ != null && _loc3_.habbicons != null) {
                _loc2_ += _loc3_.habbicons.length;
            }
        }
        return _loc2_;
    }

    private matchesEntryGroup(param1: HabbiconSetModel, param2: HabbiconEntryModel): boolean {
        if (param1 == null) {
            return false;
        }
        if (param1.collectionId == param2.collectionId) {
            return true;
        }
        return param2.collectionTitle != null && param1.title == param2.collectionTitle;
    }

    private get trayTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("tray_title"), isITextWindow);
    }

    private get traySummary(): ITextWindow {
        return asGuarded(this._window.findChildByName("tray_summary"), isITextWindow);
    }

    private get trayGroupList(): IItemListWindow {
        return asGuarded(this._window.findChildByName("tray_group_list"), isIItemListWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
