import { asGuarded } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { _SafeCls_1969 } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/_SafeCls_1969';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { isIWindowContainer } from '@/com/sulake/core/window/IWindowContainer';
import { NewVariablePicker } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/newvariablepicker/NewVariablePicker';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariablePickerPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets::VariablePickerPreset'); }

    declare private _picker: NewVariablePicker;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any = null, param5: (...args: any[]) => any = null) {
        super(param1, param2, param3);
        this._picker = new NewVariablePicker(param1, asGuarded(param2.createLayout("search_tree_dropdown"), isIWindowContainer), param4, param5, param3);
    }

    public init(param1: _SafeCls_1969, param2: string, param3: number): void {
        this._picker.init(param1, param2, param3);
    }

    public set variableTarget(param1: number) {
        this._picker.variableTarget = param1;
    }

    public get selected(): WiredVariable {
        return this._picker.selected;
    }

    public get finalizeSelection(): string {
        let _loc1_: WiredVariable = this.selected;
        this._picker.finalize();
        return _loc1_?.variableId;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._picker.width = param1;
    }

    public override get window(): IWindow {
        return this._picker.window;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._picker.dispose();
        this._picker = null;
    }
}
