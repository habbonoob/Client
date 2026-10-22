import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { WindowEvent } from '@/com/sulake/core/window/events/WindowEvent';
import type { IConfirmDialog } from '@/com/sulake/core/window/utils/IConfirmDialog';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { _SafeCls_6044 } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/_SafeCls_6044';
import type { HabboUserDefinedRoomEvents } from '@/com/sulake/habbo/roomevents/HabboUserDefinedRoomEvents';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { CheckboxGroupPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/CheckboxGroupPreset';
import type { SectionPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/SectionPreset';
import type { ApiKeySection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/applications/ApiKeySection';
import type { UsageWarningSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/UsageWarningSection';
import type { TextPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/TextPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { WiredWebApiKeyResultEvent } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/WiredWebApiKeyResultEvent';
import { WiredGenerateWebApiKeyMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/WiredGenerateWebApiKeyMessageComposer';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';
import { CheckboxOptionParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/CheckboxOptionParam';
import { TextParam } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/params/TextParam';

export class VariablesWebApiAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariablesWebApiAddon'); }

    private static readonly MASS_DELETION_CHECKBOX_ID: number = 0;

    declare private _SafeStr_14608: UsageWarningSection;

    declare private _SafeStr_14609: ApiKeySection;

    declare private _SafeStr_14610: ApiKeySection;

    declare private _permissions: CheckboxGroupPreset;

    declare private _ignoreCheckboxEvents: boolean;
    static { (this.prototype as any)._ignoreCheckboxEvents = false; }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLES_WEB_API;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override onInit(param1: HabboUserDefinedRoomEvents): void {
        super.onInit(param1);
        param1.communication.addHabboConnectionMessageEvent(new WiredWebApiKeyResultEvent(this.onWiredApiKeyResultEvent));
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_14608 = param1.createUsageWarningSection("${wiredfurni.params.web_api.usage_info}");
        this._SafeStr_14609 = param1.createApiKeySection(false, this.onClickGeneratedReadKey);
        this._SafeStr_14610 = param1.createApiKeySection(true, this.onClickGeneratedWriteKey, this.onWriteKeyChange);
        let _loc7_: TextParam = new TextParam(1);
        _loc7_.textColor = param2.softTextColor;
        let _loc4_: TextPreset = param1.createText("${wiredfurni.params.web_api.permissions.bulk_delete.info}", _loc7_);
        let _loc5_: CheckboxOptionParam = new CheckboxOptionParam("${wiredfurni.params.web_api.permissions.bulk_delete}", 0, null, _loc4_);
        this._permissions = param1.createCheckboxGroup([_loc5_], this.onChangeCheckbox);
        let _loc6_: SectionPreset = param1.createSection("${wiredfurni.params.web_api.permissions}", this._permissions);
        param3.addElements(this._SafeStr_14608, this._SafeStr_14609, this._SafeStr_14610, _loc6_);
    }

    private onChangeCheckbox = (param1: number, param2: boolean): void => {
        let id: number = param1;
        let value: boolean = param2;
        if (this._ignoreCheckboxEvents) {
            return;
        }
        if (value && id == 0) {
            this.roomEvents.windowManager.confirm("${wiredfurni.params.web_api.permissions.bulk_delete.warning.title}", "${wiredfurni.params.web_api.permissions.bulk_delete.warning.desc}", 0, (param1: IConfirmDialog, param2: WindowEvent): void => {
                param1.dispose();
                if (param2.type != "WE_OK" && !this._permissions.disposed) {
                    this._permissions._SafeStr_2119(id).selected = false;
                }
            }).titleBarColor = 13909337;
        }
    };

    private onWriteKeyChange = (param1: string): void => {
        this._permissions._SafeStr_2119(0).disabled = param1.length == 0;
    };

    public override onEditStart(param1: Triggerable): void {
        this._SafeStr_14609.key = param1.getString(0);
        this._SafeStr_14610.key = param1.getString(1);
        this._ignoreCheckboxEvents = true;
        this._permissions._SafeStr_2119(0).selected = param1.getBoolean(0);
        this._ignoreCheckboxEvents = false;
        this.onWriteKeyChange(this._SafeStr_14610.key);
    }

    public override readStringParamFromForm(): string {
        return this._SafeStr_14609.key + "\t" + this._SafeStr_14610.key;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_14610.key.length > 0 && this._permissions._SafeStr_2119(0).selected ? 1 : 0];
    }

    private get currentWiredId(): number {
        return this.roomEvents.wiredCtrl.getCurrentWiredId();
    }

    public onClickGeneratedReadKey = (): void => {
        this.roomEvents.send(new WiredGenerateWebApiKeyMessageComposer(this.currentWiredId, true));
    };

    public onClickGeneratedWriteKey = (): void => {
        this.roomEvents.send(new WiredGenerateWebApiKeyMessageComposer(this.currentWiredId, false));
    };

    private onWiredApiKeyResultEvent = (param1: WiredWebApiKeyResultEvent): void => {
        let _loc2_: _SafeCls_6044 = param1.getParser();
        if (_loc2_.wiredId != this.currentWiredId) {
            return;
        }
        if (_loc2_.isReadKey) {
            this._SafeStr_14609.key = _loc2_.key;
        } else {
            this._SafeStr_14610.key = _loc2_.key;
        }
    };

    public override get widthModifier(): number {
        return 1.4;
    }
}
