import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';

export class CallAnotherStack extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::CallAnotherStack'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.CALL_ANOTHER_STACK;
    }

    public override get negativeCode(): number {
        return ActionTypeCodes.NEG_CALL_ANOTHER_STACK;
    }
}
