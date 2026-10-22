import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class TryLoginMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::TryLoginMessageComposer'); }

    declare private _username: string;

    declare private _password: string;

    declare private _userId: number;
    static { (this.prototype as any)._userId = 0; }

    constructor(param1: string, param2: string, param3: number) {
        this._username = param1;
        this._password = param2;
        this._userId = param3;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
