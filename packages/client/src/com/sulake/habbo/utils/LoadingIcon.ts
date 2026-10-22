import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IIconWindow } from '@/com/sulake/core/window/components/IIconWindow';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { Timer } from '@habbo-pixi/runtime/utils/Timer';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class LoadingIcon implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.utils::LoadingIcon'); }

    private static readonly FRAMES: any[] = [23, 24, 25, 26];

    constructor() {
        this._SafeStr_2458.addEventListener("timer", this.onTimer);
    }

    private _SafeStr_2458: Timer = new Timer(160);

    declare private _icon: IIconWindow;

    declare private _SafeStr_3714: number;
    static { (this.prototype as any)._SafeStr_3714 = 0; }

    public get disposed(): boolean {
        return this._SafeStr_2458 == null;
    }

    public dispose(): void {
        if (this._SafeStr_2458) {
            this._SafeStr_2458.removeEventListener("timer", this.onTimer);
            this._SafeStr_2458.stop();
            this._SafeStr_2458 = null;
        }
        this._icon = null;
    }

    public setVisible(param1: IIconWindow, param2: boolean): void {
        this._icon = param1;
        if (this._icon == null) {
            return;
        }
        this._icon.visible = param2;
        if (param2) {
            this._icon.style = LoadingIcon.FRAMES[this._SafeStr_3714] >>> 0;
            this._SafeStr_2458.start();
        } else {
            this._SafeStr_2458.stop();
        }
    }

    private onTimer = (param1: Event): void => {
        if (this._icon == null) {
            return;
        }
        this._SafeStr_3714 = this._SafeStr_3714 + 1;
        if (this._SafeStr_3714 >= LoadingIcon.FRAMES.length) {
            this._SafeStr_3714 = 0;
        }
        this._icon.style = LoadingIcon.FRAMES[this._SafeStr_3714] >>> 0;
    };

    get [IDisposable](): true {
        return true;
    }
}
