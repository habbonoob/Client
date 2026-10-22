import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { ContainerButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ContainerButtonPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { BorderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/BorderSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { StaticBitmapAssetWrapperPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/StaticBitmapAssetWrapperPreset';
import type { TextAreaPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextAreaPreset';
import type { TextInputPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextInputPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { ChestPreferencesUpdateSuccessMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/chests/ChestPreferencesUpdateSuccessMessageEvent';
import { SetChestPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/SetChestPreferencesMessageComposer';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { ListScrollParams } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/ListScrollParams';
import { TextAreaParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextAreaParam';
import { TextInputParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextInputParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';
import { AbstractUbuntuWiredUI } from '@/com/sulake/habbo/roomevents/wired_trading/AbstractUbuntuWiredUI';
import { ChestType } from '@/com/sulake/habbo/roomevents/wired_trading/chests/ChestType';
import { WiredChestWiredUpdateConfirmationView } from '@/com/sulake/habbo/roomevents/wired_trading/chests/settings/WiredChestWiredUpdateConfirmationView';

export class ChestSettingsUI extends AbstractUbuntuWiredUI {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.settings::ChestSettingsUI'); }

    declare private _chestController: WiredChestController;

    declare private _SafeStr_3461: CheckboxGroupPreset;

    declare private _chestName: TextInputPreset;

    declare private _chestDesc: TextAreaPreset;

    declare private _chestState: DropdownPreset;

    declare private _SafeStr_4683: SectionPreset;

    declare private _openStateDropdown: DropdownPreset;

    declare private _SafeStr_3555: SectionPreset;

    declare private _amountPreviewDropdown: DropdownPreset;

    declare private _SafeStr_6242: SimpleListViewPreset;

    declare private _SafeStr_3693: ContainerButtonPreset;

    declare private _SafeStr_4014: StaticBitmapAssetWrapperPreset;

    declare private _SafeStr_3006: WiredChestWiredUpdateConfirmationView;

    declare private _SafeStr_4322: ChestPreferencesUpdateSuccessMessageEvent;

    declare private _chestType: number;

    declare private _chestId: number;

    declare private _chestItemType: number;

    declare private _SafeStr_6460: boolean;

    constructor(param1: WiredChestController, param2: PresetManager) {
        super(param1.roomEvents, param2);
        this._SafeStr_4322 = new ChestPreferencesUpdateSuccessMessageEvent(this.onUpdateSuccess);
        param1.addMessageEvent(this._SafeStr_4322);
        this._chestController = param1;
        let _loc13_: WiredStyle = param2.wiredStyle;
        let _loc16_: any[] = [new CheckboxOptionParam("${wiredchests.settings.access.open}"), new CheckboxOptionParam("${wiredchests.settings.access.donate}")];
        this._SafeStr_3461 = param2.createCheckboxGroup(_loc16_);
        let _loc8_: BorderSection = param2.createBorderSection("${wiredchests.settings.access}", this._SafeStr_3461);
        this._chestName = param2.createTextInput(new TextInputParam("", 30));
        this._chestDesc = param2.createTextArea(new TextAreaParam(64, -1, 4, -1, 200, "", null, null, true, true));
        let _loc9_: SectionPreset = param2.createSection("${wiredchests.settings.info.name}", this._chestName);
        _loc9_.splitterVisible = false;
        let _loc6_: SectionPreset = param2.createSection("${wiredchests.settings.info.desc}", this._chestDesc);
        let _loc14_: SimpleListViewPreset = param2.createSimpleListView(true, [_loc9_, _loc6_]);
        _loc14_.spacing = _loc13_.sectionSpacing;
        let _loc17_: BorderSection = param2.createBorderSection("${wiredchests.settings.info}", _loc14_);
        let _loc12_: ExpandableDropdownOption[] = [];
        _loc12_.push(new ExpandableDropdownOption(0, "${wiredchests.settings.appearance.state.0}"));
        _loc12_.push(new ExpandableDropdownOption(1, "${wiredchests.settings.appearance.state.1}"));
        _loc12_.push(new ExpandableDropdownOption(2, "${wiredchests.settings.appearance.state.2}"));
        _loc12_.push(new ExpandableDropdownOption(3, "${wiredchests.settings.appearance.state.3}"));
        let _loc3_: ExpandableDropdownOption[] = [];
        _loc3_.push(new ExpandableDropdownOption(0, "${wiredchests.settings.appearance.preview.0}"));
        _loc3_.push(new ExpandableDropdownOption(1, "${wiredchests.settings.appearance.preview.1}"));
        _loc3_.push(new ExpandableDropdownOption(2, "${wiredchests.settings.appearance.preview.2}"));
        _loc3_.push(new ExpandableDropdownOption(3, "${wiredchests.settings.appearance.preview.3}"));
        _loc3_.push(new ExpandableDropdownOption(4, "${wiredchests.settings.appearance.preview.4}"));
        _loc3_.push(new ExpandableDropdownOption(5, "${wiredchests.settings.appearance.preview.5}"));
        _loc3_.push(new ExpandableDropdownOption(6, "${wiredchests.settings.appearance.preview.6}"));
        _loc3_.push(new ExpandableDropdownOption(7, "${wiredchests.settings.appearance.preview.7}"));
        let _loc5_: ExpandableDropdownOption[] = [];
        _loc5_.push(new ExpandableDropdownOption(1, "1"));
        _loc5_.push(new ExpandableDropdownOption(2, "2"));
        _loc5_.push(new ExpandableDropdownOption(3, "3"));
        _loc5_.push(new ExpandableDropdownOption(4, "4"));
        this._chestState = param2.createDropdown(new DropdownParam("${wiredchests.settings.appearance.state}", _loc12_));
        let _loc4_: SectionPreset = param2.createSection("${wiredchests.settings.appearance.state}", this._chestState);
        _loc4_.splitterVisible = false;
        this._openStateDropdown = param2.createDropdown(new DropdownParam("${wiredchests.settings.appearance.preview}", _loc3_, this.onChangePreviewItems));
        this._SafeStr_4683 = param2.createSection("${wiredchests.settings.appearance.preview}", param2.createSimpleListView(true, [this._openStateDropdown, param2.createText("${wiredchests.settings.appearance.preview.note}").halfBlend()]));
        this._amountPreviewDropdown = param2.createDropdown(new DropdownParam("${wiredchests.settings.appearance.preview_amount}", _loc5_));
        this._SafeStr_3555 = param2.createSection("${wiredchests.settings.appearance.preview_amount}", this._amountPreviewDropdown);
        let _loc18_: SimpleListViewPreset = param2.createSimpleListView(true, [_loc4_, this._SafeStr_4683, this._SafeStr_3555]);
        _loc18_.spacing = _loc13_.sectionSpacing;
        let _loc15_: BorderSection = param2.createBorderSection("${wiredchests.settings.appearance}", _loc18_);
        let _loc20_: SimpleListViewPreset = param2.createSimpleListView(false, [param2.createBitmapWrapperPreset("${image.library.url}catalogue/icon_80.png"), param2.createText("${wiredchests.settings.wired.upgrade}", new TextParam(0))], true);
        this._SafeStr_3693 = param2.createContainerButtonPreset(_loc20_.alignCenter(), this.onClickUpgrade, false);
        this._SafeStr_4014 = param2.createBitmapWrapperPreset("icon_checkmark_small");
        this._SafeStr_6242 = param2.createSimpleListView(false, [this._SafeStr_3693, this._SafeStr_4014], true);
        let _loc10_: BorderSection = param2.createBorderSection("${wiredchests.settings.wired}", this._SafeStr_6242);
        let _loc7_: number = 420;
        let _loc11_: number = Capabilities.screenResolutionY / 2.4 | 0;
        let _loc19_: ListScrollParams = new ListScrollParams(false, _loc7_, _loc11_, true);
        this.framePreset = param2.createFramePreset([_loc8_, _loc17_, _loc15_, _loc10_, this.footerPreset], this.onCloseClicked, null, -1, false, false, _loc19_);
        this.framePreset.resizeToWidth(300);
    }

    private onUpdateSuccess(param1: ChestPreferencesUpdateSuccessMessageEvent): void {
        if (param1.getParser().chestId == this._chestId && !param1.getParser().isNotificationPreferences) {
            this.hideFrame();
        }
    }

    protected override hideFrame(): void {
        super.hideFrame();
        if (this._SafeStr_3006 != null) {
            this._SafeStr_3006.hide();
        }
    }

    private onClickUpgrade(): void {
        if (this._SafeStr_3006 == null) {
            this._SafeStr_3006 = new WiredChestWiredUpdateConfirmationView(this);
        }
        this._SafeStr_3006.initialize(this._chestId, this._chestType, this._chestItemType, this._SafeStr_6460);
        this._SafeStr_3006.show();
    }

    public confirmUpgrade(): void {
        this._SafeStr_3693.disabled = true;
        this._SafeStr_4014.visible = true;
        this.onSaveClicked();
    }

    private onChangePreviewItems(param1: ExpandableDropdownOption): void {
        this._SafeStr_3555.disabled = param1.id == 0;
    }

    public set chestType(param1: number) {
        this._chestType = param1;
        this._SafeStr_4683.visible = this._chestType == ChestType.TYPE_FURNI;
        this._SafeStr_3555.visible = this._chestType == ChestType.TYPE_FURNI;
        let _loc2_: string = this.localization.getLocalization("wiredchests." + (param1 == ChestType.TYPE_FURNI ? "furni" : "coin") + "_chest");
        this.framePreset.title = this.localization.getLocalizationWithParams("wiredchests.settings.title", "", "chest_type", _loc2_);
    }

    public onEdit(param1: number, param2: number, param3: number, param4: boolean, param5: UtilsMap): void {
        let _loc8_: number = 0;
        let _loc9_: number = 0;
        this.chestType = param2;
        this._chestId = param1;
        this._chestItemType = param3;
        this._SafeStr_6460 = param4;
        let _loc6_: string = stringOrNull(param5.getValue("chest_name"));
        let _loc10_: string = stringOrNull(param5.getValue("chest_desc"));
        let _loc7_: boolean = param5.getValue("everyone_can_open") == "1";
        let _loc13_: boolean = param5.getValue("everyone_can_donate") == "1";
        let _loc11_: number = param5.getValue("state_control_mode") | 0;
        let _loc12_: boolean = param5.getValue("is_wired_enabled") == "1";
        if (param2 == ChestType.TYPE_FURNI) {
            _loc8_ = param5.getValue("preview_mode") | 0;
            _loc9_ = param5.getValue("preview_amount") | 0;
        }
        this._SafeStr_3461._SafeStr_2119(0).selected = _loc7_;
        this._SafeStr_3461._SafeStr_2119(1).selected = _loc13_;
        this._chestName.text = _loc6_;
        this._chestDesc.text = _loc10_;
        this._chestState.selectedId = _loc11_;
        this._SafeStr_3693.disabled = _loc12_;
        this._SafeStr_4014.visible = _loc12_;
        if (param2 == ChestType.TYPE_FURNI) {
            this._openStateDropdown.selectedId = _loc8_;
            this._amountPreviewDropdown.selectedId = _loc9_;
            this._SafeStr_3555.disabled = _loc8_ == 0;
        }
        this.showFrame();
    }

    public override onSaveClicked(): void {
        this._chestController.send(new SetChestPreferencesMessageComposer(this._chestId, this._chestName.text, this._chestDesc.text, this._SafeStr_3461._SafeStr_2119(0).selected, this._SafeStr_3461._SafeStr_2119(1).selected, this._chestState.selectedId, this._openStateDropdown.selectedId, this._amountPreviewDropdown.selectedId, this._SafeStr_3693.disabled));
    }

    public get chestController(): WiredChestController {
        return this._chestController;
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        if (this._SafeStr_3006 != null) {
            this._SafeStr_3006.dispose();
            this._SafeStr_3006 = null;
        }
        this._chestController.removeMessageEvent(this._SafeStr_4322);
        this._SafeStr_4322 = null;
        this._SafeStr_3461 = null;
        this._chestName = null;
        this._chestDesc = null;
        this._chestState = null;
        this._SafeStr_4683 = null;
        this._openStateDropdown = null;
        this._SafeStr_3555 = null;
        this._amountPreviewDropdown = null;
        this._SafeStr_3693 = null;
        this._SafeStr_4014 = null;
        this._chestController = null;
        this._chestType = 0;
        this._chestId = -1;
        super.dispose();
    }

    protected override initInstanceFields(): void {
        this.onUpdateSuccess = this.onUpdateSuccess.bind(this);
        this.onClickUpgrade = this.onClickUpgrade.bind(this);
        this.onChangePreviewItems = this.onChangePreviewItems.bind(this);
        this._chestType = 0;
        this._chestId = 0;
        this._chestItemType = 0;
        this._SafeStr_6460 = false;
        super.initInstanceFields();
    }
}
