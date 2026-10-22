import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { VariableFxEditorState } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/VariableFxEditorState';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { _SafeCls_6111 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6111';

export class VariableFxNumberDisplayAddon extends _SafeCls_6111 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::VariableFxNumberDisplayAddon'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_FX_NUMBER_DISPLAY;
    }

    protected override get categoryId(): number {
        return 5;
    }

    protected override readIntParams(param1: any[], param2: VariableFxEditorState): void {
        super.readIntParams(param1, param2);
        param2._SafeStr_14473 = param1[21] | 0;
    }

    protected override writeIntParams(param1: any[], param2: VariableFxEditorState): void {
        super.writeIntParams(param1, param2);
        param1[21] = param2._SafeStr_14473;
    }

    protected override readStringParam(param1: Triggerable, param2: VariableFxEditorState): void {
        param2.icon = param1.stringParam;
    }

    protected override writeStringParam(param1: VariableFxEditorState): string {
        return param1.icon;
    }
}
