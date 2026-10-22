import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class RoomVisitData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.moderation::RoomVisitData'); }

    constructor(param1: IMessageDataWrapper) {
        this._roomId = param1.readInteger();
        this._roomName = param1.readString();
        this._enterHour = param1.readInteger();
        this._enterMinute = param1.readInteger();
    }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _enterHour: number;
    static { (this.prototype as any)._enterHour = 0; }

    declare private _enterMinute: number;
    static { (this.prototype as any)._enterMinute = 0; }

    declare private _roomName: string;

    public get roomName(): string {
        return this._roomName;
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get enterHour(): number {
        return this._enterHour;
    }

    public get enterMinute(): number {
        return this._enterMinute;
    }
}
