import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureCounterClockVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureCounterClockVisualization'); }

    private static readonly SECONDS_SPRITE_TAG: string = "seconds_sprite";
    private static readonly TEN_SECONDS_SPRITE_TAG: string = "ten_seconds_sprite";
    private static readonly MINUTES_SPRITE_TAG: string = "minutes_sprite";
    private static readonly TEN_MINUTES_SPRITE_TAG: string = "ten_minutes_sprite";

    constructor() {
        super();
    }

    public override get animationId(): number {
        return 0;
    }

    protected override getFrameNumber(param1: number, param2: number): number {
        let _loc4_: string = this.getSpriteTag(param1, this.direction, param2);
        let _loc3_: number = super.animationId;
        switch (_loc4_) {
            case "seconds_sprite":
                return _loc3_ % 60 % 10;
            case "ten_seconds_sprite":
                return _loc3_ % 60 / 10 | 0;
            case "minutes_sprite":
                return _loc3_ / 60 % 10 | 0;
            case "ten_minutes_sprite":
                return _loc3_ / 60 / 10 % 10 | 0;
            default:
                return super.getFrameNumber(param1, param2);
        }
    }
}
