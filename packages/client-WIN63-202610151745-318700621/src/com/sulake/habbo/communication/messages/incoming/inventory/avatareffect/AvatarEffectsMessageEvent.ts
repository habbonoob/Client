import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvatarEffectsMessageParser } from '@/com/sulake/habbo/communication/messages/parser/inventory/avatareffect/AvatarEffectsMessageParser';

export class AvatarEffectsMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.inventory.avatareffect::AvatarEffectsMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvatarEffectsMessageParser);
    }

    public getParser(): AvatarEffectsMessageParser {
        return this._parser instanceof AvatarEffectsMessageParser ? this._parser : null;
    }
}
