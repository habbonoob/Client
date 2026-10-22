import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VerticalSplitterPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::VerticalSplitterPreset'); }

    private static readonly SPLITTER_WIDTH: number = 1;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number) {
        super(param1, param2, param3);
        this._height = param4;
        this._window = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._window.width = 1;
        this._window.height = this._height;
        this._window.background = true;
        this._window.color = param3.verticalSplitterColor;
    }

    declare private _height: number;
    static { (this.prototype as any)._height = 0; }

    declare private _window: IWindowContainer;

    public override get window(): IWindow {
        return this._window;
    }

    public override get staticWidth(): number {
        return 1;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._window.width = 1;
        this._window.height = this._height;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
    }
}
