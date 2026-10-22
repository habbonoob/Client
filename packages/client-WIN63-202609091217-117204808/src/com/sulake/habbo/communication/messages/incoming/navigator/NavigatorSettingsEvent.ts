import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NavigatorSettingsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/navigator/NavigatorSettingsMessageParser';

export class NavigatorSettingsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.navigator::NavigatorSettingsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NavigatorSettingsMessageParser);
    }

    public getParser(): NavigatorSettingsMessageParser {
        return this._parser instanceof NavigatorSettingsMessageParser ? this._parser : null;
    }
}
