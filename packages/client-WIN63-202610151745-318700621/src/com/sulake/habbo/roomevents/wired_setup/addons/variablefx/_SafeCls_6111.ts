import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { VariableFxAdvancedRangePreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxAdvancedRangePreset';
import type { VariableFxEditorStateListener } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxEditorStateListener';
import type { VariableFxValueRangePreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxValueRangePreset';
import type { VariableFxVisibilitySettingsPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxVisibilitySettingsPreset';
import type { VariableFxVisualizationSettingsPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxVisualizationSettingsPreset';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/NumberInputPreset';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { _SafeCls_6087 } from '@/com/sulake/habbo/roomevents/wired_setup/_SafeCls_6087';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { VariableFxEditorMetadata } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorMetadata';
import { VariableFxEditorState } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorState';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class _SafeCls_6111 extends DefaultAddonType implements _SafeCls_6087, SourceTypePickedListener, VariableFxEditorStateListener {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::_SafeCls_6111'); }

    declare protected _state: VariableFxEditorState;

    declare private _SafeStr_14481: VariableFxVisualizationSettingsPreset;

    declare private _SafeStr_14482: VariableFxValueRangePreset;

    declare private _SafeStr_14483: VariableFxVisibilitySettingsPreset;

    declare private _SafeStr_14484: VariableFxAdvancedRangePreset;

    declare private _SafeStr_14485: NumberInputPreset;

    constructor() {
        super();
    }

    protected get categoryId(): number {
        return -1;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override get widthModifier(): number {
        return 1.45;
    }

    public getHeaderSourceTypeSelectorParam(param1: Triggerable): SourceTypeSelectorParam {
        let _loc2_: number = param1.getInt(0);
        return new SourceTypeSelectorParam([WiredInputSourcePicker._SafeStr_2178, WiredInputSourcePicker.USER_SOURCE], this, _loc2_);
    }

    public get headerSourceType(): number {
        if (this._state == null) {
            return WiredInputSourcePicker.USER_SOURCE;
        }
        return this._state.sourceType;
    }

    public set sourceType(param1: number) {
        if (this._state == null) {
            return;
        }
        let _loc2_: boolean = this._state.sourceType != param1;
        this._state.sourceType = param1;
        this._state.sanitize();
        if (this._SafeStr_14483 != null) {
            this._SafeStr_14483.refreshForState(this._state);
        }
        if (this._SafeStr_14484 != null) {
            this._SafeStr_14484.refreshForSourceType(this._state);
        }
        this.variableFxStateChanged(this._state, false);
        if (_loc2_) {
            this.roomEvents.wiredCtrl.resizeFrame();
        }
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: WiredUIPreset = this.createTopInfoPreset(param1);
        this._SafeStr_14481 = param1.createVariableFxVisualizationSettingsPreset(this);
        this._SafeStr_14482 = param1.createVariableFxValueRangePreset(this);
        this._SafeStr_14483 = param1.createVariableFxVisibilitySettingsPreset(this);
        this._SafeStr_14484 = param1.createVariableFxAdvancedRangePreset(this);
        if (_loc4_ != null) {
            param3.addElements(_loc4_);
        }
        param3.addElements(this._SafeStr_14481, this._SafeStr_14482, this._SafeStr_14483, this._SafeStr_14484);
        this._SafeStr_14485 = param1.createNumberInput(new NumberInputParam(0, -2147483648, 2147483647, -1));
        let _loc5_: TextParam = new TextParam(1);
        _loc5_.textColor = param2.softTextColor;
        param3.addElements(param1.createSection("${wiredfurni.params.variablefx.stack_order}", param1.createSimpleListView(true, [param1.createText("${wiredfurni.params.variablefx.stack_order.info}", _loc5_), this._SafeStr_14485]), SectionParam.COLLAPSED));
    }

    protected createTopInfoPreset(param1: PresetManager): WiredUIPreset {
        return null;
    }

    public override onEditStart(param1: Triggerable): void {
        this._state = new VariableFxEditorState();
        this._state.categoryId = this.categoryId;
        this.readIntParams(param1.intParams, this._state);
        this.readStringParam(param1, this._state);
        this._state.overrideMinVariableId = stringOrNull(param1.variableIds[0]);
        this._state.overrideMaxVariableId = stringOrNull(param1.variableIds[1]);
        this._state.audienceVariableId = stringOrNull(param1.variableIds[2]);
        this._state.sanitize();
        if (this._SafeStr_14481 != null) {
            this._SafeStr_14481.init(this._state);
            this._SafeStr_14482.init(this._state);
            this._SafeStr_14483.init(this._state, param1.wiredContext.roomVariablesList);
            this._SafeStr_14484.init(this._state, param1.wiredContext.roomVariablesList);
            this._SafeStr_14485.value = this._state.stackOrder;
        }
    }

    public override onEditEnd(): void {
        super.onEditEnd();
        if (this._SafeStr_14483 != null) {
            this._SafeStr_14483.closePopups();
        }
    }

    public override readIntParamsFromForm(): any[] {
        let _loc2_: VariableFxEditorState = this.currentState();
        let _loc1_: any[] = [];
        this.writeIntParams(_loc1_, _loc2_);
        return _loc1_;
    }

    protected readIntParams(param1: any[], param2: VariableFxEditorState): void {
        param2.sourceType = param1[0] | 0;
        param2.visibility = param1[1] | 0;
        param2.showMode = param1[2] | 0;
        param2._SafeStr_14486 = param1[3] | 0;
        param2.showOnMouseHover = param1[4] != 0;
        param2.showDuration = param1[5] | 0;
        param2.styleId = param1[6] | 0;
        param2.colorId = param1[7] | 0;
        param2._SafeStr_14487 = param1[8] | 0;
        param2.rendererId = param1[9] | 0;
        param2.defaultMinValue = param1[11] | 0;
        param2.defaultMaxValue = param1[13] | 0;
        param2.overrideMinEnabled = param1[14] != 0;
        param2.overrideMaxEnabled = param1[15] != 0;
        param2.overrideMinTarget = param1[16] | 0;
        param2.overrideMaxTarget = param1[17] | 0;
        param2.audienceVariableValue = param1[19] | 0;
        param2.segments = param1[20] | 0;
        param2.stackOrder = param1[22] | 0;
    }

    protected writeIntParams(param1: any[], param2: VariableFxEditorState): void {
        param1.push(param2.sourceType);
        param1.push(param2.visibility);
        param1.push(param2.showMode);
        param1.push(param2._SafeStr_14486);
        param1.push(param2.showOnMouseHover ? 1 : 0);
        param1.push(param2.showDuration);
        param1.push(param2.styleId);
        param1.push(param2.colorId);
        param1.push(param2._SafeStr_14487);
        param1.push(param2.rendererId);
        Util.pushIntAsLong(param1, param2.defaultMinValue);
        Util.pushIntAsLong(param1, param2.defaultMaxValue);
        param1.push(param2.overrideMinEnabled ? 1 : 0);
        param1.push(param2.overrideMaxEnabled ? 1 : 0);
        param1.push(param2.overrideMinTarget);
        param1.push(param2.overrideMaxTarget);
        Util.pushIntAsLong(param1, param2.audienceVariableValue);
        param1.push(param2.segments);
        param1.push(0);
        param1.push(param2.stackOrder);
    }

    public override readVariableIdsFromForm(): any[] {
        let _loc1_: VariableFxEditorState = this.currentState(true);
        return [_loc1_.overrideMinVariableId, _loc1_.overrideMaxVariableId, _loc1_.audienceVariableId];
    }

    public override readStringParamFromForm(): string {
        let _loc1_: VariableFxEditorState = this.currentState();
        return this.writeStringParam(_loc1_);
    }

    protected readStringParam(param1: Triggerable, param2: VariableFxEditorState): void {
    }

    protected writeStringParam(param1: VariableFxEditorState): string {
        return "";
    }

    public override validate(): string {
        if (this._state != null && VariableFxEditorMetadata.categoryUsesValueRange(this._state.categoryId) && this._state.defaultMaxValue <= this._state.defaultMinValue) {
            return this.roomEvents.localization.getLocalization("wiredfurni.error.variable_fx.value_range", "Maximum value must be greater than minimum value.");
        }
        return null;
    }

    public variableFxStateChanged(param1: VariableFxEditorState, param2: boolean = true): void {
        this._state = param1;
        if (this._SafeStr_14481 == null) {
            return;
        }
        if (param2) {
            this._SafeStr_14481.refreshPreview();
        }
    }

    protected currentState(param1: boolean = false): VariableFxEditorState {
        if (this._SafeStr_14481 != null) {
            this._SafeStr_14481.applyToState(this._state);
            this._SafeStr_14482.applyToState(this._state);
            this._SafeStr_14483.applyToState(this._state);
            this._SafeStr_14484.applyToState(this._state, param1);
            this._state.stackOrder = this._SafeStr_14485.value;
            this._state.sanitize();
        }
        return this._state;
    }

    public override get allowScrolling(): boolean {
        return true;
    }

    get [_SafeCls_6087](): true {
        return true;
    }
}
