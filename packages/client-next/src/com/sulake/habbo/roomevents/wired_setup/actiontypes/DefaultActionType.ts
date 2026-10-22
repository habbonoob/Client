import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ActionType } from '@/com/sulake/habbo/roomevents/wired_setup/actiontypes/ActionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class DefaultActionType extends DefaultElement implements ActionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.actiontypes::DefaultActionType'); }

    constructor() {
        super();
    }

    public get allowDelaying(): boolean {
        return true;
    }

    get [ActionType](): true {
        return true;
    }
}
