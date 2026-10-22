import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { ICollidable } from '@/com/sulake/habbo/game/snowwar/utils/ICollidable';
import { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { MathUtil } from '@/com/sulake/habbo/game/snowwar/utils/MathUtil';

export class CollisionDetection {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::CollisionDetection'); }

    public static readonly BOUNDING_TYPE_NONE: number = 0;
    public static readonly BOUNDING_TYPE_POINT: number = 1;
    public static readonly BOUNDING_TYPE_CIRCLE: number = 2;
    public static readonly BOUNDING_TYPE_BOX: number = 3;
    public static readonly BOUNDING_TYPE_TRIPLE_CIRCLE: number = 4;
    public static readonly BOUNDING_DATA_TRIPLE_CIRCLE_FIRST_RADIUS: number = 0;
    public static readonly BOUNDING_DATA_TRIPLE_CIRCLE_SECOND_RADIUS: number = 1;
    public static readonly BOUNDING_DATA_TRIPLE_CIRCLE_THIRD_RADIUS: number = 2;
    public static readonly BOUNDING_DATA_TRIPLE_CIRCLE_FIRST_OFFSET: number = 3;
    public static readonly BOUNDING_DATA_TRIPLE_CIRCLE_THIRD_OFFSET: number = 4;
    public static readonly BOUNDING_DATA_TRIPLE_CIRCLE_LARGEST_DISTANCE: number = 5;

    constructor() {
    }

    public static testForObjectToObjectCollision(param1: ICollidable, param2: ICollidable): boolean {
        if (param2 == param1) {
            return false;
        }
        switch (param2.boundingType) {
            case 0:
            case 1:
                break;
            case 2:
                switch (param1.boundingType - 1) {
                    case 0:
                        if (CollisionDetection.testPointToCircleCollision(param1, param2)) {
                            return true;
                        }
                        break;
                    case 1:
                        if (CollisionDetection.testCircleToCircleCollision(param1, param2)) {
                            return true;
                        }
                        break;
                    case 3:
                        if (CollisionDetection.testCircleToTripleCircleCollision(param2, param1)) {
                            return true;
                        }
                }
                break;
            case 3:
                if (param1.boundingType == 1) {
                    if (CollisionDetection.testPointToBoxCollision(param1, param2)) {
                        return true;
                    }
                }
                break;
            case 4:
                switch (param1.boundingType - 1) {
                    case 0:
                        if (CollisionDetection.testPointToTripleCircleCollision(param1, param2)) {
                            return true;
                        }
                        break;
                    case 1:
                        if (CollisionDetection.testCircleToTripleCircleCollision(param1, param2)) {
                            return true;
                        }
                        break;
                    case 3:
                        if (CollisionDetection.testTripleCircleToTripleCircleCollision(param1, param2)) {
                            return true;
                        }
                }
        }
        return false;
    }

    private static testPointToCircleCollision(param1: ICollidable, param2: ICollidable): boolean {
        return param1.location3D.isInDistance(param2.location3D, param2.boundingData[0] | 0);
    }

    private static testPointToBoxCollision(param1: ICollidable, param2: ICollidable): boolean {
        let _loc3_: any[] = param2.boundingData;
        if (param1.location3D.x > param2.location3D.x + _loc3_[0] && param1.location3D.x < param2.location3D.x + _loc3_[2] && param1.location3D.y > param2.location3D.y + _loc3_[1] && param1.location3D.y < param2.location3D.y + _loc3_[3]) {
            return true;
        }
        return false;
    }

    private static testCircleToCircleCollision(param1: ICollidable, param2: ICollidable): boolean {
        return param1.location3D.isInDistance(param2.location3D, param1.boundingData[0] + param2.boundingData[0] | 0);
    }

    private static testPointToTripleCircleCollision(param1: ICollidable, param2: ICollidable): boolean {
        let _loc8_: number = CollisionDetection.absoluteValue(param2.location3D.x - param1.location3D.x);
        if (_loc8_ > param2.boundingData[5]) {
            return false;
        }
        let _loc7_: number = CollisionDetection.absoluteValue(param2.location3D.y - param1.location3D.y);
        if (_loc7_ > param2.boundingData[5]) {
            return false;
        }
        let _loc5_: number = param2.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param2.direction360.intValue()) * param2.boundingData[3] / 256);
        let _loc6_: number = param2.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param2.direction360.intValue()) * param2.boundingData[3] / 256);
        if (Location3D.isInDistanceStatic(_loc5_, _loc6_, param1.location3D.x, param1.location3D.y, param2.boundingData[0] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(param2.location3D.x, param2.location3D.y, param1.location3D.x, param1.location3D.y, param2.boundingData[1] | 0)) {
            return true;
        }
        let _loc3_: number = param2.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param2.direction360.intValue()) * param2.boundingData[4] / 256);
        let _loc4_: number = param2.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param2.direction360.intValue()) * param2.boundingData[4] / 256);
        if (Location3D.isInDistanceStatic(_loc3_, _loc4_, param1.location3D.x, param1.location3D.y, param2.boundingData[2] | 0)) {
            return true;
        }
        return false;
    }

    private static testCircleToTripleCircleCollision(param1: ICollidable, param2: ICollidable): boolean {
        let _loc8_: number = CollisionDetection.absoluteValue(param2.location3D.x - param1.location3D.x);
        if (_loc8_ > param1.boundingData[0] + param2.boundingData[5]) {
            return false;
        }
        let _loc7_: number = CollisionDetection.absoluteValue(param2.location3D.y - param1.location3D.y);
        if (_loc7_ > param1.boundingData[0] + param2.boundingData[5]) {
            return false;
        }
        let _loc5_: number = param2.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param2.direction360.intValue()) * param2.boundingData[3] / 256);
        let _loc6_: number = param2.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param2.direction360.intValue()) * param2.boundingData[3] / 256);
        if (Location3D.isInDistanceStatic(_loc5_, _loc6_, param1.location3D.x, param1.location3D.y, param2.boundingData[0] + param1.boundingData[0] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(param2.location3D.x, param2.location3D.y, param1.location3D.x, param1.location3D.y, param2.boundingData[1] + param1.boundingData[0] | 0)) {
            return true;
        }
        let _loc3_: number = param2.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param2.direction360.intValue()) * param2.boundingData[4] / 256);
        let _loc4_: number = param2.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param2.direction360.intValue()) * param2.boundingData[4] / 256);
        if (Location3D.isInDistanceStatic(_loc3_, _loc4_, param1.location3D.x, param1.location3D.y, param2.boundingData[2] + param1.boundingData[0] | 0)) {
            return true;
        }
        return false;
    }

    private static testTripleCircleToTripleCircleCollision(param1: ICollidable, param2: ICollidable): boolean {
        let _loc11_: number = CollisionDetection.absoluteValue(param2.location3D.x - param1.location3D.x);
        if (_loc11_ > param1.boundingData[5] + param2.boundingData[5]) {
            return false;
        }
        let _loc10_: number = CollisionDetection.absoluteValue(param2.location3D.y - param1.location3D.y);
        if (_loc10_ > param1.boundingData[5] + param2.boundingData[5]) {
            return false;
        }
        let _loc5_: number = param1.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param1.direction360.intValue()) * param1.boundingData[3] / 256);
        let _loc3_: number = param1.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param1.direction360.intValue()) * param1.boundingData[3] / 256);
        let _loc12_: number = param2.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param2.direction360.intValue()) * param2.boundingData[3] / 256);
        let _loc6_: number = param2.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param2.direction360.intValue()) * param2.boundingData[3] / 256);
        if (Location3D.isInDistanceStatic(_loc5_, _loc3_, _loc12_, _loc6_, param1.boundingData[0] + param2.boundingData[0] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(_loc5_, _loc3_, param2.location3D.x, param2.location3D.y, param1.boundingData[0] + param2.boundingData[1] | 0)) {
            return true;
        }
        let _loc4_: number = param2.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param2.direction360.intValue()) * param2.boundingData[4] / 256);
        let _loc8_: number = param2.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param2.direction360.intValue()) * param2.boundingData[4] / 256);
        if (Location3D.isInDistanceStatic(_loc5_, _loc3_, _loc4_, _loc8_, param1.boundingData[0] + param2.boundingData[2] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(param1.location3D.x, param1.location3D.y, _loc12_, _loc6_, param1.boundingData[1] + param2.boundingData[0] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(param1.location3D.x, param1.location3D.y, param2.location3D.x, param2.location3D.y, param1.boundingData[1] + param2.boundingData[1] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(param1.location3D.x, param1.location3D.y, _loc4_, _loc8_, param1.boundingData[1] + param2.boundingData[2] | 0)) {
            return true;
        }
        let _loc9_: number = param1.location3D.x + MathUtil.javaDiv(Direction360.getBaseVectorXComponent(param1.direction360.intValue()) * param1.boundingData[4] / 256);
        let _loc7_: number = param1.location3D.y + MathUtil.javaDiv(Direction360.getBaseVectorYComponent(param1.direction360.intValue()) * param1.boundingData[4] / 256);
        if (Location3D.isInDistanceStatic(_loc9_, _loc7_, _loc12_, _loc6_, param1.boundingData[2] + param2.boundingData[0] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(_loc9_, _loc7_, param2.location3D.x, param2.location3D.y, param1.boundingData[2] + param2.boundingData[1] | 0)) {
            return true;
        }
        if (Location3D.isInDistanceStatic(_loc9_, _loc7_, _loc4_, _loc8_, param1.boundingData[2] + param2.boundingData[2] | 0)) {
            return true;
        }
        return false;
    }

    protected static absoluteValue(param1: number): number {
        if (param1 < 0) {
            return -param1;
        }
        return param1;
    }
}
