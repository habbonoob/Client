import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { PromoArticlesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/landingview/PromoArticlesMessageParser';

export class PromoArticlesMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.landingview::PromoArticlesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, PromoArticlesMessageParser);
    }

    public getParser(): PromoArticlesMessageParser {
        return this._parser instanceof PromoArticlesMessageParser ? this._parser : null;
    }
}
