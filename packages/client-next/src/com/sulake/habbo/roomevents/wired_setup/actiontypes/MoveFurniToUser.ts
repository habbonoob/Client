import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';

export class MoveFurniToUser extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveFurniToUser'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.MOVE_FURNI_TO_USER;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.mv.0";
    }

    public override userSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.mv_user";
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
