import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { MaintenanceStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/availability/MaintenanceStatusMessageParser';

export class MaintenanceStatusMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.availability::MaintenanceStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, MaintenanceStatusMessageParser);
    }

    public getParser(): MaintenanceStatusMessageParser {
        return this._parser instanceof MaintenanceStatusMessageParser ? this._parser : null;
    }
}
