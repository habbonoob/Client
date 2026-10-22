import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/_SafeCls_6106';
import type { _SafeCls_6107 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/_SafeCls_6107';
import type { VariableFxVariableOverrideRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/presets/VariableFxVariableOverrideRowPreset';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { VariableFxEditorMetadata } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorMetadata';
import { SectionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/SectionParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxAdvancedRangePreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxAdvancedRangePreset'); }

    declare private _SafeStr_2333: _SafeCls_6107;

    declare private _state: _SafeCls_6106;

    declare private _variables: VariableListBase;

    declare private _SafeStr_2848: SectionPreset;

    declare private _SafeStr_14631: SimpleListViewPreset;

    declare private _overrideMinPreset: VariableFxVariableOverrideRowPreset;

    declare private _overrideMaxPreset: VariableFxVariableOverrideRowPreset;

    private _sourceType: number = -2147483648;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: _SafeCls_6107) {
        super(param1, param2, param3);
        this._SafeStr_2333 = param4;
        this._overrideMinPreset = param2.createVariableFxVariableOverrideRowPreset(0, this.onRowChange);
        this._overrideMaxPreset = param2.createVariableFxVariableOverrideRowPreset(1, this.onRowChange);
        this._SafeStr_14631 = param2.createSimpleListView(true, [this._overrideMinPreset, this._overrideMaxPreset]);
        this._SafeStr_14631.spacing = param3.genericVerticalSpacing;
        this._SafeStr_2848 = param2.createSection("${wiredfurni.params.variablefx.advanced.range}", this._SafeStr_14631, SectionParam.COLLAPSED);
    }

    public init(param1: _SafeCls_6106, param2: VariableListBase): void {
        this._state = param1;
        this._variables = param2;
        this.refreshForSourceType(param1);
    }

    public applyToState(param1: _SafeCls_6106, param2: boolean = false): void {
        if (this.visible) {
            this._overrideMinPreset.applyToState(param1, param2);
            this._overrideMaxPreset.applyToState(param1, param2);
        }
    }

    public refreshForSourceType(param1: _SafeCls_6106): boolean {
        let _loc3_: boolean = this.visible;
        let _loc2_: number = this._sourceType;
        this._sourceType = param1.sourceType;
        this.visible = VariableFxEditorMetadata.categoryUsesValueRange(param1.categoryId);
        if (!this.visible) {
            return _loc3_ != this.visible;
        }
        this.refreshRows(param1);
        return _loc3_ != this.visible || _loc2_ != this._sourceType;
    }

    private refreshRows(param1: _SafeCls_6106): void {
        this._overrideMinPreset.init(this._variables, param1);
        this._overrideMaxPreset.init(this._variables, param1);
    }

    private onRowChange = (): void => {
        this.applyToState(this._state);
        this._state.sanitize();
        this._SafeStr_2333.variableFxStateChanged(this._state, false);
    };

    public override get window(): IWindow {
        return this._SafeStr_2848.window;
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2848.resizeToWidth(param1);
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2848];
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
        this._SafeStr_14631 = null;
        this._overrideMinPreset = null;
        this._overrideMaxPreset = null;
    }
}
