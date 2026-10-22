import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { GuildMembershipsMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/users/GuildMembershipsMessageEvent';
import type { HabboGroupEntryData } from '@/com/sulake/habbo/communication/messages/incoming/users/HabboGroupEntryData';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { RadioGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/RadioGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { GetGuildMembershipsMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/users/GetGuildMembershipsMessageComposer';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { DefaultSelectorType } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/DefaultSelectorType';
import { SelectorCodes } from '@/com/sulake/habbo/roomevents/wired_setup/selectors/SelectorCodes';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { RadioButtonParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/RadioButtonParam';

export class UsersInGroup extends DefaultSelectorType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.selectors::UsersInGroup'); }

    private static REQUEST_TIMEOUT: number = 5;

    declare private _SafeStr_4409: RadioGroupPreset;

    declare private _groupDropdown: DropdownPreset;

    declare private _guilds: any[];

    private _SafeStr_2480: number = -1;
    private _SafeStr_6472: number = 0;

    constructor() {
        super();
    }

    public override get code(): number {
        return SelectorCodes.USERS_IN_GROUP;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._groupDropdown = param1.createDropdown(new DropdownParam(this.loc("wiredfurni.tooltip.group"), []));
        this._SafeStr_4409 = param1.createRadioGroup([new RadioButtonParam(0, this.l("grouptype.0")), new RadioButtonParam(1, this.l("grouptype.1"), null, this._groupDropdown)]);
        let _loc4_: SectionPreset = param1.createSection(this.l("groupselection"), this._SafeStr_4409);
        param3.addElements(_loc4_);
    }

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_2480 = param1.stringParam == "" ? -1 : Number(param1.stringParam) | 0;
        this.initGuilds(this._guilds == null ? [] : this._guilds);
        this.maybeGetGuildMemberships();
        if (param1.stringParam != "") {
            this._SafeStr_4409.selected = 1;
        } else {
            this._SafeStr_4409.selected = 0;
        }
    }

    public override readStringParamFromForm(): string {
        if (this._SafeStr_4409.selected != 1) {
            return "";
        }
        let _loc1_: ExpandableDropdownOption = this._groupDropdown.selected;
        if (_loc1_ == null) {
            return "";
        }
        return _loc1_.id.toString();
    }

    public override onGuildMemberships(param1: GuildMembershipsMessageEvent): void {
        this.initGuilds(param1.guilds);
    }

    private maybeGetGuildMemberships(): void {
        let _loc1_: number = Number(new Date().getTime());
        if (_loc1_ > this._SafeStr_6472 + 1000 * UsersInGroup.REQUEST_TIMEOUT) {
            this._SafeStr_6472 = _loc1_;
            this.roomEvents.send(new GetGuildMembershipsMessageComposer());
        }
    }

    private initGuilds(param1: any[]): void {
        let _loc4_: number = 0;
        let _loc2_: HabboGroupEntryData = null;
        let _loc3_: ExpandableDropdownOption[] = [];
        this._guilds = param1;
        _loc4_ = 0;
        while (_loc4_ < this._guilds.length) {
            _loc2_ = this._guilds[_loc4_];
            _loc3_.push(new ExpandableDropdownOption(_loc2_.groupId, _loc2_.groupName));
            _loc4_++;
        }
        this._groupDropdown.reinit(_loc3_, this._SafeStr_2480);
    }
}
