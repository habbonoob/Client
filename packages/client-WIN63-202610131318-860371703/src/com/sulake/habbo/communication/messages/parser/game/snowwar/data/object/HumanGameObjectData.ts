import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';
import { Logger } from '@/com/sulake/habbo/Logger';

export class HumanGameObjectData extends SnowWarGameObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.object::HumanGameObjectData'); }

    public static readonly _SafeStr_5864: number = 19;

    declare private _name: string;

    declare private _SafeStr_5398: string;

    declare private _figure: string;

    declare private _sex: string;

    constructor(param1: number, param2: number) {
        super(param1, param2);
    }

    public get name(): string {
        return this._name;
    }

    public get mission(): string {
        return this._SafeStr_5398;
    }

    public get figure(): string {
        return this._figure;
    }

    public get sex(): string {
        return this._sex;
    }

    public override parse(param1: IMessageDataWrapper): void {
        this.parseVariables(param1, 19);
        this._name = param1.readString();
        this._SafeStr_5398 = param1.readString();
        this._figure = param1.readString();
        this._sex = param1.readString();
        Logger.log("Parsed human game object data, variables:" + this._variables);
    }

    public get currentLocationX(): number {
        return this.getVariable(2);
    }

    public get currentLocationY(): number {
        return this.getVariable(3);
    }

    public get currentTileX(): number {
        return this.getVariable(4);
    }

    public get currentTileY(): number {
        return this.getVariable(5);
    }

    public get bodyDirection(): number {
        return this.getVariable(6);
    }

    public get hitPoints(): number {
        return this.getVariable(7);
    }

    public get snowBallCount(): number {
        return this.getVariable(8);
    }

    public get isBot(): number {
        return this.getVariable(9);
    }

    public get activityTimer(): number {
        return this.getVariable(10);
    }

    public get activityState(): number {
        return this.getVariable(11);
    }

    public get nextTileX(): number {
        return this.getVariable(12);
    }

    public get nextTileY(): number {
        return this.getVariable(13);
    }

    public get moveTargetX(): number {
        return this.getVariable(14);
    }

    public get moveTargetY(): number {
        return this.getVariable(15);
    }

    public get score(): number {
        return this.getVariable(16);
    }

    public get team(): number {
        return this.getVariable(17);
    }

    public get userId(): number {
        return this.getVariable(18);
    }
}
