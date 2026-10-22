import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ChestPreferencesUpdateSuccessMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/ChestPreferencesUpdateSuccessMessageParser';

export class ChestPreferencesUpdateSuccessMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.chests::ChestPreferencesUpdateSuccessMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ChestPreferencesUpdateSuccessMessageParser);
    }

    public getParser(): ChestPreferencesUpdateSuccessMessageParser {
        return this._parser instanceof ChestPreferencesUpdateSuccessMessageParser ? this._parser : null;
    }
}
