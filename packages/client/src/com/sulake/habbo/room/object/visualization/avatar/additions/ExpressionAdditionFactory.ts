import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IExpressionAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/IExpressionAddition';
import type { AvatarVisualization } from '@/com/sulake/habbo/room/object/visualization/avatar/AvatarVisualization';
import { ExpressionAddition } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/ExpressionAddition';
import { FloatingHeart } from '@/com/sulake/habbo/room/object/visualization/avatar/additions/FloatingHeart';

export class ExpressionAdditionFactory {
    static { registerClassName(this, 'com.sulake.habbo.room.object.visualization.avatar.additions::ExpressionAdditionFactory'); }

    public static readonly WAVE: number = 1;
    public static readonly BLOW: number = 2;
    public static readonly LAUGH: number = 3;
    public static readonly CRY: number = 4;
    public static readonly _SafeStr_4392: number = 5;

    public static make(param1: number, param2: number, param3: AvatarVisualization): IExpressionAddition {
        switch (param2 - 2) {
            case 0:
                return new FloatingHeart(param1, 2, param3);
            default:
                return new ExpressionAddition(param1, param2, param3);
        }
    }
}
