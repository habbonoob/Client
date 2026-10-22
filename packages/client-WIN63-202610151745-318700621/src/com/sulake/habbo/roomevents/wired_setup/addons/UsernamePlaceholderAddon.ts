import { stringOrNull } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { PlaceholderNameSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/applications/PlaceholderNameSection';
import type { PlaceholderTypeSection } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/sections/applications/PlaceholderTypeSection';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { DefaultAddonType } from '@/com/sulake/habbo/roomevents/wired_setup/addons/DefaultAddonType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class UsernamePlaceholderAddon extends DefaultAddonType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::UsernamePlaceholderAddon'); }

    declare private _SafeStr_3339: PlaceholderNameSection;

    declare private _SafeStr_3208: PlaceholderTypeSection;

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.USERNAME_PLACEHOLDER;
    }

    public override get inputMode(): number {
        return DefaultElement.INPUTS_TYPE_UI_BUILDER;
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        this._SafeStr_3339 = param1.createPlaceholderNameSection(this.l("texts.placeholder_name"), "$");
        this._SafeStr_3208 = param1.createPlaceholderTypeSection("user");
        param3.addElements(this._SafeStr_3339, this._SafeStr_3208);
    }

    public override onEditStart(param1: Triggerable): void {
        let _loc2_: any[] = param1.stringParam.split("\t");
        let _loc5_: boolean = param1.getBoolean(0);
        let _loc4_: string = stringOrNull(_loc2_[0]);
        let _loc3_: string = stringOrNull(_loc2_.length > 1 ? _loc2_[1] : "");
        this._SafeStr_3339.placeholderName = _loc4_;
        this._SafeStr_3208.isShowMultiple = _loc5_;
        this._SafeStr_3208.delimiter = _loc3_;
    }

    public override readIntParamsFromForm(): any[] {
        return [this._SafeStr_3208.isShowMultiple ? 1 : 0];
    }

    public override readStringParamFromForm(): string {
        if (!this._SafeStr_3208.isShowMultiple) {
            return this._SafeStr_3339.placeholderName;
        }
        return this._SafeStr_3339.placeholderName + "\t" + this._SafeStr_3208.delimiter;
    }
}
