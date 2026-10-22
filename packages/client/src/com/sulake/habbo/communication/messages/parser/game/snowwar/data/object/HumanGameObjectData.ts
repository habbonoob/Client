import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import { SnowWarGameObjectData } from '@/com/sulake/habbo/communication/messages/parser/game/snowwar/data/object/SnowWarGameObjectData.group';
import { SimpleLogger } from '@/debug/SimpleLogger';

export class HumanGameObjectData extends SnowWarGameObjectData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.game.snowwar.data.object::HumanGameObjectData'); }

    static #staticsReady = false;

    private static get _log(): SimpleLogger {
        HumanGameObjectData.#initStatics();
        return HumanGameObjectData._log;
    }

    public static readonly _SafeStr_5864: number = 19;

    constructor(param1: number, param2: number) {
        super(param1, param2);
    }

    declare private _mission: string;

    declare private _figure: string;

    declare private _sex: string;

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get mission(): string {
        return this._mission;
    }

    public get figure(): string {
        return this._figure;
    }

    public get sex(): string {
        return this._sex;
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

    public override parse(param1: IMessageDataWrapper): void {
        this.parseVariables(param1, 19);
        this._name = param1.readString();
        this._mission = param1.readString();
        this._figure = param1.readString();
        this._sex = param1.readString();
        HumanGameObjectData._log.info("Parsed human game object data, variables:" + this._variables);
    }

    /** The statics AS3 initialised when the class was first used; they read as their defaults until then. */
    static #initStatics(): void {
        if (HumanGameObjectData.#staticsReady) return;
        HumanGameObjectData.#staticsReady = true;
        const set = (name: string, value: unknown) => Object.defineProperty(HumanGameObjectData, name, { value, writable: true, configurable: true, enumerable: true });
        set("_log", null);
        set("_log", new SimpleLogger("com.sulake.habbo.communication.messages.parser.game.snowwar.data.object.HumanGameObjectData"));
    }
}
