import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IButtonWindow } from '@/com/sulake/core/window/components/IButtonWindow';
import type { WindowMouseEvent } from '@/com/sulake/core/window/events/WindowMouseEvent';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ButtonPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::ButtonPreset'); }

    public static readonly MODE_SCALE: number = 0;
    public static readonly MODE_STRETCH: number = 1;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: (...args: any[]) => any, param6: number = 0) {
        super(param1, param2, param3);
        this._onClick = param5;
        this._container = param3.createButton();
        this._container.caption = param4;
        this._mode = param6;
        this._container.addEventListener("WME_CLICK", this.buttonClicked);
    }

    declare private _container: IButtonWindow;

    declare private _mode: number;
    static { (this.prototype as any)._mode = 0; }

    declare private _onClick: (...args: any[]) => any;

    public override get window(): IWindow {
        return this._container;
    }

    public override get staticWidth(): number {
        if (this._mode == 1) {
            return this._container.width;
        }
        return -1;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        if (this._mode == 0) {
            this._container.limits.minWidth = param1;
            this._container.limits.maxWidth = param1;
            this._container.width = param1;
        }
    }

    public override hasStaticWidth(): boolean {
        return this._mode == 1;
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

    private buttonClicked = (param1: WindowMouseEvent): void => {
        if (this._onClick != null) {
            this._onClick();
        }
    };
}
