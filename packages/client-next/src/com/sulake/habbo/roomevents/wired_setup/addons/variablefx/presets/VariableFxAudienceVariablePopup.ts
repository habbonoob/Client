import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IDesktopWindow } from '@/com/sulake/core/window/components/IDesktopWindow';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { ButtonRowPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonRowPreset';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { CheckboxOptionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxOptionPreset';
import type { NamedNumberInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedNumberInputPreset';
import type { FramePreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/main_layout/FramePreset';
import type { PaddedContainerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/PaddedContainerPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { NumberInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/NumberInputParam';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class VariableFxAudienceVariablePopup extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx.presets::VariableFxAudienceVariablePopup'); }

    private static readonly WIDTH: number = 300;
    private static readonly DESKTOP_WINDOW_LAYER: number = 1;

    declare private _SafeStr_14632: (...args: any[]) => any;

    declare private _SafeStr_4202: boolean;
    static { (this.prototype as any)._SafeStr_4202 = false; }

    declare private _framePreset: FramePreset;

    declare private _SafeStr_14633: VariablePickerPreset;

    declare private _selectValueGroup: CheckboxGroupPreset;

    declare private _SafeStr_14634: CheckboxOptionPreset;

    declare private _SafeStr_14635: NamedNumberInputPreset;

    declare private _SafeStr_2570: ButtonPreset;

    declare private _SafeStr_3902: ButtonPreset;

    declare private _SafeStr_5514: ButtonRowPreset;

    declare private _listPreset: SimpleListViewPreset;

    declare private _SafeStr_14636: PaddedContainerPreset;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_14632 = param4;
        this._SafeStr_14633 = param2.createVariablePicker(VariableFxAudienceVariablePopup.variableSelectionFilter, this.onVariableSelected);
        this._selectValueGroup = param2.createCheckboxGroup([new CheckboxOptionParam("${wiredfurni.params.variablefx.audience_popup.select_value}", 0)], this.onSelectValueChanged);
        this._SafeStr_14634 = this._selectValueGroup._SafeStr_2119(0);
        this._SafeStr_14635 = param2.createNamedNumberInput(new NumberInputParam(0, -2147483648, 2147483647, 45, 0, false, true), "${wiredfurni.params.variablefx.audience_popup.value}");
        this._SafeStr_2570 = param2.createButton(this.loc("wiredfurni.params.variablefx.audience_popup.save"), this.onSaveClicked);
        this._SafeStr_3902 = param2.createButton(this.loc("cancel"), this.hide);
        this._SafeStr_5514 = param2.createButtonRow([this._SafeStr_2570, this._SafeStr_3902]);
        this._listPreset = param2.createSimpleListView(true, [this._SafeStr_14633, this._selectValueGroup, this._SafeStr_14635]);
        this._listPreset.spacing = param3.genericVerticalSpacing;
        this._SafeStr_14636 = param2.createPaddedContainerPreset(this._listPreset, 8, 8, 8, 8);
        this._framePreset = param2.createFramePreset([this._SafeStr_14636, this._SafeStr_5514], this.hide);
        this._framePreset.title = this.loc("wiredfurni.params.variablefx.audience_popup.title");
        this._framePreset.resizeToWidth(300);
        this._framePreset.window.visible = false;
    }

    private static variableSelectionFilter(param1: WiredVariable): boolean {
        return true;
    }

    public open(param1: VariableListBase, param2: string, param3: boolean, param4: number): void {
        this._SafeStr_4202 = true;
        this._SafeStr_14633.init(param1, param2, WiredInputSourcePicker.USER_SOURCE);
        this._SafeStr_14634.selected = param3;
        this._SafeStr_14635.value = param4;
        this._SafeStr_4202 = false;
        this.refreshValueControls();
        this.show();
    }

    private show(): void {
        let _loc1_: IDesktopWindow = null;
        if (this._framePreset.window.parent == null) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            _loc1_.addChild(this._framePreset.window);
        }
        this._framePreset.window.visible = true;
        this._framePreset.window.center();
        this._framePreset.window.activate();
    }

    public hide = (): void => {
        let _loc1_: IDesktopWindow = null;
        if (this._framePreset.window.parent != null) {
            _loc1_ = this._roomEvents.windowManager.getDesktop(1);
            _loc1_.removeChild(this._framePreset.window);
        }
        this._framePreset.window.visible = false;
    };

    private onSaveClicked = (): void => {
        let _loc1_: WiredVariable = this._SafeStr_14633.selected;
        if (_loc1_ == null) {
            return;
        }
        if (this._SafeStr_14632 != null) {
            this._SafeStr_14632(this._SafeStr_14633.finalizeSelection, this._SafeStr_14634.selected && _loc1_.hasValue, this._SafeStr_14635.value);
        }
        this.hide();
    };

    private onVariableSelected = (param1: WiredVariable): void => {
        if (this._SafeStr_4202) {
            return;
        }
        this.refreshValueControls();
    };

    private onSelectValueChanged = (param1: number, param2: boolean): void => {
        if (this._SafeStr_4202) {
            return;
        }
        this.refreshValueControls();
    };

    private refreshValueControls(): void {
        let _loc1_: WiredVariable = this._SafeStr_14633.selected;
        let _loc2_: boolean = _loc1_ != null && _loc1_.hasValue;
        if (!_loc2_ && this._SafeStr_14634.selected) {
            this._SafeStr_4202 = true;
            this._SafeStr_14634.selected = false;
            this._SafeStr_4202 = false;
        }
        this._SafeStr_14634.disabled = !_loc2_;
        this._SafeStr_14635.disabled = !_loc2_ || !this._SafeStr_14634.selected;
        this._SafeStr_2570.disabled = _loc1_ == null;
    }

    public override get window(): IWindow {
        return this._framePreset.window;
    }

    protected override get childPresets(): any[] {
        return [this._framePreset];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this.hide();
        super.dispose();
        this._SafeStr_14632 = null;
        this._framePreset = null;
        this._SafeStr_14633 = null;
        this._selectValueGroup = null;
        this._SafeStr_14634 = null;
        this._SafeStr_14635 = null;
        this._SafeStr_2570 = null;
        this._SafeStr_3902 = null;
        this._SafeStr_5514 = null;
        this._listPreset = null;
        this._SafeStr_14636 = null;
    }
}
