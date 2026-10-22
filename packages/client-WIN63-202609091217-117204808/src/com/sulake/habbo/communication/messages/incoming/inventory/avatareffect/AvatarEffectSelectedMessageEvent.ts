import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvatarEffectSelectedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectSelectedMessageParser';

export class AvatarEffectSelectedMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.avatareffect::AvatarEffectSelectedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvatarEffectSelectedMessageParser);
    }

    public getParser(): AvatarEffectSelectedMessageParser {
        return this._parser instanceof AvatarEffectSelectedMessageParser ? this._parser : null;
    }
}
