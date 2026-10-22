import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { BlockUserUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/users/BlockUserUpdateMessageParser';

export class BlockUserUpdateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.users::BlockUserUpdateMessageEvent'); }

    public static readonly _SafeStr_8002: number = 0;
    public static readonly _SafeStr_8098: number = 1;

    constructor(param1: (...args: any[]) => any) {
        super(param1, BlockUserUpdateMessageParser);
    }

    public get result(): number {
        return (this._parser instanceof BlockUserUpdateMessageParser ? this._parser : null).result;
    }

    public get userId(): number {
        return (this._parser instanceof BlockUserUpdateMessageParser ? this._parser : null).userId;
    }
}
