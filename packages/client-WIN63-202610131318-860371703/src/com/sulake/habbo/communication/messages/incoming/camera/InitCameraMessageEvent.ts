import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { InitCameraMessageParser } from '@/com/sulake/habbo/communication/messages/parser/camera/InitCameraMessageParser';

export class InitCameraMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.camera::InitCameraMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, InitCameraMessageParser);
    }

    public getParser(): InitCameraMessageParser {
        return this._parser instanceof InitCameraMessageParser ? this._parser : null;
    }
}
