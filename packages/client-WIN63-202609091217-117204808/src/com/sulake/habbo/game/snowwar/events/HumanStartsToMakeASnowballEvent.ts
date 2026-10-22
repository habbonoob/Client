import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { HumanGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/HumanGameObject';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class HumanStartsToMakeASnowballEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::HumanStartsToMakeASnowballEvent'); }

    declare private _human: HumanGameObject;

    constructor(param1: HumanGameObject) {
        super();
        this._human = param1;
    }

    public override dispose(): void {
        super.dispose();
        this._human = null;
    }

    public override apply(param1: SynchronizedGameStage): void {
        this._human.startMakingSnowball();
    }

    public get human(): HumanGameObject {
        return this._human;
    }
}
