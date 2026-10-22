import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredMovementsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/WiredMovementsMessageParser';

export class WiredMovementsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::WiredMovementsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredMovementsMessageParser);
    }

    public getParser(): WiredMovementsMessageParser {
        return this._parser instanceof WiredMovementsMessageParser ? this._parser : null;
    }
}
