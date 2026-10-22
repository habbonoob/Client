import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { SharedGlobalPlaceholder } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/SharedGlobalPlaceholder';
import type { SharedGlobalPlaceholderList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/SharedGlobalPlaceholderList';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { NamedDropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/combinations/NamedDropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { PlaceholderNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/applications/PlaceholderNameSection';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';

export class GlobalPlaceholderAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::GlobalPlaceholderAddon'); }

    declare private _SafeStr_3339: PlaceholderNameSection;

    declare private _SafeStr_3506: RadioGroupPreset;

    declare private _SafeStr_4627: TextInputPreset;

    declare private _roomDropdown: NamedDropdownPreset;

    declare private _placeholderDropdown: NamedDropdownPreset;

    declare private _SafeStr_3355: SharedGlobalPlaceholderList;

    declare private _SafeStr_3754: string;

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.GLOBAL_PLACEHOLDER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_3339 = param1.createPlaceholderNameSection(this.l("texts.placeholder_name"), "$");
        this._SafeStr_4627 = param1.createTextInput(new TextInputParam("", 100));
        this._roomDropdown = param1.createNamedDropdown(new DropdownParam(this.l("room_selection.tooltip"), null, this.initPlaceholdersForRoom), this.l("room_selection"));
        this._placeholderDropdown = param1.createNamedDropdown(new DropdownParam(this.l("placeholder_selection.tooltip"), null, this.onPlaceholderSelected), this.l("placeholder_selection"));
        this._SafeStr_3506 = param1.createRadioGroup([new RadioButtonParam(0, this.l("from_value"), null, this._SafeStr_4627), new RadioButtonParam(1, this.l("from_another_room"), null, param1.createSimpleListView(true, [this._roomDropdown, this._placeholderDropdown]))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("choose_type"), this._SafeStr_3506);
        param3.addElements(this._SafeStr_3339, _loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: string = null;
        let _loc5_: number = 0;
        this._SafeStr_3754 = null;
        let _loc4_: number = param1.getInt(0);
        let _loc3_: string = param1.getString(0);
        this._SafeStr_3339.placeholderName = _loc3_;
        this._SafeStr_3355 = param1.wiredContext.referencePlaceholderList;
        this._SafeStr_3506.setOptionDisabled(1, this._SafeStr_3355 == null);
        this._SafeStr_3506.setOptionDisabled(0, this._SafeStr_3355 == null && _loc4_ == 1);
        this._SafeStr_3506.selected = _loc4_;
        this._roomDropdown.reset();
        this._placeholderDropdown.reset();
        if (_loc4_ == 0) {
            this._SafeStr_4627.text = param1.getString(1);
            if (this._SafeStr_3355 != null) {
                this._roomDropdown.reinit(this.findRooms(), -1);
            }
        } else {
            this._SafeStr_4627.text = "";
            _loc2_ = param1.getString(1);
            _loc5_ = param1.getInt(2);
            this._roomDropdown.reinit(this.findRooms(), _loc5_);
            this.initPlaceholdersForRoom(this._roomDropdown.selected, _loc2_);
            this._SafeStr_3754 = this._placeholderDropdown.selected?.displayString;
        }
    }

    private initPlaceholdersForRoom = (param1: ExpandableDropdownOption, param2: string = null): void => {
        if (param1 == null) {
            this._placeholderDropdown.reset();
            return;
        }
        let _loc4_: ExpandableDropdownOption[] = [];
        let _loc3_: number = -1;
        if (this._SafeStr_3355 != null) {
            for (const _loc5_ of this._SafeStr_3355.sharedPlaceholders ?? []) {
                if (_loc5_.roomId == param1.id) {
                    if (param2 != null && _loc5_.placeholderName == param2) {
                        _loc3_ = _loc4_.length | 0;
                    }
                    _loc4_.push(new ExpandableDropdownOption(_loc4_.length | 0, _loc5_.placeholderName));
                }
            }
        }
        this._placeholderDropdown.reinit(_loc4_, _loc3_);
    };

    private onPlaceholderSelected = (param1: ExpandableDropdownOption): void => {
        if (this._SafeStr_3339.placeholderName.length == 0 || this._SafeStr_3754 != null && this._SafeStr_3754 == this._SafeStr_3339.placeholderName) {
            this._SafeStr_3339.placeholderName = param1?.displayString;
        }
        this._SafeStr_3754 = this._placeholderDropdown.selected?.displayString;
    };

    private findRooms(): ExpandableDropdownOption[] {
        let placeholder: SharedGlobalPlaceholder;
        let options: Map<any, any> = new Dictionary();
        let result: ExpandableDropdownOption[] = [];
        if (this._SafeStr_3355 != null) {
            for (placeholder of this._SafeStr_3355.sharedPlaceholders ?? []) {
                if (!(options.has(placeholder.roomId))) {
                    result.push(new ExpandableDropdownOption(placeholder.roomId, placeholder.roomName));
                }
                options.set(placeholder.roomId, true);
            }
        }
        // the comparator's String parameters receive the options' string forms, as AS3 coerced them
        result.sort((a, b): number => ((param1: string, param2: string): number => {
             return param1.localeCompare(param2);
         })(String(a), String(b)));
        return result;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_3506.selected, 0, this._SafeStr_3506.selected == 0 ? 0 : this._roomDropdown.selectedId];
    }

    public override readStringParamFromForm(): string {
        let _loc1_: string = this._SafeStr_3339.placeholderName + "\t";
        if (this._SafeStr_3506.selected == 0) {
            _loc1_ += this._SafeStr_4627.text;
        } else if (this._placeholderDropdown.selected != null) {
            _loc1_ += this._placeholderDropdown.selected.displayString;
        }
        return _loc1_;
    }
}
