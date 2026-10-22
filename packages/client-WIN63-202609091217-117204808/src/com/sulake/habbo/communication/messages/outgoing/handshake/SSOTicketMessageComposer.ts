import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SSOTicketMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::SSOTicketMessageComposer'); }

    declare private _message: any[];

    constructor(param1: string) {
        this._message = [];
        this._message.push(param1);
        this._message.push(getTimer());
    }

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return this._message;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
