import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { Triggerable } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/Triggerable';
import type { ConditionType } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ConditionType';
import type { Element } from '@/com/sulake/habbo/roomevents/wired_setup/Element';
import type { ElementTypeHolder } from '@/com/sulake/habbo/roomevents/wired_setup/ElementTypeHolder';
import { ConditionDefinition } from '@/com/sulake/habbo/communication/messages/incoming/userdefinedroomevents/ConditionDefinition';
import { ActorFacingDirection } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ActorFacingDirection';
import { ActorHasHandItem } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ActorHasHandItem';
import { ActorIsGroupMember } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ActorIsGroupMember';
import { ActorIsInTeam } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ActorIsInTeam';
import { ActorIsPerformingAction } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ActorIsPerformingAction';
import { ActorIsWearingBadge } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ActorIsWearingBadge';
import { ActorIsWearingEffect } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ActorIsWearingEffect';
import { CanPerformMove } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/CanPerformMove';
import { ChestHasAmount } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/chests/ChestHasAmount';
import { ChestHasItemTypes } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/chests/ChestHasItemTypes';
import { ClockTimeMatches } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/ClockTimeMatches';
import { DateMatches } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DateMatches';
import { DateRangeActive } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DateRangeActive';
import { DontHaveStackedFurnis } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/DontHaveStackedFurnis';
import { FurniHasAltitude } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/FurniHasAltitude';
import { FurnisHaveAvatars } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/FurnisHaveAvatars';
import { FurnisHaveNoAvatars } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/FurnisHaveNoAvatars';
import { HasStackedFurnis } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/HasStackedFurnis';
import { HasVariable } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/HasVariable';
import { InputSourceQuantity } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/InputSourceQuantity';
import { LevelMatches } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/LevelMatches';
import { StatesMatch } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/StatesMatch';
import { StuffTypeMatches } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/StuffTypeMatches';
import { TeamHasScore } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TeamHasScore';
import { TeamIsWinning } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TeamIsWinning';
import { TimeElapsedLess } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TimeElapsedLess';
import { TimeElapsedMore } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TimeElapsedMore';
import { TimeMatches } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TimeMatches';
import { TriggererIsOnFurni } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TriggererIsOnFurni';
import { TriggererMatches } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/TriggererMatches';
import { UserCountIn } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/UserCountIn';
import { VariableAge } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/VariableAge';
import { VariableValue } from '@/com/sulake/habbo/roomevents/wired_setup/conditions/VariableValue';

export class ConditionTypes implements ElementTypeHolder {
    static { registerClassName(this, 'com.sulake.habbo.roomevents.wired_setup.conditions::ConditionTypes'); }

    private _types: any[] = [];

    constructor() {
        this._types.push(new TriggererIsOnFurni());
        this._types.push(new FurnisHaveAvatars());
        this._types.push(new FurnisHaveNoAvatars());
        this._types.push(new StatesMatch());
        this._types.push(new TimeElapsedMore());
        this._types.push(new TimeElapsedLess());
        this._types.push(new UserCountIn());
        this._types.push(new ActorIsInTeam());
        this._types.push(new HasStackedFurnis());
        this._types.push(new StuffTypeMatches());
        this._types.push(new ActorIsGroupMember());
        this._types.push(new ActorIsWearingBadge());
        this._types.push(new ActorIsWearingEffect());
        this._types.push(new DontHaveStackedFurnis());
        this._types.push(new DateRangeActive());
        this._types.push(new ActorHasHandItem());
        this._types.push(new TriggererMatches());
        this._types.push(new TimeMatches());
        this._types.push(new DateMatches());
        this._types.push(new TeamIsWinning());
        this._types.push(new ActorIsPerformingAction());
        this._types.push(new TeamHasScore());
        this._types.push(new ClockTimeMatches());
        this._types.push(new FurniHasAltitude());
        this._types.push(new ActorFacingDirection());
        this._types.push(new InputSourceQuantity());
        this._types.push(new CanPerformMove());
        this._types.push(new HasVariable());
        this._types.push(new VariableValue());
        this._types.push(new VariableAge());
        this._types.push(new LevelMatches());
        this._types.push(new ChestHasAmount());
        this._types.push(new ChestHasItemTypes());
    }

    public get types(): any[] {
        return this._types;
    }

    public getByCode(param1: number): ConditionType {
        for (const _loc2_ of this._types ?? []) {
            if (_loc2_.code == param1) {
                return _loc2_;
            }
            if (_loc2_.negativeCode == param1) {
                return _loc2_;
            }
        }
        return null;
    }

    public getElementByCode(param1: number): Element {
        return this.getByCode(param1);
    }

    public acceptTriggerable(param1: Triggerable): boolean {
        return (param1 instanceof ConditionDefinition ? param1 : null) != null;
    }

    public getKey(): string {
        return "condition";
    }
}
