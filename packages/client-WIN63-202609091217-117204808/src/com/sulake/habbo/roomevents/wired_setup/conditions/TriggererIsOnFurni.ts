import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';

export class TriggererIsOnFurni extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::TriggererIsOnFurni'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.TRIGGERER_IS_ON_FURNI;
    }

    public override get negativeCode(): number {
        return ConditionCodes.NOT_TRIGGERER_IS_ON_FURNI;
    }
}
