import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';

export class _SafeCls_6094 extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::_SafeCls_6094'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.REMOVE_FURNI;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
