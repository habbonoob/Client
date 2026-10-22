import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { AvatarEffectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/action/AvatarEffectMessageParser';

export class AvatarEffectMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.action::AvatarEffectMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, AvatarEffectMessageParser);
    }

    public getParser(): AvatarEffectMessageParser {
        return this._parser instanceof AvatarEffectMessageParser ? this._parser : null;
    }
}
