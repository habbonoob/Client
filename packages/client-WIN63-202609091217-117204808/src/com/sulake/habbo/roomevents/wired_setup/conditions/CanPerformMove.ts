import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';

export class CanPerformMove extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::CanPerformMove'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.CAN_PERFORM_MOVE;
    }
}
