import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { WiredPermissionsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredmenu/WiredPermissionsMessageParser';

export class WiredPermissionsEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredmenu::WiredPermissionsEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, WiredPermissionsMessageParser);
    }

    public getParser(): WiredPermissionsMessageParser {
        return this._parser instanceof WiredPermissionsMessageParser ? this._parser : null;
    }
}
