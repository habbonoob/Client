import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { AdvancedSettingsWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/AdvancedSettingsWrapperPreset';
import type { FooterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FooterPreset';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import type { HeaderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/HeaderPreset';
import type { InputSourceSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/InputSourceSection';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SliderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/SliderSection';

export class WiredConfigurationCache {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup::WiredConfigurationCache'); }

    declare private _frame: FramePreset;

    declare private _headerPreset: HeaderPreset;

    declare private _selectorOptionsPreset: CheckboxGroupPreset;

    declare private _furniPicksSectionPreset: SectionPreset;

    declare private _delayPreset: SliderSection;

    declare private _initialWidth: number;
    static { (this.prototype as any)._initialWidth = 0; }

    declare private _advancedSettingsWrapperPreset: AdvancedSettingsWrapperPreset;

    declare private _conditionQuantifierOptions: RadioGroupPreset;

    declare private _inputSourcePresets: InputSourceSection[];

    declare private _footerPreset: FooterPreset;

    constructor(param1: FramePreset, param2: HeaderPreset, param3: CheckboxGroupPreset, param4: SectionPreset, param5: SliderSection, param6: AdvancedSettingsWrapperPreset, param7: RadioGroupPreset, param8: InputSourceSection[], param9: FooterPreset, param10: number) {
        this._frame = param1;
        this._headerPreset = param2;
        this._selectorOptionsPreset = param3;
        this._furniPicksSectionPreset = param4;
        this._delayPreset = param5;
        this._advancedSettingsWrapperPreset = param6;
        this._conditionQuantifierOptions = param7;
        this._inputSourcePresets = param8;
        this._footerPreset = param9;
        this._initialWidth = param10;
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

    public get delayPreset(): SliderSection {
        return this._delayPreset;
    }

    public get advancedSettingsWrapperPreset(): AdvancedSettingsWrapperPreset {
        return this._advancedSettingsWrapperPreset;
    }

    public get conditionQuantifierOptions(): RadioGroupPreset {
        return this._conditionQuantifierOptions;
    }

    public get inputSourcePresets(): InputSourceSection[] {
        return this._inputSourcePresets;
    }

    public get footerPreset(): FooterPreset {
        return this._footerPreset;
    }

    public get initialWidth(): number {
        return this._initialWidth;
    }
}
