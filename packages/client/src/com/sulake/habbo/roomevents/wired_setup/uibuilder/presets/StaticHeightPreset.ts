import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { IWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class StaticHeightPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::StaticHeightPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: WiredUIPreset, param5: number) {
        super(param1, param2, param3);
        this._window = asGuarded(param2.createLayout("container_view"), isIWindowContainer);
        this._subPreset = param4;
        this._window.addChild(this._subPreset.window);
        this._window.height = param5;
    }

    declare private _subPreset: WiredUIPreset;

    declare private _window: IWindowContainer;

    public override get window(): IWindow {
        return this._window;
    }

    protected override get childPresets(): any[] {
        return [this._subPreset];
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._window.width = param1;
        this._subPreset.resizeToWidth(param1);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
        this._subPreset = null;
    }
}
