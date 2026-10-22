import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvatarEffectActivatedMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectActivatedMessageParser';

export class AvatarEffectActivatedMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.avatareffect::AvatarEffectActivatedMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvatarEffectActivatedMessageParser);
    }

    public getParser(): AvatarEffectActivatedMessageParser {
        return this._parser instanceof AvatarEffectActivatedMessageParser ? this._parser : null;
    }
}
