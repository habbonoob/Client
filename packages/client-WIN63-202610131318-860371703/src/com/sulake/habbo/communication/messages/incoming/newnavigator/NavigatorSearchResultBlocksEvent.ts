import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NavigatorSearchResultBlocksParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorSearchResultBlocksParser';

export class NavigatorSearchResultBlocksEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::NavigatorSearchResultBlocksEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NavigatorSearchResultBlocksParser);
    }

    public getParser(): NavigatorSearchResultBlocksParser {
        return asInstanceOf(this.parser, NavigatorSearchResultBlocksParser);
    }
}
