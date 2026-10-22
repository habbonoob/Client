import { asInstanceOf } from '@habbo-pixi/runtime/lang/cast';
import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NavigatorLiftedRoomsParser } from '@/com/sulake/habbo/communication/messages/parser/newnavigator/NavigatorLiftedRoomsParser';

export class NavigatorLiftedRoomsEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.newnavigator::NavigatorLiftedRoomsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NavigatorLiftedRoomsParser);
    }

    public getParser(): NavigatorLiftedRoomsParser {
        return asInstanceOf(this.parser, NavigatorLiftedRoomsParser);
    }
}
