import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NavigatorSavedSearchesParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorSavedSearchesParser';

export class NavigatorSavedSearchesEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::NavigatorSavedSearchesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NavigatorSavedSearchesParser);
    }

    public getParser(): NavigatorSavedSearchesParser {
        return asInstanceOf(this.parser, NavigatorSavedSearchesParser);
    }
}
