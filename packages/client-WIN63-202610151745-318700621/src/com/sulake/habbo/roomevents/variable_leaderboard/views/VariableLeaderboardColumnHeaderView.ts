import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { isITextWindow } from '@/com/sulake/core/window/components/ITextWindow';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';

export class VariableLeaderboardColumnHeaderView implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.variable_leaderboard.views::VariableLeaderboardColumnHeaderView'); }

    private static readonly USERNAME_TEXT_OFFSET: number = 0;

    declare private _window: IWindowContainer;

    declare private _disposed: boolean;
    static { (this.prototype as any)._disposed = false; }

    constructor(param1: IWindowContainer) {
        this._window = asGuarded(param1.clone(), isIWindowContainer);
    }

    public setColumn(param1: number, param2: string, param3: number, param4: number, param5: number): void {
        this._window.x = param4;
        this._window.width = param5;
        let _loc6_: boolean = param1 == 0;
        let _loc7_: ITextWindow = this.headerText;
        _loc7_.x = _loc6_ ? 0 : 0;
        _loc7_.width = param5 - _loc7_.x;
        _loc7_.text = param2;
        _loc7_.autoSize = _loc6_ ? "none" : "center";
        this._window.visible = true;
    }

    public hide(): void {
        this._window.visible = false;
    }

    public get window(): IWindowContainer {
        return this._window;
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        if (this._window != null && !this._window.disposed) {
            this._window.dispose();
        }
        this._window = null;
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    private get headerText(): ITextWindow {
        return asGuarded(this._window.findChildByName("header_text"), isITextWindow);
    }

    get [IDisposable](): true {
        return true;
    }
}
