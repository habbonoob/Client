import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NavigatorMetaDataParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorMetaDataParser';

export class NavigatorMetaDataEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::NavigatorMetaDataEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NavigatorMetaDataParser);
    }

    public getParser(): NavigatorMetaDataParser {
        return asInstanceOf(this.parser, NavigatorMetaDataParser);
    }
}
