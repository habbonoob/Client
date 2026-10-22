import type { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import type { IGameObject } from '@/com/sulake/habbo/game/snowwar/arena/IGameObject';
import type { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';

export interface IAStarNode extends IDisposable {
    get nodeDirection(): Direction8;
    set nodeDirection(param1: Direction8);
    get parentNode(): IAStarNode;
    set parentNode(param1: IAStarNode);
    get nodeCostFromStart(): number;
    set nodeCostFromStart(param1: number);
    get nodeCostToGoal(): number;
    set nodeCostToGoal(param1: number);
    distanceTo(param1: IAStarNode): number;
    directionTo(param1: IAStarNode): Direction8;
    getNodeAt(param1: Direction8): IAStarNode;
    directionIsBlocked(param1: Direction8, param2: IGameObject): boolean;
    getPathCost(param1: Direction8, param2: IGameObject): number;
}
