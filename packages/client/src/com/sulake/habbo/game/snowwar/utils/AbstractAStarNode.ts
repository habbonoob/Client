import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IGameObject } from '@/com/sulake/habbo/game/snowwar/arena/IGameObject';
import type { Direction8 } from '@/com/sulake/habbo/game/snowwar/utils/Direction8';
import type { IAStarNode } from '@/com/sulake/habbo/game/snowwar/utils/IAStarNode';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';

export class AbstractAStarNode implements IAStarNode {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.utils::AbstractAStarNode'); }

    constructor() {
    }

    private _referenceNumber: number = -1;

    declare private _nodeDirection8: Direction8;

    declare private _nodeCostToGoal: number;
    static { (this.prototype as any)._nodeCostToGoal = 0; }

    declare private _nodeCostFromStart: number;
    static { (this.prototype as any)._nodeCostFromStart = 0; }

    private _disposed: boolean = false;

    declare private _parentNode: IAStarNode;

    public get parentNode(): IAStarNode {
        return this._parentNode;
    }

    public set parentNode(param1: IAStarNode) {
        this._parentNode = param1;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get nodeDirection(): Direction8 {
        return this._nodeDirection8;
    }

    public set nodeDirection(param1: Direction8) {
        this._nodeDirection8 = param1;
    }

    public get nodeCostToGoal(): number {
        return this._nodeCostToGoal;
    }

    public set nodeCostToGoal(param1: number) {
        this._nodeCostToGoal = param1;
    }

    public get nodeCostFromStart(): number {
        return this._nodeCostFromStart;
    }

    public set nodeCostFromStart(param1: number) {
        this._nodeCostFromStart = param1;
    }

    public dispose(): void {
        this._nodeDirection8 = null;
        this._parentNode = null;
        this._nodeCostToGoal = 0;
        this._nodeCostFromStart = 0;
        this._disposed = true;
    }

    public compareTo(param1: AbstractAStarNode): number {
        let _loc3_: number = this._nodeCostFromStart + this._nodeCostToGoal;
        let _loc2_: number = param1._nodeCostFromStart + param1._nodeCostToGoal;
        if (_loc3_ < _loc2_) {
            return -1;
        }
        if (_loc3_ > _loc2_) {
            return 1;
        }
        return 0;
    }

    public distanceTo(param1: IAStarNode): number {
        return 0;
    }

    public directionTo(param1: IAStarNode): Direction8 {
        return null;
    }

    public getNodeAt(param1: Direction8): IAStarNode {
        return null;
    }

    public directionIsBlocked(param1: Direction8, param2: IGameObject): boolean {
        return false;
    }

    public getPathCost(param1: Direction8, param2: IGameObject): number {
        return 0;
    }

    get [IDisposable](): true {
        return true;
    }
}
