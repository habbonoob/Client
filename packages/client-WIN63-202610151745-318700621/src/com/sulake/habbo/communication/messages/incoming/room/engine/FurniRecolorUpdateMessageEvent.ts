import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import type { IMessageEvent } from '@/com/sulake/core/communication/messages/IMessageEvent';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { FurniRecolorUpdateMessageParser } from '@/com/sulake/habbo/communication/messages/parser/room/engine/FurniRecolorUpdateMessageParser';

export class FurniRecolorUpdateMessageEvent extends MessageEvent implements IMessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.room.engine::FurniRecolorUpdateMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, FurniRecolorUpdateMessageParser);
    }

    public getParser(): FurniRecolorUpdateMessageParser {
        return this._parser instanceof FurniRecolorUpdateMessageParser ? this._parser : null;
    }
}
