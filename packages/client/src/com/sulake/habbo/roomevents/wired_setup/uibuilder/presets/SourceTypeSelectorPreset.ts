import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IItemListWindow } from '@/com/sulake/core/window/components/IItemListWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { ISourceTypePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/ISourceTypePicker';
import type { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { NewSourceTypePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/newpicker/NewSourceTypePicker';
import { SourceTypePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePicker';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class SourceTypeSelectorPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::SourceTypeSelectorPreset'); }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: SourceTypeSelectorParam) {
        super(param1, param2, param3);
        this._window = param3.createSourceTypeSelector();
        if (this._window.tags.indexOf("NEW") != -1) {
            this._picker = new NewSourceTypePicker(param1, this._window, param4.listener);
        } else {
            this._picker = new SourceTypePicker(param1, this._window, param4.listener);
        }
        this._picker.initialize(param4.ids, param4.currentSelection);
    }

    declare private _picker: ISourceTypePicker;

    declare private _window: IItemListWindow;

    public override get window(): IWindow {
        return this._window;
    }

    public override get staticWidth(): number {
        return this._window.width;
    }

    public override hasStaticWidth(): boolean {
        return true;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._window.dispose();
        this._window = null;
        this._picker.dispose();
        this._picker = null;
    }

    public select(param1: number): void {
        this._picker.select(param1);
    }
}
