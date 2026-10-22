import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { VariablePickerPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/VariablePickerPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredVariableType } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariableType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { LinkDataframeCodec } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LinkDataframeCodec';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class LinkDataframeReceiveRowPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::LinkDataframeReceiveRowPreset'); }

    declare private _key: TextInputPreset;

    declare private _SafeStr_14376: DropdownPreset;

    declare private _placeholder: TextInputPreset;

    declare private _SafeStr_14377: SimpleListViewPreset;

    declare private _variable: VariablePickerPreset;

    declare private _SafeStr_14378: SimpleListViewPreset;

    declare private _content: SimpleListViewPreset;

    declare private _SafeStr_2848: SectionPreset;

    declare private _SafeStr_7039: string;

    declare private _SafeStr_4834: boolean;
    static { (this.prototype as any)._SafeStr_4834 = false; }

    declare private _SafeStr_4407: (...args: any[]) => any;

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: (...args: any[]) => any) {
        super(param1, param2, param3);
        this._SafeStr_4407 = param5;
        this._key = param2.createTextInput(new TextInputParam("", 40, null, -1, null, true, null, false));
        this._SafeStr_14376 = param2.createDropdown(new DropdownParam("", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.link.destination.placeholder}"), new ExpandableDropdownOption(1, "${wiredfurni.params.link.destination.variable}")]), this.onKindChanged));
        this._placeholder = param2.createTextInput(new TextInputParam("", 40, null, -1, null, true, null, false));
        this._variable = param2.createVariablePicker(LinkDataframeReceiveRowPreset.variableFilter);
        this._variable.window.height = this._placeholder.window.height;
        let _loc9_: TextPreset = this.createLabel("${wiredfurni.params.link.key}");
        let _loc8_: TextPreset = this.createLabel("${wiredfurni.params.link.placeholder}");
        let _loc7_: TextPreset = this.createLabel("${wiredfurni.params.link.capture_variable}");
        let _loc6_: number = Math.max(_loc9_.width, _loc8_.width, _loc7_.width) | 0;
        _loc9_.width = _loc8_.width = _loc7_.width = _loc6_;
        this._SafeStr_14377 = param2.createSimpleListView(false, [_loc8_, this._placeholder]);
        this._SafeStr_14378 = param2.createSimpleListView(false, [_loc7_, this._variable]);
        this._content = param2.createSimpleListView(true, [param2.createSimpleListView(false, [_loc9_, this._key, this._SafeStr_14376]), this._SafeStr_14377, this._SafeStr_14378]);
        this._SafeStr_2848 = param2.createSection(this.localizations.getLocalizationWithParams("wiredfurni.params.link.row", "", "number", param4 + 1), this._content);
        this.updateKind();
    }

    private static variableFilter(param1: WiredVariable): boolean {
        return param1.variableType == WiredVariableType._SafeStr_7398 && param1.variableTarget == -20 && param1.hasValue && param1.canCreateAndDelete && param1.canWriteValue;
    }

    private createLabel(param1: string): TextPreset {
        let _loc2_: TextPreset = this._presetManager.createText(param1, new TextParam(0));
        _loc2_.window.y = this._SafeStr_2144.namedInputOffset;
        return _loc2_;
    }

    public initialize(param1: string, param2: string, param3: number, param4: string, param5: VariableListBase): void {
        this._SafeStr_4834 = true;
        this._key.text = param1;
        this._placeholder.text = param2;
        this._SafeStr_7039 = param4;
        this._SafeStr_14376.selectedId = param3;
        this._variable.init(param5, param4, -20);
        this._SafeStr_4834 = false;
        this.updateKind();
    }

    public get key(): string {
        return LinkDataframeCodec.normalizeKey(this._key.text);
    }

    public get kind(): number {
        return this._SafeStr_14376.selectedId;
    }

    public get text(): string {
        return this.kind == 0 ? this._placeholder.text.toLowerCase() : "";
    }

    public get variableId(): string {
        return this.kind == 1 && this._variable.selected != null ? this._variable.selected.variableId : this._SafeStr_7039;
    }

    public finalizeVariable(): void {
        if (this.kind == 1) {
            this._SafeStr_7039 = this._variable.finalizeSelection;
        }
    }

    public get validationError(): string {
        let _loc1_: string = LinkDataframeCodec.keyError(this._key.text);
        if (_loc1_ != null) {
            return _loc1_;
        }
        if (this.kind == 0) {
            return LinkDataframeCodec.placeholderError(this.text);
        }
        if (this.kind != 1) {
            return "wiredfurni.error.link.invalid_dataframe";
        }
        if (this._variable.selected == null || !LinkDataframeReceiveRowPreset.variableFilter(this._variable.selected)) {
            return "wiredfurni.error.link.invalid_capture_variable";
        }
        return null;
    }

    private onKindChanged = (param1: ExpandableDropdownOption): void => {
        if (this._SafeStr_4834 || this._content == null) {
            return;
        }
        if (this._variable.selected != null) {
            this._SafeStr_7039 = this._variable.selected.variableId;
        }
        this.updateKind();
        this._SafeStr_4407();
    };

    private updateKind(): void {
        this._SafeStr_14377.visible = this.kind == 0;
        this._SafeStr_14378.visible = this.kind == 1;
        this._content.resize();
    }

    public override resizeToWidth(param1: number): void {
        super.resizeToWidth(param1);
        this._SafeStr_2848.resizeToWidth(param1);
    }

    public override get window(): IWindow {
        return this._SafeStr_2848.window;
    }

    protected override get childPresets(): any[] {
        return [this._SafeStr_2848];
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        super.dispose();
        this._key = null;
        this._SafeStr_14376 = null;
        this._placeholder = null;
        this._SafeStr_14377 = null;
        this._variable = null;
        this._SafeStr_14378 = null;
        this._content = null;
        this._SafeStr_2848 = null;
        this._SafeStr_4407 = null;
    }
}
