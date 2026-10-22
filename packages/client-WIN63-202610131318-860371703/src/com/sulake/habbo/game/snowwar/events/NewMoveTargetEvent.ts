import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { SynchronizedGameStage } from '@/com/sulake/habbo/game/snowwar/arena/SynchronizedGameStage';
import type { HumanGameObject } from '@/com/sulake/habbo/game/snowwar/gameobjects/HumanGameObject';
import { SnowWarGameEvent } from '@/com/sulake/habbo/game/snowwar/events/SnowWarGameEvent';

export class NewMoveTargetEvent extends SnowWarGameEvent {
    static { registerClassName(this, 'com.sulake.habbo.game.snowwar.events::NewMoveTargetEvent'); }

    declare private _humanGameObject: HumanGameObject;

    declare private _SafeStr_2126: number;
    static { (this.prototype as any)._SafeStr_2126 = 0; }

    declare private _y: number;
    static { (this.prototype as any)._y = 0; }

    constructor(param1: HumanGameObject, param2: number, param3: number) {
        super();
        this._humanGameObject = param1;
        this._SafeStr_2126 = param2;
        this._y = param3;
    }

    public override dispose(): void {
        super.dispose();
        this._humanGameObject = null;
    }

    public override apply(param1: SynchronizedGameStage): void {
        this._humanGameObject.changeMoveTarget(this._SafeStr_2126, this._y);
    }

    public get humanGameObject(): HumanGameObject {
        return this._humanGameObject;
    }

    public get x(): number {
        return this._SafeStr_2126;
    }

    public get y(): number {
        return this._y;
    }
}
