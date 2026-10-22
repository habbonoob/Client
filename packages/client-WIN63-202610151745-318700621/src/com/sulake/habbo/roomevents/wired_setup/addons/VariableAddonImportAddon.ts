import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/_SafeCls_6106';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';

export class VariableAddonImportAddon extends _SafeCls_6106 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::VariableAddonImportAddon'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_ADDON_IMPORT;
    }

    protected override get usageInfoLocalization(): string {
        return "${wiredfurni.params.variables.addon_import.usage_info}";
    }
}
