import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CollapsedCategoriesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/CollapsedCategoriesMessageParser';

export class NavigatorCollapsedCategoriesMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::NavigatorCollapsedCategoriesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CollapsedCategoriesMessageParser);
    }

    public getParser(): CollapsedCategoriesMessageParser {
        return asInstanceOf(this.parser, CollapsedCategoriesMessageParser);
    }
}
