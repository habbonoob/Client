import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class TryLoginMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::TryLoginMessageComposer'); }

    constructor(username: string, password: string, avatarId: number) {
        this._username = username;
        this._password = password;
        this._avatarId = avatarId;
    }

    declare private _username: string;

    declare private _password: string;

    declare private _avatarId: number;
    static { (this.prototype as any)._avatarId = 0; }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
