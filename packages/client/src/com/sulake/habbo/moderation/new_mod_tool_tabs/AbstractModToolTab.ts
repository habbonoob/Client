import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { NewModerationTool } from '@/com/sulake/habbo/moderation/NewModerationTool';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class AbstractModToolTab implements IDisposable {
    static { registerClassName(this, 'com.sulake.habbo.moderation.new_mod_tool_tabs::AbstractModToolTab'); }

    constructor(param1: NewModerationTool, param2: IWindowContainer) {
        this._tool = param1;
        this._window = param2;
        param2.visible = false;
    }

    declare private _tool: NewModerationTool;

    private _visible: boolean = false;
    private _disposed: boolean = false;

    declare private _window: IWindowContainer;

    public get window(): IWindowContainer {
        return this._window;
    }

    public get tool(): NewModerationTool {
        return this._tool;
    }

    public get visible(): boolean {
        return this._visible;
    }

    public set visible(param1: boolean) {
        if (this._visible != param1) {
            this._visible = param1;
            this._window.visible = param1;
        }
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public onOpen(): void {
    }

    public dispose(): void {
        if (this._disposed) {
            return;
        }
        this._window = null;
        this._tool = null;
        this._disposed = true;
    }

    get [IDisposable](): true {
        return true;
    }
}
