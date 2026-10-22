import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ClaimProductResultParser } from '@/com/sulake/habbo/communication/messages/parser/peerservice/ClaimProductResultParser';

export class ClaimProductResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.peerservice::ClaimProductResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ClaimProductResultParser);
    }

    public getParser(): ClaimProductResultParser {
        return this._parser instanceof ClaimProductResultParser ? this._parser : null;
    }
}
