import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ConvertedRoomIdMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/ConvertedRoomIdMessageParser';

export class ConvertedRoomIdEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::ConvertedRoomIdEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ConvertedRoomIdMessageParser);
    }

    public get globalId(): string {
        return (this._parser instanceof ConvertedRoomIdMessageParser ? this._parser : null).globalId;
    }

    public get convertedId(): number {
        return (this._parser instanceof ConvertedRoomIdMessageParser ? this._parser : null).convertedId;
    }

    public getParser(): ConvertedRoomIdMessageParser {
        return this._parser instanceof ConvertedRoomIdMessageParser ? this._parser : null;
    }
}
