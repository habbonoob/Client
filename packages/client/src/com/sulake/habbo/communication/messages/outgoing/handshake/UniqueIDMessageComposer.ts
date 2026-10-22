import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class UniqueIDMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::UniqueIDMessageComposer'); }

    constructor(machineId: string, fingerprint: string, flashVersion: string) {
        this._machineId = machineId;
        this._fingerprint = fingerprint;
        this._flashVersion = flashVersion;
    }

    declare private _machineId: string;

    declare private _fingerprint: string;

    declare private _flashVersion: string;

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return [this._machineId, this._fingerprint, this._flashVersion];
    }

    get [IMessageComposer](): true {
        return true;
    }
}
