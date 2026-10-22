import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvatarEffectAddedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectAddedMessageParser';

export class AvatarEffectAddedMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.avatareffect::AvatarEffectAddedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvatarEffectAddedMessageParser);
    }

    public getParser(): AvatarEffectAddedMessageParser {
        return this._parser instanceof AvatarEffectAddedMessageParser ? this._parser : null;
    }
}
