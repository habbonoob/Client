import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowballGivingGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowballGivingGameObject';
import { HumanGameObject, SnowWarEngine } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class HumanGetsSnowballsFromMachineEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::HumanGetsSnowballsFromMachineEvent'); }

    declare private _human: HumanGameObject;

    declare private _SafeStr_4605: SnowballGivingGameObject;

    constructor(param1: HumanGameObject, param2: SnowballGivingGameObject) {
        super();
        this._human = param1;
        this._SafeStr_4605 = param2;
    }

    public override dispose(): void {
        super.dispose();
        this._human = null;
        this._SafeStr_4605 = null;
    }

    public override apply(param1: SynchronizedGameStage): void {
        let _loc3_: number = 0;
        let _loc2_: HumanGameObject = null;
        let _loc4_: number = this._human.getRemainingSnowballCapacity();
        if (_loc4_ > 0) {
            _loc3_ = this._SafeStr_4605.pickupSnowballs(1);
            if (_loc3_ > 0) {
                this._human.addSnowballs(_loc3_);
                _loc2_ = asInstanceOf(param1.getGameObject(this._human.ghostObjectId), HumanGameObject);
                if (_loc2_) {
                    _loc2_.addSnowballs(_loc3_);
                }
                SnowWarEngine.playSound("HBSTG_snowwar_get_snowball");
            }
        }
    }

    public get human(): HumanGameObject {
        return this._human;
    }
}
