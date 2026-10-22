import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { UpgradeChestResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/userdefinedroomevents/wiredtrading/chests/UpgradeChestResultMessageParser';

export class UpgradeChestResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.userdefinedroomevents.wiredtrading.chests::UpgradeChestResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, UpgradeChestResultMessageParser);
    }

    public getParser(): UpgradeChestResultMessageParser {
        return this._parser instanceof UpgradeChestResultMessageParser ? this._parser : null;
    }
}
