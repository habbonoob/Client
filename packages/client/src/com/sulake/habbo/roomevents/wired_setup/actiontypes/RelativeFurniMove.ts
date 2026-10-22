import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { SliderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SliderPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class RelativeFurniMove extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::RelativeFurniMove'); }

    private static readonly _SafeStr_8583: number = 4;
    private static readonly _SafeStr_8782: number = 5;

    constructor() {
        super();
    }

    declare private _SafeStr_4358: RadioGroupPreset;

    declare private _SafeStr_4414: RadioGroupPreset;

    declare private _SafeStr_3997: SliderPreset;

    declare private _SafeStr_4047: SliderPreset;

    public override get code(): number {
        return ActionTypeCodes.RELATIVE_FURNI_MOVE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_4358 = param1.createRadioGroup([this.createAxisOption(4, "move_2"), this.createAxisOption(5, "move_6")], null, 4);
        this._SafeStr_4358.selected = 4;
        let _loc4_: TextPreset = param1.createText(this.l("movement.horizontal.distance"), new TextParam(1));
        this._SafeStr_3997 = param1.createSliderPreset(0, 20, 1);
        this._SafeStr_3997.addEventListener("change", this.onHorizontalSliderChange);
        let _loc6_: SimpleListViewPreset = param1.createSimpleListView(true, [this._SafeStr_4358, _loc4_, this._SafeStr_3997]);
        let _loc5_: SectionPreset = param1.createSection(this.l("movement.horizontal.selection"), _loc6_);
        this._SafeStr_4414 = param1.createRadioGroup([this.createAxisOption(4, "move_4"), this.createAxisOption(5, "move_0")], null, 4);
        this._SafeStr_4414.selected = 4;
        let _loc7_: TextPreset = param1.createText(this.l("movement.vertical.distance"), new TextParam(1));
        this._SafeStr_4047 = param1.createSliderPreset(0, 20, 1);
        this._SafeStr_4047.addEventListener("change", this.onVerticalSliderChange);
        let _loc9_: SimpleListViewPreset = param1.createSimpleListView(true, [this._SafeStr_4414, _loc7_, this._SafeStr_4047]);
        let _loc8_: SectionPreset = param1.createSection(this.l("movement.vertical.selection"), _loc9_);
        this.updateDistanceLocalization("horizontal", 0);
        this.updateDistanceLocalization("vertical", 0);
        param3.addElements(_loc5_, _loc8_);
    }

    public override onEditStart(param1: Triggerable): void {
        this.setAxisValue(param1.intParams[0] | 0, this._SafeStr_4358, this._SafeStr_3997, "horizontal");
        this.setAxisValue(param1.intParams[1] | 0, this._SafeStr_4414, this._SafeStr_4047, "vertical");
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this.getAxisValue(this._SafeStr_4358, this._SafeStr_3997));
        _loc1_.push(this.getAxisValue(this._SafeStr_4414, this._SafeStr_4047));
        return _loc1_;
    }

    private createAxisOption(param1: number, param2: string): RadioButtonParam {
        let _loc3_: RadioButtonParam = new RadioButtonParam(param1, null);
        _loc3_.iconAssetName = param2;
        return _loc3_;
    }

    private getAxisValue(param1: RadioGroupPreset, param2: SliderPreset): number {
        let _loc3_: number = param2.value;
        return param1.selected == 5 ? -_loc3_ : _loc3_;
    }

    private setAxisValue(param1: number, param2: RadioGroupPreset, param3: SliderPreset, param4: string): void {
        let _loc5_: number = Math.abs(param1) | 0;
        param3.value = _loc5_;
        param2.selected = param1 < 0 ? 5 : 4;
        this.updateDistanceLocalization(param4, _loc5_);
    }

    private updateDistanceLocalization(param1: string, param2: number): void {
        this.roomEvents.localization.registerParameter("wiredfurni.params.movement." + param1 + ".distance", "distance", "" + param2);
    }

    private onHorizontalSliderChange = (param1: Event): void => {
        this.updateDistanceLocalization("horizontal", this._SafeStr_3997.value);
    };

    private onVerticalSliderChange = (param1: Event): void => {
        this.updateDistanceLocalization("vertical", this._SafeStr_4047.value);
    };
}
