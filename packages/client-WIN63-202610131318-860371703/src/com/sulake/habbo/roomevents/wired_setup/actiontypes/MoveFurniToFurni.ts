import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ActionTypeCodes } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionTypeCodes';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';

export class MoveFurniToFurni extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::MoveFurniToFurni'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ActionTypeCodes.MOVE_FURNI_TO_FURNI;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.mv." + param1;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }

    public override get forceHidePickFurniInstructions(): boolean {
        return true;
    }
}
