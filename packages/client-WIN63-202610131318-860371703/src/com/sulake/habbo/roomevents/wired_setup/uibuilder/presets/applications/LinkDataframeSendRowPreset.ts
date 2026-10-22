import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IWindow } from '@/com/sulake/core/window/IWindow';
import type { VariableListBase } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/VariableListBase';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ValueOrVariableSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/ValueOrVariableSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { WiredInputSourcePicker } from '@/com/sulake/habbo/roomevents/wired_setup/inputsources/WiredInputSourcePicker';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { LinkDataframeCodec } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/applications/LinkDataframeCodec';
import { WiredUIPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/WiredUIPreset.group';

export class LinkDataframeSendRowPreset extends WiredUIPreset {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.uibuilder.presets.applications::LinkDataframeSendRowPreset'); }

    declare private _key: TextInputPreset;

    declare private _mode: DropdownPreset;

    declare private _value: ValueOrVariableSection;

    declare private _SafeStr_14369: SimpleListViewPreset;

    declare private _index: number;
    static { (this.prototype as any)._index = 0; }

    declare private _message: TextInputPreset;

    declare private _SafeStr_14370: SimpleListViewPreset;

    declare private _content: SimpleListViewPreset;

    declare private _SafeStr_2848: SectionPreset;

    declare private _SafeStr_7039: string;

    declare private _SafeStr_4407: (...args: any[]) => any;

    declare private _SafeStr_4834: boolean;
    static { (this.prototype as any)._SafeStr_4834 = false; }

    constructor(param1: HabboUserDefinedRoomEvents, param2: PresetManager, param3: WiredStyle, param4: number, param5: (...args: any[]) => any, param6: any[]) {
        super(param1, param2, param3);
        this._index = param4;
        this._SafeStr_4407 = param5;
        this._key = param2.createTextInput(new TextInputParam("", 40, null, -1, null, true, null, false));
        this._mode = param2.createDropdown(new DropdownParam("", Array.from([new ExpandableDropdownOption(0, "${wiredfurni.params.link.source.number}"), new ExpandableDropdownOption(2, "${wiredfurni.params.link.source.variable_text}"), new ExpandableDropdownOption(3, "${wiredfurni.params.link.source.message}")]), this.onModeChanged));
        this._value = param2.createValueOrVariableSection(param4, param6, "", -2147483648, 2147483647, false, 0, this.variableSelectionFilter);
        let _loc10_: TextPreset = this.createLabel("${wiredfurni.params.link.key}");
        let _loc7_: TextPreset = this.createLabel("${wiredfurni.params.link.value}");
        let _loc9_: TextPreset = this.createLabel("${wiredfurni.params.link.message}");
        let _loc8_: number = Math.max(_loc10_.width, _loc7_.width, _loc9_.width) | 0;
        _loc10_.width = _loc7_.width = _loc9_.width = _loc8_;
        this._SafeStr_14369 = param2.createSimpleListView(false, [_loc7_, this._value]);
        this._message = param2.createTextInput(new TextInputParam("", 200));
        this._SafeStr_14370 = param2.createSimpleListView(false, [_loc9_, this._message]);
        this._content = param2.createSimpleListView(true, [param2.createSimpleListView(false, [_loc10_, this._key, this._mode]), this._SafeStr_14369, this._SafeStr_14370]);
        this._SafeStr_2848 = param2.createSection(this.localizations.getLocalizationWithParams("wiredfurni.params.link.row", "", "number", param4 + 1), this._content);
        this.updateMode();
    }

    private createLabel(param1: string): TextPreset {
        let _loc2_: TextPreset = this._presetManager.createText(param1, new TextParam(0));
        _loc2_.window.y = this._SafeStr_2144.namedInputOffset;
        return _loc2_;
    }

    public initialize(param1: string, param2: string, param3: number, param4: number, param5: number, param6: string, param7: VariableListBase): void {
        this._SafeStr_4834 = true;
        this._key.text = param1;
        this._SafeStr_7039 = param6;
        this._mode.selectedId = param3 == 1 ? 0 : param3;
        this._value.init(param7, param6, param5, param3 == 1 || param3 == 2 ? 1 : 0, param4);
        this._message.text = param2;
        this._SafeStr_4834 = false;
        this.updateMode();
    }

    public onEditInitialized(): void {
        this._value.onEditInitialized();
    }

    public hideDetachedWindows(): void {
        this._value.hideDetachedWindows();
    }

    public get key(): string {
        return LinkDataframeCodec.normalizeKey(this._key.text);
    }

    public get mode(): number {
        return this._mode.selectedId == 0 ? (this._value.option == 1 ? 1 : 0) : this._mode.selectedId;
    }

    public get target(): number {
        return this._value.target;
    }

    public set target(param1: number) {
        this._value.target = param1;
    }

    public get text(): string {
        return this.mode == 3 ? this._message.text : "";
    }

    public get literal(): number {
        return this._value.numberValue;
    }

    public isSourcePickingDisabled(): boolean {
        return this._value.isSourcePickingDisabled();
    }

    public get variableId(): string {
        if (this.mode == 2 && this._value.isEmpty) {
            return WiredVariable._SafeStr_2375;
        }
        return this._value.selected?.variableId;
    }

    public finalizeVariable(): void {
        if (this.mode == 1 || this.mode == 2) {
            this._SafeStr_7039 = this._value.finalizeSelection;
        }
    }

    public get validationError(): string {
        let _loc1_: string = LinkDataframeCodec.keyError(this._key.text);
        if (_loc1_ != null) {
            return this.localizations.getLocalization(_loc1_);
        }
        if (this.mode < 0 || this.mode > 3 || !LinkDataframeCodec.isTarget(this.target)) {
            return this.localizations.getLocalization("wiredfurni.error.link.invalid_dataframe");
        }
        if (this.mode == 3 && LinkDataframeCodec.utf8Length(this._message.text) > 200) {
            return this.localizations.getLocalizationWithParams("wiredfurni.error.too_much_text", "", "limit", 200);
        }
        if (this.mode == 3 || this.mode == 2 && this._value.isEmpty) {
            return null;
        }
        if (this._value.validationError != null) {
            return this._value.validationError;
        }
        if ((this.mode == 1 || this.mode == 2) && (this._value.option != 1 || this._value.selected == null || !this._value.selected.hasValue || this._value.selected.variableTarget != this.target)) {
            return this.localizations.getLocalization("wiredfurni.params.link.select_source_variable");
        }
        return null;
    }

    private onModeChanged = (param1: ExpandableDropdownOption): void => {
        if (this._SafeStr_4834 || this._content == null) {
            return;
        }
        this.hideDetachedWindows();
        if (this._value.variableOnlyOrEmpty && this._value.isEmpty) {
            this._SafeStr_7039 = WiredVariable._SafeStr_2375;
        } else if (this._value.selected != null) {
            this._SafeStr_7039 = this._value.selected.variableId;
        }
        this.updateMode();
        if (this.mode != 3 && this._value.validationError != null) {
            this._value.text = this.mode == 2 ? "" : "0";
        }
        this._roomEvents.wiredCtrl.updateSourceContainer(WiredInputSourcePicker.MERGED_SOURCE, this._index);
        this._SafeStr_4407();
    };

    private variableSelectionFilter = (param1: WiredVariable): boolean => {
        return this._mode.selectedId != 2 || param1.hasTextConnector;
    };

    private updateMode(): void {
        this._value.variableOnlyOrEmpty = this.mode == 2;
        this._SafeStr_14369.visible = this.mode != 3;
        this._SafeStr_14370.visible = this.mode == 3;
        if (!this._SafeStr_14369.visible) {
            this._value.hideDetachedWindows();
        }
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
        this.hideDetachedWindows();
        super.dispose();
        this._key = null;
        this._mode = null;
        this._value = null;
        this._SafeStr_14369 = null;
        this._message = null;
        this._SafeStr_14370 = null;
        this._content = null;
        this._SafeStr_2848 = null;
        this._SafeStr_4407 = null;
    }
}
