import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { HumanGameObjectData, SnowballGameObjectData, SnowballMachineGameObjectData, SnowballPileGameObjectData, TreeGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';

export class SnowWarGameObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.object::SnowWarGameObjectData'); }

    public static readonly _SafeStr_8602: number = 1;
    public static readonly _SafeStr_7838: number = 2;
    public static readonly _SafeStr_7756: number = 3;
    public static readonly _SafeStr_7837: number = 4;
    public static readonly _SafeStr_8621: number = 5;

    public static create(param1: number, param2: number): SnowWarGameObjectData {
        switch (param1 - 1) {
            case 0:
                return new SnowballGameObjectData(param1, param2);
            case 1:
                return new TreeGameObjectData(param1, param2);
            case 2:
                return new SnowballPileGameObjectData(param1, param2);
            case 3:
                return new SnowballMachineGameObjectData(param1, param2);
            case 4:
                return new HumanGameObjectData(param1, param2);
            default:
                return null;
        }
    }

    constructor(param1: number, param2: number) {
        this.setVariable(0, param1);
        this.setVariable(1, param2);
    }

    protected _variables: any[] = [];

    public get type(): number {
        return this.getVariable(0);
    }

    public get id(): number {
        return this.getVariable(1);
    }

    public getVariable(param1: number): number {
        return this._variables[param1] | 0;
    }

    public parse(param1: IMessageDataWrapper): void {
    }

    protected setVariable(param1: number, param2: number): void {
        this._variables[param1] = param2;
    }

    protected parseVariables(param1: IMessageDataWrapper, param2: number): void {
        let _loc3_: number = 0;
        _loc3_ = 2;
        while (_loc3_ < param2) {
            this._variables.push(param1.readInteger());
            _loc3_++;
        }
    }
}
