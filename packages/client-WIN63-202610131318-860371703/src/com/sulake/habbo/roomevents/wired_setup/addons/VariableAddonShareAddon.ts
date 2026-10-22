import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { PresetManager } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/PresetManager';
import type { ButtonPreset } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/presets/ButtonPreset';
import type { WiredStyle } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/styles/WiredStyle';
import type { WiredUIBuilder } from '@/com/sulake/habbo/roomevents/wired_setup/uibuilder/WiredUIBuilder';
import { SynchronizeVariableAddonMessageComposer } from '@/com/sulake/habbo/communication/messages/outgoing/userdefinedroomevents/SynchronizeVariableAddonMessageComposer';
import { _SafeCls_6110 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6110';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';

export class VariableAddonShareAddon extends _SafeCls_6110 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariableAddonShareAddon'); }

    declare private _SafeStr_14455: ButtonPreset;

    constructor() {
        super();
    }

    public override buildInputs(param1: PresetManager, param2: WiredStyle, param3: WiredUIBuilder): void {
        super.buildInputs(param1, param2, param3);
        this._SafeStr_14455 = param1.createButton("${wiredfurni.params.variables.addon_share.synchronize}", this.synchronize);
        param3.addElements(param1.createPaddedContainerPreset(this._SafeStr_14455, param2.sectionLeftRightMargin, 0, param2.sectionLeftRightMargin, 0));
    }

    public override onEditInitialized(): void {
        this._SafeStr_14455.disabled = !this.roomEvents.wiredMenu.hasWritePermission;
    }

    private synchronize = (): void => {
        this.roomEvents.send(new SynchronizeVariableAddonMessageComposer(this.roomEventsCtrl.getCurrentWiredId()));
    };

    public override get code(): number {
        return AddonCodes.VARIABLE_ADDON_SHARE;
    }

    protected override get usageInfoLocalization(): string {
        return "${wiredfurni.params.variables.addon_share.usage_info}";
    }
}
