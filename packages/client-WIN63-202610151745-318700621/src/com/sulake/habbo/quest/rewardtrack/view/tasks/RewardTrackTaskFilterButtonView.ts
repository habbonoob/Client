import { asGuarded, asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { IRegionWindow } from '@/com/sulake/core/window/components/IRegionWindow';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { RewardTrackTaskListView } from '@/com/sulake/habbo/quest/rewardtrack/view/tasks/RewardTrackTaskListView';
import type { RewardTrackTheme } from '@/com/sulake/habbo/quest/rewardtrack/view/theme/RewardTrackTheme';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ShapeController } from '@/com/sulake/core/window/Classes.group';
import { isIButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';

export class RewardTrackTaskFilterButtonView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.quest.rewardtrack.view.tasks::RewardTrackTaskFilterButtonView'); }

    private static readonly _SafeStr_14972: number = 4294967295;
    private static readonly NOT_SELECTED_TEXT_COLOR: number = 4282664004;

    declare private _window: IRegionWindow;

    declare private _filter: number;
    static { (this.prototype as any)._filter = 0; }

    declare private _owner: RewardTrackTaskListView;

    declare private _theme: RewardTrackTheme;

    declare private _defaultNotSelectedColor: number;
    static { (this.prototype as any)._defaultNotSelectedColor = 0; }

    declare private _defaultNotSelectedBorderColor: number;
    static { (this.prototype as any)._defaultNotSelectedBorderColor = 0; }

    declare private _active: boolean;
    static { (this.prototype as any)._active = false; }

    declare private _hovered: boolean;
    static { (this.prototype as any)._hovered = false; }

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IRegionWindow, param2: number, param3: string, param4: RewardTrackTaskListView, param5: RewardTrackTheme) {
        this._window = param1;
        this._filter = param2;
        this._owner = param4;
        this._theme = param5;
        this._theme.applyTo(this._window);
        this._defaultNotSelectedColor = this.notSelectedShape.color;
        this._defaultNotSelectedBorderColor = this.notSelectedShape.strokeColor;
        this.selectedView.setParamFlag(1, false);
        this.selectedView.interactiveCursorDisabled = true;
        this.buttonText.text = "${" + param3 + "}";
        this._window.addEventListener("WME_CLICK", this.onClick);
        this._window.addEventListener("WME_OVER", this.onMouseOver);
        this._window.addEventListener("WME_OUT", this.onMouseOut);
    }

    public setActive(param1: boolean): void {
        this._active = param1;
        this.refreshState();
    }

    private onClick = (param1: WindowMouseEvent): void => {
        this._owner.setFilter(this._filter);
    };

    private onMouseOver = (param1: WindowMouseEvent): void => {
        this._hovered = true;
        this.refreshState();
    };

    private onMouseOut = (param1: WindowMouseEvent): void => {
        this._hovered = false;
        this.refreshState();
    };

    private refreshState(): void {
        this.selectedView.visible = this._active;
        this.notSelectedShape.visible = !this._active;
        this.notSelectedShape.color = !this._active && this._hovered ? this._theme.lightColor : this._defaultNotSelectedColor;
        this.notSelectedShape.strokeColor = !this._active && this._hovered ? this._theme.darkColor : this._defaultNotSelectedBorderColor;
        this.buttonText.textColor = this._active ? 4294967295 : 4282664004;
        this._window.interactiveCursorDisabled = this._active;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._disposed = true;
        this._window.removeEventListener("WME_CLICK", this.onClick);
        this._window.removeEventListener("WME_OVER", this.onMouseOver);
        this._window.removeEventListener("WME_OUT", this.onMouseOut);
        this._window.dispose();
        this._window = null;
        this._owner = null;
        this._theme = null;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    private get selectedView(): IButtonWindow {
        return asGuarded(this._window.findChildByName("selected_view"), isIButtonWindow);
    }

    private get notSelectedShape(): ShapeController {
        return asInstanceOf(this._window.findChildByName("notselected_shape"), ShapeController);
    }

    private get buttonText(): ITextWindow {
        return asGuarded(this._window.findChildByName("button_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
