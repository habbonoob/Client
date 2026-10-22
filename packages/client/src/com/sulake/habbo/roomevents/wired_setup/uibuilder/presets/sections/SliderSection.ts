import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { SliderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SliderPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { SliderValueEcho } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueEcho';
import { SliderValuePulses } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValuePulses';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class SliderSection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::SliderSection'); }

    static #staticsReady = false;

    public static get CONVERTER_ECHO(): SliderValueConverter {
        SliderSection.#initStatics();
        return SliderSection.CONVERTER_ECHO;
    }

    public static get CONVERTER_PULSES(): SliderValueConverter {
        SliderSection.#initStatics();
        return SliderSection.CONVERTER_PULSES;
    }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: string, param5: string, param6: SliderValueConverter, param7: number = 0, param8: number = 1, param9: number = 0, param10: boolean = true) {
        super(param1, param2, param3);
        this._SafeStr_5181 = param6;
        this._localizationKey = param4;
        this._SafeStr_6742 = param5;
        this._sliderPreset = param2.createSliderPreset(param7, param8, param9);
        let _loc11_: SectionParam = null;
        if (param10) {
            this._SafeStr_3132 = param2.createNumberInput(new NumberInputParam(0, param7 | 0, param8 | 0, 40, param6.precision, param6.endsWithFive));
            this._SafeStr_3132.onValueChange = this.onTextValueChange;
            _loc11_ = new SectionParam(null, 0, this._SafeStr_3132, param3.namedInputOffset);
        }
        this.initializeSection(param1.localization.getLocalization(param4), this._sliderPreset, _loc11_);
        if (!param10) {
            this.updateName();
        }
        this._sliderPreset.addEventListener("change", this.onSliderChange);
    }

    declare private _sliderPreset: SliderPreset;

    declare private _SafeStr_5181: SliderValueConverter;

    declare private _localizationKey: string;

    declare private _SafeStr_6742: string;

    declare private _SafeStr_3132: NumberInputPreset;

    declare private _ignoreListeners: boolean;
    static { (this.prototype as any)._ignoreListeners = false; }

    public get value(): number {
        return this._sliderPreset.value;
    }

    public set value(param1: number) {
        this._ignoreListeners = true;
        this._sliderPreset.value = param1;
        if (this._SafeStr_3132 != null) {
            this._SafeStr_3132.value = param1;
        }
        this.updateName();
        this._ignoreListeners = false;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._sliderPreset = null;
        this._SafeStr_5181 = null;
        this._SafeStr_3132 = null;
    }

    private onTextValueChange = (param1: number): void => {
        if (this._ignoreListeners) {
            return;
        }
        this._ignoreListeners = true;
        this._sliderPreset.value = param1;
        this._ignoreListeners = false;
    };

    private updateName(): void {
        this.sectionTitle = this.localizations.getLocalizationWithParams(this._localizationKey, "", this._SafeStr_6742, this._SafeStr_5181.toString(this.value));
    }

    private onSliderChange = (param1: Event): void => {
        if (this._ignoreListeners) {
            return;
        }
        if (this._SafeStr_3132 != null) {
            this._ignoreListeners = true;
            this._SafeStr_3132.value = this._sliderPreset.value;
            this._ignoreListeners = false;
        } else {
            this.updateName();
        }
    };

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (SliderSection.#staticsReady) return;
        SliderSection.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(SliderSection, name, { value, writable: true, configurable: true, enumerable: true });
        set("CONVERTER_ECHO", null);
        set("CONVERTER_PULSES", null);
        set("CONVERTER_ECHO", new SliderValueEcho());
        set("CONVERTER_PULSES", new SliderValuePulses());
    }
}
