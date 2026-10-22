import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SubVariableCreatorPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/SubVariableCreatorPreset';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { NamedDropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedDropdownPreset';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { StaticBitmapAssetWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/StaticBitmapAssetWrapperPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { VariableExtraSourceTypes } from '@/com/sulake/habbo/roomevents/wired_setup/common/VariableExtraSourceTypes';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { SubVariableParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/applications/SubVariableParam';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class _SafeCls_6105 extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::_SafeCls_6105'); }

    declare private _SafeStr_14467: CheckboxGroupPreset;

    declare private _directionalSystemDropdown: NamedDropdownPreset;

    declare private _SafeStr_14468: StaticBitmapAssetWrapperPreset;

    declare private _shooterDirectionOverride: CheckboxGroupPreset;

    declare private _bunnyHopCheckbox: CheckboxGroupPreset;

    declare private _SafeStr_14469: RadioGroupPreset;

    declare private _SafeStr_14470: NamedNumberInputPreset;

    declare private _SafeStr_14471: RadioGroupPreset;

    declare private _SafeStr_14472: ValueOrVariableSection;

    declare private _enableCustomAnimationTime: CheckboxGroupPreset;

    declare private _animationTime: ValueOrVariableSection;

    declare private _SafeStr_14473: CheckboxGroupPreset;

    declare private _SafeStr_14474: NamedNumberInputPreset;

    declare private _SafeStr_14475: SliderSection;

    declare private _internalVariables: SubVariableCreatorPreset;

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.PROJECTILE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    private onDirectionalSystemChange = (param1: ExpandableDropdownOption): void => {
        this.onDirectionalIdSet(param1.id);
    };

    private onDirectionalIdSet(param1: number): void {
        this._SafeStr_14468.assetUri = "wired_misc_directional_system_" + param1 + "_png";
        this.roomEventsCtrl.updateSourceContainer(WiredInputSourcePicker.USER_SOURCE, 1);
    }

    private newDirectionStateChanged = (param1: number, param2: boolean): void => {
        this._SafeStr_14475.disabled = !param2;
        this.roomEventsCtrl.updateSourceContainer(WiredInputSourcePicker.USER_SOURCE, 1);
    };

    private customAnimationTimeStateChanged = (param1: number, param2: boolean): void => {
        this.roomEventsCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 0);
    };

    private animationDistanceModeChanged = (param1: number): void => {
        this._SafeStr_14472.disabled = param1 == 0;
        this.roomEventsCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, 1);
    };

    private onShooterDirectionCheckboxChanged = (param1: number, param2: boolean): void => {
        this.roomEventsCtrl.updateSourceContainer(WiredInputSourcePicker.USER_SOURCE, 1);
    };

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc17_: UsageInfoSection = param1.createUsageInfoSection("${wiredfurni.params.projectile.usage_info}");
        this._directionalSystemDropdown = param1.createNamedDropdown(new DropdownParam("${wiredfurni.params.projectile.directional_system}", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.projectile.directional_system.0}"), new ExpandableDropdownOption(1, "${wiredfurni.params.projectile.directional_system.1}"), new ExpandableDropdownOption(2, "${wiredfurni.params.projectile.directional_system.2}"), new ExpandableDropdownOption(3, "${wiredfurni.params.projectile.directional_system.3}")]), this.onDirectionalSystemChange), "${wiredfurni.params.projectile.directional_system}");
        this._SafeStr_14468 = param1.createBitmapWrapperPreset("wired_misc_directional_system_1_png");
        this._bunnyHopCheckbox = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.projectile.bunny_hop}")]);
        this._shooterDirectionOverride = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.projectile.change_shooter_direction}", 0, null, this._bunnyHopCheckbox)], this.onShooterDirectionCheckboxChanged);
        let _loc14_: SimpleListViewPreset = param1.createSimpleListView(true, [this._directionalSystemDropdown, this._SafeStr_14468.alignCenter(), this._shooterDirectionOverride]);
        _loc14_.spacing = 10;
        let _loc12_: CheckboxOptionParam = new CheckboxOptionParam("${wiredfurni.params.projectile.new_direction_enabled}");
        _loc12_.extra2 = _loc14_;
        this._SafeStr_14467 = param1.createCheckboxGroup([_loc12_], this.newDirectionStateChanged);
        let _loc8_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.direction}", this._SafeStr_14467, SectionParam.EXPANDED);
        this._SafeStr_14470 = param1.createNamedNumberInput(new NumberInputParam(0, -1000, 1000), "${wiredfurni.params.projectile.animation_trajectory.trajectory.1.extra}");
        let _loc9_: TextParam = new TextParam(1);
        _loc9_.textColor = param2.softTextColor;
        let _loc15_: TextPreset = param1.createText("${wiredfurni.params.projectile.animation_trajectory.trajectory.0.info}", _loc9_);
        this._SafeStr_14469 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.projectile.animation_trajectory.trajectory.0}", null, _loc15_), new RadioButtonParam(1, "${wiredfurni.params.projectile.animation_trajectory.trajectory.1}", null, this._SafeStr_14470)]);
        let _loc10_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.animation_trajectory.trajectory}", this._SafeStr_14469);
        this._SafeStr_14471 = param1.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.projectile.animation_trajectory.distance.0}"), new RadioButtonParam(1, "${wiredfurni.params.projectile.animation_trajectory.distance.1}"), new RadioButtonParam(2, "${wiredfurni.params.projectile.animation_trajectory.distance.2}")], this.animationDistanceModeChanged);
        let _loc20_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.animation_trajectory.distance}", this._SafeStr_14471);
        this._SafeStr_14472 = param1.createValueOrVariableSection(1, this.mergedSourceOptions(1), "${wiredfurni.params.projectile.animation_trajectory.distance_selection}", -64, 64);
        let _loc4_: SimpleListViewPreset = param1.createSimpleListView(true, [_loc10_, _loc20_, this._SafeStr_14472]);
        let _loc11_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.animation_trajectory}", _loc4_, SectionParam.COLLAPSED);
        this._animationTime = param1.createValueOrVariableSection(0, this.mergedSourceOptions(0), "${wiredfurni.params.projectile.time_per_tile}", 1, 100000);
        this._SafeStr_14473 = param1.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.projectile.distance_x}", 0), new CheckboxOptionParam("${wiredfurni.params.projectile.distance_y}", 1), new CheckboxOptionParam("${wiredfurni.params.projectile.distance_z}", 2)]);
        let _loc7_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.distance_options}", this._SafeStr_14473);
        this._SafeStr_14474 = param1.createNamedNumberInput(new NumberInputParam(0, 0, 100000), "${wiredfurni.params.projectile.increase_speed}");
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.increase_speed.title}", this._SafeStr_14474);
        let _loc16_: SimpleListViewPreset = param1.createSimpleListView(true, [this._animationTime, _loc7_, _loc6_]);
        let _loc5_: CheckboxOptionParam = new CheckboxOptionParam("${wiredfurni.params.projectile.override_animation_time}");
        _loc5_.extra2 = _loc16_;
        this._enableCustomAnimationTime = param1.createCheckboxGroup([_loc5_], this.customAnimationTimeStateChanged);
        let _loc13_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.animation_time}", this._enableCustomAnimationTime, SectionParam.COLLAPSED);
        this._SafeStr_14475 = param1.createSliderSection("wiredfurni.params.projectile.rotation_offset", "offset", SliderSection.CONVERTER_ECHO, 0, 7, 1, false, SectionParam.COLLAPSED);
        let _loc19_: any[] = [new SubVariableParam(0, "animation.tiles_travelled", true), new SubVariableParam(1, "animation.user_collisions", true), new SubVariableParam(2, "animation.furni_collisions", true), new SubVariableParam(3, "animation.position.x"), new SubVariableParam(4, "animation.position.y"), new SubVariableParam(5, "animation.position.altitude"), new SubVariableParam(6, "animation.is_travelling", true)];
        this._internalVariables = param1.createSubVariableCreator("wiredfurni.params.projectile.variable.", _loc19_);
        let _loc18_: SectionPreset = param1.createSection("${wiredfurni.params.projectile.projectile.variables}", this._internalVariables, SectionParam.COLLAPSED);
        param3.addElements(_loc17_, _loc8_, _loc11_, _loc13_, this._SafeStr_14475, _loc18_, param1.createWrapperPreset(param2.createSplitterView()));
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc13_: string = stringOrNull(param1.variableIds[0]);
        let _loc18_: string = stringOrNull(param1.variableIds[1]);
        let _loc2_: boolean = param1.getBoolean(0);
        let _loc5_: number = param1.getInt(1);
        let _loc15_: boolean = param1.getBoolean(2);
        let _loc16_: number = param1.getInt(3);
        let _loc19_: number = param1.getInt(4);
        let _loc12_: number = param1.getInt(5);
        let _loc21_: boolean = param1.getBoolean(6);
        let _loc20_: boolean = param1.getBoolean(7);
        let _loc17_: boolean = param1.getBoolean(8);
        let _loc8_: number = param1.getInt(9);
        let _loc6_: number = param1.getInt(10);
        let _loc4_: number = param1.getInt(11);
        let _loc3_: boolean = param1.getBoolean(12);
        let _loc9_: boolean = param1.getBoolean(13);
        let _loc10_: number = param1.getInt(14);
        let _loc11_: number = param1.getInt(15);
        let _loc14_: number = param1.getInt(16);
        let _loc7_: number = param1.getInt(17);
        let _loc22_: number = param1.getInt(18);
        this._SafeStr_14467._SafeStr_2119(0).selected = _loc2_;
        this._directionalSystemDropdown.selectedId = _loc5_;
        this._enableCustomAnimationTime._SafeStr_2119(0).selected = _loc15_;
        this._animationTime.init(param1.wiredContext.roomVariablesList, _loc13_, _loc12_, _loc16_, _loc19_);
        this._SafeStr_14473._SafeStr_2119(0).selected = _loc21_;
        this._SafeStr_14473._SafeStr_2119(1).selected = _loc20_;
        this._SafeStr_14473._SafeStr_2119(2).selected = _loc17_;
        this._SafeStr_14474.value = _loc8_;
        this._SafeStr_14475.value = _loc6_;
        this._internalVariables.mask = _loc4_;
        this._shooterDirectionOverride._SafeStr_2119(0).selected = _loc3_;
        this._bunnyHopCheckbox._SafeStr_2119(0).selected = _loc9_;
        this._SafeStr_14471.selected = _loc10_;
        this._SafeStr_14472.init(param1.wiredContext.roomVariablesList, _loc18_, _loc7_, _loc11_, _loc14_);
        this._SafeStr_14469.selected = _loc22_ == 0 ? 0 : 1;
        this._SafeStr_14470.value = _loc22_;
        this.newDirectionStateChanged(0, _loc2_);
        this.onDirectionalIdSet(_loc5_);
        this.animationDistanceModeChanged(_loc10_);
    }

    public override onEditInitialized(): void {
        this._animationTime.onEditInitialized();
        this._SafeStr_14472.onEditInitialized();
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_14467._SafeStr_2119(0).selected ? 1 : 0);
        _loc1_.push(this._directionalSystemDropdown.selectedId);
        _loc1_.push(this._enableCustomAnimationTime._SafeStr_2119(0).selected ? 1 : 0);
        _loc1_.push(this._animationTime.option);
        _loc1_.push(this._animationTime.numberValue);
        _loc1_.push(this._animationTime.target);
        _loc1_.push(this._SafeStr_14473._SafeStr_2119(0).selected ? 1 : 0);
        _loc1_.push(this._SafeStr_14473._SafeStr_2119(1).selected ? 1 : 0);
        _loc1_.push(this._SafeStr_14473._SafeStr_2119(2).selected ? 1 : 0);
        _loc1_.push(this._SafeStr_14474.value);
        _loc1_.push(this._SafeStr_14475.value);
        _loc1_.push(this._internalVariables.mask);
        _loc1_.push(this._shooterDirectionOverride._SafeStr_2119(0).selected ? 1 : 0);
        _loc1_.push(this._bunnyHopCheckbox._SafeStr_2119(0).selected ? 1 : 0);
        _loc1_.push(this._SafeStr_14471.selected);
        _loc1_.push(this._SafeStr_14472.option);
        _loc1_.push(this._SafeStr_14472.numberValue);
        _loc1_.push(this._SafeStr_14472.target);
        _loc1_.push(this._SafeStr_14469.selected == 1 ? this._SafeStr_14470.value : 0);
        return _loc1_;
    }

    public override readVariableIdsFromForm(): any[] {
        return [this._animationTime.finalizeSelection, this._SafeStr_14472.finalizeSelection];
    }

    public override get widthModifier(): number {
        return 1.3;
    }

    public override get allowScrolling(): boolean {
        return true;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.projectile";
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.users.title.shooter";
    }

    public override mergedSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.merged.title.variable_time_per_tile";
        }
        return "wiredfurni.params.sources.merged.title.variable_animation_distance";
    }

    public override isInputSourceDisabled(param1: number, param2: number): boolean {
        if (param2 == WiredInputSourcePicker.MERGED_SOURCE) {
            if (param1 == 0) {
                return !this._enableCustomAnimationTime._SafeStr_2119(0).selected;
            }
            return this._SafeStr_14471.selected == 0;
        }
        if (param2 == WiredInputSourcePicker.USER_SOURCE) {
            return !this._shooterDirectionOverride._SafeStr_2119(0).selected || !this._SafeStr_14467._SafeStr_2119(0).selected;
        }
        return false;
    }

    public override mergedSelections(): any[] {
        return [[1, 0], [2, 2]];
    }

    public override setMergedType(param1: number, param2: number): void {
        if (param1 == 0) {
            this._animationTime.target = param2;
            return;
        }
        this._SafeStr_14472.target = param2;
    }

    public override getMergedType(param1: number): number {
        if (param1 == 0) {
            return this._animationTime.target;
        }
        return this._SafeStr_14472.target;
    }

    public override getCustomSourcesForMergedType(param1: number): any[] {
        return [VariableExtraSourceTypes.GLOBAL_SOURCE, VariableExtraSourceTypes.CONTEXT_SOURCE];
    }

    public override hasCustomTypePicker(param1: number): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
