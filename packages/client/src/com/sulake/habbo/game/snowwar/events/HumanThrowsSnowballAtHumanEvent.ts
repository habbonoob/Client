import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { HumanGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/HumanGameObject';
import { SnowWarEngine } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class HumanThrowsSnowballAtHumanEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::HumanThrowsSnowballAtHumanEvent'); }

    constructor(param1: HumanGameObject, param2: HumanGameObject, param3: number) {
        super();
        this._human = param1;
        this._targetHuman = param2;
        this._trajectory = param3;
    }

    declare private _human: HumanGameObject;

    declare private _targetHuman: HumanGameObject;

    declare private _trajectory: number;
    static { (this.prototype as any)._trajectory = 0; }

    public get human(): HumanGameObject {
        return this._human;
    }

    public get targetHuman(): HumanGameObject {
        return this._targetHuman;
    }

    public get trajectory(): number {
        return this._trajectory;
    }

    public override dispose(): void {
        super.dispose();
        this._human = null;
        this._targetHuman = null;
        this._trajectory = 0;
    }

    public override apply(param1: SynchronizedGameStage): void {
        this.human.throwSnowball(this._targetHuman.currentLocation.x, this._targetHuman.currentLocation.y);
        this.human.startThrowTimer();
        SnowWarEngine.playSound("HBSTG_snowwar_throw");
    }
}
