import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { InputSourceControlPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/inputsources/InputSourceControlPreset';
import type { _SafeCls_6086 } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/_SafeCls_6086';
import type { IInputSourceClaimOwner } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/interfaces/IInputSourceClaimOwner';
import type { AdvancedSettingsWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/AdvancedSettingsWrapperPreset';
import type { FooterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FooterPreset';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import type { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';
import type { InputSourceSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/InputSourceSection';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ActionDelaySection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ActionDelaySection';

export class WiredConfigurationCache {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::WiredConfigurationCache'); }

    declare private _frame: FramePreset;

    declare private _headerPreset: HeaderPreset;

    declare private _selectorOptionsPreset: CheckboxGroupPreset;

    declare private _furniPicksSectionPreset: SectionPreset;

    declare private _delayPreset: ActionDelaySection;

    declare private _initialWidth: number;
    static { (this.prototype as any)._initialWidth = 0; }

    declare private _advancedSettingsWrapperPreset: AdvancedSettingsWrapperPreset;

    declare private _conditionQuantifierOptions: RadioGroupPreset;

    declare private _inputSourceClaimOwners: IInputSourceClaimOwner[];

    declare private _formValidationSources: _SafeCls_6086[];

    declare private _inputSourceControls: InputSourceControlPreset[];

    declare private _SafeStr_14334: InputSourceSection[];

    declare private _inputSourcePresets: string;

    declare private _footerPreset: FooterPreset;

    constructor(param1: FramePreset, param2: HeaderPreset, param3: CheckboxGroupPreset, param4: SectionPreset, param5: ActionDelaySection, param6: AdvancedSettingsWrapperPreset, param7: RadioGroupPreset, param8: IInputSourceClaimOwner[], param9: _SafeCls_6086[], param10: InputSourceControlPreset[], param11: InputSourceSection[], param12: string, param13: FooterPreset, param14: number) {
        this._frame = param1;
        this._headerPreset = param2;
        this._selectorOptionsPreset = param3;
        this._furniPicksSectionPreset = param4;
        this._delayPreset = param5;
        this._advancedSettingsWrapperPreset = param6;
        this._conditionQuantifierOptions = param7;
        this._inputSourceClaimOwners = param8;
        this._formValidationSources = param9;
        this._inputSourceControls = param10;
        this._SafeStr_14334 = param11;
        this._inputSourcePresets = param12;
        this._footerPreset = param13;
        this._initialWidth = param14;
    }

    public get frame(): FramePreset {
        return this._frame;
    }

    public get headerPreset(): HeaderPreset {
        return this._headerPreset;
    }

    public get selectorOptionsPreset(): CheckboxGroupPreset {
        return this._selectorOptionsPreset;
    }

    public get furniPicksSectionPreset(): SectionPreset {
        return this._furniPicksSectionPreset;
    }

    public get delayPreset(): ActionDelaySection {
        return this._delayPreset;
    }

    public get advancedSettingsWrapperPreset(): AdvancedSettingsWrapperPreset {
        return this._advancedSettingsWrapperPreset;
    }

    public get conditionQuantifierOptions(): RadioGroupPreset {
        return this._conditionQuantifierOptions;
    }

    public get inputSourceClaimOwners(): IInputSourceClaimOwner[] {
        return this._inputSourceClaimOwners;
    }

    public get formValidationSources(): _SafeCls_6086[] {
        return this._formValidationSources;
    }

    public get inputSourceControls(): InputSourceControlPreset[] {
        return this._inputSourceControls;
    }

    public get advancedInputSourceSections(): InputSourceSection[] {
        return this._SafeStr_14334;
    }

    public get inputSourceTopologySignature(): string {
        return this._inputSourcePresets;
    }

    public get footerPreset(): FooterPreset {
        return this._footerPreset;
    }

    public get initialWidth(): number {
        return this._initialWidth;
    }
}
