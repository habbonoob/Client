import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurnitureAliasesMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/FurnitureAliasesMessageParser';

export class FurnitureAliasesMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::FurnitureAliasesMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurnitureAliasesMessageParser);
    }

    public getParser(): FurnitureAliasesMessageParser {
        return this._parser instanceof FurnitureAliasesMessageParser ? this._parser : null;
    }
}
