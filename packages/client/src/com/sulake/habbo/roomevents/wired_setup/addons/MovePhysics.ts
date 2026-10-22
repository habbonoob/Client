import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';

export class MovePhysics extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::MovePhysics'); }

    constructor() {
        super();
    }

    declare private _options: CheckboxGroupPreset;

    public override get code(): number {
        return AddonCodes._SafeStr_7450;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._options = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("movephysics.keep_altitude"), 0), new CheckboxOptionParam(this.l("movephysics.move_through_furni"), 1), new CheckboxOptionParam(this.l("movephysics.move_through_users"), 2), new CheckboxOptionParam(this.l("movephysics.block_by_furni"), 3)]);
        let _loc4_: SectionPreset = param1.createSection(this.l("select_options"), this._options);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._options._SafeStr_2119(0).selected = param1.getBoolean(0);
        this._options._SafeStr_2119(1).selected = param1.getBoolean(1);
        this._options._SafeStr_2119(2).selected = param1.getBoolean(2);
        this._options._SafeStr_2119(3).selected = param1.getBoolean(3);
    }

    public override readIntParamsFromForm(): any[] {
        return [this._options._SafeStr_2119(0).selected ? 1 : 0, this._options._SafeStr_2119(1).selected ? 1 : 0, this._options._SafeStr_2119(2).selected ? 1 : 0, this._options._SafeStr_2119(3).selected ? 1 : 0];
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.physics." + param1;
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.users.title.physics." + param1;
    }
}
