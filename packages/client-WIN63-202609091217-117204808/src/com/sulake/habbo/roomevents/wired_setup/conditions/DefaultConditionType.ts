import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionType';
import { DefaultElement } from '@/com/sulake/habbo/roomevents/wired_setup/DefaultElement';

export class DefaultConditionType extends DefaultElement implements ConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::DefaultConditionType'); }

    constructor() {
        super();
    }
}
