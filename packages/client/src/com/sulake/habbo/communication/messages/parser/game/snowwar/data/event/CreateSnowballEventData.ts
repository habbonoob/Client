import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';

export class CreateSnowballEventData extends SnowWarGameEventData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.event::CreateSnowballEventData'); }

    constructor(param1: number) {
        super(param1);
    }

    declare private _snowBallGameObjectId: number;
    static { (this.prototype as any)._snowBallGameObjectId = 0; }

    declare private _humanGameObjectId: number;
    static { (this.prototype as any)._humanGameObjectId = 0; }

    declare private _targetX: number;
    static { (this.prototype as any)._targetX = 0; }

    declare private _targetY: number;
    static { (this.prototype as any)._targetY = 0; }

    declare private _trajectory: number;
    static { (this.prototype as any)._trajectory = 0; }

    public get snowBallGameObjectId(): number {
        return this._snowBallGameObjectId;
    }

    public get humanGameObjectId(): number {
        return this._humanGameObjectId;
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

    public override parse(param1: IMessageDataWrapper): void {
        this._snowBallGameObjectId = param1.readInteger();
        this._humanGameObjectId = param1.readInteger();
        this._targetX = param1.readInteger();
        this._targetY = param1.readInteger();
        this._trajectory = param1.readInteger();
    }
}
