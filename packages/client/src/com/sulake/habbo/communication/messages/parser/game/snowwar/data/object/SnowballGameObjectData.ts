import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';

export class SnowballGameObjectData extends SnowWarGameObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.object::SnowballGameObjectData'); }

    public static readonly _SafeStr_5864: number = 11;
    public static readonly TRAJECTORY_QUICK_THROW: number = 0;
    public static readonly TRAJECTORY_SHORT_LOB: number = 1;
    public static readonly TRAJECTORY_LONG_LOB: number = 2;

    constructor(param1: number, param2: number) {
        super(param1, param2);
    }

    public get locationX3D(): number {
        return this.getVariable(2);
    }

    public get locationY3D(): number {
        return this.getVariable(3);
    }

    public get locationZ3D(): number {
        return this.getVariable(4);
    }

    public get movementDirection360(): number {
        return this.getVariable(5);
    }

    public get trajectory(): number {
        return this.getVariable(6);
    }

    public get timeToLive(): number {
        return this.getVariable(7);
    }

    public get throwingHuman(): number {
        return this.getVariable(8);
    }

    public get parabolaOffset(): number {
        return this.getVariable(9);
    }

    public get planarVelocity(): number {
        return this.getVariable(10);
    }

    public override parse(param1: IMessageDataWrapper): void {
        this.parseVariables(param1, 11);
    }
}
