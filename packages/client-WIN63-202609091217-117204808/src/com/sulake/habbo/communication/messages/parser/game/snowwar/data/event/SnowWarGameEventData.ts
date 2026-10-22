import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { CreateSnowballEventData, HumanGetsSnowballsFromMachineEventData, HumanLeftGameEventData, HumanStartsToMakeASnowballEventData, HumanThrowsSnowballAtHumanEventData, HumanThrowsSnowballAtPositionEventData, MachineCreatesSnowballEventData, NewMoveTargetEventData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/event/SnowWarGameEventData.group';

export class SnowWarGameEventData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.event::SnowWarGameEventData'); }

    public static readonly _SafeStr_8390: number = 1;
    public static readonly _SafeStr_7750: number = 2;
    public static readonly _SafeStr_8198: number = 3;
    public static readonly _SafeStr_8515: number = 4;
    public static readonly _SafeStr_8192: number = 7;
    public static readonly _SafeStr_8066: number = 8;
    public static readonly _SafeStr_8127: number = 11;
    public static readonly _SafeStr_8597: number = 12;

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    constructor(param1: number) {
        this._id = param1;
    }

    public static create(param1: number): SnowWarGameEventData {
        switch (param1 - 1) {
            case 0:
                return new HumanLeftGameEventData(param1);
            case 1:
                return new NewMoveTargetEventData(param1);
            case 2:
                return new HumanThrowsSnowballAtHumanEventData(param1);
            case 3:
                return new HumanThrowsSnowballAtPositionEventData(param1);
            case 6:
                return new HumanStartsToMakeASnowballEventData(param1);
            case 7:
                return new CreateSnowballEventData(param1);
            case 10:
                return new MachineCreatesSnowballEventData(param1);
            case 11:
                return new HumanGetsSnowballsFromMachineEventData(param1);
            default:
                return null;
        }
    }

    public get id(): number {
        return this._id;
    }

    public set id(param1: number) {
        this._id = param1;
    }

    public parse(param1: IMessageDataWrapper): void {
    }
}
