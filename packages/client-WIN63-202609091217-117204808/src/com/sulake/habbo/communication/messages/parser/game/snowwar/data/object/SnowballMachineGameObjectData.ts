import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';

export class SnowballMachineGameObjectData extends SnowWarGameObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.object::SnowballMachineGameObjectData'); }

    public static readonly _SafeStr_5864: number = 8;

    constructor(param1: number, param2: number) {
        super(param1, param2);
    }

    public override parse(param1: IMessageDataWrapper): void {
        this.parseVariables(param1, 8);
    }

    public get locationX3D(): number {
        return this.getVariable(2);
    }

    public get locationY3D(): number {
        return this.getVariable(3);
    }

    public get direction(): number {
        return this.getVariable(4);
    }

    public get maxSnowballs(): number {
        return this.getVariable(5);
    }

    public get snowballCount(): number {
        return this.getVariable(6);
    }

    public get fuseObjectId(): number {
        return this.getVariable(7);
    }
}
