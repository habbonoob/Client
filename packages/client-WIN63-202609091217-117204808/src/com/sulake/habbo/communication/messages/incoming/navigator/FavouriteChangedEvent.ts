import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FavouriteChangedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FavouriteChangedMessageParser';

export class FavouriteChangedEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::FavouriteChangedEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FavouriteChangedMessageParser);
    }

    public getParser(): FavouriteChangedMessageParser {
        return this._parser instanceof FavouriteChangedMessageParser ? this._parser : null;
    }
}
