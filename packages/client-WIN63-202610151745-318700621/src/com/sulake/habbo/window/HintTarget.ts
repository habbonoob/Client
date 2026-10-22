import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export class HintTarget {
    static { registerClassName(this, 'com.sulake.habbo.window::HintTarget'); }

    declare private _key: string;

    declare private _window: IWindow;

    declare private _style: number;
    static { (this.prototype as any)._style = 0; }

    constructor(param1: IWindow, param2: string, param3: number) {
        this._window = param1;
        this._key = param2;
        this._style = param3;
    }

    public get window(): IWindow {
        return this._window;
    }

    public set window(param1: IWindow) {
        this._window = param1;
    }

    public get key(): string {
        return this._key;
    }

    public set key(param1: string) {
        this._key = param1;
    }

    public get style(): number {
        return this._style;
    }

    public set style(param1: number) {
        this._style = param1;
    }
}
