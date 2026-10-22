import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageDataWrapper } from '@/com/sulake/core/communication/messages/IMessageDataWrapper';

export class WiredLinkNetwork {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredlink::WiredLinkNetwork'); }

    declare private _id: string;

    declare private _name: string;

    declare private _SafeStr_14183: number;
    static { (this.prototype as any)._SafeStr_14183 = 0; }

    declare private _SafeStr_14184: boolean;
    static { (this.prototype as any)._SafeStr_14184 = false; }

    constructor(param1: IMessageDataWrapper) {
        this._id = param1.readString();
        this._name = param1.readString();
        this._SafeStr_14183 = param1.readInteger();
        this._SafeStr_14184 = param1.readBoolean();
    }

    public get id(): string {
        return this._id;
    }

    public get name(): string {
        return this._name;
    }

    public get connectionCount(): number {
        return this._SafeStr_14183;
    }

    public get linkedInCurrentRoom(): boolean {
        return this._SafeStr_14184;
    }
}
