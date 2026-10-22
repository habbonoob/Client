import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UniqueMachineIDParser } from '@/com/sulake/habbo/communication/messages/parser/handshake/UniqueMachineIDParser';

export class UniqueMachineIDEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.handshake::UniqueMachineIDEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UniqueMachineIDParser);
    }

    private getParser(): UniqueMachineIDParser {
        return this._parser instanceof UniqueMachineIDParser ? this._parser : null;
    }

    public get machineID(): string {
        return this.getParser().machineID;
    }
}
