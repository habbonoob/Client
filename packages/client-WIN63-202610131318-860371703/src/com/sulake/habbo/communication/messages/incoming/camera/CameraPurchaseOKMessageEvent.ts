import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CameraPurchaseOKMessageParser } from '@/com/sulake/habbo/communication/messages/parser/camera/CameraPurchaseOKMessageParser';

export class CameraPurchaseOKMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.camera::CameraPurchaseOKMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CameraPurchaseOKMessageParser);
    }

    public getParser(): CameraPurchaseOKMessageParser {
        return this._parser instanceof CameraPurchaseOKMessageParser ? this._parser : null;
    }
}
