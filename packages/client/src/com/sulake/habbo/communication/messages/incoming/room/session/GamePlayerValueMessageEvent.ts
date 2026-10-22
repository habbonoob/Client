import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { GamePlayerValueMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/session/GamePlayerValueMessageParser';

export class GamePlayerValueMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.session::GamePlayerValueMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, GamePlayerValueMessageParser);
    }

    public getParser(): GamePlayerValueMessageParser {
        return this._parser instanceof GamePlayerValueMessageParser ? this._parser : null;
    }
}
