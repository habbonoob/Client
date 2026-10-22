import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { VariableFxEditorState } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorState';
import type { VariableFxAudienceVariablePopup } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxAudienceVariablePopup';
import type { VariableFxEditorStateListener } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxEditorStateListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { NamedDropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedDropdownPreset';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { SplitterPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SplitterPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxVisibilitySettingsPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxVisibilitySettingsPreset'); }

    declare private _SafeStr_2333: VariableFxEditorStateListener;

    declare private _state: VariableFxEditorState;

    declare private _variables: VariableListBase;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _SafeStr_2848: SectionPreset;

    declare private _audiencePopup: VariableFxAudienceVariablePopup;

    declare private _SafeStr_14526: NamedDropdownPreset;

    declare private _SafeStr_14527: RadioGroupPreset;

    declare private _SafeStr_14528: WiredUIPreset;

    declare private _SafeStr_14529: NamedNumberInputPreset;

    declare private _SafeStr_14530: CheckboxGroupPreset;

    declare private _SafeStr_14531: SplitterPreset;

    declare private _SafeStr_14532: SplitterPreset;

    declare private _SafeStr_14533: CheckboxGroupPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: VariableFxEditorStateListener) {
        super(param1, param2, param3);
        this._SafeStr_2333 = param4;
        this._SafeStr_14526 = param2.createNamedDropdown(new DropdownParam("", this.createAudienceOptions(), this.onAudienceChange), "${wiredfurni.params.variablefx.visibility.audience}");
        this._audiencePopup = param2.createVariableFxAudienceVariablePopup(this.onAudienceVariableSaved);
        this._SafeStr_14533 = param2.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.variablefx.update_mask.1}", 0), new CheckboxOptionParam("${wiredfurni.params.variablefx.update_mask.2}", 1), new CheckboxOptionParam("${wiredfurni.params.variablefx.update_mask.3}", 2), new CheckboxOptionParam("${wiredfurni.params.variablefx.update_mask.4}", 3)], this.onCheckboxChange, 2);
        this._SafeStr_14530 = param2.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.variablefx.mouse_hover}", 0)], this.onCheckboxChange);
        this._SafeStr_14529 = param2.createNamedNumberInput(new NumberInputParam(3000, 1500, 20000, 45), "${wiredfurni.params.variablefx.show_duration}");
        this._SafeStr_14529.onValueChange = this.onDurationChange;
        this._SafeStr_14531 = param2.createSplitter();
        this._SafeStr_14532 = param2.createSplitter();
        let _loc5_: SimpleListViewPreset = param2.createSimpleListView(true, [this._SafeStr_14533, this._SafeStr_14531, this._SafeStr_14529, this._SafeStr_14532, this._SafeStr_14530]);
        this._SafeStr_14528 = param2.createPaddedContainerPreset(_loc5_, 6, 5, 6, 5, param3.createBorder());
        this._SafeStr_14527 = param2.createRadioGroup([new RadioButtonParam(0, "${wiredfurni.params.variablefx.show_mode.always}"), new RadioButtonParam(1, "${wiredfurni.params.variablefx.show_mode.when_variable_changes}", null, this._SafeStr_14528), new RadioButtonParam(2, "${wiredfurni.params.variablefx.show_mode.never}")], this.onShowModeChange);
        this._SafeStr_2848 = param2.createSection("${wiredfurni.params.variablefx.visibility}", param2.createSimpleListView(true, [this._SafeStr_14527, this._SafeStr_14526]), SectionParam.COLLAPSED);
    }

    private static isVariableAudience(param1: number): boolean {
        return param1 == 3 || param1 == 4;
    }

    public init(param1: VariableFxEditorState, param2: VariableListBase): void {
        this._state = param1;
        this._variables = param2;
        this.refreshForState(param1);
    }

    public applyToState(param1: VariableFxEditorState): void {
        param1.visibility = this._SafeStr_14526.selectedId;
        param1.showMode = this._SafeStr_14527.selected;
        param1.showOnMouseHover = this._SafeStr_14530._SafeStr_2119(0).selected;
        param1._SafeStr_14486 = this._SafeStr_14533.mask;
        param1.showDuration = this._SafeStr_14529.value;
    }

    public refreshForState(param1: VariableFxEditorState): void {
        this._SafeStr_4202 = true;
        this._SafeStr_14526.reinit(this.createAudienceOptions(), param1.visibility);
        this._SafeStr_14527.selected = param1.showMode;
        this._SafeStr_14530._SafeStr_2119(0).selected = param1.showOnMouseHover;
        this._SafeStr_14533.mask = param1._SafeStr_14486;
        this._SafeStr_14529.value = param1.showDuration;
        this._SafeStr_14526.visible = true;
        this._SafeStr_14528.disabled = param1.showMode != 1;
        this._SafeStr_4202 = false;
    }

    private onAudienceChange = (param1: ExpandableDropdownOption): void => {
        if (this._SafeStr_4202) {
            return;
        }
        if (param1 != null && VariableFxVisibilitySettingsPreset.isVariableAudience(param1.id)) {
            this._audiencePopup.open(this._variables, this._state.audienceVariableId, this._state.visibility == 4, this._state.audienceVariableValue);
            this.refreshForState(this._state);
            return;
        }
        this.stateChanged();
    };

    private onAudienceVariableSaved = (param1: string, param2: boolean, param3: number): void => {
        this._state.visibility = param2 ? 4 : 3;
        this._state.audienceVariableId = param1;
        this._state.audienceVariableValue = param2 ? param3 : 0;
        this._state.sanitize();
        this.refreshForState(this._state);
        this._SafeStr_2333.variableFxStateChanged(this._state, false);
    };

    private onShowModeChange = (param1: number): void => {
        this.stateChanged();
    };

    private onCheckboxChange = (param1: number, param2: boolean): void => {
        this.stateChanged();
    };

    private onDurationChange = (param1: number): void => {
        this.stateChanged();
    };

    private stateChanged(): void {
        if (this._SafeStr_4202) {
            return;
        }
        this.applyToState(this._state);
        this._state.sanitize();
        this.refreshForState(this._state);
        this._SafeStr_2333.variableFxStateChanged(this._state, false);
    }

    public override get window(): IWindow {
        return this._SafeStr_2848.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2848.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2848, this._audiencePopup];
    }

    public closePopups(): void {
        this._audiencePopup.hide();
    }

    private createAudienceOptions(): ExpandableDropdownOption[] {
        let _loc1_: ExpandableDropdownOption[] = [];
        if (this._state == null || this._state.sourceType == WiredInputSourcePicker.USER_SOURCE) {
            _loc1_.push(new ExpandableDropdownOption(0, "${wiredfurni.params.variablefx.visibility.only_user}"));
            _loc1_.push(new ExpandableDropdownOption(1, "${wiredfurni.params.variablefx.visibility.game_team}"));
        }
        _loc1_.push(new ExpandableDropdownOption(this.variableAudienceOptionId, this.variableAudienceOptionText()));
        _loc1_.push(new ExpandableDropdownOption(2, "${wiredfurni.params.variablefx.visibility.everyone}"));
        return _loc1_;
    }

    private get variableAudienceOptionId(): number {
        return this._state != null && this._state.visibility == 4 ? 4 : 3;
    }

    private variableAudienceOptionText(): string {
        let _loc2_: WiredVariable = null;
        let _loc1_: string = null;
        if (this._state == null || this._state.audienceVariableId == null || this._state.audienceVariableId == "") {
            return this.loc("wiredfurni.params.variablefx.visibility.has_variable");
        }
        _loc2_ = this.audienceVariable;
        if (_loc2_ == null) {
            return this.localizations.getLocalizationWithParams("wiredfurni.params.variablefx.visibility.has_variable.named", "", "variable", this._state.audienceVariableId);
        }
        if (this._state.visibility == 4) {
            _loc1_ = Util.variableValueWithString(_loc2_, this._state.audienceVariableValue);
            if (_loc1_ == null) {
                _loc1_ = String(this._state.audienceVariableValue);
            }
            return this.localizations.getLocalizationWithParams("wiredfurni.params.variablefx.visibility.has_variable.value", "", "variable", _loc2_.variableName, "value", _loc1_);
        }
        return this.localizations.getLocalizationWithParams("wiredfurni.params.variablefx.visibility.has_variable.named", "", "variable", _loc2_.variableName);
    }

    private get audienceVariable(): WiredVariable {
        if (this._variables == null) {
            return null;
        }
        return Util.findVariableById(this._variables.variables, this._state.audienceVariableId);
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._SafeStr_2333 = null;
        this._state = null;
        this._variables = null;
        this._SafeStr_2848 = null;
        this._audiencePopup = null;
        this._SafeStr_14526 = null;
        this._SafeStr_14527 = null;
        this._SafeStr_14528 = null;
        this._SafeStr_14529 = null;
        this._SafeStr_14530 = null;
        this._SafeStr_14531 = null;
        this._SafeStr_14532 = null;
        this._SafeStr_14533 = null;
    }
}
