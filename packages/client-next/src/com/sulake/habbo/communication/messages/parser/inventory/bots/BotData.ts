import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class BotData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.inventory.bots::BotData'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    declare private _motto: string;

    declare private _gender: string;

    declare private _figure: string;

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readInteger();
        this._name = param1.readString();
        this._motto = param1.readString();
        this._gender = param1.readString();
        this._figure = param1.readString();
    }

    public get id(): number {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get motto(): string {
        return this._motto;
    }

    public get figure(): string {
        return this._figure;
    }

    public get gender(): string {
        return this._gender;
    }
}
