import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IMessageParser } from '@/com/sulake/core/communication/messages/IMessageParser';

export class FavouriteMembershipUpdateMessageParser implements IMessageParser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.parser.room.engine::FavouriteMembershipUpdateMessageParser'); }

    declare private _roomIndex: number;
    static { (this.prototype as any)._roomIndex = 0; }

    declare private _habboGroupId: number;
    static { (this.prototype as any)._habboGroupId = 0; }

    declare private _status: number;
    static { (this.prototype as any)._status = 0; }

    declare private _habboGroupName: string;

    constructor() {
    }

    public flush(): boolean {
        return true;
    }

    public parse(param1: IMessageDataWrapper): boolean {
        this._roomIndex = param1.readInteger();
        this._habboGroupId = param1.readInteger();
        this._status = param1.readInteger();
        this._habboGroupName = param1.readString();
        return true;
    }

    public get roomIndex(): number {
        return this._roomIndex;
    }

    public get habboGroupId(): number {
        return this._habboGroupId;
    }

    public get status(): number {
        return this._status;
    }

    public get habboGroupName(): string {
        return this._habboGroupName;
    }
}
