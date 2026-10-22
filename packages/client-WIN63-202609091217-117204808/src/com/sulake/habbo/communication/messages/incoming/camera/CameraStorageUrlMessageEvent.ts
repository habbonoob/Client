import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { CameraStorageUrlMessageParser } from '@/com/sulake/habbo/communication/messages/parser/camera/CameraStorageUrlMessageParser';

export class CameraStorageUrlMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.camera::CameraStorageUrlMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, CameraStorageUrlMessageParser);
    }

    public getParser(): CameraStorageUrlMessageParser {
        return this._parser instanceof CameraStorageUrlMessageParser ? this._parser : null;
    }
}
