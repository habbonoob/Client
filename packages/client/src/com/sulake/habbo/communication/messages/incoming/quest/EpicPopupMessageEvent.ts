import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { EpicPopupMessageParser } from '@/com/sulake/habbo/communication/messages/parser/quest/EpicPopupMessageParser';

export class EpicPopupMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.quest::EpicPopupMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, EpicPopupMessageParser);
    }

    public getParser(): EpicPopupMessageParser {
        return this._parser instanceof EpicPopupMessageParser ? this._parser : null;
    }
}
