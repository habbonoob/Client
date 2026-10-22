import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { NftEmeraldConvertResultMessageParser } from '@/com/sulake/habbo/communication/messages/parser/nft/NftEmeraldConvertResultMessageParser';

export class NftEmeraldConvertResultMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.nft::NftEmeraldConvertResultMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, NftEmeraldConvertResultMessageParser);
    }

    public getParser(): NftEmeraldConvertResultMessageParser {
        return this._parser instanceof NftEmeraldConvertResultMessageParser ? this._parser : null;
    }
}
