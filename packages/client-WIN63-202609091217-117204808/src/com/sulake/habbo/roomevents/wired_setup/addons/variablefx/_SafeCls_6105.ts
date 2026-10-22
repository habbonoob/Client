import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { _SafeCls_6107 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/_SafeCls_6107';
import type { VariableFxAdvancedRangePreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxAdvancedRangePreset';
import type { VariableFxValueRangePreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxValueRangePreset';
import type { VariableFxVisibilitySettingsPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxVisibilitySettingsPreset';
import type { VariableFxVisualizationSettingsPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxVisualizationSettingsPreset';
import type { SourceTypePickedListener } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/SourceTypePickedListener';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { Util } from '@/com/sulake/habbo/roomevents/Util';
import { _SafeCls_6086 } from '@/com/sulake/habbo/roomevents/wired_setup/_SafeCls_6086';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/_SafeCls_6106';
import { VariableFxEditorMetadata } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorMetadata';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { SourceTypeSelectorParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SourceTypeSelectorParam';

export class _SafeCls_6105 extends DefaultAddonType implements _SafeCls_6086, SourceTypePickedListener, _SafeCls_6107 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::_SafeCls_6105'); }

    declare protected _state: _SafeCls_6106;

    declare private _SafeStr_14623: VariableFxVisualizationSettingsPreset;

    declare private _SafeStr_14624: VariableFxValueRangePreset;

    declare private _SafeStr_14625: VariableFxVisibilitySettingsPreset;

    declare private _SafeStr_14626: VariableFxAdvancedRangePreset;

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
        if (this._SafeStr_14625 != null) {
            this._SafeStr_14625.refreshForState(this._state);
        }
        if (this._SafeStr_14626 != null) {
            this._SafeStr_14626.refreshForSourceType(this._state);
        }
        this.variableFxStateChanged(this._state, false);
        if (_loc2_) {
            this.roomEvents.wiredCtrl.resizeFrame();
        }
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        let _loc4_: WiredUIPreset = this.createTopInfoPreset(param1);
        this._SafeStr_14623 = param1.createVariableFxVisualizationSettingsPreset(this);
        this._SafeStr_14624 = param1.createVariableFxValueRangePreset(this);
        this._SafeStr_14625 = param1.createVariableFxVisibilitySettingsPreset(this);
        this._SafeStr_14626 = param1.createVariableFxAdvancedRangePreset(this);
        if (_loc4_ != null) {
            param3.addElements(_loc4_);
        }
        param3.addElements(this._SafeStr_14623, this._SafeStr_14624, this._SafeStr_14625, this._SafeStr_14626);
    }

    protected createTopInfoPreset(param1: PresetManager): WiredUIPreset {
        return null;
    }

    public override onEditStart(param1: Triggerable): void {
        this._state = new _SafeCls_6106();
        this._state.categoryId = this.categoryId;
        this.readIntParams(param1.intParams, this._state);
        this.readStringParam(param1, this._state);
        this._state.overrideMinVariableId = stringOrNull(param1.variableIds[0]);
        this._state.overrideMaxVariableId = stringOrNull(param1.variableIds[1]);
        this._state.audienceVariableId = stringOrNull(param1.variableIds[2]);
        this._state.sanitize();
        if (this._SafeStr_14623 != null) {
            this._SafeStr_14623.init(this._state);
            this._SafeStr_14624.init(this._state);
            this._SafeStr_14625.init(this._state, param1.wiredContext.roomVariablesList);
            this._SafeStr_14626.init(this._state, param1.wiredContext.roomVariablesList);
        }
    }

    public override onEditEnd(): void {
        super.onEditEnd();
        if (this._SafeStr_14625 != null) {
            this._SafeStr_14625.closePopups();
        }
    }

    public override readIntParamsFromForm(): any[] {
        let _loc2_: _SafeCls_6106 = this.currentState();
        let _loc1_: any[] = [];
        this.writeIntParams(_loc1_, _loc2_);
        return _loc1_;
    }

    protected readIntParams(param1: any[], param2: _SafeCls_6106): void {
        param2.sourceType = param1[0] | 0;
        param2.visibility = param1[1] | 0;
        param2.showMode = param1[2] | 0;
        param2._SafeStr_14413 = param1[3] | 0;
        param2.showOnMouseHover = param1[4] != 0;
        param2.showDuration = param1[5] | 0;
        param2.styleId = param1[6] | 0;
        param2.colorId = param1[7] | 0;
        param2._SafeStr_14430 = param1[8] | 0;
        param2.rendererId = param1[9] | 0;
        param2.defaultMinValue = param1[11] | 0;
        param2.defaultMaxValue = param1[13] | 0;
        param2.overrideMinEnabled = param1[14] != 0;
        param2.overrideMaxEnabled = param1[15] != 0;
        param2.overrideMinTarget = param1[16] | 0;
        param2.overrideMaxTarget = param1[17] | 0;
        param2.audienceVariableValue = param1[19] | 0;
        param2.segments = param1[20] | 0;
    }

    protected writeIntParams(param1: any[], param2: _SafeCls_6106): void {
        param1.push(param2.sourceType);
        param1.push(param2.visibility);
        param1.push(param2.showMode);
        param1.push(param2._SafeStr_14413);
        param1.push(param2.showOnMouseHover ? 1 : 0);
        param1.push(param2.showDuration);
        param1.push(param2.styleId);
        param1.push(param2.colorId);
        param1.push(param2._SafeStr_14430);
        param1.push(param2.rendererId);
        Util.pushIntAsLong(param1, param2.defaultMinValue);
        Util.pushIntAsLong(param1, param2.defaultMaxValue);
        param1.push(param2.overrideMinEnabled ? 1 : 0);
        param1.push(param2.overrideMaxEnabled ? 1 : 0);
        param1.push(param2.overrideMinTarget);
        param1.push(param2.overrideMaxTarget);
        Util.pushIntAsLong(param1, param2.audienceVariableValue);
        param1.push(param2.segments);
    }

    public override readVariableIdsFromForm(): any[] {
        let _loc1_: _SafeCls_6106 = this.currentState(true);
        return [_loc1_.overrideMinVariableId, _loc1_.overrideMaxVariableId, _loc1_.audienceVariableId];
    }

    public override readStringParamFromForm(): string {
        let _loc1_: _SafeCls_6106 = this.currentState();
        return this.writeStringParam(_loc1_);
    }

    protected readStringParam(param1: Triggerable, param2: _SafeCls_6106): void {
    }

    protected writeStringParam(param1: _SafeCls_6106): string {
        return "";
    }

    public override validate(): string {
        if (this._state != null && VariableFxEditorMetadata.categoryUsesValueRange(this._state.categoryId) && this._state.defaultMaxValue <= this._state.defaultMinValue) {
            return this.roomEvents.localization.getLocalization("wiredfurni.error.variable_fx.value_range", "Maximum value must be greater than minimum value.");
        }
        return null;
    }

    public variableFxStateChanged(param1: _SafeCls_6106, param2: boolean = true): void {
        this._state = param1;
        if (this._SafeStr_14623 == null) {
            return;
        }
        if (param2) {
            this._SafeStr_14623.refreshPreview();
        }
    }

    protected currentState(param1: boolean = false): _SafeCls_6106 {
        if (this._SafeStr_14623 != null) {
            this._SafeStr_14623.applyToState(this._state);
            this._SafeStr_14624.applyToState(this._state);
            this._SafeStr_14625.applyToState(this._state);
            this._SafeStr_14626.applyToState(this._state, param1);
            this._state.sanitize();
        }
        return this._state;
    }

    get [_SafeCls_6086](): true {
        return true;
    }
}
