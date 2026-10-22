import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class SpacerPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::SpacerPreset'); }

    declare private _container: IWindow;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number) {
        super(param1, param2, param3);
        this._container = param2.createLayout("container_view");
        this._container.height = param4;
    }

    public set backgroundEnabled(param1: boolean) {
        this._container.background = param1;
    }

    public set backgroundColor(param1: number) {
        this._container.color = (0xFF000000 | param1) >>> 0;
    }

    public override get window(): IWindow {
        return this._container;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
    }
}
