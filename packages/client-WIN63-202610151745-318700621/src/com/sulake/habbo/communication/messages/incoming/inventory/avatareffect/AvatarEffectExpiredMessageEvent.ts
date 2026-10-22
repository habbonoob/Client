import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvatarEffectExpiredMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectExpiredMessageParser';

export class AvatarEffectExpiredMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.avatareffect::AvatarEffectExpiredMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvatarEffectExpiredMessageParser);
    }

    public getParser(): AvatarEffectExpiredMessageParser {
        return this._parser instanceof AvatarEffectExpiredMessageParser ? this._parser : null;
    }
}
