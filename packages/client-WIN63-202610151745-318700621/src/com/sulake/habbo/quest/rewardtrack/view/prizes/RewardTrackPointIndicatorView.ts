import { asGuarded, castGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrack } from '@/com/sulake/habbo/quest/rewardtrack/data/RewardTrack';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIStaticBitmapWrapperWindow } from '@/com/sulake/core/window/components/IStaticBitmapWrapperWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class RewardTrackPointIndicatorView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.prizes::RewardTrackPointIndicatorView'); }

    declare private _SafeStr_5628: RewardTrack;

    declare private _SafeStr_14085: number;
    static { (this.prototype as any)._SafeStr_14085 = 0; }

    declare private _window: IWindowContainer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
    }

    public initialize(param1: RewardTrack, param2: number): void {
        this._SafeStr_5628 = param1;
        this._SafeStr_14085 = param2;
        this.pointsText.text = String(param2);
        this.refreshAvailability();
    }

    public refreshAvailability(): void {
        if (this._SafeStr_5628 == null) {
            return;
        }
        this.availableIcon.assetUri = this._SafeStr_5628.points >= this._SafeStr_14085 ? "reward_track_available_icon" : "reward_track_not_available_icon";
    }

    public clear(): void {
        this._SafeStr_5628 = null;
        this._SafeStr_14085 = 0;
        this._window.visible = false;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        if (this._window.parent != null) {
            castGuarded(this._window.parent, isIWindowContainer, "com.sulake.core.window.IWindowContainer").removeChild(this._window);
        }
        this._window.dispose();
        this._window = null;
        this._SafeStr_5628 = null;
        this._SafeStr_14085 = 0;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private get availableIcon(): IStaticBitmapWrapperWindow {
        return asGuarded(this._window.findChildByName("available_icon"), isIStaticBitmapWrapperWindow);
    }

    private get pointsText(): ITextWindow {
        return asGuarded(this._window.findChildByName("points_txt"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
