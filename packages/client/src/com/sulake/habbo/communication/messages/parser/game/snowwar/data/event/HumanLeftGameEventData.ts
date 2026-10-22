import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';

export class HumanLeftGameEventData extends SnowWarGameEventData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.event::HumanLeftGameEventData'); }

    constructor(param1: number) {
        super(param1);
    }

    declare private _humanGameObjectId: number;
    static { (this.prototype as any)._humanGameObjectId = 0; }

    public get humanGameObjectId(): number {
        return this._humanGameObjectId;
    }

    public override parse(param1: IMessageDataWrapper): void {
        this._humanGameObjectId = param1.readInteger();
    }
}
