import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class BotSkillData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.bots::BotSkillData'); }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _data: string;

    constructor(param1: IMessageDataWrapper) {
        this.parse(param1);
    }

    public parse(param1: IMessageDataWrapper): void {
        this._id = param1.readInteger();
        this._data = param1.readString();
    }

    public get id(): number {
        return this._id;
    }

    public get data(): string {
        return this._data;
    }
}
