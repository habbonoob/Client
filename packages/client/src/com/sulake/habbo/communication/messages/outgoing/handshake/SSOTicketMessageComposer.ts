import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { getTimer } from '@habbo-pixi/runtime/utils/getTimer';
import { IMessageComposer } from '@/com/sulake/core/communication/messages/IMessageComposer';

export class SSOTicketMessageComposer implements IMessageComposer {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.outgoing.handshake::SSOTicketMessageComposer'); }

    constructor(ticket: string) {
        this._data = [ticket, getTimer()];
    }

    declare private _data: any[];

    public dispose(): void {
    }

    public getMessageArray(): any[] {
        return this._data;
    }

    get [IMessageComposer](): true {
        return true;
    }
}
