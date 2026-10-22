import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { SnowballMachineGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/SnowballMachineGameObject';
import { HabboGamesCom } from '@/com/sulake/habbo/game/HabboGameManager.group';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class MachineCreatesSnowballEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::MachineCreatesSnowballEvent'); }

    declare private _SafeStr_4605: SnowballMachineGameObject;

    constructor(param1: SnowballMachineGameObject) {
        super();
        this._SafeStr_4605 = param1;
    }

    public override dispose(): void {
        super.dispose();
        this._SafeStr_4605 = null;
    }

    public override apply(param1: SynchronizedGameStage): void {
        if (this._SafeStr_4605) {
            this._SafeStr_4605.createSnowball();
        } else {
            HabboGamesCom.log("Too early for this stuff..");
        }
    }
}
