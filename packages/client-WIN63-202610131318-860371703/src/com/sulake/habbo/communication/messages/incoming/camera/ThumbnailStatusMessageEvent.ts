import { registerClassName } from '@habbo-pixi/runtime/utils/getQualifiedClassName';
import { MessageEvent } from '@/com/sulake/core/communication/messages/MessageEvent';
import { ThumbnailStatusMessageParser } from '@/com/sulake/habbo/communication/messages/parser/camera/ThumbnailStatusMessageParser';

export class ThumbnailStatusMessageEvent extends MessageEvent {
    static { registerClassName(this, 'com.sulake.habbo.communication.messages.incoming.camera::ThumbnailStatusMessageEvent'); }

    constructor(param1: (...args: any[]) => any) {
        super(param1, ThumbnailStatusMessageParser);
    }

    public getParser(): ThumbnailStatusMessageParser {
        return this._parser instanceof ThumbnailStatusMessageParser ? this._parser : null;
    }
}
