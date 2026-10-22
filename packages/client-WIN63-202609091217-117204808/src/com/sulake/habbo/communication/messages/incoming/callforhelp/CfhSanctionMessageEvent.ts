import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CfhSanctionMessageParser } from '@/com/sulake/habbo/communication/messages/parser/callforhelp/CfhSanctionMessageParser';

export class CfhSanctionMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.callforhelp::CfhSanctionMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CfhSanctionMessageParser);
    }

    public getParser(): CfhSanctionMessageParser {
        return this._parser instanceof CfhSanctionMessageParser ? this._parser : null;
    }
}
