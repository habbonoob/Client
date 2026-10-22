import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { AnimatedColor } from '@/com/sulake/habbo/window/utils/AnimatedColor';
import { AnimatedScalar } from '@/com/sulake/habbo/window/utils/AnimatedScalar';

export class RewardTrackProgressBarViewBase implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.progress::RewardTrackProgressBarViewBase'); }

    private static readonly ACCELERATION_PER_MS: number = 0.00001;
    private static readonly MAX_SPEED_PER_MS: number = 0.003;
    private static readonly _SafeStr_14707: number = 0.0001;
    private static readonly FILL_COLOR_TRANSITION_MS: number = 300;
    private static readonly INCOMPLETE_COLOR: number = 15443468;
    private static readonly COMPLETE_COLOR: number = 7450404;

    declare protected _container: IWindowContainer;

    declare protected _SafeStr_4425: IWindowContainer;

    declare protected _SafeStr_14931: AnimatedScalar;

    protected _SafeStr_3280: number = 0;

    declare private _SafeStr_14980: IWindow;

    declare private _completionColor: AnimatedColor;

    declare private _maxWidth: number;
    static { (this.prototype as any)._maxWidth = 0; }

    declare private _SafeStr_14981: boolean;
    static { (this.prototype as any)._SafeStr_14981 = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer, param2: boolean = false) {
        this._container = param1;
        this._SafeStr_4425 = asGuarded(param1.findChildByName("progress"), isIWindowContainer);
        this._maxWidth = param1.width;
        this._SafeStr_14981 = param2;
        this._SafeStr_14931 = new AnimatedScalar(0.00001, 0.003, 0.0001);
        if (this._SafeStr_14981) {
            this._SafeStr_14980 = this._SafeStr_4425.findChildByName("loading_bar");
            this._completionColor = new AnimatedColor(300);
            this._completionColor.snapTo(15443468, this._SafeStr_3280);
        }
    }

    public setRatio(param1: number, param2: boolean): void {
        let _loc3_: number = this.clampRatio(param1);
        if (param2) {
            this._SafeStr_14931.setTarget(_loc3_, this._SafeStr_3280);
        } else {
            this._SafeStr_14931.snapTo(_loc3_, this._SafeStr_3280);
        }
        this.syncCompletionColor(param2);
        this.render();
    }

    public update(param1: number): void {
        this._SafeStr_3280 += param1;
        let _loc2_: boolean = this._SafeStr_14931.update(this._SafeStr_3280);
        if (this._SafeStr_14981) {
            this.syncCompletionColor(true);
            _loc2_ = this._completionColor.update(this._SafeStr_3280) || _loc2_;
        }
        if (_loc2_) {
            this.render();
        }
    }

    public get isUpdating(): boolean {
        return this._SafeStr_14931.needsUpdate(this._SafeStr_3280, this._maxWidth) || this._SafeStr_14981 && this._completionColor.needsUpdate(this._SafeStr_3280);
    }

    protected render(): void {
        this._SafeStr_4425.width = Math.max(0, Math.min(this._maxWidth, Math.round(this._maxWidth * this._SafeStr_14931.value))) | 0;
        if (this._SafeStr_14981) {
            this._SafeStr_14980.color = this._completionColor.value;
        }
    }

    protected clampRatio(param1: number): number {
        return Math.max(0, Math.min(1, param1));
    }

    private syncCompletionColor(param1: boolean): void {
        if (!this._SafeStr_14981) {
            return;
        }
        let _loc2_: number = (this._SafeStr_14931.value >= 1 ? 7450404 : 15443468) >>> 0;
        if (param1) {
            this._completionColor.setTarget(_loc2_, this._SafeStr_3280);
        } else {
            this._completionColor.snapTo(_loc2_, this._SafeStr_3280);
        }
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._container = null;
        this._SafeStr_4425 = null;
        this._SafeStr_14931 = null;
        this._SafeStr_14980 = null;
        this._completionColor = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    get [IDisposable](): true {
        return true;
    }
}
