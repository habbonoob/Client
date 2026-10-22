import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class FriendCategoryData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.friendlist::FriendCategoryData'); }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readInteger();
        this._name = param1.readString();
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _name: string;

    public get name(): string {
        return this._name;
    }

    public get id(): number {
        return this._id;
    }
}
