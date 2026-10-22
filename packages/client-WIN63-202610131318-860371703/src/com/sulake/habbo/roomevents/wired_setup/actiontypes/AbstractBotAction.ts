import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { DefaultActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/DefaultActionType';

export class AbstractBotAction extends DefaultActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::AbstractBotAction'); }

    constructor() {
        super();
    }

    public override userSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.users.title.bots";
        }
        return super.userSelectionTitle(param1);
    }
}
