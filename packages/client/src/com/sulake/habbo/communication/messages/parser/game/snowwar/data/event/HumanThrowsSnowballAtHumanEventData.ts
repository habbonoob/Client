import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';

export class HumanThrowsSnowballAtHumanEventData extends SnowWarGameEventData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.event::HumanThrowsSnowballAtHumanEventData'); }

    constructor(param1: number) {
        super(param1);
    }

    declare private _humanGameObjectId: number;
    static { (this.prototype as any)._humanGameObjectId = 0; }

    declare private _targetHumanGameObjectId: number;
    static { (this.prototype as any)._targetHumanGameObjectId = 0; }

    declare private _trajectory: number;
    static { (this.prototype as any)._trajectory = 0; }

    public get humanGameObjectId(): number {
        return this._humanGameObjectId;
    }

    public get targetHumanGameObjectId(): number {
        return this._targetHumanGameObjectId;
    }

    public get trajectory(): number {
        return this._trajectory;
    }

    public override parse(param1: IMessageDataWrapper): void {
        this._humanGameObjectId = param1.readInteger();
        this._targetHumanGameObjectId = param1.readInteger();
        this._trajectory = param1.readInteger();
    }
}
