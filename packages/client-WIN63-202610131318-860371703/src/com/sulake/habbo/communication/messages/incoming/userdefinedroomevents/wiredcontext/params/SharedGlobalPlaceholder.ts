import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class SharedGlobalPlaceholder {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredcontext.params::SharedGlobalPlaceholder'); }

    declare private _roomId: number;
    static { (this.prototype as any)._roomId = 0; }

    declare private _roomName: string;

    declare private _placeholderName: string;

    constructor(param1: IMessageDataWrapper) {
        this._roomId = param1.readInteger();
        this._roomName = param1.readString();
        this._placeholderName = param1.readString();
    }

    public get roomId(): number {
        return this._roomId;
    }

    public get roomName(): string {
        return this._roomName;
    }

    public get placeholderName(): string {
        return this._placeholderName;
    }
}
