import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Map as UtilsMap } from '@/com/sulake/core/utils/Map';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { DropdownPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/DropdownPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { BorderSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/BorderSection';
import type { UsageInfoSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageInfoSection';
import type { SimpleListViewPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SimpleListViewPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredChestController } from '@/com/sulake/habbo/roomevents/wired_trading/chests/WiredChestController';
import { Capabilities } from '@habbo-pixi/runtime/system/Capabilities';
import { ChestPreferencesUpdateSuccessMessageEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredtrading/chests/ChestPreferencesUpdateSuccessMessageEvent';
import { SetChestNotificationPreferencesMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/wiredtrading/chests/SetChestNotificationPreferencesMessageComposer';
import { ExpandableDropdownOption } from '@/com/sulake/habbo/roomevents/wired_setup/common/advanced_dropdown/ExpandableDropdownOption';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { DropdownParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/DropdownParam';
import { ListScrollParams } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/ListScrollParams';
import { AbstractUbuntuWiredUI } from '@/com/sulake/habbo/roomevents/wired_trading/AbstractUbuntuWiredUI';
import { ChestType } from '@/com/sulake/habbo/roomevents/wired_trading/chests/ChestType';

export class ChestNotificationSettingsUI extends AbstractUbuntuWiredUI {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_trading.chests.settings::ChestNotificationSettingsUI'); }

    constructor(param1: WiredChestController, param2: PresetManager) {
        super(param1.roomEvents, param2);
        this._SafeStr_4322 = new ChestPreferencesUpdateSuccessMessageEvent(this.onUpdateSuccess);
        param1.addMessageEvent(this._SafeStr_4322);
        this._chestController = param1;
        let _loc12_: WiredStyle = param2.wiredStyle;
        let _loc13_: UsageInfoSection = param2.createUsageInfoSection("${wiredchests.notification_settings.notification_info.desc}", true, "${wiredchests.notification_settings.notification_info}");
        let _loc3_: any[] = [new CheckboxOptionParam("${wiredchests.notification_settings.enable_notifications.generic.0}", 0), new CheckboxOptionParam("${wiredchests.notification_settings.enable_notifications.generic.1}", 1)];
        let _loc8_: any[] = [new CheckboxOptionParam("${wiredchests.notification_settings.enable_notifications.wired.0}", 0), new CheckboxOptionParam("${wiredchests.notification_settings.enable_notifications.wired.1}", 1), new CheckboxOptionParam("${wiredchests.notification_settings.enable_notifications.wired.2}", 2)];
        this._SafeStr_3361 = param2.createCheckboxGroup(_loc3_);
        this._SafeStr_3009 = param2.createCheckboxGroup(_loc8_);
        let _loc5_: SectionPreset = param2.createSection("${wiredchests.notification_settings.enable_notifications.generic}", this._SafeStr_3361);
        _loc5_.splitterVisible = false;
        this._SafeStr_4286 = param2.createSection("${wiredchests.notification_settings.enable_notifications.wired}", this._SafeStr_3009);
        let _loc10_: SimpleListViewPreset = param2.createSimpleListView(true, [_loc5_, this._SafeStr_4286]);
        _loc10_.spacing = _loc12_.sectionSpacing;
        let _loc14_: BorderSection = param2.createBorderSection("${wiredchests.notification_settings.enable_notifications}", _loc10_);
        let _loc7_: ExpandableDropdownOption[] = [];
        _loc7_.push(new ExpandableDropdownOption(0, "${wiredchests.notification_settings.notification_mode.when.0}"));
        _loc7_.push(new ExpandableDropdownOption(1, "${wiredchests.notification_settings.notification_mode.when.1}"));
        this._notificationMode = param2.createDropdown(new DropdownParam("${wiredchests.notification_settings.notification_mode.when}", _loc7_));
        let _loc4_: SectionPreset = param2.createSection("${wiredchests.notification_settings.notification_mode.when}", this._notificationMode);
        _loc4_.splitterVisible = false;
        let _loc11_: BorderSection = param2.createBorderSection("${wiredchests.notification_settings.notification_mode}", _loc4_);
        let _loc6_: number = 320;
        let _loc9_: number = Capabilities.screenResolutionY / 2.4 | 0;
        let _loc15_: ListScrollParams = new ListScrollParams(false, _loc6_, _loc9_);
        this.framePreset = param2.createFramePreset([_loc13_, _loc14_, _loc11_, this.footerPreset], this.onCloseClicked, null, -1, false, false, _loc15_, true);
        this.framePreset.resizeToWidth(350);
    }

    declare private _SafeStr_3361: CheckboxGroupPreset;

    declare private _SafeStr_4286: SectionPreset;

    declare private _SafeStr_3009: CheckboxGroupPreset;

    declare private _notificationMode: DropdownPreset;

    declare private _SafeStr_4322: ChestPreferencesUpdateSuccessMessageEvent;

    declare private _chestId: number;

    declare private _chestController: WiredChestController;

    public get chestController(): WiredChestController {
        return this._chestController;
    }

    declare private _chestType: number;

    public set chestType(param1: number) {
        this._chestType = param1;
        let _loc2_: string = this.localization.getLocalization("wiredchests." + (param1 == ChestType.TYPE_FURNI ? "furni" : "coin") + "_chest");
        this.framePreset.title = this.localization.getLocalizationWithParams("wiredchests.notification_settings.title", "", "chest_type", _loc2_);
    }

    public override onSaveClicked(): void {
        this._chestController.send(new SetChestNotificationPreferencesMessageComposer(this._chestId, this._notificationMode.selectedId, this._SafeStr_3361._SafeStr_2119(0).selected, this._SafeStr_3361._SafeStr_2119(1).selected, this._SafeStr_3009._SafeStr_2119(0).selected, this._SafeStr_3009._SafeStr_2119(1).selected, this._SafeStr_3009._SafeStr_2119(2).selected));
    }

    public override dispose(): void {
        if (this.disposed) {
            return;
        }
        this._chestController.removeMessageEvent(this._SafeStr_4322);
        this._SafeStr_4322 = null;
        this._SafeStr_3361 = null;
        this._SafeStr_4286 = null;
        this._SafeStr_3009 = null;
        this._notificationMode = null;
        this._chestController = null;
        this._chestType = 0;
        this._chestId = -1;
        super.dispose();
    }

    public onEdit(param1: number, param2: number, param3: UtilsMap): void {
        this.chestType = param2;
        this._chestId = param1;
        let _loc6_: any = param3.getValue("notification_chest_full") == "1";
        let _loc7_: any = param3.getValue("notification_donation") == "1";
        let _loc8_: any = param3.getValue("notification_someone_withdraws") == "1";
        let _loc5_: any = param3.getValue("notification_chest_empty") == "1";
        let _loc10_: any = param3.getValue("notification_wired_transaction") == "1";
        let _loc4_: number = param3.getValue("notify_mode") | 0;
        let _loc9_: any = param3.getValue("is_wired_enabled") == "1";
        this._SafeStr_3361._SafeStr_2119(0).selected = _loc6_;
        this._SafeStr_3361._SafeStr_2119(1).selected = _loc7_;
        this._SafeStr_3009._SafeStr_2119(0).selected = _loc8_;
        this._SafeStr_3009._SafeStr_2119(1).selected = _loc5_;
        this._SafeStr_3009._SafeStr_2119(2).selected = _loc10_;
        this._notificationMode.selectedId = _loc4_;
        this._SafeStr_4286.disabled = !_loc9_;
        this.showFrame();
    }

    private onUpdateSuccess(param1: ChestPreferencesUpdateSuccessMessageEvent): void {
        if (param1.getParser().chestId == this._chestId && param1.getParser().isNotificationPreferences) {
            this.hideFrame();
        }
    }

    protected override initInstanceFields(): void {
        this.onUpdateSuccess = this.onUpdateSuccess.bind(this);
        this._chestId = 0;
        this._chestType = 0;
        super.initInstanceFields();
    }
}
