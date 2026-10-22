import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { AnimatedFurnitureVisualization } from '@/com/sulake/habbo/room/object/visualization/furniture/AnimatedFurnitureVisualization';

export class FurnitureScoreBoardVisualization extends AnimatedFurnitureVisualization {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.furniture::FurnitureScoreBoardVisualization'); }

    private static readonly ONES_SPRITE_TAG: string = "ones_sprite";
    private static readonly TENS_SPRITE_TAG: string = "tens_sprite";
    private static readonly HUNDREDS_SPRITE_TAG: string = "hundreds_sprite";
    private static readonly THOUSANDS_SPRITE_TAG: string = "thousands_sprite";

    constructor() {
        super();
    }

    public override get animationId(): number {
        return 0;
    }

    protected override getFrameNumber(param1: number, param2: number): number {
        let _loc3_: string = this.getSpriteTag(param1, this.direction, param2);
        let _loc4_: number = super.animationId;
        switch (_loc3_) {
            case "ones_sprite":
                return _loc4_ % 10;
            case "tens_sprite":
                return _loc4_ / 10 % 10 | 0;
            case "hundreds_sprite":
                return _loc4_ / 100 % 10 | 0;
            case "thousands_sprite":
                return _loc4_ / 1000 % 10 | 0;
            default:
                return super.getFrameNumber(param1, param2);
        }
    }
}
