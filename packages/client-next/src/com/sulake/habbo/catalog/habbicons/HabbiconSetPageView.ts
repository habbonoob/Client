import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import type { HabbiconEntryModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconEntryModel';
import type { HabbiconSetModel } from '@/com/sulake/habbo/catalog/habbicons/HabbiconSetModel';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIItemGridWindow } from '@/com/sulake/core/window/components/IItemGridWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconProgressBarView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconProgressBarView';
import { HabbiconRewardPanelView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconRewardPanelView';
import { HabbiconTileView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconTileView';

export class HabbiconSetPageView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconSetPageView'); }

    private static readonly VISIBLE_SLOT_COUNT: number = 20;

    declare private _controller: HabbiconController;

    declare private _window: IWindowContainer;

    declare private _SafeStr_14082: IWindowContainer;

    declare private _emptyTileTemplate: IWindowContainer;

    declare private _SafeStr_14083: (...args: any[]) => any;

    declare private _SafeStr_14120: HabbiconSetModel;

    declare private _progressView: HabbiconProgressBarView;

    declare private _SafeStr_14126: HabbiconRewardPanelView;

    declare private _tiles: HabbiconTileView[];

    declare private _emptySlots: IWindowContainer[];

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabbiconController, param2: IWindowContainer, param3: IWindowContainer, param4: IWindowContainer, param5: (...args: any[]) => any) {
        this._controller = param1;
        this._window = param2;
        this._SafeStr_14082 = param3;
        this._emptyTileTemplate = param4;
        this._SafeStr_14083 = param5;
        this._progressView = new HabbiconProgressBarView(this.setProgressBar);
        this._SafeStr_14126 = new HabbiconRewardPanelView(this._controller, this._window, this._SafeStr_14083);
        this._tiles = new Array<HabbiconTileView>(0).fill(null);
        this._emptySlots = new Array<IWindowContainer>(0).fill(null);
    }

    public refresh(param1: HabbiconSetModel, param2: boolean): void {
        let _loc4_: HabbiconTileView = null;
        this._SafeStr_14120 = param1;
        this.recycleTiles();
        if (this._SafeStr_14120 == null) {
            this._window.visible = false;
            this.setTitle.text = "";
            this.setDescription.text = "";
            this._progressView.setRatio(0, false);
            this.setProgressText.text = "";
            this._SafeStr_14126.refresh(null, false);
            return;
        }
        this._window.visible = true;
        this.setTitle.text = this._SafeStr_14120.title;
        this.setDescription.text = this._SafeStr_14120.description;
        this._progressView.setRatio(this._SafeStr_14120.progressRatio, param2);
        this.setProgressText.text = this._controller.localizationManager.getLocalizationWithParams("habbicon_book.set_progress.count", "", "collected", this._SafeStr_14120.completed, "total", this._SafeStr_14120.total);
        for (const _loc3_ of this._SafeStr_14120.habbicons ?? []) {
            _loc4_ = HabbiconTileView.claim(this._SafeStr_14082);
            _loc4_.initialize(this._controller, _loc3_, this._SafeStr_14083);
            this.setGrid.addGridItem(_loc4_.window);
            this._tiles.push(_loc4_);
        }
        this.addEmptySlots(this._tiles.length | 0);
        this._SafeStr_14126.refresh(this._SafeStr_14120, param2);
    }

    public refreshEntry(param1: HabbiconEntryModel): void {
        if (param1 == null) {
            return;
        }
        for (const _loc2_ of this._tiles ?? []) {
            if (_loc2_.item != null && _loc2_.item.habbiconId == param1.habbiconId) {
                _loc2_.refresh(param1);
                return;
            }
        }
    }

    public refreshProgress(param1: HabbiconSetModel, param2: boolean): void {
        this._SafeStr_14120 = param1;
        if (this._SafeStr_14120 == null) {
            this._progressView.setRatio(0, false);
            this.setProgressText.text = "";
            return;
        }
        this._progressView.setRatio(this._SafeStr_14120.progressRatio, param2);
        this.setProgressText.text = this._controller.localizationManager.getLocalizationWithParams("habbicon_book.set_progress.count", "", "collected", this._SafeStr_14120.completed, "total", this._SafeStr_14120.total);
    }

    public refreshReward(param1: HabbiconSetModel, param2: boolean): void {
        this._SafeStr_14126.refresh(param1, param2);
    }

    public update(param1: number): void {
        this._progressView.update(param1);
        this._SafeStr_14126.update(param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this.recycleTiles();
        if (this._progressView != null) {
            this._progressView.dispose();
            this._progressView = null;
        }
        if (this._SafeStr_14126 != null) {
            this._SafeStr_14126.dispose();
            this._SafeStr_14126 = null;
        }
        this._controller = null;
        this._window = null;
        this._SafeStr_14082 = null;
        this._emptyTileTemplate = null;
        this._SafeStr_14083 = null;
        this._SafeStr_14120 = null;
        this._tiles = null;
        this._emptySlots = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private recycleTiles(): void {
        this.setGrid.removeGridItems();
        for (const _loc2_ of this._tiles ?? []) {
            HabbiconTileView.release(_loc2_);
        }
        this._tiles.length = 0;
        for (const _loc1_ of this._emptySlots ?? []) {
            _loc1_.dispose();
        }
        this._emptySlots.length = 0;
    }

    private addEmptySlots(param1: number): void {
        let _loc4_: number = 0;
        let _loc3_: IWindowContainer = null;
        let _loc2_: number = Math.max(0, 20 - param1) | 0;
        _loc4_ = 0;
        while (_loc4_ < _loc2_) {
            _loc3_ = asGuarded(this._emptyTileTemplate.clone(), isIWindowContainer);
            _loc3_.visible = true;
            this.setGrid.addGridItem(_loc3_);
            this._emptySlots.push(_loc3_);
            _loc4_++;
        }
    }

    private get setTitle(): ITextWindow {
        return asGuarded(this._window.findChildByName("set_title"), isITextWindow);
    }

    private get setDescription(): ITextWindow {
        return asGuarded(this._window.findChildByName("set_description"), isITextWindow);
    }

    private get setProgressBar(): IWindowContainer {
        return asGuarded(this._window.findChildByName("set_progress_bar"), isIWindowContainer);
    }

    private get setProgressText(): ITextWindow {
        return asGuarded(this._window.findChildByName("set_progress_text"), isITextWindow);
    }

    private get setGrid(): IItemGridWindow {
        return asGuarded(this._window.findChildByName("set_grid"), isIItemGridWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
