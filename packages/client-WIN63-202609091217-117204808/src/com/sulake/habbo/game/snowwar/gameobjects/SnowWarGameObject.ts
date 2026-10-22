import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowBallGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowBallGameObject';
import type { SnowWarGameStage } from '@/com/sulake/habbo/game/snowwar/SnowWarGameStage';
import type { Direction360 } from '@/com/sulake/habbo/game/snowwar/utils/Direction360';
import type { ICollidable } from '@/com/sulake/habbo/game/snowwar/utils/ICollidable';
import type { Location3D } from '@/com/sulake/habbo/game/snowwar/utils/Location3D';
import { IDisposable } from '@/com/sulake/core/runtime/IDisposable';
import { ISynchronizedGameObject } from '@/com/sulake/habbo/game/snowwar/arena/ISynchronizedGameObject';
import { CollisionDetection } from '@/com/sulake/habbo/game/snowwar/utils/CollisionDetection';

export class SnowWarGameObject implements ISynchronizedGameObject, ICollidable {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.gameobjects::SnowWarGameObject'); }

    protected _active: boolean = false;
    protected _gameObjectId: number = -1;
    protected _isGhost: boolean = false;
    private _disposed: boolean = false;

    constructor(param1: number, param2: boolean) {
        this._gameObjectId = param2 ? -param1 : param1;
        this._isGhost = param2;
    }

    public dispose(): void {
        this._disposed = true;
    }

    public get disposed(): boolean {
        return this._disposed;
    }

    public get isActive(): boolean {
        return this._active;
    }

    public set isActive(param1: boolean) {
        this._active = param1;
    }

    public get numberOfVariables(): number {
        return -1;
    }

    public getVariable(param1: number): number {
        return -1;
    }

    public get gameObjectId(): number {
        return this._gameObjectId;
    }

    public set gameObjectId(param1: number) {
        this._gameObjectId = param1;
    }

    public subturn(param1: SynchronizedGameStage): void {
    }

    public get boundingType(): number {
        return 0;
    }

    public get boundingData(): any[] {
        return null;
    }

    public get location3D(): Location3D {
        return null;
    }

    public get direction360(): Direction360 {
        return null;
    }

    public get isGhost(): boolean {
        return this._isGhost;
    }

    public get ghostObjectId(): number {
        return -(this._gameObjectId + 1);
    }

    public onRemove(): void {
    }

    public get collisionHeight(): number {
        return this.boundingData[0] | 0;
    }

    public testSnowBallCollision(param1: SnowBallGameObject): boolean {
        return param1.location3D.z < this.collisionHeight && CollisionDetection.testForObjectToObjectCollision(this, param1);
    }

    public onSnowBallHit(param1: SnowWarGameStage, param2: SnowBallGameObject): void {
    }

    get [ISynchronizedGameObject](): true {
        return true;
    }

    get [IDisposable](): true {
        return true;
    }
}
