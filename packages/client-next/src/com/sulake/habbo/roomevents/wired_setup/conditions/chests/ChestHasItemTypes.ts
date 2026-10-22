import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { ChestHasAmount } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/chests/ChestHasAmount';
import { ConditionCodes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionCodes';

export class ChestHasItemTypes extends ChestHasAmount {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions.chests::ChestHasItemTypes'); }

    constructor() {
        super();
    }

    public override get code(): number {
        return ConditionCodes.CHEST_HAS_ITEM_TYPES;
    }

    public override furniSelectionTitle(param1: number): string {
        if (param1 == 0) {
            return "wiredfurni.params.sources.furni.title.item_types";
        }
        return "wiredfurni.params.sources.furni.title.chests";
    }

    public override mergedSelections(): any[] {
        return [[2, 0]];
    }
}
