import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { _SafeCls_6106 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/model/_SafeCls_6106';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { _SafeCls_6105 } from '@/com/sulake/habbo/roomevents/wired_setup/addons/variablefx/_SafeCls_6105';

export class _SafeCls_6098 extends _SafeCls_6105 {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons.variablefx::_SafeCls_6098'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return AddonCodes.VARIABLE_FX_NUMBER_DISPLAY;
    }

    protected override get categoryId(): number {
        return 5;
    }

    protected override readIntParams(param1: any[], param2: _SafeCls_6106): void {
        super.readIntParams(param1, param2);
        param2._SafeStr_14627 = param1[21] | 0;
    }

    protected override writeIntParams(param1: any[], param2: _SafeCls_6106): void {
        super.writeIntParams(param1, param2);
        param1.push(param2._SafeStr_14627);
    }

    protected override readStringParam(param1: Triggerable, param2: _SafeCls_6106): void {
        param2.icon = param1.stringParam;
    }

    protected override writeStringParam(param1: _SafeCls_6106): string {
        return param1.icon;
    }
}
