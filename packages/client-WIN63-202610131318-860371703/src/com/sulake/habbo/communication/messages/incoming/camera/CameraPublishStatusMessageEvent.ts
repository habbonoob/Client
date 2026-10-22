import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CameraPublishStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/camera/CameraPublishStatusMessageParser';

export class CameraPublishStatusMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.camera::CameraPublishStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CameraPublishStatusMessageParser);
    }

    public getParser(): CameraPublishStatusMessageParser {
        return this._parser instanceof CameraPublishStatusMessageParser ? this._parser : null;
    }
}
