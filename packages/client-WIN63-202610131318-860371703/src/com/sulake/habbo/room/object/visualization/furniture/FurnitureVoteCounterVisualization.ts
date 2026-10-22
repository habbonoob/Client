import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IRoomObjectModel } from '@/com/sulake/room/object/IRoomObjectModel';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureVoteCounterVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureVoteCounterVisualization'); }

    private static readonly ONES_SPRITE_TAG: string = "ones_sprite";
    private static readonly TENS_SPRITE_TAG: string = "tens_sprite";
    private static readonly HUNDREDS_SPRITE_TAG: string = "hundreds_sprite";
    private static readonly HIDE_COUNTER_SCORE: number = -1;

    constructor() {
        super();
    }

    protected override updateObject(param1: number, param2: number): boolean {
        super.updateObject(param1, param2);
        return true;
    }

    protected override getFrameNumber(param1: number, param2: number): number {
        let _loc4_: IRoomObjectModel = this.object.getModel();
        let _loc5_: number = _loc4_.getNumber("furniture_vote_counter_count") | 0;
        let _loc3_: string = this.getSpriteTag(param1, this.direction, param2);
        switch (_loc3_) {
            case "ones_sprite":
                return _loc5_ % 10;
            case "tens_sprite":
                return _loc5_ / 10 % 10 | 0;
            case "hundreds_sprite":
                return _loc5_ / 100 % 10 | 0;
            default:
                return super.getFrameNumber(param1, param2);
        }
    }

    protected override getSpriteAlpha(param1: number, param2: number, param3: number): number {
        let _loc4_: string = null;
        let _loc5_: IRoomObjectModel = this.object.getModel();
        let _loc6_: number = _loc5_.getNumber("furniture_vote_counter_count") | 0;
        if (_loc6_ == -1) {
            switch (_loc4_ = this.getSpriteTag(param1, param2, param3)) {
                case "ones_sprite":
                case "tens_sprite":
                case "hundreds_sprite":
            }
            return 0;
        }
        return super.getSpriteAlpha(param1, param2, param3);
    }
}
