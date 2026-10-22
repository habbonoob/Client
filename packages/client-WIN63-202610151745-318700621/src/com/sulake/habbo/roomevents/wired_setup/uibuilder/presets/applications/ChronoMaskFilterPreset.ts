import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class ChronoMaskFilterPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::ChronoMaskFilterPreset'); }

    declare private _checkboxGroup: CheckboxGroupPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: any[], param5: number = 1) {
        let _loc7_: number = 0;
        super(param1, param2, param3);
        let _loc6_: any[] = [];
        _loc7_ = 0;
        while (_loc7_ < param4.length) {
            _loc6_.push(new CheckboxOptionParam(stringOrNull(param4[_loc7_]), _loc7_));
            _loc7_++;
        }
        this._checkboxGroup = param2.createCheckboxGroup(_loc6_, null, param5);
    }

    public get mask(): number {
        return this._checkboxGroup.mask;
    }

    public set mask(param1: number) {
        this._checkboxGroup.mask = param1;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._checkboxGroup.resizeToWidth(param1);
    }

    public override get window(): IWindow {
        return this._checkboxGroup.window;
    }

    protected override get childPresets(): any[] {
        return [this._checkboxGroup];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._checkboxGroup = null;
    }
}
