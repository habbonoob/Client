import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { valuesOf } from '@habbo-pixi/runtime/lang/iterate';
import { Dictionary } from '@habbo-pixi/runtime/utils/Dictionary';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { SharedVariableList } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/params/SharedVariableList';
import type { SharedVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/SharedVariable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { VariableNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/VariableNameSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredVariable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/WiredVariable';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { NewDefaultVariableType } from '@/com/sulake/habbo/roomevents/wired_setup/variables/NewDefaultVariableType';
import { VariableCodes } from '@/com/sulake/habbo/roomevents/wired_setup/variables/VariableCodes';

export class ReferenceVariable extends NewDefaultVariableType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.variables::ReferenceVariable'); }

    constructor() {
        super();
    }

    declare private _variableName: VariableNameSection;

    declare private _roomDropdown: DropdownPreset;

    declare private _variableDropdown: DropdownPreset;

    declare private _SafeStr_4763: CheckboxGroupPreset;

    declare private _SafeStr_4324: WiredVariable;

    declare private _rooms: any[];

    declare private _SafeStr_3346: Map<any, any>;

    declare private _SafeStr_4560: string[];

    declare private _SafeStr_5274: WiredVariable[];

    private _SafeStr_3163: number = -1;
    private _initialized_ReferenceVariable: boolean = false;

    public override get code(): number {
        return VariableCodes.REFERENCE_VARIABLE;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    protected override get variableNameSection(): VariableNameSection {
        return this._variableName;
    }

    public override readVariableIdsFromForm(): any[] {
        if (this._SafeStr_4560 == null) {
            return [WiredVariable._SafeStr_2375];
        }
        let _loc1_: number = this._variableDropdown.selectedId;
        if (_loc1_ < 0 || _loc1_ >= this._SafeStr_4560.length) {
            return [WiredVariable._SafeStr_2375];
        }
        return [this._SafeStr_4560[_loc1_]];
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: any[] = [];
        _loc1_.push(this._SafeStr_4763._SafeStr_2119(0).selected ? 1 : 0);
        return _loc1_;
    }

    public override onEditStart(param1: Triggerable): void {
        super.onEditStart(param1);
        let _loc4_: string = stringOrNull(param1.variableIds != null && param1.variableIds.length > 0 ? param1.variableIds[0] : WiredVariable._SafeStr_2375);
        let _loc3_: any = param1.intParams[0] != 0;
        this._SafeStr_4763._SafeStr_2119(0).selected = _loc3_;
        this._initialized_ReferenceVariable = false;
        let _loc2_: SharedVariableList = param1.wiredContext.referenceVariablesList;
        this.initRooms(_loc4_, _loc2_);
        this.refreshVariables(_loc4_);
        this._SafeStr_4324 = this.findVariableById(_loc4_);
        this.initialVariableName = param1.stringParam;
        this._initialized_ReferenceVariable = true;
        this.setEditable(_loc2_ != null);
    }

    public override readStringParamFromForm(): string {
        return this._variableName.variableName;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._variableName = param1.createVariableNameSection();
        this._roomDropdown = param1.createDropdown(new DropdownParam(this.l("variables.room_selection.tooltip"), null, this.onRoomSelected));
        let _loc5_: SectionPreset = param1.createSection(this.l("variables.room_selection"), this._roomDropdown);
        this._variableDropdown = param1.createDropdown(new DropdownParam(this.l("variables.variable_selection.tooltip"), null, this.onVariableSelected));
        let _loc6_: SectionPreset = param1.createSection(this.l("variables.variable_ref_selection"), this._variableDropdown);
        this._SafeStr_4763 = param1.createCheckboxGroup([new CheckboxOptionParam(this.l("variables.settings.read_only"))]);
        let _loc4_: SectionPreset = param1.createSection(this.l("variables.settings"), this._SafeStr_4763);
        param3.addElements(this._variableName, _loc5_, _loc6_, _loc4_);
    }

    private setEditable(param1: boolean): void {
        this._variableName.disabled = !param1;
        this._roomDropdown.disabled = !param1;
        this._variableDropdown.disabled = !param1;
        this._SafeStr_4763.disabled = !param1;
    }

    private initRooms(param1: string, param2: SharedVariableList): void {
        let room: any;
        let sharedVariable: SharedVariable;
        let roomOptions: ExpandableDropdownOption[];
        let i: number = 0;
        let variableId: string = param1;
        let context: SharedVariableList = param2;
        this._SafeStr_3346 = new Dictionary();
        this._rooms = [];
        let selectedRoom: any = null;
        let roomMap: Map<any, any> = new Dictionary();
        this._SafeStr_3163 = -1;
        if (context != null) {
            for (sharedVariable of context.sharedVariables ?? []) {
                if (!(roomMap.has(sharedVariable.roomId))) {
                    room = { "id": sharedVariable.roomId, "name": sharedVariable.roomName };
                    roomMap.set(sharedVariable.roomId, room);
                    this._rooms.push(room);
                } else {
                    room = roomMap.get(sharedVariable.roomId);
                }
                if (!(this._SafeStr_3346.has(sharedVariable.roomId))) {
                    this._SafeStr_3346.set(sharedVariable.roomId, []);
                }
                this._SafeStr_3346.get(sharedVariable.roomId).push(sharedVariable.wiredVariable);
                if (sharedVariable.wiredVariable.variableId == variableId) {
                    selectedRoom = room;
                }
            }
            this._rooms.sort((param1: any, param2: any): number => {
                    return param1.name.localeCompare(param2.name) | 0;
                });
        }
        if (selectedRoom != null) {
            this._SafeStr_3163 = selectedRoom.id | 0;
        }
        roomOptions = [];
        i = 0;
        while (i < this._rooms.length) {
            room = this._rooms[i];
            roomOptions.push(new ExpandableDropdownOption(room.id | 0, stringOrNull(room.name)));
            i += 1;
        }
        this._roomDropdown.reinit(roomOptions, this._SafeStr_3163);
    }

    private refreshVariables(param1: string): void {
        let _loc2_: any = undefined;
        let _loc5_: number = 0;
        this._SafeStr_4560 = [];
        this._SafeStr_5274 = [];
        let _loc3_: ExpandableDropdownOption[] = [];
        let _loc6_: any = -1;
        if (this._SafeStr_3346.has(this._SafeStr_3163)) {
            _loc2_ = this._SafeStr_3346.get(this._SafeStr_3163);
            _loc5_ = 0;
            for (const _loc4_ of valuesOf(_loc2_)) {
                _loc3_.push(new ExpandableDropdownOption(_loc5_, stringOrNull(_loc4_.variableName)));
                this._SafeStr_4560.push(stringOrNull(_loc4_.variableId));
                this._SafeStr_5274.push(_loc4_);
                if (_loc4_.variableId == param1) {
                    _loc6_ = _loc5_;
                }
                _loc5_++;
            }
        }
        this._variableDropdown.reinit(_loc3_, _loc6_ | 0);
    }

    private onRoomSelected = (param1: ExpandableDropdownOption): void => {
        if (!this._initialized_ReferenceVariable || param1 == null) {
            return;
        }
        if (this._SafeStr_3163 == param1.id) {
            return;
        }
        this._SafeStr_3163 = param1.id;
        this.refreshVariables(WiredVariable._SafeStr_2375);
        this.onVariableSelected(null);
    };

    private onVariableSelected = (param1: ExpandableDropdownOption): void => {
        if (!this._initialized_ReferenceVariable) {
            return;
        }
        let _loc3_: number = param1 != null ? param1.id : -1;
        let _loc2_: WiredVariable = _loc3_ >= 0 && _loc3_ < this._SafeStr_5274.length ? this._SafeStr_5274[_loc3_] : null;
        if (this._variableName.variableName.length == 0 || this._SafeStr_4324 != null && this._SafeStr_4324.variableName == this._variableName.variableName) {
            this._variableName.variableName = _loc2_ != null ? _loc2_.variableName : null;
        }
        this._SafeStr_4324 = _loc2_;
    };

    private findVariableById(param1: string): WiredVariable {
        let _loc2_: any;
        if (this._SafeStr_3346 == null) {
            return null;
        }
        for (const _loc3_ of this._SafeStr_3346?.values() ?? []) {
            for (_loc2_ of valuesOf(_loc3_)) {
                if (_loc2_.variableId == param1) {
                    return _loc2_;
                }
            }
        }
        return null;
    }
}
