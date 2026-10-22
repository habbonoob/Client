import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { HumanGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/HumanGameObject';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class HumanLeftGameEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::HumanLeftGameEvent'); }

    constructor(param1: HumanGameObject) {
        super();
        this._human = param1;
    }

    declare private _human: HumanGameObject;

    public override dispose(): void {
        super.dispose();
        this._human = null;
    }

    public override apply(param1: SynchronizedGameStage): void {
        param1.putGameObjectOnDeleteList(this._human);
        this._human.onRemove();
    }
}
