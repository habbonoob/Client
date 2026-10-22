import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class VariableNameSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::VariableNameSection'); }

    declare private _name: TextInputPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._name = param2.createTextInput(new TextInputParam("", 40));
        this._name.addListener(this.onPlaceholderChange);
        this.initializeSection(this.l("variables.variable_name"), this._name);
    }

    private onPlaceholderChange = (param1: string): void => {
        let _loc2_: string = this._name.text;
        let _loc3_: string = param1.split(" ").join("_").toLowerCase();
        if (_loc2_ != _loc3_) {
            this._name.text = _loc3_;
        }
    };

    public set variableName(param1: string) {
        this._name.text = param1;
        this.onPlaceholderChange(param1);
    }

    public get variableName(): string {
        return this._name.text.split(" ").join("_").toLowerCase();
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._name = null;
    }
}
