import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UniqueIDMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::UniqueIDMessageComposer'); }

    declare private _machineID: string;

    declare private _fingerprint: string;

    declare private _flashVersion: string;

    constructor(param1: string, param2: string, param3: string) {
        this._machineID = param1;
        this._fingerprint = param2;
        this._flashVersion = param3;
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._machineID, this._fingerprint, this._flashVersion];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
