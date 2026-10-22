import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabbiconAlbumStats } from '@/com/sulake/habbo/catalog/habbicons/HabbiconAlbumStats';
import type { HabbiconController } from '@/com/sulake/habbo/catalog/habbicons/HabbiconController';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { HabbiconProgressBarView } from '@/com/sulake/habbo/catalog/habbicons/HabbiconProgressBarView';

export class HabbiconAlbumHeaderView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.catalog.habbicons::HabbiconAlbumHeaderView'); }

    declare private _controller: HabbiconController;

    declare private _window: IWindowContainer;

    declare private _progressView: HabbiconProgressBarView;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: HabbiconController, param2: IWindowContainer) {
        this._controller = param1;
        this._window = param2;
        this._progressView = new HabbiconProgressBarView(this.albumProgressBar);
    }

    public refresh(param1: HabbiconAlbumStats, param2: boolean): void {
        this._progressView.setRatio(param1.progressRatio, param2);
        this.albumProgressText.text = this._controller.localizationManager.getLocalizationWithParams("habbicon_book.album_progress.count", "", "collected", param1.collected, "total", param1.total);
        this.ownedHabbiconsValue.text = String(param1.ownedHabbicons);
        this.setsCompletedValue.text = String(param1.completedSets);
    }

    public update(param1: number): void {
        this._progressView.update(param1);
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._progressView != null) {
            this._progressView.dispose();
            this._progressView = null;
        }
        this._controller = null;
        this._window = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get albumProgressBar(): IWindowContainer {
        return asGuarded(this._window.findChildByName("album_progress_bar"), isIWindowContainer);
    }

    private get albumProgressText(): ITextWindow {
        return asGuarded(this._window.findChildByName("album_progress_text"), isITextWindow);
    }

    private get ownedHabbiconsValue(): ITextWindow {
        return asGuarded(this._window.findChildByName("owned_habbicons_value"), isITextWindow);
    }

    private get setsCompletedValue(): ITextWindow {
        return asGuarded(this._window.findChildByName("sets_completed_value"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
