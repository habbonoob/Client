import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';

export class Motion {
    static { registerClassName(this, 'com.sulake.core.window.motion::Motion'); }

    constructor(param1: IWindow) {
        this._target = param1;
    }

    declare protected _target: IWindow;

    declare protected _running: boolean;
    static { (this.prototype as any)._running = false; }

    protected _complete: boolean = true;

    declare protected _tag: string;

    public get running(): boolean {
        return !!(this._running && this._target && !this._target.disposed);
    }

    public get complete(): boolean {
        return this._complete;
    }

    public get target(): IWindow {
        return this._target;
    }

    public set target(param1: IWindow) {
        this._target = param1;
    }

    public get tag(): string {
        return this._tag;
    }

    public set tag(param1: string) {
        this._tag = param1;
    }

    public start(): void {
        this._running = true;
    }

    public update(param1: number): void {
    }

    public stop(): void {
        this._target = null;
        this._running = false;
    }

    public tick(param1: number): void {
    }
}
