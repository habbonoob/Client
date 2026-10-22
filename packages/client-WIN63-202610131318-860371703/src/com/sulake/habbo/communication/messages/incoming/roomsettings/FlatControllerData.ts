import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';
import type { IFlatUser } from '@/com/sulake/habbo/communication/messages/incoming/roomsettings/IFlatUser';

export class FlatControllerData implements IFlatUser {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.roomsettings::FlatControllerData'); }

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    declare private _userName: string;

    declare private _selected: boolean;
    static { (this.prototype as any)._selected = false; }

    constructor(param1: IMessageDataWrapper) {
        this._userId = param1.readInteger();
        this._userName = param1.readString();
    }

    public get userId(): number {
        return this._userId;
    }

    public get userName(): string {
        return this._userName;
    }

    public get selected(): boolean {
        return this._selected;
    }

    public set selected(param1: boolean) {
        this._selected = param1;
    }
}
