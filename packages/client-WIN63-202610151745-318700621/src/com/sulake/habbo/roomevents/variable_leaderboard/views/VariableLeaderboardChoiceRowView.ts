import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isIIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import { isIRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class VariableLeaderboardChoiceRowView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard.views::VariableLeaderboardChoiceRowView'); }

    private static readonly NORMAL_BACKGROUND_COLOR: number = 4293848814;
    private static readonly _SafeStr_14321: number = 4292335575;

    declare private _window: IRegionWindow;

    declare private _SafeStr_7039: string;

    declare private _SafeStr_14195: (...args: any[]) => any;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IRegionWindow, param2: string, param3: string, param4: (...args: any[]) => any) {
        this._window = asGuarded(param1.clone(), isIRegionWindow);
        this._SafeStr_7039 = param2;
        this._SafeStr_14195 = param4;
        this.displayName = param3;
        this._window.addEventListener("WME_CLICK", this.onClick);
        this._window.addEventListener("WME_OVER", this.onOver);
        this._window.addEventListener("WME_OUT", this.onOut);
        this._window.color = 4293848814;
    }

    public set selected(param1: boolean) {
        this.selectionIcon.visible = param1;
        this.choiceText.visible = !param1;
        this.selectedChoiceText.visible = param1;
    }

    public set displayName(param1: string) {
        this.choiceText.text = param1;
        this.selectedChoiceText.text = param1;
    }

    private onClick = (param1: WindowMouseEvent): void => {
        this._SafeStr_14195(this._SafeStr_7039);
    };

    private onOver = (param1: WindowMouseEvent): void => {
        this._window.color = 4292335575;
    };

    private onOut = (param1: WindowMouseEvent): void => {
        this._window.color = 4293848814;
    };

    public get window(): IRegionWindow {
        return this._window;
    }

    public get variableId(): string {
        return this._SafeStr_7039;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._window != null && !this._window.disposed) {
            this._window.removeEventListener("WME_CLICK", this.onClick);
            this._window.removeEventListener("WME_OVER", this.onOver);
            this._window.removeEventListener("WME_OUT", this.onOut);
            this._window.dispose();
        }
        this._window = null;
        this._SafeStr_7039 = null;
        this._SafeStr_14195 = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get selectionIcon(): IIconWindow {
        return asGuarded(this._window.findChildByName("choice_selection"), isIIconWindow);
    }

    private get choiceText(): ITextWindow {
        return asGuarded(this._window.findChildByName("choice_text"), isITextWindow);
    }

    private get selectedChoiceText(): ITextWindow {
        return asGuarded(this._window.findChildByName("selected_choice_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
