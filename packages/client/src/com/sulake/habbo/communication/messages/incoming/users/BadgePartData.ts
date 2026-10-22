import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class BadgePartData {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::BadgePartData'); }

    constructor(param1: IMessageDataWrapper = null) {
        this._id = param1.readInteger();
        this._fileName = param1.readString();
        this._maskFileName = param1.readString();
    }

    declare private _id: number;
    static { (this.prototype as any)._id = 0; }

    declare private _fileName: string;

    public get fileName(): string {
        return this._fileName;
    }

    declare private _maskFileName: string;

    public get maskFileName(): string {
        return this._maskFileName;
    }

    public get id(): number {
        return this._id;
    }
}
