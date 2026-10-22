import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { SliderValueConverter } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValueConverter';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { MiniIconDropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/MiniIconDropdownPreset';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { SliderPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SliderPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { Event } from '@habbo-pixi/runtime/events/Event';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { _SafeCls_6088 } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/_SafeCls_6088';
import { SliderValuePulses } from '@/com/sulake/habbo/roomevents/wired_setup/common/slider_converter/SliderValuePulses';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { AbstractSectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/AbstractSectionPreset';

export class ActionDelaySection extends AbstractSectionPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.sections::ActionDelaySection'); }

    static #staticsReady = false;

    private static readonly MODE_STANDARD: number = 0;
    private static readonly MODE_PRECISE: number = 1;
    private static readonly STANDARD_MIN: number = 0;
    private static readonly STANDARD_MAX: number = 120;
    private static readonly PRECISE_MIN: number = 0;
    private static readonly PRECISE_MAX: number = 1200;
    private static readonly DELAY_INPUT_WIDTH: number = 40;
    private static readonly MODE_DROPDOWN_WIDTH: number = 90;
    private static readonly MODE_STANDARD_ASSET: string = "delay_standard";
    private static readonly MODE_PRECISE_ASSET: string = "delay_precise";

    private static get CONVERTER_PULSES(): SliderValueConverter {
        ActionDelaySection.#initStatics();
        return ActionDelaySection.CONVERTER_PULSES;
    }

    private static get CONVERTER_PRECISE_DELAY(): SliderValueConverter {
        ActionDelaySection.#initStatics();
        return ActionDelaySection.CONVERTER_PRECISE_DELAY;
    }

    declare private _mode: MiniIconDropdownPreset;

    declare private _SafeStr_14363: SliderPreset;

    declare private _SafeStr_14364: SliderPreset;

    declare private _SafeStr_14365: NumberInputPreset;

    declare private _content: SimpleListViewPreset;

    declare private _ignoreListeners: boolean;
    static { (this.prototype as any)._ignoreListeners = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle) {
        super(param1, param2, param3);
        this._mode = param2.createMiniIconDropdownPreset(new DropdownParam("", Array.from([new ExpandableDropdownOption(0, this.l("delay.mode.standard")), new ExpandableDropdownOption(1, this.l("delay.mode.precise"))]), this.onModeChange, "", 90), "delay_standard", "");
        this._SafeStr_14363 = param2.createSliderPreset(0, 120, 1);
        this._SafeStr_14364 = param2.createSliderPreset(0, 1200, 1);
        this._SafeStr_14365 = param2.createNumberInput(new NumberInputParam(0, 0, 120, 40, ActionDelaySection.CONVERTER_PULSES.precision, ActionDelaySection.CONVERTER_PULSES.endsWithFive));
        this._SafeStr_14365.onValueChange = this.onTextValueChange;
        this._SafeStr_14363.value = 0;
        this._SafeStr_14364.value = 0;
        this._SafeStr_14363.addEventListener("change", this.onDelayChange);
        this._SafeStr_14364.addEventListener("change", this.onDelayChange);
        this._content = param2.createSimpleListView(true, [this._SafeStr_14363, this._SafeStr_14364]);
        let _loc4_: SectionParam = new SectionParam();
        _loc4_.headerOptionLeft = this._SafeStr_14365;
        _loc4_.titleYOffset = param3.namedInputOffset;
        _loc4_.addHeaderOption(this._mode);
        this.initializeSection(this.l("delay.seconds"), this._content, _loc4_);
        this._mode.selectedId = 0;
        this.updateModeVisibility();
    }

    public get encodedDelay(): number {
        return this._mode.selectedId == 1 ? -(this._SafeStr_14364.value * 50) : this._SafeStr_14363.value;
    }

    public set encodedDelay(param1: number) {
        let _loc2_: boolean = this._ignoreListeners;
        this._ignoreListeners = true;
        this._SafeStr_14363.value = 0;
        this._SafeStr_14364.value = 0;
        if (param1 < 0) {
            this._mode.selectedId = 1;
            this._SafeStr_14364.value = Math.abs(param1) / 50 | 0;
        } else {
            this._mode.selectedId = 0;
            this._SafeStr_14363.value = param1;
        }
        this.updateModeVisibility();
        this._ignoreListeners = _loc2_;
    }

    private onModeChange = (param1: ExpandableDropdownOption): void => {
        this.updateModeVisibility();
    };

    private onTextValueChange = (param1: number): void => {
        if (this._ignoreListeners) {
            return;
        }
        this._ignoreListeners = true;
        this.activeDelay.value = param1;
        this._ignoreListeners = false;
    };

    private onDelayChange = (param1: Event): void => {
        if (this._ignoreListeners) {
            return;
        }
        this._ignoreListeners = true;
        this._SafeStr_14365.value = this.activeDelay.value;
        this._ignoreListeners = false;
    };

    private get activeDelay(): SliderPreset {
        return this._mode.selectedId == 1 ? this._SafeStr_14364 : this._SafeStr_14363;
    }

    private updateModeVisibility(): void {
        let _loc3_: boolean = this._mode.selectedId == 1;
        let _loc1_: SliderValueConverter = _loc3_ ? ActionDelaySection.CONVERTER_PRECISE_DELAY : ActionDelaySection.CONVERTER_PULSES;
        let _loc2_: boolean = this._ignoreListeners;
        this._ignoreListeners = true;
        this._SafeStr_14365.setValidation(_loc3_ ? 0 : 0, _loc3_ ? 1200 : 120, _loc1_.precision, _loc1_.endsWithFive);
        this._SafeStr_14365.value = this.activeDelay.value;
        this._ignoreListeners = _loc2_;
        this._mode.assetName = _loc3_ ? "delay_precise" : "delay_standard";
        this._SafeStr_14363.visible = !_loc3_;
        this._SafeStr_14364.visible = _loc3_;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._mode = null;
        this._SafeStr_14363 = null;
        this._SafeStr_14364 = null;
        this._SafeStr_14365 = null;
        this._content = null;
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (ActionDelaySection.#staticsReady) return;
        ActionDelaySection.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(ActionDelaySection, name, { value, writable: true, configurable: true, enumerable: true });
        set("CONVERTER_PULSES", null);
        set("CONVERTER_PRECISE_DELAY", null);
        set("CONVERTER_PULSES", new SliderValuePulses());
        set("CONVERTER_PRECISE_DELAY", new _SafeCls_6088());
    }
}
