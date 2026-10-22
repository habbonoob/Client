import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class GuildColorData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::GuildColorData'); }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readInteger();
        this._color = parseInt(param1.readString(), 16) >>> 0;
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _color: number;
    static { (this.prototype as any)._color = 0; }

    public get color(): number {
        return this._color;
    }

    public get id(): number {
        return this._id;
    }

    public get red(): number {
        return this._color >> 16 & 0xFF;
    }

    public get green(): number {
        return this._color >> 8 & 0xFF;
    }

    public get blue(): number {
        return this._color >> 0 & 0xFF;
    }
}
