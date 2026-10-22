import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';

export class MachineCreatesSnowballEventData extends SnowWarGameEventData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.event::MachineCreatesSnowballEventData'); }

    constructor(param1: number) {
        super(param1);
    }

    declare private _snowBallMachineReference: number;
    static { (this.prototype as any)._snowBallMachineReference = 0; }

    public get snowBallMachineReference(): number {
        return this._snowBallMachineReference;
    }

    public override parse(param1: IMessageDataWrapper): void {
        this._snowBallMachineReference = param1.readInteger();
    }
}
