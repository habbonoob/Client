import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';

export class UnfreezeUser extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::UnfreezeUser'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.TOGGLE_TO_RANDOM_STATE;
    }
}
