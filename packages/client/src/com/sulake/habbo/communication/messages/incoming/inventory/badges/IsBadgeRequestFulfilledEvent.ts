import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { IsBadgeRequestFulfilledParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/badges/IsBadgeRequestFulfilledParser';

export class IsBadgeRequestFulfilledEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.badges::IsBadgeRequestFulfilledEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, IsBadgeRequestFulfilledParser);
    }

    public getParser(): IsBadgeRequestFulfilledParser {
        return this._parser instanceof IsBadgeRequestFulfilledParser ? this._parser : null;
    }
}
