import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NewNavigatorPreferencesParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NewNavigatorPreferencesParser';

export class NewNavigatorPreferencesEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::NewNavigatorPreferencesEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NewNavigatorPreferencesParser);
    }

    public getParser(): NewNavigatorPreferencesParser {
        return asInstanceOf(this.parser, NewNavigatorPreferencesParser);
    }
}
