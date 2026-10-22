import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { HumanGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/HumanGameObject';
import { SnowWarEngine } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class HumanThrowsSnowballAtPositionEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::HumanThrowsSnowballAtPositionEvent'); }

    constructor(param1: HumanGameObject, param2: number, param3: number, param4: number) {
        super();
        this._human = param1;
        this._targetX = param2;
        this._targetY = param3;
        this._trajectory = param4;
    }

    declare private _human: HumanGameObject;

    declare private _targetX: number;
    static { (this.prototype as any)._targetX = 0; }

    declare private _targetY: number;
    static { (this.prototype as any)._targetY = 0; }

    declare private _trajectory: number;
    static { (this.prototype as any)._trajectory = 0; }

    public get human(): HumanGameObject {
        return this._human;
    }

    public get targetX(): number {
        return this._targetX;
    }

    public get targetY(): number {
        return this._targetY;
    }

    public get trajectory(): number {
        return this._trajectory;
    }

    public override dispose(): void {
        super.dispose();
        this._human = null;
    }

    public override apply(param1: SynchronizedGameStage): void {
        this.human.throwSnowball(this.targetX, this.targetY);
        this.human.startThrowTimer();
        SnowWarEngine.playSound("HBSTG_snowwar_throw");
    }
}
