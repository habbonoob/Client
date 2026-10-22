import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class IconButtonPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::IconButtonPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._container = param3.createIconButton(param4);
        this._onClick = param5;
        this._container.addEventListener("WME_CLICK", this.iconClicked);
    }

    declare private _container: IWindow;

    declare private _onClick: (...args: any[]) => any;

    public override get window(): IWindow {
        return this._container;
    }

    public override get staticWidth(): number {
        return this._container.width;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._container.width = param1;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._container.dispose();
        this._container = null;
        this._onClick = null;
    }

    private iconClicked = (param1: WindowMouseEvent): void => {
        if (this._onClick != null) {
            this._onClick();
        }
    };
}
