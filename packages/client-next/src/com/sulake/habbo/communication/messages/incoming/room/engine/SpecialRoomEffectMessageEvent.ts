import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { SpecialRoomEffectMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/SpecialRoomEffectMessageParser';

export class SpecialRoomEffectMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::SpecialRoomEffectMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, SpecialRoomEffectMessageParser);
    }
}
