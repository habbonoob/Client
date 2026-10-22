import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';

export class UsersWithHanditem extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::UsersWithHanditem'); }

    private static readonly DEFAULT_CODES: any[] = [0, 2, 5, 7, 8, 9, 10, 27];

    constructor() {
        super();
    }

    declare private _handItemDropdown: DropdownPreset;

    declare private _SafeStr_6225: ButtonPreset;

    declare private _options: ExpandableDropdownOption[];

    public override get code(): number {
        return SelectorCodes.USERS_WITH_HANDITEM;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._options = this.createOptions(UsersWithHanditem.DEFAULT_CODES);
        this._handItemDropdown = param1.createDropdown(new DropdownParam(this.loc("wiredfurni.tooltip.handitem"), this._options));
        this._SafeStr_6225 = param1.createButton(this.l("capture.handitem"), this.captureHanditem);
        let _loc4_: SectionPreset = param1.createSection(this.l("handitem"), param1.createSimpleListView(true, [this._handItemDropdown, this._SafeStr_6225]));
        param3.addElements(_loc4_);
    }

    public override readIntParamsFromForm(): any[] {
        let _loc1_: number = this._handItemDropdown.selectedId;
        return [_loc1_ == -1 ? 0 : _loc1_];
    }

    public override onEditStart(param1: Triggerable): void {
        this.setSelectedHandItemByCode(param1.intParams[0] | 0);
    }

    private createOptions(param1: any[]): ExpandableDropdownOption[] {
        let _loc3_: ExpandableDropdownOption[] = [];
        for (const _loc2_ of param1 ?? []) {
            _loc3_.push(new ExpandableDropdownOption(_loc2_ | 0, "${handitem" + _loc2_ + "}"));
        }
        return _loc3_;
    }

    private ensureOptionExists(param1: number): void {
        let _loc4_: number = 0;
        if (param1 < 0) {
            return;
        }
        let _loc3_: boolean = false;
        for (const _loc2_ of this._options ?? []) {
            if (_loc2_.id == param1) {
                _loc3_ = true;
                break;
            }
        }
        if (!_loc3_) {
            this._options.push(new ExpandableDropdownOption(param1, "${handitem" + param1 + "}"));
        }
        let _loc5_: any = -1;
        _loc4_ = 0;
        while (_loc4_ < this._options.length) {
            if (this._options[_loc4_].id == param1) {
                _loc5_ = _loc4_;
            }
            _loc4_++;
        }
        this._handItemDropdown.reinit(this._options, _loc5_ | 0);
    }

    private setSelectedHandItemByCode(param1: number): void {
        this.ensureOptionExists(param1);
        this._handItemDropdown.selectedId = param1;
    }

    private captureHanditem = (): void => {
        let _loc1_: number = this.roomEvents.roomEngine.getRoomObject(this.roomEvents.roomSession.roomId, this.roomEvents.roomSession.ownUserRoomId, 100).getModel().getNumber("figure_carry_object") | 0;
        this.setSelectedHandItemByCode(_loc1_);
    };
}
