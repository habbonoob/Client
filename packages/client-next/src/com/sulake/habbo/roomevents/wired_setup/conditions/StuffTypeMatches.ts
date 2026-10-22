import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';
import { DefaultConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DefaultConditionType';

export class StuffTypeMatches extends DefaultConditionType {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::StuffTypeMatches'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.STUFF_TYPE_MATCHES;
    }

    public override get negativeCode(): number {
        return ConditionCodes.NOT_STUFF_TYPE_MATCHES;
    }

    public override furniSelectionTitle(param1: number): string {
        return "wiredfurni.params.sources.furni.title.match." + param1;
    }

    public override advancedAlwaysVisible(): boolean {
        return true;
    }
}
