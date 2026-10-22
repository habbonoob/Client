import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { RequestSpamWallPostItMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/furniture/RequestSpamWallPostItMessageParser';

export class RequestSpamWallPostItMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.furniture::RequestSpamWallPostItMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, RequestSpamWallPostItMessageParser);
    }

    public getParser(): RequestSpamWallPostItMessageParser {
        return this._parser instanceof RequestSpamWallPostItMessageParser ? this._parser : null;
    }
}
