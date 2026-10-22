import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FavouritesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/FavouritesMessageParser';

export class FavouritesEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::FavouritesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FavouritesMessageParser);
    }

    public getParser(): FavouritesMessageParser {
        return this._parser instanceof FavouritesMessageParser ? this._parser : null;
    }
}
