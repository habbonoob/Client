import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { VariableTarget } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/wiredcontext/variables/VariableTarget';
import { AddonCodes } from '@/com/sulake/habbo/roomevents/wired_setup/addons/AddonCodes';
import { VariableFilter } from '@/com/sulake/habbo/roomevents/wired_setup/addons/VariableFilter';

export class FurniVariableFilter extends VariableFilter {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.addons::FurniVariableFilter'); }

    constructor() {
        super();
    }

    protected override get variableType(): number {
        return VariableTarget.FURNI;
    }

    public override get code(): number {
        return AddonCodes.FURNI_VARIABLE_FILTER;
    }
}
