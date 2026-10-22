import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { HumanGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/HumanGameObject';
import { SnowBallGameObject } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class CreateSnowballEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::CreateSnowballEvent'); }

    constructor(param1: number, param2: HumanGameObject, param3: number, param4: number, param5: number) {
        super();
        this._snowBallGameObject = new SnowBallGameObject(param1);
        this._human = param2;
        this._targetX = param3;
        this._targetY = param4;
        this._trajectory = param5;
    }

    declare private _human: HumanGameObject;

    declare private _targetX: number;
    static { (this.prototype as any)._targetX = 0; }

    declare private _targetY: number;
    static { (this.prototype as any)._targetY = 0; }

    declare private _trajectory: number;
    static { (this.prototype as any)._trajectory = 0; }

    declare private _snowBallGameObject: SnowBallGameObject;

    public set snowBallGameObject(param1: SnowBallGameObject) {
        this._snowBallGameObject = param1;
    }

    public override dispose(): void {
        super.dispose();
        this._snowBallGameObject = null;
        this._human = null;
    }

    public override apply(param1: SynchronizedGameStage): void {
        param1.addGameObject(this._snowBallGameObject.gameObjectId, this._snowBallGameObject);
        this._snowBallGameObject.isActive = true;
        let _loc2_: number = this._human.currentLocation.x;
        let _loc3_: number = this._human.currentLocation.y;
        let _loc4_: number = 3000;
        this._snowBallGameObject.initialize(_loc2_, _loc3_, _loc4_, this._trajectory, this._targetX, this._targetY, this._human);
    }
}
